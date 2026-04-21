// J/contracts/Factory.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Gatekeeper.sol";

// THE HYDRA FACTORY: CREATE2 DETERMINISTIC DEPLOYMENT
// Deploys a unique gatekeeper contract for every target using CREATE2.

contract HydraFactory {
    event Deployed(address indexed addr, uint256 salt);

    // Deploys a fresh Gatekeeper for a specific target
    // Salt is typically derived from the user's address to ensure uniqueness
    function createSleeper(address _token, uint256 _salt) external returns (address) {
        // 1. Get Bytecode of the Gatekeeper
        bytes memory bytecode = abi.encodePacked(
            type(Gatekeeper).creationCode,
            abi.encode(_token) // Constructor arguments
        );

        // 2. CREATE2 Assembly
        address addr;
        assembly {
            addr := create2(
                0,              // Wei sent
                add(bytecode, 0x20), 
                mload(bytecode), 
                _salt
            )
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }

        emit Deployed(addr, _salt);
        return addr;
    }

    // Pre-compute address to show the user a "clean" address before deployment
    // This allows the frontend to interact with the address before it even exists on-chain
    function predictAddress(address _token, uint256 _salt) public view returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(Gatekeeper).creationCode,
            abi.encode(_token)
        );
        
        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                _salt,
                keccak256(bytecode)
            )
        );

        // Convert last 20 bytes to address
        return address(uint160(uint256(hash)));
    }
}