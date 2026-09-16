import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import ProjectShowcase from './components/ProjectShowcase';
import ProjectModal from './components/ProjectModal';
import AISection from './components/AISection';
import Contact from './components/Contact';
import { projectsData } from './data/portfolioData';
import { ThemeProvider } from './context/ThemeContext';

// Admin Components
import Login from './admin/Login';
import DashboardLayout from './admin/DashboardLayout';

function PublicPortfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [dynProjects, setDynProjects] = useState([]);
  const [aboutInfo, setAboutInfo] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      // 1. Fetch About Info
      try {
        const aboutRes = await fetch(
          window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:8000/api/about'
            : 'https://bharath-portfolio-backend.onrender.com/api/about'
        );
        if (aboutRes.ok) {
          const aboutData = await aboutRes.json();
          if (aboutData) {
            setAboutInfo(aboutData);
          }
        }
      } catch {
        // Fallback gracefully
      }

      // 2. Fetch Projects
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
            return;
          }
        }
      } catch {
        // Fallback gracefully
      }
      setDynProjects(projectsData);
    };
    loadData();
  }, []);

  return (
    <div className="relative min-h-screen bg-brand-bg text-brand-textPrimary font-sans selection:bg-brand-accent selection:text-brand-bg overflow-x-hidden">
      {/* Subtle Grain Texture Overlay */}
      <div className="grain-overlay" />

      {/* Minimal Navigation & Edge Progress Indicator */}
      <Navigation />

      {/* Minimal Scroll-Driven Editorial Sequence */}
      <main className="w-full">
        {/* Screen 00: Opening Title */}
        <Hero />

        {/* Screen 01: Three-Column Editorial About Me */}
        <About aboutInfo={aboutInfo} />

        {/* Screen 02: Typography-Driven Skills */}
        <Skills />

        {/* Screen 03: Editorial Project Showcase */}
        <ProjectShowcase 
          projects={dynProjects.length > 0 ? dynProjects : projectsData} 
          onSelectProject={setSelectedProject} 
        />

        {/* Screen 04: AI Focus & Methodology */}
        <AISection />

        {/* Screen 05: Minimal Contact Screen */}
        <Contact />
      </main>

      {/* Dynamic Project Architecture Inspection Drawer */}
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
