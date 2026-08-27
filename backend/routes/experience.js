import express from 'express';
import Experience from '../models/Experience.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET all published experiences (Public)
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find({ published: true }).sort({ order: 1 });
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all experiences for Admin (Protected)
router.get('/admin', requireAuth, async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1 });
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create experience
router.post('/', requireAuth, async (req, res) => {
  try {
    const order = (await Experience.countDocuments()) + 1;
    const experience = await Experience.create({ ...req.body, order });
    res.status(201).json(experience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update experience
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const experience = await Experience.findByIdAndUpdate(id, { ...req.body }, { new: true });
    if (!experience) return res.status(404).json({ error: 'Experience not found' });
    res.status(200).json(experience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE experience
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const experience = await Experience.findByIdAndDelete(id);
    if (!experience) return res.status(404).json({ error: 'Experience not found' });
    res.status(200).json({ message: 'Experience deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST reorder experience
router.post('/reorder', requireAuth, async (req, res) => {
  const { orderedIds } = req.body;
  try {
    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { order: index }
      }
    }));
    await Experience.bulkWrite(bulkOps);
    res.status(200).json({ message: 'Experiences reordered' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
