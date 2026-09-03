import React from 'react';
import SectionReveal from './SectionReveal';
import { motion } from 'framer-motion';
import { Network, Brain, Database, Cpu, Activity } from 'lucide-react';

const pipelineBlocks = [
  {
    icon: <Database className="text-brand-accent" size={22} />,
    title: "1. Data Collection & Preprocessing",
    desc: "Ingesting raw records, tokenizing documents, cleaning datasets, and normalising coordinates."
  },
  {
    icon: <Network className="text-brand-blue" size={22} />,
    title: "2. Vector Embeddings & Vector Stores",
    desc: "Mapping text blocks to dense coordinate vectors. Experimenting with local document retrieval indexing."
  },
  {
    icon: <Brain className="text-brand-accent" size={22} />,
    title: "3. Neural Layers & Prompt Engineering",
    desc: "Structuring strict response formats from LLM interfaces. Designing custom context maps."
  },
  {
    icon: <Cpu className="text-brand-blue" size={22} />,
    title: "4. Fine-Tuning & Application Delivery",
    desc: "Deploying model inference pipelines behind lightweight local APIs for frontend clients."
  }
];

export default function AISection() {
  return (
    <section id="ai-focus" className="py-24 px-6 md:px-12 bg-brand-bg relative">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/40 to-transparent pointer-events-none" />

      <div className="w-full px-6 sm:px-12 lg:px-20 mx-auto">
        <SectionReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs text-brand-accent">03 — AI / ML SPECIALIZATION</span>
            <div className="h-px flex-grow bg-brand-border/50" />
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Copy & Diagram */}
          <div className="lg:col-span-5 text-left">
            <SectionReveal delay={0.1}>
              <span className="font-mono text-[10px] text-brand-blue tracking-widest uppercase block mb-3">
                ROADMAP // ENGINEERING FOCUS
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-brand-textPrimary mb-6 leading-tight">
                AI is not a keyword. It is a direction.
              </h2>
              <p className="text-brand-textSecondary text-sm leading-relaxed mb-8">
                My education program at Dr. B.B. Hegde College focuses heavily on the structural components of machine intelligence. I am building projects to explore neural processing pipelines, vector embedding databases, and model prompt design layers.
              </p>
            </SectionReveal>

            {/* Simulated Live telemetry stats */}
            <SectionReveal delay={0.2}>
              <div className="p-5 border border-brand-border/60 bg-brand-card/60 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-accent/5 border border-brand-accent/20 flex items-center justify-center text-brand-accent animate-pulse">
                  <Activity size={18} />
                </div>
                <div className="font-mono">
                  <span className="text-[10px] text-brand-textSecondary block uppercase tracking-wider">Telemetry State</span>
                  <span className="text-xs text-brand-textPrimary font-semibold">LLM_ENGIN_ACTIVE // VECTOR_DB_STABLE</span>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Right: Pipeline blocks */}
          <div className="lg:col-span-7">
            <div className="relative pl-6 md:pl-10 text-left border-l border-brand-border/80 flex flex-col gap-8">
              {pipelineBlocks.map((block, idx) => (
                <SectionReveal key={idx} delay={0.1 + idx * 0.08}>
                  <div className="relative group">
                    {/* Floating node dot */}
                    <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full border border-brand-border bg-brand-bg flex items-center justify-center group-hover:border-brand-accent transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-textSecondary group-hover:bg-brand-accent transition-colors"></span>
                    </div>

                    <motion.div 
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-5 bg-brand-card/40 border border-brand-border/60 hover:border-brand-accent/40 rounded-2xl transition-all shadow-sm cursor-default"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        {block.icon}
                        <h3 className="font-sans font-bold text-brand-textPrimary text-sm md:text-base">
                          {block.title}
                        </h3>
                      </div>
                      <p className="text-brand-textSecondary text-xs leading-relaxed pl-8">
                        {block.desc}
                      </p>
                    </motion.div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
