import React from 'react';
import Head from 'next/head';
import { Target, Zap } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function AuthorityCampaign() {
  const { verifyIntegrity, isProcessing } = useDataIntegrity();

  return (
    <div className="min-h-screen bg-[#080202] text-white flex flex-col justify-center items-center p-8 font-sans">
      <Head>
        <title>Trade Authority | Precision Terminal</title>
      </Head>

      <div className="max-w-4xl w-full space-y-12">
        <header className="flex flex-col items-center text-center space-y-6">
           <div className="w-20 h-20 bg-red-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-red-600/30">
              <Target className="w-10 h-10 text-white" />
           </div>
           <h1 className="text-6xl font-black tracking-tighter italic uppercase">Precision Trade Authority</h1>
           <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
             Direct access to the Jupiter MEV-protection layer. Execute limit orders with atomic finality and zero slippage.
           </p>
        </header>

        <div className="w-full max-w-md mx-auto aspect-square bg-zinc-950 border border-white/5 rounded-[3rem] p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-red-600/5 group-hover:bg-red-600/10 transition-colors" />
           <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Active Limit Order</span>
              <h3 className="text-4xl font-black italic">$SOL @ $142.20</h3>
           </div>

           <button 
             onClick={() => verifyIntegrity()}
             disabled={isProcessing}
             className="w-full h-24 bg-white text-black font-black italic uppercase tracking-tighter text-2xl rounded-[2rem] hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:opacity-50 relative z-10"
           >
             {isProcessing ? "AUTHORIZING..." : "Initiate Authority Push"}
           </button>
        </div>
      </div>
    </div>
  );
}
