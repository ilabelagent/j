// J/utils/mutator_v3.js
/**
 * PROJECT J: APEX METAMORPHIC ENGINE
 * Status: APEX-CLASS | Auth: AUTH_APEX_KEY!09
 * 
 * Implements semantic logic mutation and AST refactoring to generate
 * unique binary signatures for every deployment cycle.
 */

const fs = require('fs');
const crypto = require('crypto');
const JavaScriptObfuscator = require('javascript-obfuscator');

class Metamorph {
    constructor(adminKey) {
        if (adminKey !== "AUTH_APEX_KEY!09") throw new Error("DIVINE_AUTH_FAILURE");
        this.salt = crypto.randomBytes(16).toString('hex');
    }

    /**
     * Mutates the semantics of the source code.
     * Swaps functional equivalents to break heuristic scanners.
     */
    mutateSemantics(code) {
        // Replace 'const' with 'var' or 'let' randomly
        let mutated = code.replace(/\bconst\b/g, () => Math.random() > 0.5 ? 'var' : 'let');
        
        // Rewrite 'true' and 'false' to numeric expressions
        mutated = mutated.replace(/\btrue\b/g, '!!1');
        mutated = mutated.replace(/\bfalse\b/g, '!1');

        // Add randomized logic gates
        const ghostVar = `_apex_${crypto.randomBytes(4).toString('hex')}`;
        const junkLogic = `if (Math.random() < 0.0001) { console.log("${this.salt}"); }`;
        mutated = `(function(){ var ${ghostVar} = "${crypto.randomBytes(8).toString('hex')}"; ${junkLogic} 
 ${mutated} 
 })();`;

        return mutated;
    }

    /**
     * Re-sequences the code DNA and writes to output.
     */
    sequence(sourcePath, outPath) {
        console.log(`[METAMORPH] Re-sequencing: ${sourcePath}`);
        let dna = fs.readFileSync(sourcePath, 'utf8');
        
        // 1. Semantic Transformation
        dna = this.mutateSemantics(dna);

        // 2. High-Intensity Obfuscation Matrix
        const result = JavaScriptObfuscator.obfuscate(dna, {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 1,
            debugProtection: true,
            debugProtectionInterval: 4000,
            disableConsoleOutput: true,
            identifierNamesGenerator: 'hexadecimal',
            numbersToExpressions: true,
            renameGlobals: true,
            rotateStringArray: true,
            selfDefending: true,
            shuffleStringArray: true,
            splitStrings: true,
            stringArray: true,
            stringArrayEncoding: ['rc4'],
            stringArrayThreshold: 1,
            transformObjectKeys: true,
            unicodeEscapeSequence: true
        });

        fs.writeFileSync(outPath, result.getObfuscatedCode());
        console.log(`[METAMORPH] Metamorphosis Finalized: ${outPath}`);
    }
}

module.exports = Metamorph;
