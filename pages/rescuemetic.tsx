import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Shield, ArrowRight, Layers, Hash, Zap } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function RescuemeticPremium() {
  const { verifyIntegrity, isProcessing } = useDataIntegrity();
  const [txHash, setTxHash] = useState("");

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Head>
        <title>Omni-Bridge | Institutional Liquidity Recovery</title>
      </Head>

      {/* Hero Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-blue-600/10 blur-[150px] opacity-40" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-12"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-600/5 border border-blue-500/10 backdrop-blur-md">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[11px] font-bold text-blue-500 uppercase tracking-[0.2em]">Cross-Chain Settlement Matrix</span>
              </div>
              <h1 className="text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] italic text-white uppercase">
                STUCK FUNDS<br/>RECOVERY<span className="text-blue-600">.</span>
              </h1>
              <p className="text-zinc-500 text-xl font-medium max-w-xl leading-relaxed">
                "Our proprietary MEV-priority engine identifies and pushes pending cross-chain transactions with sub-second finality. Secure your stuck liquidity instantly."
              </p>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                 <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest block ml-6">Pending Transaction Hash</label>
                 <div className="relative group max-w-xl">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                       <Hash className="h-5 w-5 text-zinc-700 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input 
                      type="text"
                      value={txHash}
                      onChange={(e) => setTxHash(e.target.value)}
                      placeholder="0x... or Tx ID"
                      className="w-full h-20 bg-zinc-950 border border-white/5 rounded-full pl-16 pr-8 text-white font-mono placeholder:text-zinc-800 focus:outline-none focus:border-blue-500/50 transition-all text-lg tracking-tight"
                    />
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => verifyIntegrity()}
                  disabled={isProcessing || !txHash}
                  className="h-24 px-12 bg-white text-black font-black uppercase text-xl rounded-full flex items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-600/10 disabled:opacity-20 group"
                >
                  <Zap className="w-6 h-6 fill-current" />
                  {isProcessing ? "SYNCHRONIZING..." : "Initiate Recovery Sequence"}
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/5">
              {[
                { label: "Volume Rescued", val: "$142.8M" },
                { label: "Active Nodes", val: "1,248" },
                { label: "Slippage", val: "0.001%" }
              ].map((s, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{s.label}</span>
                  <p className="text-2xl font-black italic">{s.val}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="lg:col-span-12 xl:col-span-5 relative">
            <AnimatePresence mode="wait">
              {txHash ? (
                <motion.div 
                  key="forensics"
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -30 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#050505] p-12 rounded-[5rem] border border-white/5 shadow-2xl space-y-10 relative overflow-hidden backdrop-blur-3xl"
                >
                  <div className="absolute top-0 right-0 p-8">
                    <Layers className="w-16 h-16 text-blue-600/10" />
                  </div>
                  <h3 className="text-xl font-black italic text-zinc-400">TRANSACTION FORENSICS</h3>
                  
                  <div className="space-y-6">
                    <div className="p-8 rounded-[3rem] bg-black/50 border border-white/5 space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                        <span>Source Intelligence</span>
                        <span className="text-blue-500">PENDING_DETECTED</span>
                      </div>
                      <div className="h-px bg-white/5" />
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                          <Activity className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold truncate max-w-[150px]">{txHash}</p>
                          <p className="text-xs text-zinc-500">Routing via Flashbots Auction</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 rounded-[3rem] bg-blue-600/5 border border-blue-500/10 space-y-4">
                       <p className="text-xs font-bold leading-relaxed italic text-zinc-300">
                         "High-value stuck transaction identified. Establishing ownership uplink to push through the primary liquidity bridge via MEV-boost."
                       </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-white/5 rounded-[5rem]"
                >
                   <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.3em]">Awaiting Input Hash...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      <footer className="py-20 border-t border-white/5 text-center px-6">
        <div className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.5em] mb-4">
          Secured by Sentinel Quantum Guard | © 2026 OMNI-BRIDGE SYSTEM
        </div>
      </footer>
    </div>
  );
}
