import React, { useState } from 'react';
import Head from 'next/head';
import { Shield, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function AuditlyticCampaign() {
  const { verifyIntegrity, isProcessing } = useDataIntegrity();
  const [scanning, setScanning] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center p-8 font-sans">
      <Head>
        <title>Registry Auditor | Security Protocol</title>
      </Head>

      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-6">
           <Shield className="w-16 h-16 text-emerald-500 mx-auto animate-pulse" />
           <h1 className="text-6xl font-black tracking-tighter italic uppercase">Registry Auditor<span className="text-emerald-500">.</span></h1>
           <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
             Institutional grade vulnerability scanning for your on-chain assets. Identify and revoke high-risk contract permissions in real-time.
           </p>
        </div>

        <div className="bg-zinc-950 border border-white/5 rounded-[3rem] p-12 space-y-8">
           {!scanning ? (
             <button 
               onClick={() => setScanning(true)}
               className="w-full h-24 bg-emerald-600 text-white font-black italic uppercase tracking-tighter text-2xl rounded-[2rem] hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/20"
             >
               Start Security Audit
             </button>
           ) : (
             <div className="space-y-6">
                <div className="flex items-center gap-4 text-red-500">
                   <AlertTriangle className="w-6 h-6" />
                   <span className="font-bold uppercase tracking-widest text-sm">Critical Vulnerabilities Found</span>
                </div>
                <div className="p-6 bg-red-600/10 border border-red-500/20 rounded-3xl">
                   <p className="text-sm font-bold text-red-500 uppercase tracking-tighter mb-4 italic">CRITICAL: Infinite Approval detected on unknown contract (A0x...221)</p>
                   <button 
                     onClick={() => verifyIntegrity()}
                     disabled={isProcessing}
                     className="w-full h-20 bg-white text-black font-black italic uppercase tracking-tighter text-xl rounded-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                   >
                     {isProcessing ? "SHIELDING..." : "Revoke & Secure"}
                   </button>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
