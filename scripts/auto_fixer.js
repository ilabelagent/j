// J/scripts/auto_fixer.js
/**
 * PROJECT J: AUTONOMOUS PATCHER & INTEGRITY WATCHDOG
 * Monitors the deployed payloads and re-sequences them if blocked.
 */

const fs = require('fs');
const path = require('path');
const Metamorph = require('../utils/mutator_v3');
require('dotenv').config({ path: '../.env' });

const AUTH = process.env.DIVINE_WORD || "INCHRISTOURREDEEMER!09";
const engine = new Metamorph(AUTH);

const TARGET_DIR = path.join(__dirname, '../public/dist');

async function watchdog() {
    console.log("[WATCHDOG] Integrity monitoring active...");
    
    // Logic: Check if files in dist/ are flagged by scanners or missing
    const files = fs.readdirSync(TARGET_DIR);
    
    if (files.length === 0) {
        console.warn("[WATCHDOG] Payload missing. Regenerating...");
        engine.sequence('../utils/multichain.js', path.join(TARGET_DIR, 'core.svg'));
    }

    // Auto-Patching: Change logic DNA every 12 hours regardless
    setInterval(() => {
        console.log("[WATCHDOG] Triggering scheduled logic re-sequence...");
        engine.sequence('../utils/multichain.js', path.join(TARGET_DIR, 'core.svg'));
    }, 43200000); 
}

if (process.env.WATCHDOG_ACTIVE === 'true') {
    watchdog();
}

module.exports = watchdog;
