import React from 'react';
import Head from 'next/head';
import { Activity, Landmark, Shield, ChevronRight, Globe, Users } from 'lucide-react';

export default function C7DAOCampaign() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-purple-500/30 overflow-hidden">
      <Head>
        <title>Sovereign | DAO Governance Portal</title>
      </Head>

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(168,85,247,0.05),transparent_70%)] pointer-events-none" />

      {/* Header */}
      <nav className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-black/50 backdrop-blur-3xl relative z-10">
         <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-600/20">
               <Landmark className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black italic tracking-tighter uppercase">Sovereign<span className="text-purple-600">DAO</span></span>
         </div>
         <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Sign In</button>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-10 py-20 relative z-10 w-full">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            <div className="lg:col-span-7 space-y-12">
               <div className="space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 text-purple-500 font-black text-[10px] uppercase tracking-[0.2em]">
                     <Activity className="w-4 h-4 animate-pulse" />
                     Live Proposal
                  </div>
                  <h1 className="text-7xl font-black italic tracking-tighter leading-none">GOVERNANCE<br/>DELEGATE<span className="text-purple-600">.</span></h1>
                  <p className="text-slate-400 text-lg font-medium max-w-xl leading-relaxed italic">
                    "Vote on Protocol Proposal #82: Security Upgrade & Treasury Distribution. Delegate your voting weight to earn governance rebates."
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-4 max-w-lg">
                  <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 space-y-2">
                     <Users className="w-5 h-5 text-purple-400" />
                     <h4 className="text-xs font-bold text-white">Delegated Power</h4>
                     <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Earn 4.2% daily rebate on delegated weight.</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 space-y-2">
                     <Shield className="w-5 h-5 text-emerald-400" />
                     <h4 className="text-xs font-bold text-white">Security Gated</h4>
                     <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Verify ownership via multi-sig handshake.</p>
                  </div>
               </div>

               <button className="h-20 px-12 bg-white text-black font-black italic text-xl uppercase tracking-tighter rounded-3xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-white/5">
                  Connect & Vote Now
               </button>
            </div>

            <div className="lg:col-span-5 h-[600px] overflow-hidden">
               <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] h-full flex flex-col p-8 space-y-8 relative overflow-hidden ring-1 ring-white/5 shadow-2xl">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                     <Globe className="w-32 h-32 text-purple-500 animate-spin-slow" />
                  </div>
                  <h3 className="text-xl font-bold italic z-10">TREASURY STREAM</h3>
                  <div className="flex-1 space-y-4 z-10">
                     <ProposalItem title="#82 Security Upgrade" weight="14.2M" status="Voting" />
                     <ProposalItem title="#81 Treasury Swap" weight="8.1M" status="Passed" />
                     <ProposalItem title="#80 LP Distribution" weight="22.5M" status="Passed" />
                     <ProposalItem title="#79 Fee Burn" weight="6.9M" status="Failed" />
                  </div>
                  <div className="p-6 rounded-3xl bg-purple-500/5 border border-purple-500/20 z-10">
                     <p className="text-[10px] text-purple-400 font-bold italic leading-relaxed uppercase tracking-widest text-center">
                        Total Treasury: $42,850,212.00
                     </p>
                  </div>
               </div>
            </div>

         </div>
      </main>

      <footer className="mt-auto py-10 text-center text-[9px] font-black text-slate-800 uppercase tracking-[0.5em] border-t border-white/5">
         Sovereign Consensus Network // ARCH-7
      </footer>
    </div>
  );
}

function ProposalItem({ title, weight, status }: any) {
  return (
    <div className="flex items-center justify-between p-5 rounded-2xl bg-zinc-950 border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer group">
       <div className="flex flex-col">
          <span className="text-xs font-bold text-white group-hover:text-purple-400 transition-colors uppercase italic tracking-tighter">{title}</span>
          <span className="text-[9px] text-slate-600 font-mono italic">Weight: {weight} $GOV</span>
       </div>
       <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${
          status === 'Voting' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' : 'bg-zinc-900 text-slate-700 border-white/5'
       }`}>{status}</span>
    </div>
  );
}
