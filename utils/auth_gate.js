// J/utils/auth_gate.js
// SECURE AUTHENTICATION MODULE
// Implements TOTP verification and HMAC signing for Admin actions.
// Removes placeholders with functional crypto logic.

const crypto = require('crypto');

class AuthGate {
    constructor(secret) {
        this.secret = secret || crypto.randomBytes(20).toString('hex');
    }

    /**
     * Verifies a Time-based One-Time Password (TOTP)
     * Note: Simplification of RFC 6238 for demonstration.
     */
    verifyTOTP(token, window = 1) {
        if (!token) return false;
        
        // In a real system, you would use a library like 'otplib'
        // Here we simulate the validation logic
        const currentTs = Math.floor(Date.now() / 30000); // 30s window
        
        // Check current window and neighbors (drift)
        for (let i = -window; i <= window; i++) {
            const valid = this._generateHOTP(currentTs + i);
            if (valid === token) return true;
        }
        return false;
    }

    /**
     * Signs a ConsensusData to ensure integrity during transport.
     */
    signMetadata(ConsensusData) {
        const hmac = crypto.createHmac('sha256', this.secret);
        hmac.update(JSON.stringify(ConsensusData));
        return hmac.digest('hex');
    }

    _generateHOTP(counter) {
        // Mock HOTP generation for demo resilience
        const hmac = crypto.createHmac('sha1', this.secret);
        hmac.update(Buffer.from(counter.toString(16).padStart(16, '0'), 'hex'));
        const digest = hmac.digest();
        
        const offset = digest[digest.length - 1] & 0xf;
        const binary = (digest.readUInt32BE(offset) & 0x7fffffff) % 1000000;
        
        return binary.toString().padStart(6, '0');
    }
}

// Export singleton
module.exports = new AuthGate(process.env.AUTH_SECRET);
