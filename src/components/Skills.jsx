import React from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../data/portfolioData';
import { Brain, Cpu, Database, HardDrive, Terminal, Code2 } from 'lucide-react';

// Mapper to return corresponding inline SVGs or Lucide graphics for each skill with subtle colors
const getSkillIcon = (skillName) => {
  const name = skillName.toLowerCase();

  // HTML5
  if (name === 'html') {
    return (
      <svg className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
        <path d="M1.5 0h21l-1.9 21.2L12 24 3.4 21.2 1.5 0zm16.5 6.3H7.5l.2 2.5h8.6l-.3 3.5-3.8 1.2-3.8-1.2-.2-2.5H6.2l.4 4.8 5.4 1.8 5.4-1.8.6-6.8z"/>
      </svg>
    );
  }

  // CSS3
  if (name === 'css') {
    return (
      <svg className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
        <path d="M1.5 0h21l-1.9 21.2L12 24 3.4 21.2 1.5 0zm16.5 6.3H7.5l.2 2.5h8.6l-.3 3.5-3.8 1.2-3.8-1.2-.2-2.5H6.2l.4 4.8 5.4 1.8 5.4-1.8.6-6.8z"/>
      </svg>
    );
  }

  // JavaScript
  if (name.includes('javascript')) {
    return (
      <svg className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0V0zm19.3 16.5c-.7-.8-1.7-1.1-2.9-1.1-1.3 0-2.1.5-2.1 1.3 0 1.2 1.7 1.4 3 2.1 1.7.9 2.5 1.8 2.5 3.7 0 2.2-1.7 3.5-4.4 3.5-2.6 0-4-1.2-4.6-2.5l2-1.2c.4.8 1.1 1.4 2.5 1.4 1.2 0 1.7-.5 1.7-1.1 0-1.1-1.2-1.3-2.6-2-1.9-.9-2.9-1.9-2.9-3.7 0-2 1.6-3.4 4-3.4 2.2 0 3.5.9 4.1 2.2l-2.1 1.3zM9.2 14v10H6.2V14.1h3z"/>
      </svg>
    );
  }

  // React
  if (name.includes('react')) {
    return (
      <svg className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100 transition-opacity animate-[spin_12s_linear_infinite]" viewBox="0 0 24 24">
        <path d="M24 12c0-1-.8-2-2-3 1.2-1 2-2 2-3 0-1.1-.9-2-2-2-1.2 0-2.3.8-3 2-.8-1.2-1.8-2-3-2-1.1 0-2 .9-2 2 0 1 .8 2 2 3-1.2 1-2 2-2 3 0 1.1.9 2 2 2 1.2 0 2.3-.8 3-2 .8 1.2 1.8 2 3 2 1.1 0 2-.9 2-2zm-12 0c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3z"/>
      </svg>
    );
  }

  // Python
  if (name.includes('python')) {
    return (
      <svg className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 448 512">
        <path d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-68.6 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.7c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-24.9h180.7c26.8 0 33.3-17.1 33.3-33.8V254.7c.1-23-4-39.6-20.4-54.2zM286.2 390.6c-11.4 0-20.6-9.2-20.6-20.6 0-11.4 9.2-20.6 20.6-20.6 11.4 0 20.6 9.2 20.6 20.6.1 11.4-9.1 20.6-20.6 20.6zM172.7 243.9h154.7v-47.4c0-29.2-25.2-46-53.4-54.3-33.8-9.9-66.3-11.7-106.8 0-26.9 7.8-53.4 23.5-53.4 54.3v40.7h106.8v24.9H40.1c-26.8 0-33.3 17.1-33.3 33.8v106.8c0 23 4.1 39.6 20.4 54.2 7.7 30.9 22.3 54.2 53.4 54.2h40.1v-47.4c0-36.8 31.2-67.8 68.6-67.8h104.9c29.2 0 53.4-25 53.4-54.3V243.9H172.7zM161.8 121.4c-11.4 0-20.6-9.2-20.6-20.6 0-11.4 9.2-20.6 20.6-20.6 11.4 0 20.6 9.2 20.6 20.6 0 11.4-9.2 20.6-20.6 20.6z"/>
      </svg>
    );
  }

  // C Language
  if (name === 'c') {
    return (
      <svg className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12c4.1 0 7.8-2.1 9.9-5.4l-2.6-1.5c-1.6 2.5-4.4 4.1-7.3 4.1-4.9 0-8.9-4-8.9-8.9s4-8.9 8.9-8.9c3 0 5.7 1.6 7.3 4.1l2.6-1.5C19.8 2.1 16.1 0 12 0z"/>
      </svg>
    );
  }

  // Java
  if (name === 'java') {
    return (
      <svg className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
        <path d="M12 0c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm-3.8 18.3c0-.6.4-1.1.9-1.4.5-.3 1-.4 1.5-.5.7-.1 1.4-.2 2.1-.3.9-.1 1.7-.2 2.5-.4.4-.1.8-.2 1-.4.2-.2.3-.5.3-.8 0-.4-.2-.8-.7-1-.5-.2-1.1-.3-1.9-.3-1 0-1.8.2-2.3.6-.3.2-.5.5-.6.9h-1.7c0-.7.3-1.4.9-1.9.6-.5 1.5-.8 2.7-.8 1.2 0 2.2.2 2.9.7.7.5 1.1 1.1 1.1 1.9 0 .6-.2 1.1-.6 1.4-.4.3-.9.5-1.5.6-.7.1-1.4.2-2 .3-.9.1-1.7.2-2.5.4-.4.1-.7.2-.9.4-.2.2-.3.5-.3.8 0 .4.2.8.7 1 .5.2 1.1.3 1.9.3 1.1 0 1.9-.2 2.4-.6.3-.2.5-.5.6-.9h1.7c0 .7-.3 1.4-.9 1.9-.6.5-1.5.8-2.7.8-1.3 0-2.3-.2-3-.7-.7-.5-1.1-1.1-1.1-1.9z"/>
      </svg>
    );
  }

  // MySQL
  if (name.includes('mysql')) {
    return (
      <svg className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm3.8 15.5H8.2V8.5h7.6v7zm0-8.5H8.2V5.5h7.6V7z"/>
      </svg>
    );
  }

  // MongoDB
  if (name.includes('mongodb')) {
    return (
      <svg className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
        <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    );
  }

  // Git
  if (name === 'git') {
    return (
      <svg className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
        <path d="M23.6 11.4L12.6.4C12.1-.1 11.3-.1 10.8.4L8.4 2.8l3 3c.6-.2 1.3 0 1.8.5.5.5.7 1.2.5 1.8l3 3c.6-.2 1.3 0 1.8.5.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.5-.5-.7-1.2-.5-1.8l-3-3c-.2.1-.4.2-.6.2-.2 0-.4-.1-.6-.2l-3 3c.2.6 0 1.3-.5 1.8-.7.7-1.8.7-2.5 0s-.7-1.8 0-2.5c.5-.5 1.2-.7 1.8-.5l3-3C8.2 8 8.1 7.8 8.1 7.6c0-.2.1-.4.2-.6L5.9 4.6 1.4 9.1c-.5.5-.5 1.3 0 1.8l11 11c.5.5 1.3.5 1.8 0l9.4-9.4c.5-.5.5-1.4 0-2.1z"/>
      </svg>
    );
  }

  // VS Code / Cursor / Code
  if (name.includes('code') || name === 'cursor' || name === 'antigravity') {
    return (
      <svg className="w-3.5 h-3.5 fill-current opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
        <path d="M23.9 6.5l-2.6-2.4c-.1-.1-.3-.1-.4 0L12 11.2 5.1 4.1c-.1-.1-.3-.1-.4 0L.8 6.5c-.1.1-.1.3 0 .4L5.6 12 .8 17.1c-.1.1-.1.3 0 .4l3.9 3.5c.1.1.3.1.4 0L12 12.8l6.9 8.2c.1.1.3.1.4 0l2.6-2.4c.1-.1.1-.3 0-.4L18.4 12l4.8-5.1c.1-.1.1-.3 0-.4z"/>
      </svg>
    );
  }

  // AI & ML Generic Brain/Cpu Icons
  if (name.includes('intelligence') || name.includes('generative')) {
    return <Brain className="w-3.5 h-3.5" />;
  }
  if (name.includes('learning') || name.includes('data science')) {
    return <Cpu className="w-3.5 h-3.5" />;
  }

  // Hardware/IoT
  if (name.includes('esp32') || name.includes('gas')) {
    return <HardDrive className="w-3.5 h-3.5" />;
  }

  // Default Fallback
  return <Code2 className="w-3.5 h-3.5" />;
};

