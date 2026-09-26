import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import heroImg from '../assets/laptop-Hero.png';

const GREETING = "HELLO, I'M";
const NAME_FIRST = 'BHARATH';
const NAME_LAST = 'KULAL';
const SUBTITLE = 'BCA STUDENT • AI DEVELOPER';
const SUBTITLE_PREFIX = 'BCA STUDENT ';
const DESCRIPTION = '"I build intelligent, useful and modern digital experiences."';

const EMPTY_TYPING = {
  greeting: 0,
  nameFirst: 0,
  nameLast: 0,
  subtitle: 0,
  description: 0,
  complete: false,
};

const COMPLETE_TYPING = {
  greeting: GREETING.length,
  nameFirst: NAME_FIRST.length,
  nameLast: NAME_LAST.length,
  subtitle: SUBTITLE.length,
  description: DESCRIPTION.length,
  complete: true,
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [typing, setTyping] = useState(EMPTY_TYPING);
  const displayedTyping = shouldReduceMotion ? COMPLETE_TYPING : typing;

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const sequence = [
      { key: 'greeting', text: GREETING, interval: 60, pause: 260 },
      { key: 'nameFirst', text: NAME_FIRST, interval: 100, pause: 260 },
      { key: 'nameLast', text: NAME_LAST, interval: 100, pause: 260 },
      { key: 'subtitle', text: SUBTITLE, interval: 50, pause: 260 },
      { key: 'description', text: DESCRIPTION, interval: 30, pause: 0 },
    ];

    let sequenceIndex = 0;
    let characterIndex = 0;
    let timeoutId;
    let loaderObserver;
    let hasStarted = false;

    const typeNextCharacter = () => {
      const segment = sequence[sequenceIndex];

      if (!segment) {
        setTyping((current) => ({ ...current, complete: true }));
        return;
      }

      characterIndex += 1;
      const visibleCharacterCount = characterIndex;
      setTyping((current) => ({ ...current, [segment.key]: visibleCharacterCount }));
      if (characterIndex >= segment.text.length) {
        sequenceIndex += 1;
        characterIndex = 0;
        timeoutId = window.setTimeout(typeNextCharacter, segment.pause);
      } else {
        timeoutId = window.setTimeout(typeNextCharacter, segment.interval);
      }
    };

    const startTyping = () => {
      if (hasStarted) return;
      hasStarted = true;
      loaderObserver?.disconnect();
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(typeNextCharacter, 300);
    };

    const loader = document.querySelector('[aria-label="Loading portfolio"]');
    if (!loader) {
      startTyping();
    } else {
      let loaderWasVisible = Number.parseFloat(getComputedStyle(loader).opacity) > 0;
      loaderObserver = new MutationObserver(() => {
        const activeLoader = document.querySelector('[aria-label="Loading portfolio"]');
        if (!activeLoader || (loaderWasVisible && Number.parseFloat(getComputedStyle(activeLoader).opacity) <= 0.001)) {
          startTyping();
          return;
        }
        if (Number.parseFloat(getComputedStyle(activeLoader).opacity) > 0) loaderWasVisible = true;
      });
      loaderObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['style'],
        childList: true,
        subtree: true,
      });
      timeoutId = window.setTimeout(startTyping, 5000);
    }

    return () => {
      window.clearTimeout(timeoutId);
      loaderObserver?.disconnect();
    };
  }, [shouldReduceMotion]);

  const handleScrollDown = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }
    }
  };

  const floatingAnimation = {
    y: ['-10px', '10px'],
    transition: {
      y: {
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen flex items-center justify-center bg-brand-bg pt-20 pb-12 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Side: Content */}
          <div 
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10"
          >
            <p
              aria-label={GREETING}
              className="relative font-mono text-brand-accent tracking-widest text-sm mb-4 uppercase"
            >
              <span aria-hidden="true" className="invisible">{GREETING}</span>
              <span aria-hidden="true" className="absolute inset-0">{GREETING.slice(0, displayedTyping.greeting)}</span>
            </p>
            
            <h1
              aria-label={`${NAME_FIRST} ${NAME_LAST}`}
              className="relative text-5xl sm:text-6xl lg:text-7xl font-black text-brand-textPrimary tracking-tight mb-4"
            >
              <span aria-hidden="true" className="invisible">{NAME_FIRST}<br />{NAME_LAST}</span>
              <span aria-hidden="true" className="absolute inset-0">
                <span className="block">{NAME_FIRST.slice(0, displayedTyping.nameFirst)}</span>
                <span className="block">{NAME_LAST.slice(0, displayedTyping.nameLast)}</span>
              </span>
            </h1>
            
            <h2
              aria-label={SUBTITLE}
              className="relative text-xl sm:text-2xl font-semibold text-brand-textSecondary mb-6"
            >
              <span aria-hidden="true" className="invisible">
                BCA STUDENT <span className="text-brand-accent px-2">•</span> AI DEVELOPER
              </span>
              <span aria-hidden="true" className="absolute inset-0">
                {SUBTITLE.slice(0, Math.min(displayedTyping.subtitle, SUBTITLE_PREFIX.length))}
                {displayedTyping.subtitle > SUBTITLE_PREFIX.length && (
                  <span className="text-brand-accent px-2">•</span>
                )}
                {displayedTyping.subtitle > SUBTITLE_PREFIX.length + 1
                  ? SUBTITLE.slice(SUBTITLE_PREFIX.length + 1, displayedTyping.subtitle)
                  : ''}
              </span>
            </h2>
            
            <p
              aria-label={DESCRIPTION}
              className="relative text-brand-textSecondary/80 text-base sm:text-lg max-w-lg mb-10 leading-relaxed"
            >
              <span aria-hidden="true" className="invisible">{DESCRIPTION}</span>
              <span aria-hidden="true" className="absolute inset-0">
                {DESCRIPTION.slice(0, displayedTyping.description)}
              </span>
            </p>
            
            <motion.div 
              initial={false}
              animate={{ opacity: displayedTyping.complete ? 1 : 0, y: displayedTyping.complete ? 0 : 10 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              aria-hidden={!displayedTyping.complete}
              inert={!displayedTyping.complete}
              style={{ pointerEvents: displayedTyping.complete ? 'auto' : 'none' }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto"
            >
              <button 
                onClick={() => handleScrollDown('projects')}
                className="w-full sm:w-auto px-8 py-3.5 bg-brand-textPrimary text-brand-bg font-medium rounded-full hover:bg-brand-accent transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]"
              >
                VIEW MY WORK
              </button>
              <button 
                onClick={() => handleScrollDown('about')}
                className="w-full sm:w-auto px-8 py-3.5 border border-brand-border bg-transparent text-brand-textPrimary font-medium rounded-full hover:border-brand-accent hover:text-brand-accent transition-colors duration-300"
              >
                ABOUT ME
              </button>
            </motion.div>
          </div>

          {/* Right Side: Photo */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-8 lg:mb-0"
            variants={photoVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              animate={shouldReduceMotion ? {} : floatingAnimation}
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-2xl overflow-hidden shadow-2xl shadow-brand-border/40"
            >
              <img 
                src={heroImg} 
                alt="Bharath Kulal" 
                className="w-full h-auto object-cover brightness-50 grayscale hover:brightness-100 hover:grayscale-0 transition-all duration-700 cursor-pointer"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
