import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const letters = 'PORTFOLIO'.split('');
const INTRO_DURATION = 3500;
const REDUCED_INTRO_DURATION = 900;

export default function Loader({ onComplete }) {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState('intro');
  const onCompleteRef = useRef(null);
  const introDuration = shouldReduceMotion ? REDUCED_INTRO_DURATION : INTRO_DURATION;

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const timer = window.setTimeout(() => setPhase('exit'), introDuration);
    return () => window.clearTimeout(timer);
  }, [introDuration]);

  const handleAnimationComplete = () => {
    if (phase === 'exit') onCompleteRef.current?.();
  };

  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      initial={{ opacity: 0, scale: 1.01, y: 0 }}
      animate={phase === 'exit'
        ? { opacity: 0, scale: 0.99, y: -8 }
        : { opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: phase === 'exit' ? (shouldReduceMotion ? 0.3 : 0.8) : (shouldReduceMotion ? 0.18 : 0.5),
        ease: [0.22, 1, 0.36, 1],
      }}
      onAnimationComplete={handleAnimationComplete}
      className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-brand-bg px-6 py-7 text-brand-textPrimary sm:px-12 sm:py-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.12 : 0.4, delay: shouldReduceMotion ? 0 : 0.15 }}
        className="relative z-10 mt-1 flex w-full justify-center font-mono text-[10px] uppercase tracking-[0.24em] text-brand-textSecondary sm:text-xs"
      >
        Introducing
      </motion.div>

      <div className="relative z-10 flex w-full flex-1 items-center justify-center">
        <h1
          aria-hidden="true"
          className="flex max-w-full justify-center whitespace-nowrap font-sans text-[clamp(2rem,11.5vw,9rem)] font-extrabold uppercase leading-none text-brand-textPrimary"
          style={{ letterSpacing: '0.08em' }}
        >
          {letters.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={phase === 'exit'
                ? { opacity: 0, y: -5, scale: 0.99 }
                : { opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: phase === 'exit' || shouldReduceMotion ? 0 : 0.45 + index * 0.2,
                duration: phase === 'exit' ? (shouldReduceMotion ? 0.12 : 0.25) : (shouldReduceMotion ? 0.18 : 0.38),
                ease: [0.33, 1, 0.68, 1],
              }}
              className="inline-block origin-bottom"
            >
              {letter}
            </motion.span>
          ))}
        </h1>
      </div>

      <div className="relative z-10 mb-2 flex w-full items-end justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-brand-textSecondary sm:mb-4 sm:text-[10px]">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.12 : 0.4, delay: shouldReduceMotion ? 0 : 0.2 }}
        >
          B.Kulal
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.12 : 0.4, delay: shouldReduceMotion ? 0 : 0.25 }}
        >
          2026 / Portfolio
        </motion.span>
      </div>

      <div className="absolute inset-x-6 bottom-0 h-px overflow-hidden bg-brand-border sm:inset-x-12">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: introDuration / 1000, ease: 'linear' }}
          className="h-full origin-left bg-brand-accent"
        />
      </div>
    </motion.div>
  );
}