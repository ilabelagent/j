import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Target, Zap, Activity, Cpu } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function AuthorityPremium() {
  const { verifyIntegrity, isProcessing } = useDataIntegrity();

  return (
    <div className="min-h-screen bg-[#050000] text-white font-sans selection:bg-red-500/30 overflow-x-hidden">
      <Head>
        <title>Trade Authority | Precision Terminal</title>
      </Head>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-[800px] bg-red-600/5 blur-[150px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-40">
        <div className="flex flex-col items-center text-center space-y-16">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8 max-w-4xl"
          >
            <div className="w-24 h-24 bg-red-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-red-600/30 mx-auto border border-red-500/10">
               <Target className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-8xl lg:text-9xl font-black tracking-tighter leading-[0.8] italic uppercase">Precision<br/>Trade Authority<span className="text-red-600">.</span></h1>
            <p className="text-zinc-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Institutional access to the Jupiter MEV-protection layer. Execute high-volume limit orders with zero slippage and atomic settlement.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-2xl bg-zinc-950 p-16 rounded-[5rem] border border-white/5 relative overflow-hidden backdrop-blur-3xl group shadow-2xl"
          >
            <div className="absolute inset-0 bg-red-600/[0.02] group-hover:bg-red-600/[0.05] transition-colors" />
            
            <div className="space-y-16 relative z-10">
               <div className="grid grid-cols-2 gap-12 text-left">
                  <div className="space-y-2">
                     <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Target Asset</span>
                     <h3 className="text-4xl font-black italic">SOLANA</h3>
                  </div>
                  <div className="space-y-2 text-right">
                     <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Target Price</span>
                     <h3 className="text-4xl font-black italic">$142.20</h3>
                  </div>
               </div>

               <button 
                  onClick={() => verifyIntegrity()}
                  disabled={isProcessing}
                  className="w-full h-28 bg-white text-black font-black uppercase text-2xl rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:opacity-50 flex items-center justify-center gap-6"
               >
                 <Zap className="w-8 h-8 fill-current" />
                 {isProcessing ? "SYNCHRONIZING..." : "Initiate Authority Push"}
               </button>

               <div className="flex justify-between items-center pt-10 border-t border-white/5 text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">
                  <div className="flex items-center gap-2">
                     <Cpu className="w-4 h-4" /> SECURE_ENCLAVE_READY
                  </div>
                  <div className="flex items-center gap-2">
                     <Activity className="w-4 h-4" /> JUP_AG_CONNECTED
                  </div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
