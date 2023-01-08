//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Context.sol";
import "./Owner.sol";
// import "../TRC721Token.sol";

/** 
CactusProject Initial Contract Specifications:
    - Holds data from sustainable projects written by a 'writer' address
    - Allows users to create a project with the required data
    - Allows all users to list all projects
    - Allows all users to list all projects by a specific writer (account)
    - Allows users to donate to a project (in TRX)
    - Allows 1 user to purchase the entire project (in TRX)
    - Allows users to list all project purchases (by project ID)
    - Allows users to list all project donations (by project ID)
    - Allows users to list all project purchases (by user address)
    - Allows users to list all project donations (by user address)
    - Allows the writer to collect all the funds for the project if it has been purchased
    - If the project passed the deadline, the write can not collect the funds. The funds will be returned to the donors.
    - gives points to the donors for their donations (1 point per 1 TRX)
    - gives points to the purchaser for their purchase (2 points times initial project price)
*/
contract CactusProject is Owner{

    // Global Variable that defines the Smart Contract address for the TRC721 Token
    // TRC721Token Smart Contract
    address public TRC721ContractAddress; // @Todo continue
    
    struct Donation {
        uint256 projectId;
        uint256 amount;
        address payable userAddress;
        uint256 donationDate;
        uint8 fulfilled;
    }
    uint256 public donationId;
    mapping (uint256 => Donation) public donations; // all donations

    struct Purchase {
        uint256 projectId;
        uint256 amount;
        address payable userAddress;
        uint256 purchaseDate;
    }
    uint256 public purchaseId;
    mapping (uint256 => Purchase) public purchases; // all purchases

    struct Project {
        // project details
        string name;
        string description;
        string metadataURI; // expects a json at the endpoint
        uint256 deadline; // deadline for the project to be funded by an entire purchase

        // pricing settings
        uint256 entirePrice;
        uint256 currentPrice; // current price of the project (entirePrice - totalDonated) [private, internal]
        uint256 minDonation;

        // quantity of donations and totalFunded so far
        uint256 amountOfDonations;
        // array of donation ids
        uint256[] donationIds;
        uint256 totalFunds;

        // address of the project writer
        address payable writer;

        // address of the project purchaser
        address payable purchaser;

        // internal
        // project status/validity
        // 0 = not funded (deadline has passed, return money to donors & blocks all interactions),
        // 1 = funded (give money to the write and block donations and purchases),
        // 2 = valid (not funded, but still within the deadline so allow interactions)
        uint8 status;
    }
    uint256 public projectId;
    mapping (uint256 => Project) public projects; // all projects

    struct User {
        uint256 id;
        uint256 points;
        address payable userAddress;
        uint256[] donationIds;
        uint256[] purchaseIds;
        uint256[] projectIds;
        uint256 CreationDate;
    }
    uint256 public userId;
    mapping (address => User) public users; // users by address

    // function to set the CactusToken address only by the owner
    function setCactusTokenAddress(address _cactusTokenAddress) public onlyOwner {
        TRC721ContractAddress = _cactusTokenAddress;
    }

    function getUserDonations(address _userAddress) public view returns (Donation[] memory) {
        uint256[] memory donationIds = users[_userAddress].donationIds;
        Donation[] memory userDonations = new Donation[](donationIds.length);
        for (uint256 i = 0; i < donationIds.length; i++) {
            userDonations[i] = donations[donationIds[i]];
        }
        return userDonations;
    }

    function getUserProjectsIds(address _userAddress) public view returns (uint256[] memory) {
        return users[_userAddress].projectIds;
    }
    function getUserDonationIds(address _userAddress) public view returns (uint256[] memory) {
        return users[_userAddress].donationIds;
    }
    function getUserPurchaseIds(address _userAddress) public view returns (uint256[] memory) {
        return users[_userAddress].purchaseIds;
    }

    function createProject(string memory _name, string memory _description, string memory _metadataURI, uint256 _entirePrice) public returns (bool success) {
        require(_entirePrice > 0, "Entire price must be greater than 0");

        projects[projectId] = Project({
            name: _name,
            description: _description,
            metadataURI: _metadataURI,
            deadline: block.timestamp + 30 days,
            entirePrice: _entirePrice,
            currentPrice: _entirePrice,
            minDonation: 5 * 10**6,
            amountOfDonations: 0,
            donationIds: new uint256[](0),
            totalFunds: 0,
            writer: payable(msg.sender),
            purchaser: payable(address(0)),
            status: 2
        });

        if (users[msg.sender].userAddress == address(0)) {
            users[msg.sender] = User({
                id: userId,
                points: 0,
                userAddress: payable(msg.sender),
                donationIds: new uint256[](0),
                purchaseIds: new uint256[](0),
                projectIds: new uint256[](0),
                CreationDate: block.timestamp
            });
            userId++;
        }
        users[msg.sender].projectIds.push(projectId);

        emit ProjectCreated(projectId++, _name, _description, _metadataURI, block.timestamp + 30 days, _entirePrice, 5 * 10**6, msg.sender);
        return true;
    }
    // @TODO internal function to mintWithTokenURI a TRC721 Token for the given projectId
    // function mintWithTokenURI(uint256 _projectId) internal {
    //     // mintWithTokenURI a TRC721 Token for the given projectId
    //     CactusToken(TRC721ContractAddress).mintWithTokenURI(msg.sender, _projectId, projects[_projectId].metadataURI);
    // }

    function getProjectDonations(uint256 _projectId) public view returns (Donation[] memory) {
        uint256[] memory donationIds = projects[_projectId].donationIds;
        Donation[] memory projectDonations = new Donation[](donationIds.length);
        for (uint256 i = 0; i < donationIds.length; i++) {
            projectDonations[i] = donations[donationIds[i]];
        }
        return projectDonations;
    }
    // get donation ids for a project
    function getProjectDonationIds(uint256 _projectId) public view returns (uint256[] memory) {
        return projects[_projectId].donationIds;
    }

    function listProjects() public view returns (Project[] memory) {
        Project[] memory allProjects = new Project[](projectId);
        for (uint256 i = 0; i < projectId; i++) {
            allProjects[i] = projects[i];
        }
        return allProjects;
    }

    function donate(uint256 _projectId) public payable returns (bool success) {
        require(_projectId < projectId, "Project ID does not exist");
        require(projects[_projectId].status == 2, "Project is not valid");
        require(msg.value >= projects[_projectId].minDonation, "Donation amount is less than the minimum donation amount");
        require(msg.value < projects[_projectId].currentPrice, "Donation amount is greater than or equal the current price of the project");
        uint256 _ts = block.timestamp;
        if (_ts > projects[_projectId].deadline) {
            projects[_projectId].status = 0;
            emit ProjectDeadlinePassed(_projectId, _ts);
            refund(_projectId);
            return false;
        }
        // update project
        projects[_projectId].amountOfDonations++;
        projects[_projectId].currentPrice -= msg.value;
        projects[_projectId].totalFunds += msg.value;

        // update user & create user if not exists
        if (users[msg.sender].userAddress == address(0)) {
            users[msg.sender] = User({
                id: userId++,
                points: 0,
                userAddress: payable(msg.sender),
                donationIds: new uint256[](0),
                purchaseIds: new uint256[](0),
                projectIds: new uint256[](0),
                CreationDate: _ts
            });
        }
        users[msg.sender].points += msg.value / 10**6; // 1 TRX = 1 point

        donations[donationId] = Donation({
            projectId: _projectId,
            amount: msg.value,
            donationDate: _ts,
            userAddress: payable(msg.sender),
            fulfilled: 0
        });
        users[msg.sender].donationIds.push(donationId);
        projects[_projectId].donationIds.push(donationId);
        donationId++;
        emit DonationMade(_projectId, msg.value, msg.sender);
        return true;
    }

    // function to purchase the project if and only if the project is valid and
    // the user pays the current price
    function purchase(uint256 _projectId) public payable returns (bool success) {
        require(_projectId < projectId, "Project ID does not exist");
        require(projects[_projectId].status == 2, "Project is not valid");
        require(msg.value == projects[_projectId].currentPrice, "Payment amount is not equal to the current price of the project");
        uint256 _ts = block.timestamp;
        if (projects[_projectId].deadline < _ts) {
            projects[_projectId].status = 0;
            emit ProjectDeadlinePassed(_projectId, _ts);
            refund(_projectId);
            return false;
        }
        
        projects[_projectId].purchaser = payable(msg.sender); 
        projects[_projectId].status = 1; // Funded Status :D
        projects[_projectId].totalFunds += msg.value;

        // update user & create user if not exists
        if (users[msg.sender].userAddress == address(0)) {
            users[msg.sender] = User({
                id: userId++,
                points: 0,
                userAddress: payable(msg.sender),
                donationIds: new uint256[](0),
                purchaseIds: new uint256[](0),
                projectIds: new uint256[](0),
                CreationDate: _ts
            });
        }
        // Higher acquisition (encourages projects to be fully funded)
        // you receive 2x amount of points of the entire price of the project only paying
        // the current price of the project
        users[msg.sender].points += 2 * projects[_projectId].entirePrice / 10**6;

        purchases[purchaseId] = Purchase({
            projectId: _projectId,
            purchaseDate: _ts,
            userAddress: payable(msg.sender),
            amount: msg.value
        });
        users[msg.sender].purchaseIds.push(purchaseId);
        purchaseId++;

        for (uint256 i = 0; i < projects[_projectId].donationIds.length; i++) {
            donations[projects[_projectId].donationIds[i]].fulfilled = 1;
        }
        // call function to transfer the money from the smart contract balance to the writer
        transferFunds(_projectId);
        emit ProjectPurchased(_projectId, msg.value, msg.sender);
        return true;
    }

    // Transfer the funds from the smart contract balance to the writer of the project
    function transferFunds(uint256 _projectId) internal {
        require(projects[_projectId].status == 1, "Project is not funded");
        projects[_projectId].writer.transfer(projects[_projectId].totalFunds);
    }

    // function to refund the project if deadline has reached
    function refund(uint256 _projectId) public returns (bool success) {
        require(_projectId < projectId, "Project ID does not exist");
        require(projects[_projectId].status != 1, "Project reached its funding goal and it was paid");
        require(block.timestamp > projects[_projectId].deadline, "Deadline has not reached yet");
        require(projects[_projectId].currentPrice != 0, "Project is already funded");

        projects[_projectId].status = 0; // Refunded Status :(
        projects[_projectId].purchaser = payable(address(0));

        // refund the donations to the users who donated and remove their points
        uint256[] memory donationIds = projects[_projectId].donationIds;
        for (uint256 i = 0; i < donationIds.length; i++) {
            Donation memory donation = donations[donationIds[i]];
            donation.userAddress.transfer(donation.amount);
            donation.fulfilled = 2; // refunded status (no points given)
            users[donation.userAddress].points -= donation.amount / 10**6;
        }
         
        emit ProjectRefunded(_projectId, projects[_projectId].entirePrice, msg.sender);
        return true;
    }

    // generate cool log events
    event ProjectCreated(uint256 indexed projectId, string name, string description, string metadataURI, uint256 deadline, uint256 entirePrice, uint256 minDonation, address writer);
    event DonationMade(uint256 indexed projectId, uint256 amount, address userAddress);
    event ProjectPurchased(uint256 indexed projectId, uint256 amount, address userAddress);
    event ProjectDeadlinePassed(uint256 indexed projectId, uint256 timestamp);
    event ProjectRefunded(uint256 indexed projectId, uint256 amount, address userAddress);
}

