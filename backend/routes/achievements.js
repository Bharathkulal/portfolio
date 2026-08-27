import express from 'express';
import Achievement from '../models/Achievement.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET all published achievements (Public)
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find({ published: true }).sort({ order: 1 });
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all achievements for Admin (Protected)
router.get('/admin', requireAuth, async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ order: 1 });
    res.status(200).json(achievements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create achievement
router.post('/', requireAuth, async (req, res) => {
  try {
    const order = (await Achievement.countDocuments()) + 1;
    const achievement = await Achievement.create({ ...req.body, order });
    res.status(201).json(achievement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update achievement
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const achievement = await Achievement.findByIdAndUpdate(id, { ...req.body }, { new: true });
    if (!achievement) return res.status(404).json({ error: 'Achievement not found' });
    res.status(200).json(achievement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE achievement
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const achievement = await Achievement.findByIdAndDelete(id);
    if (!achievement) return res.status(404).json({ error: 'Achievement not found' });
    res.status(200).json({ message: 'Achievement deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST reorder achievements
router.post('/reorder', requireAuth, async (req, res) => {
  const { orderedIds } = req.body;
  try {
    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { order: index }
      }
    }));
    await Achievement.bulkWrite(bulkOps);
    res.status(200).json({ message: 'Achievements reordered' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
