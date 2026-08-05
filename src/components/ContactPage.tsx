import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('business95095@gmail.com');
    setCopied(true);
    playSynthBeep('connect');
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-12 md:space-y-16" id="contact-page-container">
      
      {/* HEADER SECTION */}
      <div className="text-center space-y-4 max-w-2xl mx-auto" id="contact-header">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/5 border border-[#00ff88]/15 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#00ff88]/80">
          <Mail className="w-3 h-3 text-[#00ff88]" />
          Reach Out
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-extrabold text-white uppercase tracking-tight whitespace-nowrap">
          Contact Kernel Axis
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
          Questions, feedback, content suggestions, or partnership inquiries? We'd love to hear from you. Kernel Axis is committed to making cybersecurity education accessible, and we welcome messages from learners, educators, and security enthusiasts.
        </p>
      </div>

      {/* PRIMARY CONTACT CARD */}
      <div className="bg-white/[0.01] border border-white/[0.06] rounded-2xl p-8 md:p-12 relative overflow-hidden group max-w-2xl mx-auto" id="primary-contact-card">
        {/* Decorative subtle ambient lights */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/[0.02] rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:bg-[#00ff88]/[0.04]" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#00ff88]/[0.01] rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col items-center text-center space-y-6 relative z-10">
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg mx-auto font-sans">
            For general inquiries, educational feedback, content suggestions, or partnership discussions, feel free to reach out at any time.
          </p>

          {/* Email Display Visual Focal Point */}
          <div className="w-full max-w-md bg-black/40 border border-white/[0.06] hover:border-[#00ff88]/20 px-4 py-3.5 rounded-xl flex items-center justify-between gap-3 transition-all duration-300" id="email-highlight-box">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#00ff88]/5 border border-[#00ff88]/15 flex items-center justify-center text-[#00ff88] shrink-0">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <p className="text-[8px] sm:text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none mb-1">
                  Email Support
                </p>
                <p className="font-mono font-semibold text-xs sm:text-sm md:text-base text-white tracking-wide truncate select-all selection:bg-[#00ff88] selection:text-black leading-none">
                  business95095@gmail.com
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="p-2 bg-[#00ff88]/5 hover:bg-[#00ff88] text-[#00ff88] hover:text-black border border-[#00ff88]/20 hover:border-[#00ff88] rounded-lg transition-all duration-300 cursor-pointer active:scale-95 shrink-0 flex items-center justify-center relative group"
              title="Copy email to clipboard"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* FINAL DISCLAIMER NOTE */}
      <div className="text-center pt-6 max-w-md mx-auto border-t border-white/[0.04]" id="contact-final-note">
        <p className="text-xs text-zinc-500 font-sans leading-relaxed italic">
          Every message is reviewed manually. While response times may vary, we aim to reply as quickly as possible.
        </p>
      </div>

    </div>
  );
};



