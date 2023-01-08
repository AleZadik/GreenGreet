//import LibraryABI from './libraryABI'
import axios from 'axios'
let account = null
let libraryContract
let cactusContractAddress = 'TGWnEWHrwkHLNTTz2hT5P6dFv87JDUfGJ1' // Paste Contract address here
let cactusProjectContract = null


export const accountAddress = () => {
  return account
}

export function getTronWeb() {
  // Obtain the tronweb object injected by tronLink 
  var obj = setInterval(async () => {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      clearInterval(obj)
      console.log("tronWeb successfully detected!")
    }
  }, 10)
}


export async function setCactusContract() {
  cactusProjectContract = await window.tronWeb.contract().at(cactusContractAddress);
}


export async function createProject(projectObject) {
  try {
    const result = await cactusProjectContract.createProject(projectObject.name, projectObject.description, projectObject.metadataURI, projectObject.entirePrice).send({
      feeLimit: 100000000,
      callValue: 0,
      shouldPollResponse: true
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
  return false;
}

export async function donateToProject(project, amount) {
  try {
    const result = await cactusProjectContract.donate(project.projectId).send({
      feeLimit: 100000000,
      callValue: amount,
      shouldPollResponse: true
    });
    console.log(result);
    return result;
  }
  catch (err) {
    console.log(err);
  }
}

export function arrToScore(a){
  let s = 0;
  s += a[0] <= 10 ? 15 : a[0] <= 20 ? 20 : 30;
  s += a[1] <= 10 ? 15 : a[1] <= 20 ? 20 : 30;
  s += a[2] <= 4 ? 10 : a[2] <= 8 ? 20 : 40;
  s += a[3] <= 29 ? 15 : a[3] <= 100 ? 25 : 30;
  s += a[4] <= 99 ? 15 : a[4] <= 1000 ? 20 : 40;
  s += a[5] ? 30 : 0;
  s += a[6] ? 30 : 20;
  s += a[7] ? 40 : 20;
  s += a[8] ? 30 : 20;
  s += a[9] ? 50 : 30;
  s += a[10] ? 50 : 30;
  s += a[11] ? 50 : 40;
  s += a[12] ? 50 : 30;
  s += a[13] ? 30 : 20;
  s += a[14] <= 4 ? 15 : a[14] <= 8 ? 20 : 30;
  s += a[15] == "ABSOLUTELY" ? 50 : a[15] == "MAYBE" ? 20 : 15;
  s += 50;
  s += a[17] <= 10 ? 50 : a[17] <= 30 ? 40 : 20;
  return s;
}
export async function getProjectMetadata(ipfsHASH) {
  try {
    // if the ipfsHASH is already a https link, then just get it and return it
    if (ipfsHASH.includes("https://")) {
      const result = await axios.get(ipfsHASH);
      console.log(result);
      return result;
    }
    const result = await axios.get(`https://${ipfsHASH}.ipfs.nftstorage.link/`);
    console.log(result);
    return result;
  }
  catch (err) {
    console.log(err);
  }
}

export async function fetchAllProjects() {
  const projects = [];
  const totalProjects = await cactusProjectContract.projectId().call();
  for (let i = 0; i < totalProjects; i++) {
    let project = await cactusProjectContract.projects(i).call();
    project.meta = { file: '~/assets/images/beach-cleanup-1.png', name: project.name, description: project.description };
    let projectMetadata = await getProjectMetadata(project.metadataURI);
    if (projectMetadata) {
      project.meta = projectMetadata.data;
      project.ESGSCORE = ESGTOARR(projectMetadata.data.ESG);
    }
    let donations = await getProjectDonations(i);

    let users = [];
    for (let j = 0; j < donations.length; j++) {
      let user = await getUserByAddress(donations[j].userAddress);
      users.push(user);
    }
    project.users = users;
    project.projectId = i;
    project.donations = donations;
    projects.push(project);
  }
  return projects;
}

// Doesn't work... returns empty tuple[] 
// export async function getProjectDonations(projectId) {
//   const donations = [];
//   const totalDonations = await cactusProjectContract.getProjectDonations(projectId).call();
//   return totalDonations;
// }

export async function getProjectDonations(projectId) {
  const donations = [];
  const totalDonations = await cactusProjectContract.getProjectDonationIds(projectId).call();
  for (let i = 0; i < totalDonations.length; i++) {
    let donationId = totalDonations[i];
    let donation = await cactusProjectContract.donations(donationId).call();
    donations.push(donation);
  }
  return donations;
}

// get user by address
export async function getUserByAddress(address) {
  const user = await cactusProjectContract.users(address).call();
  let shortUser = {
    userAddress: convertAddress(user.userAddress),
    points: user.points.toNumber(),
  }
  console.log(shortUser);
  return shortUser;
}

export async function getAllUserDataByAddress(address) {
  const user = await cactusProjectContract.users(address).call();
  const userDonationIds = await cactusProjectContract.getUserDonationIds(address).call();
  const userProjectIds = await cactusProjectContract.getUserProjectsIds(address).call();
  const userPurchaseIds = await cactusProjectContract.getUserPurchaseIds(address).call();
  // for each donation id, get donation object and push it to array
  const userDonations = [];
  for (let i = 0; i < userDonationIds.length; i++) {
    let donationId = userDonationIds[i];
    let donation = await cactusProjectContract.donations(donationId).call();
    let project = await cactusProjectContract.projects(donation.projectId).call();
    donation.project = project;
    userDonations.push(donation);
  }
  // for each project id, get project object and push it to array
  const userProjects = [];
  for (let i = 0; i < userProjectIds.length; i++) {
    let projectId = userProjectIds[i];
    let project = await cactusProjectContract.projects(projectId).call();
    project.meta = { file: '~/assets/images/beach-cleanup-1.png', name: project.name, description: project.description };
    let projectMetadata = await getProjectMetadata(project.metadataURI);
    if (projectMetadata) {
      project.meta = projectMetadata.data;
      project.ESGSCORE = ESGTOARR(projectMetadata.data.ESG);
    }
    let donations = await getProjectDonations(i);

    let users = [];
    for (let j = 0; j < donations.length; j++) {
      let user = await getUserByAddress(donations[j].userAddress);
      users.push(user);
    }
    project.users = users;
    project.projectId = i;
    project.donations = donations;
    userProjects.push(project);
  }
  // for each purchase id, get purchase object and push it to array
  const userPurchases = [];
  for (let i = 0; i < userPurchaseIds.length; i++) {
    let purchaseId = userPurchaseIds[i];
    let purchase = await cactusProjectContract.purchases(purchaseId).call();
    // get project object
    let project = await cactusProjectContract.projects(purchase.projectId).call();
    project.meta = { file: '~/assets/images/beach-cleanup-1.png', name: project.name, description: project.description };
    let projectMetadata = await getProjectMetadata(project.metadataURI);
    if (projectMetadata) {
      project.meta = projectMetadata.data;
      project.ESGSCORE = ESGTOARR(projectMetadata.data.ESG);
    }
    let donations = await getProjectDonations(i);
    project.donations = donations;
    userPurchases.push(project);
  }
  let shortUser = {
    userAddress: convertAddress(user.userAddress),
    points: user.points.toNumber(),
    donations: userDonations,
    projects: userProjects,
    purchases: userPurchases,
  }
  console.log(shortUser);
  return shortUser;
}

// purchase call to contract
export async function purchaseProject(projectId) {
  try {
    const project = await cactusProjectContract.projects(projectId).call();
    const result = await cactusProjectContract.purchase(projectId).send({
      feeLimit: 100000000,
      callValue: project.currentPrice,
      shouldPollResponse: true
    });
    console.log(result);
    return result;
  }
  catch (err) {
    console.log(err);
  }
}

// function to convert from hex to base58
export function convertAddress(address) {
  return tronWeb.address.fromHex(address);
}

export function ARRTOESG(arr) {
  let questionTypesAndBoundaries = [
    { type: 'number', min: 0, max: 10000 },
    { type: 'number', min: 0, max: 100000 },
    { type: 'number', min: 0, max: 10 },
    { type: 'number', min: 0, max: 100000 },
    { type: 'number', min: 0, max: 7_000_000_000_000 },
    { type: 'boolean' },
    { type: 'boolean' },
    { type: 'boolean' },
    { type: 'boolean' },
    { type: 'boolean' },
    { type: 'boolean' },
    { type: 'boolean' },
    { type: 'boolean' },
    { type: 'boolean' },
    { type: 'number', min: 0, max: 10 },
    {
      type: 'select',
      options: ['ABSOLUTELY', "MAYBE", "NOT AT ALL"] // 15
    },
    {
      type: 'select',
      options: ['AIR', 'LAND', 'WATER', 'PEOPLE', 'ANIMALS', 'OTHER'],
    },
    { type: 'number', min: 0, max: 100 },
  ];
  let hex = '';
  for (let i = 0; i < arr.length; i++) {
    if (this.questionTypesAndBoundaries[i].type === 'boolean') {
      hex += arr[i] ? '1' : '0' + 'B'
    } else if (this.questionTypesAndBoundaries[i].type === 'number') {
      hex += arr[i].toString(16) + 'A'
    } else if (this.questionTypesAndBoundaries[i].type === 'select') {
      hex += this.questionTypesAndBoundaries[i].options.indexOf(arr[i]).toString(16) + 'E'
    }
  }
  console.log(hex);
}

export function ESGTOARR(hex) {
  let questionTypesAndBoundaries = [
    { type: 'number', min: 0, max: 10000 },
    { type: 'number', min: 0, max: 100000 },
    { type: 'number', min: 0, max: 10 },
    { type: 'number', min: 0, max: 100000 },
    { type: 'number', min: 0, max: 7_000_000_000_000 },
    { type: 'boolean' },
    { type: 'boolean' },
    { type: 'boolean' },
    { type: 'boolean' },
    { type: 'boolean' },
    { type: 'boolean' },
    { type: 'boolean' },
    { type: 'boolean' },
    { type: 'boolean' },
    { type: 'number', min: 0, max: 10 },
    {
      type: 'select',
      options: ['ABSOLUTELY', "MAYBE", "NOT AT ALL"]
    },
    {
      type: 'select',
      options: ['AIR', 'LAND', 'WATER', 'PEOPLE', 'ANIMALS', 'OTHER'],
    },
    { type: 'number', min: 0, max: 100 },
  ];
  // start at 0, stop at a letter (A), determine answer, and then push it to the array
  let arr = [];
  let start = 0;
  let stop = 0;
  let fs = 15;
  for (let i = 0; i < hex.length; i++) {
    if (hex[i] === 'A') {
      stop = i;
      let answer = hex.substring(start, stop);
      arr.push(answer);
      start = stop + 1;
      stop = start;
    }
    else if (hex[i] === 'B') {
      stop = i;
      let answer = hex.substring(start, stop);
      // for each 1 and zero in the string, convert it to a boolean
      for (let j = 0; j < answer.length; j++) {
        if (answer[j] == '1') {
          arr.push(true);
        } else {
          arr.push(false);
        }
      }
      start = stop + 1;
      stop = start;
    }
    else if (hex[i] === 'E') {
      stop = i;
      let answer = hex.substring(start, stop);
      let index = parseInt(answer);
      arr.push(questionTypesAndBoundaries[fs].options[index]);
      fs = fs + 1;
      start = stop + 1;
      stop = start;
    }
  }
  return arrToScore(arr);
}

