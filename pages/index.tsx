import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Shield, 
  Target, 
  Zap, 
  Terminal, 
  Activity, 
  Globe, 
  Cpu, 
  Lock,
  ChevronRight,
  LayoutDashboard,
  Box,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function OmnilogicDashboard() {
  return (
    <div className="min-h-screen bg-[#020408] text-white selection:bg-blue-500/30">
      <Head>
        <title>SENTINEL | OMNILOGIC SaaS</title>
      </Head>

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />

      {/* Main Layout */}
      <div className="flex h-screen overflow-hidden">
        
        {/* Navigation Sidebar */}
        <aside className="w-20 lg:w-64 border-r border-white/5 bg-[#03060d]/80 backdrop-blur-3xl flex flex-col items-center lg:items-start py-8 px-4 z-50">
          <div className="flex items-center gap-3 px-2 mb-12">
            <div className="h-8 w-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Shield className="w-5 h-5" />
            </div>
            <span className="hidden lg:block text-xl font-black tracking-tighter italic">SENTINEL</span>
          </div>

          <nav className="flex-1 w-full space-y-2">
            <NavItem icon={LayoutDashboard} label="Dashboard" active />
            <NavItem icon={Target} label="Campaigns" href="/campaigns" />
            <NavItem icon={Cpu} label="Payload Builder" href="/builder" />
            <NavItem icon={Globe} label="C2 Terminal" href="/c2" />
            <NavItem icon={BarChart3} label="Analytics" />
          </nav>

          <div className="w-full pt-8 border-t border-white/5 space-y-2">
            <NavItem icon={Lock} label="OMEGA Access" color="text-amber-500" />
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          
          {/* Header */}
          <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#020408]/50 backdrop-blur-xl sticky top-0 z-40">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-[10px] font-black text-blue-500 uppercase tracking-widest">System Online</span>
              <h2 className="text-sm font-bold text-slate-400">Master Control Terminal</h2>
            </div>
            <div className="flex items-center gap-4">
               <div className="h-10 w-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-xs font-bold ring-2 ring-blue-500/20">
                 J
               </div>
            </div>
          </header>

          <div className="p-8 lg:p-12 space-y-12">
            
            {/* Hero Section */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Institutional Grade</span>
              </div>
              <h1 className="text-6xl font-black tracking-tighter mb-4 italic">OMNILOGIC<span className="text-blue-600">_</span>V2</h1>
              <p className="text-slate-500 max-w-2xl text-lg font-medium">
                The ultimate SaaS orchestration platform for multi-vector simulation. 
                Manage C4-C10 campaigns with atomic precision and polymorphic stealth.
              </p>
            </section>

            {/* Campaign Standalone Links */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
               <CampaignCard id="V4" name="Liquidity Rescuer" status="Live" icon={Box} color="blue" href="/rescuemetic" />
               <CampaignCard id="V5" name="Registry Auditor" status="Live" icon={Shield} color="emerald" href="/auditlytic" />
               <CampaignCard id="V6" name="Rebate Aggregator" status="Standby" icon={Zap} color="amber" href="/rebate-agg" />
               <CampaignCard id="V7" name="Delegate Consensus" status="Live" icon={Activity} color="purple" href="/consensus-gate" />
               <CampaignCard id="V8" name="Precision Trade Authority" status="High Perf" icon={Target} color="red" href="/authority-node" />
               <CampaignCard id="v9" name="Hardware Integrity Bridge" status="Omega" icon={Lock} color="rose" href="/integrity-bridge" />
               <CampaignCard id="v10" name="DevOps Proxy Gate" status="Primed" icon={Terminal} color="cyan" href="/gateway-proxy" />
            </section>

            {/* Active Feed */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 bg-[#05070a] border border-white/5 rounded-[2rem] p-8">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-xl font-bold italic">PROLIFERATION FEED</h3>
                     <span className="text-xs font-mono text-slate-500">Real-time Beacon Stream</span>
                  </div>
                  <div className="space-y-4 font-mono text-[11px]">
                     <LogItem time="06:05:12" msg="[C2] Beacon: N-1024 (BASE) Identity Capture Successful." color="text-blue-500" />
                     <LogItem time="06:05:08" msg="[C9] Ledger Vector: Metamorphic shift complete." color="text-emerald-500" />
                     <LogItem time="06:04:59" msg="[C8] Jupiter Authority: Execution successful (0.42 SOL Captured)." color="text-amber-500" />
                     <div className="h-px bg-white/5 my-4" />
                     <LogItem time="06:04:30" msg="🔥 [APEX] GLOBAL DEPLOYMENT COMPLETE. GHOSTS ARE LIVE." color="text-red-500 font-bold" />
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="bg-blue-600 p-8 rounded-[2rem] shadow-2xl shadow-blue-600/30 group">
                     <Zap className="w-8 h-8 text-white mb-6 group-hover:scale-110 transition-transform" />
                     <h3 className="text-lg font-black italic mb-2 uppercase tracking-tighter">Initiate Build</h3>
                     <p className="text-blue-100/70 text-sm mb-6">Mutate all campaign logic with Metamorph v3. AST-flattening active.</p>
                     <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors">Start Sequence</button>
                  </div>
               </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, color = "text-white", href }: any) {
  return (
    <div className={`p-4 rounded-2xl flex items-center gap-4 transition-all cursor-pointer ${active ? 'bg-blue-600/10 border border-blue-500/20 text-blue-500' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}>
      <Icon className={`w-5 h-5 ${active ? 'text-blue-500' : color}`} />
      <span className="hidden lg:block text-xs font-bold tracking-tight">{label}</span>
    </div>
  );
}

function CampaignCard({ id, name, status, icon: Icon, color, href }: any) {
  const colorMap: any = {
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    red: "text-red-400 bg-red-500/10 border-red-500/20",
    rose: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  };

  return (
    <Link href={href}>
      <div className="bg-[#05070a] border border-white/5 rounded-3xl p-6 group hover:border-white/20 transition-all cursor-pointer relative overflow-hidden">
        <div className={`absolute top-0 right-0 p-4`}>
           <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${colorMap[color]}`}>{status}</span>
        </div>
        <div className={`w-12 h-12 rounded-2xl mb-4 flex items-center justify-center ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <h4 className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">{id} VECTOR</h4>
        <h3 className="text-xl font-black italic">{name}</h3>
        <div className="mt-8 flex items-center justify-between group-hover:translate-x-1 transition-transform">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Standalone Route</span>
          <ChevronRight className="w-4 h-4 text-slate-700" />
        </div>
      </div>
    </Link>
  );
}

function LogItem({ time, msg, color }: any) {
  return (
    <div className="flex items-center gap-4 group/item">
       <span className="text-slate-700 text-[9px] font-bold italic">{time}</span>
       <span className={`${color} text-[10px] group-hover/item:translate-x-1 transition-transform`}>{msg}</span>
    </div>
  );
}
