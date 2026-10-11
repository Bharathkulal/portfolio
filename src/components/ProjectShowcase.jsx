import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Layers, Code, Sparkles } from 'lucide-react';
import { ProjectVisual } from './ProjectCard';

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
      className="editorial-section min-h-screen w-full bg-[#080808] text-[#F5F3EF] relative flex items-center justify-center py-24 px-6 sm:px-10 lg:px-16 border-t border-white/[0.06]"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-between min-h-[80vh]">
        
        {/* =================================================================== */}
        {/* TOP BAR: Header, Counter & Project Number */}
        {/* =================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/[0.08] pb-6 mb-8 gap-4 text-left">
          <div>
            <span className="editorial-tag text-xs text-[#FF941F] tracking-[0.25em] font-semibold block mb-2">
              // SELECTED WORK
            </span>
            <h2 className="editorial-title text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F5F3EF] uppercase leading-none">
              WORK
            </h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Project Navigation Switchers */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Project"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-[#FF941F]/60 bg-[#111111] hover:bg-white/[0.05] flex items-center justify-center text-[#F5F3EF] transition-colors cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Project"
                className="w-10 h-10 rounded-full border border-white/10 hover:border-[#FF941F]/60 bg-[#111111] hover:bg-white/[0.05] flex items-center justify-center text-[#F5F3EF] transition-colors cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="text-right">
              <span className="editorial-number text-3xl sm:text-4xl font-light text-[#F5F3EF] tracking-tight">
                {currentIdx < 9 ? `0${currentIdx + 1}` : currentIdx + 1}
              </span>
              <span className="font-mono text-xs text-[#929292]">
                {' '}/ {projects.length < 9 ? `0${projects.length}` : projects.length}
              </span>
            </div>

            <span className="editorial-number hidden sm:inline-block text-5xl sm:text-6xl font-light text-[#929292]/25 tracking-tighter pl-4 border-l border-white/[0.08]">
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-[#111111] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF941F] animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#929292] font-semibold">
                    {project.status || 'Active Project'}
                  </span>
                </div>

                {/* Big Bold Project Name */}
                <h3 className="editorial-title text-3xl sm:text-5xl lg:text-6xl font-black text-[#F5F3EF] tracking-tight uppercase leading-none mb-4">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm sm:text-base text-[#929292] leading-relaxed mb-6 font-normal max-w-xl">
                  {project.description}
                </p>

                {/* Tags List */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {tags.map((tag) => (
                    <span 
                      key={tag}
                      className="font-mono text-xs px-3 py-1 rounded-md bg-[#111111] border border-white/10 text-[#929292]"
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
                      className="flex items-center gap-2 bg-[#FF941F] text-[#080808] px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:bg-[#FFB356] hover:shadow-lg hover:shadow-[#FF941F]/20 cursor-pointer"
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
                      className="flex items-center gap-1.5 border border-white/15 hover:border-[#FF941F]/60 bg-[#111111] hover:bg-white/[0.04] px-5 py-3 rounded-full font-mono text-xs text-[#F5F3EF] transition-all cursor-pointer"
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
                      className="flex items-center gap-1.5 border border-white/15 hover:border-[#FF941F]/60 bg-[#111111] hover:bg-white/[0.04] px-5 py-3 rounded-full font-mono text-xs text-[#F5F3EF] transition-all cursor-pointer"
                    >
                      <Code size={14} />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Project Visual Telemetry */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.id || project._id || currentIdx}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full aspect-[16/10] max-w-[560px] rounded-2xl border border-white/[0.08] bg-[#111111] overflow-hidden shadow-2xl flex flex-col justify-between p-5 sm:p-6 group cursor-pointer"
                onClick={() => onSelectProject && onSelectProject(project)}
              >
                {/* Visual Header bar */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF941F]" />
                    <span className="font-mono text-[11px] text-[#929292] tracking-wider uppercase">
                      {project.id || 'project_module'}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#FF941F] tracking-widest uppercase font-semibold">
                    SYS_ACTIVE
                  </span>
                </div>

                {/* Project Visual Display */}
                <div className="relative z-10 my-auto w-full">
                  <ProjectVisual projectId={project.id} name={project.name} image={project.image} />
                </div>

                {/* Footer preview bar */}
                <div className="relative z-10 flex items-center justify-between border-t border-white/[0.08] pt-3 text-[11px] font-mono text-[#929292] mt-3">
                  <span>Click to inspect technical spec</span>
                  <span className="text-[#FF941F] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Expand ↗
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Project Strip Selector */}
        <div className="flex items-center gap-3 overflow-x-auto py-4 border-t border-white/[0.08] scrollbar-none">
          {projects.map((p, idx) => (
            <button
              key={p.id || p._id || idx}
              onClick={() => setCurrentIdx(idx)}
              className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                currentIdx === idx
                  ? 'bg-[#181818] text-[#FF941F] border border-[#FF941F]/40 font-bold'
                  : 'text-[#929292] hover:text-[#F5F3EF] bg-[#080808] hover:bg-[#111111] border border-white/[0.04]'
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

