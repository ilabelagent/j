import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, Lock, RefreshCw, Eye } from 'lucide-react';
import { useDataIntegrity } from '@/hooks/useDataIntegrity';

const MOCK_RISKS = [
  { id: 1, type: 'CRITICAL', protocol: 'Unknown Contract', risk: 'Unlimited Allowance', asset: 'USDC', balance: '15,420.00' },
  { id: 2, type: 'HIGH', protocol: 'SushiSwap (Old)', risk: 'Infinite Approval', asset: 'WETH', balance: '4.20' },
];

export default function SecurityDashboard() {
  const { verifyIntegrity, isProcessing: isSyncing } = useDataIntegrity();
  const { isConnected } = useAccount();
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [risks, setRisks] = useState<any[]>([]);

  const startScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanComplete(true);
      setRisks(MOCK_RISKS);
    }, 3500);
  };

  const handleFix = async () => {
    await verifyIntegrity();
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 selection:bg-green-900 selection:text-white">
      <header className="flex justify-between items-center border-b border-green-900 pb-4 mb-8">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 animate-pulse" />
          <h1 className="text-2xl font-bold tracking-tighter">SENTINEL<span className="text-white">AUDIT</span></h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center h-[60vh] border border-dashed border-green-900 rounded-lg bg-green-900/5">
            <Lock className="w-16 h-16 mb-4 text-green-700" />
            <h2 className="text-xl mb-2">ACCESS RESTRICTED</h2>
            <button className="px-8 py-3 bg-green-600 text-black font-bold rounded hover:bg-green-500 transition-all uppercase tracking-widest">
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border border-green-800 bg-black p-6 rounded relative overflow-hidden">
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <h2 className="text-xl text-white font-bold mb-1">WALLET HEALTH MONITOR</h2>
                  <p className="text-green-700 text-sm">Real-time heuristics engine active.</p>
                </div>
                {!scanComplete && !scanning && (
                  <button 
                    onClick={startScan}
                    className="px-6 py-2 border border-green-500 hover:bg-green-500 hover:text-black transition-all rounded uppercase text-sm font-bold flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" /> Start Scan
                  </button>
                )}
              </div>
              
              <AnimatePresence>
                {scanning && (
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/20 to-transparent z-0"
                  />
                )}
              </AnimatePresence>
            </div>

            {scanComplete && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-red-500 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-bold">VULNERABILITIES DETECTED ({risks.length})</span>
                </div>

                {risks.map((risk) => (
                  <div key={risk.id} className="border border-red-900/50 bg-red-950/10 p-4 rounded flex justify-between items-center group">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-red-500/20 text-red-500 text-[10px] px-2 py-0.5 rounded border border-red-500/50">{risk.type}</span>
                        <span className="text-white font-bold">{risk.protocol}</span>
                      </div>
                      <div className="text-red-400 text-sm font-mono">{risk.risk} on {risk.asset} (${risk.balance})</div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 flex justify-end">
                  <button 
                    onClick={handleFix}
                    disabled={isSyncing}
                    className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    <Shield className="w-5 h-5" /> {isSyncing ? "INITIALIZING REMEDIATION..." : "REVOKE ALL PERMISSIONS"}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
