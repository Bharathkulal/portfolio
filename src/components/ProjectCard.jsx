import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Brain, Sparkles, Terminal, FileText, Activity, Layers, Cpu } from 'lucide-react';

export function ProjectVisual({ projectId, name, image, className = "" }) {
  const [imgError, setImgError] = useState(false);
  const id = (projectId || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  // If a valid image exists and hasn't failed to load, render the image
  if (image && !imgError && !image.includes('placeholder')) {
    return (
      <div className={`relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-brand-bg/80 border border-brand-border/60 ${className}`}>
        <img
          src={image}
          alt={name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card/80 via-transparent to-transparent opacity-60" />
      </div>
    );
  }

  // CivicSolve: Map/Grid, Location pins, Data Flow
  if (id.includes('civic')) {
    return (
      <div className={`relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-brand-bg/90 border border-brand-border/60 p-3 flex flex-col justify-between ${className}`}>
        <div className="absolute inset-0 tech-grid-bg opacity-30" />
        <svg className="absolute inset-0 w-full h-full stroke-brand-accent/20" fill="none">
          <path d="M 20 80 Q 90 20 160 70 T 300 40" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
        </svg>
        <div className="relative z-10 flex justify-between items-center text-[9px] font-mono text-brand-textSecondary">
          <span className="flex items-center gap-1"><MapPin size={10} className="text-brand-accent" /> COORD: 13.62° N, 74.69° E</span>
          <span className="text-brand-accent font-semibold">GEO_DISPATCH</span>
        </div>
        <div className="relative z-10 flex items-center justify-around my-auto">
          <div className="flex flex-col items-center">
            <span className="w-3 h-3 rounded-full bg-brand-accent/20 border border-brand-accent flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
            </span>
            <span className="font-mono text-[8px] text-brand-textSecondary mt-1">Issue #04</span>
          </div>
          <div className="w-16 h-px bg-brand-accent/40 border-t border-dashed border-brand-accent/60" />
          <div className="flex flex-col items-center">
            <span className="w-3 h-3 rounded-full bg-brand-blue/20 border border-brand-blue flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            </span>
            <span className="font-mono text-[8px] text-brand-textSecondary mt-1">Resolver Node</span>
          </div>
        </div>
        <div className="relative z-10 flex justify-between items-center font-mono text-[8px] text-brand-textSecondary border-t border-brand-border/40 pt-1.5">
          <span>STATUS: RESOLUTION_PIPELINE</span>
          <span className="text-brand-accent">99.2% UPTIME</span>
        </div>
      </div>
    );
  }

  // Bimba AI: AI Neural Network, Data Nodes, Bounding Scanner
  if (id.includes('bimba')) {
    return (
      <div className={`relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-brand-bg/90 border border-brand-border/60 p-3 flex flex-col justify-between ${className}`}>
        <div className="absolute inset-0 bg-brand-accent/5 opacity-40" />
        <div className="relative z-10 flex justify-between items-center text-[9px] font-mono text-brand-textSecondary">
          <span className="flex items-center gap-1"><Brain size={11} className="text-brand-accent" /> VISION_INFERENCE</span>
          <span className="text-brand-accent font-semibold">TENSOR_v4</span>
        </div>
        <div className="relative z-10 my-auto flex items-center justify-center gap-4">
          <div className="border border-brand-accent/60 bg-brand-card/80 p-2 rounded-lg relative overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-brand-accent/10 animate-pulse" />
            <div className="font-mono text-[9px] text-brand-textPrimary flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              <span>OBJ_DETECT: [CONF 98.4%]</span>
            </div>
            <div className="font-mono text-[8px] text-brand-textSecondary mt-0.5">BOUNDING_BOX: [x:42, y:19]</div>
          </div>
        </div>
        <div className="relative z-10 flex justify-between items-center font-mono text-[8px] text-brand-textSecondary border-t border-brand-border/40 pt-1.5">
          <span>FAST_API // CUDA_ACCELERATED</span>
          <span className="text-brand-accent font-semibold">LATENCY: 14ms</span>
        </div>
      </div>
    );
  }

  // EduVerse AI: Learning Nodes, AI Chat Visualization, Knowledge Flow
  if (id.includes('eduverse')) {
    return (
      <div className={`relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-brand-bg/90 border border-brand-border/60 p-3 flex flex-col justify-between ${className}`}>
        <div className="relative z-10 flex justify-between items-center text-[9px] font-mono text-brand-textSecondary">
          <span className="flex items-center gap-1"><Sparkles size={11} className="text-brand-accent" /> ADAPTIVE_TUTOR</span>
          <span className="text-brand-blue font-semibold">LLM_CORE</span>
        </div>
        <div className="relative z-10 my-auto flex flex-col gap-1.5 px-2">
          <div className="self-start bg-brand-tertiary border border-brand-border/60 px-2.5 py-1 rounded-lg text-[9px] font-mono text-brand-textSecondary">
            &gt; Adaptive prompt structure generated
          </div>
          <div className="self-end bg-brand-accent/15 border border-brand-accent/40 px-2.5 py-1 rounded-lg text-[9px] font-mono text-brand-textPrimary flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            <span>Comprehension Score: 94.8%</span>
          </div>
        </div>
        <div className="relative z-10 flex justify-between items-center font-mono text-[8px] text-brand-textSecondary border-t border-brand-border/40 pt-1.5">
          <span>SESSION_HISTORY: STREAMING</span>
          <span className="text-brand-accent font-semibold">DYNAMIC_DIFFICULTY</span>
        </div>
      </div>
    );
  }

  // Nova AI: Terminal Interface, Typing Effect, AI Processing
  if (id.includes('nova')) {
    return (
      <div className={`relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-brand-bg/95 border border-brand-border/60 p-3 flex flex-col justify-between ${className}`}>
        <div className="relative z-10 flex justify-between items-center text-[9px] font-mono text-brand-textSecondary border-b border-brand-border/40 pb-1.5">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
            <span className="ml-1 text-brand-textPrimary font-semibold">nova_agent.sh</span>
          </span>
          <span className="text-brand-accent font-semibold">ORCHESTRATOR</span>
        </div>
        <div className="relative z-10 my-auto font-mono text-[9px] space-y-1 text-left px-1">
          <div className="text-brand-textSecondary">&gt; nova --intent="Automate workflow"</div>
          <div className="text-brand-accent flex items-center gap-1 font-semibold">
            <span>[AI_AGENT] Dispatching local OS execution...</span>
            <span className="w-1.5 h-3 bg-brand-accent animate-pulse inline-block" />
          </div>
        </div>
        <div className="relative z-10 flex justify-between items-center font-mono text-[8px] text-brand-textSecondary border-t border-brand-border/40 pt-1.5">
          <span>INTENT_PARSER: ACTIVE</span>
          <span className="text-brand-accent font-semibold">MEMORY_BUFFER: 512k</span>
        </div>
      </div>
    );
  }

  // Scholar AI: Document Scanning, Knowledge Extraction
  if (id.includes('scholar')) {
    return (
      <div className={`relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-brand-bg/90 border border-brand-border/60 p-3 flex flex-col justify-between ${className}`}>
        <div className="relative z-10 flex justify-between items-center text-[9px] font-mono text-brand-textSecondary">
          <span className="flex items-center gap-1"><FileText size={11} className="text-brand-accent" /> PDF_PARSER_PIPELINE</span>
          <span className="text-brand-accent font-semibold">EXTRACT_v2</span>
        </div>
        <div className="relative z-10 my-auto flex items-center justify-center gap-3">
          <div className="border border-brand-border bg-brand-card p-2 rounded-lg relative overflow-hidden text-left font-mono text-[8px] space-y-0.5 shadow-sm">
            <div className="text-brand-accent font-semibold flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-brand-accent animate-pulse" />
              <span>Academic Reference Mining</span>
            </div>
            <div className="text-brand-textSecondary">Context token reduction: 78%</div>
            <div className="text-brand-textSecondary">Citation map extracted</div>
          </div>
        </div>
        <div className="relative z-10 flex justify-between items-center font-mono text-[8px] text-brand-textSecondary border-t border-brand-border/40 pt-1.5">
          <span>NLP_TOKEN_OPTI: ENGAGED</span>
          <span className="text-brand-accent font-semibold">BULLET_SUMMARY</span>
        </div>
      </div>
    );
  }

  // Gym Management System / VBMS / Others: Dashboard Telemetry
  return (
    <div className={`relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-brand-bg/90 border border-brand-border/60 p-3 flex flex-col justify-between ${className}`}>
      <div className="relative z-10 flex justify-between items-center text-[9px] font-mono text-brand-textSecondary">
        <span className="flex items-center gap-1"><Activity size={11} className="text-brand-accent" /> SYSTEM_DASHBOARD</span>
        <span className="text-brand-accent font-semibold">LIVE_TELEMETRY</span>
      </div>
      <div className="relative z-10 my-auto flex items-end justify-center gap-2 h-12">
        <div className="w-4 bg-brand-accent/20 border-t-2 border-brand-accent rounded-t h-6 animate-pulse" />
        <div className="w-4 bg-brand-accent/40 border-t-2 border-brand-accent rounded-t h-10" />
        <div className="w-4 bg-brand-accent/30 border-t-2 border-brand-accent rounded-t h-8" />
        <div className="w-4 bg-brand-accent/60 border-t-2 border-brand-accent rounded-t h-12" />
      </div>
      <div className="relative z-10 flex justify-between items-center font-mono text-[8px] text-brand-textSecondary border-t border-brand-border/40 pt-1.5">
        <span>DATABASE: NORMALIZED_SQL</span>
        <span className="text-brand-accent font-semibold">SYNCED</span>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, onClick, index = 0 }) {
  const isLive = project.statusType === 'live' || (project.status || '').toLowerCase().includes('live');
  const isDev = project.statusType === 'dev' || (project.status || '').toLowerCase().includes('dev');

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ 
        duration: 0.5, 
        delay: Math.min(index * 0.08, 0.4),
        ease: [0.215, 0.61, 0.355, 1] 
      }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-brand-card/70 border border-brand-border/80 dark:border-brand-border/40 rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between p-5 sm:p-6 group transition-all duration-300 hover:border-brand-accent/60 hover:shadow-[0_12px_30px_-10px_rgba(0,255,136,0.18)] text-left"
    >
      {/* 1. PROJECT NUMBER + STATUS */}
      <div className="flex justify-between items-center mb-3">
        <span className="font-mono text-[10px] tracking-widest text-brand-textSecondary uppercase font-medium">
          PROJ_0{index + 1} // MODULE
        </span>

        {/* Status Indicator */}
        <div className={`flex items-center gap-1.5 font-mono text-[9px] px-2 py-0.5 rounded-full border uppercase tracking-wider ${
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
      <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-textPrimary group-hover:text-brand-accent transition-colors duration-200 mb-2">
        {project.name}
      </h3>

      {/* 3. SHORT DESCRIPTION */}
      <p className="text-xs text-brand-textSecondary leading-relaxed mb-4 line-clamp-2 font-normal">
        {project.description}
      </p>

      {/* 4. 16:9 PROJECT PREVIEW */}
      <div className="mb-4">
        <ProjectVisual projectId={project.id} name={project.name} image={project.image} />
      </div>

      {/* 5. TECHNOLOGY TAGS */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {(project.tags || []).slice(0, 3).map((tag) => (
          <span 
            key={tag} 
            className="font-mono text-[9px] text-brand-textSecondary bg-brand-tertiary px-2 py-0.5 rounded-md border border-brand-border/60"
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

      {/* 6. VIEW PROJECT → */}
      <div className="pt-3 border-t border-brand-border/50 flex items-center justify-between">
        <span className="font-mono text-[10px] text-brand-accent font-semibold tracking-wider flex items-center gap-1 group-hover:text-brand-textPrimary transition-colors">
          VIEW PROJECT SPEC
          <ArrowUpRight size={12} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </span>
        <span className="font-mono text-[9px] text-brand-textSecondary/70">
          DETAILS &rarr;
        </span>
      </div>
    </motion.div>
  );
}
