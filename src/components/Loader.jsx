import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Loader({ onComplete }) {
  const shouldReduceMotion = useReducedMotion();
  const [startExit, setStartExit] = useState(false);

  const letters = "PORTFOLIO".split('');

  useEffect(() => {
    if (shouldReduceMotion) {
      const timer = setTimeout(() => {
        setStartExit(true);
        setTimeout(onComplete, 800);
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Phase: Exit starting at 2.0s
    const exitTimer = setTimeout(() => {
      setStartExit(true);
      setTimeout(onComplete, 800); // Transitions to hero smoothly
    }, 2000);

    return () => {
      clearTimeout(exitTimer);
    };
  }, [shouldReduceMotion, onComplete]);

  // Overall container exit
  const containerVariants = {
    initial: { opacity: 1, scale: 1 },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      filter: 'blur(4px)',
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } 
    }
  };

  const bgVariants = {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const labelVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: "easeOut" } }
  };

  const letterVariants = {
    initial: { opacity: 0, y: 15, scale: 0.96 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.4 + (i * 0.1),
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1]
      }
    })
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#080909] overflow-hidden pointer-events-none p-6 sm:p-12"
      initial="initial"
      animate={startExit ? "exit" : "animate"}
      variants={containerVariants}
    >
      {/* Cinematic Photographic Background */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop")',
        }}
        variants={bgVariants}
      >
        {/* Dark Muted Overlay for Contrast */}
        <div className="absolute inset-0 bg-black/60"></div>
        {/* Film Grain / Noise */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        ></div>
      </motion.div>

      {/* Top Center: INTRODUCING */}
      <div className="relative z-10 w-full flex justify-center mt-4">
        <motion.div 
          variants={labelVariants}
          className="text-xs sm:text-sm tracking-[0.2em] text-[#d4cfc5] uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          INTRODUCING
        </motion.div>
      </div>

      {/* Main Center: PORTFOLIO */}
      <div className="relative z-10 flex-1 flex justify-center items-center w-full">
        {shouldReduceMotion ? (
          <motion.h1 
            className="text-[#F3F1EC] leading-none"
            style={{ 
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(4rem, 18vw, 15rem)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            PORTFOLIO
          </motion.h1>
        ) : (
          <div 
            className="flex justify-center text-[#F3F1EC] leading-none" 
            style={{ 
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(4rem, 18vw, 15rem)',
              letterSpacing: '0.04em'
            }}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                className="inline-block origin-bottom"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Footer Area */}
      <div className="relative z-10 w-full flex justify-between items-end mb-2 sm:mb-4">
        <motion.div 
          variants={labelVariants}
          className="text-[10px] sm:text-xs tracking-[0.1em] text-[#9a958b] uppercase font-mono"
        >
          B.KULAL
        </motion.div>
        
        <motion.div 
          variants={labelVariants}
          className="text-[10px] sm:text-xs tracking-[0.1em] text-[#9a958b] uppercase font-mono"
        >
          2026 / PORTFOLIO
        </motion.div>
      </div>

    </motion.div>
  );
}
