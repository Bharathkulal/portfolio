import React, { useRef, useState, useEffect } from 'react';
import { ExternalLink, Terminal } from 'lucide-react';

export default function ProjectCard({ project, onClick }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch-only capabilities
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const tiltStyle = isHovered && !isTouch
    ? {
        transform: `perspective(1000px) rotateX(${-(coords.y / 20)}deg) rotateY(${coords.x / 20}deg) scale(1.02)`,
        transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)'
      }
    : {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
      };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={tiltStyle}
      className="bg-brand-card/40 border border-brand-border/60 rounded-3xl overflow-hidden cursor-none flex flex-col justify-between h-[360px] group transition-all duration-300 hover:border-brand-accent/40"
    >
      {/* Top Meta Details */}
      <div className="p-6 pb-2 text-left flex justify-between items-start">
        <div>
          <span className="font-mono text-[10px] tracking-widest text-brand-textSecondary uppercase block mb-1">
            PROJECT // MODULE
          </span>
          <h3 className="text-2xl font-bold text-brand-textPrimary group-hover:text-brand-accent transition-colors">
            {project.name}
          </h3>
        </div>
        
        {/* Project Status Indicators */}
        <span className={`font-mono text-[9px] px-2 py-0.5 rounded border uppercase tracking-wider ${
          project.statusType === 'live' 
            ? 'bg-brand-accent/5 border-brand-accent/30 text-brand-accent'
            : project.statusType === 'dev'
            ? 'bg-brand-blue/5 border-brand-blue/30 text-brand-blue'
            : 'bg-yellow-500/5 border-yellow-500/30 text-yellow-500'
        }`}>
          {project.status}
        </span>
      </div>

      {/* Visual / Screenshot Mock Area */}
      <div className="relative mx-6 h-36 rounded-2xl overflow-hidden bg-brand-bg/80 border border-brand-border flex items-center justify-center group-hover:border-brand-accent/20 transition-all">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card to-transparent opacity-40" />
        
        {/* Placeholder mesh */}
        <div className="absolute inset-0 opacity-5 tech-grid-bg" />

        {/* Fallback graphical icons */}
        <div className="flex flex-col items-center justify-center p-4 z-10 text-brand-textSecondary/40 group-hover:text-brand-accent/60 transition-colors">
          <Terminal size={24} className="mb-2" />
          <span className="font-mono text-[9px] tracking-wider uppercase">[ Preview Screenshot Placeholder ]</span>
        </div>

        {/* Image overlay when file populated */}
        <img 
          src={project.image} 
          alt={project.name}
          onError={(e) => e.target.style.display = 'none'}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Footer Info details */}
      <div className="p-6 pt-2 text-left">
        <p className="text-xs text-brand-textSecondary leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="font-mono text-[9px] text-brand-textSecondary bg-[#14141a] px-2 py-0.5 rounded border border-brand-border/60">
                {tag}
              </span>
            ))}
          </div>

          <button className="flex items-center gap-1 font-mono text-[10px] text-brand-accent font-semibold tracking-wider transition-all hover:text-brand-textPrimary">
            INSPECT SPEC 
            <ExternalLink size={10} />
          </button>
        </div>
      </div>
    </div>
  );
}
