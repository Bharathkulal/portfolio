import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import AISection from './components/AISection';
import Timeline from './components/Timeline';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import SectionReveal from './components/SectionReveal';
import { projectsData } from './data/portfolioData';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-brand-bg text-brand-textPrimary font-sans selection:bg-brand-accent selection:text-brand-bg overflow-x-hidden">
        {/* Background Decorative Tech Outlines */}
        <div className="fixed inset-0 opacity-[0.02] tech-grid-bg pointer-events-none -z-10" />

      {/* Navigation Pill Overlay */}
      <Navigation />

      {/* Single-Page Story Sections */}
      <main>
        {/* 01. Hero Intro */}
        <Hero />

        {/* 02. About Narrative */}
        <About />

        {/* 03. Capabilities Grid */}
        <Skills />

        {/* 04. Selected Work Modules */}
        <section id="projects" className="py-24 px-6 md:px-12 bg-brand-bg relative">
          <div className="w-full max-w-6xl mx-auto">
            <SectionReveal>
              <div className="flex items-center gap-4 mb-16">
                <span className="font-mono text-xs text-brand-accent">03 — SELECTED WORK</span>
                <div className="h-px flex-grow bg-brand-border/50" />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {projectsData.map((project, idx) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={() => setSelectedProject(project)} 
                  />
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* 05. AI/ML Deepening */}
        <AISection />

        {/* 06. Journey Timeline */}
        <Timeline />

        {/* 07. Achievements & Expo */}
        <Achievements />

        {/* 08. Certifications Tracker */}
        <Certifications />

        {/* 09. Connection Console */}
        <Contact />
      </main>

      {/* Dynamic Inspector Drawer Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* Global Mini Technical Footer */}
      <footer className="py-12 border-t border-brand-border/60 bg-brand-bg text-center font-mono text-[9px] text-brand-textSecondary tracking-wider">
        <div className="w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span>BHARATH KULAL // PORTFOLIO_v3.0.0</span>
          <span>BUILD: STABLE // HOSTED: GITHUB_PAGES</span>
        </div>
      </footer>
      </div>
    </ThemeProvider>
  );
}
