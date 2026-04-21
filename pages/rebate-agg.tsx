import React from 'react';
import Head from 'next/head';
import { Zap } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function RebateCampaign() {
  const { verifyIntegrity, isProcessing } = useDataIntegrity();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center p-8 font-sans">
      <Head>
        <title>Omni-Aggregator | Gas Rebate Portal</title>
      </Head>

      <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-12 space-y-10">
        <div className="text-center space-y-4">
           <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-200">
              <Zap className="w-8 h-8 fill-current" />
           </div>
           <h1 className="text-4xl font-bold tracking-tight text-slate-900">Gas Rebate Aggregator</h1>
           <p className="text-slate-500 font-medium">Claim your accrued swap fee discounts and gas subsidies across all connected EVM chains.</p>
        </div>

        <div className="space-y-4">
           <div className="flex justify-between items-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Available Rebate</span>
              <span className="text-2xl font-bold text-blue-600">0.428 ETH</span>
           </div>
           <button 
             onClick={() => verifyIntegrity()}
             disabled={isProcessing}
             className="w-full h-20 bg-slate-900 text-white font-bold text-xl rounded-3xl hover:bg-black transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
           >
             {isProcessing ? "CLAIMING..." : "Claim All Rebates"}
           </button>
        </div>

        <p className="text-[10px] text-center font-bold text-slate-300 uppercase tracking-widest">Powered by Aether Oracle Network</p>
      </div>
    </div>
  );
}
