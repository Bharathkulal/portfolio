import express from 'express';
import Message from '../models/Message.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// POST send message (Public)
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message fields are required' });
    }
    const newMessage = await Message.create({ name, email, subject, message });
    res.status(201).json({ status: 'success', message: 'Message logged successfully', record_id: newMessage._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET all messages (Protected)
router.get('/', requireAuth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update readStatus (Protected)
router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { readStatus } = req.body;
  try {
    const message = await Message.findByIdAndUpdate(id, { readStatus }, { new: true });
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE message (Protected)
router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByIdAndDelete(id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
