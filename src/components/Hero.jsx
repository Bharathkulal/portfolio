import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import TypingText from './TypingText';
import { useTheme } from '../context/ThemeContext';

export default function Hero({ aboutInfo }) {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: [0.215, 0.61, 0.355, 1], delay: 0.15 }
    }
  };

  const name = aboutInfo?.name || 'Bharath Kulal';
  const subtitle = aboutInfo?.education || 'AI / ML Developer · Full-Stack Builder';
  const introduction = aboutInfo?.shortIntro || 'I build with AI, solve real-world problems, and create modern digital experiences.';
  const profilePic = theme === 'dark' 
    ? (aboutInfo?.profileImage || '/images/profile.jpg') 
    : '/images/profile-light.jpg';

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex flex-col lg:flex-row items-stretch overflow-hidden"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Left Column: Text Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left px-6 sm:px-12 lg:px-20 pt-28 pb-16 lg:py-12 z-10 relative">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start w-full"
        >
          {/* Technical Tag */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 border border-brand-border bg-brand-card px-3.5 py-1.5 rounded-full mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse shadow-[0_0_8px_rgba(0,255,136,0.6)]"></span>
            <span className="font-mono text-[10px] tracking-widest text-brand-textSecondary uppercase">SYSTEM_INIT // B.KULAL_PORTFOLIO</span>
          </motion.div>

          {/* Small intro text */}
          <motion.p 
            variants={itemVariants}
            className="font-sans text-xs md:text-sm text-brand-textSecondary/80 mb-2 tracking-wide font-medium"
          >
            Hey, I’m
          </motion.p>

          {/* Name & Titles */}
          <motion.h1 
            variants={itemVariants}
            className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-brand-textPrimary mb-4"
          >
            {name}
          </motion.h1>

          <motion.div 
            variants={itemVariants}
            className="font-mono text-sm md:text-base text-brand-accent font-medium mb-6 tracking-wide"
          >
            {subtitle}
          </motion.div>

          <TypingText 
            text={introduction}
            className="font-sans text-base md:text-lg text-brand-textSecondary leading-relaxed max-w-xl mb-10 font-normal"
          />

          {/* Call to Actions */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <motion.a 
              href="#projects" 
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 bg-brand-accent text-brand-bg px-7 py-3.5 rounded-full font-medium text-sm transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-brand-accent/20 cursor-pointer"
            >
              Explore My Work 
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </motion.a>

            <motion.a 
              href="#contact"
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 border border-brand-border bg-brand-card/70 hover:bg-brand-tertiary text-brand-textPrimary hover:border-brand-accent/40 px-7 py-3.5 rounded-full font-medium text-sm transition-all cursor-pointer"
            >
              Get In Touch 
              <Terminal size={14} className="text-brand-accent" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Column: Visual Frame */}
      <div className="w-full lg:w-1/2 relative min-h-[45vh] lg:min-h-0 h-auto lg:h-screen z-10">
        <motion.div 
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 w-full h-full overflow-hidden group"
        >
          <img 
            src={profilePic} 
            alt={name} 
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
          />
          {/* Subtle gradient overlay to blend picture with background on left/bottom edges */}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-brand-bg via-transparent to-transparent opacity-95 pointer-events-none lg:w-1/3 h-full" />
        </motion.div>
      </div>
    </section>
  );
}
