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


    </>
  );
}
