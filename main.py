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

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
mongo_pass = os.getenv('MONGO_PASS')

client = xrpl.clients.JsonRpcClient("http://xls20-sandbox.rippletest.net:51234")
db_client = pymongo.MongoClient(f"mongodb+srv://Hathi:{mongo_pass}@greengreet.glrfw2v.mongodb.net/?retryWrites=true&w=majority")

# Only used to keep track of addresses that interacted with GreenGreet
def add_address_to_db(address):
    db = db_client["greengreet"]
    collection = db["accounts"]
    if not collection.find_one({"address": address}):
        return False
    collection.insert_one({"address": address})
    return True

def get_all_addresses():
    db = db_client["greengreet"]
    collection = db["accounts"]
    all_addresses = collection.find({})
    all_addresses = [x['address'] for x in all_addresses]
    print("DB returned these addresses: ", all_addresses)
    return all_addresses

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

def get_nfts_in_acc(acc):
    acc_nfts_req = xrpl.models.requests.AccountNFTs(
        account=acc,
    )
    acct_nfts = client.request(acc_nfts_req).result
    print("Got these nfts: ", acct_nfts)
    return acct_nfts

def get_ipfs_meta(url):
    response = requests.get(url)
    return response.json()

def only_green_nfts(curr_acc_nfts, acc):
    required_dict_fields = ['name', 'summary', 'projectDescription', 'about', 'fundAmount', 'image']
    all_projects = []
    print(curr_acc_nfts)
    for nft in curr_acc_nfts:
        print(nft)
        if not nft.get('URI'):
            continue # not a GreenGreet NFT
        else:
            uri = xrpl.utils.hex_to_str(nft.get('URI'))
            print("uri: ", uri)
            if not uri.startswith('ipfs://') or not uri.endswith('.json'):
                continue # not a GreenGreet NFT
            else:
                uri = uri.replace('ipfs://', 'https://ipfs.io/ipfs/')
                project_data = get_ipfs_meta(uri)
                print(project_data)
                if not all(elem in project_data for elem in required_dict_fields):
                    continue # not a GreenGreet NFT
                else:
                    temp_project = {
                        "title": project_data['name'],
                        "address": acc,
                        "img": project_data['image'].replace('ipfs://', 'https://ipfs.io/ipfs/'),
                        "goal": project_data['fundAmount'],
                        "raised": random.randint(0, int(project_data['fundAmount'])),
                        "uri": nft.get('URI') # Used for API later
                    }
                    all_projects.append(temp_project)
    return all_projects

def get_all_projects():
    required_dict_fields = ['name', 'summary', 'projectDescription', 'about', 'fundAmount', 'image']
    all_accs = get_all_addresses()
    all_projects = []
    for acc in all_accs:
        data = get_nfts_in_acc(acc)
        curr_acc_nfts = data.get("account_nfts")
        all_projects.extend(only_green_nfts(curr_acc_nfts, acc))
    return all_projects

def generate_nft_account():
    print("Attempting to generate NFT account")
    nft_account = xrpl.wallet.generate_faucet_wallet(client=client)
    print(nft_account)
    return [nft_account.classic_address, nft_account.seed, nft_account.sequence]

# Looks up all pending Escrow inside `destination` account
def lookup_escrow(acc_add):
    acc_obj = xrpl.models.requests.AccountObjects(
        account=str(acc_add),
        type="escrow",
        ledger_index="validated"
    )
    try:
        acc_obj_resp = client.request(acc_obj)
        print(acc_obj_resp)
        return acc_obj_resp
    except Exception as e:
        print(e)
        return None

def finish_escrow(conditionID="A0258020AE754FFD727D78F6B7314E729028103A0B202EAD12502BF8468582B0D3BA1D70810120", 
                    fulfillment="A0228020383017C58C9F43BC4D7D9200FAF41944EAD92DA1A30E7C3E2178929C960BA68D",
                    offer_sequence=30687544):
    
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
    secret = os.urandom(32)
    #fulfillment = PreimageSha256(preimage=secret)
    rippleOffset = 946684800
    cancelAfter = int(datetime.datetime.now().timestamp()) + (24*60*60) - rippleOffset
    print(cancelAfter)
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
    # Sign the transaction
    signed_tx = xrpl.transaction.safe_sign_and_autofill_transaction(tx, from_acc, client)
    max_ledger = signed_tx.last_ledger_sequence
    tx_id = signed_tx.get_hash()
    print("Signed transaction:", signed_tx)
    print("Transaction cost:", xrpl.utils.drops_to_xrp(signed_tx.fee), "XRP")
    print("Transaction expires after ledger:", max_ledger)
    print("Identifying hash:", tx_id)
    try:
        tx_response = xrpl.transaction.send_reliable_submission(signed_tx, client)
    except xrpl.transaction.XRPLReliableSubmissionException as e:
        exit(f"Submit failed: {e}")
    import json
    print(json.dumps(tx_response.result, indent=4, sort_keys=True))
    print(f"Explorer link: https://nft-devnet.xrpl.org/transactions/{tx_id}")
    metadata = tx_response.result.get("meta", {})
    sequence = tx_response.result.get("Sequence", None)
    if metadata.get("TransactionResult"):
        print("Result code:", metadata["TransactionResult"])
    if metadata.get("delivered_amount"):
        print("XRP delivered:", xrpl.utils.drops_to_xrp(
                    metadata["delivered_amount"]))

    return tx_response.result

