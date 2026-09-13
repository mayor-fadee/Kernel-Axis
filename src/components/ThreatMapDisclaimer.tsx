import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, CheckCircle, Info } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';

interface ThreatMapDisclaimerProps {
  onClose: () => void;
}

export const ThreatMapDisclaimer: React.FC<ThreatMapDisclaimerProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has opted out of seeing the disclaimer
    const isDismissedForever = localStorage.getItem('kernellabs_disclaimer_dismissed');
    const isDismissedSession = sessionStorage.getItem('kernellabs_disclaimer_dismissed_session');
    if (!isDismissedForever && !isDismissedSession) {
      setIsVisible(true);
    }
  }, []);

  const handleGotIt = () => {
    playSynthBeep('click');
    try {
      sessionStorage.setItem('kernellabs_disclaimer_dismissed_session', 'true');
    } catch (e) {
      console.warn('SessionStorage not available:', e);
    }
    setIsVisible(false);
    onClose();
  };

  const handleDontShowAgain = () => {
    playSynthBeep('click');
    try {
      localStorage.setItem('kernellabs_disclaimer_dismissed', 'true');
    } catch (e) {
      console.warn('LocalStorage not available:', e);
    }
    setIsVisible(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 select-none overflow-hidden">
        {/* Semi-transparent blur backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
          onClick={handleGotIt} // Close on backdrop click for usability, or maybe don't if they must click a button. Let's make it responsive.
        />

        {/* Modal Card Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md bg-[#020504]/95 border border-[#00ff88]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_0_50px_rgba(0,255,136,0.15)] pointer-events-auto z-10 overflow-hidden"
        >
          {/* Subtle overlay decorative grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          {/* Icon Header */}
          <div className="flex items-center gap-3 border-b border-[#00ff88]/10 pb-4 relative z-10">
            <div className="p-2 bg-[#00ff88]/5 border border-[#00ff88]/15 rounded-lg text-[#00ff88]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[8px] font-mono uppercase tracking-widest text-[#00ff88]/60 font-semibold">Notice</span>
              <h2 className="text-sm font-display font-bold text-white uppercase tracking-wider">
                Education Visuals
              </h2>
            </div>
          </div>

          {/* Descriptive Message */}
          <div className="space-y-3 relative z-10">
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              This threat map displays simulated cybersecurity activity for learning and demonstration purposes.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 relative z-10">
            <button
              onClick={handleGotIt}
              className="flex-1 py-3 px-5 text-center font-display font-bold text-xs uppercase tracking-widest bg-[#00ff88] text-black hover:bg-[#00cc77] rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(0,255,136,0.15)] hover:shadow-[0_0_20px_rgba(0,255,136,0.3)] cursor-pointer"
            >
              Got it !
            </button>
            <button
              onClick={handleDontShowAgain}
              className="flex-1 py-3 px-5 text-center font-display font-bold text-xs uppercase tracking-widest border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.03] rounded-lg transition-all duration-200 cursor-pointer"
            >
              Don't show again
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
