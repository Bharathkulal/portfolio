import React from 'react';
import SectionReveal from './SectionReveal';
import { educationData } from '../data/portfolioData';
import { GraduationCap, Calendar } from 'lucide-react';

export default function Timeline() {
  return (
    <section id="journey" className="py-24 px-6 md:px-12 bg-brand-bg relative">
      <div className="absolute top-0 left-1/3 w-px h-full bg-brand-border/10 pointer-events-none" />

      <div className="w-full px-6 sm:px-12 lg:px-20 mx-auto">
        <SectionReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs text-brand-accent">04 — JOURNEY</span>
            <div className="h-px flex-grow bg-brand-border/50" />
          </div>
        </SectionReveal>

        <div className="relative pl-6 md:pl-8 text-left border-l border-brand-border/80 flex flex-col gap-10">
          {educationData.map((item, idx) => (
            <SectionReveal key={idx} delay={idx * 0.1}>
              <div className="relative group">
                {/* Visual marker dot */}
                <div className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border bg-brand-bg flex items-center justify-center transition-colors ${
                  idx === 0 
                    ? 'border-brand-accent bg-brand-accent/15' 
                    : 'border-brand-border group-hover:border-brand-blue'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    idx === 0 ? 'bg-brand-accent' : 'bg-brand-textSecondary group-hover:bg-brand-blue'
                  }`}></span>
                </div>

                <div className="p-6 md:p-8 bg-brand-card/30 border border-brand-border/60 hover:border-brand-border rounded-3xl transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-brand-blue uppercase tracking-wider">
                      <Calendar size={12} />
                      <span>{item.period}</span>
                    </div>
                    {idx === 0 && (
                      <span className="font-mono text-[9px] bg-brand-accent/5 border border-brand-accent/30 text-brand-accent px-2 py-0.5 rounded uppercase">
                        ACTIVE_ENROLLMENT
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-brand-textPrimary mb-2 flex items-center gap-2.5">
                    <GraduationCap className="text-brand-accent" size={20} />
                    {item.degree}
                  </h3>
                  
                  <p className="font-mono text-xs text-brand-textSecondary mb-4">
                    {item.institution}
                  </p>

                  <p className="text-brand-textSecondary text-xs md:text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
