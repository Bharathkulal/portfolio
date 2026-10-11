import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, GraduationCap, Sparkles } from 'lucide-react';
import heroImg from '../assets/about-profile-clean.png';

export default function About({ aboutInfo }) {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const name = aboutInfo?.name || 'Bharath Kulal';
  const role = aboutInfo?.education || 'BCA STUDENT & ASPIRING AI ENGINEER';
  const bio = aboutInfo?.bio || "I am a BCA student specializing in Artificial Intelligence & Machine Learning at Dr. B.B. Hegde College. Passionate about bridging the gap between intelligent algorithms and production web applications. Combining full-stack engineering with modern AI/ML frameworks to build robust, automated systems that solve real-world problems.";
  const portraitImg = heroImg;

  // Subtle 5-10px mouse parallax on desktop
  const handleMouseMove = (e) => {
    if (shouldReduceMotion || window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const x = ((clientX / window.innerWidth) - 0.5) * 14;
    const y = ((clientY / window.innerHeight) - 0.5) * 14;
    setMousePos({ x, y });
  };

  return (
    <section 
      id="about" 
      onMouseMove={handleMouseMove}
      className="editorial-section min-h-screen w-full bg-[#080808] text-[#F5F3EF] relative flex items-center justify-center py-24 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-white/[0.06]"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-[80vh]">
        
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
            <span className="editorial-tag text-xs text-[#FF941F] tracking-[0.25em] font-semibold block mb-4">
              // PROFILE
            </span>
            <h2 className="editorial-title text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F5F3EF] uppercase leading-none">
              ABOUT<br />ME
            </h2>
          </div>

          <div className="mt-8 lg:mt-32">
            <span className="editorial-number text-6xl sm:text-7xl lg:text-8xl font-light text-[#929292]/25 tracking-tighter block">
              01
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[#929292] uppercase mt-2 block">
              BHARATH KULAL
            </span>
          </div>
        </motion.div>

        {/* =================================================================== */}
        {/* CENTER COLUMN: Portrait Cutout in Cinematic Frame */}
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
            {/* Ambient backlight */}
            <div className="absolute inset-4 rounded-full bg-[#FF941F]/15 blur-2xl pointer-events-none" />

            {/* Clean Portrait Image */}
            <img 
              src={portraitImg} 
              alt={name} 
              className="h-full w-auto object-contain object-bottom filter contrast-105 brightness-95 saturate-[0.9] drop-shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
              loading="lazy"
            />
            
            {/* Soft grounding shadow */}
            <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent pointer-events-none" />
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
          <h3 className="editorial-title text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#F5F3EF] mb-3 uppercase">
            I'M BHARATH.
          </h3>

          {/* Role Subtitle */}
          <div className="font-mono text-xs sm:text-sm text-[#FF941F] font-semibold tracking-wider uppercase mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF941F]" />
            <span>{role}</span>
          </div>

          {/* Bio Narrative */}
          <p className="font-sans text-sm sm:text-base text-[#929292] leading-relaxed mb-8 max-w-xl font-normal">
            {bio}
          </p>

          {/* Clean Metadata Grid */}
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/[0.08]">
            <div className="p-4 rounded-xl bg-[#111111] border border-white/[0.06]">
              <span className="editorial-tag text-[9px] text-[#FF941F] block mb-1">
                EDUCATION
              </span>
              <p className="font-mono text-xs text-[#F5F3EF] font-semibold">
                BCA (AI & ML)
              </p>
              <span className="text-[11px] text-[#929292] block mt-0.5">
                Dr. B.B. Hegde College • 2025–28
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#111111] border border-white/[0.06]">
              <span className="editorial-tag text-[9px] text-[#FF941F] block mb-1">
                LOCATION / STATUS
              </span>
              <p className="font-mono text-xs text-[#F5F3EF] font-semibold">
                Karnataka, India
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[10px] text-emerald-400">Available for Projects</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

