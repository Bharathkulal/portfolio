import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET || 'supersecretportfoliojwtkey123!', { expiresIn: '7d' });
};

// Admin Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error('All fields must be filled');
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Incorrect email or password' });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(400).json({ error: 'Incorrect email or password' });
    }

    // Create token
    const token = createToken(user._id);

    res.status(200).json({ email, username: user.username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Verify Auth Session Token
router.get('/verify', requireAuth, (req, res) => {
  res.status(200).json({ valid: true, role: req.user.role });
});

// Change Password
router.post('/change-password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    if (!currentPassword || !newPassword) {
      throw new Error('All fields must be filled');
    }

    const user = await User.findById(req.user._id);
    const match = await user.comparePassword(currentPassword);
    if (!match) {
      return res.status(400).json({ error: 'Incorrect current password' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
