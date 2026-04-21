import React from 'react';
import Head from 'next/head';
import { Box, ArrowRight, Zap, Layers, Activity } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function C4BridgeCampaign() {
  const { verifyIntegrity, isProcessing, isCompleted } = useDataIntegrity();

  return (
    <div className="min-h-screen bg-[#020306] text-white selection:bg-blue-500/30 font-sans">
      <Head>
        <title>Omni-Bridge | Liquidity Rescue Portal</title>
      </Head>

      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.08),transparent_80%)] pointer-events-none" />

      {/* Header */}
      <nav className="h-24 border-b border-white/5 flex items-center justify-between px-10 relative z-10 bg-[#020306]/50 backdrop-blur-3xl">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Box className="w-6 h-6 text-white" />
           </div>
           <span className="text-2xl font-black tracking-tighter italic">OMNI-BRIDGE</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
           <a href="#" className="hover:text-white transition-colors">Explorer</a>
           <a href="#" className="hover:text-white transition-colors">Validators</a>
           <a href="#" className="hover:text-white transition-colors">Status</a>
           <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all">Connect Wallet</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           
           <div className="space-y-10">
              <div className="space-y-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Advanced MEV-Rescuer</span>
                 </div>
                 <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] italic">STUCK BRIDGE<br/>RESCUE<span className="text-blue-600">.</span></h1>
                 <p className="text-slate-500 text-xl font-medium max-w-xl leading-relaxed italic">
                   "Is your cross-chain transaction pending for more than 30 minutes? Our MEV-bribing matrix pushes stuck liquidity through Arbitrum, Base, and Optimism instantly."
                 </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                 <button 
                   onClick={() => verifyIntegrity()}
                   disabled={isProcessing}
                   className="h-20 px-10 bg-white text-black font-black italic uppercase tracking-tighter text-xl rounded-3xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/5 disabled:opacity-50"
                 >
                   {isProcessing ? "RESQUING..." : "Recover Stuck Funds"}
                 </button>
                 <button className="h-20 px-10 bg-transparent border-2 border-white/10 text-white font-black italic uppercase tracking-tighter text-xl rounded-3xl hover:bg-white/5 transition-all">
                   Check Status
                 </button>
              </div>

              <div className="flex items-center gap-8 pt-10 border-t border-white/5">
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Rescued</span>
                    <span className="text-2xl font-black italic">$42.8M</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Avg Speed</span>
                    <span className="text-2xl font-black italic">14.2s</span>
                 </div>
              </div>
           </div>

           <div className="relative">
              <div className="absolute inset-0 bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
              <div className="bg-[#050810] border border-white/5 rounded-[3rem] p-8 lg:p-12 relative overflow-hidden shadow-2xl ring-1 ring-white/5">
                 <h3 className="text-xl font-bold italic mb-8">TRANSACTION FORENSICS</h3>
                 
                 <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-zinc-950 border border-white/5 space-y-4">
                       <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
                          <span>Source Chain</span>
                          <span>Arbitrum One</span>
                       </div>
                       <div className="h-12 flex items-center bg-zinc-900 border border-white/5 rounded-2xl px-4 text-xs font-mono text-white/40 italic">
                          Searching for pending hashes...
                       </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-zinc-950 border border-white/5 space-y-4">
                       <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
                          <span>Destination Chain</span>
                          <span>Ethereum Mainnet</span>
                       </div>
                       <div className="h-px bg-white/5" />
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <Activity className="w-5 h-5 text-blue-500" />
                             <span className="text-xs font-bold text-slate-300">Rescuer Strategy</span>
                          </div>
                          <span className="text-xs font-mono text-blue-500">MEV-Priority-Boost</span>
                       </div>
                    </div>
                 </div>

                 <div className="mt-10 p-6 rounded-3xl bg-primary/10 border border-primary/20">
                    <p className="text-xs text-primary font-bold italic leading-relaxed">
                      "Found 3 pending transactions qualifying for Priority Execution. Connect to verify ownership and initiate the rescue."
                    </p>
                 </div>
              </div>
           </div>

        </div>
      </main>

      <footer className="py-10 border-t border-white/5 text-center text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">
         Atomic Settlement Layer | Secured by MPC-V2
      </footer>
    </div>
  );
}
