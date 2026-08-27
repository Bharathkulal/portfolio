import React, { useState, useEffect } from 'react';
import { api } from './api';
import { FileText, Plus, Trash2, Check, Loader2, UploadCloud } from 'lucide-react';

export default function ResumeManager() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  
  const fetchResumes = async () => {
    setLoading(true);
    try {
      const data = await api.get('resume', true);
      setResumes(data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileUrl = await api.uploadFile(file);
      await api.post('resume', {
        title: title || file.name,
        fileUrl,
        active: resumes.length === 0 // Make active if it is the first one
      });
      setTitle('');
      fetchResumes();
    } catch (error) {
      alert(error.message || 'Resume upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSetActive = async (id) => {
    try {
      await api.put('resume', id, { active: true });
      fetchResumes();
    } catch (error) {
      alert(error.message || 'Failed to set active');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete('resume', id);
      fetchResumes();
    } catch (error) {
      alert(error.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-6 text-left font-sans max-w-3xl">
      <div>
        <h2 className="text-2xl font-serif font-bold text-brand-textPrimary">Resume Document Controller</h2>
        <p className="text-xs text-brand-textSecondary mt-1">Upload and activate developer resume PDF versions.</p>
      </div>

      {/* Upload Zone */}
      <div className="p-6 bg-brand-card/20 border border-brand-border/60 rounded-3xl space-y-4">
        <h3 className="text-sm font-bold text-brand-textPrimary font-mono uppercase tracking-wider">Upload New Version</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">Document Version Title</label>
            <input 
              type="text" 
              placeholder="e.g. AI Dev Resume 2026" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none"
            />
          </div>
          <div className="flex flex-col justify-end">
            <label className="bg-brand-accent hover:bg-brand-accent/90 text-brand-bg font-mono font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl cursor-pointer flex items-center justify-center gap-2">
              {uploading ? <Loader2 size={12} className="animate-spin" /> : <UploadCloud size={14} />}
              Upload Resume PDF
              <input type="file" accept="application/pdf" onChange={handleResumeUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Versions List */}
      {loading ? (
        <div className="h-44 flex justify-center items-center">
          <Loader2 className="animate-spin text-brand-accent" size={24} />
        </div>
      ) : resumes.length === 0 ? (
        <div className="h-44 flex justify-center items-center border border-dashed border-brand-border/40 rounded-3xl text-brand-textSecondary text-xs font-mono">
          <span>No resume versions found in database.</span>
        </div>
      ) : (
        <div className="space-y-3">
          {resumes.map(r => (
            <div key={r._id} className="p-4 bg-brand-card/30 border border-brand-border/60 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
                  r.active ? 'bg-brand-accent/5 border-brand-accent/30 text-brand-accent' : 'bg-brand-bg border-brand-border/60 text-brand-textSecondary'
                }`}>
                  <FileText size={16} />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-bold text-brand-textPrimary block truncate">{r.title}</span>
                  <a href={r.fileUrl} target="_blank" rel="noreferrer" className="text-[10px] text-brand-textSecondary font-mono hover:underline truncate block mt-0.5">
                    {r.fileUrl}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {r.active ? (
                  <span className="text-[9px] font-mono uppercase bg-brand-accent/10 border border-brand-accent/40 text-brand-accent px-2.5 py-1 rounded-lg">
                    Active Version
                  </span>
                ) : (
                  <button 
                    onClick={() => handleSetActive(r._id)}
                    className="bg-brand-bg border border-brand-border/80 hover:border-brand-accent/30 text-brand-textSecondary hover:text-brand-accent px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider cursor-pointer"
                  >
                    Activate
                  </button>
                )}
                <button 
                  disabled={r.active}
                  onClick={() => handleDelete(r._id)}
                  className="p-2 border border-brand-border/60 text-brand-textSecondary hover:text-red-400 hover:border-red-500/20 rounded-lg cursor-pointer disabled:opacity-20"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
