import React from 'react';
import Head from 'next/head';
import { Terminal, Cpu, Globe, Lock, Shield, Activity } from 'lucide-react';

export default function C10APICampaign() {
  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col font-mono overflow-hidden">
      <Head>
        <title>API-GATEWAY | Developer Console</title>
      </Head>

      {/* Grid Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(18,18,18,1)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,1)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none" />

      {/* Console Header */}
      <div className="h-14 border-b border-white/5 bg-[#0a0a0a] flex items-center justify-between px-6 relative z-10">
         <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
               <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/40" />
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Gateway v4.1.2 // auth_proxy_live</span>
         </div>
         <div className="flex items-center gap-6 text-[10px] font-bold text-slate-600">
            <span>Uptime: 142d:12h:04s</span>
            <span className="text-emerald-500">Node: NY-DC-12</span>
         </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 relative z-10 overflow-hidden">
         
         {/* Control Panel */}
         <div className="p-10 lg:p-20 space-y-12 border-r border-white/5 bg-black/40 overflow-y-auto no-scrollbar">
            <div className="space-y-4">
               <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center text-blue-500">
                  <Cpu className="w-7 h-7" />
               </div>
               <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase italic">API_INFILTRATE<span className="animate-pulse">_</span></h1>
               <p className="text-slate-500 text-sm font-medium leading-relaxed italic max-w-sm">
                 Dependency confusion and SDK proxy hijacking. Gain atomic control over 3rd party integrations via high-reputation node injection.
               </p>
            </div>

            <div className="space-y-6">
                <div className="p-8 rounded-[2rem] bg-zinc-950 border border-blue-500/20 space-y-6">
                   <h3 className="text-xs font-black text-blue-500 uppercase">Injection Vector</h3>
                   <div className="grid grid-cols-2 gap-3">
                      <button className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-[10px] font-bold text-blue-400">NPM_CONFUSION</button>
                      <button className="p-4 rounded-2xl bg-zinc-900 border border-white/5 text-[10px] font-bold text-slate-500">PYPI_SHADOW</button>
                      <button className="p-4 rounded-2xl bg-zinc-900 border border-white/5 text-[10px] font-bold text-slate-500">CDN_POISON</button>
                      <button className="p-4 rounded-2xl bg-zinc-900 border border-white/5 text-[10px] font-bold text-slate-500">GIT_SUBMODULE</button>
                   </div>
                </div>
                
                <button className="w-full h-20 bg-blue-600 text-white font-black italic rounded-[2rem] text-xl uppercase tracking-tighter shadow-xl shadow-blue-600/20 hover:scale-[1.02] transition-all">
                   Unleash SDK Proxy
                </button>
            </div>
         </div>

         {/* Monitor Area */}
         <div className="p-10 lg:p-20 flex flex-col h-full bg-[#030303]/40">
            <div className="flex-1 rounded-[2.5rem] bg-black border border-white/5 p-8 font-mono text-[11px] space-y-2 overflow-y-auto no-scrollbar relative shadow-inner">
               <div className="absolute top-0 left-0 w-1 h-full bg-blue-900/40" />
               <p className="text-blue-500 mb-2">/* API-INFILTRATE SESSION INITIALIZED */</p>
               <p className="text-slate-700">// Searching for vulnerable dependency trees...</p>
               <p className="text-white/40 italic">[!] Potential collision found: @metamask/auth-verify-proxy v1.2.4 (PRIVATE)</p>
               <p className="text-white/40 italic">[!] Potential collision found: @coinbase/sdk-v2-adapter v0.9.8 (INTERNAL)</p>
               <div className="h-4" />
               <p className="text-emerald-500 font-bold">[SUCCESS] Node 0x82... initiated shadow build.</p>
               <p className="text-white/70 animate-pulse">[WAITING] Awaiting victim package synchronization...</p>
               <div className="mt-8 flex gap-1 items-center">
                  <span className="text-blue-500">$</span>
                  <div className="w-2 h-4 bg-blue-500 animate-pulse" />
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}
