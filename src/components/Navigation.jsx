import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Play, ArrowUpRight } from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'work', label: 'PROJECTS' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'certifications', label: 'CERTIFICATES' },
  { id: 'ai-focus', label: 'AI FOCUS' },
  { id: 'contact', label: 'CONTACT' },
];

export default function Navigation({ onReplayIntro }) {
  const [activeId, setActiveId] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveId(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#080808]/85 backdrop-blur-md border-b border-white/[0.08] py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          
          {/* Logo / Identity */}
          <button
            onClick={() => scrollTo('hero')}
            className="group flex items-center gap-2.5 font-mono text-xs tracking-[0.25em] font-bold text-[#F5F3EF] hover:text-[#FF941F] transition-colors uppercase cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF941F] group-hover:scale-125 transition-transform" />
            <span>BHARATH KULAL</span>
            <span className="text-[#929292] font-normal text-[10px] hidden sm:inline-block">/ 2026</span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wider">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative py-1 transition-colors uppercase cursor-pointer ${
                    isActive ? 'text-[#FF941F] font-semibold' : 'text-[#929292] hover:text-[#F5F3EF]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF941F] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Replay Intro + Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                title="Replay Cinematic Intro"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#FF941F]/50 bg-white/[0.02] hover:bg-[#FF941F]/10 font-mono text-[10px] text-[#929292] hover:text-[#FF941F] transition-all cursor-pointer uppercase tracking-wider"
              >
                <Play size={10} className="fill-current" />
                <span>Intro</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 text-[#F5F3EF] hover:text-[#FF941F] rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm cursor-pointer"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[65px] z-40 bg-[#080808]/95 backdrop-blur-xl border-b border-white/[0.1] px-6 py-8 flex flex-col gap-5 md:hidden"
          >
            <div className="font-mono text-[10px] tracking-widest uppercase text-[#FF941F] mb-1">
              NAVIGATION
            </div>
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center justify-between text-left font-mono text-sm uppercase py-2 border-b border-white/[0.04] transition-colors ${
                    isActive ? 'text-[#FF941F] font-bold' : 'text-[#F5F3EF]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF941F]" />
                  ) : (
                    <ArrowUpRight size={14} className="text-[#929292]" />
                  )}
                </button>
              );
            })}

            {onReplayIntro && (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onReplayIntro();
                }}
                className="mt-3 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#FF941F]/40 bg-[#FF941F]/10 font-mono text-xs text-[#FF941F] uppercase tracking-wider"
              >
                <Play size={12} className="fill-current" />
                <span>REPLAY INTRO SEQUENCE</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

