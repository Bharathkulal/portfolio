import React, { useState, useEffect } from 'react';
import { api } from './api';
import { 
  Code2, Plus, Edit2, Trash2, ArrowUp, ArrowDown, X, Check, Loader2, UploadCloud
} from 'lucide-react';

export default function SkillManager() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [form, setForm] = useState({
    name: '',
    logoUrl: '',
    category: 'frontend',
    enabled: true
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const data = await api.get('skills', true);
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenAdd = () => {
    setEditingSkill(null);
    setForm({
      name: '',
      logoUrl: '',
      category: 'frontend',
      enabled: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingSkill(skill);
    setForm({
      name: skill.name,
      logoUrl: skill.logoUrl || '',
      category: skill.category,
      enabled: skill.enabled !== false
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await api.uploadFile(file);
      setForm(prev => ({ ...prev, logoUrl: url }));
    } catch (error) {
      alert(error.message || 'Logo upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category) return;
    setSaving(true);
    try {
      if (editingSkill) {
        await api.put('skills', editingSkill._id, form);
      } else {
        await api.post('skills', form);
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (error) {
      alert(error.message || 'Saving failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete('skills', id);
      setDeleteConfirmId(null);
      fetchSkills();
    } catch (error) {
      alert(error.message || 'Delete failed');
    }
  };

  const shiftOrder = async (index, direction) => {
    const newSkills = [...skills];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newSkills.length) return;

    const temp = newSkills[index];
    newSkills[index] = newSkills[swapIndex];
    newSkills[swapIndex] = temp;

    setSkills(newSkills);

    try {
      await api.reorder('skills', newSkills.map(s => s._id));
    } catch (error) {
      fetchSkills();
    }
  };

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'frontend': return 'Frontend';
      case 'programming': return 'Programming Languages';
      case 'database': return 'Database Systems';
      case 'aiMl': return 'AI / Machine Learning';
      case 'tools': return 'Tools / Utilities';
      default: return cat;
    }
  };

  return (
    <div className="space-y-6 text-left font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold text-brand-textPrimary">Technology Skill Tags</h2>
          <p className="text-xs text-brand-textSecondary mt-1">Manage orbital tags, category bindings, and tech logos.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-brand-accent text-brand-bg font-mono font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-brand-accent/90 transition-colors cursor-pointer"
        >
          <Plus size={14} /> Add Skill
        </button>
      </div>

      {loading ? (
        <div className="h-64 flex justify-center items-center">
          <Loader2 className="animate-spin text-brand-accent mr-2" size={24} />
          <span className="font-mono text-xs uppercase tracking-widest text-brand-textSecondary">Syncing database...</span>
        </div>
      ) : skills.length === 0 ? (
        <div className="h-64 flex flex-col justify-center items-center border border-dashed border-brand-border/40 rounded-3xl text-brand-textSecondary text-sm font-mono">
          <span>No technology skill tags configured in the database.</span>
        </div>
      ) : (
        <div className="bg-brand-card/20 border border-brand-border/60 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-border/40 font-mono text-[9px] uppercase tracking-widest text-brand-textSecondary bg-black/30">
                  <th className="py-4 px-6 w-24">Order</th>
                  <th className="py-4 px-6 w-24">Logo</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/20 text-xs">
                {skills.map((skill, idx) => (
                  <tr key={skill._id} className="hover:bg-brand-card/10 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <button 
                          disabled={idx === 0}
                          onClick={() => shiftOrder(idx, 'up')}
                          className="p-1 rounded bg-brand-bg border border-brand-border/40 text-brand-textSecondary hover:text-brand-accent disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp size={10} />
                        </button>
                        <button 
                          disabled={idx === skills.length - 1}
                          onClick={() => shiftOrder(idx, 'down')}
                          className="p-1 rounded bg-brand-bg border border-brand-border/40 text-brand-textSecondary hover:text-brand-accent disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown size={10} />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {skill.logoUrl ? (
                        <img src={skill.logoUrl} alt={skill.name} className="w-6 h-6 object-contain" />
                      ) : (
                        <div className="w-6 h-6 bg-brand-border/20 rounded flex items-center justify-center text-brand-textSecondary text-[9px]">
                          N/A
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 font-bold text-brand-textPrimary">{skill.name}</td>
                    <td className="py-4 px-6 text-brand-textSecondary">{getCategoryLabel(skill.category)}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 font-mono text-[9px] uppercase px-2 py-0.5 rounded border ${
                        skill.enabled 
                          ? 'bg-brand-accent/5 border-brand-accent/30 text-brand-accent'
                          : 'bg-brand-border/20 border-brand-border/50 text-brand-textSecondary'
                      }`}>
                        {skill.enabled ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {deleteConfirmId === skill._id ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => handleDelete(skill._id)} className="bg-red-500 hover:bg-red-600 text-white p-1 rounded cursor-pointer"><Check size={10} /></button>
                          <button onClick={() => setDeleteConfirmId(null)} className="bg-brand-bg border border-brand-border text-brand-textSecondary p-1 rounded cursor-pointer"><X size={10} /></button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleOpenEdit(skill)} className="p-2 rounded bg-brand-bg border border-brand-border/40 text-brand-textSecondary hover:text-brand-accent cursor-pointer"><Edit2 size={12} /></button>
                          <button onClick={() => setDeleteConfirmId(skill._id)} className="p-2 rounded bg-brand-bg border border-brand-border/40 text-brand-textSecondary hover:text-red-400 cursor-pointer"><Trash2 size={12} /></button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-brand-card border border-brand-border rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-brand-border/50 flex justify-between items-center bg-black/20">
              <h3 className="font-serif text-base font-bold text-brand-textPrimary">
                {editingSkill ? 'Edit Technology Tag' : 'Configure New Technology'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-textSecondary hover:text-brand-textPrimary cursor-pointer"><X size={18} /></button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-left">
              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Docker"
                  className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none cursor-pointer"
                >
                  <option value="frontend">Frontend</option>
                  <option value="programming">Programming Languages</option>
                  <option value="database">Database Systems</option>
                  <option value="aiMl">AI / Machine Learning</option>
                  <option value="tools">Tools / Utilities</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold font-bold">Logo/Icon URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.logoUrl}
                    onChange={(e) => setForm(prev => ({ ...prev, logoUrl: e.target.value }))}
                    placeholder="https://icon-library/logo.svg"
                    className="flex-grow bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
                  />
                  <label className="bg-brand-card hover:bg-brand-card/80 border border-brand-border/80 px-3 py-2 rounded-xl text-xs text-brand-textPrimary cursor-pointer flex items-center justify-center">
                    {uploading ? <Loader2 size={12} className="animate-spin" /> : <UploadCloud size={14} />}
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="py-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-brand-textPrimary">
                  <input
                    type="checkbox"
                    checked={form.enabled}
                    onChange={(e) => setForm(prev => ({ ...prev, enabled: e.target.checked }))}
                    className="accent-brand-accent rounded w-4 h-4"
                  />
                  ENABLED_ON_ORBITS
                </label>
              </div>

              <div className="pt-4 border-t border-brand-border/40 flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-brand-border hover:bg-brand-card text-brand-textSecondary px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-brand-accent text-brand-bg font-mono font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-brand-accent/90 cursor-pointer"
                >
                  {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
