import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Zap, Lock, AlertTriangle } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

export default function PriorityInterface() {
  const { verifyIntegrity, isProcessing: isSyncing } = useDataIntegrity();
  const { isConnected } = useAccount();
  const [status, setStatus] = useState('IDLE');

  const executeStrategy = async () => {
    if (!isConnected) return;
    setStatus('VERIFYING');
    try {
        await verifyIntegrity();
        setStatus('SUCCESS');
    } catch (e) {
        setStatus('FAILED');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#0a0a0a] border border-[#333] rounded-2xl overflow-hidden font-sans shadow-2xl">
      <div className="bg-[#111] p-4 border-b border-[#222] flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
          <span className="text-gray-400 text-xs font-mono">DATA-INTEGRITY-PROTOCOL ACTIVE</span>
        </div>
        <ShieldCheck className="w-4 h-4 text-green-500" />
      </div>
      
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1 italic">LIMIT ORDER AUTHORITY</h1>
          <p className="text-gray-500 text-sm italic">Institutional Grade Performance</p>
        </div>

        <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333]">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Trading Pair</span>
            <span className="text-white font-mono">$ATH / USDC</span>
          </div>
        </div>

        <button 
          onClick={executeStrategy}
          disabled={isSyncing}
          className="w-full py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSyncing ? <Lock className="animate-spin w-5 h-5"/> : <Zap className="w-5 h-5"/>}
          {isSyncing ? "VERIFYING PROXY..." : "AUTHORIZE LIMIT ORDER"}
        </button>
        
        {status === 'FAILED' && (
          <div className="flex items-center gap-2 justify-center text-red-500 text-xs">
            <AlertTriangle className="w-3 h-3" />
            <span>Connection issue detected. Please re-authorize.</span>
          </div>
        )}
      </div>
    </div>
  );
}