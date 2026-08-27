import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from './api';
import { 
  LayoutDashboard, FolderGit2, Code2, User, Briefcase, GraduationCap, 
  Award, Trophy, Settings, Link2, FileText, Mail, LogOut, Loader2, Menu, X, ShieldAlert
} from 'lucide-react';

// Subviews
import Overview from './Overview';
import ProjectManager from './ProjectManager';
import SkillManager from './SkillManager';
import AboutManager from './AboutManager';
import TimelineManager from './TimelineManager';
import ContactMessages from './ContactMessages';
import SettingsManager from './SettingsManager';
import ResumeManager from './ResumeManager';

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const isValid = await api.verifySession();
      if (!isValid) {
        navigate('/admin/login');
      } else {
        setLoading(false);
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogout = () => {
    api.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'about', label: 'About Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'social', label: 'Social Links', icon: Link2 },
    { id: 'resume', label: 'Resume PDF', icon: FileText },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'settings', label: 'Site Settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center font-sans text-brand-textPrimary">
        <Loader2 size={36} className="animate-spin text-brand-accent mb-4" />
        <span className="font-mono text-xs uppercase tracking-widest text-brand-textSecondary">
          SECURING WORKSPACE CONSOLE...
        </span>
      </div>
    );
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Overview setActiveTab={setActiveTab} />;
      case 'projects':
        return <ProjectManager />;
      case 'skills':
        return <SkillManager />;
      case 'about':
        return <AboutManager />;
      case 'experience':
        return <TimelineManager type="experience" />;
      case 'education':
        return <TimelineManager type="education" />;
      case 'certifications':
        return <TimelineManager type="certifications" />;
      case 'achievements':
        return <TimelineManager type="achievements" />;
      case 'social':
        return <TimelineManager type="social" />;
      case 'resume':
        return <ResumeManager />;
      case 'messages':
        return <ContactMessages />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <Overview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-brand-textPrimary font-sans flex relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Sidebar Navigation */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-brand-card/30 border-r border-brand-border/60 backdrop-blur-md flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo / Header */}
          <div className="p-6 border-b border-brand-border/40 flex justify-between items-center">
            <div>
              <h1 className="text-lg font-serif font-bold text-brand-textPrimary flex items-center gap-2">
                <ShieldAlert size={18} className="text-brand-accent" />
                Console
              </h1>
              <span className="text-[9px] text-brand-textSecondary font-mono uppercase tracking-widest block mt-0.5">
                PORTFOLIO_CMS_v1
              </span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-brand-textSecondary hover:text-brand-textPrimary"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 group text-left cursor-pointer ${
                    isActive 
                      ? 'bg-brand-accent/10 border border-brand-accent/30 text-brand-accent font-medium' 
                      : 'border border-transparent text-brand-textSecondary hover:text-brand-textPrimary hover:bg-brand-card/50'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-brand-accent' : 'text-brand-textSecondary group-hover:text-brand-textPrimary'} />
                  <span className="text-xs font-mono uppercase tracking-wider">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User / Logout */}
        <div className="p-4 border-t border-brand-border/40">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="truncate text-left pr-2">
              <span className="text-[10px] text-brand-textSecondary font-mono block">CONNECTED_AS:</span>
              <span className="text-xs font-bold text-brand-textPrimary truncate block">
                {localStorage.getItem('admin_email') || 'admin'}
              </span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 border border-red-500/30 hover:bg-red-500/10 text-red-400 font-mono text-[10px] uppercase tracking-wider py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut size={12} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow lg:pl-64 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-16 border-b border-brand-border/40 bg-brand-bg/40 backdrop-blur-md px-6 flex items-center justify-between lg:justify-end z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-brand-textSecondary hover:text-brand-textPrimary flex items-center gap-2 cursor-pointer"
          >
            <Menu size={20} />
            <span className="font-mono text-xs uppercase tracking-wider">Navigation</span>
          </button>
          
          <div className="flex items-center gap-4 text-xs font-mono text-brand-textSecondary">
            <span className="hidden sm:inline">DB_STATUS: <span className="text-brand-accent">ONLINE</span></span>
            <span className="hidden sm:inline">//</span>
            <span>DATE: {new Date().toLocaleDateString()}</span>
          </div>
        </header>

        {/* Dashboard Subview Wrapper */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto max-w-full">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}
