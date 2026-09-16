import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function About({ aboutInfo }) {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const name = aboutInfo?.name || 'Bharath Kulal';
  const role = aboutInfo?.education || 'BCA STUDENT & ASPIRING AI ENGINEER';
  const bio = aboutInfo?.bio || "I am a BCA student specializing in Artificial Intelligence & Machine Learning. Passionate about bridging the gap between intelligent algorithms and production web applications. Combining full-stack engineering with modern AI/ML frameworks to build robust, automated systems that solve real-world problems.";
  const portraitImg = '/images/bharath-cutout.png';

  // Subtle 5-10px mouse parallax on desktop
  const handleMouseMove = (e) => {
    if (shouldReduceMotion || window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const x = ((clientX / window.innerWidth) - 0.5) * 14; // max 7px
    const y = ((clientY / window.innerHeight) - 0.5) * 14; // max 7px
    setMousePos({ x, y });
  };

  return (
    <section 
      id="about" 
      onMouseMove={handleMouseMove}
      className="editorial-section min-h-screen w-full bg-brand-bg relative flex items-center justify-center py-20 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-brand-border/40"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[80vh]">
        
        {/* =================================================================== */}
        {/* LEFT COLUMN: Section Label & Number */}
        {/* =================================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-3 flex flex-col justify-between h-full text-left"
        >
          <div>
            <span className="editorial-tag text-xs text-brand-accent tracking-[0.25em] font-semibold block mb-4">
              // PROFILE
            </span>
            <h2 className="editorial-title text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-textPrimary uppercase leading-none">
              ABOUT<br />ME
            </h2>
          </div>

          <div className="mt-8 lg:mt-32">
            <span className="editorial-number text-6xl sm:text-7xl lg:text-8xl font-light text-brand-textSecondary/25 tracking-tighter block">
              01
            </span>
            <span className="font-mono text-[10px] tracking-widest text-brand-textSecondary uppercase mt-2 block">
              BHARATH KULAL
            </span>
          </div>
        </motion.div>

        {/* =================================================================== */}
        {/* CENTER COLUMN: Portrait Cutout */}
        {/* =================================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex items-center justify-center relative my-4 lg:my-0"
        >
          <motion.div
            style={{
              x: mousePos.x,
              y: mousePos.y,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] aspect-[3/4] flex items-end justify-center select-none"
          >
            {/* Clean Portrait Image without bloated frames */}
            <img 
              src={portraitImg} 
              alt={name} 
              className="h-full w-auto object-contain object-bottom filter drop-shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
              loading="lazy"
            />
            
            {/* Subtle soft grounding shadow at the bottom */}
            <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: Personal Introduction & Metadata */}
        {/* =================================================================== */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-center text-left"
        >
          {/* Main Name Heading */}
          <h3 className="editorial-title text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-textPrimary mb-3 uppercase">
            I'M BHARATH.
          </h3>

          {/* Role Subtitle */}
          <div className="font-mono text-xs sm:text-sm text-brand-accent font-medium tracking-wider uppercase mb-6">
            {role}
          </div>

          {/* Bio Narrative */}
          <p className="font-sans text-sm sm:text-base text-brand-textSecondary leading-relaxed mb-8 max-w-xl font-normal">
            {bio}
          </p>

          {/* Clean Metadata Grid */}
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-brand-border/60">
            <div>
              <span className="editorial-tag text-[10px] text-brand-textSecondary/70 block mb-1">
                EDUCATION
              </span>
              <p className="font-mono text-xs text-brand-textPrimary font-medium">
                BCA (AI & ML) • 2025–28
              </p>
              <span className="text-[11px] text-brand-textSecondary block mt-0.5">
                Dr. B.B. Hegde College
              </span>
            </div>

            <div>
              <span className="editorial-tag text-[10px] text-brand-textSecondary/70 block mb-1">
                LOCATION / STATUS
              </span>
              <p className="font-mono text-xs text-brand-textPrimary font-medium">
                Karnataka, India
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                <span className="font-mono text-[10px] text-brand-accent">Available for Projects</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
