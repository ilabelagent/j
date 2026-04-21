import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Globe, Users, Vote, CheckCircle2 } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function ConsensusPremium() {
  const { verifyIntegrity, isProcessing } = useDataIntegrity();

  return (
    <div className="min-h-screen bg-[#08080A] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      <Head>
        <title>Consensus Gate | Institutional DAO Governance</title>
      </Head>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-600/5 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-8">
               <div className="flex items-center gap-4 text-purple-500">
                  <Globe className="w-10 h-10 animate-spin-slow" />
                  <span className="text-xs font-black uppercase tracking-[0.4em]">Decentralized Orchestration</span>
               </div>
               <h1 className="text-8xl font-black tracking-tighter leading-[0.85] italic">CONSENSUS<br/>GATEWAY<span className="text-purple-500">.</span></h1>
               <p className="text-zinc-500 text-xl font-medium leading-relaxed max-w-lg">
                 Secure delegate portal for cross-protocol governance. Consolidate your fragmented voting power and authorize batch proposals in one secure action.
               </p>
            </div>

            <div className="space-y-6">
                {[
                  "Multi-Chain Proposal Sync",
                  "Automated Power Delegation",
                  "Instant Governance Finality"
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-4 text-zinc-400">
                     <CheckCircle2 className="w-5 h-5 text-purple-600" />
                     <span className="font-bold text-sm uppercase tracking-wide">{f}</span>
                  </div>
                ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-950 p-12 rounded-[5rem] border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-3xl space-y-12"
          >
            <div className="space-y-2 border-b border-white/5 pb-8">
               <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Active Governance Session</span>
               <h2 className="text-3xl font-black italic">TGP-12: Protocol Integrity Expansion</h2>
            </div>

            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-1">
                  <span className="text-[9px] font-black text-zinc-600 uppercase">Current Power</span>
                  <p className="text-2xl font-black">1.4M VOTE</p>
               </div>
               <div className="space-y-1 text-right">
                  <span className="text-[9px] font-black text-zinc-600 uppercase">Delegates Connected</span>
                  <p className="text-2xl font-black italic">24,102</p>
               </div>
            </div>

            <button 
               onClick={() => verifyIntegrity()}
               disabled={isProcessing}
               className="w-full h-24 bg-purple-600 text-white font-black uppercase text-2xl rounded-full hover:bg-purple-500 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-purple-900/20 flex items-center justify-center gap-4 disabled:opacity-50"
            >
              <Vote className="w-8 h-8" />
              {isProcessing ? "DELEGATING..." : "Establish Consensus"}
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
