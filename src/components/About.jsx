import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Brain, Database, Hammer, Sparkles } from 'lucide-react';

export default function About({ aboutInfo }) {
  const { theme } = useTheme();

  const profilePic = theme === 'dark' 
    ? (aboutInfo?.profileImage || '/images/profile.jpg') 
    : '/images/profile-light.jpg';

  const goal = "Turning Ideas Into Intelligent Solutions.";
  const bioText = aboutInfo?.bio || "I am a BCA student specializing in Artificial Intelligence & Machine Learning. I am deeply passionate about bridging the gap between intelligent algorithms and user-facing applications. By combining full-stack development expertise with modern AI/ML frameworks, I design and build robust, automated systems that solve real-world problems.";

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const cardsData = [
    {
      icon: <Brain className="text-brand-accent" size={18} />,
      title: "AI / ML",
      description: "Machine Learning • Generative AI • Computer Vision"
    },
    {
      icon: <Database className="text-brand-blue" size={18} />,
      title: "Full Stack",
      description: "React • Node.js • Python • APIs"
    },
    {
      icon: <Hammer className="text-brand-accent" size={18} />,
      title: "Builder Mindset",
      description: "Projects • Problem Solving • Continuous Learning"
    }
  ];

  return (
    <section id="about" className="py-28 px-6 md:px-12 bg-brand-bg relative transition-colors duration-300">
      <div className="w-full px-6 sm:px-12 lg:px-20 mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: Portrait image with badges */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start justify-center">
            <motion.div 
              variants={imageVariants}
              className="relative w-full max-w-[380px] aspect-[4/5] rounded-2xl overflow-hidden border border-brand-border bg-brand-tertiary/20 shadow-md group"
            >
              <img 
                src={profilePic} 
                alt="Bharath Kulal" 
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
              
              {/* Floating top badge */}
              <div className="absolute top-4 left-4 bg-brand-card/90 backdrop-blur-sm border border-brand-border/60 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-sm">
                <Sparkles size={11} className="text-brand-accent animate-pulse" />
                <span className="font-mono text-[9px] tracking-wider text-brand-textPrimary font-bold">
                  AI / ML DEVELOPER
                </span>
              </div>

              {/* Status indicator bottom banner */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-5 pt-10 flex flex-col gap-1 items-center justify-center">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
                  <span className="font-mono text-[10px] text-white tracking-widest uppercase">
                    Building • Learning • Creating
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bio and Cards */}
          <div className="lg:col-span-7 text-left flex flex-col justify-center">
            {/* Eyebrow */}
            <motion.span 
              variants={itemVariants}
              className="font-mono text-xs text-brand-accent tracking-widest uppercase font-semibold block mb-3"
            >
              ABOUT ME
            </motion.span>

            {/* Title */}
            <motion.h2 
              variants={itemVariants}
              className="font-serif text-4xl md:text-5xl font-bold text-brand-textPrimary mb-6 leading-tight tracking-tight"
            >
              {goal}
            </motion.h2>

            {/* Bio Paragraph */}
            <motion.p 
              variants={itemVariants}
              className="font-sans text-sm md:text-base text-brand-textSecondary leading-relaxed mb-8 max-w-2xl font-normal"
            >
              {bioText}
            </motion.p>

            {/* Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {cardsData.map((card, index) => (
                <motion.div 
                  key={card.title}
                  variants={itemVariants}
                  whileHover={{ y: -4, shadow: 'md' }}
                  className="p-5 bg-brand-card border border-brand-border/80 dark:border-brand-border/40 rounded-xl flex flex-col items-start text-left transition-all duration-300 group shadow-sm hover:border-brand-accent/50 cursor-default"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-tertiary flex items-center justify-center mb-4 transition-colors group-hover:bg-brand-accent/10">
                    {card.icon}
                  </div>
                  <h3 className="font-sans font-bold text-brand-textPrimary text-sm mb-2">
                    {card.title}
                  </h3>
                  <p className="font-sans text-[11px] leading-relaxed text-brand-textSecondary">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
