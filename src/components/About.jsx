import React from 'react';
import SectionReveal from './SectionReveal';
import { Target, Cpu, Layers, Sparkles } from 'lucide-react';

const directions = [
  {
    icon: <Cpu className="text-brand-accent" size={20} />,
    title: "AI/ML Engineer",
    desc: "Targeting predictive logic, model fine-tuning processes, and predictive analytics data flows."
  },
  {
    icon: <Layers className="text-brand-blue" size={20} />,
    title: "Full-Stack Developer",
    desc: "Binding robust user interfaces with reliable, well-documented backend utility logic."
  },
  {
    icon: <Sparkles className="text-brand-accent" size={20} />,
    title: "AI Application Developer",
    desc: "Constructing developer utility interfaces powered by large language models."
  },
  {
    icon: <Target className="text-brand-blue" size={20} />,
    title: "Software Developer",
    desc: "Writing efficient, portable desktop applications and native scripts."
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-brand-bg relative">
      {/* Background decoration lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-brand-border/10 pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto">
        <SectionReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs text-brand-accent">01 — ABOUT</span>
            <div className="h-px flex-grow bg-brand-border/50" />
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Narrative Column */}
          <div className="lg:col-span-5 text-left">
            <SectionReveal delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-textPrimary mb-8 leading-tight">
                Engineering intelligent systems by writing code and building.
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="text-brand-textSecondary text-sm md:text-base leading-relaxed mb-6">
                I am Bharath Kulal, a BCA student specializing in Artificial Intelligence & Machine Learning at Dr. B.B. Hegde First Grade College, Kundapura. I strongly believe the best way to master new technology frameworks is to build real systems.
              </p>
              <p className="text-brand-textSecondary text-sm md:text-base leading-relaxed">
                Rather than memorizing abstract documentation, I spend my time designing interactive web applications, configuring localized hardware layers, and exploring data science modeling tools.
              </p>
            </SectionReveal>
          </div>

          {/* Right Direction Cards Column */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {directions.map((dir, idx) => (
                <SectionReveal key={dir.title} delay={0.1 + idx * 0.08}>
                  <div className="p-6 bg-brand-card/40 border border-brand-border/60 rounded-2xl text-left hover:border-brand-accent/40 transition-colors group">
                    <div className="w-10 h-10 rounded-xl bg-[#14141a] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                      {dir.icon}
                    </div>
                    <h3 className="font-sans font-semibold text-brand-textPrimary text-base mb-2">{dir.title}</h3>
                    <p className="text-brand-textSecondary text-xs leading-relaxed">{dir.desc}</p>
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
