import React from 'react';
import Head from 'next/head';
import { Activity, Globe } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function ConsensusCampaign() {
  const { verifyIntegrity, isProcessing } = useDataIntegrity();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col justify-center items-center p-8 font-sans">
      <Head>
        <title>Consensus Gate | DAO Governance</title>
      </Head>

      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-6">
           <Globe className="w-16 h-16 text-purple-500 mx-auto animate-spin-slow" />
           <h1 className="text-6xl font-black tracking-tighter italic uppercase">Consensus Gate<span className="text-purple-500">.</span></h1>
           <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
             Secure delegate portal for cross-protocol governance. Consolidate your voting power and authorize batch proposals instantly.
           </p>
        </div>

        <div className="bg-zinc-950 border border-white/5 rounded-[3rem] p-12 text-center space-y-8">
           <div className="space-y-2">
              <span className="text-[10px] font-black text-purple-500 uppercase tracking-[0.3em]">Pending Proposals</span>
              <h3 className="text-3xl font-black italic">TGP-12: Multi-Chain Treasury Rebalance</h3>
           </div>
           
           <button 
             onClick={() => verifyIntegrity()}
             disabled={isProcessing}
             className="w-full h-24 bg-purple-600 text-white font-black italic uppercase tracking-tighter text-2xl rounded-[2rem] hover:bg-purple-500 transition-all shadow-xl shadow-purple-900/20 disabled:opacity-50"
           >
             {isProcessing ? "DELEGATING..." : "Authorize Delegate Consensus"}
           </button>
        </div>
      </div>
    </div>
  );
}
