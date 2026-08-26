import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Overview', target: '#hero' },
  { label: 'About', target: '#about' },
  { label: 'Skills', target: '#skills' },
  { label: 'Work', target: '#projects' },
  { label: 'AI Focus', target: '#ai-focus' },
  { label: 'Journey', target: '#journey' },
  { label: 'Contact', target: '#contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('#hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Background blur trigger
      setScrolled(window.scrollY > 40);

      // Section tracker logic
      const scrollPos = window.scrollY + 200;
      for (let link of navLinks) {
        const el = document.querySelector(link.target);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(link.target);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, target) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Pill Navigation */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-6 left-0 right-0 mx-auto w-[90%] max-w-4xl z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0f0f13]/70 backdrop-blur-md border border-[#1a1a24] py-3.5 px-6 rounded-full shadow-lg shadow-black/20' 
            : 'bg-transparent py-5 px-4'
        }`}
      >
        <div className="flex justify-between items-center">
          <a 
            href="#hero" 
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="font-mono text-sm font-bold tracking-widest text-brand-textPrimary flex items-center gap-1.5"
          >
            B.KULAL<span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = activeSection === link.target;
              return (
                <a
                  key={link.target}
                  href={link.target}
                  onClick={(e) => handleLinkClick(e, link.target)}
                  className={`text-xs font-mono tracking-wider transition-all relative py-1 ${
                    active ? 'text-brand-accent' : 'text-brand-textSecondary hover:text-brand-textPrimary'
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span 
                      layoutId="activeIndicator"
                      className="absolute -bottom-1.5 left-0 right-0 mx-auto w-1 h-1 bg-brand-accent rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-brand-textPrimary bg-[#0f0f13] border border-[#1a1a24] p-2 rounded-full hover:border-brand-accent transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-brand-bg/95 backdrop-blur-lg z-45 md:hidden flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.target}
                  href={link.target}
                  onClick={(e) => handleLinkClick(e, link.target)}
                  className="text-2xl font-bold tracking-wide text-brand-textPrimary hover:text-brand-accent py-2 border-b border-[#1a1a24]"
                >
                  <span className="font-mono text-xs text-brand-textSecondary mr-3">0{idx + 1}</span>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
