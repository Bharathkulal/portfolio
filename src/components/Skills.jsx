import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Sparkles, Terminal, Code2, Layers } from 'lucide-react';

// Premium SVG Logos for the Technology Orbit
const getTechIcon = (name) => {
  const normalized = name.toLowerCase();

  if (normalized === 'html5') {
    return (
      <svg className="w-5 h-5 fill-current text-[#E34F26]" viewBox="0 0 24 24">
        <path d="M1.5 0h21l-1.9 21.2L12 24 3.4 21.2 1.5 0zm16.5 6.3H7.5l.2 2.5h8.6l-.3 3.5-3.8 1.2-3.8-1.2-.2-2.5H6.2l.4 4.8 5.4 1.8 5.4-1.8.6-6.8z"/>
      </svg>
    );
  }
  if (normalized === 'css3') {
    return (
      <svg className="w-5 h-5 fill-current text-[#1572B6]" viewBox="0 0 24 24">
        <path d="M1.5 0h21l-1.9 21.2L12 24 3.4 21.2 1.5 0zm16.5 6.3H7.5l.2 2.5h8.6l-.3 3.5-3.8 1.2-3.8-1.2-.2-2.5H6.2l.4 4.8 5.4 1.8 5.4-1.8.6-6.8z"/>
      </svg>
    );
  }
  if (normalized === 'javascript') {
    return (
      <svg className="w-5 h-5 fill-current text-[#F7DF1E] rounded-sm" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0V0zm19.3 16.5c-.7-.8-1.7-1.1-2.9-1.1-1.3 0-2.1.5-2.1 1.3 0 1.2 1.7 1.4 3 2.1 1.7.9 2.5 1.8 2.5 3.7 0 2.2-1.7 3.5-4.4 3.5-2.6 0-4-1.2-4.6-2.5l2-1.2c.4.8 1.1 1.4 2.5 1.4 1.2 0 1.7-.5 1.7-1.1 0-1.1-1.2-1.3-2.6-2-1.9-.9-2.9-1.9-2.9-3.7 0-2 1.6-3.4 4-3.4 2.2 0 3.5.9 4.1 2.2l-2.1 1.3zM9.2 14v10H6.2V14.1h3z"/>
      </svg>
    );
  }
  if (normalized === 'react') {
    return (
      <svg className="w-5 h-5 fill-current text-[#61DAFB] animate-[spin_20s_linear_infinite]" viewBox="0 0 24 24">
        <path d="M24 12c0-1-.8-2-2-3 1.2-1 2-2 2-3 0-1.1-.9-2-2-2-1.2 0-2.3.8-3 2-.8-1.2-1.8-2-3-2-1.1 0-2 .9-2 2 0 1 .8 2 2 3-1.2 1-2 2-2 3 0 1.1.9 2 2 2 1.2 0 2.3-.8 3-2 .8 1.2 1.8 2 3 2 1.1 0 2-.9 2-2zm-12 0c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3z"/>
      </svg>
    );
  }
  if (normalized === 'vite') {
    return (
      <svg className="w-5 h-5 fill-current text-[#646CFF]" viewBox="0 0 24 24">
        <path d="M12 0L1.7 6.3 3.5 18 12 24l8.5-6L22.3 6.3 12 0zm1.7 13.8h-4.3l3.4-6.8-6 1.7L12 5.1l-1.7 6h4.3L11.2 18l6-4.2z"/>
      </svg>
    );
  }
  if (normalized === 'tailwind css') {
    return (
      <svg className="w-5 h-5 fill-current text-[#38BDF8]" viewBox="0 0 24 24">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 5.999 12z"/>
      </svg>
    );
  }

  // Backend
  if (normalized === 'node.js') {
    return (
      <svg className="w-5 h-5 fill-current text-[#339933]" viewBox="0 0 24 24">
        <path d="M12 0L1.7 6v12L12 24l10.3-6V6L12 0zm-1.7 18.5V13.8L5.1 11v-3.7l5.2 2.8v8.4zm5.2 0V11l5.2-2.8V11l-5.2 7.5z"/>
      </svg>
    );
  }
  if (normalized === 'express.js') {
    return <Layers className="w-5 h-5 text-brand-textSecondary" />;
  }
  if (normalized === 'fastapi') {
    return (
      <svg className="w-5 h-5 fill-current text-[#009688]" viewBox="0 0 24 24">
        <path d="M12 0L1.7 6v12L12 24l10.3-6V6L12 0zm1.7 13.8L8.5 11h5.2l-5.2 7.5V11h5.2l-5.2 2.8z"/>
      </svg>
    );
  }
  if (normalized === 'rest api') {
    return <Code2 className="w-5 h-5 text-brand-blue" />;
  }

  // Database
  if (normalized === 'mongodb') {
    return (
      <svg className="w-5 h-5 fill-current text-[#47A248]" viewBox="0 0 24 24">
        <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    );
  }
  if (normalized === 'mysql') {
    return (
      <svg className="w-5 h-5 fill-current text-[#4479A1]" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm3.8 15.5H8.2V8.5h7.6v7zm0-8.5H8.2V5.5h7.6V7z"/>
      </svg>
    );
  }
  if (normalized === 'postgresql') {
    return (
      <svg className="w-5 h-5 fill-current text-[#336791]" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm4.5 17.5h-9v-2.5h9v2.5zm0-4.5h-9v-2.5h9v2.5zm0-4.5h-9V6h9v2.5z"/>
      </svg>
    );
  }

  // AI / ML Tools
  if (normalized === 'python') {
    return (
      <svg className="w-5 h-5 fill-current text-[#3776AB]" viewBox="0 0 24 24">
        <path d="M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0zm-1.8 3h3.6v3.6h-3.6V3zm3.6 14.4h-3.6V13.8h3.6v3.6zm1.8-3.6h-7.2V9h7.2v5.4z"/>
      </svg>
    );
  }
  if (normalized === 'openai') {
    return (
      <svg className="w-5 h-5 fill-current text-brand-textPrimary" viewBox="0 0 24 24">
        <path d="M21.3 10.3c.1-.5.1-1.1-.1-1.6-.3-.9-.9-1.6-1.7-2.1-.4-.2-.8-.4-1.3-.4-.1-.5-.4-1-.7-1.4-.7-.9-1.8-1.5-3-1.6-.5-.1-1.1 0-1.6.2-.3-.5-.7-.9-1.2-1.2C10.7.1 9.3-.2 8 .1c-.6.1-1.2.4-1.7.8-.5-.1-1.1-.1-1.6.1C3.8 1.4 3 2.3 2.6 3.4c-.2.5-.3 1-.3 1.6-.5.1-1 .4-1.4.7-.9.7-1.5 1.8-1.6 3-.1.5 0 1.1.2 1.6.3.5.7.9 1.2 1.2-.1.5-.1 1.1.1 1.6.3.9.9 1.6 1.7 2.1.4.2.8.4 1.3.4.1.5.4 1 .7 1.4.7.9 1.8 1.5 3 1.6.5.1 1.1 0 1.6-.2.3.5.7.9 1.2 1.2 1.1.6 2.5.9 3.8.6.6-.1 1.2-.4 1.7-.8.5.1 1.1.1 1.6-.1 1.9-.4 2.7-1.3 3.1-2.4.2-.5.3-1 .3-1.6.5-.1 1-.4 1.4-.7.9-.7 1.5-1.8 1.6-3 .1-.5 0-1.1-.2-1.6-.3-.5-.7-.9-1.2-1.2zM12 15c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
      </svg>
    );
  }
  if (normalized === 'google gemini') {
    return (
      <svg className="w-5 h-5 fill-current text-[#4285F4]" viewBox="0 0 24 24">
        <path d="M12 0L8.7 8.7 0 12l8.7 3.3L12 24l3.3-8.7L24 12l-8.7-3.3L12 0z"/>
      </svg>
    );
  }
  if (normalized === 'tensorflow') {
    return (
      <svg className="w-5 h-5 fill-current text-[#FF6F00]" viewBox="0 0 24 24">
        <path d="M12 0L1.7 6v12L12 24l10.3-6V6L12 0zm0 4.3l6.9 4v7.4l-6.9 4-6.9-4V8.3l6.9-4zm0 2.5l-4.3 2.5v5l4.3 2.5 4.3-2.5v-5L12 6.8z"/>
      </svg>
    );
  }
  if (normalized === 'scikit-learn') {
    return (
      <svg className="w-5 h-5 fill-current text-[#F7931E]" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm-1.8 17.5h-2.5v-2.5h2.5v2.5zm0-4.5h-2.5v-2.5h2.5v2.5zm4.5 4.5h-2.5v-2.5h2.5v2.5zm0-4.5h-2.5v-2.5h2.5v2.5z"/>
      </svg>
    );
  }
  if (normalized === 'generative ai') {
    return <Sparkles className="w-5 h-5 text-brand-accent animate-pulse" />;
  }
  if (normalized === 'machine learning') {
    return <Cpu className="w-5 h-5 text-brand-blue" />;
  }

  // Developer Tools
  if (normalized === 'visual studio code') {
    return (
      <svg className="w-5 h-5 fill-current text-[#007ACC]" viewBox="0 0 24 24">
        <path d="M23.9 6.5l-2.6-2.4c-.1-.1-.3-.1-.4 0L12 11.2 5.1 4.1c-.1-.1-.3-.1-.4 0L.8 6.5c-.1.1-.1.3 0 .4L5.6 12 .8 17.1c-.1.1-.1.3 0 .4l3.9 3.5c.1.1.3.1.4 0L12 12.8l6.9 8.2c.1.1.3.1.4 0l2.6-2.4c.1-.1.1-.3 0-.4L18.4 12l4.8-5.1c.1-.1.1-.3 0-.4z"/>
      </svg>
    );
  }
  if (normalized === 'cursor') {
    return <Terminal className="w-5 h-5 text-brand-accent animate-pulse" />;
  }
  if (normalized === 'antigravity') {
    return <Terminal className="w-5 h-5 text-brand-blue" />;
  }
  if (normalized === 'canva') {
    return (
      <svg className="w-5 h-5 fill-current text-[#00C4CC]" viewBox="0 0 24 24">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.1 14.5c-.3.4-.8.7-1.4.9-.7.2-1.5.3-2.4.3h-4.3v-7h4.3c.9 0 1.7.1 2.4.3.6.2 1.1.5 1.4.9.3.4.5.9.5 1.6s-.2 1.2-.5 1.6l-.4.4z"/>
      </svg>
    );
  }
  if (normalized === 'git') {
    return (
      <svg className="w-5 h-5 fill-current text-[#F05032]" viewBox="0 0 24 24">
        <path d="M23.6 11.4L12.6.4C12.1-.1 11.3-.1 10.8.4L8.4 2.8l3 3c.6-.2 1.3 0 1.8.5.5.5.7 1.2.5 1.8l3 3c.6-.2 1.3 0 1.8.5.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.5-.5-.7-1.2-.5-1.8l-3-3c-.2.1-.4.2-.6.2-.2 0-.4-.1-.6-.2l-3 3c.2.6 0 1.3-.5 1.8-.7.7-1.8.7-2.5 0s-.7-1.8 0-2.5c.5-.5 1.2-.7 1.8-.5l3-3C8.2 8 8.1 7.8 8.1 7.6c0-.2.1-.4.2-.6L5.9 4.6 1.4 9.1c-.5.5-.5 1.3 0 1.8l11 11c.5.5 1.3.5 1.8 0l9.4-9.4c.5-.5.5-1.4 0-2.1z"/>
      </svg>
    );
  }
  if (normalized === 'github') {
    return (
      <svg className="w-5 h-5 fill-current text-brand-textPrimary" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    );
  }

  return <Code2 className="w-5 h-5 text-brand-textSecondary" />;
};

