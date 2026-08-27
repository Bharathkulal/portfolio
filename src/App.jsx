import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Admin Components
import Login from './admin/Login';
import DashboardLayout from './admin/DashboardLayout';

function PublicPortfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [dynProjects, setDynProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch dynamic projects from server, fall back to local mock data if offline
  React.useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetch(
          window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:8000/api/projects'
            : 'https://bharath-portfolio-backend.onrender.com/api/projects'
        );
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setDynProjects(data);
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.warn('Backend offline, using local static data fallback.');
      }
      setDynProjects(projectsData);
      setLoading(false);
    };
    loadProjects();
  }, []);

  return (
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
          <div className="w-full px-6 sm:px-12 lg:px-20 mx-auto">
            <SectionReveal>
              <div className="flex items-center gap-4 mb-16">
                <span className="font-mono text-xs text-brand-accent">03 — SELECTED WORK</span>
                <div className="h-px flex-grow bg-brand-border/50" />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              {loading ? (
                <div className="h-44 flex items-center justify-center font-mono text-xs text-brand-textSecondary">
                  Loading work portfolio...
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {dynProjects.map((project) => (
                    <ProjectCard 
                      key={project._id || project.id} 
                      project={{
                        ...project,
                        id: project._id || project.id,
                        // support dynamic schemas that might save technologies as tags or array
                        tags: project.technologies || project.tags || []
                      }} 
                      onClick={() => setSelectedProject(project)} 
                    />
                  ))}
                </div>
              )}
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
          project={{
            ...selectedProject,
            id: selectedProject._id || selectedProject.id,
            tags: selectedProject.technologies || selectedProject.tags || []
          }} 
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
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/*" element={<DashboardLayout />} />
          <Route path="/" element={<PublicPortfolio />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
