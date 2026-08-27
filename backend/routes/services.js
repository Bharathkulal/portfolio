import express from 'express';
import Service from '../models/Service.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET all published services (Public)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ published: true }).sort({ order: 1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all services for Admin (Protected)
router.get('/admin', requireAuth, async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create service
router.post('/', requireAuth, async (req, res) => {
  try {
    const order = (await Service.countDocuments()) + 1;
    const service = await Service.create({ ...req.body, order });
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update service
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByIdAndUpdate(id, { ...req.body }, { new: true });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE service
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByIdAndDelete(id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.status(200).json({ message: 'Service deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST reorder services
router.post('/reorder', requireAuth, async (req, res) => {
  const { orderedIds } = req.body;
  try {
    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { order: index }
      }
    }));
    await Service.bulkWrite(bulkOps);
    res.status(200).json({ message: 'Services reordered' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
