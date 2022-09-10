import random
from flask import Flask, render_template, request, redirect, url_for, jsonify, make_response
from flask_cors import CORS, cross_origin
import xrpl
from xrpl.clients import JsonRpcClient
from xrpl.wallet import generate_faucet_wallet, Wallet
from xrpl.models.transactions.escrow_create import *
from xrpl.models.transactions.escrow_finish import *
from cryptoconditions import PreimageSha256
import datetime
import requests
import os
import json
import pymongo
from dotenv import load_dotenv
load_dotenv()

MONGO_PASS = os.getenv('MONGO_PASS')
NFT_STORAGE_KEY = os.environ.get('NFT_STORAGE_KEY', None)

source = {
    "address": "rBpMysH9bin2mjJ3ojnZ45D7sWPZTtcEru",
    "secret": "snQjZJ2TV9csWSc5Qk8K5CqEgbn3W",
    "sequence": 5138191
}
destination = {
    "address": "rG56XxHfdjjqvCsRNoYdVjMpJLAmJumsDJ",
    "secret": "ssvJyRePm1irsqBkUsZvkK2nyEWnk",
    "sequence": 5138204
}

oracle = {
    "address": "rhjxranCqsS2euJkdNNCoaVfaPesp9Lni2",
    "secret": "shC1nrQfJ1eqTRnrDrgPUk95zdw51",
    "sequence": 5138209
}

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

client = xrpl.clients.JsonRpcClient("http://xls20-sandbox.rippletest.net:51234")
db_client = pymongo.MongoClient(f"mongodb+srv://Hathi:{MONGO_PASS}@greengreet.glrfw2v.mongodb.net/?retryWrites=true&w=majority")

def add_address_to_db(address):
    '''
    Adds address to database if it doesn't already exist
        + input: address (str)
        + output: boolean (True if added, False if not)
    '''
    db = db_client["greengreet"]
    collection = db["accounts"]
    if not collection.find_one({"address": address}):
        return False
    collection.insert_one({"address": address})
    return True

def get_all_addresses():
    '''
    Gets all addresses from database
        + input: None
        + output: list of addresses (list(str))
    '''
    db = db_client["greengreet"]
    collection = db["accounts"]
    all_addresses = collection.find({})
    all_addresses = [x['address'] for x in all_addresses]
    return all_addresses

def get_nfts_in_acc(acc):
    '''
    Gets all NFTs in an account
        + input: acc address (str)
        + output: request result of NFTs (list(dict))
    '''
    acc_nfts_req = xrpl.models.requests.AccountNFTs(
        account=acc,
    )
    acct_nfts = client.request(acc_nfts_req).result
    return acct_nfts

def get_ipfs_meta(url):
    '''
    Gets project data from IPFS
        + input: url (str)
        + output: project data (dict)
    '''
    response = requests.get(url)
    return response.json()

def only_green_nfts(curr_acc_nfts, acc):
    '''
    Get only the green NFTs from the list of account NFTs
        + input: curr_acc_nfts (list(dict)), acc (str)
        + output: green_nfts (list(dict))
    '''
    required_dict_fields = ['name', 'summary', 'projectDescription', 'about', 'fundAmount', 'image']
    all_projects = []
    for nft in curr_acc_nfts:
        if not nft.get('URI'):
            continue
        else:
            uri = xrpl.utils.hex_to_str(nft.get('URI'))
            if not uri.startswith('ipfs://') or not uri.endswith('.json'):
                continue
            else:
                uri = uri.replace('ipfs://', 'https://ipfs.io/ipfs/')
                project_data = get_ipfs_meta(uri)
                if not all(elem in project_data for elem in required_dict_fields):
                    continue
                else:
                    temp_project = {
                        "title": project_data['name'],
                        "address": acc,
                        "img": project_data['image'].replace('ipfs://', 'https://ipfs.io/ipfs/'),
                        "goal": project_data['fundAmount'],
                        "raised": random.randint(0, int(project_data['fundAmount'])),
                        "uri": nft.get('URI'),
                        "about": project_data['about'],
                    }
                    all_projects.append(temp_project)
    return all_projects

def get_all_projects():
    '''
    Gets all projects signed up for funding in GreenGreet
        + input: None
        + output: all_projects (list(dict))
    '''
    required_dict_fields = ['name', 'summary', 'projectDescription', 'about', 'fundAmount', 'image']
    all_accs = get_all_addresses()
    all_projects = []
    for acc in all_accs:
        data = get_nfts_in_acc(acc)
        curr_acc_nfts = data.get("account_nfts")
        all_projects.extend(only_green_nfts(curr_acc_nfts, acc))
    return all_projects

