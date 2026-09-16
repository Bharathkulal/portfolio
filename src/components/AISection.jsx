import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Sparkles, Database } from 'lucide-react';

const pillars = [
  {
    title: "Generative AI & LLMs",
    desc: "Designing prompt engineering pipelines, retrieval-augmented generation (RAG), and custom structured agents."
  },
  {
    title: "Computer Vision",
    desc: "Processing image/video streams, feature extraction, neural classification, and real-time tensor inference."
  },
  {
    title: "Automated Systems",
    desc: "Integrating Python and machine learning backends with responsive, user-friendly frontend interfaces."
  }
];

export default function AISection() {
  return (
    <section 
      id="ai-focus" 
      className="editorial-section min-h-screen w-full bg-brand-bg relative flex items-center justify-center py-24 px-6 sm:px-10 lg:px-16 border-t border-brand-border/40"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-between min-h-[80vh]">
        
        {/* Top Section Header */}
        <div className="flex items-end justify-between border-b border-brand-border/40 pb-6 mb-10 text-left">
          <div>
            <span className="editorial-tag text-xs text-brand-accent tracking-[0.25em] font-semibold block mb-2">
              // METHODOLOGY
            </span>
            <h2 className="editorial-title text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-textPrimary uppercase leading-none">
              AI FOCUS
            </h2>
          </div>

          <span className="editorial-number text-5xl sm:text-6xl font-light text-brand-textSecondary/25 tracking-tighter">
            04
          </span>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center flex-1 my-auto">
          
          {/* Left Column: Big Headline */}
          <div className="lg:col-span-6 text-left flex flex-col justify-center">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-title text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-brand-textPrimary uppercase leading-tight mb-6"
            >
              BUILDING<br />
              INTELLIGENT<br />
              <span className="text-brand-accent">SYSTEMS.</span>
            </motion.h3>

            <p className="font-sans text-sm sm:text-base text-brand-textSecondary leading-relaxed max-w-lg font-normal">
              Specializing in the intersection of cognitive algorithms, machine learning models, and intuitive user experiences.
            </p>
          </div>

          {/* Right Column: Clean System Flow & Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-8">
            
            {/* Minimal System Flow: INPUT -> MODEL -> OUTPUT */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-2xl border border-brand-border/80 bg-brand-card/70 backdrop-blur-sm"
            >
              <span className="font-mono text-[10px] tracking-widest text-brand-textSecondary uppercase block mb-4 text-left">
                SYSTEM PIPELINE ARCHITECTURE
              </span>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center">
                {/* 01. Input */}
                <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-brand-border/60 bg-brand-bg text-center">
                  <Database size={16} className="text-brand-textSecondary mb-1.5" />
                  <span className="font-mono text-[11px] font-bold text-brand-textPrimary uppercase tracking-wider">
                    INPUT
                  </span>
                  <span className="text-[9px] text-brand-textSecondary mt-0.5">
                    Data / Prompts
                  </span>
                </div>

                {/* Arrow 1 */}
                <div className="flex items-center justify-center text-brand-accent">
                  <ArrowRight size={16} className="animate-pulse" />
                </div>

                {/* 02. Model */}
                <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-brand-accent/40 bg-brand-accent/5 text-center">
                  <Cpu size={16} className="text-brand-accent mb-1.5" />
                  <span className="font-mono text-[11px] font-bold text-brand-accent uppercase tracking-wider">
                    MODEL
                  </span>
                  <span className="text-[9px] text-brand-textSecondary mt-0.5">
                    Neural Engine
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center my-2 text-brand-accent">
                <ArrowRight size={16} className="rotate-90 animate-pulse" />
              </div>

              {/* 03. Output */}
              <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl border border-brand-border/60 bg-brand-bg text-left">
                <div className="flex items-center gap-2.5">
                  <Sparkles size={16} className="text-brand-accent" />
                  <div>
                    <span className="font-mono text-[11px] font-bold text-brand-textPrimary uppercase tracking-wider block">
                      OUTPUT / ACTION
                    </span>
                    <span className="text-[9px] text-brand-textSecondary">
                      Optimized Inference & Web Integration
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest">
                  READY
                </span>
              </div>
            </motion.div>

            {/* Three Clean Focus Areas */}
            <div className="space-y-4 text-left">
              {pillars.map((item, idx) => (
                <div key={item.title} className="pb-3 border-b border-brand-border/30 last:border-0">
                  <h4 className="font-sans font-bold text-sm text-brand-textPrimary mb-1">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-brand-textSecondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Bottom Section Margin */}
        <div className="hidden sm:block" />

      </div>
    </section>
  );
}
