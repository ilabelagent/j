const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');
const path = require('path');

// THE FACTORY: Polymorphic Build Pipeline
// This script takes the core logic and mutates it to evade static signature detection.

const SOURCE_DIR = './components';
const DIST_DIR = './public/dist';

// Ensure dist exists
if (!fs.existsSync(DIST_DIR)){
    fs.mkdirSync(DIST_DIR, { recursive: true });
}

// 1. Randomization Utilities
const randomVar = () => '_0x' + Math.random().toString(16).substring(2, 8);
const randomString = () => Math.random().toString(36).substring(7);

// 2. Junk Code Injection (Dead Code)
// Breaks the visual structure of the code without altering logic
function injectJunk(code) {
    const junk = `
        (function() {
            var ${randomVar()} = "${randomString()}";
            var ${randomVar()} = function() { return Math.random() > 0.5 ? true : false; };
        })();
    `;
    return junk + code;
}

// 3. Obfuscation Config (High Intensity)
const obfuscationOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    debugProtection: true,
    debugProtectionInterval: 4000,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    shuffleStringArray: true,
    splitStrings: true,
    stringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayThreshold: 1,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
};

// 4. Build Process
console.log("[BUILDER] Starting Polymorphic Build Sequence...");

function buildFile(filePath) {
    try {
        const sourceCode = fs.readFileSync(filePath, 'utf8');
        console.log(`[BUILDER] Mutating: ${path.basename(filePath)}`);
        
        // Inject Junk
        const mutatedCode = injectJunk(sourceCode);
        
        // Obfuscate
        const obfuscatedResult = JavaScriptObfuscator.obfuscate(mutatedCode, obfuscationOptions);
        
        // Write with unique timestamped name
        const timestamp = Date.now();
        const outName = `core.${timestamp}.js`;
        fs.writeFileSync(path.join(DIST_DIR, outName), obfuscatedResult.getObfuscatedCode());
        
        console.log(`[BUILDER] Success: ${outName} generated.`);
        return outName;
    } catch (e) {
        console.error(`[BUILDER] Error processing ${filePath}:`, e);
    }
}

// Example: Build the main scanner logic
// In a real scenario, this would iterate over build targets
// buildFile('./components/ScannerLogic.js'); 

console.log("[BUILDER] Build Complete. Signatures Reset.");
