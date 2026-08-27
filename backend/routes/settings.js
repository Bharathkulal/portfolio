import express from 'express';
import SiteSettings from '../models/SiteSettings.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// GET SiteSettings (Public)
router.get('/', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({
        portfolioTitle: 'Bharath Kulal',
        description: 'AI / ML Developer & Full-Stack Builder portfolio',
        profileName: 'Bharath Kulal',
        email: 'contact@bharathkulal.com',
        location: 'Kundapura, Karnataka, India'
      });
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE SiteSettings (Protected)
router.put('/', requireAuth, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({ ...req.body });
    } else {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, { ...req.body }, { new: true });
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
