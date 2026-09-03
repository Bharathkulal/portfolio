import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, ArrowLeft, Brain, Cpu, Database, HardDrive, Code2, CheckCircle2 } from 'lucide-react';
import { ProjectVisual } from './ProjectCard';

// Mapper to return corresponding inline SVGs or Lucide graphics for each skill
const getSkillIcon = (skillName) => {
  const name = (skillName || '').toLowerCase();

  // HTML5
  if (name.includes('html')) {
    return (
      <svg className="w-3.5 h-3.5 fill-[#e34f26]" viewBox="0 0 24 24">
        <path d="M1.5 0h21l-1.9 21.2L12 24 3.4 21.2 1.5 0zm16.5 6.3H7.5l.2 2.5h8.6l-.3 3.5-3.8 1.2-3.8-1.2-.2-2.5H6.2l.4 4.8 5.4 1.8 5.4-1.8.6-6.8z"/>
      </svg>
    );
  }

  // CSS3
  if (name.includes('css')) {
    return (
      <svg className="w-3.5 h-3.5 fill-[#1572b6]" viewBox="0 0 24 24">
        <path d="M1.5 0h21l-1.9 21.2L12 24 3.4 21.2 1.5 0zm16.5 6.3H7.5l.2 2.5h8.6l-.3 3.5-3.8 1.2-3.8-1.2-.2-2.5H6.2l.4 4.8 5.4 1.8 5.4-1.8.6-6.8z"/>
      </svg>
    );
  }

  // JavaScript
  if (name.includes('javascript') || name === 'js') {
    return (
      <svg className="w-3.5 h-3.5 fill-[#f7df1e]" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0V0zm19.3 16.5c-.7-.8-1.7-1.1-2.9-1.1-1.3 0-2.1.5-2.1 1.3 0 1.2 1.7 1.4 3 2.1 1.7.9 2.5 1.8 2.5 3.7 0 2.2-1.7 3.5-4.4 3.5-2.6 0-4-1.2-4.6-2.5l2-1.2c.4.8 1.1 1.4 2.5 1.4 1.2 0 1.7-.5 1.7-1.1 0-1.1-1.2-1.3-2.6-2-1.9-.9-2.9-1.9-2.9-3.7 0-2 1.6-3.4 4-3.4 2.2 0 3.5.9 4.1 2.2l-2.1 1.3zM9.2 14v10H6.2V14.1h3z"/>
      </svg>
    );
  }

  // React
  if (name.includes('react')) {
    return (
      <svg className="w-3.5 h-3.5 fill-[#61dafb] animate-[spin_10s_linear_infinite]" viewBox="0 0 24 24">
        <path d="M24 12c0-1-.8-2-2-3 1.2-1 2-2 2-3 0-1.1-.9-2-2-2-1.2 0-2.3.8-3 2-.8-1.2-1.8-2-3-2-1.1 0-2 .9-2 2 0 1 .8 2 2 3-1.2 1-2 2-2 3 0 1.1.9 2 2 2 1.2 0 2.3-.8 3-2 .8 1.2 1.8 2 3 2 1.1 0 2-.9 2-2zm-12 0c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3z"/>
      </svg>
    );
  }

  // Python
  if (name.includes('python')) {
    return (
      <svg className="w-3.5 h-3.5 fill-[#3776ab]" viewBox="0 0 448 512">
        <path d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-68.6 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.7c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-24.9h180.7c26.8 0 33.3-17.1 33.3-33.8V254.7c.1-23-4-39.6-20.4-54.2zM286.2 390.6c-11.4 0-20.6-9.2-20.6-20.6 0-11.4 9.2-20.6 20.6-20.6 11.4 0 20.6 9.2 20.6 20.6.1 11.4-9.1 20.6-20.6 20.6zM172.7 243.9h154.7v-47.4c0-29.2-25.2-46-53.4-54.3-33.8-9.9-66.3-11.7-106.8 0-26.9 7.8-53.4 23.5-53.4 54.3v40.7h106.8v24.9H40.1c-26.8 0-33.3 17.1-33.3 33.8v106.8c0 23 4.1 39.6 20.4 54.2 7.7 30.9 22.3 54.2 53.4 54.2h40.1v-47.4c0-36.8 31.2-67.8 68.6-67.8h104.9c29.2 0 53.4-25 53.4-54.3V243.9H172.7zM161.8 121.4c-11.4 0-20.6-9.2-20.6-20.6 0-11.4 9.2-20.6 20.6-20.6 11.4 0 20.6 9.2 20.6 20.6 0 11.4-9.2 20.6-20.6 20.6z"/>
      </svg>
    );
  }

  // MySQL
  if (name.includes('mysql')) {
    return (
      <svg className="w-3.5 h-3.5 fill-[#00758f]" viewBox="0 0 24 24">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm3.8 15.5H8.2V8.5h7.6v7zm0-8.5H8.2V5.5h7.6V7z"/>
      </svg>
    );
  }

  // MongoDB
  if (name.includes('mongodb')) {
    return (
      <svg className="w-3.5 h-3.5 fill-[#47a248]" viewBox="0 0 24 24">
        <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    );
  }

  // AI & ML Generic Brain Icons
  if (name.includes('intelligence') || name.includes('generative')) {
    return <Brain className="text-brand-accent w-3.5 h-3.5" />;
  }
  if (name.includes('learning') || name.includes('data science')) {
    return <Cpu className="text-brand-blue w-3.5 h-3.5" />;
  }

  return <Code2 className="text-brand-textSecondary w-3.5 h-3.5" />;
};

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    // Lock background scroll on mount
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  const isLive = project.statusType === 'live' || (project.status || '').toLowerCase().includes('live');
  const isDev = project.statusType === 'dev' || (project.status || '').toLowerCase().includes('dev');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-bg/85 backdrop-blur-md"
        />

        {/* Modal Window Container - Native Mobile Sheet on Mobile, Centered Modal on Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          className="w-full max-w-4xl h-[92vh] sm:h-[86vh] bg-brand-card border border-brand-border/90 rounded-t-[28px] sm:rounded-3xl overflow-hidden shadow-2xl relative flex flex-col z-10"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-5 sm:px-8 py-4 border-b border-brand-border bg-brand-card/95 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <motion.button 
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                className="flex items-center gap-1.5 text-xs font-mono text-brand-textSecondary hover:text-brand-accent bg-brand-tertiary px-3 py-1.5 rounded-full border border-brand-border transition-colors sm:hidden"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </motion.button>

              <span className="font-mono text-xs text-brand-accent font-bold uppercase tracking-wider hidden sm:inline-block">
                SPEC_ID // {project.id?.toUpperCase()}
              </span>

              <div className={`flex items-center gap-1.5 font-mono text-[9px] px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                isLive 
                  ? 'bg-brand-accent/10 border-brand-accent/40 text-brand-accent'
                  : isDev
                    ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-brand-accent animate-pulse' : 'bg-current'}`} />
                <span>{project.status || 'Active'}</span>
              </div>
            </div>
            
            <motion.button 
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              className="text-brand-textSecondary hover:text-brand-accent bg-brand-tertiary p-2 rounded-full border border-brand-border hover:border-brand-accent/40 transition-colors"
              aria-label="Close Modal"
            >
              <X size={16} />
            </motion.button>
          </div>

          {/* Scrollable details view */}
          <div className="flex-grow overflow-y-auto px-5 sm:px-8 py-6 text-left space-y-6">
            
            {/* 16:9 Large Project Preview Banner */}
            <div className="w-full">
              <ProjectVisual projectId={project.id} name={project.name} image={project.image} />
            </div>

            {/* Title & Short Summary */}
            <div>
              <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-brand-textPrimary mb-2">
                {project.name}
              </h2>
              <p className="text-brand-textSecondary text-xs sm:text-sm leading-relaxed max-w-2xl font-normal">
                {project.description}
              </p>
            </div>

            {/* Technical Specs Columns: Problem & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-brand-tertiary/40 border border-brand-border/80 rounded-2xl p-4 sm:p-5">
                <h4 className="font-mono text-[10px] text-brand-accent tracking-widest uppercase mb-2 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                  01 // PROBLEM STATEMENT
                </h4>
                <p className="text-brand-textSecondary text-xs leading-relaxed font-normal">
                  {project.problem || project.description}
                </p>
              </div>

              <div className="bg-brand-tertiary/40 border border-brand-border/80 rounded-2xl p-4 sm:p-5">
                <h4 className="font-mono text-[10px] text-brand-blue tracking-widest uppercase mb-2 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                  02 // SOLUTION ARCHITECTURE
                </h4>
                <p className="text-brand-textSecondary text-xs leading-relaxed font-normal">
                  {project.solution || project.description}
                </p>
              </div>
            </div>

            {/* Features & Learnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {project.features && project.features.length > 0 && (
                <div className="bg-brand-tertiary/40 border border-brand-border/80 rounded-2xl p-4 sm:p-5">
                  <h4 className="font-mono text-[10px] text-brand-textSecondary tracking-widest uppercase mb-3 font-semibold">
                    03 // KEY FEATURES
                  </h4>
                  <ul className="text-brand-textSecondary text-xs leading-relaxed flex flex-col gap-2">
                    {project.features.filter(f => !f.includes('[ADD')).map((feat, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <CheckCircle2 size={13} className="text-brand-accent shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.learned && (
                <div className="bg-brand-tertiary/40 border border-brand-border/80 rounded-2xl p-4 sm:p-5">
                  <h4 className="font-mono text-[10px] text-brand-textSecondary tracking-widest uppercase mb-3 font-semibold">
                    04 // ACQUIRED CAPABILITIES
                  </h4>
                  <p className="text-brand-textSecondary text-xs leading-relaxed font-normal">
                    {project.learned}
                  </p>
                </div>
              )}
            </div>

            {/* Technology tags */}
            <div>
              <h4 className="font-mono text-[10px] text-brand-textSecondary tracking-widest uppercase mb-3 font-semibold">
                05 // SYSTEM TECHNOLOGIES
              </h4>
              <div className="flex flex-wrap gap-2">
                {(project.tags || []).map(tag => (
                  <span key={tag} className="font-mono text-xs text-brand-textPrimary bg-brand-tertiary border border-brand-border/80 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm">
                    {getSkillIcon(tag)}
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer controls - Fixed Bottom Actions */}
          <div className="border-t border-brand-border px-5 sm:px-8 py-4 bg-brand-card flex flex-wrap gap-3 items-center justify-between sticky bottom-0 z-20">
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              {project.demo && !project.demo.includes('ADD') ? (
                <motion.a 
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.96 }}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 text-xs font-mono py-2.5 px-6 rounded-full bg-brand-accent text-brand-bg font-bold hover:bg-white transition-all shadow-md shadow-brand-accent/20"
                >
                  <ArrowUpRight size={14} /> 
                  LIVE DEPLOYMENT
                </motion.a>
              ) : (
                <span className="flex-1 sm:flex-initial flex items-center justify-center gap-2 text-xs font-mono py-2.5 px-5 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-brand-accent font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                  SYSTEM ACTIVE
                </span>
              )}

              {project.github && !project.github.includes('ADD') && (
                <motion.a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.96 }}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 text-xs font-mono py-2.5 px-5 rounded-full border border-brand-border bg-brand-tertiary text-brand-textPrimary hover:border-brand-accent/50 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>REPOSITORY</span>
                </motion.a>
              )}
            </div>

            <span className="font-mono text-[9px] text-brand-textSecondary/70 hidden sm:inline-block">
              SYSTEM_VER // 3.0.0_STABLE
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
