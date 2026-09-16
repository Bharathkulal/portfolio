import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight, Terminal, ChevronDown } from 'lucide-react';
import TypingText from './TypingText';
import { useTheme } from '../context/ThemeContext';

export default function Hero({ aboutInfo }) {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking across the 220vh pinned stage
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Smooth physics spring for silky butter-smooth scroll feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001
  });

  // =========================================================================
  // ANIMATION TRANSFORMS
  // =========================================================================

  // 1. Initial Scroll Hint Pill (Visible at 0, disappears on initial scroll)
  const hintOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const hintY = useTransform(smoothProgress, [0, 0.15], [0, 15]);

  // 2. Background Giant "PORTFOLIO" Typography
  // Starts centered and bold, stays behind portrait, shifts slightly with parallax
  const bgTextOpacity = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [0.85, 0.55, 0.3, 0.25]);
  const bgTextScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.05, 1.1]);
  const bgTextY = useTransform(smoothProgress, [0, 1], ['0%', '-8%']);

  // 3. Bharath's Cutout Portrait (Rises from bottom into center, then glides to right)
  // Stage 1 (0 -> 0.45): Rises up into center foreground (with PORTFOLIO behind him)
  // Stage 2 (0.45 -> 0.9): Moves to right column as hero message appears on left
  const portraitY = useTransform(
    smoothProgress, 
    [0, 0.4, 0.85, 1], 
    ['100%', '0%', '0%', '0%']
  );
  
  const portraitOpacity = useTransform(
    smoothProgress, 
    [0, 0.2, 0.4, 1], 
    [0, 0.6, 1, 1]
  );
  
  const portraitScale = useTransform(
    smoothProgress, 
    [0, 0.4, 0.85, 1], 
    [0.9, 1.04, 1.0, 1.0]
  );

  // Desktop horizontal shift: center (0%) -> right side (~24%)
  const portraitX = useTransform(
    smoothProgress,
    [0, 0.4, 0.85, 1],
    ['0%', '0%', '24%', '24%']
  );

  // 4. Hero Content & Messaging (Left Column - Picture 2 & 3 content)
  // Fades and slides in from the left during Stage 2 (0.4 -> 0.85)
  const contentOpacity = useTransform(smoothProgress, [0.35, 0.75, 1], [0, 1, 1]);
  const contentX = useTransform(smoothProgress, [0.35, 0.75, 1], [-45, 0, 0]);
  const contentPointerEvents = useTransform(
    smoothProgress, 
    (val) => (val > 0.45 ? 'auto' : 'none')
  );

  // Data bindings
  const name = aboutInfo?.name || 'Bharath Kulal';
  const subtitle = aboutInfo?.education || 'AI / ML Developer · Full-Stack Builder';
  const introduction = aboutInfo?.shortIntro || 'I build with AI, solve real-world problems, and create modern digital experiences.';
  const cutoutImage = '/images/bharath-cutout.png';

  const handleScrollTo = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative w-full h-[220vh] bg-brand-bg transition-colors duration-300"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Soft Ambient Glows in Background */}
        <div className="absolute top-[20%] left-[8%] w-[380px] h-[380px] bg-brand-accent/8 rounded-full blur-[130px] pointer-events-none -z-10" />
        <div className="absolute bottom-[15%] right-[10%] w-[420px] h-[420px] bg-brand-accent/6 rounded-full blur-[140px] pointer-events-none -z-10" />

        {/* =================================================================== */}
        {/* LAYER 1: GIANT BACKGROUND "PORTFOLIO" TYPOGRAPHY */}
        {/* =================================================================== */}
        <motion.div 
          style={{
            opacity: shouldReduceMotion ? 0.35 : bgTextOpacity,
            scale: shouldReduceMotion ? 1 : bgTextScale,
            y: shouldReduceMotion ? 0 : bgTextY,
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        >
          <div className="w-full text-center px-4">
            <h1 
              className="hero-giant-text font-black tracking-[-0.04em] text-[15vw] sm:text-[16vw] md:text-[15vw] lg:text-[14.5vw] uppercase transition-colors duration-300"
              style={{
                color: theme === 'dark' ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.08)',
                textShadow: theme === 'dark' 
                  ? '0 0 80px rgba(0, 255, 136, 0.04)' 
                  : 'none'
              }}
            >
              PORTFOLIO
            </h1>
          </div>
        </motion.div>

        {/* =================================================================== */}
        {/* MAIN STAGE CONTENT GRID */}
        {/* =================================================================== */}
        <div className="relative w-full max-w-7xl mx-auto h-full px-6 sm:px-10 lg:px-16 flex items-center z-10">
          
          {/* ================================================================= */}
          {/* LAYER 3: HERO TEXT & PRESENTATION MESSAGE (Pictures 2 & 3) */}
          {/* ================================================================= */}
          <motion.div 
            style={{
              opacity: shouldReduceMotion ? 1 : contentOpacity,
              x: shouldReduceMotion ? 0 : contentX,
              pointerEvents: shouldReduceMotion ? 'auto' : contentPointerEvents
            }}
            className="w-full lg:w-3/5 flex flex-col justify-center items-start text-left pt-16 pb-12 lg:py-0 z-30 relative"
          >
            {/* Technical Pill Tag */}
            <div className="flex items-center gap-2 border border-brand-border bg-brand-card/85 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
              <span className="font-mono text-[11px] tracking-widest text-brand-textSecondary uppercase font-medium">
                SYSTEM_INIT // B.KULAL_PORTFOLIO
              </span>
            </div>

            {/* Small Intro Greeting */}
            <p className="font-sans text-sm sm:text-base text-brand-textSecondary/90 mb-2 tracking-wide font-medium">
              Hey, I’m
            </p>

            {/* Big Name */}
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-brand-textPrimary mb-4 leading-none">
              {name}
            </h2>

            {/* Subtitle / Role Tag */}
            <div className="font-mono text-sm sm:text-base md:text-lg text-brand-accent font-medium mb-6 tracking-wide flex items-center gap-2">
              <span>{subtitle}</span>
            </div>

            {/* Introduction Description */}
            <div className="max-w-xl mb-9">
              <TypingText 
                text={introduction}
                className="font-sans text-base sm:text-lg text-brand-textSecondary leading-relaxed font-normal"
              />
            </div>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.button 
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => handleScrollTo('projects')}
                className="group flex items-center gap-2.5 bg-brand-accent text-brand-bg px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand-accent/25 cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button 
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => handleScrollTo('contact')}
                className="flex items-center gap-2.5 border border-brand-border bg-brand-card/80 hover:bg-brand-tertiary text-brand-textPrimary hover:border-brand-accent/50 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm"
              >
                <span>Get In Touch</span>
                <Terminal size={15} className="text-brand-accent" />
              </motion.button>
            </div>
          </motion.div>

        </div>

        {/* =================================================================== */}
        {/* LAYER 2: BHARATH'S CUTOUT PORTRAIT (Transparent Cutout Image) */}
        {/* Positioned in front of the giant PORTFOLIO text, rises on scroll */}
        {/* =================================================================== */}
        <motion.div 
          style={{
            y: shouldReduceMotion ? '0%' : portraitY,
            x: shouldReduceMotion ? '24%' : portraitX,
            opacity: shouldReduceMotion ? 1 : portraitOpacity,
            scale: shouldReduceMotion ? 1 : portraitScale,
          }}
          className="absolute inset-0 flex items-end justify-center pointer-events-none z-20"
        >
          <div className="relative h-[82vh] sm:h-[88vh] lg:h-[92vh] max-h-[960px] flex items-end justify-center">
            {/* Cutout Portrait Image */}
            <img 
              src={cutoutImage} 
              alt={name} 
              className="h-full w-auto object-contain object-bottom select-none filter drop-shadow-[0_12px_36px_rgba(0,0,0,0.25)]"
              loading="eager"
            />

            {/* Subtle soft grounding shadow/blend at the feet */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* =================================================================== */}
        {/* INITIAL STAGE SCROLL HINT (Disappears when scrolling starts) */}
        {/* =================================================================== */}
        <motion.div 
          style={{
            opacity: shouldReduceMotion ? 0 : hintOpacity,
            y: shouldReduceMotion ? 0 : hintY,
          }}
          className="absolute bottom-8 inset-x-0 flex flex-col items-center justify-center gap-2 pointer-events-none z-30"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-brand-border/60 bg-brand-card/60 backdrop-blur-md shadow-sm">
            <span className="font-mono text-[11px] tracking-widest text-brand-textSecondary uppercase font-medium">
              SCROLL TO EXPLORE
            </span>
            <motion.div 
              animate={{ y: [0, 4, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ChevronDown size={14} className="text-brand-accent" />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
