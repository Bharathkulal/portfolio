import express from 'express';
import Project from '../models/Project.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET all published projects (Public)
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ published: true }).sort({ order: 1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all projects for Admin including drafts (Protected)
router.get('/admin', requireAuth, async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single project by slug or ID
router.get('/:slugOrId', async (req, res) => {
  const { slugOrId } = req.params;
  try {
    let project = await Project.findOne({ slug: slugOrId.toLowerCase() });
    if (!project && slugOrId.match(/^[0-9a-fA-F]{24}$/)) {
      project = await Project.findById(slugOrId);
    }
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a new project (Protected)
router.post('/', requireAuth, async (req, res) => {
  const {
    title,
    slug,
    shortDescription,
    description,
    coverImage,
    images,
    technologies,
    category,
    githubUrl,
    liveUrl,
    date,
    status,
    featured,
    published,
    order
  } = req.body;

  try {
    // Basic validations
    if (!title || !shortDescription || !description || !coverImage || !category || !date || !status) {
      return res.status(400).json({ error: 'Please fill in all required fields' });
    }

    const nextOrder = order || (await Project.countDocuments()) + 1;

    const project = await Project.create({
      title,
      slug,
      shortDescription,
      description,
      coverImage,
      images: images || [],
      technologies: technologies || [],
      category,
      githubUrl: githubUrl || '',
      liveUrl: liveUrl || '',
      date,
      status,
      featured: featured || false,
      published: published !== false,
      order: nextOrder
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update a project (Protected)
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a project (Protected)
router.put('/:id/soft-delete', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndUpdate(id, { published: false }, { new: true });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json({ message: 'Project drafted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted permanently' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST reorder projects (Protected)
router.post('/reorder', requireAuth, async (req, res) => {
  const { orderedIds } = req.body; // Array of IDs in the desired order
  try {
    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { order: index }
      }
    }));
    await Project.bulkWrite(bulkOps);
    res.status(200).json({ message: 'Projects reordered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
