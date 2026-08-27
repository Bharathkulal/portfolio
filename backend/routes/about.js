import express from 'express';
import About from '../models/About.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET About configuration
router.get('/', async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      // Seed default
      about = await About.create({
        shortIntro: 'Hey, I’m Bharath Kulal',
        bio: 'I specialize in AI/ML engineering and modern web application development.',
        profileImage: '/images/profile.jpg',
        location: 'Kundapura, Karnataka, India'
      });
    }
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE About configuration
router.put('/', requireAuth, async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({ ...req.body });
    } else {
      about = await About.findByIdAndUpdate(about._id, { ...req.body }, { new: true });
    }
    res.status(200).json(about);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
