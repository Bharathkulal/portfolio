import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, Hammer, Sparkles, Terminal } from 'lucide-react';

export default function About({ aboutInfo }) {
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
          {/* Left Column: Technical Terminal Card with badges */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start justify-center">
            <motion.div 
              variants={imageVariants}
              className="relative w-full max-w-[380px] aspect-[4/5] rounded-2xl overflow-hidden border border-brand-border/80 dark:border-brand-border/40 bg-brand-card shadow-lg flex flex-col justify-between p-5 sm:p-6 group transition-all duration-300 hover:border-brand-accent/40"
            >
              {/* Ambient Glows & Tech Grid Background */}
              <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

              {/* Floating top header badge */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="bg-brand-tertiary/90 backdrop-blur-sm border border-brand-border/60 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-sm">
                  <Sparkles size={11} className="text-brand-accent animate-pulse" />
                  <span className="font-mono text-[9px] tracking-wider text-brand-textPrimary font-bold">
                    AI / ML DEVELOPER
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                  <span className="font-mono text-[9px] text-brand-accent font-semibold tracking-wider">LIVE</span>
                </div>
              </div>

              {/* Center: Technical Kernel / Code Visualizer */}
              <div className="relative z-10 my-auto w-full bg-brand-bg/95 border border-brand-border/70 rounded-xl p-4 font-mono text-left shadow-sm">
                <div className="flex items-center justify-between border-b border-brand-border/40 pb-2.5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/80" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[10px] text-brand-textSecondary tracking-wider font-mono">dev_kernel.py</span>
                </div>

                <div className="text-[11px] leading-relaxed space-y-1">
                  <div className="text-brand-textSecondary/70 text-[10px]">// Neural Core Config</div>
                  <div>
                    <span className="text-brand-accent font-semibold">class</span> <span className="text-brand-textPrimary font-bold">BharathKulal</span>:
                  </div>
                  <div className="pl-3 space-y-0.5 text-brand-textSecondary">
                    <div>role = <span className="text-brand-accent font-medium">"AI & ML Builder"</span></div>
                    <div>stack = [<span className="text-brand-textPrimary">"PyTorch"</span>, <span className="text-brand-textPrimary">"React"</span>, <span className="text-brand-textPrimary">"Python"</span>]</div>
                    <div>goal = <span className="text-brand-accent font-medium">"Intelligent Systems"</span></div>
                  </div>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-brand-border/40 flex items-center justify-between text-[9px] text-brand-textSecondary">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Terminal size={11} className="text-brand-accent" />
                    <span>SYS_READY // V3.0</span>
                  </span>
                  <span className="font-mono text-brand-accent font-bold">100% OPERATIONAL</span>
                </div>
              </div>

              {/* Status indicator bottom banner */}
              <div className="relative z-10 w-full bg-brand-tertiary/90 backdrop-blur-sm border border-brand-border/60 rounded-xl py-2 px-3 flex items-center justify-center gap-2 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
                <span className="font-mono text-[10px] text-brand-textPrimary font-semibold tracking-widest uppercase">
                  Building • Learning • Creating
                </span>
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
