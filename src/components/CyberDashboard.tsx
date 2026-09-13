import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Radio, Terminal, Settings, Play, Sliders, Trash2, ShieldCheck, SunDim } from 'lucide-react';
import { playSynthBeep, playSuccessMp3 } from '../lib/audio';

interface CyberDashboardProps {
  username: string;
  onLaunchGlobe: () => void;
  globeLaunched: boolean;
  onClearLogs: () => void;
  severityFilter: string;
  setSeverityFilter: (filter: string) => void;
  isRotating: boolean;
  setIsRotating: (rotating: boolean) => void;
}

export const CyberDashboard: React.FC<CyberDashboardProps> = ({
  username,
  onLaunchGlobe,
  globeLaunched,
  onClearLogs,
  severityFilter,
  setSeverityFilter,
  isRotating,
  setIsRotating
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectProgress, setConnectProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle Connecting to Live Cyber Attacks server
  const handleConnectAttacks = () => {
    if (isConnecting || globeLaunched) return;

    playSynthBeep('click');
    setIsConnecting(true);
    setConnectProgress(0);

    const duration = 2000; // 2 seconds
    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += increment;
      const rounded = Math.min(Math.round(currentProgress), 100);

      setConnectProgress(rounded);

      if (rounded % 20 === 0 && rounded < 100) {
        playSynthBeep('connect');
      }

      if (rounded >= 100) {
        clearInterval(timer);
        playSuccessMp3();
        onLaunchGlobe();
      }
    }, intervalTime);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      id="dashboard"
      className="absolute top-20 left-6 w-48 bg-[#0a0f0d]/90 backdrop-blur-md border border-[#00ff88]/20 p-2 shadow-[0_0_35px_rgba(0,255,136,0.05)] rounded-xl z-5"
    >
      {/* Decors */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00ff88] rounded-tl-xl" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00ff88] rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00ff88] rounded-bl-xl" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00ff88] rounded-br-xl" />

      {/* Profile Header */}
      <div className={`flex items-start justify-between select-none ${isExpanded ? 'border-b border-[#00ff88]/15 pb-2 mb-2' : ''}`}>
        <div className="flex-1 min-w-0 pr-1">
          <h3 id="welcomeText" className="font-display text-[10px] font-bold tracking-widest text-[#00ff88] uppercase truncate flex items-center gap-1.5">
            <Terminal className="w-3 h-3 shrink-0 text-[#00ff88]" />
            Threat Map
          </h3>
        </div>
        <button
          onClick={() => {
            playSynthBeep('click');
            setIsExpanded(!isExpanded);
          }}
          className="text-[#00ff88] hover:text-[#00ff88]/80 text-[10px] font-bold p-1 cursor-pointer shrink-0 focus:outline-none select-none transition-colors"
          title={isExpanded ? "Collapse Dashboard" : "Expand Dashboard"}
        >
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>

      {/* Smoothly expand or collapse the card content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden space-y-2"
          >
            {/* Action Zone */}
            {!globeLaunched && (
              <div className="space-y-2">
                <button
                  id="attackBtn"
                  onClick={handleConnectAttacks}
                  disabled={isConnecting}
                  className={`w-full flex items-center justify-center gap-1.5 py-2 px-2.5 font-display font-bold text-[9px] uppercase tracking-widest transition-all rounded-lg ${
                    isConnecting
                      ? 'bg-[#0d1612] text-[#00ff88]/40 border border-[#00ff88]/10 cursor-not-allowed'
                      : 'bg-[#00ff88] text-black hover:bg-[#00cc77] hover:shadow-[0_0_15px_rgba(0,255,136,0.25)] cursor-pointer'
                  }`}
                >
                  <Radio className="w-3 h-3 animate-pulse" />
                  View Live Cyber Attacks
                </button>

                {/* Loading Animation box */}
                {isConnecting && (
                  <div id="attackLoading" className="space-y-1">
                    <div className="flex justify-between font-mono text-[8px] text-[#00ff88]/80">
                      <span id="attackText">Connecting...</span>
                      <span>{connectProgress}%</span>
                    </div>
                    <div className="w-full h-1 bg-[#021b13] overflow-hidden rounded-full">
                      <div
                        id="attackBar"
                        className="h-full bg-[#00ff88] rounded-full"
                        style={{ width: `${connectProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Active Diagnostics Panel */}
            {globeLaunched && (
              <div className="space-y-2">
                {/* Globe controls */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1 font-display text-[9px] font-semibold tracking-wider text-[#00ff88]/80 uppercase">
                    <Sliders className="w-2.5 h-2.5" />
                    <span>Map Controller</span>
                  </div>

                  {/* Rotation toggle */}
                  <label className="flex items-center justify-between cursor-pointer p-1 bg-[#0d1612] border border-[#00ff88]/10 hover:border-[#00ff88]/25 transition-colors select-none rounded-lg">
                    <span className="font-mono text-[9px] text-[#00ff88]/80">Auto Rotation</span>
                    <input
                      type="checkbox"
                      checked={isRotating}
                      onChange={(e) => {
                        playSynthBeep('click');
                        setIsRotating(e.target.checked);
                      }}
                      className="sr-only peer"
                    />
                    <div className="relative w-6.5 h-3 bg-[#050807] border border-[#00ff88]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-[#00ff88] after:rounded-full after:h-2 after:w-2 after:transition-all peer-checked:bg-[#00ff88]/10 peer-checked:border-[#00ff88]/60" />
                  </label>

                  {/* Severity filter dropdown */}
                  <div className="space-y-0.5">
                    <span className="block font-mono text-[8px] text-[#00ff88]/60 uppercase tracking-wider">
                      Threat Severity Filter
                    </span>
                    <div className="relative">
                      <select
                        value={severityFilter}
                        onChange={(e) => {
                          playSynthBeep('click');
                          setSeverityFilter(e.target.value);
                        }}
                        className="w-full px-1.5 py-1 bg-[#0d1612] border border-[#00ff88]/20 text-[#00ff88] font-mono text-[9px] focus:border-[#00ff88]/50 outline-none cursor-pointer appearance-none rounded-lg"
                      >
                        <option value="all">ALL SEVERITIES</option>
                        <option value="critical">CRITICAL ONLY</option>
                        <option value="high">HIGH & CRITICAL</option>
                        <option value="medium">MEDIUM & ABOVE</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-[#00ff88]">
                        <Settings className="w-2 h-2" />
                      </div>
                    </div>
                  </div>

                  {/* Clean logs button */}
                  <button
                    onClick={() => {
                      playSynthBeep('warning');
                      onClearLogs();
                    }}
                    className="w-full flex items-center justify-center gap-1 py-1 px-1.5 border border-red-500/20 text-red-400 hover:bg-red-500/5 hover:border-red-500/35 transition-colors font-mono text-[9px] uppercase cursor-pointer rounded-lg"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                    Clear Monitor Logs
                  </button>
                </div>
              </div>
            )}

            {/* Decorative details */}
            <div className="mt-3 pt-1.5 border-t border-[#00ff88]/10 flex items-center justify-between text-[7px] text-[#00ff88]/30 font-mono">
              <span>GATEWAY ID: NK-3902</span>
              <span>LATENCY: 14ms</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
