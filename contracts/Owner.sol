//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Context.sol";

abstract contract Owner is Context {
   address public owner;

   constructor () {
       owner = _msgSender();
   }

   /**
    * @dev Throws if called by any account other than the owner.
    */
    modifier onlyOwner() {
        require(_msgSender() == owner);
        _;
    }

    /**
     * @dev Check if the current caller is the contract owner.
     */
     function isOwner() internal view returns(bool) {
         return owner == _msgSender();
     }
}