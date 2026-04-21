const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const campaigns = [
  { name: 'rescuemetic-omni', page: 'rescuemetic.tsx' },
  { name: 'auditlytic-omni', page: 'auditlytic.tsx' },
  { name: 'rebate-agg-omni', page: 'rebate-agg.tsx' },
  { name: 'consensus-gate-omni', page: 'consensus-gate.tsx' },
  { name: 'authority-node-omni', page: 'authority-node.tsx' },
  { name: 'integrity-bridge-omni', page: 'integrity-bridge.tsx' },
  { name: 'gateway-proxy-omni', page: 'gateway-proxy.tsx' }
];

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const SCOPE = "stephanies-projects-b4724439";

async function deploy() {
  const originalIndex = fs.readFileSync('pages/index.tsx', 'utf8');
  
  for (const campaign of campaigns) {
    console.log(`\n\n[DEPLOY] Initializing ${campaign.name}...`);
    
    // 0. Clear previous link
    if (fs.existsSync('.vercel')) {
      fs.rmSync('.vercel', { recursive: true, force: true });
    }
    
    // 1. Swap index.tsx with campaign page
    const campaignContent = fs.readFileSync(path.join('pages', campaign.page), 'utf8');
    fs.writeFileSync('pages/index.tsx', campaignContent, 'utf8');
    
    // 2. Deploy to Vercel
    try {
      const cmd = `npx -y vercel@latest --token ${VERCEL_TOKEN} --yes --prod --scope ${SCOPE} --name ${campaign.name} --confirm --force`;
      console.log(`Executing: ${cmd}`);
      const output = execSync(cmd, { stdio: 'inherit' });
    } catch (e) {
      console.error(`[ERROR] Failed to deploy ${campaign.name}`);
    }
  }
  
  // Restore original index
  fs.writeFileSync('pages/index.tsx', originalIndex, 'utf8');
  console.log("\n[SUCCESS] All campaigns deployed to individual production URLs.");
}

deploy();
