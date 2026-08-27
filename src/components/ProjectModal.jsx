import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Terminal, Brain, Cpu, Database, HardDrive, Code2 } from 'lucide-react';

// Mapper to return corresponding inline SVGs or Lucide graphics for each skill
const getSkillIcon = (skillName) => {
  const name = skillName.toLowerCase();

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

  // C Language
  if (name === 'c') {
    return (
      <svg className="w-3.5 h-3.5 fill-[#a8b9cc]" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12c4.1 0 7.8-2.1 9.9-5.4l-2.6-1.5c-1.6 2.5-4.4 4.1-7.3 4.1-4.9 0-8.9-4-8.9-8.9s4-8.9 8.9-8.9c3 0 5.7 1.6 7.3 4.1l2.6-1.5C19.8 2.1 16.1 0 12 0z"/>
      </svg>
    );
  }

  // Java
  if (name.includes('java')) {
    return (
      <svg className="w-3.5 h-3.5 fill-[#ea2d2e]" viewBox="0 0 24 24">
        <path d="M12 0c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm-3.8 18.3c0-.6.4-1.1.9-1.4.5-.3 1-.4 1.5-.5.7-.1 1.4-.2 2.1-.3.9-.1 1.7-.2 2.5-.4.4-.1.8-.2 1-.4.2-.2.3-.5.3-.8 0-.4-.2-.8-.7-1-.5-.2-1.1-.3-1.9-.3-1 0-1.8.2-2.3.6-.3.2-.5.5-.6.9h-1.7c0-.7.3-1.4.9-1.9.6-.5 1.5-.8 2.7-.8 1.2 0 2.2.2 2.9.7.7.5 1.1 1.1 1.1 1.9 0 .6-.2 1.1-.6 1.4-.4.3-.9.5-1.5.6-.7.1-1.4.2-2 .3-.9.1-1.7.2-2.5.4-.4.1-.7.2-.9.4-.2.2-.3.5-.3.8 0 .4.2.8.7 1 .5.2 1.1.3 1.9.3 1.1 0 1.9-.2 2.4-.6.3-.2.5-.5.6-.9h1.7c0 .7-.3 1.4-.9 1.9-.6.5-1.5.8-2.7.8-1.3 0-2.3-.2-3-.7-.7-.5-1.1-1.1-1.1-1.9z"/>
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

  // Git
  if (name === 'git') {
    return (
      <svg className="w-3.5 h-3.5 fill-[#f05032]" viewBox="0 0 24 24">
        <path d="M23.6 11.4L12.6.4C12.1-.1 11.3-.1 10.8.4L8.4 2.8l3 3c.6-.2 1.3 0 1.8.5.5.5.7 1.2.5 1.8l3 3c.6-.2 1.3 0 1.8.5.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.5-.5-.7-1.2-.5-1.8l-3-3c-.2.1-.4.2-.6.2-.2 0-.4-.1-.6-.2l-3 3c.2.6 0 1.3-.5 1.8-.7.7-1.8.7-2.5 0s-.7-1.8 0-2.5c.5-.5 1.2-.7 1.8-.5l3-3C8.2 8 8.1 7.8 8.1 7.6c0-.2.1-.4.2-.6L5.9 4.6 1.4 9.1c-.5.5-.5 1.3 0 1.8l11 11c.5.5 1.3.5 1.8 0l9.4-9.4c.5-.5.5-1.4 0-2.1z"/>
      </svg>
    );
  }

  // VS Code
  if (name.includes('code')) {
    return (
      <svg className="w-3.5 h-3.5 fill-[#007acc]" viewBox="0 0 24 24">
        <path d="M23.9 6.5l-2.6-2.4c-.1-.1-.3-.1-.4 0L12 11.2 5.1 4.1c-.1-.1-.3-.1-.4 0L.8 6.5c-.1.1-.1.3 0 .4L5.6 12 .8 17.1c-.1.1-.1.3 0 .4l3.9 3.5c.1.1.3.1.4 0L12 12.8l6.9 8.2c.1.1.3.1.4 0l2.6-2.4c.1-.1.1-.3 0-.4L18.4 12l4.8-5.1c.1-.1.1-.3 0-.4z"/>
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

  // Hardware/IoT
  if (name.includes('esp32') || name.includes('gas')) {
    return <HardDrive className="text-brand-accent w-3.5 h-3.5" />;
  }

  // Default Fallback
  return <Code2 className="text-brand-textSecondary w-3.5 h-3.5" />;
};

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
              className="text-brand-textSecondary hover:text-brand-accent bg-brand-tertiary p-1.5 rounded-full border border-brand-border hover:border-brand-accent/40 transition-colors"
              aria-label="Close Modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable details view */}
          <div className="flex-grow overflow-y-auto px-6 md:px-8 py-6 text-left">
            <h2 className="font-serif text-3xl font-extrabold text-brand-textPrimary mb-2">
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
                <p className="text-brand-textSecondary text-xs leading-relaxed bg-brand-tertiary/40 border border-brand-border p-4 rounded-xl">
                  {project.problem}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-[10px] text-brand-textSecondary tracking-widest uppercase mb-3">
                  03 / SOLUTION DESIGN
                </h4>
                <p className="text-brand-textSecondary text-xs leading-relaxed bg-brand-tertiary/40 border border-brand-border p-4 rounded-xl">
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
                <ul className="text-brand-textSecondary text-xs leading-relaxed bg-brand-tertiary/40 border border-brand-border p-4 rounded-xl flex flex-col gap-2">
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
                <p className="text-brand-textSecondary text-xs leading-relaxed bg-brand-tertiary/40 border border-brand-border p-4 rounded-xl">
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
                  <span key={tag} className="font-mono text-xs text-brand-textPrimary bg-brand-card/70 border border-brand-border px-3 py-1 rounded-lg flex items-center gap-2">
                    {getSkillIcon(tag)}
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer controls */}
          <div className="border-t border-brand-border px-6 md:px-8 py-5 bg-brand-bg flex flex-wrap gap-4 items-center justify-between sticky bottom-0 z-20">
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
