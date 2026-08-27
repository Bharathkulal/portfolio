import express from 'express';
import Certification from '../models/Certification.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET all certifications
router.get('/', async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ order: 1 });
    res.status(200).json(certifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create certification
router.post('/', requireAuth, async (req, res) => {
  try {
    const order = (await Certification.countDocuments()) + 1;
    const certification = await Certification.create({ ...req.body, order });
    res.status(201).json(certification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update certification
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const certification = await Certification.findByIdAndUpdate(id, { ...req.body }, { new: true });
    if (!certification) return res.status(404).json({ error: 'Certification not found' });
    res.status(200).json(certification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE certification
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const certification = await Certification.findByIdAndDelete(id);
    if (!certification) return res.status(404).json({ error: 'Certification not found' });
    res.status(200).json({ message: 'Certification deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST reorder certifications
router.post('/reorder', requireAuth, async (req, res) => {
  const { orderedIds } = req.body;
  try {
    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { order: index }
      }
    }));
    await Certification.bulkWrite(bulkOps);
    res.status(200).json({ message: 'Certifications reordered' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
