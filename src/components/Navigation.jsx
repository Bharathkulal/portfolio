import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', number: '00', label: 'PORTFOLIO' },
  { id: 'about', number: '01', label: 'ABOUT' },
  { id: 'skills', number: '02', label: 'SKILLS' },
  { id: 'work', number: '03', label: 'WORK' },
  { id: 'ai-focus', number: '04', label: 'AI FOCUS' },
  { id: 'contact', number: '05', label: 'CONTACT' },
];

export default function Navigation() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && scrollPos >= el.offsetTop) {
          setActiveIdx(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Minimal Top Brand Bar */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 sm:px-12 py-6 pointer-events-none">
        <button 
          onClick={() => scrollToSection('hero')}
          className="pointer-events-auto font-mono text-xs tracking-[0.25em] font-bold text-brand-textPrimary hover:opacity-75 transition-opacity uppercase cursor-pointer"
        >
          B.KULAL
        </button>

      </header>

      {/* Discreet Minimal Edge Indicator (Right Edge on Desktop) */}
      <nav 
        aria-label="Editorial Section Navigation" 
        className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3 pointer-events-none"
      >
        <div className="pointer-events-auto flex flex-col items-end gap-2.5 bg-brand-bg/40 backdrop-blur-sm p-2 rounded-full border border-brand-border/40">
          {sections.map((sec, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                title={sec.label}
                className="group flex items-center gap-3 cursor-pointer py-0.5"
              >
                <span 
                  className={`font-mono text-[10px] tracking-wider transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                    isActive ? 'text-brand-accent opacity-100 font-bold' : 'text-brand-textSecondary'
                  }`}
                >
                  {sec.number}
                </span>
                <span 
                  className={`block rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'w-2 h-2 bg-brand-accent shadow-[0_0_8px_rgba(0,255,136,0.6)]' 
                      : 'w-1.5 h-1.5 bg-brand-border hover:bg-brand-textSecondary'
                  }`}
                />
              </button>
            );
          })}
        </div>
        
        {/* Active Section Number */}
        <div className="font-mono text-[10px] tracking-widest text-brand-textSecondary/70 pr-1 select-none">
          <span className="text-brand-accent font-semibold">{sections[activeIdx].number}</span>
          <span> / 05</span>
        </div>
      </nav>
    </>
  );
}
