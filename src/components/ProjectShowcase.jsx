import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Terminal, Layers } from 'lucide-react';
import { ProjectVisual } from './ProjectCard';
import SectionReveal from './SectionReveal';

export default function ProjectShowcase({ projects = [], onSelectProject }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const animFrameRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Physics and Position Refs for 60fps Direct DOM Animation
  const offsetRef = useRef(0);
  const defaultSpeed = -0.9; // Smooth cinematic default auto-scroll speed (px/frame)
  const speedRef = useRef(defaultSpeed);
  const targetSpeedRef = useRef(defaultSpeed);
  
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const isHoveredRef = useRef(false);
  const preventClickRef = useRef(false);
  const singleSetWidthRef = useRef(0);

  const [cardWidth, setCardWidth] = useState(400);
  const [gap, setGap] = useState(24);

  // Responsive card size calculation
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 640) {
        // Mobile: 1 full card + peeking edge
        setCardWidth(Math.min(w * 0.84, 340));
        setGap(16);
      } else if (w < 1024) {
        setCardWidth(360);
        setGap(20);
      } else {
        setCardWidth(410);
        setGap(28);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const totalProjects = projects.length || 1;
  const singleSetWidth = totalProjects * (cardWidth + gap);
  singleSetWidthRef.current = singleSetWidth;

  // Quadruple items to guarantee a mathematically seamless infinite wrap
  const loopedProjects = [...projects, ...projects, ...projects, ...projects];

  // =========================================================================
  // ANIMATION LOOP WITH INERTIA & SEAMLESS WRAPPING
  // =========================================================================
  useEffect(() => {
    if (shouldReduceMotion) return;

    let lastTimestamp = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - lastTimestamp) / 16.666, 2.5); // Normalized frame delta
      lastTimestamp = now;

      if (!isDraggingRef.current) {
        // Handle hovering: slow down to gentle float on hover
        if (isHoveredRef.current) {
          targetSpeedRef.current = defaultSpeed * 0.15;
        } else {
          targetSpeedRef.current = defaultSpeed;
        }

        // Smooth momentum decay towards target auto-speed
        speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.04 * dt;
        offsetRef.current += speedRef.current * dt;

        // Mathematical seamless wrapping
        if (singleSetWidthRef.current > 0) {
          if (offsetRef.current <= -singleSetWidthRef.current) {
            offsetRef.current += singleSetWidthRef.current;
          } else if (offsetRef.current > 0) {
            offsetRef.current -= singleSetWidthRef.current;
          }
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [shouldReduceMotion, singleSetWidth]);

  // =========================================================================
  // MOUSE & TOUCH POINTER DRAG INTERACTION WITH VELOCITY
  // =========================================================================
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return; // Only primary button
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    preventClickRef.current = false;

    if (trackRef.current) {
      trackRef.current.style.cursor = 'grabbing';
      try {
        trackRef.current.setPointerCapture(e.pointerId);
      } catch (_) {}
    }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const currentX = e.clientX;
    const now = performance.now();
    const deltaX = currentX - lastXRef.current;
    const dt = Math.max(now - lastTimeRef.current, 1);

    if (Math.abs(currentX - startXRef.current) > 5) {
      preventClickRef.current = true;
    }

    offsetRef.current += deltaX;

    // Instantaneous velocity calculation with rolling filter
    const instantVelocity = (deltaX / dt) * 16.666;
    velocityRef.current = velocityRef.current * 0.5 + instantVelocity * 0.5;

    // Seamless wrap during manual drag
    if (singleSetWidthRef.current > 0) {
      if (offsetRef.current <= -singleSetWidthRef.current) {
        offsetRef.current += singleSetWidthRef.current;
      } else if (offsetRef.current > 0) {
        offsetRef.current -= singleSetWidthRef.current;
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }

    lastXRef.current = currentX;
    lastTimeRef.current = now;
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab';
      try {
        trackRef.current.releasePointerCapture(e.pointerId);
      } catch (_) {}
    }

    // Apply drag velocity as initial inertia (clamped for natural physics)
    const clampedVelocity = Math.max(Math.min(velocityRef.current * 0.85, 28), -28);
    if (Math.abs(clampedVelocity) > 0.4) {
      speedRef.current = clampedVelocity;
    }

    // Reset prevent click flag after short delay
    setTimeout(() => {
      preventClickRef.current = false;
    }, 120);
  };

  const handleCardClick = (project) => {
    if (preventClickRef.current) return;
    if (onSelectProject) {
      onSelectProject(project);
    }
  };

  return (
    <section 
      id="projects" 
      className="py-24 md:py-28 bg-brand-bg relative overflow-hidden select-none transition-colors duration-300"
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Container */}
      <div className="w-full px-6 sm:px-12 lg:px-20 mx-auto mb-10">
        <SectionReveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-brand-accent tracking-widest uppercase font-semibold">
              03 — SELECTED WORK
            </span>
            <div className="h-px flex-grow bg-brand-border/60" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
            <div>
              <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-brand-textPrimary tracking-tight leading-tight">
                Infinite Project Stream
              </h2>
              <p className="font-sans text-xs sm:text-sm text-brand-textSecondary mt-2 max-w-xl font-normal">
                Continuous autonomous engineering showcase. Drag, interact, or explore any module.
              </p>
            </div>

            {/* Interaction Hint Badge */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-brand-textSecondary bg-brand-card/60 border border-brand-border/60 px-3.5 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              <span>DRAG TO EXPLORE // CONTINUOUS FLOW</span>
            </div>
          </div>
        </SectionReveal>
      </div>

      {/* ===================================================================== */}
      {/* INFINITE FLOW TRACK WITH AMBIENT VIGNETTE MASKS */}
      {/* ===================================================================== */}
      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden py-6 cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { 
          isHoveredRef.current = false; 
          isDraggingRef.current = false;
        }}
      >
        {/* Left & Right Cinematic Edge Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 md:w-52 bg-gradient-to-r from-brand-bg via-brand-bg/85 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 md:w-52 bg-gradient-to-l from-brand-bg via-brand-bg/85 to-transparent z-20" />

        {/* Moving Track */}
        <div 
          ref={trackRef}
          className="flex will-change-transform items-stretch"
          style={{ gap: `${gap}px` }}
        >
          {loopedProjects.map((project, idx) => {
            const originalIndex = (idx % totalProjects) + 1;
            const isLive = project.statusType === 'live' || (project.status || '').toLowerCase().includes('live');
            const isDev = project.statusType === 'dev' || (project.status || '').toLowerCase().includes('dev');

            return (
              <div
                key={`${project._id || project.id}-${idx}`}
                style={{ width: `${cardWidth}px` }}
                onClick={() => handleCardClick(project)}
                className="flex-shrink-0 group/card relative bg-brand-card/85 border border-brand-border/80 dark:border-brand-border/40 rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:border-brand-accent/60 hover:shadow-[0_16px_36px_-10px_rgba(0,255,136,0.20)] hover:-translate-y-1.5 text-left select-none backdrop-blur-md"
              >
                {/* 1. PROJECT NUMBER + STATUS */}
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[10px] tracking-widest text-brand-textSecondary uppercase font-medium">
                    0{originalIndex} / 0{totalProjects}
                  </span>

                  {/* Status Indicator */}
                  <div className={`flex items-center gap-1.5 font-mono text-[9px] px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                    isLive 
                      ? 'bg-brand-accent/10 border-brand-accent/40 text-brand-accent'
                      : isDev
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                        : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  }`}>
                    <span className="relative flex h-1.5 w-1.5">
                      {isLive && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" />
                      )}
                      <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                        isLive ? 'bg-brand-accent' : isDev ? 'bg-blue-400' : 'bg-amber-400'
                      }`} />
                    </span>
                    <span className="font-semibold">{project.status || 'Active'}</span>
                  </div>
                </div>

                {/* 2. PROJECT NAME */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-textPrimary group-hover/card:text-brand-accent transition-colors duration-200 mb-1.5 truncate">
                  {project.name}
                </h3>

                {/* 3. SHORT DESCRIPTION */}
                <p className="text-xs text-brand-textSecondary leading-relaxed mb-4 line-clamp-2 font-normal">
                  {project.description}
                </p>

                {/* 4. 16:9 PROJECT PREVIEW */}
                <div className="mb-4">
                  <ProjectVisual 
                    projectId={project.id} 
                    name={project.name} 
                    image={project.image} 
                  />
                </div>

                {/* 5. TECHNOLOGY TAGS */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {(project.tags || []).slice(0, 3).map((tag) => (
                    <span 
                      key={tag} 
                      className="font-mono text-[9px] text-brand-textSecondary bg-brand-tertiary px-2.5 py-0.5 rounded-md border border-brand-border/60"
                    >
                      {tag}
                    </span>
                  ))}
                  {(project.tags || []).length > 3 && (
                    <span className="font-mono text-[9px] text-brand-textSecondary/70 px-1 py-0.5">
                      +{(project.tags || []).length - 3}
                    </span>
                  )}
                </div>

                {/* 6. EXPLORE PROJECT ↗ */}
                <div className="pt-3 border-t border-brand-border/50 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-brand-accent font-semibold tracking-wider flex items-center gap-1 group-hover/card:text-brand-textPrimary transition-colors">
                    EXPLORE PROJECT
                    <ArrowUpRight size={13} className="group-hover/card:translate-x-1 group-hover/card:-translate-y-0.5 transition-transform duration-200" />
                  </span>
                  <span className="font-mono text-[9px] text-brand-textSecondary/70 uppercase">
                    SPEC_VIEW
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
