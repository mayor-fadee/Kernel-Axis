import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Crosshair, Terminal, Activity } from 'lucide-react';
import { ThreatLog } from '../types';

interface LiveMonitorProps {
  logs: ThreatLog[];
}

export const LiveMonitor: React.FC<LiveMonitorProps> = ({ logs }) => {
  const containerEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    containerEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getSeverityBadge = (severity: 'low' | 'medium' | 'high' | 'critical') => {
    switch (severity) {
      case 'critical':
        return 'bg-[#ff3333]/25 text-[#ff4444] border-[#ff4444]/30';
      case 'high':
        return 'bg-[#ffaa00]/25 text-[#ffaa00] border-[#ffaa00]/30';
      case 'medium':
        return 'bg-[#ffff00]/20 text-[#ffff00] border-[#ffff00]/30';
      default:
        return 'bg-[#00ff88]/15 text-[#00ff88] border-[#00ff88]/20';
    }
  };

  return (
    <div
      id="eventLog"
      className="absolute bottom-6 right-6 w-56 max-h-[165px] bg-[#0a0f0d]/90 backdrop-blur-md border border-[#00ff88]/20 shadow-[0_0_30px_rgba(0,255,136,0.05)] rounded-xl flex flex-col z-5 overflow-hidden"
    >
      {/* Decors */}
      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#00ff88] rounded-tl-xl" />
      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#00ff88] rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#00ff88] rounded-bl-xl" />
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#00ff88] rounded-br-xl" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#00ff88]/15 px-2 py-1.5 bg-[#0d1612]">
        <div className="flex items-center gap-1">
          <Activity className="w-3 h-3 text-[#00ff88] animate-pulse" />
          <h3 className="font-display text-[9px] font-bold tracking-widest text-[#00ff88] uppercase">
            Live Defense Monitor
          </h3>
        </div>
        <div className="flex items-center gap-1 font-mono text-[7px] text-[#00ff88]/60 bg-[#050807] px-1 py-0.5 border border-[#00ff88]/10 rounded-md">
          <span className="w-1 h-1 bg-[#00ff88] rounded-full animate-ping" />
          STREAMING
        </div>
      </div>

      {/* Log list container */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin scrollbar-thumb-[#00ff88]/20 scrollbar-track-transparent">
        <div className="space-y-1">
          <AnimatePresence initial={false}>
            {logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center text-[#00ff88]/40 font-mono text-[9px] gap-1">
                <Terminal className="w-3.5 h-3.5 text-[#00ff88]/20" />
                <span>Awaiting attack vectors...</span>
              </div>
            ) : (
              logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 10, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: -10, height: 0 }}
                  transition={{ duration: 0.15 }}
                  className="border border-[#00ff88]/10 bg-[#0d1612]/40 p-1.5 font-mono text-[9px] leading-tight relative overflow-hidden group hover:border-[#00ff88]/30 transition-colors rounded-lg"
                >
                  {/* Left accent bar matching severity */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[1.5px] ${
                      log.severity === 'critical'
                        ? 'bg-[#ff3333]'
                        : log.severity === 'high'
                        ? 'bg-[#ffaa00]'
                        : log.severity === 'medium'
                        ? 'bg-[#ffff00]'
                        : 'bg-[#00ff88]'
                    }`}
                  />

                  {/* Top line: Node path and Severity badge */}
                  <div className="flex justify-between items-center mb-0.5 pl-1">
                    <span className="text-[#00ff88] font-semibold flex items-center gap-0.5 shrink-0 text-[8.5px]">
                      <Crosshair className="w-2 h-2 text-[#00ff88]/60" />
                      {log.source} <span className="text-[#00ff88]/30">→</span> {log.target}
                    </span>
                    <span
                      className={`text-[6.5px] font-bold uppercase tracking-wide px-1 rounded border shrink-0 ${getSeverityBadge(
                        log.severity
                      )}`}
                    >
                      {log.severity}
                    </span>
                  </div>

                  {/* Log payload message */}
                  <p className="text-white/80 font-normal pl-1 break-words text-[8.5px]">
                    {log.message}
                  </p>

                  {/* Bottom line: IP routing and Timestamp */}
                  <div className="flex justify-between items-center text-[7.5px] text-[#00ff88]/40 mt-1 pt-0.5 border-t border-[#00ff88]/5 pl-1">
                    <span>IP: {log.ipSource}</span>
                    <span>{log.timestamp}</span>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
          <div ref={containerEndRef} />
        </div>
      </div>

      {/* Footer statistics */}
      <div className="bg-[#0d1612] border-t border-[#00ff88]/15 px-2 py-1 font-mono text-[7px] text-[#00ff88]/50 flex justify-between">
        <span>INTRUSIONS: {logs.length}</span>
        <span>SHIELD: 99.98%</span>
      </div>
    </div>
  );
};
