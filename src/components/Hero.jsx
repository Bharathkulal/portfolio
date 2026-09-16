import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Hero() {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Fast scroll transition container (130vh pinned height)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Snappy spring physics for instantaneous feel (400-600ms response)
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  // Fast transformation transforms for PORTFOLIO title
  const textScale = useTransform(progress, [0, 0.7], [1, 0.85]);
  const textOpacity = useTransform(progress, [0, 0.6], [1, 0]);
  const textY = useTransform(progress, [0, 0.7], ['0%', '-25%']);
  const textBlur = useTransform(progress, [0, 0.6], ['blur(0px)', 'blur(10px)']);
  const hintOpacity = useTransform(progress, [0, 0.25], [1, 0]);

  const handleScrollDown = () => {
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative w-full h-[130vh] bg-brand-bg select-none"
    >
      {/* Pinned 100vh Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 sm:px-8">
        
        {/* Huge Bold Editorial Opening Title */}
        <motion.div
          style={{
            scale: shouldReduceMotion ? 1 : textScale,
            opacity: shouldReduceMotion ? 1 : textOpacity,
            y: shouldReduceMotion ? '0%' : textY,
            filter: shouldReduceMotion ? 'none' : textBlur,
          }}
          className="w-full max-w-7xl mx-auto flex items-center justify-center text-center pointer-events-none"
        >
          <h1 
            className="editorial-title font-black uppercase text-[18vw] sm:text-[17.5vw] md:text-[16.5vw] lg:text-[15.5vw] tracking-[-0.04em] leading-none transition-colors duration-300"
            style={{
              backgroundImage: theme === 'dark'
                ? 'linear-gradient(180deg, #ffffff 15%, #e4e4e7 50%, #71717a 100%)'
                : 'linear-gradient(180deg, #18181b 15%, #3f3f46 50%, #71717a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: theme === 'dark' ? 'drop-shadow(0 10px 40px rgba(0,0,0,0.6))' : 'none'
            }}
          >
            PORTFOLIO
          </h1>
        </motion.div>

        {/* Minimal Scroll Cue (Fades out quickly on scroll) */}
        <motion.button
          style={{ opacity: shouldReduceMotion ? 1 : hintOpacity }}
          onClick={handleScrollDown}
          className="absolute bottom-10 flex flex-col items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-brand-textSecondary hover:text-brand-accent transition-colors uppercase cursor-pointer"
        >
          <span>SCROLL</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          >
            <ChevronDown size={14} className="text-brand-accent" />
          </motion.div>
        </motion.button>

      </div>
    </section>
  );
}
