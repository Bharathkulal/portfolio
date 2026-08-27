import express from 'express';
import upload, { isCloudinaryConfigured } from '../utils/upload.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Upload a single file (image/PDF)
router.post('/', requireAuth, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let fileUrl = '';
    
    if (isCloudinaryConfigured) {
      // Cloudinary returns path directly as path or secure_url
      fileUrl = req.file.path || req.file.secure_url;
    } else {
      // Local storage returns relative path. We construct the full URL
      // E.g. http://localhost:8000/uploads/filename
      const host = req.get('host');
      const protocol = req.protocol;
      fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    }

    res.status(200).json({
      message: 'File uploaded successfully',
      url: fileUrl,
      name: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    console.error('Upload Route Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Upload multiple files
router.post('/multiple', requireAuth, upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const host = req.get('host');
    const protocol = req.protocol;

    const urls = req.files.map(file => {
      if (isCloudinaryConfigured) {
        return file.path || file.secure_url;
      }
      return `${protocol}://${host}/uploads/${file.filename}`;
    });

    res.status(200).json({
      message: 'Files uploaded successfully',
      urls
    });
  } catch (error) {
    console.error('Multiple Upload Route Error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
