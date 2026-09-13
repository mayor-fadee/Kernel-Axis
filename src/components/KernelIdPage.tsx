import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Download, 
  RefreshCw, 
  Upload, 
  Sparkles, 
  Share2, 
  Check, 
  Terminal, 
  Fingerprint, 
  Cpu, 
  Award,
  Hash,
  Copy,
  AlertCircle
} from 'lucide-react';
import { KernelAxisLogo, KERNEL_AXIS_LOGO_URL } from './KernelAxisLogo';
import { playSynthBeep } from '../lib/audio';

interface OperatorProfile {
  name: string;
  codename: string;
  role: string;
  clearance: string;
  idNumber: string;
  specialty: string;
  issueDate: string;
  theme: 'emerald' | 'cyan' | 'matrix' | 'stealth';
  avatarUrl: string;
}

const ROLES = [
  'Ethical Hacker',
  'Security Researcher',
  'SOC Analyst',
  'Red Team Specialist',
  'Blue Team Defender',
  'Bug Bounty Hunter',
  'Penetration Tester',
  'Cryptanalyst',
  'Threat Hunter',
  'Cybersecurity Student'
];

const CLEARANCE_LEVELS = [
  'LEVEL 1 - BASIC ACCESS',
  'LEVEL 2 - DEFENSE OPERATOR',
  'LEVEL 3 - ADVANCED THREAT ANALYST',
  'LEVEL 4 - RED TEAM ROOT',
  'LEVEL 5 - KERNEL ARCHITECT (TOP SECRET)'
];

