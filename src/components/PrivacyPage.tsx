import React from 'react';
import { Shield, FileText, Mail, Cookie, Info, Share2, RefreshCw } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* HEADER SECTION */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
          A simple, honest, and easy-to-understand explanation of how your privacy and data are respected here at Kernel Axis.
        </p>
      </div>

      {/* POLICY SECTIONS */}
      <div className="space-y-8 bg-white/[0.01] border border-white/[0.06] p-6 md:p-8 rounded-xl">
        
        {/* 1. Educational Simulation Disclaimer */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 text-white">
            <Shield className="w-4 h-4 text-[#00ff88]" />
            <h3 className="font-display font-bold text-sm uppercase tracking-wider">
              1. Educational Simulation Disclaimer
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            Kernel Axis is an educational cybersecurity project. The Threat Map is a simulation created for learning purposes and does not display or monitor real cyber attacks. It is intended to help visitors visualize data flow and understand cybersecurity concepts in a completely safe, risk-free environment.
          </p>
        </div>

        <div className="w-full h-px bg-[#00ff88]/10" />

        {/* 2. Information You Provide */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 text-white">
            <Mail className="w-4 h-4 text-[#00ff88]" />
            <h3 className="font-display font-bold text-sm uppercase tracking-wider">
              2. Information You Provide
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            If you choose to use our contact form, you may voluntarily provide your email address and the contents of your message. We only use this information to respond to your questions, feedback, or inquiries. We will never sell or share your email address or message details with other companies for marketing purposes.
          </p>
        </div>

        <div className="w-full h-px bg-[#00ff88]/10" />

        {/* 3. Cookies & Website Functionality */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 text-white">
            <Cookie className="w-4 h-4 text-[#00ff88]" />
            <h3 className="font-display font-bold text-sm uppercase tracking-wider">
              3. Cookies & Website Functionality
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            To improve your experience, some website features may use browser storage (such as LocalStorage or session state) to remember your preferences, selected pages, and simulator settings. This helps keep the website functioning smoothly as you navigate between pages.
          </p>
        </div>

        <div className="w-full h-px bg-[#00ff88]/10" />

        {/* 4. Third-Party Services */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 text-white">
            <Share2 className="w-4 h-4 text-[#00ff88]" />
            <h3 className="font-display font-bold text-sm uppercase tracking-wider">
              4. Third-Party Services
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            To support future growth, hosting, analytics, or advertising features (such as Google AdSense), this website may integrate trusted third-party services in the future. These third-party services often use cookies or other identifiers and have their own independent privacy policies governing how they handle your interaction with their features.
          </p>
        </div>

        <div className="w-full h-px bg-[#00ff88]/10" />

        {/* 5. Changes to This Policy */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 text-white">
            <RefreshCw className="w-4 h-4 text-[#00ff88]" />
            <h3 className="font-display font-bold text-sm uppercase tracking-wider">
              5. Changes to This Policy
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            We may update this privacy policy from time to time to reflect changes in our website or services. When we make updates, we will change the "Last Updated" date at the bottom of this page. We encourage you to check back occasionally to stay informed.
          </p>
        </div>

        <div className="w-full h-px bg-[#00ff88]/10" />

        {/* 6. Contact */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 text-white">
            <Info className="w-4 h-4 text-[#00ff88]" />
            <h3 className="font-display font-bold text-sm uppercase tracking-wider">
              6. Contact
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            If you have any questions or feedback about this privacy policy or how we handle your information, please feel free to reach out directly to us at:
          </p>
          <p className="font-mono text-xs text-[#00ff88] hover:underline cursor-pointer select-all">
            business95095@gmail.com
          </p>
        </div>

        <div className="w-full h-px bg-[#00ff88]/10" />

        {/* FOOTER TIMESTAMPS */}
        <div className="pt-2 text-center sm:text-left">
          <p className="font-mono text-[10px] text-white/50 uppercase tracking-wider">
            Last Updated: July 18, 2026
          </p>
        </div>

      </div>
    </div>
  );
};

