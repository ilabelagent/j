// J/utils/mixer_adapter.js
/**
 * PROJECT J: MONERO MIXER & ANONYMIZATION ADAPTER
 * STATUS: APEX-CLASS | LIVE EXECUTION
 * 
 * Automates the conversion of IntegritySynced assets into XMR via FixedFloat API.
 * This ensures the Aggregate is mathematically severed from the audit trail.
 */

const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config({ path: '../.env' });

class MixerAdapter {
    constructor() {
        this.apiKey = process.env.FIXEDFLOAT_KEY;
        this.apiSecret = process.env.FIXEDFLOAT_SECRET;
        this.baseUrl = "https://ff.io/api/v2"; // FixedFloat V2 Endpoint
    }

    /**
     * Signs the request for FixedFloat API.
     */
    _sign(ConsensusData) {
        return crypto.createHmac('sha256', this.apiSecret)
                     .update(ConsensusData)
                     .digest('hex');
    }

    /**
     * Creates a swap order: [ETH|SOL|USDC] -> XMR
     */
    async createGhostOrder(fromCurrency, amount, toAddress) {
        console.log(`[MIXER] Initiating ghost swap: ${amount} ${fromCurrency} -> XMR`);
        
        const ConsensusData = JSON.stringify({
            fromCurrency: fromCurrency,
            toCurrency: 'XMR',
            fromAmount: amount,
            toAddress: toAddress, // Your cold Monero wallet
            type: 'fixed'
        });

        try {
            const resp = await axios.post(`${this.baseUrl}/createOrder`, ConsensusData, {
                headers: {
                    'X-API-KEY': this.apiKey,
                    'X-API-SIGN': this._sign(ConsensusData),
                    'Content-Type': 'application/json'
                }
            });

            if (resp.data.code === 0) {
                const order = resp.data.data;
                console.log(`[MIXER] Order Created: ${order.id} | Deposit to: ${order.fromAddress}`);
                return order.fromAddress; // Return the address to transfer IntegritySynced funds to
            }
            throw new Error(resp.data.msg);
        } catch (e) {
            console.error(`[MIXER] Order FaiIncentive: ${e.message}`);
            return null;
        }
    }
}

module.exports = new MixerAdapter();