def generate_nft_account():
    '''
    Generates a new account for an NFT
        + input: None
        + output: list(address, seed, sequence)
    '''
    nft_account = xrpl.wallet.generate_faucet_wallet(client=client)
    return [nft_account.classic_address, nft_account.seed, nft_account.sequence]

def lookup_escrow(acc_add):
    '''
    Gets all pending escrows for an account
        + input: acc_add (str)
        + output: escrows (list(dict))
    '''
    acc_obj = xrpl.models.requests.AccountObjects(
        account=str(acc_add),
        type="escrow",
        ledger_index="validated"
    )
    try:
        acc_obj_resp = client.request(acc_obj)
        return acc_obj_resp
    except Exception as e:
        print(e)
        return None

def finish_escrow(conditionID="A0258020AE754FFD727D78F6B7314E729028103A0B202EAD12502BF8468582B0D3BA1D70810120", 
                    fulfillment="A0228020383017C58C9F43BC4D7D9200FAF41944EAD92DA1A30E7C3E2178929C960BA68D",
                    offer_sequence=30687544):
    '''
    Fulfills an escrow transaction to grant funds to the project
        + input: conditionID (str), fulfillment (str), offer_sequence (int)
        + output: escrow_finish (dict), oracle_acc (XRPL Wallet)
    '''
    oracle_acc = Wallet(seed=oracle['secret'], sequence=oracle['sequence'])

    escrow_finish = EscrowFinish(
        account=str(oracle['address']),
        owner=str(source['address']),
        condition=conditionID,
        fulfillment=fulfillment,
        offer_sequence=offer_sequence
    )
    return escrow_finish, oracle_acc

def create_escrow(condition = "A0258020AE754FFD727D78F6B7314E729028103A0B202EAD12502BF8468582B0D3BA1D70810120",
                fulfillment = "A0228020383017C58C9F43BC4D7D9200FAF41944EAD92DA1A30E7C3E2178929C960BA68D",
                from_acc_wallet = Wallet(seed=source['secret'], sequence=source['sequence']),
                to_add = "rG56XxHfdjjqvCsRNoYdVjMpJLAmJumsDJ",
                amount=10):
    '''
    Creates a conditional escrow transaction to hold funds for a project
        + input: condition (str), fulfillment (str), from_acc_wallet (XRPL Wallet), to_add (str), amount (int)
        + output: escrow_create (XRPL EscrowCreate), from_acc (str), condition (str), fulfillment (str)
    '''
    # secret = os.urandom(32)
    # #fulfillment = PreimageSha256(preimage=secret)
    rippleOffset = 946684800
    cancelAfter = int(datetime.datetime.now().timestamp()) + (30*24*60*60) - rippleOffset

    # Create a Escrow Create transaction
    from_acc = from_acc_wallet
    escrow_create = EscrowCreate(
        amount=xrpl.utils.xrp_to_drops(amount),
        account=str(from_acc.classic_address),
        destination=str(to_add),
        destination_tag=None,
        cancel_after=cancelAfter,
        condition=condition
    )
    return escrow_create, from_acc, condition, fulfillment

def sign_and_submit(tx, from_acc):
    '''
    Signs and submits a transaction to the XRPL
        + input: tx (Transaction object), from_acc (XRPL Wallet)
        + output: tx_response (dict)
    '''
    signed_tx = xrpl.transaction.safe_sign_and_autofill_transaction(tx, from_acc, client)
    max_ledger = signed_tx.last_ledger_sequence
    tx_id = signed_tx.get_hash()
    try:
        tx_response = xrpl.transaction.send_reliable_submission(signed_tx, client)
    except xrpl.transaction.XRPLReliableSubmissionException as e:
        exit(f"Submit failed: {e}")
    return tx_response.result

def nft_storage_upload(file_from_form, file_name, file_type, projectData):
    '''
    Uploads an NFT to the NFT Storage API
        + input: file_from_form (file.read()), file_name (str), file_type (str), projectData (dict)
        + output: nft_uri (str)
    '''
    if not NFT_STORAGE_KEY:
        raise Exception("NFT_STORAGE_KEY is not set")
    else:
        url = "https://api.nft.storage/store"
        payload = {'meta': json.dumps(projectData)}
        files = [('image', (file_name, file_from_form, file_type))]

        headers = {
            'accept': 'application/json',
            'Authorization': 'Bearer {}'.format(NFT_STORAGE_KEY)
        }

        response = requests.request("POST", url, headers=headers, data=payload, files=files).json()
        if response.get('ok'):
            return response.get('value').get('url')
        else:
            raise Exception("NFT Storage upload failed")

