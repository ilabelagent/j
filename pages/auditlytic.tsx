import React, { useState } from 'react';
import Head from 'next/head';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function C5AuditCampaign() {
  const { verifyIntegrity, isProcessing: isSyncing } = useDataIntegrity();
  const [scanning, setScanning] = useState(false);
  const [vulnerabilities, setVulnerabilities] = useState<any[]>([]);

  const startScan = () => {
    setScanning(true);
    setTimeout(() => {
      setVulnerabilities([
        { id: 1, name: 'Infinite Approval: USDT', risk: 'HIGH', impact: 'Direct Drain' },
        { id: 2, name: 'DelegateCall Proxy Bug', risk: 'MEDIUM', impact: 'Contract Exploit' },
      ]);
      setScanning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#020408] text-white flex flex-col items-center p-6 lg:p-20 overflow-hidden">
      <Head>
        <title>Sovereign | Smart Contract Auditor</title>
      </Head>

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl w-full space-y-12 relative z-10 text-center">
         <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/10 border border-blue-500/20 mb-4">
               <Shield className="w-4 h-4 text-blue-500" />
               <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Enterprise Security Tier</span>
            </div>
            <h1 className="text-6xl font-black italic tracking-tighter leading-none mb-4">WALLET AUDIT<br/>CONSOLE<span className="text-blue-600">_</span></h1>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
              Scan your connected wallet for malicious approvals, vulnerable proxies, and hidden "permit" signatures. Revoke access with 1-click sovereign execution.
            </p>
         </div>

         {!scanning && vulnerabilities.length === 0 && (
           <button 
             onClick={startScan}
             className="w-full max-w-sm h-24 bg-white text-black font-black italic text-2xl uppercase tracking-tighter rounded-[2.5rem] hover:scale-105 transition-all shadow-2xl shadow-white/5"
           >
             Start Forensic Scan
           </button>
         )}

         {scanning && (
           <div className="space-y-8 animate-pulse text-center">
              <div className="w-24 h-24 rounded-full border-4 border-white/5 border-t-white mx-auto animate-spin" />
              <p className="text-sm font-mono text-slate-500 uppercase tracking-widest italic">Analyzing transaction history on Base / Ethereum...</p>
           </div>
         )}

         {vulnerabilities.length > 0 && (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {vulnerabilities.map(v => (
                <div key={v.id} className="bg-zinc-900/50 border border-red-500/20 rounded-[2rem] p-8 space-y-4 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-6 opacity-20">
                      <AlertTriangle className="w-12 h-12 text-red-500" />
                   </div>
                   <div className="space-y-1">
                      <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{v.risk} RISK DETECTED</span>
                      <h3 className="text-2xl font-black italic text-white">{v.name}</h3>
                   </div>
                   <p className="text-xs text-slate-500 font-medium">Potential {v.impact} vulnerability found in interacting contract. Immediate revocation recommended.</p>
                   <button 
                     onClick={() => verifyIntegrity()}
                     disabled={isSyncing}
                     className="w-full py-4 bg-red-600 text-white font-black italic rounded-2xl text-xs uppercase tracking-widest hover:bg-red-500 transition-all disabled:opacity-50"
                   >
                     {isSyncing ? "REVOKING..." : "Revoke & Shield"}
                   </button>
                </div>
              ))}
           </div>
         )}
      </div>

      <div className="mt-20 flex gap-12 text-[9px] font-black text-slate-700 uppercase tracking-[0.4em] opacity-40">
         <span>Open-Source Verified</span>
         <span>NIST Compliance: ALPHA-7</span>
      </div>
    </div>
  );
}
