import React from 'react';
import SectionReveal from './SectionReveal';
import { activitiesData } from '../data/portfolioData';
import { Award, Layers, Trophy } from 'lucide-react';

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 px-6 md:px-12 bg-brand-bg relative">
      <div className="w-full max-w-5xl mx-auto">
        <SectionReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs text-brand-accent">05 — EXPERIENCES & ACTIVITIES</span>
            <div className="h-px flex-grow bg-brand-border/50" />
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          
          {/* Exhibitions Column */}
          <SectionReveal delay={0.1}>
            <div className="p-8 bg-brand-card/30 border border-brand-border/60 rounded-3xl h-full">
              <div className="flex items-center gap-3 mb-6">
                <Layers className="text-brand-accent" size={22} />
                <h3 className="text-xl font-bold text-brand-textPrimary">Project Demonstrations</h3>
              </div>
              <p className="text-brand-textSecondary text-xs leading-relaxed mb-6 font-light">
                Presenting conceptual designs and applications at regional IT models and college events.
              </p>
              
              <ul className="flex flex-col gap-4">
                {activitiesData.exhibitions.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start border-l border-brand-border/80 pl-4 py-1">
                    <span className="font-mono text-xs text-brand-accent mt-0.5">0{idx + 1}</span>
                    <span className="text-xs md:text-sm text-brand-textPrimary font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          {/* Competitions Column */}
          <SectionReveal delay={0.2}>
            <div className="p-8 bg-brand-card/30 border border-brand-border/60 rounded-3xl h-full">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="text-brand-blue" size={22} />
                <h3 className="text-xl font-bold text-brand-textPrimary">IT & Code Challenges</h3>
              </div>
              <p className="text-brand-textSecondary text-xs leading-relaxed mb-6 font-light">
                Verifying core logical foundations through university-level speed, search, and design tests.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activitiesData.competitions.map((comp, idx) => (
                  <div key={idx} className="p-4 bg-brand-tertiary/60 border border-brand-border/40 rounded-xl flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-brand-blue/5 border border-brand-blue/20 flex items-center justify-center text-[10px] font-mono text-brand-blue font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-xs text-brand-textPrimary font-medium">{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

        </div>
      </div>
    </section>
  );
}
