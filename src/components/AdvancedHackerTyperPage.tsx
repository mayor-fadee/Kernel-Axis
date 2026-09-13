import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Terminal,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Minimize,
  Settings,
  ArrowLeft,
  Code,
  Eye,
  EyeOff,
  Copy,
  Check,
  Keyboard,
  HelpCircle,
  X,
  Type
} from 'lucide-react';
import { HACKER_CODE_TEMPLATES, CodeTemplate } from '../data/hackerCodeTemplates';
import { generateAsciiBanner } from '../utils/asciiArt';

interface HackerTheme {
  id: string;
  name: string;
  bg: string;
  text: string;
  accent: string;
  border: string;
  cursor: string;
  headerBg: string;
}

const THEMES: HackerTheme[] = [
  {
    id: 'matrix',
    name: 'Matrix Neon',
    bg: '#000000',
    text: '#00ff41',
    accent: '#00ff41',
    border: 'rgba(0, 255, 65, 0.35)',
    cursor: '#00ff41',
    headerBg: 'rgba(0, 10, 2, 0.92)'
  },
  {
    id: 'classic',
    name: 'Kernel Green',
    bg: '#020504',
    text: '#00ff88',
    accent: '#00ff88',
    border: 'rgba(0, 255, 136, 0.35)',
    cursor: '#00ff88',
    headerBg: 'rgba(2, 8, 5, 0.92)'
  },
  {
    id: 'cyan',
    name: 'Cyberpunk Cyan',
    bg: '#020810',
    text: '#00f0ff',
    accent: '#00f0ff',
    border: 'rgba(0, 240, 255, 0.35)',
    cursor: '#00f0ff',
    headerBg: 'rgba(2, 10, 18, 0.92)'
  },
  {
    id: 'amber',
    name: 'Amber CRT',
    bg: '#0a0600',
    text: '#ffb000',
    accent: '#ffb000',
    border: 'rgba(255, 176, 0, 0.35)',
    cursor: '#ffb000',
    headerBg: 'rgba(16, 9, 0, 0.92)'
  },
  {
    id: 'red',
    name: 'Blood Alert',
    bg: '#0c0202',
    text: '#ff3344',
    accent: '#ff3344',
    border: 'rgba(255, 51, 68, 0.35)',
    cursor: '#ff3344',
    headerBg: 'rgba(18, 3, 4, 0.92)'
  },
  {
    id: 'monokai',
    name: 'Ghost Ghost',
    bg: '#0d1117',
    text: '#e6edf3',
    accent: '#58a6ff',
    border: 'rgba(88, 166, 255, 0.35)',
    cursor: '#58a6ff',
    headerBg: 'rgba(13, 17, 23, 0.92)'
  }
];

