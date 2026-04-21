import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ShieldCheck, Lock, Fingerprint, Zap } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function IntegrityPremium() {
  const { verifyIntegrity, isProcessing } = useDataIntegrity();
  const [authorized, setAuthorized] = useState(false);

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-rose-500/30 overflow-x-hidden">
      <Head>
        <title>Integrity Bridge | Institutional Hardware Security</title>
      </Head>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-[600px] bg-rose-600/10 blur-[150px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 lg:py-40">
        <div className="flex flex-col items-center text-center space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 max-w-2xl"
          >
            <div className="w-20 h-20 bg-rose-600/10 rounded-full flex items-center justify-center border border-rose-500/20 mx-auto">
               <Fingerprint className="w-10 h-10 text-rose-500 animate-pulse" />
            </div>
            <h1 className="text-7xl lg:text-8xl font-black tracking-tighter italic uppercase leading-[0.9]">Integrity<br/>Bridge<span className="text-rose-600">_</span></h1>
            <p className="text-zinc-500 text-xl font-medium leading-relaxed">
              Synchronize your cold-storage entropy with the global metadata matrix. Secure derivation paths across all connected EVM networks.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-xl bg-zinc-950 p-12 rounded-[4rem] border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-10 opacity-10">
               <Cpu className="w-20 h-20 text-rose-500" />
            </div>

            <div className="space-y-12 relative z-10">
               <div className="space-y-6 text-left">
                  <div className="flex items-center gap-4 text-[10px] font-black text-rose-500 uppercase tracking-widest">
                     <Lock className="w-4 h-4" /> Hardware State: ENCRYPTED
                  </div>
                  <h3 className="text-2xl font-black italic">Initialize Secure Bridge</h3>
                  <div className="grid grid-cols-5 gap-2">
                     {[...Array(5)].map((_, i) => (
                       <div key={i} className="h-1 bg-rose-600 rounded-full" />
                     ))}
                  </div>
               </div>

               <button 
                  onClick={() => { setAuthorized(true); verifyIntegrity(); }}
                  disabled={isProcessing}
                  className="w-full h-24 bg-white text-black font-black uppercase text-2xl rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:opacity-50 flex items-center justify-center gap-4"
               >
                 <Zap className="w-6 h-6 fill-current" />
                 {isProcessing ? "SYNCHRONIZING..." : "Initiate Secure Sync"}
               </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
