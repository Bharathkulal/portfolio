import express from 'express';
import Resume from '../models/Resume.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET active resume url (Public)
router.get('/', async (req, res) => {
  try {
    const resume = await Resume.findOne({ active: true });
    if (!resume) {
      return res.status(404).json({ error: 'No active resume found' });
    }
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all resumes (Protected)
router.get('/admin', requireAuth, async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST add resume
router.post('/', requireAuth, async (req, res) => {
  const { title, fileUrl, active } = req.body;
  try {
    if (!fileUrl) {
      return res.status(400).json({ error: 'File URL is required' });
    }
    const resume = await Resume.create({ title: title || 'Resume', fileUrl, active: active || false });
    res.status(201).json(resume);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update active status
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { active, title } = req.body;
  try {
    const resume = await Resume.findById(id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    if (active !== undefined) resume.active = active;
    if (title !== undefined) resume.title = title;
    await resume.save();
    res.status(200).json(resume);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE resume
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const resume = await Resume.findByIdAndDelete(id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
