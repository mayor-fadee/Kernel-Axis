import React from 'react';
import { Shield, BookOpen, AlertCircle, ExternalLink, HelpCircle, FileText, CheckCircle, RefreshCw } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12" id="terms-page-container">
      
      {/* HEADER SECTION */}
      <div className="space-y-4 text-center max-w-2xl mx-auto" id="terms-header">
        <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
          Welcome to Kernel Axis. By accessing and using this website, you agree to follow these terms and conditions. These terms are designed to ensure a safe, educational, and transparent experience for all visitors.
        </p>
      </div>

      {/* TERMS SECTIONS */}
      <div className="space-y-8 bg-white/[0.01] border border-white/[0.06] p-6 md:p-8 rounded-xl" id="terms-content">
        
        {/* 1. Educational Purpose */}
        <div className="space-y-3" id="term-section-1">
          <div className="flex items-center gap-2.5 text-white">
            <BookOpen className="w-4 h-4 text-[#00ff88]" />
            <h3 className="font-display font-bold text-sm uppercase tracking-wider">
              1. Educational Purpose
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            Kernel Axis is an educational platform created to help people learn about cybersecurity, online safety, and digital awareness. All content is provided for informational and educational purposes only.
          </p>
        </div>

        <div className="w-full h-px bg-[#00ff88]/10" />

        {/* 2. Content Accuracy */}
        <div className="space-y-3" id="term-section-2">
          <div className="flex items-center gap-2.5 text-white">
            <CheckCircle className="w-4 h-4 text-[#00ff88]" />
            <h3 className="font-display font-bold text-sm uppercase tracking-wider">
              2. Content Accuracy
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            We strive to keep information accurate and up to date. However, technology and cybersecurity practices evolve over time, so we cannot guarantee that all information will always remain complete or current.
          </p>
        </div>

        <div className="w-full h-px bg-[#00ff88]/10" />

        {/* 3. Responsible Use */}
        <div className="space-y-3" id="term-section-3">
          <div className="flex items-center gap-2.5 text-white">
            <Shield className="w-4 h-4 text-[#00ff88]" />
            <h3 className="font-display font-bold text-sm uppercase tracking-wider">
              3. Responsible Use
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            Visitors may use the website for personal learning, research, and educational purposes. Users should not misuse any information provided on the platform for harmful, illegal, or unauthorized activities.
          </p>
        </div>

        <div className="w-full h-px bg-[#00ff88]/10" />

        {/* 4. External Resources */}
        <div className="space-y-3" id="term-section-4">
          <div className="flex items-center gap-2.5 text-white">
            <ExternalLink className="w-4 h-4 text-[#00ff88]" />
            <h3 className="font-display font-bold text-sm uppercase tracking-wider">
              4. External Resources
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            Some pages may reference third-party tools, websites, or resources for educational purposes. Kernel Axis is not responsible for the content, policies, or practices of external websites.
          </p>
        </div>

        <div className="w-full h-px bg-[#00ff88]/10" />

        {/* 5. Intellectual Property */}
        <div className="space-y-3" id="term-section-5">
          <div className="flex items-center gap-2.5 text-white">
            <FileText className="w-4 h-4 text-[#00ff88]" />
            <h3 className="font-display font-bold text-sm uppercase tracking-wider">
              5. Intellectual Property
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            Unless otherwise stated, the content and educational materials on Kernel Axis are provided for personal learning and reference. Republishing, commercial redistribution, or reproducing substantial portions of content without permission is not permitted.
          </p>
        </div>

        <div className="w-full h-px bg-[#00ff88]/10" />

        {/* 6. Limitation of Liability */}
        <div className="space-y-3" id="term-section-6">
          <div className="flex items-center gap-2.5 text-white">
            <AlertCircle className="w-4 h-4 text-[#00ff88]" />
            <h3 className="font-display font-bold text-sm uppercase tracking-wider">
              6. Limitation of Liability
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            Kernel Axis provides educational information only. We are not responsible for any loss, damage, or consequences resulting from the use of information found on this website.
          </p>
        </div>

        <div className="w-full h-px bg-[#00ff88]/10" />

        {/* 7. Changes to These Terms */}
        <div className="space-y-3" id="term-section-7">
          <div className="flex items-center gap-2.5 text-white">
            <RefreshCw className="w-4 h-4 text-[#00ff88]" />
            <h3 className="font-display font-bold text-sm uppercase tracking-wider">
              7. Changes to These Terms
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            These terms may be updated periodically to reflect improvements, legal requirements, or platform changes. Continued use of the website indicates acceptance of any updated terms.
          </p>
        </div>

        <div className="w-full h-px bg-[#00ff88]/10" />

        {/* 8. Contact Information */}
        <div className="space-y-3" id="term-section-8">
          <div className="flex items-center gap-2.5 text-white">
            <HelpCircle className="w-4 h-4 text-[#00ff88]" />
            <h3 className="font-display font-bold text-sm uppercase tracking-wider">
              8. Contact Information
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            If you have questions regarding these Terms & Conditions, please use the Contact page or the available contact methods provided on the website.
          </p>
        </div>

        <div className="w-full h-px bg-[#00ff88]/10" />

        {/* FOOTER TIMESTAMPS */}
        <div className="pt-2 text-center sm:text-left" id="terms-footer-timestamp">
          <p className="font-mono text-[10px] text-white/50 uppercase tracking-wider leading-relaxed">
            Last Updated: July 2026
          </p>
        </div>

      </div>
    </div>
  );
};
