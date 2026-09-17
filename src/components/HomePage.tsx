import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { KernelAxisLogo } from './KernelAxisLogo';
import { CyberQuestionCard } from './CyberQuestionCard';
import { questionsData, QuestionItem } from '../data/questionsData';
import {
  Shield,
  ArrowRight,
  Globe,
  Smartphone,
  Eye,
  Key,
  HelpCircle,
  BookOpen,
  Database,
  Lock,
  Activity,
  ArrowDown,
  Fingerprint,
  Sparkles
} from 'lucide-react';
import { playSynthBeep } from '../lib/audio';

interface HomePageProps {
  onNavigate: (view: 'home' | 'learn' | 'map' | 'about' | 'contact' | 'privacy' | 'questions' | 'kernel-id') => void;
}

const THREE_HOURS_MS = 3 * 60 * 60 * 1000;

function get3HourQuestion(): QuestionItem {
  if (!questionsData || questionsData.length === 0) {
    return {
      id: 'fallback',
      categoryId: 'iam',
      category: 'IDENTITY & ACCESS MANAGEMENT',
      difficulty: 'FUNDAMENTAL',
      question: 'What is the primary purpose of Multi-Factor Authentication (MFA)?',
      options: [
        { id: 'opt-a', label: 'A', text: "To encrypt local files stored on a user's hard drive.", isCorrect: false },
        { id: 'opt-b', label: 'B', text: 'To require two or more verification factors to gain authorized access to a system or resource.', isCorrect: true },
        { id: 'opt-c', label: 'C', text: 'To automatically generate complex passwords for every website.', isCorrect: false },
        { id: 'opt-d', label: 'D', text: 'To increase network transmission speeds during remote authentication.', isCorrect: false }
      ],
      explanation: 'Multi-Factor Authentication (MFA) requires two or more distinct verification credentials to secure access.'
    };
  }
  const periodIndex = Math.floor(Date.now() / THREE_HOURS_MS);
  const questionIndex = periodIndex % questionsData.length;
  return questionsData[questionIndex];
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState<QuestionItem>(get3HourQuestion);

  useEffect(() => {
    const updateQuestion = () => {
      const q = get3HourQuestion();
      setCurrentQuestion((prev) => (prev.id !== q.id ? q : prev));
    };

    updateQuestion();
    const interval = setInterval(updateQuestion, 60000);
    window.addEventListener('focus', updateQuestion);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', updateQuestion);
    };
  }, []);
  
  const coreReasons = [
    {
      title: 'Protect Personal Information',
      icon: <Smartphone className="w-5 h-5 text-[#00ff88]" />,
      desc: 'Keep your address, banking credentials, and secure personal details safe from modern digital identity theft.'
    },
    {
      title: 'Secure Passwords',
      icon: <Key className="w-5 h-5 text-[#00ff88]" />,
      desc: 'Discover how password managers and strong, unique combinations stop security leaks from spreading.'
    },
    {
      title: 'Avoid Online Scams',
      icon: <HelpCircle className="w-5 h-5 text-[#00ff88]" />,
      desc: 'Equip yourself with practical knowledge to identify social engineering tricks and untrustworthy links.'
    },
    {
      title: 'Stay Safe Online',
      icon: <Eye className="w-5 h-5 text-[#00ff88]" />,
      desc: 'Learn how to configure basic security settings, browse securely, and safely connect to public networks.'
    }
  ];

  return (
    <div className="w-full text-zinc-300 space-y-16 sm:space-y-24 pb-16">
      
      {/* SECTION 1 — HERO */}
      <section className="relative py-12 sm:py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#00ff88]/10">
        {/* Subtle geometric digital grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        
        {/* Abstract subtle gradient glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00ff88]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-[1536px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start px-2 sm:px-0">
            <div className="space-y-3 sm:space-y-4 w-full">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white uppercase leading-tight sm:leading-none"
              >
                Cybersecurity <br className="hidden sm:inline" />
                <span className="text-[#00ff88] drop-shadow-[0_0_15px_rgba(0,255,136,0.15)] inline-block sm:inline">Made Simple</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xs sm:text-base md:text-lg text-zinc-400 leading-relaxed font-sans max-w-2xl mx-auto lg:mx-0 px-1 sm:px-0"
              >
                Learn how cyber threats work, understand online security risks, and explore interactive cybersecurity tools designed for students, developers, and curious learners.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-7 sm:pt-8 w-full max-w-xs sm:max-w-md mx-auto lg:mx-0"
            >
              <div className="relative w-full sm:w-auto inline-flex flex-col items-center sm:items-start">
                {/* Premium EXCLUSIVE Callout Card */}
                <div className="absolute -top-6 right-2 sm:right-auto sm:left-4 z-10 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#060d08] border border-[#00ff88]/40 shadow-[0_0_12px_rgba(0,255,136,0.18)] backdrop-blur-md">
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-widest text-[#00ff88] uppercase select-none whitespace-nowrap">
                    EXCLUSIVE
                  </span>
                  {/* Subtle clean pointer arrow positioned at the left corner of the callout card */}
                  <span className="absolute -bottom-1 left-3 w-1.5 h-1.5 bg-[#060d08] border-r border-b border-[#00ff88]/40 rotate-45"></span>
                </div>

                <button
                  onClick={() => {
                    playSynthBeep('click');
                    onNavigate('map');
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-2.5 py-3 sm:py-3.5 px-4 sm:px-6 font-brand font-bold text-xs sm:text-sm uppercase tracking-wider bg-[#00ff88] text-black hover:bg-[#00e67a] shadow-[0_0_15px_rgba(0,255,136,0.2)] hover:shadow-[0_0_25px_rgba(0,255,136,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] transition-all duration-200 rounded-lg cursor-pointer select-none whitespace-nowrap"
                >
                  <span className="whitespace-nowrap">Explore Threat Map</span>
                  <Globe className="w-4 h-4 text-black shrink-0" />
                </button>
              </div>

              <button
                onClick={() => {
                  playSynthBeep('click');
                  onNavigate('learn');
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-2.5 py-3 sm:py-3.5 px-4 sm:px-6 font-brand font-bold text-xs sm:text-sm uppercase tracking-wider border border-[#00ff88]/25 bg-white/[0.02] text-[#00ff88] hover:bg-[#00ff88]/10 hover:border-[#00ff88]/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] transition-all duration-200 rounded-lg cursor-pointer select-none whitespace-nowrap"
              >
                <span className="whitespace-nowrap">Start Learning</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </motion.div>
          </div>

          {/* Right Clean Visual Column */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <div className="relative w-full h-[320px] rounded-2xl border border-white/[0.08] bg-white/[0.01] p-6 flex flex-col justify-between overflow-hidden shadow-[0_0_30px_rgba(0,255,136,0.02)]">
              <style>{`
                @keyframes dash {
                  to {
                    stroke-dashoffset: -20;
                  }
                }
                @keyframes hubGlow {
                  0%, 100% {
                    box-shadow: 0 0 15px rgba(0, 255, 136, 0.15);
                    border-color: rgba(0, 255, 136, 0.3);
                  }
                  50% {
                    box-shadow: 0 0 30px rgba(0, 255, 136, 0.35);
                    border-color: rgba(0, 255, 136, 0.6);
                  }
                }
                @keyframes floatSlow {
                  0%, 100% {
                    transform: translateY(0px);
                  }
                  50% {
                    transform: translateY(-4px);
                  }
                }
              `}</style>
              
              {/* Decorative nodes */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.03),transparent_70%)] pointer-events-none" />
              
              {/* Decorative Window dots (top left) */}
              <div className="flex items-center gap-2 pb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#00ff88]/20" />
              </div>

              {/* Diagram Canvas */}
              <div className="flex-1 relative w-full h-full min-h-[220px]">
                {/* SVG Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="18%" y1="18%" x2="50%" y2="50%" stroke="rgba(0, 255, 136, 0.12)" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: 'dash 15s linear infinite' }} />
                  <line x1="82%" y1="18%" x2="50%" y2="50%" stroke="rgba(0, 255, 136, 0.12)" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: 'dash 15s linear infinite' }} />
                  <line x1="85%" y1="50%" x2="50%" y2="50%" stroke="rgba(0, 255, 136, 0.12)" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: 'dash 15s linear infinite' }} />
                  <line x1="82%" y1="82%" x2="50%" y2="50%" stroke="rgba(0, 255, 136, 0.12)" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: 'dash 15s linear infinite' }} />
                  <line x1="18%" y1="82%" x2="50%" y2="50%" stroke="rgba(0, 255, 136, 0.12)" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: 'dash 15s linear infinite' }} />
                </svg>

                {/* Central Hub: Security Enabled */}
                <div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 z-10"
                >
                  <div 
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#00ff88]/30 bg-black flex items-center justify-center relative overflow-hidden shadow-lg shadow-[#00ff88]/20"
                    style={{ animation: 'hubGlow 3s ease-in-out infinite' }}
                  >
                    <div className="absolute inset-0 rounded-full border border-[#00ff88]/20 animate-ping opacity-20 pointer-events-none" />
                    <KernelAxisLogo className="w-full h-full object-contain p-1 rounded-full bg-black" />
                  </div>
                  <span className="px-2.5 py-0.5 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider text-[#00ff88] whitespace-nowrap shadow-sm shadow-black/40">
                    Security Enabled
                  </span>
                </div>

                {/* Peripheral Node 1: Secure Connection */}
                <div 
                  className="absolute left-[2%] top-[6%] flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.02] border border-white/[0.06] rounded-full text-[9px] font-mono text-white/80 hover:border-[#00ff88]/30 hover:bg-[#00ff88]/5 transition-all shadow-sm shadow-black/20 backdrop-blur-sm group cursor-default"
                  style={{ animation: 'floatSlow 4s ease-in-out infinite' }}
                >
                  <Lock className="w-3 h-3 text-[#00ff88]/80 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-white transition-colors">Secure Connection</span>
                </div>

                {/* Peripheral Node 2: Encrypted Traffic */}
                <div 
                  className="absolute right-[2%] top-[6%] flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.02] border border-white/[0.06] rounded-full text-[9px] font-mono text-white/80 hover:border-[#00ff88]/30 hover:bg-[#00ff88]/5 transition-all shadow-sm shadow-black/20 backdrop-blur-sm group cursor-default"
                  style={{ animation: 'floatSlow 4s ease-in-out infinite 1s' }}
                >
                  <Key className="w-3 h-3 text-[#00ff88]/80 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-white transition-colors">Encrypted Traffic</span>
                </div>

                {/* Peripheral Node 3: Active Session */}
                <div 
                  className="absolute right-[0%] top-[48%] -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.02] border border-white/[0.06] rounded-full text-[9px] font-mono text-white/80 hover:border-[#00ff88]/30 hover:bg-[#00ff88]/5 transition-all shadow-sm shadow-black/20 backdrop-blur-sm group cursor-default"
                  style={{ animation: 'floatSlow 4s ease-in-out infinite 2s' }}
                >
                  <Activity className="w-3 h-3 text-[#00ff88]/80 group-hover:scale-110 transition-transform animate-pulse" />
                  <span className="group-hover:text-white transition-colors">Active Session</span>
                </div>

                {/* Peripheral Node 4: Protected Access */}
                <div 
                  className="absolute right-[2%] bottom-[6%] flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.02] border border-white/[0.06] rounded-full text-[9px] font-mono text-white/80 hover:border-[#00ff88]/30 hover:bg-[#00ff88]/5 transition-all shadow-sm shadow-black/20 backdrop-blur-sm group cursor-default"
                  style={{ animation: 'floatSlow 4s ease-in-out infinite 1.5s' }}
                >
                  <Database className="w-3 h-3 text-[#00ff88]/80 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-white transition-colors">Protected Access</span>
                </div>

                {/* Peripheral Node 5: Safe Browsing */}
                <div 
                  className="absolute left-[2%] bottom-[6%] flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.02] border border-white/[0.06] rounded-full text-[9px] font-mono text-white/80 hover:border-[#00ff88]/30 hover:bg-[#00ff88]/5 transition-all shadow-sm shadow-black/20 backdrop-blur-sm group cursor-default"
                  style={{ animation: 'floatSlow 4s ease-in-out infinite 0.5s' }}
                >
                  <Globe className="w-3 h-3 text-[#00ff88]/80 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-white transition-colors">Safe Browsing</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2 — ABOUT KERNEL AXIS */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-16">
        <div className="max-w-4xl mx-auto text-center space-y-3.5 sm:space-y-6">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#00ff88]/80 block">
            ABOUT KERNEL AXIS
          </span>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight leading-snug sm:leading-tight px-1 sm:px-0">
            Making Cybersecurity Easier to Understand
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-zinc-400 leading-relaxed font-sans max-w-2xl mx-auto px-1 sm:px-0 pt-0.5 sm:pt-1">
            Kernel Axis offers an interactive cybersecurity learning experience through immersive visuals, practical scenarios, and hands-on exploration, helping users understand modern threats, defensive strategies, and digital resilience in a clear, engaging way that makes cybersecurity easier to grasp.
          </p>
        </div>
      </section>

      {/* SECTION 3 — CYBER QUESTION */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#00ff88]/80 block">
            TEST YOUR KNOWLEDGE
          </span>
          <h2 className="text-xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
            Cyber Question
          </h2>
          <div className="w-8 h-[2px] bg-[#00ff88] mx-auto mt-2 rounded-full" />
        </div>

        <CyberQuestionCard
          key={currentQuestion.id}
          category={currentQuestion.category}
          difficulty={currentQuestion.difficulty}
          question={currentQuestion.question}
          options={currentQuestion.options}
          explanation={currentQuestion.explanation}
          showMoreButton={true}
          onNavigateMore={() => {
            playSynthBeep('click');
            navigate('/questions');
          }}
        />
      </section>

      {/* VIRAL FEATURE: KERNEL VIRTUAL ID BADGE CALLOUT */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-[#00ff88]/30 bg-gradient-to-r from-[#030906] via-[#051109] to-[#020504] p-6 sm:p-10 shadow-2xl shadow-[#00ff88]/10 group">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00ff88]/15 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00ff88]/25 transition-all duration-500" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#00ff88]">
                <Fingerprint className="w-3.5 h-3.5 text-[#00ff88]" />
                Official Operator Credentials
              </div>

              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
                Claim Your <span className="text-[#00ff88]">Kernel ID</span> Pass
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed font-sans">
                Forge your unique cyber security operator badge with custom clearance credentials, tactical discipline, and photo. 100% free virtual download in high-resolution PNG format.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
                <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.08]">
                  Zero Server Tracking
                </span>
                <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.04] px-2.5 py-1 rounded-md border border-white/[0.08]">
                  Print-Ready HD PNG
                </span>
                <span className="text-[10px] font-mono text-[#00ff88] bg-[#00ff88]/10 px-2.5 py-1 rounded-md border border-[#00ff88]/20">
                  Instant Access
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={() => {
                  playSynthBeep('click');
                  navigate('/kernel-id');
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 py-3.5 px-6 font-brand font-bold text-xs sm:text-sm uppercase tracking-wider bg-[#00ff88] text-black hover:bg-[#00e67a] shadow-[0_0_20px_rgba(0,255,136,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] transition-all rounded-xl cursor-pointer whitespace-nowrap"
              >
                <span>Forge Your Badge</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHY CYBERSECURITY MATTERS */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-transparent to-[#030705] border-y border-[#00ff88]/5">
        <div className="max-w-[1536px] mx-auto">
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
              Why Cybersecurity Matters
            </h2>
            <div className="w-8 h-[2px] bg-[#00ff88] mx-auto mt-2 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreReasons.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 bg-white/[0.01] border border-white/[0.06] hover:bg-white/[0.02] hover:border-[#00ff88]/25 hover:-translate-y-0.5 transition-all duration-300 rounded-xl space-y-3 group"
              >
                <div className="p-2 bg-[#00ff88]/5 group-hover:bg-[#00ff88]/10 rounded-lg inline-block text-[#00ff88] transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider group-hover:text-[#00ff88] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — COMMON SECURITY MYTHS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1536px] mx-auto">
        <div className="text-center space-y-2 mb-12">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#00ff88]/60">
            Debunking Misconceptions
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">
            Common Security Myths
          </h2>
          <div className="w-8 h-[2px] bg-[#00ff88] mx-auto mt-2 rounded-full" />
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed font-sans pt-2">
            Some of the most common cybersecurity beliefs are actually misconceptions. Understanding the facts can help you stay safer online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Myth 1 */}
          <div className="relative overflow-hidden p-6 sm:p-8 bg-zinc-950/40 border border-white/[0.06] hover:border-[#00ff88]/30 hover:shadow-[0_0_30px_rgba(0,255,136,0.03)] transition-all duration-300 rounded-2xl flex flex-col justify-between h-full group">
            {/* Ambient subtle light leak on hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/[0.01] rounded-full blur-3xl group-hover:bg-[#00ff88]/[0.03] transition-all duration-500 pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-rose-500/80 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                  Myth #1
                </span>
                <span className="text-rose-500/20 text-2xl font-display font-bold select-none opacity-40 group-hover:opacity-60 transition-all duration-300">❌</span>
              </div>
              <h3 className="text-xs xs:text-sm sm:text-base md:text-lg font-display font-bold text-zinc-100 tracking-tight leading-snug whitespace-nowrap md:whitespace-normal xl:whitespace-nowrap">
                "My account is too small to be targeted."
              </h3>
            </div>

            {/* Subtle Divider / Transition Element */}
            <div className="py-6 relative flex items-center justify-center">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
              <div className="absolute p-1 bg-zinc-900 border border-white/[0.08] rounded-full text-zinc-500 group-hover:text-[#00ff88] group-hover:border-[#00ff88]/30 transition-all duration-300">
                <ArrowDown className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-mono text-[#00ff88]/80 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]/80 animate-pulse" />
                Reality Fact
              </span>
              <p className="text-xs sm:text-sm font-sans text-zinc-400 leading-relaxed">
                Any online account can become a target if basic security practices are ignored.
              </p>
            </div>
          </div>

          {/* Myth 2 */}
          <div className="relative overflow-hidden p-6 sm:p-8 bg-zinc-950/40 border border-white/[0.06] hover:border-[#00ff88]/30 hover:shadow-[0_0_30px_rgba(0,255,136,0.03)] transition-all duration-300 rounded-2xl flex flex-col justify-between h-full group">
            {/* Ambient subtle light leak on hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/[0.01] rounded-full blur-3xl group-hover:bg-[#00ff88]/[0.03] transition-all duration-500 pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-rose-500/80 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                  Myth #2
                </span>
                <span className="text-rose-500/20 text-2xl font-display font-bold select-none opacity-40 group-hover:opacity-60 transition-all duration-300">❌</span>
              </div>
              <h3 className="text-xs xs:text-sm sm:text-base md:text-lg font-display font-bold text-zinc-100 tracking-tight leading-snug">
                "Antivirus protects me from everything."
              </h3>
            </div>

            {/* Subtle Divider / Transition Element */}
            <div className="py-6 relative flex items-center justify-center">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
              <div className="absolute p-1 bg-zinc-900 border border-white/[0.08] rounded-full text-zinc-500 group-hover:text-[#00ff88] group-hover:border-[#00ff88]/30 transition-all duration-300">
                <ArrowDown className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-mono text-[#00ff88]/80 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]/80 animate-pulse" />
                Reality Fact
              </span>
              <p className="text-xs sm:text-sm font-sans text-zinc-400 leading-relaxed">
                Security software helps, but safe browsing habits and strong passwords are equally important.
              </p>
            </div>
          </div>

          {/* Myth 3 */}
          <div className="relative overflow-hidden p-6 sm:p-8 bg-zinc-950/40 border border-white/[0.06] hover:border-[#00ff88]/30 hover:shadow-[0_0_30px_rgba(0,255,136,0.03)] transition-all duration-300 rounded-2xl flex flex-col justify-between h-full group">
            {/* Ambient subtle light leak on hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/[0.01] rounded-full blur-3xl group-hover:bg-[#00ff88]/[0.03] transition-all duration-500 pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-rose-500/80 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                  Myth #3
                </span>
                <span className="text-rose-500/20 text-2xl font-display font-bold select-none opacity-40 group-hover:opacity-60 transition-all duration-300">❌</span>
              </div>
              <h3 className="text-xs xs:text-sm sm:text-base md:text-lg font-display font-bold text-zinc-100 tracking-tight leading-snug">
                "Public Wi-Fi is always safe."
              </h3>
            </div>

            {/* Subtle Divider / Transition Element */}
            <div className="py-6 relative flex items-center justify-center">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
              <div className="absolute p-1 bg-zinc-900 border border-white/[0.08] rounded-full text-zinc-500 group-hover:text-[#00ff88] group-hover:border-[#00ff88]/30 transition-all duration-300">
                <ArrowDown className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-mono text-[#00ff88]/80 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]/80 animate-pulse" />
                Reality Fact
              </span>
              <p className="text-xs sm:text-sm font-sans text-zinc-400 leading-relaxed">
                Public networks should be treated carefully, especially when accessing sensitive accounts.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-10">
          <button
            onClick={() => {
              playSynthBeep('click');
              onNavigate('learn');
            }}
            className="inline-flex items-center gap-2 py-3 px-6 font-display font-bold text-xs uppercase tracking-widest bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] hover:bg-[#00ff88]/20 rounded-lg transition-all cursor-pointer group"
          >
            Explore Security Guides
            <BookOpen className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>

    </div>
  );
};
