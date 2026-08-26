import React from 'react';
import SectionReveal from './SectionReveal';
import { skillsData } from '../data/portfolioData';
import { Brain, Cpu, Database, Cpu as Chip, HardDrive, Terminal, Code2 } from 'lucide-react';

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
  if (name.includes('javascript')) {
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

const skillCategories = [
  { key: "frontend", title: "Frontend", color: "border-brand-accent/20 hover:border-brand-accent/40" },
  { key: "programming", title: "Programming Languages", color: "border-brand-blue/20 hover:border-brand-blue/40" },
  { key: "database", title: "Database Systems", color: "border-brand-accent/20 hover:border-brand-accent/40" },
  { key: "aiMl", title: "AI / Machine Learning", color: "border-brand-blue/20 hover:border-brand-blue/40" },
  { key: "iot", title: "IoT / Hardware", color: "border-brand-accent/20 hover:border-brand-accent/40" },
  { key: "tools", title: "Developer Tools", color: "border-brand-border hover:border-brand-textSecondary/40" }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-brand-bg relative">
      <div className="absolute top-0 right-1/4 w-px h-full bg-brand-border/10 pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto">
        <SectionReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs text-brand-accent">02 — CAPABILITIES</span>
            <div className="h-px flex-grow bg-brand-border/50" />
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {skillCategories.map((cat, idx) => {
            const list = skillsData[cat.key];
            return (
              <SectionReveal key={cat.key} delay={idx * 0.06}>
                <div className={`p-6 bg-brand-card/30 border rounded-2xl h-full flex flex-col justify-between transition-all duration-300 ${cat.color}`}>
                  <div>
                    <h3 className="font-mono text-xs text-brand-textSecondary tracking-widest uppercase mb-6">
                      {cat.title}
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {list.map((skill) => {
                        const isReact = skill.includes('React');
                        return (
                          <span
                            key={skill}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all duration-200 flex items-center gap-2 ${
                              isReact 
                                ? 'bg-brand-blue/5 border-brand-blue/25 text-brand-blue font-medium' 
                                : 'bg-brand-tertiary/60 border-brand-border/60 text-brand-textPrimary hover:border-brand-accent/30'
                            }`}
                          >
                            {getSkillIcon(skill)}
                            <span>{skill}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
