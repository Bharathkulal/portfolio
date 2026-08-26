import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Terminal } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  // Prevent background scroll when modal is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-bg/85 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl h-[90vh] md:h-[80vh] bg-brand-card border border-brand-border rounded-3xl overflow-hidden shadow-2xl relative flex flex-col z-10"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 md:px-8 py-5 border-b border-brand-border bg-brand-card/90 sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-brand-accent font-bold uppercase tracking-wider">
                SPEC_ID // {project.id.toUpperCase()}
              </span>
              <span className={`font-mono text-[9px] px-2 py-0.5 rounded border uppercase ${
                project.statusType === 'live' 
                  ? 'bg-brand-accent/5 border-brand-accent/30 text-brand-accent'
                  : 'bg-brand-blue/5 border-brand-blue/30 text-brand-blue'
              }`}>
                {project.status}
              </span>
            </div>
            
            <button 
              onClick={onClose}
              className="text-brand-textSecondary hover:text-brand-accent bg-[#14141a] p-1.5 rounded-full border border-brand-border hover:border-brand-accent/40 transition-colors"
              aria-label="Close Modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable details view */}
          <div className="flex-grow overflow-y-auto px-6 md:px-8 py-6 text-left">
            <h2 className="text-3xl font-extrabold text-brand-textPrimary mb-2">
              {project.name}
            </h2>
            <p className="text-brand-textSecondary text-sm mb-8 max-w-2xl leading-relaxed">
              {project.description}
            </p>

            {/* Architecture diagram mock grid */}
            <div className="border border-brand-border rounded-2xl bg-brand-bg/60 p-6 mb-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] tech-grid-bg" />
              <h4 className="font-mono text-[10px] text-brand-textSecondary tracking-widest uppercase mb-4">
                01 / COMPONENT ARCHITECTURE SCHEMATIC
              </h4>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10 py-4 font-mono text-xs">
                <div className="px-4 py-2 border border-brand-border bg-brand-card rounded-md">CLIENT</div>
                <div className="w-1.5 h-6 sm:w-8 sm:h-px bg-brand-border relative"></div>
                <div className="px-4 py-2 border border-brand-accent/30 text-brand-accent bg-brand-card rounded-md shadow-sm shadow-brand-accent/5">AI PIPELINE ENGINE</div>
                <div className="w-1.5 h-6 sm:w-8 sm:h-px bg-brand-border"></div>
                <div className="px-4 py-2 border border-brand-border bg-brand-card rounded-md">DATABASE</div>
              </div>
            </div>

            {/* Technical Specs Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-mono text-[10px] text-brand-textSecondary tracking-widest uppercase mb-3">
                  02 / PROBLEM STATEMENT
                </h4>
                <p className="text-brand-textSecondary text-xs leading-relaxed bg-[#14141a]/40 border border-brand-border p-4 rounded-xl">
                  {project.problem}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-[10px] text-brand-textSecondary tracking-widest uppercase mb-3">
                  03 / SOLUTION DESIGN
                </h4>
                <p className="text-brand-textSecondary text-xs leading-relaxed bg-[#14141a]/40 border border-brand-border p-4 rounded-xl">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Features & Learnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-mono text-[10px] text-brand-textSecondary tracking-widest uppercase mb-3">
                  04 / KEY FEATURES
                </h4>
                <ul className="text-brand-textSecondary text-xs leading-relaxed bg-[#14141a]/40 border border-brand-border p-4 rounded-xl flex flex-col gap-2">
                  {project.features.map((feat, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="text-brand-accent font-semibold">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-[10px] text-brand-textSecondary tracking-widest uppercase mb-3">
                  05 / ACQUIRED CAPABILITIES
                </h4>
                <p className="text-brand-textSecondary text-xs leading-relaxed bg-[#14141a]/40 border border-brand-border p-4 rounded-xl">
                  {project.learned}
                </p>
              </div>
            </div>

            {/* Technology tags */}
            <div className="mb-8">
              <h4 className="font-mono text-[10px] text-brand-textSecondary tracking-widest uppercase mb-3">
                06 / SYSTEM TECHNOLOGIES
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="font-mono text-xs text-brand-textPrimary bg-brand-card/70 border border-brand-border px-3 py-1 rounded-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer controls */}
          <div className="border-t border-brand-border px-6 md:px-8 py-5 bg-[#0c0c10] flex flex-wrap gap-4 items-center justify-between sticky bottom-0 z-20">
            <div className="flex gap-4">
              <a 
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-xs font-mono py-2.5 px-5 rounded-full border transition-all ${
                  project.github.includes('ADD')
                    ? 'bg-yellow-500/5 border-yellow-500/20 text-yellow-500 hover:border-yellow-500/40'
                    : 'bg-brand-card border-brand-border text-brand-textPrimary hover:border-brand-accent/40'
                }`}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                {project.github.includes('ADD') ? '[ADD GITHUB URL]' : 'REPOSITORY CODE'}
              </a>

              <a 
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-xs font-mono py-2.5 px-5 rounded-full border transition-all ${
                  project.demo.includes('ADD')
                    ? 'bg-yellow-500/5 border-yellow-500/20 text-yellow-500 hover:border-yellow-500/40'
                    : 'bg-brand-accent text-brand-bg border-brand-accent font-semibold hover:bg-white hover:border-white'
                }`}
              >
                <ArrowUpRight size={14} /> 
                {project.demo.includes('ADD') ? '[ADD DEMO URL]' : 'LIVE DEPLOYMENT'}
              </a>
            </div>

            <span className="font-mono text-[10px] text-brand-textSecondary">
              CONFIDENTIAL // PRIVATE SYSTEMS MAPPING
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
