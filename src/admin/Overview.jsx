import React, { useState, useEffect } from 'react';
import { api } from './api';
import { 
  FolderGit2, Code2, Award, Trophy, Mail, Loader2, ArrowUpRight, MessageSquareDashed
} from 'lucide-react';

export default function Overview({ setActiveTab }) {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    certifications: 0,
    achievements: 0,
    messages: 0,
    unreadMessages: 0
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverviewData = async () => {
      try {
        const [projects, skills, certifications, achievements, messages] = await Promise.all([
          api.get('projects', true),
          api.get('skills', true),
          api.get('certifications'),
          api.get('achievements', true),
          api.get('messages', true)
        ]);

        const unreadCount = messages.filter(m => !m.readStatus).length;

        setStats({
          projects: projects.length,
          skills: skills.length,
          certifications: certifications.length,
          achievements: achievements.length,
          messages: messages.length,
          unreadMessages: unreadCount
        });

        // Set top items
        setRecentProjects(projects.slice(0, 3));
        setRecentMessages(messages.filter(m => !m.readStatus).slice(0, 3));
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadOverviewData();
  }, []);

  if (loading) {
    return (
      <div className="h-96 flex flex-col justify-center items-center">
        <Loader2 size={30} className="animate-spin text-brand-accent mb-3" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-textSecondary">
          FETCHING SYSTEM STATISTICS...
        </span>
      </div>
    );
  }

  const statCards = [
    { id: 'projects', label: 'Total Projects', value: stats.projects, icon: FolderGit2, color: 'text-brand-accent', tab: 'projects' },
    { id: 'skills', label: 'Tech Stack Skills', value: stats.skills, icon: Code2, color: 'text-brand-blue', tab: 'skills' },
    { id: 'certifications', label: 'Certifications', value: stats.certifications, icon: Award, color: 'text-yellow-500', tab: 'certifications' },
    { id: 'achievements', label: 'Achievements', value: stats.achievements, icon: Trophy, color: 'text-brand-accent', tab: 'achievements' },
    { id: 'messages', label: 'Unread Messages', value: stats.unreadMessages, icon: Mail, color: stats.unreadMessages > 0 ? 'text-red-400' : 'text-brand-textSecondary', tab: 'messages' },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-serif font-bold text-brand-textPrimary">Workspace Overview</h2>
        <p className="text-xs text-brand-textSecondary mt-1">Metrics and rapid actions panel.</p>
      </div>

      {/* Grid of Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.id}
              onClick={() => setActiveTab(card.tab)}
              className="p-5 bg-brand-card/30 border border-brand-border/60 rounded-2xl hover:border-brand-accent/30 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <div className={`w-8 h-8 rounded-lg bg-brand-bg border border-brand-border/60 flex items-center justify-center ${card.color}`}>
                  <Icon size={16} />
                </div>
                <ArrowUpRight size={14} className="text-brand-textSecondary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-4">
                <span className="text-[10px] text-brand-textSecondary uppercase font-mono tracking-wider block">
                  {card.label}
                </span>
                <span className="text-3xl font-serif font-bold text-brand-textPrimary mt-1 block">
                  {card.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="p-6 bg-brand-card/30 border border-brand-border/60 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif text-lg font-bold text-brand-textPrimary">Recent Projects</h3>
            <button 
              onClick={() => setActiveTab('projects')}
              className="text-[10px] font-mono text-brand-accent uppercase tracking-widest hover:underline cursor-pointer"
            >
              Manage All
            </button>
          </div>

          {recentProjects.length === 0 ? (
            <div className="h-44 flex flex-col justify-center items-center border border-dashed border-brand-border/40 rounded-xl font-mono text-xs text-brand-textSecondary">
              <span>No projects created yet.</span>
            </div>
          ) : (
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div 
                  key={project._id}
                  className="p-4 bg-black/40 border border-brand-border/40 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img 
                      src={project.coverImage || '/placeholder.png'} 
                      alt={project.title}
                      className="w-12 h-12 object-cover rounded-lg border border-brand-border/50 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-sm font-bold text-brand-textPrimary block truncate">
                        {project.title}
                      </span>
                      <span className="text-[10px] text-brand-textSecondary uppercase font-mono tracking-wider block mt-0.5">
                        {project.category} // {project.status}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded border uppercase tracking-wider font-mono ${
                    project.published 
                      ? 'bg-brand-accent/5 border-brand-accent/30 text-brand-accent' 
                      : 'bg-brand-border/20 border-brand-border/50 text-brand-textSecondary'
                  }`}>
                    {project.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Inbox / Messages */}
        <div className="p-6 bg-brand-card/30 border border-brand-border/60 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif text-lg font-bold text-brand-textPrimary">Recent Unread Messages</h3>
            <button 
              onClick={() => setActiveTab('messages')}
              className="text-[10px] font-mono text-brand-accent uppercase tracking-widest hover:underline cursor-pointer"
            >
              Open Inbox
            </button>
          </div>

          {recentMessages.length === 0 ? (
            <div className="h-44 flex flex-col justify-center items-center border border-dashed border-brand-border/40 rounded-xl text-brand-textSecondary text-xs font-mono">
              <MessageSquareDashed size={20} className="mb-2 text-brand-textSecondary/50" />
              <span>Inbox is completely clean!</span>
            </div>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div 
                  key={msg._id}
                  className="p-4 bg-black/40 border border-brand-border/40 rounded-xl text-left"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-bold text-brand-textPrimary">{msg.name}</span>
                    <span className="text-[9px] font-mono text-brand-textSecondary">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-brand-accent block mt-0.5">{msg.email}</span>
                  <p className="text-xs text-brand-textSecondary mt-2 line-clamp-1 italic">
                    "{msg.message}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
