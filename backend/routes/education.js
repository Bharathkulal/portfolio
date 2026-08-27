import express from 'express';
import Education from '../models/Education.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET all education entries
router.get('/', async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1 });
    res.status(200).json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create education entry
router.post('/', requireAuth, async (req, res) => {
  try {
    const order = (await Education.countDocuments()) + 1;
    const education = await Education.create({ ...req.body, order });
    res.status(201).json(education);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update education entry
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const education = await Education.findByIdAndUpdate(id, { ...req.body }, { new: true });
    if (!education) return res.status(404).json({ error: 'Education entry not found' });
    res.status(200).json(education);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE education entry
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const education = await Education.findByIdAndDelete(id);
    if (!education) return res.status(404).json({ error: 'Education entry not found' });
    res.status(200).json({ message: 'Education entry deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST reorder education entries
router.post('/reorder', requireAuth, async (req, res) => {
  const { orderedIds } = req.body;
  try {
    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { order: index }
      }
    }));
    await Education.bulkWrite(bulkOps);
    res.status(200).json({ message: 'Education entries reordered' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
