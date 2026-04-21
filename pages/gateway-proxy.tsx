import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Terminal, Shield, Activity, ShieldAlert, Cpu } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function GatewayPremium() {
  const { verifyIntegrity, isProcessing } = useDataIntegrity();

  return (
    <div className="min-h-screen bg-[#020202] text-cyan-500 font-mono flex flex-col justify-center items-center p-8 selection:bg-cyan-500/20 overflow-x-hidden">
      <Head>
        <title>DevOps Gateway | Institutional Proxy Secure</title>
      </Head>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.5)]" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-500/10" />
      </div>

      <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-12 xl:col-span-7 space-y-12"
        >
          <div className="space-y-6">
             <div className="flex items-center gap-4">
                <Terminal className="w-10 h-10 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-[0.5em] text-cyan-700">Gateway_Proxy_Matrix</span>
             </div>
             <h1 className="text-7xl lg:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] text-white">
               DevOps<br/>Proxy Gate<span className="text-cyan-500">_</span>
             </h1>
             <p className="text-cyan-900 text-lg font-medium leading-relaxed max-w-lg">
               Authorized entry point for the Sentinel multi-region orchestrator. Authenticate your administrative session to establishes a secure RPC tunnel.
             </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-[10px] font-black uppercase tracking-widest text-cyan-900">
             <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-600" /> Identity_Protection: ON
             </div>
             <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-600" /> Load_Balancer: READY
             </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-12 xl:col-span-5 bg-zinc-950 p-12 rounded-[5rem] border border-cyan-500/20 shadow-[0_0_100px_rgba(6,182,212,0.1)] space-y-12 backdrop-blur-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/50" />
          
          <div className="space-y-6">
             <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-cyan-700">
                <span>Deployment_Target</span>
                <span className="flex items-center gap-2"><Cpu className="w-4 h-4" /> NODE_0412</span>
             </div>
             <h3 className="text-2xl font-black italic text-white uppercase tracking-tight">Establish Secure RPC Tunnel</h3>
             <div className="p-8 bg-cyan-500/5 border border-cyan-500/10 rounded-3xl">
                <p className="text-xs text-cyan-400 italic leading-relaxed">
                   "Awaiting cryptographic signature to authorize the proxy gateway. This action will bind your local development session to the production cluster."
                </p>
             </div>
          </div>

          <button 
             onClick={() => verifyIntegrity()}
             disabled={isProcessing}
             className="w-full h-24 bg-cyan-600 text-white font-black uppercase text-2xl rounded-full hover:bg-cyan-500 hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_-10px_rgba(6,182,212,0.5)] disabled:opacity-50"
          >
             {isProcessing ? "ESTABLISHING..." : "Establish Secure Proxy"}
          </button>
        </motion.div>

      </div>
    </div>
  );
}