const DEFAULT_AVATARS = [
  { id: 'hacker1', label: 'Shadow Hacker', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&auto=format&fit=crop&q=80' },
  { id: 'cyborg', label: 'Cyber Tech', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&auto=format&fit=crop&q=80' },
  { id: 'analyst', label: 'SOC Tech', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&auto=format&fit=crop&q=80' },
  { id: 'terminal', label: 'Matrix Code', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&auto=format&fit=crop&q=80' },
];

function generateRandomId(): string {
  const chars = '0123456789ABCDEF';
  let segment = '';
  for (let i = 0; i < 4; i++) {
    segment += chars[Math.floor(Math.random() * chars.length)];
  }
  const num = Math.floor(1000 + Math.random() * 9000);
  return `KA-${num}-${segment}`;
}

export const KernelIdPage: React.FC = () => {
  const [profile, setProfile] = useState<OperatorProfile>({
    name: 'Alex Mercer',
    codename: 'PHANTOM_NODE',
    role: 'Security Researcher',
    clearance: 'LEVEL 3 - ADVANCED THREAT ANALYST',
    idNumber: generateRandomId(),
    specialty: 'Kernel Vulnerability Research & Defensive Threat Modeling',
    issueDate: new Date().toISOString().split('T')[0],
    theme: 'emerald',
    avatarUrl: DEFAULT_AVATARS[0].url
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [customAvatarUploaded, setCustomAvatarUploaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sound beep on edits
  const handleInputChange = (field: keyof OperatorProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleRegenerateId = () => {
    playSynthBeep('click');
    setProfile(prev => ({
      ...prev,
      idNumber: generateRandomId()
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          playSynthBeep('click');
          setProfile(prev => ({
            ...prev,
            avatarUrl: event.target!.result as string
          }));
          setCustomAvatarUploaded(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // High-Resolution 2D Canvas-based Card Generator & Exporter
  const handleDownloadVirtualCard = async () => {
    playSynthBeep('click');
    setIsDownloading(true);

    try {
      // Dimensions: 1200 x 750 (High-res 16:10 standard ID landscape card)
      const canvas = document.createElement('canvas');
      const width = 1200;
      const height = 750;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Canvas context unavailable');

      // Theme Colors Definition
      const themeColors = {
        emerald: {
          accent: '#00ff88',
          accentDim: 'rgba(0, 255, 136, 0.15)',
          accentBorder: 'rgba(0, 255, 136, 0.35)',
          glow: 'rgba(0, 255, 136, 0.25)',
          badgeBg: '#05180f'
        },
        cyan: {
          accent: '#00e5ff',
          accentDim: 'rgba(0, 229, 255, 0.15)',
          accentBorder: 'rgba(0, 229, 255, 0.35)',
          glow: 'rgba(0, 229, 255, 0.25)',
          badgeBg: '#04161a'
        },
        matrix: {
          accent: '#39ff14',
          accentDim: 'rgba(57, 255, 20, 0.15)',
          accentBorder: 'rgba(57, 255, 20, 0.35)',
          glow: 'rgba(57, 255, 20, 0.25)',
          badgeBg: '#051b08'
        },
        stealth: {
          accent: '#e2e8f0',
          accentDim: 'rgba(226, 232, 240, 0.12)',
          accentBorder: 'rgba(226, 232, 240, 0.3)',
          glow: 'rgba(255, 255, 255, 0.15)',
          badgeBg: '#18181b'
        }
      }[profile.theme];

      // 1. Base Card Surface with Rounded Corners
      const radius = 32;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(width - radius, 0);
      ctx.quadraticCurveTo(width, 0, width, radius);
      ctx.lineTo(width, height - radius);
      ctx.quadraticCurveTo(width, height, width - radius, height);
      ctx.lineTo(radius, height);
      ctx.quadraticCurveTo(0, height, 0, height - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
      ctx.clip();

      // Deep carbon obsidian gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, '#030806');
      bgGradient.addColorStop(0.5, '#050c08');
      bgGradient.addColorStop(1, '#010403');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Cyber Grid Pattern overlay
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Top cyber security micro line
      ctx.strokeStyle = themeColors.accent;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(40, 0);
      ctx.lineTo(width - 40, 0);
      ctx.stroke();

      // Holographic corner accents
      const drawCorner = (cx: number, cy: number, dx: number, dy: number) => {
        ctx.strokeStyle = themeColors.accent;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy + dy * 24);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx + dx * 24, cy);
        ctx.stroke();
      };
      drawCorner(40, 40, 1, 1);
      drawCorner(width - 40, 40, -1, 1);
      drawCorner(40, height - 40, 1, -1);
      drawCorner(width - 40, height - 40, -1, -1);

      // Watermark Text diagonally
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(-Math.PI / 8);
      ctx.font = '900 80px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.textAlign = 'center';
      ctx.fillText('KERNEL AXIS VERIFIED', 0, 0);
      ctx.restore();

      // Top Left Header: Logo & Branding
      // Load Logo Image
      const logoImg = new Image();
      logoImg.crossOrigin = 'anonymous';
      await new Promise<void>((resolve) => {
        logoImg.onload = () => resolve();
        logoImg.onerror = () => resolve();
        logoImg.src = KERNEL_AXIS_LOGO_URL;
      });

      if (logoImg.width > 0) {
        ctx.drawImage(logoImg, 60, 56, 68, 68);
      }

      // Brand Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px "Space Grotesk", sans-serif';
      ctx.fillText('KERNEL AXIS', 145, 84);

      ctx.fillStyle = themeColors.accent;
      ctx.font = 'bold 13px "JetBrains Mono", monospace';
      ctx.fillText('OFFICIAL CYBERSECURITY OPERATOR ID', 145, 108);

      // Top Right: Chip & Cryptographic Stamp
      // Microchip Graphic
      const chipX = width - 180;
      const chipY = 56;
      ctx.fillStyle = '#1c1f1d';
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(chipX, chipY, 90, 64, 8);
      ctx.fill();
      ctx.stroke();

      // Chip internal lines
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
      ctx.lineWidth = 1;
      ctx.strokeRect(chipX + 15, chipY + 15, 60, 34);
      ctx.beginPath();
      ctx.moveTo(chipX + 45, chipY);
      ctx.lineTo(chipX + 45, chipY + 64);
      ctx.stroke();

      // Left Column: Avatar Photo Frame
      const avatarX = 60;
      const avatarY = 160;
      const avatarSize = 220;

      // Photo Frame Box
      ctx.fillStyle = '#060a08';
      ctx.fillRect(avatarX, avatarY, avatarSize, avatarSize);
      ctx.strokeStyle = themeColors.accentBorder;
      ctx.lineWidth = 2;
      ctx.strokeRect(avatarX, avatarY, avatarSize, avatarSize);

      // Load Avatar Image
      const avatarImg = new Image();
      avatarImg.crossOrigin = 'anonymous';
      await new Promise<void>((resolve) => {
        avatarImg.onload = () => resolve();
        avatarImg.onerror = () => resolve();
        avatarImg.src = profile.avatarUrl;
      });

      if (avatarImg.width > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(avatarX + 4, avatarY + 4, avatarSize - 8, avatarSize - 8);
        ctx.clip();
        ctx.drawImage(avatarImg, avatarX + 4, avatarY + 4, avatarSize - 8, avatarSize - 8);
        ctx.restore();
      }

      // Security Scanlines on photo
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      for (let y = avatarY; y < avatarY + avatarSize; y += 4) {
        ctx.fillRect(avatarX, y, avatarSize, 1.5);
      }

      // Live Tag under photo
      ctx.fillStyle = themeColors.badgeBg;
      ctx.fillRect(avatarX, avatarY + avatarSize + 16, avatarSize, 36);
      ctx.strokeStyle = themeColors.accentBorder;
      ctx.lineWidth = 1;
      ctx.strokeRect(avatarX, avatarY + avatarSize + 16, avatarSize, 36);

      ctx.fillStyle = themeColors.accent;
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('STATUS: VERIFIED ACTIVE', avatarX + avatarSize / 2, avatarY + avatarSize + 39);
      ctx.textAlign = 'left';

      // Middle Column: Main Identification Data
      const dataX = 330;
      let curY = 180;

      // Operator Name
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillText('OPERATOR IDENTITY', dataX, curY);

      curY += 34;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Space Grotesk", sans-serif';
      ctx.fillText(profile.name.toUpperCase(), dataX, curY);

      // Codename / Alias
      curY += 28;
      ctx.fillStyle = themeColors.accent;
      ctx.font = 'bold 18px "JetBrains Mono", monospace';
      ctx.fillText(`HANDLE: [${profile.codename || 'ANONYMOUS'}]`, dataX, curY);

      // Divider line
      curY += 24;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(dataX, curY);
      ctx.lineTo(width - 60, curY);
      ctx.stroke();

      // Specialization Role
      curY += 32;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillText('ROLE DESIGNATION', dataX, curY);

      curY += 26;
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px "Space Grotesk", sans-serif';
      ctx.fillText(profile.role, dataX, curY);

      // Clearance Pill
      curY += 36;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillText('SECURITY CLEARANCE', dataX, curY);

      curY += 16;
      ctx.fillStyle = themeColors.badgeBg;
      ctx.fillRect(dataX, curY, 440, 32);
      ctx.strokeStyle = themeColors.accentBorder;
      ctx.strokeRect(dataX, curY, 440, 32);

      ctx.fillStyle = themeColors.accent;
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillText(profile.clearance, dataX + 16, curY + 21);

      // Specialty Note
      curY += 56;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillText('TACTICAL DISCIPLINE', dataX, curY);

      curY += 22;
      ctx.fillStyle = '#cccccc';
      ctx.font = '14px "Space Grotesk", sans-serif';
      const specialtyText = profile.specialty.length > 55 ? profile.specialty.substring(0, 52) + '...' : profile.specialty;
      ctx.fillText(specialtyText, dataX, curY);

      // Bottom Bar: Verification Code, Barcode, & Security Hash
      const botY = height - 120;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.moveTo(60, botY);
      ctx.lineTo(width - 60, botY);
      ctx.stroke();

      // Unique ID Token
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText('REGISTRY SERIAL ID', 60, botY + 30);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px "JetBrains Mono", monospace';
      ctx.fillText(profile.idNumber, 60, botY + 56);

      // Issue Date
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText('TIMESTAMP ISSUED', 320, botY + 30);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px "JetBrains Mono", monospace';
      ctx.fillText(profile.issueDate, 320, botY + 56);

      // Synthetic Barcode Right side
      const barX = width - 360;
      const barY = botY + 18;
      ctx.fillStyle = '#ffffff';
      // Generate authentic-looking variable-width barcode
      const barWidths = [3, 1, 4, 2, 1, 3, 2, 5, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 5, 2, 1, 3, 4, 2, 1, 3, 2, 4, 1];
      let offset = 0;
      barWidths.forEach((w, idx) => {
        if (idx % 2 === 0) {
          ctx.fillRect(barX + offset, barY, w, 42);
        }
        offset += w + 2;
      });

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText('SHA256: 9E107D9D372BB6826BD81D35', barX, barY + 58);

      // Restore clipping
      ctx.restore();

      // Border outline
      ctx.strokeStyle = themeColors.accentBorder;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(0, 0, width, height, radius);
      ctx.stroke();

      // Export as PNG
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const downloadLink = document.createElement('a');
      downloadLink.href = dataUrl;
      const cleanName = profile.name.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'operator';
      downloadLink.download = `kernel_axis_id_${cleanName}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

    } catch (err) {
      console.error('Failed to export Virtual Card:', err);
      alert('Could not generate card image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyShareLink = () => {
    playSynthBeep('click');
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareTwitter = () => {
    playSynthBeep('click');
    const text = encodeURIComponent(`Just generated my official Kernel Axis Cyber Security Operator ID! 🛡️💻 Create your verified virtual badge:`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    playSynthBeep('click');
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* HEADER TITLE */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/5 border border-[#00ff88]/20 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#00ff88]">
          <Fingerprint className="w-3.5 h-3.5 text-[#00ff88]" />
          Digital Identity Badge Generator
        </div>
        
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white uppercase tracking-tight">
          Kernel Axis <span className="text-[#00ff88] drop-shadow-[0_0_20px_rgba(0,255,136,0.2)]">Virtual ID</span>
        </h1>
        
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
          Forge your official Kernel Axis Cyber Security Operator Card. Customize your clearance credentials, specialization discipline, and download your high-resolution virtual pass.
        </p>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE: LEFT PREVIEW & RIGHT CUSTOMIZER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: LIVE CARD PREVIEW & DOWNLOAD ACTIONS */}
        <div className="lg:col-span-7 flex flex-col items-center space-y-6">
          
          {/* THE CYBER BADGE (High-Tech Responsive Container) */}
          <div className="w-full max-w-2xl perspective-1000">
            <motion.div 
              ref={cardRef}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`relative w-full rounded-2xl sm:rounded-3xl border overflow-hidden p-5 sm:p-7 shadow-2xl transition-all duration-300 select-none ${
                profile.theme === 'emerald'
                  ? 'bg-[#030805] border-[#00ff88]/30 shadow-[#00ff88]/5 hover:border-[#00ff88]/50'
                  : profile.theme === 'cyan'
                  ? 'bg-[#02080a] border-[#00e5ff]/30 shadow-[#00e5ff]/5 hover:border-[#00e5ff]/50'
                  : profile.theme === 'matrix'
                  ? 'bg-[#030a04] border-[#39ff14]/30 shadow-[#39ff14]/5 hover:border-[#39ff14]/50'
                  : 'bg-[#09090b] border-zinc-700 shadow-zinc-800/10 hover:border-zinc-500'
              }`}
            >
              {/* Background Cyber Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              
              {/* Ambient Glow */}
              <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20 ${
                profile.theme === 'emerald' ? 'bg-[#00ff88]' : profile.theme === 'cyan' ? 'bg-[#00e5ff]' : profile.theme === 'matrix' ? 'bg-[#39ff14]' : 'bg-white'
              }`} />

              {/* CARD TOP HEADER: LOGO & CHIP */}
              <div className="relative z-10 flex items-start justify-between gap-4 pb-5 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-black/80 border border-white/10 p-1 flex items-center justify-center shrink-0 shadow-md">
                    <KernelAxisLogo className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-brand font-bold text-sm sm:text-base text-white tracking-wider uppercase">
                        Kernel Axis
                      </span>
                      <span className={`text-[8px] sm:text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-semibold border ${
                        profile.theme === 'emerald'
                          ? 'bg-[#00ff88]/10 text-[#00ff88] border-[#00ff88]/30'
                          : profile.theme === 'cyan'
                          ? 'bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/30'
                          : profile.theme === 'matrix'
                          ? 'bg-[#39ff14]/10 text-[#39ff14] border-[#39ff14]/30'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                      }`}>
                        OPERATOR
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 block tracking-tight">
                      CYBERSECURITY INTELLIGENCE PASS
                    </span>
                  </div>
                </div>

                {/* Cyber Smart Chip Icon */}
                <div className="flex flex-col items-end">
                  <div className="w-11 h-8 sm:w-14 sm:h-9 rounded-md bg-gradient-to-tr from-[#c89b3c] via-[#e5c158] to-[#9c782b] p-0.5 border border-amber-300/40 shadow-inner flex flex-col justify-between overflow-hidden">
                    <div className="w-full h-[1px] bg-amber-900/40 mt-1" />
                    <div className="flex justify-between px-1">
                      <div className="w-2 h-3 border-r border-amber-900/40" />
                      <div className="w-2 h-3 border-l border-amber-900/40" />
                    </div>
                    <div className="w-full h-[1px] bg-amber-900/40 mb-1" />
                  </div>
                  <span className="text-[8px] font-mono text-zinc-400 mt-1 tracking-widest uppercase">
                    SECURE ENCLAVE
                  </span>
                </div>
              </div>

              {/* CARD BODY: PHOTO & CREDENTIAL DATA */}
              <div className="relative z-10 py-5 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                
                {/* PHOTO FRAME */}
                <div className="sm:col-span-4 flex flex-col items-center sm:items-start">
                  <div className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl border-2 overflow-hidden bg-black/90 p-1 shadow-lg ${
                    profile.theme === 'emerald'
                      ? 'border-[#00ff88]/40'
                      : profile.theme === 'cyan'
                      ? 'border-[#00e5ff]/40'
                      : profile.theme === 'matrix'
                      ? 'border-[#39ff14]/40'
                      : 'border-zinc-600'
                  }`}>
                    <img 
                      src={profile.avatarUrl} 
                      alt={profile.name}
                      className="w-full h-full object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    {/* Scanline line */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none" />
                    
                    {/* Corner Reticle */}
                    <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-white" />
                    <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-white" />
                    <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-white" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white" />
                  </div>

                  <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.03] border border-white/10 text-[9px] font-mono text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>STATUS: ACTIVE</span>
                  </div>
                </div>

                {/* DETAILS COLUMN */}
                <div className="sm:col-span-8 space-y-3 text-center sm:text-left">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 block">
                      OPERATOR IDENTITY
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-wide uppercase truncate">
                      {profile.name || 'OPERATOR NAME'}
                    </h3>
                    <p className={`text-xs font-mono font-bold tracking-wider ${
                      profile.theme === 'emerald' ? 'text-[#00ff88]' : profile.theme === 'cyan' ? 'text-[#00e5ff]' : profile.theme === 'matrix' ? 'text-[#39ff14]' : 'text-zinc-300'
                    }`}>
                      HANDLE: [{profile.codename || 'ANON'}]
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/[0.06]">
                    <div>
                      <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block">
                        ROLE DESIGNATION
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-zinc-100 block truncate">
                        {profile.role}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block">
                        SECURITY CLEARANCE
                      </span>
                      <span className={`text-[10px] sm:text-xs font-mono font-bold block truncate ${
                        profile.theme === 'emerald' ? 'text-[#00ff88]' : profile.theme === 'cyan' ? 'text-[#00e5ff]' : profile.theme === 'matrix' ? 'text-[#39ff14]' : 'text-zinc-300'
                      }`}>
                        {profile.clearance.split(' - ')[0]}
                      </span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block">
                      TACTICAL FOCUS
                    </span>
                    <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed font-sans">
                      {profile.specialty}
                    </p>
                  </div>
                </div>

              </div>

              {/* CARD FOOTER: SERIAL, TIMESTAMP & SYNTHETIC BARCODE */}
              <div className="relative z-10 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-400 block">
                      REGISTRY ID
                    </span>
                    <span className="text-xs font-mono font-bold text-white tracking-wider">
                      {profile.idNumber}
                    </span>
                  </div>

                  <div className="h-6 w-[1px] bg-white/10" />

                  <div>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-400 block">
                      ISSUED
                    </span>
                    <span className="text-[11px] font-mono text-zinc-300">
                      {profile.issueDate}
                    </span>
                  </div>
                </div>

                {/* Minimalist Barcode graphic */}
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-[2px] h-6 px-2 bg-white/5 rounded border border-white/10">
                    {[12, 18, 8, 22, 14, 9, 20, 16, 24, 11, 15, 21, 13, 17, 10, 23, 19, 14].map((h, i) => (
                      <div 
                        key={i} 
                        style={{ height: `${h}px` }} 
                        className={`w-[2px] ${i % 3 === 0 ? 'bg-white' : 'bg-zinc-400'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-[8px] font-mono text-zinc-400 mt-0.5">
                    VERIFIED ENCRYPTED
                  </span>
                </div>
              </div>

            </motion.div>
          </div>

          {/* PRIMARY CALL TO ACTION BUTTON: DOWNLOAD CARD */}
          <div className="w-full max-w-2xl space-y-3">
            <button
              onClick={handleDownloadVirtualCard}
              disabled={isDownloading}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-[#00ff88] text-black font-display font-bold text-sm sm:text-base uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(0,255,136,0.25)] hover:bg-[#00e67a] hover:shadow-[0_0_35px_rgba(0,255,136,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Rendering High-Res Badge...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 shrink-0" />
                  <span>Download Virtual Card (PNG)</span>
                </>
              )}
            </button>

            {/* QUICK VIRAL SOCIAL SHARE BUTTONS */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={handleShareTwitter}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white rounded-lg transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#00ff88]" />
                <span>Share on X</span>
              </button>

              <button
                onClick={handleShareLinkedIn}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white rounded-lg transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#00e5ff]" />
                <span>Share on LinkedIn</span>
              </button>

              <button
                onClick={handleCopyShareLink}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white rounded-lg transition-all cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-[#00ff88]" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: CARD CUSTOMIZER & CONFIGURATION CONTROLS */}
        <div className="lg:col-span-5 bg-[#020504] border border-[#00ff88]/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#00ff88]" />
              <h2 className="font-display font-bold text-lg text-white uppercase tracking-wide">
                Operator Configuration
              </h2>
            </div>
            <button
              onClick={handleRegenerateId}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-[#00ff88] bg-[#00ff88]/10 hover:bg-[#00ff88]/20 border border-[#00ff88]/20 rounded-md transition-all cursor-pointer"
              title="Generate New Registry Token"
            >
              <RefreshCw className="w-3 h-3" />
              <span>New ID</span>
            </button>
          </div>

          <div className="space-y-4">
            
            {/* FIELD: FULL NAME */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                Full Name / Legal Alias
              </label>
              <input
                type="text"
                value={profile.name}
                maxLength={26}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 rounded-xl text-white font-sans text-sm focus:outline-none focus:border-[#00ff88]/60 focus:ring-1 focus:ring-[#00ff88]/30 transition-all"
                placeholder="e.g. Alex Mercer"
              />
            </div>

            {/* FIELD: CODENAME / HANDLE */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                Security Handle / Codename
              </label>
              <input
                type="text"
                value={profile.codename}
                maxLength={20}
                onChange={(e) => handleInputChange('codename', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-[#00ff88]/60 focus:ring-1 focus:ring-[#00ff88]/30 transition-all uppercase"
                placeholder="e.g. PHANTOM_NODE"
              />
            </div>

            {/* FIELD: ROLE SELECTION */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                Specialization Role
              </label>
              <select
                value={profile.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 rounded-xl text-white font-sans text-sm focus:outline-none focus:border-[#00ff88]/60 focus:ring-1 focus:ring-[#00ff88]/30 transition-all cursor-pointer"
              >
                {ROLES.map(role => (
                  <option key={role} value={role} className="bg-zinc-900 text-white">
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* FIELD: SECURITY CLEARANCE */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                Clearance Tier
              </label>
              <select
                value={profile.clearance}
                onChange={(e) => handleInputChange('clearance', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-[#00ff88]/60 focus:ring-1 focus:ring-[#00ff88]/30 transition-all cursor-pointer"
              >
                {CLEARANCE_LEVELS.map(tier => (
                  <option key={tier} value={tier} className="bg-zinc-900 text-white">
                    {tier}
                  </option>
                ))}
              </select>
            </div>

            {/* FIELD: TACTICAL DISCIPLINE */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1.5">
                Tactical Focus Description
              </label>
              <textarea
                value={profile.specialty}
                maxLength={100}
                rows={2}
                onChange={(e) => handleInputChange('specialty', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/60 border border-white/10 rounded-xl text-white font-sans text-sm focus:outline-none focus:border-[#00ff88]/60 focus:ring-1 focus:ring-[#00ff88]/30 transition-all resize-none"
                placeholder="Brief summary of cybersecurity expertise..."
              />
            </div>

            {/* FIELD: PHOTO / AVATAR SELECTION */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                Operator Photo / Avatar
              </label>
              
              <div className="grid grid-cols-4 gap-2 mb-3">
                {DEFAULT_AVATARS.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => {
                      playSynthBeep('click');
                      setProfile(prev => ({ ...prev, avatarUrl: avatar.url }));
                      setCustomAvatarUploaded(false);
                    }}
                    className={`relative rounded-lg overflow-hidden h-14 border-2 transition-all cursor-pointer ${
                      profile.avatarUrl === avatar.url && !customAvatarUploaded
                        ? 'border-[#00ff88] scale-95 shadow-md shadow-[#00ff88]/20'
                        : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                    }`}
                  >
                    <img 
                      src={avatar.url} 
                      alt={avatar.label} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>

              {/* UPLOAD CUSTOM PHOTO BUTTON */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 rounded-xl text-xs font-mono text-zinc-200 hover:text-white transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-[#00ff88]" />
                <span>Upload Custom Photo (JPG / PNG)</span>
              </button>
            </div>

            {/* FIELD: CARD HOLOGRAPHIC THEME */}
            <div>
              <label className="block text-xs font-mono text-zinc-300 uppercase tracking-wider mb-2">
                Hologram Accent Theme
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'emerald', label: 'Emerald', color: '#00ff88' },
                  { id: 'cyan', label: 'Cyan', color: '#00e5ff' },
                  { id: 'matrix', label: 'Matrix', color: '#39ff14' },
                  { id: 'stealth', label: 'Stealth', color: '#e2e8f0' }
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => {
                      playSynthBeep('click');
                      setProfile(prev => ({ ...prev, theme: th.id as any }));
                    }}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-mono uppercase tracking-wider border transition-all cursor-pointer ${
                      profile.theme === th.id
                        ? 'border-white bg-white/10 text-white font-bold'
                        : 'border-white/10 text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: th.color }} />
                    <span className="truncate">{th.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2 text-[11px] font-mono text-zinc-400">
            <AlertCircle className="w-3.5 h-3.5 text-[#00ff88] shrink-0" />
            <span>100% Client-Side Rendered. Zero data stored on external servers.</span>
          </div>

        </div>

      </div>

    </div>
  );
};