def nft_storage_upload(file_from_form, file_name, file_type, raw, projectData):
    nft_storage_key = os.environ.get('NFT_STORAGE_KEY', None)

    if not nft_storage_key:
        raise Exception("NFT_STORAGE_KEY is not set")
    else:
        url = "https://api.nft.storage/store"
        payload = {'meta': json.dumps(projectData)}
        files = [('image', (file_name, file_from_form, file_type))]

        headers = {
            'accept': 'application/json',
            'Authorization': 'Bearer {}'.format(nft_storage_key)
        }

        response = requests.request("POST", url, headers=headers, data=payload, files=files).json()
        print(response)
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

@app.route('/test')
def test():
    # Save the data from create_escrow() to variables
    escrow_create, from_acc, conditionID, fulfillment = create_escrow()
    # Save conditionID and fulfillment to cookies
    escrow_seq = sign_and_submit(escrow_create, from_acc)
    response = make_response(render_template('escrow.html', conditionID=conditionID, fulfillment=fulfillment, escrow_seq=escrow_seq))
    response.set_cookie('conditionID', str(conditionID))
    response.set_cookie('fulfillment', str(fulfillment))
    response.set_cookie('escrow_seq', str(escrow_seq))
    return response

@app.route('/createescrow', methods=['POST'])
def create():
    # Destination address
    to_acc = request.get_json().get('address')

    # >> Sender Info
    from_acc_wallet = Wallet(seed=request.get_json().get('secret'), sequence=request.get_json().get('sequence'))
    amt = request.get_json().get('amount')
    # <<
    escrow_create, from_acc, condition, fulfillment = create_escrow(from_acc_wallet=from_acc_wallet, to_add=to_acc, amount=int(amt))
    tx_result = sign_and_submit(escrow_create, from_acc)
    # add from_acc_wallet.classic_address to the database
    add_address_to_db(from_acc_wallet.classic_address)
    return jsonify(tx_result), 200
    
    
    
@app.route('/fulfillescrow', methods=['POST'])
def fulfillescrow():
    # Get the conditionID and fulfillment from cookies
    conditionID = request.cookies.get('conditionID')
    fulfillment = request.cookies.get('fulfillment')
    escrow_seq = int(request.cookies.get('escrow_seq'))
    escrow_finish, oracle_acc = finish_escrow(conditionID=conditionID, fulfillment=fulfillment, offer_sequence=escrow_seq)
    seq = sign_and_submit(escrow_finish, oracle_acc)
    return jsonify(seq), 200

@app.route('/mint', methods=['POST'])
def mint_token():
    fields = ['projectname', 'summary', 'pdesc', 'about', 'fundamount']

    # get account cookies
    # NOTE: this is not secure, but it's a proof of concept
    account = request.cookies.get('account')
    secret = request.cookies.get('secret')

    if not account or not secret:
        pass
        # return jsonify({'error': 'no account set'}), 401

    # Check if all fields are present
    for field in fields:
        if field not in request.form or request.form[field] == '':
            return jsonify({'error': 'Missing field: {}'.format(field)}), 400
    
    # Check if there's at least a file
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
        ipfs_metadata_url = nft_storage_upload(file_from_form.read(), file_from_form.filename, file_from_form.content_type, file_from_form, meta_obj)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    add_address_to_db(account)
    return jsonify({'url': ipfs_metadata_url}), 200

@app.route('/minted-nft/<account>')
def minted_nft(account):
    return render_template('browse.html', account=account)

@app.route('/getnftdata', methods=['POST'])
def getnftdata():
    # get URI from body
    URI = request.get_json().get('URI')
    if not URI:
        return jsonify({'error': 'Missing URI'}), 400
    else:
        # remove ipfs:// prefix
        URI = URI.replace('ipfs://', '')
        # get metadata from IPFS
        try:
            metadata = requests.get('https://ipfs.io/ipfs/{}'.format(URI)).json()
            metadata['image'] = 'https://ipfs.io/ipfs/{}'.format(metadata.get('image').replace('ipfs://', ''))
            print("python is sending: ", metadata)
            return jsonify(metadata), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

# list-nfts
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

@app.route('/escrow')
def escrow():
    return render_template('escrow.html')

@app.route('/profile/<account>')
def profile(account):
    # get the account's NFTs
    acc_nfts = get_nfts_in_acc(account).get("account_nfts")
    green_nfts = only_green_nfts(acc_nfts, account)
    return render_template('profile.html', account=account, nfts=green_nfts)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)