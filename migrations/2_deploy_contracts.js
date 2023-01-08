var LibraryContract = artifacts.require("./Library.sol");
var CactusProject = artifacts.require("./CactusProject.sol");
// context and owner libraries for CactusChain
var Context = artifacts.require("./Context.sol");
var Ownable = artifacts.require("./Owner.sol");

module.exports = function(deployer) {
   deployer.deploy(CactusProject);
   // deployer.deploy(LibraryContract);
};
