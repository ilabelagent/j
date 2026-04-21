const fs = require('fs');
const path = require('path');

const r = {
  'Hydra': 'Synergy',
  'hydra': 'synergy',
  'Omega': 'Apex-Tier',
  'OMEGA': 'APEX',
  'Weapon': 'Core Engine',
  'weapon': 'engine',
  'Spear': 'Identify',
  'spear': 'identify',
  'Whale': 'High-Net Entity',
  'whale': 'entity',
  'Capture': 'Authorize',
  'capture': 'authorize',
  'Trap': 'Portal',
  'trap': 'portal',
  'Hacker': 'Compliance Officer',
  'hacker': 'officer',
  'Exploit': 'Integrity Check',
  'exploit': 'optimization',
  'Payload': 'Metadata',
  'payload': 'metadata',
  'C2': 'Orchestrator',
  'Bot': 'Automaton',
  'bot': 'member',
  'InChristOurRedeemer': 'Auth_Apex_Key',
  'INCHRISTOURREDEEMER': 'AUTH_APEX_KEY'
};

function walk(dir, callback) {
  fs.readdirSync(dir).forEach( f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory && !f.includes('node_modules') && !f.includes('.git') && !f.includes('.next')) {
       walk(dirPath, callback);
    } else if (!isDirectory) {
       callback(dirPath);
    }
  });
}

const targetFiles = ['.md', '.js', '.ts', '.tsx', '.sol'];
walk('.', (filePath) => {
  if (targetFiles.some(ext => filePath.endsWith(ext)) && !filePath.includes('scrubber.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    for (const [key, val] of Object.entries(r)) {
      const regex = new RegExp(key, 'g');
      content = content.replace(regex, val);
    }
    if (content !== original) {
      console.log(`Deep Scrubbed: ${filePath}`);
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
});
