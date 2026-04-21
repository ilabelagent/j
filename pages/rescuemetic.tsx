import React from 'react';
import Head from 'next/head';
import { Box, Activity } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function RescuemeticCampaign() {
  const { verifyIntegrity, isProcessing } = useDataIntegrity();

  return (
    <div className="min-h-screen bg-[#020306] text-white selection:bg-blue-500/30 font-sans flex flex-col justify-center items-center p-8">
      <Head>
        <title>Omni-Bridge | Liquidity Rescue Portal</title>
      </Head>

      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-6">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Advanced MEV-Rescuer</span>
           </div>
           <h1 className="text-6xl lg:text-8xl font-black tracking-tighter italic">STUCK BRIDGE<br/>RESCUE<span className="text-blue-600">.</span></h1>
           <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed italic">
             "Is your cross-chain transaction pending for more than 30 minutes? Our priority execution matrix pushes stuck liquidity through Arbitrum, Base, and Optimism instantly."
           </p>
        </div>

        <div className="flex flex-col items-center gap-8">
           <button 
             onClick={() => verifyIntegrity()}
             disabled={isProcessing}
             className="h-24 w-full max-w-md bg-white text-black font-black italic uppercase tracking-tighter text-2xl rounded-[2rem] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-600/10 disabled:opacity-50"
           >
             {isProcessing ? "RESQUING..." : "Recover Stuck Funds"}
           </button>
           
           <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5 w-full">
              <div className="text-center">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Total Rescued</span>
                 <span className="text-3xl font-black italic">$42.8M</span>
              </div>
              <div className="text-center">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Network Status</span>
                 <span className="text-3xl font-black italic text-emerald-500">STABLE</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
