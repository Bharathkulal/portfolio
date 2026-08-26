import React from 'react';
import SectionReveal from './SectionReveal';
import { skillsData } from '../data/portfolioData';

const skillCategories = [
  { key: "frontend", title: "Frontend", color: "border-brand-accent/20 hover:border-brand-accent/40" },
  { key: "programming", title: "Programming Languages", color: "border-brand-blue/20 hover:border-brand-blue/40" },
  { key: "database", title: "Database Systems", color: "border-brand-accent/20 hover:border-brand-accent/40" },
  { key: "aiMl", title: "AI / Machine Learning", color: "border-brand-blue/20 hover:border-brand-blue/40" },
  { key: "iot", title: "IoT / Hardware", color: "border-brand-accent/20 hover:border-brand-accent/40" },
  { key: "tools", title: "Developer Tools", color: "border-[#1a1a24] hover:border-brand-textSecondary/40" }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-[#0c0c10] relative">
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
                        // Check if skill has tags like (Beginner) or is special
                        const isReact = skill.includes('React');
                        return (
                          <span
                            key={skill}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all duration-200 ${
                              isReact 
                                ? 'bg-brand-blue/5 border-brand-blue/25 text-brand-blue font-medium' 
                                : 'bg-[#14141a]/60 border-brand-border/60 text-brand-textPrimary hover:border-brand-accent/30'
                            }`}
                          >
                            {skill}
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
