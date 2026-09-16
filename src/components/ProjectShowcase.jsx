import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Layers, Code } from 'lucide-react';

export default function ProjectShowcase({ projects = [], onSelectProject }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  if (!projects || projects.length === 0) return null;

  const project = projects[currentIdx] || projects[0];
  const tags = project.technologies || project.tags || [];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section 
      id="work" 
      className="editorial-section min-h-screen w-full bg-brand-bg relative flex items-center justify-center py-24 px-6 sm:px-10 lg:px-16 border-t border-brand-border/40"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-between min-h-[80vh]">
        
        {/* =================================================================== */}
        {/* TOP BAR: Header, Counter & Project Number */}
        {/* =================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-brand-border/40 pb-6 mb-8 gap-4 text-left">
          <div>
            <span className="editorial-tag text-xs text-brand-accent tracking-[0.25em] font-semibold block mb-2">
              // SELECTED WORK
            </span>
            <h2 className="editorial-title text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-textPrimary uppercase leading-none">
              WORK
            </h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Project Navigation Switchers */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Project"
                className="w-10 h-10 rounded-full border border-brand-border hover:border-brand-accent/50 bg-brand-card/70 hover:bg-brand-card flex items-center justify-center text-brand-textPrimary transition-colors cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Project"
                className="w-10 h-10 rounded-full border border-brand-border hover:border-brand-accent/50 bg-brand-card/70 hover:bg-brand-card flex items-center justify-center text-brand-textPrimary transition-colors cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="text-right">
              <span className="editorial-number text-3xl sm:text-4xl font-light text-brand-textPrimary tracking-tight">
                {currentIdx < 9 ? `0${currentIdx + 1}` : currentIdx + 1}
              </span>
              <span className="font-mono text-xs text-brand-textSecondary">
                {' '}/ {projects.length < 9 ? `0${projects.length}` : projects.length}
              </span>
            </div>

            <span className="editorial-number hidden sm:inline-block text-5xl sm:text-6xl font-light text-brand-textSecondary/25 tracking-tighter pl-4 border-l border-brand-border/40">
              03
            </span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* MAIN EDITORIAL PROJECT HERO COMPOSITION */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 my-auto">
          
          {/* Left Column: Project Details */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id || project._id || currentIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start"
              >
                {/* Status Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-border/60 bg-brand-card/60 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brand-textSecondary font-semibold">
                    {project.status || 'Active Project'}
                  </span>
                </div>

                {/* Big Bold Project Name */}
                <h3 className="editorial-title text-3xl sm:text-5xl lg:text-6xl font-black text-brand-textPrimary tracking-tight uppercase leading-none mb-4">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm sm:text-base text-brand-textSecondary leading-relaxed mb-6 font-normal max-w-xl">
                  {project.description}
                </p>

                {/* Tags List */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {tags.map((tag) => (
                    <span 
                      key={tag}
                      className="font-mono text-xs px-3 py-1 rounded-md bg-brand-card border border-brand-border/50 text-brand-textSecondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-4">
                  {onSelectProject && (
                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex items-center gap-2 bg-brand-accent text-brand-bg px-6 py-3 rounded-full font-semibold text-xs uppercase tracking-wider transition-all duration-200 hover:shadow-lg hover:shadow-brand-accent/20 cursor-pointer"
                    >
                      <span>Architecture Details</span>
                      <Layers size={14} />
                    </button>
                  )}

                  {project.demo && project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 border border-brand-border hover:border-brand-accent/50 bg-brand-card/80 hover:bg-brand-card px-5 py-3 rounded-full font-mono text-xs text-brand-textPrimary transition-all cursor-pointer"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}

                  {project.github && project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 border border-brand-border hover:border-brand-accent/50 bg-brand-card/80 hover:bg-brand-card px-5 py-3 rounded-full font-mono text-xs text-brand-textPrimary transition-all cursor-pointer"
                    >
                      <Code size={14} />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Clean Project Media Treatment */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id || project._id || currentIdx}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full aspect-[16/10] max-w-[560px] rounded-2xl border border-brand-border/80 bg-brand-card overflow-hidden shadow-2xl flex flex-col justify-between p-6 group cursor-pointer"
                onClick={() => onSelectProject && onSelectProject(project)}
              >
                {/* Tech grid texture background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 via-transparent to-transparent pointer-events-none" />

                {/* Visual Header bar */}
                <div className="relative z-10 flex items-center justify-between border-b border-brand-border/40 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-border" />
                    <span className="font-mono text-[11px] text-brand-textSecondary tracking-wider">
                      {project.id || 'project_module'}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-brand-accent tracking-widest uppercase">
                    SYS_ACTIVE
                  </span>
                </div>

                {/* Project Focus Preview Card */}
                <div className="relative z-10 my-auto text-left py-6">
                  <span className="font-mono text-[11px] text-brand-accent tracking-wider uppercase block mb-1">
                    Problem & Architecture
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-brand-textSecondary leading-relaxed line-clamp-3">
                    {project.problem || project.solution || project.description}
                  </p>
                </div>

                {/* Footer preview bar */}
                <div className="relative z-10 flex items-center justify-between border-t border-brand-border/40 pt-3 text-[11px] font-mono text-brand-textSecondary">
                  <span>Click to inspect module</span>
                  <span className="text-brand-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Expand ↗
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Project Strip Selector */}
        <div className="flex items-center gap-3 overflow-x-auto py-4 border-t border-brand-border/40 scrollbar-none">
          {projects.map((p, idx) => (
            <button
              key={p.id || p._id || idx}
              onClick={() => setCurrentIdx(idx)}
              className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                currentIdx === idx
                  ? 'bg-brand-card text-brand-accent border border-brand-accent/40 font-bold'
                  : 'text-brand-textSecondary hover:text-brand-textPrimary bg-brand-bg hover:bg-brand-card/50 border border-transparent'
              }`}
            >
              {idx < 9 ? `0${idx + 1}` : idx + 1}. {p.name}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
