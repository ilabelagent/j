import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, AlertTriangle, CheckCircle2, ChevronRight, Loader2, Activity, Cpu, Zap, Radio } from 'lucide-react';

const STAGES = {
  BOOT: 'BOOT',
  WAITING: 'WAITING',
  ACCESSING: 'ACCESSING'
};

export default function MasterTerminal() {
  const [stage, setStage] = useState(STAGES.BOOT);
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `>> ${msg}`]);
  };

  useEffect(() => {
    if (stage === STAGES.BOOT) {
      const bootSequence = [
        "SENTINEL OMNILOGIC MASTER TERMINAL v5.4.1",
        "INITIALIZING DARK_UPLINK...",
        "STATUS: ALL_CAMPAIGNS_ONLINE",
        "STATUS: C2_SERVER_ACTIVE",
        "SYSTEM ENCRYPTION: ECC_SHADOW_GLOBAL",
        "AUTHENTICATION REQUIRED FOR COMMAND ACCESS."
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < bootSequence.length) {
          addLog(bootSequence[i]);
          i++;
        } else {
          clearInterval(interval);
          setTimeout(() => setStage(STAGES.WAITING), 1000);
        }
      }, 200);
    }
  }, [stage]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="h-screen w-screen bg-black text-[#00ff41] font-mono p-4 md:p-8 overflow-hidden flex flex-col selection:bg-[#00ff41] selection:text-black">
      <Head>
        <title>Sentinel Omnilogic | Master Terminal</title>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;800&display=swap" rel="stylesheet" />
        <style>{`
          body { font-family: 'JetBrains Mono', monospace; }
          .scan-line { height: 2px; width: 100%; background: rgba(0, 255, 65, 0.1); position: absolute; top: 0; animation: scan 4s linear infinite; }
          @keyframes scan { from { top: 0; } to { top: 100%; } }
        `}</style>
      </Head>

      <div className="scan-line" />

      <div className="flex justify-between items-center border-b border-[#00ff41]/30 pb-4 mb-4 text-[10px] uppercase tracking-widest opacity-70">
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><Radio className="w-3 h-3 animate-pulse" /> SIGNAL: STRONG</span>
          <span className="flex items-center gap-2"><Activity className="w-3 h-3" /> UPLINK: STABLE</span>
        </div>
        <div className="flex gap-6">
          <span>HOST: OMNI_MASTER_MAIN</span>
          <span>USER: APEX_OVERSEER</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 border border-[#00ff41]/20 rounded-lg p-6 bg-[#00ff41]/5 shadow-[inset_0_0_50px_rgba(0,255,65,0.05)]">
        
        <div className="flex-1 overflow-y-auto pr-4 space-y-1 mb-6 scrollbar-hide text-sm">
          {logs.map((log, i) => (
            <div key={i} className="leading-relaxed">
              {log}
            </div>
          ))}
          {stage === STAGES.WAITING && (
            <div className="flex items-center gap-2">
              <span className="animate-pulse">_</span>
              <input 
                type="text" 
                autoFocus
                className="bg-transparent border-none outline-none text-[#00ff41] w-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addLog(e.currentTarget.value);
                    addLog("ERROR: COMMAND_ACCESS_RESTRICTED. USE_CAMPAIGN_SPECIFIC_URLS.");
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          )}
          <div ref={logEndRef} />
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center opacity-40 text-[9px] uppercase tracking-[0.4em]">
        <span>C2_PORT: 8080</span>
        <span>UPTIME: 1,294h CC: 4.8.2</span>
      </div>
    </div>
  );
}