// 3 Concentric Rings mapping: Ring 1 (Inner), Ring 2 (Middle), Ring 3 (Outer)
const ring1 = [
  { name: 'Python', catNum: '04', catName: 'AI / ML' },
  { name: 'OpenAI', catNum: '04', catName: 'AI / ML' },
  { name: 'Google Gemini', catNum: '04', catName: 'AI / ML' },
  { name: 'TensorFlow', catNum: '04', catName: 'AI / ML' },
  { name: 'scikit-learn', catNum: '04', catName: 'AI / ML' },
  { name: 'Generative AI', catNum: '04', catName: 'AI / ML' }
];

const ring2 = [
  { name: 'Node.js', catNum: '02', catName: 'Backend' },
  { name: 'Express.js', catNum: '02', catName: 'Backend' },
  { name: 'FastAPI', catNum: '02', catName: 'Backend' },
  { name: 'REST API', catNum: '02', catName: 'Backend' },
  { name: 'MongoDB', catNum: '03', catName: 'Database' },
  { name: 'MySQL', catNum: '03', catName: 'Database' },
  { name: 'PostgreSQL', catNum: '03', catName: 'Database' },
  { name: 'Git', catNum: '05', catName: 'Tools' },
  { name: 'GitHub', catNum: '05', catName: 'Tools' }
];

