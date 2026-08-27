import React, { useState, useEffect } from 'react';
import { api } from './api';
import { Settings, Check, Loader2, Key } from 'lucide-react';

export default function SettingsManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [form, setForm] = useState({
    portfolioTitle: '',
    description: '',
    profileName: '',
    email: '',
    location: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    ogImage: '',
    favicon: '',
    heroTitle: '',
    heroSubtitle: '',
    heroDescription: '',
    contactEmail: '',
    contactPhone: '',
    contactLocation: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await api.get('settings');
        setForm({
          portfolioTitle: data.portfolioTitle || '',
          description: data.description || '',
          profileName: data.profileName || '',
          email: data.email || '',
          location: data.location || '',
          seoTitle: data.seoTitle || '',
          seoDescription: data.seoDescription || '',
          seoKeywords: data.seoKeywords ? data.seoKeywords.join(', ') : '',
          ogImage: data.ogImage || '',
          favicon: data.favicon || '',
          heroTitle: data.heroTitle || '',
          heroSubtitle: data.heroSubtitle || '',
          heroDescription: data.heroDescription || '',
          contactEmail: data.contactEmail || '',
          contactPhone: data.contactPhone || '',
          contactLocation: data.contactLocation || ''
        });
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      seoKeywords: form.seoKeywords ? form.seoKeywords.split(',').map(k => k.trim()).filter(Boolean) : []
    };

    try {
      await api.put('settings', null, payload);
      alert('Site settings updated successfully');
    } catch (error) {
      alert(error.message || 'Save settings failed');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    setChangingPassword(true);
    try {
      await api.changePassword(passwordForm.currentPassword, passwordForm.newPassword);
      setPasswordSuccess('Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setPasswordError(error.message || 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="h-96 flex justify-center items-center">
        <Loader2 className="animate-spin text-brand-accent mr-2" size={24} />
        <span className="font-mono text-xs uppercase tracking-widest text-brand-textSecondary">Syncing Settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-left font-sans max-w-4xl">
      <div>
        <h2 className="text-2xl font-serif font-bold text-brand-textPrimary">Site Configuration Console</h2>
        <p className="text-xs text-brand-textSecondary mt-1">Configure global portfolio headings, SEO keywords, and security variables.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings Form */}
        <form onSubmit={handleSaveSettings} className="lg:col-span-2 bg-brand-card/20 border border-brand-border/60 rounded-3xl p-6 md:p-8 space-y-6">
          
          {/* General Metadata */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-brand-textPrimary font-mono uppercase tracking-wider">General Configurations</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1 font-bold">Portfolio Title</label>
                <input type="text" value={form.portfolioTitle} onChange={e => setForm({...form, portfolioTitle: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
              </div>
              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1 font-bold">Profile Name</label>
                <input type="text" value={form.profileName} onChange={e => setForm({...form, profileName: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Hero Section settings */}
          <div className="space-y-4 pt-4 border-t border-brand-border/40">
            <h3 className="text-sm font-bold text-brand-textPrimary font-mono uppercase tracking-wider">Hero Section Headlines</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1 font-bold">Heading Title</label>
                <input type="text" value={form.heroTitle} onChange={e => setForm({...form, heroTitle: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
              </div>
              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1 font-bold">Role Subtitle</label>
                <input type="text" value={form.heroSubtitle} onChange={e => setForm({...form, heroSubtitle: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1 font-bold">Hero Description</label>
              <textarea rows={2} value={form.heroDescription} onChange={e => setForm({...form, heroDescription: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="space-y-4 pt-4 border-t border-brand-border/40">
            <h3 className="text-sm font-bold text-brand-textPrimary font-mono uppercase tracking-wider">SEO Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1 font-bold">Meta Title</label>
                <input type="text" value={form.seoTitle} onChange={e => setForm({...form, seoTitle: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
              </div>
              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1 font-bold">Keywords (comma separated)</label>
                <input type="text" placeholder="AI, Developer, Full-stack" value={form.seoKeywords} onChange={e => setForm({...form, seoKeywords: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1 font-bold">Meta Description</label>
              <input type="text" value={form.seoDescription} onChange={e => setForm({...form, seoDescription: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
            </div>
          </div>

          {/* Contact settings */}
          <div className="space-y-4 pt-4 border-t border-brand-border/40">
            <h3 className="text-sm font-bold text-brand-textPrimary font-mono uppercase tracking-wider">Contact Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1 font-bold">Contact Email</label>
                <input type="email" value={form.contactEmail} onChange={e => setForm({...form, contactEmail: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
              </div>
              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1 font-bold">Contact Phone</label>
                <input type="text" value={form.contactPhone} onChange={e => setForm({...form, contactPhone: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-border/40 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-brand-accent text-brand-bg font-mono font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-brand-accent/90 transition-colors cursor-pointer disabled:opacity-60"
            >
              {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
              Save Site Settings
            </button>
          </div>
        </form>

        {/* Change Password Sidebar panel */}
        <div className="space-y-6">
          <form onSubmit={handleChangePassword} className="bg-brand-card/20 border border-brand-border/60 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-brand-accent font-mono text-[10px] uppercase tracking-widest font-bold">
              <Key size={14} /> Password Controller
            </div>
            
            {passwordError && (
              <div className="bg-red-500/5 border border-red-500/20 text-red-400 p-3 rounded-xl text-[10px] font-mono">
                {passwordError}
              </div>
            )}

            {passwordSuccess && (
              <div className="bg-brand-accent/5 border border-brand-accent/20 text-brand-accent p-3 rounded-xl text-[10px] font-mono">
                {passwordSuccess}
              </div>
            )}

            <div>
              <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">Current Password</label>
              <input type="password" required value={passwordForm.currentPassword} onChange={e => setPasswordForm({...passwordForm, currentPassword: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
            </div>

            <div>
              <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">New Password</label>
              <input type="password" required value={passwordForm.newPassword} onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
            </div>

            <div>
              <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">Confirm New Password</label>
              <input type="password" required value={passwordForm.confirmPassword} onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
            </div>

            <button
              type="submit"
              disabled={changingPassword}
              className="w-full mt-2 bg-brand-bg hover:bg-brand-card text-brand-textPrimary border border-brand-border hover:border-brand-accent/30 py-2.5 px-4 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {changingPassword ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
