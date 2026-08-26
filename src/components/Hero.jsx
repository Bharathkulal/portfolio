import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Terminal } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, clipPath: 'inset(100% 0% 0% 0%)' },
    visible: {
      opacity: 1,
      scale: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.5 }
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-24 px-6 md:px-12 tech-grid-bg overflow-hidden"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Text Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Technical Tag */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 border border-[#1a1a24] bg-[#0f0f13] px-3.5 py-1.5 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
            <span className="font-mono text-[10px] tracking-widest text-brand-textSecondary uppercase">SYSTEM_INIT // B.KULAL_PORTFOLIO</span>
          </motion.div>

          {/* Name & Titles */}
          <motion.h1 
            variants={itemVariants}
            className="font-sans text-5xl md:text-7xl font-extrabold tracking-tight text-brand-textPrimary mb-4"
          >
            BHARATH KULAL
          </motion.h1>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 font-mono text-sm md:text-base text-brand-accent font-medium"
          >
            <span>AI / ML DEVELOPER</span>
            <span className="text-brand-border">•</span>
            <span className="text-brand-blue">FULL-STACK BUILDER</span>
          </motion.div>

          {/* Pitch */}
          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg text-brand-textSecondary max-w-xl mb-10 leading-relaxed font-light"
          >
            I am a BCA student specializing in Artificial Intelligence & Machine Learning. 
            I learn technology by engineering real systems to solve real-world problems.
          </motion.p>

          {/* Call to Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 bg-brand-accent text-brand-bg px-7 py-3.5 rounded-full font-medium text-sm transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-brand-accent/15"
            >
              Explore My Work 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 border border-brand-border bg-[#0f0f13]/60 hover:bg-[#1a1a24] text-brand-textPrimary hover:border-brand-textSecondary px-7 py-3.5 rounded-full font-medium text-sm transition-all"
            >
              Get In Touch 
              <Terminal size={14} className="text-brand-textSecondary" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column: Visual Frame */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div 
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden border border-brand-border/60 shadow-2xl group"
          >
            {/* Technical Border Outlines */}
            <div className="absolute inset-2 border border-dashed border-brand-border/40 rounded-[22px] pointer-events-none z-10" />
            <div className="absolute top-4 left-4 font-mono text-[9px] text-brand-textSecondary/60 z-10">B.KULAL_IMG_01</div>

            {/* Profile Image Asset/Placeholder */}
            <div className="w-full h-full bg-[#0f0f13] flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-80 z-10" />
              
              {/* Fallback avatar icon inside placeholder */}
              <div className="flex flex-col items-center justify-center text-center p-8 z-20">
                <div className="w-20 h-20 rounded-full border border-brand-border flex items-center justify-center mb-4 bg-brand-bg">
                  <Terminal size={32} className="text-brand-accent" />
                </div>
                <span className="font-mono text-xs text-brand-textPrimary font-semibold mb-2">IMAGE PLACEHOLDER</span>
                <span className="font-mono text-[9px] text-brand-textSecondary/70 uppercase max-w-[180px]">
                  Replace path in `/public/images/profile.jpg`
                </span>
              </div>

              {/* Real image overlay (hidden till path mapped) */}
              <img 
                src="/images/profile.jpg" 
                alt="Bharath Kulal" 
                onError={(e) => e.target.style.display = 'none'} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Soft Shadow Base Glow */}
            <div className="absolute -bottom-4 -left-4 w-full h-full bg-brand-accent/5 rounded-full blur-[80px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
