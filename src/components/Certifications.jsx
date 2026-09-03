import React from 'react';
import { motion } from 'framer-motion';
import SectionReveal from './SectionReveal';
import { certificationsData } from '../data/portfolioData';
import { Award, ShieldAlert } from 'lucide-react';

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 md:px-12 bg-brand-bg relative">
      <div className="w-full px-6 sm:px-12 lg:px-20 mx-auto">
        <SectionReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs text-brand-accent">06 — CREDENTIALS</span>
            <div className="h-px flex-grow bg-brand-border/50" />
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {certificationsData.map((cert, idx) => (
            <SectionReveal key={cert.name} delay={idx * 0.08}>
              <motion.div 
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="p-6 bg-brand-card/40 border border-brand-border/60 hover:border-brand-accent/40 rounded-2xl flex flex-col justify-between h-48 transition-all shadow-sm cursor-default"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-8 h-8 rounded-lg bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                      <Award size={18} />
                    </div>
                    <span className="font-mono text-[8px] bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full uppercase font-semibold">
                      IN_PROGRESS
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-brand-textPrimary text-sm md:text-base mb-1">
                    {cert.name}
                  </h3>
                  <span className="font-mono text-[10px] text-brand-textSecondary">
                    Credential Program
                  </span>
                </div>

                <div className="border-t border-brand-border/80 pt-3 flex items-center gap-1.5 font-mono text-[9px] text-brand-textSecondary">
                  <ShieldAlert size={10} className="text-yellow-500" />
                  <span>PH // [EDIT IN DATA]</span>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
