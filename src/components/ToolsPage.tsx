import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock, Key, Sparkles } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';

export const ToolsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLaunchTool = (path: string) => {
    playSynthBeep('click');
    navigate(path);
  };

  return (
    <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* PAGE HEADER */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/5 border border-[#00ff88]/15 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#00ff88]/80">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00ff88]" />
          Interactive Utilities
        </div>
        
        <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white uppercase tracking-tight">
          Cybersecurity Tools
        </h1>
        
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
          Practical security utilities designed to help users improve their digital safety through interactive learning experiences.
        </p>
      </div>

      {/* TOOLS SECTION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TOOL 1: PASSWORD STRENGTH CHECKER */}
        <div 
          className="group relative p-6 sm:p-8 bg-[#020504] border border-[#00ff88]/20 hover:border-[#00ff88]/50 rounded-2xl space-y-6 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[#00ff88]/10 overflow-hidden flex flex-col justify-between"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00ff88]/10 rounded-full blur-3xl group-hover:bg-[#00ff88]/20 transition-all pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-xl text-[#00ff88] group-hover:scale-105 transition-transform">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded border border-[#00ff88]/20">
                      Client-Side Utility
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-wide group-hover:text-[#00ff88] transition-colors mt-1">
                    Password Strength Checker
                  </h2>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              Analyze password strength locally in your browser and receive instant feedback on password security, complexity, and overall strength.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/[0.06]">
                100% Browser Local
              </span>
              <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/[0.06]">
                Entropy Metric
              </span>
              <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/[0.06]">
                Crack Time Estimation
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
            <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors">
              Zero server transmission
            </span>
            <button 
              onClick={() => handleLaunchTool('/tools/password-strength-checker')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00ff88] hover:bg-[#00ff88]/90 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] text-black font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md group-hover:gap-3 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">Launch Tool</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* TOOL 2: SECURE PASSWORD GENERATOR */}
        <div 
          className="group relative p-6 sm:p-8 bg-[#020504] border border-[#00ff88]/20 hover:border-[#00ff88]/50 rounded-2xl space-y-6 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-[#00ff88]/10 overflow-hidden flex flex-col justify-between"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00ff88]/10 rounded-full blur-3xl group-hover:bg-[#00ff88]/20 transition-all pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-xl text-[#00ff88] group-hover:scale-105 transition-transform">
                  <Key className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded border border-[#00ff88]/20">
                      Client-Side Utility
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-wide group-hover:text-[#00ff88] transition-colors mt-1">
                    Secure Password Generator
                  </h2>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              Generate strong, unique passwords and passphrases designed to improve account security and reduce password reuse.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/[0.06]">
                Random & Strong
              </span>
              <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/[0.06]">
                Cryptographically Secure
              </span>
              <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/[0.06]">
                8-64 Chars
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
            <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors">
              Zero server transmission
            </span>
            <button 
              onClick={() => handleLaunchTool('/tools/password-generator')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00ff88] hover:bg-[#00ff88]/90 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] text-black font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md group-hover:gap-3 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">Launch Tool</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
