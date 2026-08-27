import express from 'express';
import Skill from '../models/Skill.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET all enabled skills (Public)
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find({ enabled: true }).sort({ order: 1 });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all skills including disabled ones for Admin (Protected)
router.get('/admin', requireAuth, async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a skill
router.post('/', requireAuth, async (req, res) => {
  const { name, logoUrl, category, enabled } = req.body;
  try {
    if (!name || !category) {
      return res.status(400).json({ error: 'Name and Category are required' });
    }
    const order = (await Skill.countDocuments()) + 1;
    const skill = await Skill.create({ name, logoUrl, category, enabled, order });
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update a skill
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const skill = await Skill.findByIdAndUpdate(id, { ...req.body }, { new: true });
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    res.status(200).json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a skill
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) return res.status(404).json({ error: 'Skill not found' });
    res.status(200).json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST reorder skills
router.post('/reorder', requireAuth, async (req, res) => {
  const { orderedIds } = req.body;
  try {
    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { order: index }
      }
    }));
    await Skill.bulkWrite(bulkOps);
    res.status(200).json({ message: 'Skills reordered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
