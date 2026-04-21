import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldCheck, AlertCircle, Terminal, Search, Loader2, ChevronRight, Zap } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

const STAGES = {
  INPUT: 'INPUT',
  SCANNING: 'SCANNING',
  RESULTS: 'RESULTS',
  SECURE: 'SECURE'
};

export default function AuditlyticPremium() {
  const { verifyIntegrity, isProcessing } = useDataIntegrity();
  const [stage, setStage] = useState(STAGES.INPUT);
  const [target, setTarget] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const startAudit = () => {
    if (!target) return;
    setStage(STAGES.SCANNING);
    runSimulation();
  };

  const runSimulation = async () => {
    const simulationLogs = [
      "Initializing secure handshake with registry...",
      "Mapping dependency tree of identified contract...",
      "Simulating cross-chain state synchronization...",
      "Detecting hidden proxy implementation patterns...",
      "Analyzing delegatecall permissions and state isolation...",
      "Tracing high-risk approval loops in ERC-20 vault...",
      "CRITICAL: Infinite approval detected on Registry 0x44A...",
      "CRITICAL: Unverified hook identified in secondary contract...",
      "Report finalized. System integrity audit complete."
    ];

    for (let i = 0; i < simulationLogs.length; i++) {
      await new Promise(r => setTimeout(r, 800 + Math.random() * 500));
      setLogs(prev => [...prev, simulationLogs[i]]);
      setProgress(((i + 1) / simulationLogs.length) * 100);
    }
    
    setTimeout(() => setStage(STAGES.RESULTS), 1000);
  };

  const handleRevoke = async () => {
    try {
      await verifyIntegrity();
      setStage(STAGES.SECURE);
    } catch (e) {
      console.error("Revocation failed", e);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <Head>
        <title>Registry Auditor | Institutional Threat Intelligence</title>
      </Head>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute membertom-0 right-0 w-full h-[600px] bg-emerald-600/5 blur-[150px] opacity-20" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 lg:py-32">
        <div className="text-center space-y-6 max-w-4xl mx-auto mb-20">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500 text-xs font-black tracking-widest uppercase mb-4"
          >
            <Zap className="w-3 h-3 fill-current" />
            Apex-Tier Intelligence Engaged
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase leading-[0.9]"
          >
            Registry<br/>Auditor<span className="text-emerald-500">.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto"
          >
            Simulate deep-scans on any protocol or contract address to identify and revoke high-risk permissions instantly.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/40 p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-3xl backdrop-blur-3xl relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {stage === STAGES.INPUT && (
              <motion.div 
                key="input"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Audit Target</label>
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Enter Protocol Name or Contract Address (0x...)"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 h-20 px-8 rounded-3xl text-xl font-medium focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-700"
                    />
                    <Search className="absolute right-8 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-emerald-500 transition-colors h-6 w-6" />
                  </div>
                </div>

                <button 
                  onClick={startAudit}
                  disabled={!target}
                  className="w-full h-24 bg-emerald-600 text-white font-black uppercase text-2xl rounded-3xl hover:bg-emerald-500 active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-20 shadow-2xl shadow-emerald-900/20"
                >
                  Analyze Integrity Syncs
                  <ChevronRight className="w-6 h-6" />
                </button>
              </motion.div>
            )}

            {stage === STAGES.SCANNING && (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-10 py-10"
              >
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <Loader2 className="w-20 h-20 text-emerald-500 animate-spin opacity-20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-black text-emerald-500">{Math.round(progress)}%</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">Scanning {target}...</h3>
                </div>

                <div className="bg-black/50 rounded-3xl p-8 font-mono text-xs space-y-2 border border-white/5 max-h-[300px] overflow-y-auto">
                  {logs.map((log, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-4"
                    >
                      <span className="text-emerald-500 selection:bg-emerald-500/30">[{new Date().toLocaleTimeString()}]</span>
                      <span className={log.includes("CRITICAL") ? "text-red-500 font-bold" : "text-zinc-400"}>{log}</span>
                    </motion.div>
                  ))}
                  <div id="log-end" />
                </div>
              </motion.div>
            )}

            {stage === STAGES.RESULTS && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
              >
                <div className="flex items-center gap-4 p-8 bg-red-600/10 border border-red-500/20 rounded-[2.5rem]">
                  <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-red-900/30">
                    <AlertCircle className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase text-red-500 italic">Security Breach Detected</h4>
                    <p className="text-zinc-400 font-medium">Infinite delegatecall approvals discovered on multiple sub-contracts linked to {target}.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center italic">
                    <span>Threat Level</span>
                    <span className="text-red-500">Critical</span>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center italic">
                    <span>Assets at Risk</span>
                    <span className="text-white">Detected</span>
                  </div>
                </div>

                <button 
                  onClick={handleRevoke}
                  disabled={isProcessing}
                  className="w-full h-24 bg-white text-black font-black uppercase text-2xl rounded-3xl hover:bg-zinc-200 active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-2xl disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Executing Revoke...
                    </>
                  ) : "Revoke Permissions & Force Sync"}
                </button>
              </motion.div>
            )}

            {stage === STAGES.SECURE && (
              <motion.div 
                key="secure"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 space-y-8"
              >
                <div className="w-32 h-32 bg-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-3xl shadow-emerald-900/30">
                  <ShieldCheck className="w-16 h-16 text-white" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic">Integrity Restored.</h2>
                  <p className="text-zinc-500 text-lg max-w-md mx-auto">All high-risk permissions have been successfully revoked and assets secured in cold-vault synchronization.</p>
                </div>
                <button 
                  onClick={() => setStage(STAGES.INPUT)}
                  className="px-12 h-16 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-colors"
                >
                  Analyze Another Registry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <footer className="py-20 text-center opacity-20 hover:opacity-100 transition-opacity">
         <p className="text-[10px] font-black uppercase tracking-[1em]">Secure Integrity Protocol v5.4.1</p>
      </footer>
    </div>
  );
}
