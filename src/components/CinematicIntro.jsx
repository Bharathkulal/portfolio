import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, SkipForward } from 'lucide-react';
import portraitImg from '../assets/about-profile-clean.png';

const YEAR_LABEL = "PORTFOLIO — 2026";
const NAME = "BHARATH KULAL";
const ROLE = "AI ENGINEER IN THE MAKING";

export default function CinematicIntro({ onEnter, isExiting }) {
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(shouldReduceMotion ? 6 : 1);

  useEffect(() => {
    if (shouldReduceMotion) {
      setStep(6);
      return;
    }

    // Cinematic Step Progression
    // Step 1: Initial black canvas
    // Step 2 (300ms): Reveal editorial label "PORTFOLIO — 2026"
    // Step 3 (1000ms): Gradually reveal existing portrait with atmospheric lighting
    // Step 4 (1700ms): Reveal name "BHARATH KULAL"
    // Step 5 (2300ms): Reveal professional role "AI ENGINEER IN THE MAKING"
    // Step 6 (2800ms): Reveal "ENTER MY WORLD →" interactive button
    const timers = [
      setTimeout(() => setStep(2), 300),
      setTimeout(() => setStep(3), 950),
      setTimeout(() => setStep(4), 1600),
      setTimeout(() => setStep(5), 2150),
      setTimeout(() => setStep(6), 2650),
    ];

    return () => timers.forEach(clearTimeout);
  }, [shouldReduceMotion]);

  const handleSkip = () => {
    onEnter?.();
  };

  return (
    <motion.section
      key="cinematic-intro"
      initial={{ opacity: 1 }}
      animate={isExiting ? { 
        opacity: 0,
        scale: 1.04,
        filter: "blur(8px)",
        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } 
      } : { opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
      className="fixed inset-0 z-[100] w-full h-[100svh] min-h-[100vh] bg-[#080808] text-[#F5F3EF] overflow-hidden flex flex-col justify-between select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Cinematic portfolio introduction"
    >
      {/* Background Cinematic Lighting & Portrait Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Radial Ambient Backlight */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={step >= 3 ? { opacity: 0.28, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#FF941F] blur-[150px] opacity-25"
        />

        {/* Dramatic Existing Portrait Presentation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={step >= 3 ? { 
            opacity: 0.62, 
            scale: 1, 
            y: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
          } : { opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-full max-w-lg md:max-w-2xl h-[85vh] flex items-end justify-center">
            <img
              src={portraitImg}
              alt="Bharath Kulal"
              className="w-auto h-full max-h-[85vh] object-contain object-bottom filter contrast-110 brightness-90 saturate-[0.85] transition-all duration-700"
            />
            {/* Atmospheric Shadows & Dark Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808]/80" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#080808]/40 to-[#080808]" />
          </div>
        </motion.div>

        {/* Restrained Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-transparent to-[#080808]" />
      </div>

      {/* TOP HEADER: Editorial Year Tag & Skip Option */}
      <header className="relative z-20 w-full px-6 sm:px-12 pt-8 sm:pt-10 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={step >= 2 ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 font-mono text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#FF941F]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF941F] animate-pulse" />
          <span>{YEAR_LABEL}</span>
        </motion.div>

        <motion.button
          onClick={handleSkip}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="group flex items-center gap-2 font-mono text-[11px] sm:text-xs text-[#929292] hover:text-[#F5F3EF] tracking-widest uppercase transition-colors px-3 py-1.5 rounded-full border border-white/5 hover:border-white/20 bg-black/40 backdrop-blur-sm cursor-pointer"
          aria-label="Skip introduction"
        >
          <span>Skip</span>
          <SkipForward size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      </header>

      {/* CENTER STAGE: Name, Role & Cinematic Callout */}
      <main className="relative z-20 w-full max-w-5xl mx-auto px-6 sm:px-12 my-auto text-center flex flex-col items-center">
        {/* Name Title Sequence */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={step >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#F5F3EF] uppercase leading-[0.95]"
          >
            {NAME}
          </motion.h1>
        </div>

        {/* Professional Role */}
        <div className="overflow-hidden mb-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={step >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs sm:text-sm md:text-base text-[#929292] tracking-[0.24em] uppercase font-medium"
          >
            {ROLE}
          </motion.p>
        </div>

        {/* Step 6: Prominent Interactive "ENTER MY WORLD →" Button */}
        <AnimatePresence>
          {step >= 6 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative inline-block mt-2"
            >
              {/* Subtle ambient aura around button */}
              <div className="absolute -inset-1 bg-[#FF941F]/30 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity" />

              <motion.button
                onClick={onEnter}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                autoFocus
                className="relative z-10 flex items-center justify-center gap-3 px-8 sm:px-10 py-4 bg-[#FF941F] hover:bg-[#FFB356] text-[#080808] font-bold text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF941F] focus:ring-offset-2 focus:ring-offset-[#080808] cursor-pointer"
              >
                <span>ENTER MY WORLD</span>
                <ArrowRight size={16} className="text-[#080808] transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER: Subtle coordinates / identity note */}
      <footer className="relative z-20 w-full px-6 sm:px-12 pb-8 sm:pb-10 flex items-center justify-between font-mono text-[10px] text-[#929292]/70 tracking-widest uppercase">
        <motion.span
          initial={{ opacity: 0 }}
          animate={step >= 3 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          SYS // ARTIFICIAL INTELLIGENCE & SYSTEMS
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={step >= 3 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden sm:inline-block"
        >
          KARNATAKA, INDIA • 2026
        </motion.span>
      </footer>
    </motion.section>
  );
}