const ring3 = [
  { name: 'HTML5', catNum: '01', catName: 'Frontend' },
  { name: 'CSS3', catNum: '01', catName: 'Frontend' },
  { name: 'JavaScript', catNum: '01', catName: 'Frontend' },
  { name: 'React', catNum: '01', catName: 'Frontend' },
  { name: 'Vite', catNum: '01', catName: 'Frontend' },
  { name: 'Tailwind CSS', catNum: '01', catName: 'Frontend' },
  { name: 'Antigravity', catNum: '05', catName: 'Tools' },
  { name: 'Cursor', catNum: '05', catName: 'Tools' },
  { name: 'Visual Studio Code', catNum: '05', catName: 'Tools' },
  { name: 'Canva', catNum: '05', catName: 'Tools' }
];

export default function Skills() {
  const [hoveredTech, setHoveredTech] = useState(null);
  const [isHoveringAny, setIsHoveringAny] = useState(false);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  };
  // Helper to render concentric rings of cards
  const renderOrbitRing = (ringItems, radius, animationClass, reverseAnimationClass, depthScaleOffset) => {
    return (
      <div 
        className={`absolute inset-0 flex items-center justify-center pointer-events-none ${animationClass}`}
        style={{ animationPlayState: isHoveringAny ? 'paused' : 'running' }}
      >
        {ringItems.map((item, idx) => {
          const total = ringItems.length;
          const angle = (idx * 2 * Math.PI) / total;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          // Calculate a simple depth factor based on position to create a premium depth illusion
          // Items at the bottom/front (y > 0) are slightly larger and brighter
          const isFront = y > 0;
          const depthScale = isFront ? 1.02 : 0.95;
          const depthOpacity = isFront ? 'opacity-100' : 'opacity-85';

          const isHovered = hoveredTech === item.name;
          const isDimmed = hoveredTech && hoveredTech !== item.name;

          // Normalize z-index range (15 to 45) to ensure it sits above SVG background (z-10) and below central core (z-50)
          const baseZIndex = 15 + Math.round(((y + 320) / 640) * 30);

          return (
            <div
              key={item.name}
              className="absolute transition-all duration-300 pointer-events-none"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                zIndex: isHovered ? 100 : baseZIndex
              }}
            >
              {/* Counter-rotating card container keeping names upright */}
              <div 
                className={`${reverseAnimationClass} transition-all duration-300`}
                style={{ 
                  animationPlayState: isHoveringAny ? 'paused' : 'running',
                  transform: isHovered ? 'scale(1.08)' : `scale(${depthScale})`
                }}
              >
                <div
                  onMouseEnter={() => {
                    setHoveredTech(item.name);
                    setIsHoveringAny(true);
                  }}
                  onMouseLeave={() => {
                    setHoveredTech(null);
                    setIsHoveringAny(false);
                  }}
                  className={`pointer-events-auto flex items-center gap-3.5 bg-brand-card border rounded-xl h-[56px] px-5 transition-all duration-300 group/card cursor-pointer shadow-sm ${depthOpacity} ${
                    isHovered 
                      ? 'border-brand-accent shadow-[0_0_20px_-2px_rgba(0,255,136,0.25)] bg-brand-card opacity-100 scale-105' 
                      : isDimmed 
                        ? 'opacity-40 border-brand-border/20' 
                        : 'border-brand-border/80 dark:border-brand-border/40 hover:border-brand-accent/60'
                  }`}
                >
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-brand-tertiary border border-brand-border/50 group-hover/card:scale-105 transition-transform duration-300 text-brand-textSecondary group-hover/card:text-brand-accent">
                    {getTechIcon(item.name)}
                  </div>
                  <span className="font-sans font-semibold text-xs text-brand-textPrimary dark:text-brand-textSecondary group-hover/card:text-brand-accent transition-colors duration-300">
                    {item.name}
                  </span>

                  {/* Tooltip containing category indicator on Hover */}
                  {isHovered && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded bg-black/90 border border-brand-accent/30 text-[9px] tracking-widest font-mono text-brand-accent uppercase shadow-lg select-none whitespace-nowrap z-50 pointer-events-none">
                      {item.catNum} {item.catName}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const activeTechDetails = hoveredTech 
    ? [...ring1, ...ring2, ...ring3].find(t => t.name === hoveredTech)
    : null;

  return (
    <section id="skills" className="py-24 bg-brand-bg relative overflow-hidden">
      {/* Background decoration line */}
      <div className="absolute top-0 right-1/4 w-px h-full bg-brand-border/5 pointer-events-none" />

      <div className="w-full px-6 sm:px-12 lg:px-20 mx-auto relative z-10 text-left">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col mb-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs text-brand-accent tracking-widest uppercase">
                02 / WHAT I WORK WITH
              </span>
              <div className="h-px flex-grow bg-brand-border/40" />
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-brand-textPrimary mt-4 mb-6 leading-tight tracking-tight">
              What I work with.
            </h2>
            <p className="font-sans text-sm md:text-base text-brand-textSecondary leading-relaxed">
              Technologies and tools I use to build intelligent, real-world products.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Orbit Visualization Canvas Container */}
      <div className="relative w-full flex justify-center items-center py-20 overflow-hidden min-h-[500px] md:min-h-[720px] select-none">
        
        {/* Responsive scaling wrapper */}
        <div className="relative flex items-center justify-center w-[720px] h-[720px] scale-[0.45] xs:scale-[0.55] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 transition-transform duration-500">
          
          {/* Central AI/ML core with dynamic text dashboard */}
          <div className="absolute w-44 h-44 rounded-full bg-brand-card border-2 border-brand-accent/50 shadow-[0_0_35px_rgba(0,255,136,0.15)] z-50 flex flex-col justify-center items-center text-center p-4">
            <div className="absolute inset-0 bg-brand-accent/10 rounded-full blur-xl animate-pulse pointer-events-none" />
            
            {activeTechDetails ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="z-10 font-sans"
              >
                <span className="font-mono text-[9px] tracking-widest text-brand-accent block mb-1 font-bold">
                  {activeTechDetails.catNum} // {activeTechDetails.catName.toUpperCase()}
                </span>
                <span className="text-lg font-bold text-brand-textPrimary block truncate max-w-[130px]">
                  {activeTechDetails.name}
                </span>
                <span className="font-mono text-[8px] text-brand-textPrimary dark:text-brand-textSecondary block mt-1 tracking-wide animate-pulse font-semibold">
                  SYSTEM_FOCUSED
                </span>
              </motion.div>
            ) : (
              <div className="z-10 font-sans">
                <span className="text-xl font-bold tracking-wider text-brand-accent block">
                  AI / ML
                </span>
                <span className="font-mono text-[10px] text-brand-textPrimary dark:text-brand-textSecondary tracking-widest uppercase block mt-1 font-bold">
                  BHARATH KULAL
                </span>
              </div>
            )}
          </div>

          {/* SVG Orbit Tracks Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70">
            {/* Connection Radial Lines */}
            <circle cx="360" cy="360" r="140" fill="none" stroke="var(--text)" strokeWidth="1" strokeDasharray="3 6" className="opacity-25 dark:opacity-35" />
            <circle cx="360" cy="360" r="230" fill="none" stroke="var(--text)" strokeWidth="1.2" strokeDasharray="4 8" className="opacity-30 dark:opacity-40" />
            <circle cx="360" cy="360" r="320" fill="none" stroke="var(--text)" strokeWidth="1" strokeDasharray="3 6" className="opacity-25 dark:opacity-35" />
          </svg>

          {/* Ring 1 (Inner): AI / ML technologies (Radius: 140px, rotates clockwise) */}
          {renderOrbitRing(ring1, 140, 'animate-orbit-clockwise', 'animate-orbit-counter-clockwise')}

          {/* Ring 2 (Middle): Backend & Database (Radius: 230px, rotates counter-clockwise) */}
          {renderOrbitRing(ring2, 230, 'animate-orbit-counter-clockwise', 'animate-orbit-clockwise')}

          {/* Ring 3 (Outer): Frontend (Radius: 320px, rotates clockwise) */}
          {renderOrbitRing(ring3, 320, 'animate-orbit-clockwise', 'animate-orbit-counter-clockwise')}

        </div>
      </div>

      {/* Global CSS adjustments */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-orbit-clockwise, .animate-orbit-counter-clockwise {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
