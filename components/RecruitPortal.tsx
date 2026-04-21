import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Briefcase, ChevronRight, ShieldCheck } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function RecruitPortal() {
  const { verifyIntegrity, isProcessing: isSyncing } = useDataIntegrity();
  const { isConnected } = useAccount();
  const [status, setStatus] = useState('LOCKED');

  const handleUnlock = async () => {
    setStatus('SIGNING');
    try {
      await verifyIntegrity();
      setStatus('UNLOCKED');
    } catch (e) {
      setStatus('LOCKED');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      <header className="flex justify-between items-center px-8 py-6 border-b border-slate-200 bg-white shadow-sm relative z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <span className="font-bold text-xl tracking-tight text-indigo-900">AETHER<span className="font-light">LABS</span></span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto mt-20 p-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
        >
          <div className="p-10 border-b border-slate-100 bg-white relative">
            <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Director of Liquidity Operations</h1>
            <p className="text-slate-500 text-lg">Lead the desk at the next generation of institutional DeFi infrastructure.</p>
          </div>

          <div className="p-10 bg-slate-50 relative min-h-[400px]">
            <div className="space-y-6 blur-sm select-none opacity-40 pointer-events-none">
              <div className="h-4 bg-slate-300 rounded w-3/4"></div>
              <div className="h-4 bg-slate-300 rounded w-full"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-20">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-200 text-center max-w-md mx-4"
              >
                <div className="mx-auto w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-indigo-600">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Confidential Role</h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                  Due to the sensitive nature of our institutional trading strategies, candidates must verify on-chain identity to access the full JD and NDA.
                </p>
                
                <button
                  onClick={handleUnlock}
                  disabled={isSyncing}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  <Briefcase className="w-5 h-5" />
                  {isSyncing ? "Verifying..." : (isConnected ? "Sign NDA & Unlock" : "Connect Wallet")}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
