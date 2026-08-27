import express from 'express';
import SocialLink from '../models/SocialLink.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET all enabled social links (Public)
router.get('/', async (req, res) => {
  try {
    const socialLinks = await SocialLink.find({ enabled: true }).sort({ order: 1 });
    res.status(200).json(socialLinks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all social links for Admin (Protected)
router.get('/admin', requireAuth, async (req, res) => {
  try {
    const socialLinks = await SocialLink.find().sort({ order: 1 });
    res.status(200).json(socialLinks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create social link
router.post('/', requireAuth, async (req, res) => {
  try {
    const order = (await SocialLink.countDocuments()) + 1;
    const socialLink = await SocialLink.create({ ...req.body, order });
    res.status(201).json(socialLink);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update social link
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const socialLink = await SocialLink.findByIdAndUpdate(id, { ...req.body }, { new: true });
    if (!socialLink) return res.status(404).json({ error: 'Social link not found' });
    res.status(200).json(socialLink);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE social link
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const socialLink = await SocialLink.findByIdAndDelete(id);
    if (!socialLink) return res.status(404).json({ error: 'Social link not found' });
    res.status(200).json({ message: 'Social link deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST reorder social links
router.post('/reorder', requireAuth, async (req, res) => {
  const { orderedIds } = req.body;
  try {
    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { order: index }
      }
    }));
    await SocialLink.bulkWrite(bulkOps);
    res.status(200).json({ message: 'Social links reordered' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
