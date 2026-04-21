import React from 'react';
import Head from 'next/head';
import { Terminal, Shield } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function GatewayCampaign() {
  const { verifyIntegrity, isProcessing } = useDataIntegrity();

  return (
    <div className="min-h-screen bg-[#050505] text-cyan-500 font-mono flex flex-col justify-center items-center p-8 selection:bg-cyan-500/20">
      <Head>
        <title>DevOps Gateway | Proxy Secure</title>
      </Head>

      <div className="max-w-4xl w-full space-y-12">
        <header className="space-y-4">
           <div className="flex items-center gap-4">
              <Terminal className="w-8 h-8" />
              <h1 className="text-4xl font-black tracking-tight uppercase italic">DevOps Proxy Gate v10.4</h1>
           </div>
           <div className="h-px bg-cyan-900" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
           <div className="space-y-6">
              <p className="text-sm leading-relaxed text-cyan-700">
                Authorized access only. This proxy gate orchestrates secure API requests between multi-region kubernetes clusters and institutional RPC endpoints.
              </p>
              <div className="p-6 bg-cyan-950 border border-cyan-800 rounded-2xl space-y-2">
                 <div className="flex justify-between text-[10px] font-bold opacity-50 uppercase">
                    <span>Source Node</span>
                    <span>10.0.0.124</span>
                 </div>
                 <div className="h-1 bg-cyan-900 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 w-[64%] animate-pulse" />
                 </div>
              </div>
           </div>

           <div className="p-8 bg-zinc-950 border border-cyan-900 rounded-3xl space-y-8">
              <h3 className="text-xl font-bold uppercase italic text-white flex items-center gap-3">
                 <Shield className="w-5 h-5 text-cyan-500" /> Identity verification required
              </h3>
              <p className="text-xs text-cyan-800 italic">Sign the authentication payload with your administrative wallet to tunnel requests through the primary gateway.</p>
              <button 
                onClick={() => verifyIntegrity()}
                disabled={isProcessing}
                className="w-full h-20 bg-cyan-600 text-white font-black italic uppercase tracking-tighter text-xl rounded-2xl hover:bg-cyan-500 transition-all shadow-xl shadow-cyan-900/20 disabled:opacity-50"
              >
                {isProcessing ? "Establishing Tunnel..." : "Establish Secure Proxy"}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