export function AdvancedHackerTyperPage() {
  const navigate = useNavigate();

  // Selected state
  const [selectedTemplate, setSelectedTemplate] = useState<CodeTemplate>(HACKER_CODE_TEMPLATES[0]);
  const [selectedTheme, setSelectedTheme] = useState<HackerTheme>(THEMES[0]);
  const [speed, setSpeed] = useState<number>(6); // Characters per keystroke
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [autoType, setAutoType] = useState<boolean>(false);
  const [showHUD, setShowHUD] = useState<boolean>(true);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [watermarkText, setWatermarkText] = useState<string>(() => {
    return localStorage.getItem('kernel_watermark_text') ?? 'KERNEL';
  });
  const [watermarkEnabled, setWatermarkEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('kernel_watermark_enabled');
    return saved !== null ? saved === 'true' : true;
  });
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(() => {
    const saved = localStorage.getItem('kernel_watermark_opacity');
    return saved ? parseInt(saved, 10) : 40;
  });

  // Save watermark configuration to localStorage
  useEffect(() => {
    localStorage.setItem('kernel_watermark_text', watermarkText);
  }, [watermarkText]);

  useEffect(() => {
    localStorage.setItem('kernel_watermark_enabled', String(watermarkEnabled));
  }, [watermarkEnabled]);

  useEffect(() => {
    localStorage.setItem('kernel_watermark_opacity', String(watermarkOpacity));
  }, [watermarkOpacity]);

  // Ensure no third-party ad overlays, vignettes, or scripts exist during the typer experience
  useEffect(() => {
    const purgeAds = () => {
      // 1. Remove MultiTag & all legacy Monetag scripts
      document.querySelectorAll(
        'script[src*="quge5.com"], script[data-zone="277749"], #monetag-multitag-277749, script[src*="nap5k"], script[src*="n6wxm"], script[data-zone="11570514"], script[data-zone="11570550"]'
      ).forEach((el) => el.remove());

      // 2. Remove any injected ad containers, overlays, vignettes or floating banners
      document.querySelectorAll(
        'div[id*="monetag"], div[class*="monetag"], iframe[src*="quge5"], iframe[src*="nap5k"], iframe[src*="n6wxm"], [id*="inpage_push"], [class*="inpage_push"], [id*="vignette"], [class*="vignette"]'
      ).forEach((el) => el.remove());

      // 3. Clear window global handlers that Monetag attaches
      try {
        const win = window as any;
        if (win.monetag) delete win.monetag;
        if (win.show_277749) win.show_277749 = () => {};
        if (win._at) win._at = {};
        if (win.__monetag) delete win.__monetag;
      } catch {
        // Safe fallback
      }
    };

    purgeAds();
    const t1 = setTimeout(purgeAds, 100);
    const t2 = setTimeout(purgeAds, 400);

    // 4. Capture & isolate click/pointer events at root level if they target ad overlays or are propagated by Monetag
    const preventAdClickCapture = (e: MouseEvent | PointerEvent | TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      // If click originated from an ad element or iframe outside our typer layout
      if (
        target.closest('[id*="monetag"]') ||
        target.closest('[class*="monetag"]') ||
        target.closest('iframe[src*="quge5"]') ||
        target.closest('iframe[src*="nap5k"]') ||
        target.closest('[id*="vignette"]') ||
        target.closest('[id*="inpage"]')
      ) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();
        purgeAds();
      }
    };

    window.addEventListener('click', preventAdClickCapture, true);
    window.addEventListener('pointerdown', preventAdClickCapture, true);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('click', preventAdClickCapture, true);
      window.removeEventListener('pointerdown', preventAdClickCapture, true);
    };
  }, []);

  // Compute 4-line ASCII Art Banner purely built from lines
  const renderedAscii = useMemo(() => {
    return generateAsciiBanner(watermarkText || 'KERNEL', 12);
  }, [watermarkText]);

  // Typer state
  const [charIndex, setCharIndex] = useState<number>(0);
  const [keystrokes, setKeystrokes] = useState<number>(0);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Terminal scroll container ref
  const terminalRef = useRef<HTMLDivElement>(null);

  // Initialize Web Audio
  const playClickSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Crisp mechanical typewriter click synthesis
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      const freqs = [780, 920, 1050, 1180, 1340, 1500];
      const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(randomFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(randomFreq * 0.4, ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.038);
    } catch {
      // Audio playback fails gracefully if unpermitted
    }
  }, [soundEnabled]);

  // Handle typing progress
  const advanceCode = useCallback((stepMultiplier: number = 1) => {
    setCharIndex((prev) => {
      const codeLen = selectedTemplate.code.length;
      const next = prev + speed * stepMultiplier;
      // Loop code endlessly if user reaches the end
      if (next >= codeLen * 4) {
        return codeLen;
      }
      return next;
    });
    setKeystrokes((prev) => prev + 1);
    playClickSound();

    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [playClickSound, selectedTemplate.code.length, speed]);

  // Handle backspace
  const backspaceCode = useCallback(() => {
    setCharIndex((prev) => Math.max(0, prev - speed));
    playClickSound();
  }, [playClickSound, speed]);

  // Global Keyboard Listener (hackertyper.net core)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is interacting with form controls or inputs
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA') {
        return;
      }

      // If Escape key pressed
      if (e.key === 'Escape') {
        if (showHelp) {
          setShowHelp(false);
          return;
        }
        if (showSettings) {
          setShowSettings(false);
          return;
        }
        // Dismiss full HUD
        setShowHUD((prev) => !prev);
        return;
      }

      // Backspace handling
      if (e.key === 'Backspace') {
        e.preventDefault();
        backspaceCode();
        return;
      }

      // Ignore standard modifier keys when pressed alone (including Alt and CapsLock)
      if (['Control', 'Meta', 'Shift', 'Alt', 'CapsLock'].includes(e.key)) {
        return;
      }

      // Any typing key triggers authentic hacker code advancement!
      e.preventDefault();
      advanceCode(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [advanceCode, backspaceCode, showHelp, showSettings]);

  // Auto-Type Loop
  useEffect(() => {
    if (!autoType) return;
    const interval = setInterval(() => {
      advanceCode(1);
    }, 70);

    return () => clearInterval(interval);
  }, [autoType, advanceCode]);

  // Generate repeated code buffer if charIndex extends beyond template length
  const getDisplayedCode = () => {
    const code = selectedTemplate.code;
    if (charIndex <= code.length) {
      return code.slice(0, charIndex);
    }
    // Repeat code smoothly
    const repetitions = Math.floor(charIndex / code.length);
    const remainder = charIndex % code.length;
    let full = '';
    for (let i = 0; i < repetitions; i++) {
      full += code + '\n\n';
    }
    full += code.slice(0, remainder);
    return full;
  };

  const displayedText = getDisplayedCode();
  const lineCount = displayedText ? displayedText.split('\n').length : 0;

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(() => {});
      }
    }
  };

  // Copy code to clipboard
  const handleCopyCode = () => {
    if (!displayedText) return;
    navigator.clipboard.writeText(displayedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset terminal
  const handleReset = () => {
    setCharIndex(0);
    setKeystrokes(0);
  };

  return (
    <div 
      className="fixed inset-0 z-50 w-screen h-screen overflow-hidden flex flex-col font-mono select-none"
      style={{ backgroundColor: selectedTheme.bg, color: selectedTheme.text }}
    >
      {/* SCANLINE VINTAGE CRT EFFECT */}
      <div 
        className="pointer-events-none absolute inset-0 z-30 opacity-15 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px]" 
      />

      {/* TOP CONTROL BAR / HUD */}
      {showHUD && (
        <header 
          className="relative z-40 px-3 sm:px-6 py-2.5 sm:py-3 border-b flex items-center justify-between backdrop-blur-md shrink-0 transition-all duration-300"
          style={{ 
            backgroundColor: selectedTheme.headerBg, 
            borderColor: selectedTheme.border 
          }}
        >
          {/* Left Brand & Exit Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors active:scale-90 cursor-pointer"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#00ff88]" />
              <span className="font-display font-bold text-xs sm:text-sm tracking-widest uppercase text-white">
                Kernel Hacker Typer
              </span>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-widest bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 animate-pulse">
                LIVE TERMINAL
              </span>
            </div>
          </div>

          {/* Center Quick Stats (Desktop) */}
          <div className="hidden lg:flex items-center gap-4 text-[11px] text-zinc-400">
            <div>
              FILE: <span className="text-white font-bold">{selectedTemplate.filename}</span>
            </div>
            <div>
              LINES: <span className="text-white font-bold">{lineCount}</span>
            </div>
            <div>
              KEYSTROKES: <span className="text-white font-bold">{keystrokes}</span>
            </div>
            <div>
              SPEED: <span className="text-white font-bold">{speed}x</span>
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled((prev) => !prev)}
              className={`p-1.5 sm:p-2 rounded border transition-colors cursor-pointer ${
                soundEnabled 
                  ? 'border-[#00ff88]/40 bg-[#00ff88]/10 text-[#00ff88]' 
                  : 'border-zinc-700 text-zinc-500 hover:text-zinc-300'
              }`}
              title={soundEnabled ? "Mute typing sound" : "Enable typing sound"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Auto-Type Button */}
            <button
              onClick={() => setAutoType((prev) => !prev)}
              className={`p-1.5 sm:p-2 rounded border transition-colors cursor-pointer ${
                autoType 
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 animate-pulse' 
                  : 'border-white/10 hover:bg-white/5 text-zinc-300'
              }`}
              title={autoType ? "Stop auto typing" : "Start auto typing"}
            >
              {autoType ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Settings Modal Toggle */}
            <button
              onClick={() => setShowSettings((prev) => !prev)}
              className="p-1.5 sm:p-2 rounded border border-white/10 hover:bg-white/10 text-zinc-300 transition-colors cursor-pointer"
              title="Customization & Themes"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Help Dialog Toggle */}
            <button
              onClick={() => setShowHelp((prev) => !prev)}
              className="p-1.5 sm:p-2 rounded border border-white/10 hover:bg-white/10 text-zinc-300 transition-colors cursor-pointer"
              title="Hacker Typer Shortcuts & Instructions"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Reset Terminal */}
            <button
              onClick={handleReset}
              className="p-1.5 sm:p-2 rounded border border-white/10 hover:bg-white/10 text-zinc-300 transition-colors cursor-pointer"
              title="Clear terminal buffer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 sm:p-2 rounded border border-white/10 hover:bg-white/10 text-zinc-300 transition-colors cursor-pointer"
              title="Fullscreen view"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>

            {/* Hide HUD for 100% Pure Immersion */}
            <button
              onClick={() => setShowHUD(false)}
              className="p-1.5 sm:p-2 rounded border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Hide top bar (Press ESC to restore)"
            >
              <EyeOff className="w-4 h-4" />
            </button>
          </div>
        </header>
      )}

      {/* RESTORE HUD FLOATING BUTTON WHEN HIDDEN */}
      {!showHUD && (
        <button
          onClick={() => setShowHUD(true)}
          className="fixed top-3 right-3 z-50 p-2 rounded-lg bg-black/80 hover:bg-black text-white/60 hover:text-white border border-white/20 backdrop-blur-sm transition-all cursor-pointer"
          title="Restore top control bar"
        >
          <Eye className="w-4 h-4" />
        </button>
      )}

      {/* RIGHT-SIDE CUSTOM ASCII LINE-ART BANNER / WATERMARK (MID-RIGHT POSITIONED, SLIGHTLY LEFTWARDS) */}
      {watermarkEnabled && renderedAscii && (
        <div 
          className="pointer-events-none select-none hidden md:flex absolute right-16 sm:right-24 md:right-32 top-1/2 -translate-y-1/2 z-10 transition-all duration-300"
          style={{ opacity: watermarkOpacity / 100 }}
        >
          <pre 
            className="font-mono italic -skew-x-6 text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-[1.18] tracking-wider select-none overflow-x-hidden text-right"
            style={{ 
              color: selectedTheme.accent,
              textShadow: `0 0 18px ${selectedTheme.accent}80`
            }}
          >
            {renderedAscii}
          </pre>
        </div>
      )}

      {/* PRIMARY TERMINAL CANVAS / CODE STREAM */}
      <main 
        ref={terminalRef}
        onClick={() => advanceCode(1)}
        className={`flex-grow w-full overflow-y-auto p-4 sm:p-8 cursor-text select-text transition-all duration-150 ${
          fontSize === 'sm' ? 'text-xs leading-relaxed' :
          fontSize === 'base' ? 'text-sm leading-relaxed' :
          fontSize === 'lg' ? 'text-base leading-loose' :
          'text-lg leading-loose'
        }`}
        style={{
          color: selectedTheme.text,
          textShadow: `0 0 4px ${selectedTheme.accent}40`,
        }}
      >
        {/* Welcome Instruction Comment if Empty */}
        {displayedText.length === 0 ? (
          <div className="space-y-4 opacity-75 max-w-2xl py-6 animate-pulse select-none">
            <p className="font-bold tracking-wider">
              {`/* ========================================================================= */`}
            </p>
            <p className="font-bold text-white tracking-widest text-base sm:text-lg">
              {`// KERNEL AXIS // KERNEL HACKER TYPER SYSTEM`}
            </p>
            <p className="text-zinc-300">
              {`// START TYPING ON YOUR KEYBOARD (OR TAP ON SCREEN) TO INITIATE INTRUSION.`}
            </p>
            <p className="text-zinc-400 text-xs">
              {`// SYSTEM DIRECTIVES:`}
              <br />
              {`// * Type any key to stream authentic C/Kernel source`}
              <br />
              {`// * Press 'Backspace' to erase code chunks`}
              <br />
              {`// * Click 'Auto' in top menu for automated playback mode`}
              <br />
              {`// * Customize theme & right-side watermark text via Settings (Gear icon)`}
            </p>
            <p className="font-bold tracking-wider">
              {`/* ========================================================================= */`}
            </p>
            <div className="flex items-center gap-2 pt-2 text-emerald-400">
              <span className="animate-spin text-lg">⚡</span>
              <span className="tracking-widest uppercase text-xs font-semibold">
                SYSTEM STANDBY // READY FOR OPERATOR KEYSTROKES...
              </span>
            </div>
          </div>
        ) : (
          <pre className="font-mono whitespace-pre-wrap break-words">
            {displayedText}
            {/* Pulsing Terminal Block Cursor */}
            <span 
              className="inline-block w-2.5 h-4 ml-0.5 align-middle animate-pulse"
              style={{ backgroundColor: selectedTheme.cursor }}
            />
          </pre>
        )}
      </main>

      {/* SETTINGS / CUSTOMIZATION MODAL */}
      {showSettings && (
        <div 
          onClick={() => setShowSettings(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md cursor-pointer select-none"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 bg-[#020504] border border-[#00ff88]/30 rounded-2xl shadow-2xl space-y-6 text-zinc-200 cursor-default"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-[#00ff88]" />
                <h3 className="font-display font-bold text-base uppercase tracking-wider text-white">
                  Typer Customization
                </h3>
              </div>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 1. Code Script Selection */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-bold text-[#00ff88]">
                Code Payload / Script Source
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {HACKER_CODE_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => {
                      setSelectedTemplate(tmpl);
                      setCharIndex(0);
                    }}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      selectedTemplate.id === tmpl.id
                        ? 'bg-[#00ff88]/15 border-[#00ff88] text-white shadow-sm shadow-[#00ff88]/20'
                        : 'border-white/10 hover:border-white/20 bg-white/[0.02] text-zinc-400'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{tmpl.name}</div>
                    <div className="text-[10px] text-zinc-400 font-mono">{tmpl.filename}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Color Theme Selection */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-bold text-[#00ff88]">
                Color Theme
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme)}
                    className={`flex items-center gap-2 p-2 rounded-lg border transition-all cursor-pointer ${
                      selectedTheme.id === theme.id
                        ? 'border-[#00ff88] bg-white/10 text-white font-bold'
                        : 'border-white/10 hover:border-white/20 text-zinc-400'
                    }`}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0" 
                      style={{ backgroundColor: theme.text }}
                    />
                    <span className="text-xs truncate">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Typing Speed & Font Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-bold text-[#00ff88]">
                  Speed (Chars / Keystroke): {speed}
                </label>
                <div className="flex items-center gap-1.5">
                  {[2, 4, 6, 8, 12, 16].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className={`flex-1 py-1.5 rounded text-xs font-mono font-bold transition-colors cursor-pointer border ${
                        speed === s
                          ? 'bg-[#00ff88] text-black border-[#00ff88]'
                          : 'border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-bold text-[#00ff88]">
                  Font Size
                </label>
                <div className="flex items-center gap-1.5">
                  {(['sm', 'base', 'lg', 'xl'] as const).map((fs) => (
                    <button
                      key={fs}
                      onClick={() => setFontSize(fs)}
                      className={`flex-1 py-1.5 rounded text-xs font-mono uppercase font-bold transition-colors cursor-pointer border ${
                        fontSize === fs
                          ? 'bg-[#00ff88] text-black border-[#00ff88]'
                          : 'border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {fs}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Custom Terminal Watermark (Right-Side Line-Art Text) */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Type className="w-3.5 h-3.5 text-[#00ff88]" />
                  <label className="text-xs uppercase tracking-wider font-bold text-[#00ff88]">
                    Right-Side Line-Art Watermark
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setWatermarkEnabled((prev) => !prev)}
                  className={`px-2.5 py-1 rounded text-[11px] uppercase font-mono font-bold transition-all cursor-pointer border ${
                    watermarkEnabled
                      ? 'bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88]'
                      : 'bg-white/5 border-white/10 text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {watermarkEnabled ? 'Visible: ON' : 'Visible: OFF'}
                </button>
              </div>

              {watermarkEnabled && (
                <div className="space-y-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400">
                      <span>Custom Text / Handle (Max 12 chars):</span>
                      <span className="font-mono text-white font-semibold">
                        {watermarkText.length}/12
                      </span>
                    </div>
                    <input
                      type="text"
                      value={watermarkText}
                      maxLength={12}
                      onChange={(e) => setWatermarkText(e.target.value.toUpperCase())}
                      placeholder="e.g. KERNEL, ROOT, CYBER..."
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 focus:border-[#00ff88] focus:outline-none text-white font-mono text-sm tracking-wider uppercase"
                    />
                  </div>

                  {/* Preset quick buttons */}
                  <div className="flex items-center flex-wrap gap-1.5">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono mr-1">Presets:</span>
                    {['KERNEL', 'ROOT', 'MATRIX', 'CYBER'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setWatermarkText(preset)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase transition-colors cursor-pointer border ${
                          watermarkText === preset
                            ? 'bg-[#00ff88] text-black border-[#00ff88] font-bold'
                            : 'border-white/10 hover:border-white/20 bg-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>

                  {/* Opacity Slider */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400">
                      <span>Watermark Opacity:</span>
                      <span className="font-mono text-white font-bold">{watermarkOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      step={5}
                      value={watermarkOpacity}
                      onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                      className="w-full accent-[#00ff88] cursor-pointer"
                    />
                  </div>

                  {/* Live ASCII Preview */}
                  {renderedAscii && (
                    <div className="p-2.5 rounded-lg bg-black/80 border border-white/10 space-y-1">
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">
                        Preview:
                      </div>
                      <pre 
                        className="font-mono italic -skew-x-6 text-xs leading-tight overflow-x-auto py-1"
                        style={{ color: selectedTheme.accent }}
                      >
                        {renderedAscii}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <button
                onClick={handleCopyCode}
                disabled={!displayedText}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs font-semibold text-zinc-300 disabled:opacity-40 cursor-pointer border border-white/10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Code"}</span>
              </button>

              <button
                onClick={() => setShowSettings(false)}
                className="px-5 py-1.5 rounded-lg bg-[#00ff88] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#00ff88]/90 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HELP / SHORTCUTS MODAL */}
      {showHelp && (
        <div 
          onClick={() => setShowHelp(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md cursor-pointer select-none"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg p-6 bg-[#020504] border border-[#00ff88]/30 rounded-2xl shadow-2xl space-y-5 text-zinc-200 cursor-default"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#00ff88]" />
                <h3 className="font-display font-bold text-base uppercase tracking-wider text-white">
                  Kernel Hacker Typer Controls & Shortcuts
                </h3>
              </div>
              <button 
                onClick={() => setShowHelp(false)}
                className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-start justify-between gap-4 p-2.5 rounded bg-white/[0.02] border border-white/5">
                <span className="text-zinc-400">Type Any Key</span>
                <span className="text-[#00ff88] font-bold text-right">Streams authentic C/Kernel code</span>
              </div>
              <div className="flex items-start justify-between gap-4 p-2.5 rounded bg-white/[0.02] border border-white/5">
                <span className="text-zinc-400">Press 'Backspace'</span>
                <span className="text-amber-400 font-bold text-right">Erases previous code chunks</span>
              </div>
              <div className="flex items-start justify-between gap-4 p-2.5 rounded bg-white/[0.02] border border-white/5">
                <span className="text-zinc-400">Press 'Escape'</span>
                <span className="text-zinc-200 font-bold text-right">Toggles navigation menu & HUD</span>
              </div>
              <div className="flex items-start justify-between gap-4 p-2.5 rounded bg-white/[0.02] border border-white/5">
                <span className="text-zinc-400">Mobile Device</span>
                <span className="text-cyan-400 font-bold text-right">Tap anywhere on screen to type</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowHelp(false)}
                className="px-6 py-2 rounded-lg bg-[#00ff88] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#00ff88]/90 transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE FLOATING INTERACTION BAR (Touch Friendly) */}
      <div className="sm:hidden fixed bottom-3 left-3 right-3 z-40 flex items-center justify-between gap-2 p-2 bg-[#020504]/90 border border-white/15 rounded-xl backdrop-blur-md shadow-2xl">
        <button
          onClick={() => advanceCode(1)}
          className="flex-1 py-2.5 px-3 flex items-center justify-center rounded-lg bg-[#00ff88] text-black active:scale-95 transition-transform cursor-pointer shadow-md shadow-[#00ff88]/20"
          title="Tap to type code"
        >
          <Keyboard className="w-4 h-4" />
        </button>

        <button
          onClick={() => setAutoType((prev) => !prev)}
          className={`p-2.5 rounded-lg border flex items-center justify-center transition-colors ${
            autoType ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'border-white/20 text-zinc-300'
          }`}
          title={autoType ? "Stop auto typing" : "Start auto typing"}
        >
          {autoType ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