const skillCategories = [
  { key: "frontend", title: "FRONTEND", number: "01" },
  { key: "programming", title: "PROGRAMMING LANGUAGES", number: "02" },
  { key: "database", title: "DATABASE SYSTEMS", number: "03" },
  { key: "aiMl", title: "AI / MACHINE LEARNING", number: "04", isCore: true },
  { key: "iot", title: "IOT / HARDWARE", number: "05" },
  { key: "tools", title: "DEVELOPER TOOLS", number: "06" }
];

export default function Skills() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-brand-bg relative overflow-hidden">
      {/* Background decoration line */}
      <div className="absolute top-0 right-1/4 w-px h-full bg-brand-border/5 pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col text-left"
        >
          {/* Section Header */}
          <motion.div variants={headerVariants} className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs text-brand-accent tracking-widest uppercase">
                02 / CAPABILITIES
              </span>
              <div className="h-px flex-grow bg-brand-border/40" />
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-brand-textPrimary mt-4 leading-tight tracking-tight">
              What I work with.
            </h2>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {skillCategories.map((cat) => {
              const list = skillsData[cat.key] || [];
              const isCore = cat.isCore;

              return (
                <motion.div
                  key={cat.key}
                  variants={cardVariants}
                  whileHover={{ 
                    y: -4, 
                    boxShadow: "0 10px 30px -10px rgba(0, 255, 136, 0.03)"
                  }}
                  className={`relative p-6 md:p-8 rounded-3xl transition-all duration-300 border flex flex-col justify-between h-full group ${
                    isCore 
                      ? 'bg-brand-card/65 border-brand-accent/35 shadow-[0_0_15px_-3px_rgba(0,255,136,0.03)]' 
                      : 'bg-brand-card/45 border-brand-border/40 hover:border-brand-accent/25'
                  }`}
                >
                  <div>
                    {/* Card Top Row */}
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-mono text-[10px] text-brand-textSecondary tracking-widest uppercase">
                        {cat.title}
                      </span>
                      <div className="flex items-center gap-2">
                        {isCore && (
                          <span className="font-mono text-[9px] px-2 py-0.5 rounded-full border border-brand-accent/40 bg-brand-accent/5 text-brand-accent tracking-widest font-medium uppercase scale-90">
                            CORE
                          </span>
                        )}
                        <span className="font-mono text-xs text-brand-textSecondary/60">
                          {cat.number}
                        </span>
                      </div>
                    </div>

                    {/* Skill Chips */}
                    <div className="flex flex-wrap gap-2.5">
                      {list.map((skill) => {
                        const isCoreSkill = isCore || skill.includes('React') || skill.includes('Python');
                        return (
                          <motion.span
                            key={skill}
                            whileHover={{ scale: 1.02 }}
                            className={`px-3 py-1.5 rounded-xl text-[11px] md:text-xs font-mono border transition-all duration-200 flex items-center gap-2 group/chip ${
                              isCoreSkill 
                                ? 'bg-brand-accent/5 border-brand-accent/20 text-brand-accent' 
                                : 'bg-brand-tertiary/40 border-brand-border/40 text-brand-textSecondary hover:text-brand-textPrimary hover:border-brand-textSecondary/30'
                            }`}
                          >
                            <span className="text-brand-textSecondary/80 group-hover/chip:text-brand-accent transition-colors flex items-center justify-center">
                              {getSkillIcon(skill)}
                            </span>
                            <span>{skill}</span>
                          </motion.span>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