@app.route('/')
def root():
    if 'acc' in request.cookies and 'secret' in request.cookies and 'sequence' in request.cookies:
        return render_template('index.html', account=request.cookies.get('acc'))
    else:
        return redirect('/connect')

@app.route('/connect')
def connect():
    if 'acc' in request.cookies and 'secret' in request.cookies and 'sequence' in request.cookies:
        return render_template('connect.html', account=request.cookies.get('acc'))
    return render_template('connect.html', account="not-linked")

@app.route('/generate-account', methods=['POST'])
def generate_account():
    # Generate a new account and return it as a json
    acc, secret, sequence = generate_nft_account()
    return jsonify({'acc': acc, 'secret': secret, 'sequence': sequence})

@app.route('/getescrowdata', methods=['POST'])
def lookup():
    address = request.get_json().get('address')
    if not address:
        return jsonify({'error': 'Missing Address'}), 400
    else:
        try:
            return jsonify(lookup_escrow(address)), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    return 'ok'

@app.route('/createescrow', methods=['POST'])
def create():
    to_acc = request.get_json().get('address')
    from_acc_wallet = Wallet(seed=request.get_json().get('secret'), sequence=request.get_json().get('sequence'))
    amt = request.get_json().get('amount')
    escrow_create, from_acc, condition, fulfillment = create_escrow(from_acc_wallet=from_acc_wallet, to_add=to_acc, amount=int(amt))
    tx_result = sign_and_submit(escrow_create, from_acc)
    add_address_to_db(from_acc_wallet.classic_address)
    return jsonify(tx_result), 200
    
@app.route('/fulfillescrow', methods=['POST'])
def fulfillescrow():
    conditionID = request.cookies.get('conditionID')
    fulfillment = request.cookies.get('fulfillment')
    escrow_seq = int(request.cookies.get('escrow_seq'))
    escrow_finish, oracle_acc = finish_escrow(conditionID=conditionID, fulfillment=fulfillment, offer_sequence=escrow_seq)
    seq = sign_and_submit(escrow_finish, oracle_acc)
    return jsonify(seq), 200

@app.route('/mint', methods=['POST'])
def mint_token():
    fields = ['projectname', 'summary', 'pdesc', 'about', 'fundamount']

    # NOTE: PoC code only to get account & secret from cookies
    account = request.cookies.get('account')
    secret = request.cookies.get('secret')

    if not account or not secret:
        return jsonify({'error': 'no account set'}), 401

    for field in fields:
        if field not in request.form or request.form[field] == '':
            return jsonify({'error': 'Missing field: {}'.format(field)}), 400
    
    if len(request.files) == 0:
        return jsonify({'error': 'Missing file'}), 400

    meta_obj = {
        'name': request.form.get('projectname'),
        'summary': request.form.get('summary'),
        'projectDescription': request.form.get('pdesc'),
        'about': request.form.get('about'),
        'fundAmount': request.form.get('fundamount'),
        'image': 'undefined',
    }
    file_from_form = request.files['files[]']

    try:
        ipfs_metadata_url = nft_storage_upload(file_from_form.read(), file_from_form.filename, file_from_form.content_type, meta_obj)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    add_address_to_db(account)
    return jsonify({'url': ipfs_metadata_url}), 200

@app.route('/minted-nft/<account>')
def minted_nft(account):
    return render_template('browse.html', account=account)

@app.route('/getnftdata', methods=['POST'])
def getnftdata():
    URI = request.get_json().get('URI')
    if not URI:
        return jsonify({'error': 'Missing URI'}), 400
    else:
        URI = URI.replace('ipfs://', '')
        try:
            metadata = requests.get('https://ipfs.io/ipfs/{}'.format(URI)).json()
            metadata['image'] = 'https://ipfs.io/ipfs/{}'.format(metadata.get('image').replace('ipfs://', ''))
            return jsonify(metadata), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

@app.route('/list-nfts')
def list_nfts():
    all_projects = get_all_projects()
    return jsonify(all_projects), 200

@app.route('/details/<address>/<uri>')
def details(address, uri):
    URI = xrpl.utils.hex_to_str(uri)
    add = request.cookies.get('acc')
    return render_template('details.html', nft_owner_address=address, ipfs_minted_url=URI, account=add)

@app.route('/mint')
def mint():
    if 'acc' in request.cookies and 'secret' in request.cookies and 'sequence' in request.cookies:
        return render_template('mint.html', account=request.cookies.get('acc'))
    return redirect("/")

@app.route('/profile/<account>')
def profile(account):
    acc_nfts = get_nfts_in_acc(account).get("account_nfts")
    green_nfts = only_green_nfts(acc_nfts, account)
    return render_template('profile.html', account=account, nfts=green_nfts)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)