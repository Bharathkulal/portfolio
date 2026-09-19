import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import heroImg from '../assets/hero.png';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollDown = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2, // slight delay to allow loader to fade out
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const nameVariants = {
    hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    visible: { 
      opacity: 1, 
      clipPath: 'inset(0 0% 0 0)',
      transition: { duration: 1.2, ease: "circOut" }
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
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p 
              variants={itemVariants}
              className="font-mono text-brand-accent tracking-widest text-sm mb-4 uppercase"
            >
              HELLO, I'M
            </motion.p>
            
            <motion.h1 
              variants={shouldReduceMotion ? itemVariants : nameVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-brand-textPrimary tracking-tight mb-4"
            >
              BHARATH KULAL
            </motion.h1>
            
            <motion.h2 
              variants={itemVariants}
              className="text-xl sm:text-2xl font-semibold text-brand-textSecondary mb-6"
            >
              BCA STUDENT <span className="text-brand-accent px-2">•</span> AI DEVELOPER
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-brand-textSecondary/80 text-base sm:text-lg max-w-lg mb-10 leading-relaxed"
            >
              "I build intelligent, useful and modern digital experiences."
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
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
          </motion.div>

          {/* Right Side: Photo */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-8 lg:mb-0"
            variants={photoVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              animate={shouldReduceMotion ? {} : floatingAnimation}
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px]"
            >
              <div className="absolute inset-0 rounded-full border border-brand-accent/30 shadow-[0_0_40px_rgba(74,222,128,0.1)]"></div>
              <img 
                src={heroImg} 
                alt="Bharath Kulal" 
                className="w-full h-full object-cover rounded-full p-2 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
