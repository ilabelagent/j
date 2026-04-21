import React from 'react';
import Head from 'next/head';
import { Gift, Zap, Layers, Globe, Activity } from 'lucide-react';

export default function C6AirdropCampaign() {
  return (
    <div className="min-h-screen bg-[#020408] text-white flex flex-col items-center justify-center p-6 lg:p-20 overflow-hidden font-sans">
      <Head>
        <title>Aether | Epoch 4 Airdrop Claim</title>
      </Head>

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="w-full max-w-4xl space-y-12 relative z-10">
         <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 rounded-[2.5rem] bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-600/30 ring-8 ring-blue-600/10">
               <Gift className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-4">
               <h1 className="text-6xl lg:text-8xl font-black italic tracking-tighter leading-[0.9]">EPOCH 4<br/>AIRDROP<span className="text-blue-600">.</span></h1>
               <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto italic">
                 Eligible wallets can now claim their share of the Aether Protocol Genesis Distribution. 
                 Claim window closes in <span className="text-white font-mono">47:12:05</span>.
               </p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ClaimStat label="Total Pool" value="12,000,000 $AETH" />
            <ClaimStat label="Whitelisted" value="4,250 Wallets" />
            <ClaimStat label="Network" value="BASE / ARB / SOL" />
         </div>

         <div className="bg-zinc-950/80 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 lg:p-16 text-center space-y-10 shadow-2xl ring-1 ring-white/5">
            <div className="space-y-2">
               <h3 className="text-2xl font-black italic tracking-tighter uppercase">Check Your Eligibility</h3>
               <p className="text-slate-500 font-medium italic text-sm">Connect your wallet to verify your historical trading volume and rebate status.</p>
            </div>
            
            <button className="w-full h-24 bg-white text-black font-black italic text-2xl uppercase tracking-tighter rounded-[2.5rem] hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-white/5">
               Verify & Claim Airdrop
            </button>

            <p className="text-[10px] text-slate-700 font-black uppercase tracking-[0.4em]">Official Distribution Portal // Aether Labs</p>
         </div>
      </div>
    </div>
  );
}

function ClaimStat({ label, value }: any) {
  return (
    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6 text-center space-y-1">
       <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{label}</span>
       <p className="text-lg font-bold italic tracking-tight">{value}</p>
    </div>
  );
}
