import React, { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function TypingText({ 
  text, 
  className = "", 
  startDelay = 600, 
  showCursor = true 
}) {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Gracefully handle prefers-reduced-motion
    if (shouldReduceMotion) {
      setCurrentIndex(text.length);
      return;
    }

    let timeoutId;
    let index = 0;

    const typeNextChar = () => {
      if (index >= text.length) return;

      const char = text[index];
      let delay = 60; // base standard speed

      // 1. Variable character speeds
      if (char === ' ') {
        delay = Math.random() * 30 + 40; // Spaces: 40-70ms
      } else if (['.', ',', ':', ';', '&'].includes(char)) {
        delay = Math.random() * 100 + 120; // Punctuation key hits: 120-220ms
      } else {
        // Normal characters
        const slowerChar = Math.random() > 0.85;
        delay = slowerChar 
          ? Math.random() * 60 + 90   // Slower keystrokes: 90-150ms
          : Math.random() * 40 + 50;  // Standard character keys: 50-90ms
      }

      // 2. Human typing rhythm and pause factors
      const isSentenceEnd = char === '.' && (index === text.length - 1 || text[index + 1] === ' ');
      const isCommaPause = char === ',';
      if (isSentenceEnd) {
        delay += 400; // Pause briefly after a period before typing next sentence
      } else if (isCommaPause) {
        delay += 200; // Pause briefly after a comma
      }

      timeoutId = setTimeout(() => {
        index++;
        setCurrentIndex(index);
        typeNextChar();
      }, delay);
    };

    // Start timer delay
    const startTimeout = setTimeout(() => {
      typeNextChar();
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, startDelay, shouldReduceMotion]);

  const visibleText = text.slice(0, currentIndex);
  const hiddenText = text.slice(currentIndex);
  const isTyping = currentIndex < text.length;

  return (
    <p className={`relative ${className}`}>
      {/* Typed portion */}
      <span>{visibleText}</span>
      
      {/* Realistic blinking typing cursor */}
      {showCursor && (
        <span 
          className="inline-block w-[1.5px] h-[1.25em] bg-brand-accent align-middle ml-0.5 -mt-0.5"
          style={{
            animation: !isTyping ? 'caretBlink 1.1s step-end infinite' : 'none'
          }}
        />
      )}
      
      {/* Invisible portion maintaining stable, pre-allocated layout dimensions */}
      <span className="opacity-0 select-none pointer-events-none">{hiddenText}</span>
    </p>
  );
}
