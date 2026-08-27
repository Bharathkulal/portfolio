import React, { useState, useEffect } from 'react';
import { api } from './api';
import { 
  Plus, Edit2, Trash2, ArrowUp, ArrowDown, X, Check, Loader2, UploadCloud, Sparkles
} from 'lucide-react';

export default function TimelineManager({ type }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Dynamic form state
  const [form, setForm] = useState({});

  const getEndpoint = () => {
    switch (type) {
      case 'experience': return 'experience';
      case 'education': return 'education';
      case 'certifications': return 'certifications';
      case 'achievements': return 'achievements';
      case 'social': return 'social';
      default: return 'experience';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'experience': return 'Work Experience';
      case 'education': return 'Education Journey';
      case 'certifications': return 'Certifications & Credentials';
      case 'achievements': return 'Honors & Achievements';
      case 'social': return 'Social Network Links';
      default: return 'Manager';
    }
  };

  const getSubTitle = () => {
    switch (type) {
      case 'experience': return 'Configure career histories, descriptions, and logos.';
      case 'education': return 'Manage educational institutions, courses, and dates.';
      case 'certifications': return 'Upload certificates, credentials, and verification links.';
      case 'achievements': return 'Manage honors, regional exhibitions, and trophies.';
      case 'social': return 'Manage link paths and handles for social channels.';
      default: return 'Manage items.';
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const endpoint = getEndpoint();
      const isAdmin = ['experience', 'achievements', 'social'].includes(type);
      const data = await api.get(endpoint, isAdmin);
      setItems(data);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [type]);

  const handleOpenAdd = () => {
    setEditingItem(null);
    
    // Initialize forms based on active manager type
    if (type === 'experience') {
      setForm({
        company: '',
        position: '',
        description: '',
        startDate: '',
        endDate: '',
        current: false,
        technologies: '',
        logoUrl: '',
        published: true
      });
    } else if (type === 'education') {
      setForm({
        institution: '',
        course: '',
        description: '',
        startYear: '',
        endYear: '',
        current: false,
        logoUrl: ''
      });
    } else if (type === 'certifications') {
      setForm({
        name: '',
        issuer: '',
        date: '',
        credentialId: '',
        credentialUrl: '',
        fileUrl: ''
      });
    } else if (type === 'achievements') {
      setForm({
        title: '',
        description: '',
        imageUrl: '',
        date: '',
        org: '',
        link: '',
        featured: false,
        published: true
      });
    } else if (type === 'social') {
      setForm({
        platform: '',
        url: '',
        icon: '',
        enabled: true
      });
    }

    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    
    if (type === 'experience') {
      setForm({
        company: item.company,
        position: item.position,
        description: item.description,
        startDate: item.startDate,
        endDate: item.endDate || '',
        current: item.current || false,
        technologies: item.technologies ? item.technologies.join(', ') : '',
        logoUrl: item.logoUrl || '',
        published: item.published !== false
      });
    } else if (type === 'education') {
      setForm({
        institution: item.institution,
        course: item.course,
        description: item.description || '',
        startYear: item.startYear,
        endYear: item.endYear || '',
        current: item.current || false,
        logoUrl: item.logoUrl || ''
      });
    } else if (type === 'certifications') {
      setForm({
        name: item.name,
        issuer: item.issuer,
        date: item.date,
        credentialId: item.credentialId || '',
        credentialUrl: item.credentialUrl || '',
        fileUrl: item.fileUrl || ''
      });
    } else if (type === 'achievements') {
      setForm({
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl || '',
        date: item.date,
        org: item.org || '',
        link: item.link || '',
        featured: item.featured || false,
        published: item.published !== false
      });
    } else if (type === 'social') {
      setForm({
        platform: item.platform,
        url: item.url,
        icon: item.icon || '',
        enabled: item.enabled !== false
      });
    }

    setIsModalOpen(true);
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await api.uploadFile(file);
      setForm(prev => ({ ...prev, [fieldName]: url }));
    } catch (error) {
      alert(error.message || 'File upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    let payload = { ...form };
    if (type === 'experience' && form.technologies) {
      payload.technologies = form.technologies.split(',').map(t => t.trim()).filter(Boolean);
    }

    try {
      const endpoint = getEndpoint();
      if (editingItem) {
        await api.put(endpoint, editingItem._id, payload);
      } else {
        await api.post(endpoint, payload);
      }
      setIsModalOpen(false);
      fetchItems();
    } catch (error) {
      alert(error.message || 'Saving failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const endpoint = getEndpoint();
      await api.delete(endpoint, id);
      setDeleteConfirmId(null);
      fetchItems();
    } catch (error) {
      alert(error.message || 'Delete failed');
    }
  };

  const shiftOrder = async (index, direction) => {
    const newItems = [...items];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[swapIndex];
    newItems[swapIndex] = temp;

    setItems(newItems);

    try {
      const endpoint = getEndpoint();
      await api.reorder(endpoint, newItems.map(item => item._id));
    } catch (error) {
      fetchItems();
    }
  };

  return (
    <div className="space-y-6 text-left font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold text-brand-textPrimary">{getTitle()}</h2>
          <p className="text-xs text-brand-textSecondary mt-1">{getSubTitle()}</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-brand-accent text-brand-bg font-mono font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-brand-accent/90 transition-colors cursor-pointer"
        >
          <Plus size={14} /> Add Item
        </button>
      </div>

      {loading ? (
        <div className="h-64 flex justify-center items-center">
          <Loader2 className="animate-spin text-brand-accent mr-2" size={24} />
          <span className="font-mono text-xs uppercase tracking-widest text-brand-textSecondary">Syncing items...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="h-64 flex flex-col justify-center items-center border border-dashed border-brand-border/40 rounded-3xl text-brand-textSecondary text-sm font-mono">
          <span>No records added yet.</span>
        </div>
      ) : (
        <div className="bg-brand-card/20 border border-brand-border/60 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-border/40 font-mono text-[9px] uppercase tracking-widest text-brand-textSecondary bg-black/30">
                  <th className="py-4 px-6 w-24">Order</th>
                  {type === 'social' ? (
                    <>
                      <th className="py-4 px-6">Platform</th>
                      <th className="py-4 px-6">URL Link</th>
                      <th className="py-4 px-6">Visibility</th>
                    </>
                  ) : (
                    <>
                      <th className="py-4 px-6">Title / Name</th>
                      <th className="py-4 px-6">Organization / Issuer</th>
                      <th className="py-4 px-6">Timeline</th>
                      {['experience', 'achievements'].includes(type) && (
                        <th className="py-4 px-6">Status</th>
                      )}
                    </>
                  )}
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/20 text-xs">
                {items.map((item, idx) => (
                  <tr key={item._id} className="hover:bg-brand-card/10 transition-colors">
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
                          disabled={idx === items.length - 1}
                          onClick={() => shiftOrder(idx, 'down')}
                          className="p-1 rounded bg-brand-bg border border-brand-border/40 text-brand-textSecondary hover:text-brand-accent disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown size={10} />
                        </button>
                      </div>
                    </td>

                    {type === 'social' ? (
                      <>
                        <td className="py-4 px-6 font-bold text-brand-textPrimary">{item.platform}</td>
                        <td className="py-4 px-6 font-mono text-brand-textSecondary truncate max-w-[240px]">{item.url}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1 font-mono text-[9px] uppercase px-2 py-0.5 rounded border ${
                            item.enabled 
                              ? 'bg-brand-accent/5 border-brand-accent/30 text-brand-accent'
                              : 'bg-brand-border/20 border-brand-border/50 text-brand-textSecondary'
                          }`}>
                            {item.enabled ? 'Enabled' : 'Hidden'}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-4 px-6">
                          <span className="font-bold text-brand-textPrimary block">
                            {item.position || item.course || item.name || item.title}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-brand-textSecondary">
                          {item.company || item.institution || item.issuer || item.org}
                        </td>
                        <td className="py-4 px-6 font-mono text-brand-textSecondary">
                          {item.startDate || item.startYear || item.date}
                          {['experience', 'education'].includes(type) && (
                            <span> — {item.current ? 'Current' : (item.endDate || item.endYear)}</span>
                          )}
                        </td>
                        {['experience', 'achievements'].includes(type) && (
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center gap-1 font-mono text-[9px] uppercase px-2 py-0.5 rounded border ${
                              item.published 
                                ? 'bg-brand-accent/5 border-brand-accent/30 text-brand-accent'
                                : 'bg-brand-border/20 border-brand-border/50 text-brand-textSecondary'
                            }`}>
                              {item.published ? 'Published' : 'Draft'}
                            </span>
                          </td>
                        )}
                      </>
                    )}

                    <td className="py-4 px-6 text-right">
                      {deleteConfirmId === item._id ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button onClick={() => handleDelete(item._id)} className="bg-red-500 hover:bg-red-600 text-white p-1 rounded cursor-pointer"><Check size={10} /></button>
                          <button onClick={() => setDeleteConfirmId(null)} className="bg-brand-bg border border-brand-border text-brand-textSecondary p-1 rounded cursor-pointer"><X size={10} /></button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleOpenEdit(item)} className="p-2 rounded bg-brand-bg border border-brand-border/40 text-brand-textSecondary hover:text-brand-accent cursor-pointer"><Edit2 size={12} /></button>
                          <button onClick={() => setDeleteConfirmId(item._id)} className="p-2 rounded bg-brand-bg border border-brand-border/40 text-brand-textSecondary hover:text-red-400 cursor-pointer"><Trash2 size={12} /></button>
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

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-brand-card border border-brand-border rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-brand-border/50 flex justify-between items-center bg-black/20">
              <h3 className="font-serif text-base font-bold text-brand-textPrimary">
                {editingItem ? 'Edit Item Details' : 'Configure New Item'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-textSecondary hover:text-brand-textPrimary cursor-pointer"><X size={18} /></button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-left overflow-y-auto max-h-[70vh]">
              
              {type === 'experience' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Company / Organization *</label>
                      <input type="text" required value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Role / Position *</label>
                      <input type="text" required value={form.position} onChange={e => setForm({...form, position: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Start Date *</label>
                      <input type="text" required placeholder="YYYY-MM" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">End Date</label>
                      <input type="text" disabled={form.current} placeholder="YYYY-MM" value={form.current ? '' : form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none disabled:opacity-30" />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono">
                      <input type="checkbox" checked={form.current} onChange={e => setForm({...form, current: e.target.checked})} className="accent-brand-accent" />
                      CURRENTLY_EMPLOYED
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono">
                      <input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} className="accent-brand-accent" />
                      PUBLISHED
                    </label>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Role Description / Tasks *</label>
                    <textarea rows={3} required value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Technologies used (comma separated)</label>
                    <input type="text" placeholder="Python, TensorFlow" value={form.technologies} onChange={e => setForm({...form, technologies: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                  </div>
                </>
              )}

              {type === 'education' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Institution *</label>
                      <input type="text" required value={form.institution} onChange={e => setForm({...form, institution: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Course / Degree *</label>
                      <input type="text" required value={form.course} onChange={e => setForm({...form, course: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Start Year *</label>
                      <input type="text" required placeholder="e.g. 2023" value={form.startYear} onChange={e => setForm({...form, startYear: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">End Year</label>
                      <input type="text" disabled={form.current} placeholder="e.g. 2026" value={form.current ? '' : form.endYear} onChange={e => setForm({...form, endYear: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none disabled:opacity-30" />
                    </div>
                  </div>

                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono">
                    <input type="checkbox" checked={form.current} onChange={e => setForm({...form, current: e.target.checked})} className="accent-brand-accent" />
                    ACTIVE_ENROLLMENT
                  </label>

                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Short Description</label>
                    <input type="text" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                  </div>
                </>
              )}

              {type === 'certifications' && (
                <>
                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Certification Name *</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Issuer *</label>
                      <input type="text" required value={form.issuer} onChange={e => setForm({...form, issuer: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Issue Date *</label>
                      <input type="text" required placeholder="YYYY-MM" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Credential URL</label>
                    <input type="url" value={form.credentialUrl} onChange={e => setForm({...form, credentialUrl: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Certificate Image / PDF Link</label>
                    <div className="flex gap-2">
                      <input type="text" value={form.fileUrl} onChange={e => setForm({...form, fileUrl: e.target.value})} className="flex-grow bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                      <label className="bg-brand-card border border-brand-border px-3 py-2 rounded-xl text-xs cursor-pointer flex items-center justify-center">
                        {uploading ? <Loader2 size={12} className="animate-spin" /> : <UploadCloud size={14} />}
                        <input type="file" accept="image/*,application/pdf" onChange={e => handleFileUpload(e, 'fileUrl')} className="hidden" />
                      </label>
                    </div>
                  </div>
                </>
              )}

              {type === 'achievements' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Title *</label>
                      <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Date *</label>
                      <input type="text" required placeholder="YYYY-MM" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Organization</label>
                    <input type="text" value={form.org} onChange={e => setForm({...form, org: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Description *</label>
                    <textarea required rows={2} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                  </div>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono">
                      <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="accent-brand-accent" />
                      FEATURED
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono">
                      <input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} className="accent-brand-accent" />
                      PUBLISHED
                    </label>
                  </div>
                </>
              )}

              {type === 'social' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Platform Name *</label>
                      <input type="text" required placeholder="GitHub, LinkedIn" value={form.platform} onChange={e => setForm({...form, platform: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">Icon Identifier</label>
                      <input type="text" placeholder="github, linkedin" value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1">URL Link *</label>
                    <input type="url" required value={form.url} onChange={e => setForm({...form, url: e.target.value})} className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:outline-none" />
                  </div>
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono">
                    <input type="checkbox" checked={form.enabled} onChange={e => setForm({...form, enabled: e.target.checked})} className="accent-brand-accent" />
                    DISPLAY_ENABLED
                  </label>
                </>
              )}

              <div className="pt-4 border-t border-brand-border/40 flex justify-between">
                <button type="button" onClick={() => setIsModalOpen(false)} className="border border-brand-border hover:bg-brand-card text-brand-textSecondary px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider cursor-pointer">Cancel</button>
                <button type="submit" disabled={saving} className="bg-brand-accent text-brand-bg font-mono font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-brand-accent/90 cursor-pointer">
                  {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
