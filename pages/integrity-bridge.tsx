import React, { useState } from 'react';
import Head from 'next/head';
import { Lock, Cpu, ShieldCheck } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function IntegrityCampaign() {
  const { verifyIntegrity, isProcessing } = useDataIntegrity();
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#020408] text-white flex flex-col justify-center items-center p-8 font-sans">
      <Head>
        <title>Integrity Bridge | Hardware Security</title>
      </Head>

      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-6">
           <Cpu className="w-16 h-16 text-rose-500 mx-auto animate-pulse" />
           <h1 className="text-6xl font-black tracking-tighter italic uppercase underline decoration-rose-600 decoration-8 underline-offset-8">Integrity Bridge<span className="text-rose-500">_</span></h1>
           <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
             Sync your hardware signing device with the global integrity matrix. Ensure cross-chain derivation paths are secured against entropy leaks.
           </p>
        </div>

        <div className="bg-zinc-950 border border-white/5 rounded-[3rem] p-12 space-y-10 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8">
              <ShieldCheck className="w-12 h-12 text-rose-500/20 group-hover:text-rose-500/50 transition-colors" />
           </div>
           
           <div className="space-y-4">
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500">
                 <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-rose-500 text-rose-500' : 'border-white/10'}`}>1</div>
                 <span>Initialize Secure Enclave</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500">
                 <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-rose-500 text-rose-500' : 'border-white/10'}`}>2</div>
                 <span>Sync Entropy Pool</span>
              </div>
           </div>

           <button 
             onClick={() => { setStep(2); verifyIntegrity(); }}
             disabled={isProcessing}
             className="w-full h-24 bg-white text-black font-black italic uppercase tracking-tighter text-2xl rounded-[2rem] hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:opacity-50"
           >
             {isProcessing ? "SYNCHRONIZING..." : "Initiate Secure Bridge"}
           </button>
        </div>
      </div>
    </div>
  );
}
