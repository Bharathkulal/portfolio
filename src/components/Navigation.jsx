import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Cpu, Terminal, Sparkles, Send } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'Overview', target: '#hero', icon: Home, shortLabel: 'Home' },
  { label: 'About', target: '#about', icon: User, shortLabel: 'About' },
  { label: 'Skills', target: '#skills', icon: Cpu, shortLabel: 'Skills' },
  { label: 'Work', target: '#projects', icon: Terminal, shortLabel: 'Work' },
  { label: 'AI Focus', target: '#ai-focus', icon: Sparkles, shortLabel: 'AI' },
  { label: 'Contact', target: '#contact', icon: Send, shortLabel: 'Contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('#hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section tracker logic
      const scrollPos = window.scrollY + 240;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const link = navLinks[i];
        const el = document.querySelector(link.target);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(link.target);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, target) => {
    e.preventDefault();
    setActiveSection(target);
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* DESKTOP FLOATING NAVBAR (md and above) */}
      {/* ========================================================================= */}
      <motion.header 
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
        className={`hidden md:block fixed top-6 left-0 right-0 mx-auto w-[90%] max-w-4xl z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-brand-card/80 backdrop-blur-md border border-brand-border/80 py-3 px-6 rounded-full shadow-lg shadow-black/10' 
            : 'bg-brand-card/30 backdrop-blur-sm border border-brand-border/40 py-4 px-6 rounded-full'
        }`}
      >
        <div className="flex justify-between items-center">
          <a 
            href="#hero" 
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="font-mono text-sm font-bold tracking-widest text-brand-textPrimary flex items-center gap-2 hover:opacity-85 transition-opacity"
          >
            <span>B.KULAL</span>
            <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
          </a>

          {/* Desktop Links and Theme Toggle */}
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => {
                const active = activeSection === link.target;
                return (
                  <a
                    key={link.target}
                    href={link.target}
                    onClick={(e) => handleLinkClick(e, link.target)}
                    className={`text-xs font-mono tracking-wider transition-colors relative py-1 px-1.5 ${
                      active ? 'text-brand-accent font-semibold' : 'text-brand-textSecondary hover:text-brand-textPrimary'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span 
                        layoutId="desktopActiveIndicator"
                        className="absolute -bottom-1 left-0 right-0 mx-auto w-full h-[2px] bg-brand-accent rounded-full shadow-[0_0_6px_rgba(0,255,136,0.6)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>
            <div className="w-px h-4 bg-brand-border" />
            <ThemeToggle />
          </div>
        </div>
      </motion.header>

      {/* ========================================================================= */}
      {/* MOBILE TOP BAR (0px - 767px) - Compact and Clean */}
      {/* ========================================================================= */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="md:hidden fixed top-0 inset-x-0 z-40 bg-brand-bg/90 backdrop-blur-md border-b border-brand-border/60 px-5 py-3.5 flex items-center justify-between"
      >
        <a 
          href="#hero" 
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="font-mono text-sm font-bold tracking-widest text-brand-textPrimary flex items-center gap-2"
        >
          <span>B.KULAL</span>
          <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
        </a>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </motion.header>

      {/* ========================================================================= */}
      {/* MOBILE PREMIUM BOTTOM NAVIGATION (0px - 767px) - Native App Style */}
      {/* ========================================================================= */}
      <nav 
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-3 inset-x-3 z-40 max-w-md mx-auto"
      >
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          className="bg-brand-card/95 backdrop-blur-xl border border-brand-border/80 dark:border-brand-border/40 rounded-2xl p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] flex items-center justify-between"
        >
          {navLinks.map((link) => {
            const active = activeSection === link.target;
            const Icon = link.icon;

            return (
              <motion.a
                key={link.target}
                href={link.target}
                onClick={(e) => handleLinkClick(e, link.target)}
                whileTap={{ scale: 0.90 }}
                className={`relative flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-colors flex-1 min-w-[50px] ${
                  active ? 'text-brand-accent' : 'text-brand-textSecondary hover:text-brand-textPrimary'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute inset-0 bg-brand-accent/15 border border-brand-accent/30 rounded-xl"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                
                <Icon size={18} className={`relative z-10 transition-transform duration-200 ${active ? 'scale-110' : ''}`} />
                <span className={`relative z-10 font-mono text-[9px] mt-0.5 tracking-wider font-medium ${active ? 'font-bold' : ''}`}>
                  {link.shortLabel}
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </nav>
    </>
  );
}
