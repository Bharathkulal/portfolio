import React, { useState, useEffect } from 'react';
import { api } from './api';
import { 
  FolderGit2, Plus, Edit2, Trash2, ArrowUp, ArrowDown, Search, Filter, 
  Eye, Check, X, Loader2, Sparkles, UploadCloud, Copy, Image as ImageIcon
} from 'lucide-react';

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [publishFilter, setPublishFilter] = useState('all');
  
  // Modal configurations
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null); // null means adding a new project
  const [form, setForm] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    coverImage: '',
    images: [],
    technologies: '',
    category: '',
    githubUrl: '',
    liveUrl: '',
    date: '',
    status: '',
    featured: false,
    published: true
  });
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Confirm delete dialog
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await api.get('projects', true);
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setForm({
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      coverImage: '',
      images: [],
      technologies: '',
      category: 'AI / ML',
      githubUrl: '',
      liveUrl: '',
      date: new Date().toISOString().substring(0, 7), // YYYY-MM format
      status: 'Live',
      featured: false,
      published: true
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      slug: project.slug,
      shortDescription: project.shortDescription,
      description: project.description,
      coverImage: project.coverImage,
      images: project.images || [],
      technologies: project.technologies ? project.technologies.join(', ') : '',
      category: project.category,
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      date: project.date,
      status: project.status,
      featured: project.featured || false,
      published: project.published !== false
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Image uploads handler
  const handleImageUpload = async (e, type = 'cover') => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await api.uploadFile(file);
      if (type === 'cover') {
        setForm(prev => ({ ...prev, coverImage: url }));
      } else {
        setForm(prev => ({ ...prev, images: [...prev.images, url] }));
      }
    } catch (error) {
      alert(error.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  // Slug generator helper
  const generateSlug = () => {
    if (!form.title) return;
    const generated = form.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setForm(prev => ({ ...prev, slug: generated }));
  };

  const validateForm = () => {
    const errors = {};
    if (!form.title) errors.title = 'Title is required';
    if (!form.shortDescription) errors.shortDescription = 'Short description is required';
    if (!form.description) errors.description = 'Description is required';
    if (!form.coverImage) errors.coverImage = 'Cover image is required';
    if (!form.category) errors.category = 'Category is required';
    if (!form.date) errors.date = 'Date is required';
    if (!form.status) errors.status = 'Status is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSaving(true);

    const payload = {
      ...form,
      technologies: form.technologies ? form.technologies.split(',').map(t => t.trim()).filter(Boolean) : []
    };

    try {
      if (editingProject) {
        // Edit existing project
        await api.put('projects', editingProject._id, payload);
      } else {
        // Create new project
        await api.post('projects', payload);
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (error) {
      alert(error.message || 'Saving failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await api.delete('projects', id);
      setDeleteConfirmId(null);
      fetchProjects();
    } catch (error) {
      alert(error.message || 'Delete failed');
    }
  };

  // Drag and drop ordering triggers via shifts
  const shiftOrder = async (index, direction) => {
    const newProjects = [...projects];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newProjects.length) return;

    // Swap locally
    const temp = newProjects[index];
    newProjects[index] = newProjects[swapIndex];
    newProjects[swapIndex] = temp;

    setProjects(newProjects);

    // Save back to server
    try {
      const orderedIds = newProjects.map(p => p._id);
      await api.reorder('projects', orderedIds);
    } catch (error) {
      console.error('Reordering failed:', error);
      fetchProjects(); // Revert back
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesPublish = publishFilter === 'all' || 
                          (publishFilter === 'published' && p.published) || 
                          (publishFilter === 'draft' && !p.published);
    return matchesSearch && matchesCategory && matchesPublish;
  });

  return (
    <div className="space-y-6 text-left font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-brand-textPrimary">Project Modules</h2>
          <p className="text-xs text-brand-textSecondary mt-1">Manage public portfolio modules, URLs, and cover pictures.</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="bg-brand-accent text-brand-bg font-mono font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-brand-accent/90 transition-colors cursor-pointer"
        >
          <Plus size={14} /> Add Project
        </button>
      </div>

      {/* Filters Bar */}
      <div className="p-4 bg-brand-card/30 border border-brand-border/60 rounded-2xl flex flex-wrap items-center gap-4">
        <div className="relative flex-grow max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-brand-textSecondary">
            <Search size={14} />
          </span>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2.5 pl-10 pr-4 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none transition-colors"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-black/40 border border-brand-border/60 rounded-xl py-2.5 px-4 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-accent/40 transition-colors cursor-pointer"
        >
          <option value="all">All Categories</option>
          <option value="AI / ML">AI / ML</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Full-Stack">Full-Stack</option>
        </select>

        <select
          value={publishFilter}
          onChange={(e) => setPublishFilter(e.target.value)}
          className="bg-black/40 border border-brand-border/60 rounded-xl py-2.5 px-4 text-xs text-brand-textPrimary focus:outline-none focus:border-brand-accent/40 transition-colors cursor-pointer"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
      </div>

      {/* Table / Grid list */}
      {loading ? (
        <div className="h-64 flex justify-center items-center">
          <Loader2 className="animate-spin text-brand-accent mr-2" size={24} />
          <span className="font-mono text-xs uppercase tracking-widest text-brand-textSecondary">Syncing items...</span>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="h-64 flex flex-col justify-center items-center border border-dashed border-brand-border/40 rounded-3xl text-brand-textSecondary text-sm font-mono">
          <span>No project records found matching filters.</span>
        </div>
      ) : (
        <div className="bg-brand-card/20 border border-brand-border/60 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-border/40 font-mono text-[9px] uppercase tracking-widest text-brand-textSecondary bg-black/30">
                  <th className="py-4 px-6">Order</th>
                  <th className="py-4 px-6">Cover</th>
                  <th className="py-4 px-6">Title & Category</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Featured</th>
                  <th className="py-4 px-6">Visibility</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/20 text-xs">
                {filteredProjects.map((project, idx) => (
                  <tr key={project._id} className="hover:bg-brand-card/10 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5">
                        <button 
                          disabled={idx === 0}
                          onClick={() => shiftOrder(idx, 'up')}
                          className="p-1 rounded bg-brand-bg border border-brand-border/40 text-brand-textSecondary hover:text-brand-accent disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp size={10} />
                        </button>
                        <button 
                          disabled={idx === filteredProjects.length - 1}
                          onClick={() => shiftOrder(idx, 'down')}
                          className="p-1 rounded bg-brand-bg border border-brand-border/40 text-brand-textSecondary hover:text-brand-accent disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown size={10} />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <img 
                        src={project.coverImage} 
                        alt={project.title} 
                        className="w-12 h-8 object-cover rounded border border-brand-border/50"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <span className="font-bold text-brand-textPrimary block">{project.title}</span>
                        <span className="text-[10px] text-brand-textSecondary uppercase font-mono tracking-wider block mt-0.5">
                          {project.category} // {project.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono text-[10px]">{project.date}</td>
                    <td className="py-4 px-6">
                      {project.featured ? (
                        <span className="inline-flex items-center gap-1 text-brand-accent font-mono text-[9px] uppercase tracking-wider">
                          <Sparkles size={10} /> Featured
                        </span>
                      ) : (
                        <span className="text-brand-textSecondary/40">—</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 font-mono text-[9px] uppercase px-2 py-0.5 rounded border ${
                        project.published 
                          ? 'bg-brand-accent/5 border-brand-accent/30 text-brand-accent'
                          : 'bg-brand-border/20 border-brand-border/50 text-brand-textSecondary'
                      }`}>
                        {project.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {deleteConfirmId === project._id ? (
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-[10px] text-red-400 font-mono">Delete?</span>
                          <button 
                            onClick={() => handleDeleteProject(project._id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg cursor-pointer"
                          >
                            <Check size={12} />
                          </button>
                          <button 
                            onClick={() => setDeleteConfirmId(null)}
                            className="bg-brand-bg border border-brand-border/40 text-brand-textSecondary hover:text-brand-textPrimary p-1.5 rounded-lg cursor-pointer"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleOpenEditModal(project)}
                            className="p-2 rounded bg-brand-bg border border-brand-border/40 text-brand-textSecondary hover:text-brand-accent transition-colors cursor-pointer"
                            title="Edit project"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button 
                            onClick={() => setDeleteConfirmId(project._id)}
                            className="p-2 rounded bg-brand-bg border border-brand-border/40 text-brand-textSecondary hover:text-red-400 transition-colors cursor-pointer"
                            title="Delete project"
                          >
                            <Trash2 size={12} />
                          </button>
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
          <div className="bg-brand-card border border-brand-border rounded-3xl w-full max-w-3xl h-[85vh] flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-brand-border/50 flex justify-between items-center bg-black/20">
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-textPrimary">
                  {editingProject ? 'Modify Project Module' : 'Configure New Project Module'}
                </h3>
                <p className="text-[10px] text-brand-textSecondary font-mono uppercase tracking-wider mt-0.5">
                  {editingProject ? `ID: ${editingProject._id}` : 'NEW DATABASE RECORD'}
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-brand-textSecondary hover:text-brand-textPrimary cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSaveProject} className="flex-grow p-6 overflow-y-auto space-y-5 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
                  />
                  {formErrors.title && <span className="text-[10px] text-red-400 mt-1 block">{formErrors.title}</span>}
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold flex justify-between">
                    Slug / URL Path *
                    <button 
                      type="button" 
                      onClick={generateSlug}
                      className="text-[8px] text-brand-accent uppercase hover:underline cursor-pointer"
                    >
                      Auto-generate
                    </button>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                    className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">
                  Short Editorial Description *
                </label>
                <input
                  type="text"
                  required
                  value={form.shortDescription}
                  onChange={(e) => setForm(prev => ({ ...prev, shortDescription: e.target.value }))}
                  placeholder="Summary matching index grids..."
                  className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2.5 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">
                  Detailed Bio & Pipeline Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed project summary..."
                  className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none font-sans"
                />
              </div>

              {/* Cover Image Uploader */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">
                    Cover Image URL *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={form.coverImage}
                      onChange={(e) => setForm(prev => ({ ...prev, coverImage: e.target.value }))}
                      className="flex-grow bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
                    />
                    <label className="bg-brand-card hover:bg-brand-card/80 border border-brand-border/80 px-3 py-2 rounded-xl text-xs text-brand-textPrimary cursor-pointer flex items-center justify-center">
                      {uploading ? <Loader2 size={12} className="animate-spin" /> : <UploadCloud size={14} />}
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'cover')}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {form.coverImage && (
                    <img 
                      src={form.coverImage} 
                      alt="Cover Preview" 
                      className="mt-3 w-full h-24 object-cover rounded-xl border border-brand-border/50"
                    />
                  )}
                </div>

                {/* Categories & details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">
                      Category *
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
                    >
                      <option value="AI / ML">AI / ML</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Full-Stack">Full-Stack</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">
                        Status *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.status}
                        onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">
                        Date *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.date}
                        placeholder="YYYY-MM"
                        onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">
                  Technologies / Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={form.technologies}
                  onChange={(e) => setForm(prev => ({ ...prev, technologies: e.target.value }))}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={form.githubUrl}
                    onChange={(e) => setForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                    className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-textSecondary mb-1.5 font-bold">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={form.liveUrl}
                    onChange={(e) => setForm(prev => ({ ...prev, liveUrl: e.target.value }))}
                    className="w-full bg-black/40 border border-brand-border/60 rounded-xl py-2 px-3 text-xs text-brand-textPrimary focus:border-brand-accent/40 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-6 py-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-brand-textPrimary">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm(prev => ({ ...prev, featured: e.target.checked }))}
                    className="accent-brand-accent rounded w-4 h-4"
                  />
                  FEATURE_ON_HOMEPAGE
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-brand-textPrimary">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm(prev => ({ ...prev, published: e.target.checked }))}
                    className="accent-brand-accent rounded w-4 h-4"
                  />
                  PUBLISHED_MODULE
                </label>
              </div>
            </form>

            {/* Footer */}
            <div className="p-6 border-t border-brand-border/50 flex justify-between items-center bg-black/20">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="border border-brand-border hover:bg-brand-card text-brand-textSecondary px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSaveProject}
                disabled={saving}
                className="bg-brand-accent text-brand-bg font-mono font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-brand-accent/90 transition-colors cursor-pointer disabled:opacity-60"
              >
                {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                {editingProject ? 'Save Changes' : 'Create Module'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
