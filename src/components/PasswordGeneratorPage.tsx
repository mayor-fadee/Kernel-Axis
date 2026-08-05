import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Copy, 
  Check, 
  RefreshCw, 
  Key, 
  Zap, 
  Sliders
} from 'lucide-react';
import { playSynthBeep } from '../lib/audio';

export const PasswordGeneratorPage: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [length, setLength] = useState<number>(16);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Character sets automatically included
  const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
  const NUMBER_CHARS = '0123456789';
  const SYMBOL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  // Secure Cryptographic Random Password Generator
  const generatePassword = useCallback((targetLength: number) => {
    const requiredSets = [UPPERCASE_CHARS, LOWERCASE_CHARS, NUMBER_CHARS, SYMBOL_CHARS];
    const fullCharset = UPPERCASE_CHARS + LOWERCASE_CHARS + NUMBER_CHARS + SYMBOL_CHARS;

    const randomValues = new Uint32Array(targetLength);
    window.crypto.getRandomValues(randomValues);

    const resultChars: string[] = [];

    // Guarantee at least 1 character from every required set
    for (let i = 0; i < requiredSets.length && i < targetLength; i++) {
      const set = requiredSets[i];
      resultChars.push(set[randomValues[i] % set.length]);
    }

    // Fill the remaining slots with random choices from the full charset
    for (let i = resultChars.length; i < targetLength; i++) {
      resultChars.push(fullCharset[randomValues[i] % fullCharset.length]);
    }

    // Cryptographic Fisher-Yates Shuffle
    const shuffleValues = new Uint32Array(resultChars.length);
    window.crypto.getRandomValues(shuffleValues);
    for (let i = resultChars.length - 1; i > 0; i--) {
      const j = shuffleValues[i] % (i + 1);
      [resultChars[i], resultChars[j]] = [resultChars[j], resultChars[i]];
    }

    return resultChars.join('');
  }, []);

  // Primary Generation Trigger
  const handleGenerate = useCallback(() => {
    playSynthBeep('click');
    setCopied(false);
    setGeneratedPassword(generatePassword(length));
  }, [length, generatePassword]);

  // Re-generate automatically when length slider changes
  useEffect(() => {
    setGeneratedPassword(generatePassword(length));
  }, [length, generatePassword]);

  // Copy to Clipboard
  const handleCopy = () => {
    if (!generatedPassword) return;
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    playSynthBeep('click');
    setTimeout(() => setCopied(false), 2000);
  };

  // Password Strength & Entropy Rating
  const strengthInfo = useMemo(() => {
    const currentLen = generatedPassword.length || length;
    const poolSize = 88; // 26 + 26 + 10 + 26
    const entropyBits = Math.round(currentLen * Math.log2(poolSize));

    let rating: 'Fair' | 'Good' | 'Strong' = 'Strong';
    let score = Math.min(100, Math.round((entropyBits / 90) * 100));

    if (currentLen >= 12) {
      rating = 'Strong';
      score = Math.max(82, Math.min(100, Math.round((entropyBits / 100) * 100)));
    } else if (currentLen >= 10) {
      rating = 'Good';
      score = 65;
    } else {
      rating = 'Fair';
      score = 45;
    }

    return {
      entropyBits,
      score,
      rating
    };
  }, [generatedPassword, length]);

  // Listen for Escape (ESC) key to navigate back to tools
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        playSynthBeep('click');
        navigate('/tools');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* NAVIGATION & PAGE HEADER */}
      <div className="space-y-4">
        <button
          onClick={() => {
            playSynthBeep('click');
            navigate('/tools');
          }}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#00ff88]/80 hover:text-[#00ff88] transition-all cursor-pointer bg-[#00ff88]/5 px-3 py-1.5 rounded-lg border border-[#00ff88]/20 hover:border-[#00ff88]/40 shadow-sm group"
          title="Back to Tools"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Tools</span>
        </button>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/5 border border-[#00ff88]/20 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#00ff88]">
            <Key className="w-3.5 h-3.5" />
            Client-Side Password Generator
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
            Secure Password Generator
          </h1>

          <p className="text-sm text-zinc-300 leading-relaxed font-sans">
            Generate strong, unique passwords designed to improve account security and reduce password reuse.
          </p>
        </div>
      </div>

      {/* GENERATOR CARD */}
      <div className="p-6 sm:p-8 bg-[#020504] border border-[#00ff88]/20 rounded-2xl space-y-8 shadow-2xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#00ff88]/10 rounded-full blur-3xl pointer-events-none" />

        {/* PASSWORD DISPLAY FIELD */}
        <div className="space-y-3 max-w-2xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#00ff88]" />
              <span>Generated Password</span>
            </label>
            <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
              {length} Characters
            </span>
          </div>

          <div className="relative group">
            <div className="w-full bg-black/90 border-2 border-[#00ff88]/30 group-hover:border-[#00ff88]/60 rounded-xl p-3.5 sm:p-4 pr-14 transition-all flex items-center min-h-[56px] overflow-hidden">
              <span className="font-mono text-sm sm:text-lg font-semibold text-white tracking-wider truncate whitespace-nowrap select-all block w-full">
                {generatedPassword}
              </span>
            </div>

            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
              <button
                onClick={handleCopy}
                title={copied ? "Copied to clipboard" : "Copy password"}
                aria-label={copied ? "Copied to clipboard" : "Copy password"}
                className={`p-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center shrink-0 ${
                  copied
                    ? 'bg-emerald-500 text-black border border-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-[#00ff88] hover:bg-[#00ff88]/90 text-black border border-[#00ff88] shadow-md shadow-[#00ff88]/20'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* STRENGTH INDICATOR */}
        <div className="p-3.5 sm:p-4 bg-black/50 border border-white/[0.08] rounded-xl space-y-2.5 max-w-2xl mx-auto w-full">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              Security Rating:
            </span>
            <span 
              className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border tracking-wide whitespace-nowrap ${
                strengthInfo.rating === 'Strong'
                  ? 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/30'
                  : strengthInfo.rating === 'Good'
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
            >
              {strengthInfo.rating}
            </span>
          </div>

          <div className="w-full bg-zinc-800/80 rounded-full h-1.5 overflow-hidden p-0.5 border border-white/5">
            <div
              className={`h-full rounded-full transition-all duration-300 ease-out ${
                strengthInfo.rating === 'Strong'
                  ? 'bg-[#00ff88]'
                  : strengthInfo.rating === 'Good'
                  ? 'bg-cyan-400'
                  : 'bg-amber-400'
              }`}
              style={{ width: `${strengthInfo.score}%` }}
            />
          </div>
        </div>

        {/* PASSWORD LENGTH SLIDER (8 - 32) */}
        <div className="pt-2 space-y-3 max-w-2xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-[#00ff88]" />
              <span>Password Length</span>
            </label>
            <span className="text-sm font-mono font-bold text-[#00ff88] bg-[#00ff88]/10 px-3 py-1 rounded border border-[#00ff88]/20">
              {length} characters
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-zinc-500">8</span>
            <input
              type="range"
              min="8"
              max="32"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#00ff88]"
            />
            <span className="text-xs font-mono text-zinc-500">32</span>
          </div>
        </div>

        {/* INCLUDED CHARACTER TYPES FOOTER NOTE */}
        <div className="text-[11px] font-mono text-zinc-400 flex flex-wrap items-center justify-center gap-3 pt-2 border-t border-white/[0.06] max-w-2xl mx-auto w-full">
          <span className="text-emerald-400/90">✓ Uppercase</span>
          <span className="text-emerald-400/90">✓ Lowercase</span>
          <span className="text-emerald-400/90">✓ Numbers</span>
          <span className="text-emerald-400/90">✓ Symbols</span>
        </div>

        {/* SINGLE GENERATE PASSWORD BUTTON */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={handleGenerate}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#00ff88] hover:bg-[#00ff88]/90 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] text-black font-display font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-[#00ff88]/20 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <RefreshCw className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">GENERATE NEW PASSWORD</span>
          </button>
        </div>
      </div>

      {/* CLIENT-SIDE SECURITY GUARANTEE */}
      <div className="p-4 bg-[#00ff88]/5 border border-[#00ff88]/20 rounded-2xl flex items-center gap-3">
        <div className="p-2 bg-[#00ff88]/10 rounded-xl text-[#00ff88] shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-zinc-300 font-sans">
            Generated locally in your browser. Nothing is stored or sent anywhere.
          </p>
        </div>
      </div>

    </div>
  );
};
