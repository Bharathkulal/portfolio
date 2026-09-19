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

    const exitTimer = setTimeout(() => {
      setStartExit(true);
      setTimeout(onComplete, 800);
    }, 2400);

    return () => {
      clearTimeout(exitTimer);
    };
  }, [shouldReduceMotion, onComplete]);

  const containerVariants = {
    initial: { opacity: 1, scale: 1, y: 0 },
    exit: { 
      opacity: 0, 
      scale: 0.92, 
      y: '-2vh',
      filter: 'blur(4px)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
    }
  };

  const letterVariants = {
    initial: { opacity: 0, y: 30, scale: 0.85 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.12,
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1]
      }
    })
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#080909] text-white overflow-hidden pointer-events-none"
      initial="initial"
      animate={startExit ? "exit" : "initial"}
      variants={containerVariants}
    >
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      {/* Top Left Branding */}
      <motion.div 
        className="absolute top-8 left-8 sm:top-12 sm:left-12 font-mono text-xs tracking-[0.3em] font-medium text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        B.KULAL
      </motion.div>

      {/* Giant Typography */}
      <div className="relative flex justify-center items-center px-4 w-full">
        {shouldReduceMotion ? (
          <motion.h1 
            className="text-[14vw] sm:text-[16vw] font-black tracking-tight leading-none text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            PORTFOLIO
          </motion.h1>
        ) : (
          <div className="flex font-black text-[14vw] sm:text-[16vw] leading-none text-white tracking-tighter" style={{ letterSpacing: '-0.02em' }}>
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
