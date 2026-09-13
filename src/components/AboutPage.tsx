import React from 'react';
import { Shield, BookOpen, Target, Sparkles, Heart, Compass, CheckCircle2 } from 'lucide-react';
import { KernelAxisLogo } from './KernelAxisLogo';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* 1. ABOUT KERNEL AXIS */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff88]/5 border border-[#00ff88]/15 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#00ff88]/80">
          <KernelAxisLogo className="w-4 h-4" />
          Who We Are
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
          About Kernel Axis
        </h1>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
          Kernel Axis is an educational project focused on helping people understand cybersecurity in a simple and practical way. We want to take the mystery out of digital safety so you can browse, shop, and communicate online with complete confidence.
        </p>
      </div>

      {/* 2. OUR MISSION & 3. LEARN THROUGH EXPLORATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="p-6 bg-white/[0.01] border border-white/[0.06] rounded-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00ff88]/5 border border-[#00ff88]/15 rounded-lg text-[#00ff88]">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-base font-display font-bold text-white uppercase tracking-wider">
              Our Mission
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            Many cybersecurity topics feel confusing or overly technical. Kernel Axis aims to make these topics easier to understand through beginner-friendly guides and educational content. We believe digital safety should be accessible to everyone, regardless of their technical background.
          </p>
        </div>

        <div className="p-6 bg-white/[0.01] border border-white/[0.06] rounded-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00ff88]/5 border border-[#00ff88]/15 rounded-lg text-[#00ff88]">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-base font-display font-bold text-white uppercase tracking-wider">
              Learn Through Exploration
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
            We believe that visualizing ideas makes them much easier to grasp. In addition to our articles, we have built interactive tools like our Threat Map. Please note that this map is an educational visualization designed to show how basic communication and security concepts work in a simplified simulation, without any real-world threats or risks.
          </p>
        </div>
      </div>

      {/* 4. WHAT YOU'LL FIND HERE & 5. OUR APPROACH */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        
        {/* WHAT YOU'LL FIND HERE */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00ff88]/5 border border-[#00ff88]/15 rounded-lg text-[#00ff88]">
              <BookOpen className="w-5 h-5" />
            </div>
            <h2 className="text-base font-display font-bold text-white uppercase tracking-wider">
              What You'll Find Here
            </h2>
          </div>
          <div className="space-y-3 pl-2">
            <div className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wide">Cybersecurity Guides</h4>
                <p className="text-xs text-zinc-400">Simple, step-by-step articles that break down how modern technology keeps you secure.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wide">Online Safety Tips</h4>
                <p className="text-xs text-zinc-400">Easy-to-follow, daily habits that prevent common online tricks and secure your logins.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wide">Privacy Awareness Content</h4>
                <p className="text-xs text-zinc-400">Clear explanations of how your private data is handled online and how you can protect it.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wide">Interactive Learning Tools</h4>
                <p className="text-xs text-zinc-400">Friendly visual demonstrations to help you learn safety concepts in a dynamic way.</p>
              </div>
            </div>
          </div>
        </div>

        {/* OUR APPROACH */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00ff88]/5 border border-[#00ff88]/15 rounded-lg text-[#00ff88]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-base font-display font-bold text-white uppercase tracking-wider">
              Our Approach
            </h2>
          </div>
          <div className="space-y-3 pl-2">
            <div className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wide">Clear Explanations</h4>
                <p className="text-xs text-zinc-400">We write in straightforward, friendly language, avoiding unnecessary jargon and scary tech buzzwords.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wide">Practical Advice</h4>
                <p className="text-xs text-zinc-400">We focus on actionable, real-world habits that you can start using today to secure your accounts.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wide">Accurate Information</h4>
                <p className="text-xs text-zinc-400">Our guides are factually accurate, offering real, objective security practices without exaggerating threats.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#00ff88] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wide">Beginner-Friendly Learning</h4>
                <p className="text-xs text-zinc-400">We welcome everyone. No previous technology or security background is required to get started here.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 6. CLOSING STATEMENT */}
      <div className="p-6 bg-[#00ff88]/5 border border-[#00ff88]/15 rounded-2xl text-center space-y-3 pt-8">
        <Heart className="w-6 h-6 text-[#00ff88] mx-auto animate-pulse" />
        <p className="text-sm sm:text-base text-zinc-200 font-sans leading-relaxed max-w-xl mx-auto">
          "Whether you're a student, a developer, or simply someone who wants to stay safer online, Kernel Axis is here to help you understand cybersecurity with confidence."
        </p>
      </div>

    </div>
  );
};
