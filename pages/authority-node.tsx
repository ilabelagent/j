import React from 'react';
import Head from 'next/head';
import { Target, Zap, Activity, Shield, ChevronRight } from 'lucide-react';

export default function C8JupiterCampaign() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30">
      <Head>
        <title>Jupiter V3 | Limit Order Sniper</title>
      </Head>

      {/* Solana Themed Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(20,241,149,0.05),transparent_70%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(153,69,255,0.05),transparent_70%)] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col h-screen">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-gradient-to-br from-[#14F195] to-[#9945FF] rounded-2xl flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#050505] rounded-[14px] flex items-center justify-center">
                   <Target className="w-6 h-6 text-[#14F195]" />
                </div>
             </div>
             <div className="flex flex-col">
                <span className="text-xl font-black italic tracking-tighter">JUPITER<span className="text-[#14F195]">V3</span></span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Authority Delegate</span>
             </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-[#14F195]/5 border border-[#14F195]/10">
                <Activity className="w-3 h-3 text-[#14F195]" />
                <span className="text-[10px] font-black text-[#14F195] uppercase tracking-widest">Global Speed: 12ms</span>
             </div>
             <button className="px-6 py-2.5 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-slate-200 transition-all">Connect SOL Wallet</button>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           
           <div className="space-y-10">
              <div className="space-y-6">
                 <h1 className="text-7xl font-black italic tracking-tighter leading-none">LIMIT ORDER<br/>SNIPER<span className="text-[#9945FF]">_</span></h1>
                 <p className="text-slate-400 text-lg font-medium leading-relaxed italic max-w-lg">
                   The most powerful limit order authority on Solana. Execute trades at precise price points with institutional-grade low-latency routing.
                 </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5">
                    <Zap className="w-5 h-5 text-[#14F195] mb-3" />
                    <h4 className="text-xs font-bold text-white mb-1">Instant Settle</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Auto-delegated authority for zero-confirmation delay.</p>
                 </div>
                 <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5">
                    <Shield className="w-5 h-5 text-[#9945FF] mb-3" />
                    <h4 className="text-xs font-bold text-white mb-1">MEV Protected</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Jito-integrated bundles to prevent frontrunning.</p>
                 </div>
              </div>
           </div>

           <div className="relative">
              <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl relative z-10">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-black uppercase italic tracking-widest text-slate-500">Order Terminal</h3>
                    <div className="flex gap-2">
                       <div className="w-2 h-2 rounded-full bg-[#14F195]" />
                       <div className="w-2 h-2 rounded-full bg-[#9945FF]" />
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-2">Sell Amount</label>
                       <div className="h-16 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between px-6">
                          <input type="text" placeholder="0.0" className="bg-transparent border-none outline-none text-xl font-bold w-1/2" />
                          <span className="text-xs font-black text-[#14F195]">SOL</span>
                       </div>
                    </div>
                    
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-2">Limit Price (USDC)</label>
                       <div className="h-16 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between px-6">
                          <input type="text" placeholder="142.45" className="bg-transparent border-none outline-none text-xl font-bold w-1/2" />
                          <span className="text-xs font-black text-slate-500">MARKET: $140.12</span>
                       </div>
                    </div>

                    <button className="w-full h-16 bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black font-black italic uppercase tracking-tighter rounded-2xl hover:scale-[1.02] active:scale-98 transition-all">
                       Place Authority Order
                    </button>
                    <p className="text-center text-[10px] text-slate-500 italic">By clicking, you delegate signing authority for this specific pair to the Sniper engine.</p>
                 </div>
              </div>
           </div>

        </div>

        <footer className="mt-auto py-10 flex items-center justify-between border-t border-white/5 text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">
           <span>Jupiter Aggregator Integrated</span>
           <span>v2.8.0-BETA</span>
        </footer>
      </div>
    </div>
  );
}
