import React, { useState, useEffect } from 'react';
import { api } from './api';
import { User, Check, Loader2, UploadCloud } from 'lucide-react';

export default function AboutManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: 'Bharath Kulal',
    shortIntro: '',
    bio: '',
    profileImage: '',
    location: '',
    education: '',
    goal: '',
    interests: '',
    status: ''
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await api.get('about');
        setForm({
          name: data.name || 'Bharath Kulal',
          shortIntro: data.shortIntro || '',
          bio: data.bio || '',
          profileImage: data.profileImage || '',
          location: data.location || '',
          education: data.education || '',
          goal: data.goal || '',
          interests: data.interests ? data.interests.join(', ') : '',
          status: data.status || ''
        });
      } catch (error) {
        console.error('Error fetching About details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await api.uploadFile(file);
      setForm(prev => ({ ...prev, profileImage: url }));
    } catch (error) {
      alert(error.message || 'Profile image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      ...form,
      interests: form.interests ? form.interests.split(',').map(i => i.trim()).filter(Boolean) : []
    };

    try {
      await api.put('about', null, payload);
      alert('About information updated successfully');
    } catch (error) {
      alert(error.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex justify-center items-center">
        <Loader2 className="animate-spin text-brand-accent mr-2" size={24} />
        <span className="font-mono text-xs uppercase tracking-widest text-brand-textSecondary">Syncing About database...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left font-sans max-w-4xl">
      <div>
        <h2 className="text-2xl font-serif font-bold text-brand-textPrimary">About Narrative Profile</h2>
        <p className="text-xs text-brand-textSecondary mt-1">Configure your bio details, location coordinate highlights, and profile uploader.</p>
      </div>

      <form onSubmit={handleSave} className="bg-brand-card/20 border border-brand-border/60 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left profile image section */}
          <div className="flex flex-col items-center gap-4 text-center">
            <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary font-bold self-start">
              Profile Photo
            </label>
            <div className="w-40 h-40 rounded-3xl overflow-hidden border border-brand-border/80 bg-black/40 relative group">
              {form.profileImage ? (
                <img src={form.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-brand-textSecondary">
                  <User size={36} />
                </div>
              )}
            </div>
            
            <label className="bg-brand-bg hover:bg-brand-card border border-brand-border/60 py-2.5 px-4 rounded-xl text-xs text-brand-textPrimary font-mono uppercase tracking-wider cursor-pointer flex items-center gap-2">
              {uploading ? <Loader2 size={12} className="animate-spin" /> : <UploadCloud size={14} />}
              Upload Photo
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

          {/* Right text fields */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">Display Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">Location Coordinate</label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">Short Introduction *</label>
              <input
                type="text"
                required
                value={form.shortIntro}
                onChange={(e) => setForm(prev => ({ ...prev, shortIntro: e.target.value }))}
                placeholder="Hey, I'm Bharath Kulal"
                className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold font-bold">Full Biography *</label>
          <textarea
            required
            rows={5}
            value={form.bio}
            onChange={(e) => setForm(prev => ({ ...prev, bio: e.target.value }))}
            placeholder="Introduce yourself, your training, college details, and work habits..."
            className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none font-sans"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">Education (Summary)</label>
            <input
              type="text"
              value={form.education}
              onChange={(e) => setForm(prev => ({ ...prev, education: e.target.value }))}
              placeholder="e.g. BCA Student specializing in AI/ML"
              className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">Status / Availabilities</label>
            <input
              type="text"
              value={form.status}
              onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))}
              placeholder="e.g. Open to full-stack opportunities"
              className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">Career Goals / Focus</label>
            <input
              type="text"
              value={form.goal}
              onChange={(e) => setForm(prev => ({ ...prev, goal: e.target.value }))}
              placeholder="e.g. Building intelligent apps and services"
              className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">Interests / Focus Areas (comma separated)</label>
            <input
              type="text"
              value={form.interests}
              onChange={(e) => setForm(prev => ({ ...prev, interests: e.target.value }))}
              placeholder="Machine Learning, Web UI, IoT"
              className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-brand-border/40 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-brand-accent text-brand-bg font-mono font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-brand-accent/90 transition-colors cursor-pointer disabled:opacity-60"
          >
            {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
            Update Biography Details
          </button>
        </div>
      </form>
    </div>
  );
}
