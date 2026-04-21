import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldCheck, AlertCircle, Terminal, Search } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function AuditlyticPremium() {
  const { verifyIntegrity, isProcessing } = useDataIntegrity();
  const [scanning, setScanning] = useState(false);

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <Head>
        <title>Registry Auditor | Institutional Threat Intelligence</title>
      </Head>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-[600px] bg-emerald-600/5 blur-[120px] opacity-30" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 lg:py-40">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12 }}
            className="w-24 h-24 bg-emerald-600/10 rounded-full flex items-center justify-center border border-emerald-500/20 mx-auto"
          >
            <ShieldCheck className="w-12 h-12 text-emerald-500" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-7xl font-black tracking-tighter italic uppercase">Registry<br/>Auditor<span className="text-emerald-500">.</span></h1>
            <p className="text-zinc-500 text-xl font-medium leading-relaxed">
              Automated smart contract vulnerability scanner and approval revocation system. Deep-scan your registry for hidden high-risk permissions.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 bg-zinc-950 p-12 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-3xl"
        >
          <AnimatePresence mode="wait">
            {!scanning ? (
              <motion.div 
                key="start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-10 text-center"
              >
                <div className="flex justify-center gap-12">
                   {["EVM", "SOL", "BASE"].map(c => (
                     <span key={c} className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">{c}_ACTIVE</span>
                   ))}
                </div>
                <button 
                  onClick={() => setScanning(true)}
                  className="w-full h-24 bg-emerald-600 text-white font-black uppercase text-2xl rounded-full hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-900/20 flex items-center justify-center gap-4 group"
                >
                  <Search className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  Request Full Registry Audit
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-8">
                   <div className="flex items-center gap-4">
                      <Terminal className="w-6 h-6 text-red-500 animate-pulse" />
                      <span className="font-bold text-red-500 uppercase tracking-widest text-sm">System Alert: Critical Vulnerabilities Identified</span>
                   </div>
                   <span className="text-xs font-mono text-zinc-500">Uptime: 99.9%</span>
                </div>

                <div className="space-y-4">
                   {[
                     "Infinite Approval: Unverified Contract (0x44A...)",
                     "Potential Drain Loop: Registry Entry 142",
                     "Malicious Hook: Hidden DelegateCall"
                   ].map((err, i) => (
                     <div key={i} className="flex items-center gap-6 p-6 bg-red-600/5 border border-red-500/10 rounded-3xl">
                        <AlertCircle className="w-6 h-6 text-red-500" />
                        <span className="text-sm font-bold text-red-200 italic">{err}</span>
                     </div>
                   ))}
                </div>

                <button 
                   onClick={() => verifyIntegrity()}
                   disabled={isProcessing}
                   className="w-full h-24 bg-white text-black font-black uppercase text-2xl rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-2xl disabled:opacity-50"
                >
                  {isProcessing ? "SHIELDING ASSETS..." : "Revoke Permissions & Secure Vault"}
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
