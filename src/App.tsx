/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { LearnPage } from './components/LearnPage';
import { ToolsPage } from './components/ToolsPage';
import { PasswordCheckerPage } from './components/PasswordCheckerPage';
import { PasswordGeneratorPage } from './components/PasswordGeneratorPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { CyberDashboard } from './components/CyberDashboard';
import { ThreatGlobe } from './components/ThreatGlobe';
import { LiveMonitor } from './components/LiveMonitor';
import { ThreatMapDisclaimer } from './components/ThreatMapDisclaimer';
import { ThreatLog } from './types';
import { Shield, Home, BookOpen, Globe, Award, Mail, FileText, Menu, X, ShieldCheck } from 'lucide-react';
import { KernelAxisLogo } from './components/KernelAxisLogo';
import { playSynthBeep } from './lib/audio';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

type ViewState = 'home' | 'learn' | 'tools' | 'map' | 'about' | 'contact' | 'privacy' | 'terms';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [globeLaunched, setGlobeLaunched] = useState(false);
  const [logs, setLogs] = useState<ThreatLog[]>([]);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [isRotating, setIsRotating] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Map paths to active view keys for backward compatibility with navigation layout highlights
  const getActiveView = (path: string): ViewState => {
    if (path.startsWith('/learn')) return 'learn';
    if (path.startsWith('/tools')) return 'tools';
    if (path === '/map') return 'map';
    if (path === '/about') return 'about';
    if (path === '/contact') return 'contact';
    if (path === '/privacy') return 'privacy';
    if (path === '/terms-and-conditions') return 'terms';
    return 'home';
  };

  const activeView = getActiveView(location.pathname);

  // Auto-launch globe when on /map route
  useEffect(() => {
    if (location.pathname === '/map') {
      setGlobeLaunched(true);
    }
  }, [location.pathname]);

  // Global Scroll to Top Effect for View Transitions
  useEffect(() => {
    const scrollToTop = () => {
      try {
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.documentElement.scrollTo({ top: 0, behavior: 'instant' });
        document.body.scrollTo({ top: 0, behavior: 'instant' });
        
        const root = document.getElementById('app-root-container');
        if (root) {
          root.scrollTo({ top: 0, behavior: 'instant' });
          root.scrollTop = 0;
        }
      } catch (err) {
        console.warn('Scroll to top failed:', err);
      }
    };

    scrollToTop();
    const timer = setTimeout(scrollToTop, 50);
    const timer2 = setTimeout(scrollToTop, 150);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [location.pathname]);

  // Global SEO Meta Tags for non-learn pages
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/learn')) {
      // Handled by LearnPage component
      return;
    }

    let title = 'Kernel Axis | Learn Cybersecurity';
    let description = 'Learn how cyber threats work, understand online security risks, and explore interactive tools designed for students, developers, and curious learners.';
    let url = window.location.href;

    if (path === '/map') {
      title = 'Threat Map | Kernel Axis';
      description = 'Explore our interactive threat map simulation to visualize real-time digital threats and defensive mitigations.';
    } else if (path.startsWith('/tools/password-strength-checker')) {
      title = 'Password Strength Checker | Kernel Axis';
      description = 'Analyze password strength locally in your browser and receive instant feedback on password security, complexity, and overall strength.';
    } else if (path.startsWith('/tools/password-generator')) {
      title = 'Secure Password Generator | Kernel Axis';
      description = 'Generate strong, unique passwords and passphrases locally in your browser to improve account security and eliminate password reuse.';
    } else if (path.startsWith('/tools')) {
      title = 'Cybersecurity Tools | Kernel Axis';
      description = 'Practical security utilities designed to help users improve their digital safety through interactive learning experiences.';
    } else if (path === '/about') {
      title = 'About Us | Kernel Axis';
      description = 'Discover the educational mission behind Kernel Axis and our team of cybersecurity educators.';
    } else if (path === '/contact') {
      title = 'Contact Us | Kernel Axis';
      description = 'Get in touch with the Kernel Axis team for educational inquiries or feedback.';
    } else if (path === '/privacy') {
      title = 'Privacy Policy | Kernel Axis';
      description = 'Read our privacy policy and data tracking details.';
    } else if (path === '/terms-and-conditions') {
      title = 'Terms & Conditions | Kernel Axis';
      description = 'Read our terms and conditions for using the platform.';
    }

    // Update document title
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Update Open Graph tags
    const ogTags = {
      'og:title': title,
      'og:description': description,
      'og:url': url,
      'og:type': 'website',
      'og:site_name': 'Kernel Axis',
      'og:image': 'https://res.cloudinary.com/dc0hquoqv/image/upload/v1785232589/njhiczg65kcqrmim6yj8.png'
    };

    Object.entries(ogTags).forEach(([property, value]) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    });
  }, [location.pathname]);

  // Launch Live Globe Viz handler
  const handleLaunchGlobe = () => {
    setGlobeLaunched(true);
  };

  // Add new real-time log from map attack triggers
  const handleAttackTriggered = (source: string, target: string) => {
    const severities: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high', 'critical'];
    const messages = [
      'Threat vector intercepted before reaching node target.',
      'Malicious buffer overflow payload neutralized.',
      'Attack handshake redirected to container sandbox.',
      'DDoS packet infiltration attempt blocked by security group.',
      'Firewall active state mitigation protocol engaged.',
      'Suspicious ingress traffic isolated at DMZ level.',
      'Unauthorized SSH access query rejected.',
      'Active defense system integrity shield engaged.'
    ];

    const generateIP = () => {
      return `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    };

    const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const newLog: ThreatLog = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      source,
      target,
      message: randomMessage,
      timestamp: time,
      severity: randomSeverity,
      ipSource: generateIP(),
      ipTarget: generateIP()
    };

    setLogs((prev) => {
      // Limit list to last 60 entries for smooth UI rendering performance
      const kept = prev.slice(-59);
      return [...kept, newLog];
    });
  };

  // Filter logs for the LiveMonitor component
  const filteredLogs = logs.filter((log) => {
    if (severityFilter === 'critical') return log.severity === 'critical';
    if (severityFilter === 'high') return log.severity === 'high' || log.severity === 'critical';
    if (severityFilter === 'medium') return log.severity === 'medium' || log.severity === 'high' || log.severity === 'critical';
    return true;
  });

  const handleNavigate = (view: ViewState) => {
    playSynthBeep('click');
    setMobileMenuOpen(false);
    if (view === 'home') navigate('/');
    else if (view === 'learn') navigate('/learn');
    else if (view === 'tools') navigate('/tools');
    else if (view === 'map') {
      setGlobeLaunched(true);
      navigate('/map');
    }
    else if (view === 'about') navigate('/about');
    else if (view === 'contact') navigate('/contact');
    else if (view === 'privacy') navigate('/privacy');
    else if (view === 'terms') navigate('/terms-and-conditions');
  };

  const navLinks: { id: ViewState; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'learn', label: 'Learn', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'tools', label: 'Tools', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: 'map', label: 'Threat Map', icon: <Globe className="w-3.5 h-3.5" /> },
  ];

  return (
    <div id="app-root-container" className={`relative min-h-screen w-full bg-[#020504] text-zinc-300 font-sans flex flex-col justify-between ${activeView === 'map' ? 'overflow-hidden h-screen' : 'overflow-y-auto'}`}>
      
      {/* GLOBAL HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-40 w-full bg-[#020504]/90 backdrop-blur-md border-b border-[#00ff88]/10 px-4 sm:px-6 lg:px-8 py-4 shrink-0">
        <div className="max-w-[1536px] mx-auto flex items-center justify-between">
          <div 
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity select-none"
            id="brand-logo"
          >
            <KernelAxisLogo className="w-8 h-8 sm:w-9 sm:h-9" />
            <span className="font-brand font-semibold text-sm sm:text-base text-white tracking-wider uppercase whitespace-nowrap">
              Kernel Axis
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 sm:gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-display font-semibold text-[10px] sm:text-xs uppercase tracking-widest transition-all duration-200 rounded-lg cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${
                  activeView === link.id
                    ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 shadow-sm shadow-[#00ff88]/10'
                    : 'text-[#00ff88]/60 hover:text-[#00ff88] border border-transparent hover:bg-[#00ff88]/5'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => {
              playSynthBeep('click');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="flex md:hidden items-center justify-center p-2 rounded-lg text-[#00ff88]/70 hover:text-[#00ff88] hover:bg-[#00ff88]/10 border border-[#00ff88]/10 transition-all focus:outline-none focus:ring-1 focus:ring-[#00ff88]/30 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-[#020504]/95 border-t border-[#00ff88]/10 mt-4 -mx-6 px-6 py-4 space-y-3"
            >
              <div className="flex flex-col gap-1.5">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavigate(link.id)}
                    className={`flex items-center gap-3 w-full px-4 py-3.5 font-display font-semibold text-xs uppercase tracking-widest transition-all duration-200 rounded-lg text-left cursor-pointer ${
                      activeView === link.id
                        ? 'bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30'
                        : 'text-zinc-400 hover:text-[#00ff88] hover:bg-[#00ff88]/5 border border-transparent'
                    }`}
                  >
                    <span className="text-[#00ff88]/80">{link.icon}</span>
                    <span>{link.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* PRIMARY TRANSITIONAL VIEWPORT */}
      <main className={`w-full flex-grow relative ${activeView === 'map' ? 'h-full overflow-hidden' : ''}`}>
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={
              <motion.div
                key="home-page"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <HomePage onNavigate={handleNavigate} />
              </motion.div>
            } />

            <Route path="/learn" element={
              <motion.div
                key="learn-page"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <LearnPage />
              </motion.div>
            } />

            <Route path="/learn/category/:catSlug" element={
              <motion.div
                key={`learn-cat-${location.pathname}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <LearnPage />
              </motion.div>
            } />

            <Route path="/learn/:catSlug/:articleSlug" element={
              <motion.div
                key={`learn-art-${location.pathname}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <LearnPage />
              </motion.div>
            } />

            <Route path="/learn/:articleSlug" element={
              <motion.div
                key={`learn-art-single-${location.pathname}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <LearnPage />
              </motion.div>
            } />

            <Route path="/tools" element={
              <motion.div
                key="tools-page"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <ToolsPage />
              </motion.div>
            } />

            <Route path="/tools/password-strength-checker" element={
              <motion.div
                key="password-checker-page"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <PasswordCheckerPage />
              </motion.div>
            } />

            <Route path="/tools/password-generator" element={
              <motion.div
                key="password-generator-page"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <PasswordGeneratorPage />
              </motion.div>
            } />

            <Route path="/about" element={
              <motion.div
                key="about-page"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <AboutPage />
              </motion.div>
            } />

            <Route path="/contact" element={
              <motion.div
                key="contact-page"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <ContactPage />
              </motion.div>
            } />

            <Route path="/privacy" element={
              <motion.div
                key="privacy-page"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <PrivacyPage />
              </motion.div>
            } />

            <Route path="/terms-and-conditions" element={
              <motion.div
                key="terms-page"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <TermsPage />
              </motion.div>
            } />

            <Route path="/map" element={
              <motion.div
                key="map-page"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full absolute inset-0 overflow-hidden"
              >
                {/* CLEAN EDUCATIONAL DISCLAIMER OVERLAY */}
                <ThreatMapDisclaimer onClose={() => {}} />

                {/* 3D GLOBE CONTAINER */}
                {globeLaunched && (
                  <div className="absolute inset-0 w-full h-full z-1">
                    <ThreatGlobe
                      active={isRotating}
                      onAttackTriggered={handleAttackTriggered}
                    />
                  </div>
                )}

                {/* FLOATING CONTROLS & MONITOR */}
                <div className="w-full h-full absolute inset-0 pointer-events-none z-10">
                  {/* Controls Panel */}
                  <div className="pointer-events-auto">
                    <CyberDashboard
                      username="OPERATOR"
                      onLaunchGlobe={handleLaunchGlobe}
                      globeLaunched={globeLaunched}
                      onClearLogs={() => setLogs([])}
                      severityFilter={severityFilter}
                      setSeverityFilter={setSeverityFilter}
                      isRotating={isRotating}
                      setIsRotating={setIsRotating}
                    />
                  </div>

                  {/* Event Monitor Stream */}
                  {globeLaunched && (
                    <div className="pointer-events-auto">
                      <LiveMonitor logs={filteredLogs} />
                    </div>
                  )}
                </div>
              </motion.div>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* GLOBAL FOOTER (Omitted strictly on map-view to maintain simulation bounds) */}
      {activeView !== 'map' && (
        <footer className="bg-[#010302] text-zinc-400 py-6 md:py-12 px-4 sm:px-6 lg:px-8 border-t border-[#00ff88]/10 shrink-0">
          <div className="max-w-[1536px] mx-auto grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-6 md:gap-8">
            
            {/* Branding Statement */}
            <div className="col-span-2 md:col-span-6 space-y-3 md:space-y-4">
              <div 
                onClick={() => handleNavigate('home')}
                className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
              >
                <KernelAxisLogo className="w-6 h-6 sm:w-7 sm:h-7" />
                <span className="font-brand font-semibold text-xs sm:text-sm text-white uppercase tracking-wider">
                  Kernel Axis
                </span>
              </div>
              <p className="text-[10px] font-mono text-zinc-500">
                © 2026 Kernel Axis. All rights reserved.
              </p>
            </div>

            {/* Navigational Links */}
            <div className="col-span-1 md:col-span-3 space-y-2 md:space-y-3">
              <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider">
                Sitemap
              </h4>
              <ul className="space-y-1 md:space-y-2 font-sans text-xs">
                <li>
                  <button onClick={() => handleNavigate('home')} className="text-zinc-400 hover:text-[#00ff88] transition-colors cursor-pointer text-left w-full block py-2 md:py-0.5">Home</button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('learn')} className="text-zinc-400 hover:text-[#00ff88] transition-colors cursor-pointer text-left w-full block py-2 md:py-0.5">Learn</button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('tools')} className="text-zinc-400 hover:text-[#00ff88] transition-colors cursor-pointer text-left w-full block py-2 md:py-0.5">Tools</button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('map')} className="text-zinc-400 hover:text-[#00ff88] transition-colors cursor-pointer text-left w-full block py-2 md:py-0.5">Threat Map</button>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="col-span-1 md:col-span-3 space-y-2 md:space-y-3">
              <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider">
                Resources & Legal
              </h4>
              <ul className="space-y-1 md:space-y-2 font-sans text-xs">
                <li>
                  <button onClick={() => handleNavigate('about')} className="text-zinc-400 hover:text-[#00ff88] transition-colors cursor-pointer text-left w-full block py-2 md:py-0.5">About Us</button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('contact')} className="text-zinc-400 hover:text-[#00ff88] transition-colors cursor-pointer text-left w-full block py-2 md:py-0.5">Contact</button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('privacy')} className="text-zinc-400 hover:text-[#00ff88] transition-colors cursor-pointer text-left w-full block py-2 md:py-0.5">Privacy Policy</button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('terms')} className="text-zinc-400 hover:text-[#00ff88] transition-colors cursor-pointer text-left w-full block py-2 md:py-0.5">Terms & Conditions</button>
                </li>
              </ul>
            </div>

          </div>
        </footer>
      )}

      {/* Vercel Analytics & Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

