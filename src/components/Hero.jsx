import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, MapPin } from 'lucide-react';
import portraitImg from '../assets/about-profile-clean.png';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[100svh] lg:min-h-screen flex flex-col justify-between bg-[#080808] text-[#F5F3EF] pt-28 pb-10 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Cinematic Ambient Glow Behind Portrait */}
      <div className="absolute top-1/3 right-10 lg:right-32 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF941F]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-[350px] h-[350px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Main Two-Column Editorial Composition */}
      <div className="w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* =================================================================== */}
        {/* LEFT COLUMN: Editorial Typography & Intentional Actions */}
        {/* =================================================================== */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Small Top Editorial Label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 font-mono text-xs sm:text-sm text-[#FF941F] tracking-[0.25em] uppercase font-semibold mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF941F] animate-pulse" />
            <span>HELLO, I'M</span>
          </motion.div>

          {/* Main Editorial Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-[#F5F3EF] tracking-tight uppercase leading-[0.92] mb-6 select-none"
          >
            BHARATH<br />
            <span className="text-[#F5F3EF] relative inline-block">
              KULAL
            </span>
          </motion.h1>

          {/* Role Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 font-mono text-xs sm:text-sm md:text-base text-[#FF941F] tracking-[0.2em] uppercase font-semibold mb-6"
          >
            <span>AI ENGINEER IN THE MAKING.</span>
          </motion.div>

          {/* Supporting Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm sm:text-base md:text-lg text-[#929292] leading-relaxed max-w-xl mb-10 font-normal"
          >
            "I build intelligent systems and meaningful digital experiences, combining artificial intelligence, software development, and creative problem-solving."
          </motion.p>

          {/* Two Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo('work')}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#FF941F] hover:bg-[#FFB356] text-[#080808] font-bold font-mono text-xs uppercase tracking-wider rounded-full transition-all duration-300 shadow-lg shadow-[#FF941F]/20 hover:shadow-xl hover:shadow-[#FF941F]/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => handleScrollTo('contact')}
              className="flex items-center justify-center gap-2 px-8 py-4 border border-white/15 hover:border-[#FF941F]/70 text-[#F5F3EF] hover:text-[#FF941F] bg-white/[0.02] hover:bg-white/[0.05] font-mono text-xs uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer"
            >
              <span>LET'S CONNECT</span>
            </button>
          </motion.div>

          {/* Understated Status Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap items-center gap-6 mt-12 pt-6 border-t border-white/[0.08] text-[11px] font-mono text-[#929292]"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>STATUS: AVAILABLE (2026)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-[#FF941F]" />
              <span>KARNATAKA, INDIA</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Terminal size={12} className="text-[#929292]" />
              <span>BCA (AI & ML)</span>
            </div>
          </motion.div>

        </div>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: Art-Directed Editorial Portrait Composition */}
        {/* =================================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex items-center justify-center relative"
        >
          {/* Framed Cinematic Stage */}
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[430px] aspect-[4/5] flex items-end justify-center select-none group">
            
            {/* Ambient Warm Backlight Halo */}
            <div className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-[#FF941F]/20 via-transparent to-transparent blur-2xl group-hover:from-[#FF941F]/30 transition-all duration-700 pointer-events-none" />

            {/* Subtle Editorial Outline & Corners */}
            <div className="absolute inset-0 rounded-2xl border border-white/[0.1] pointer-events-none overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#FF941F]/60" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#FF941F]/60" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#FF941F]/60" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#FF941F]/60" />
            </div>

            {/* The SAME Existing Personal Photograph of Bharath Kulal */}
            <img
              src={portraitImg}
              alt="Bharath Kulal - AI Developer"
              className="h-[96%] w-auto object-contain object-bottom filter contrast-105 brightness-95 saturate-[0.9] drop-shadow-[0_20px_45px_rgba(0,0,0,0.8)] transition-all duration-700 group-hover:brightness-105 group-hover:scale-[1.01]"
              loading="eager"
            />

            {/* Bottom Atmospheric Grounding Gradient */}
            <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent pointer-events-none" />

            {/* Understated Floating Metadata Badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute top-4 left-4 font-mono text-[9px] text-[#929292] bg-[#080808]/85 backdrop-blur-md px-2.5 py-1 rounded border border-white/[0.08]"
            >
              <span>SYS_ID // 001</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute top-4 right-4 font-mono text-[9px] text-[#FF941F] bg-[#080808]/85 backdrop-blur-md px-2.5 py-1 rounded border border-[#FF941F]/30"
            >
              <span>EDITION • 2026</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute bottom-4 inset-x-4 flex items-center justify-between font-mono text-[9px] text-[#929292] bg-[#111111]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/[0.08]"
            >
              <span className="text-[#F5F3EF] font-semibold">BHARATH KULAL</span>
              <span className="text-[#FF941F]">AI & SYSTEMS ENG.</span>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* =================================================================== */}
      {/* BOTTOM SCROLL INDICATOR */}
      {/* =================================================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pt-8 border-t border-white/[0.06] font-mono text-[10px] text-[#929292]">
        <button
          onClick={() => handleScrollTo('about')}
          className="group flex items-center gap-2 hover:text-[#FF941F] transition-colors cursor-pointer"
          aria-label="Scroll to about section"
        >
          <ArrowDown size={13} className="text-[#FF941F] group-hover:translate-y-0.5 transition-transform" />
          <span className="tracking-widest uppercase">SCROLL TO EXPLORE</span>
        </button>

        <span className="hidden sm:inline-block tracking-widest uppercase">
          00 // OVERVIEW
        </span>
      </div>

    </section>
  );
}

