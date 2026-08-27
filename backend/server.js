import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load routes
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import skillRoutes from './routes/skills.js';
import aboutRoutes from './routes/about.js';
import experienceRoutes from './routes/experience.js';
import educationRoutes from './routes/education.js';
import certificationRoutes from './routes/certifications.js';
import achievementRoutes from './routes/achievements.js';
import serviceRoutes from './routes/services.js';
import socialRoutes from './routes/social.js';
import resumeRoutes from './routes/resume.js';
import settingsRoutes from './routes/settings.js';
import messageRoutes from './routes/messages.js';
import uploadRoutes from './routes/upload.js';

// Load User model for seeding
import User from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Expose local uploads folder statically
const uploadDir = path.resolve('./uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Route bindings
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/upload', uploadRoutes);

// Base Status Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'Bharath Kulal CMS API Gateway',
    version: '1.0.0'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// Seed default admin user if none exist
const seedAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        email: 'admin@bharathkulal.com',
        password: 'adminpassword123',
        role: 'admin'
      });
      console.log('==================================================');
      console.log('  DEFAULT ADMIN ACCOUNT CREATED SUCCESSFULLY:');
      console.log('  Email: admin@bharathkulal.com');
      console.log('  Password: adminpassword123');
      console.log('  Please log in and update your credentials!');
      console.log('==================================================');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};

// Seed default about page details if none exist
const seedInitialData = async () => {
  // We can seed general placeholder entries for testing here if desired
  await seedAdminUser();
};

// Database Connection & Launch
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Successfully connected to MongoDB Cluster.');
    await seedInitialData();
    app.listen(PORT, () => {
      console.log(`Server running in development mode on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed. Server shutting down.', err);
    process.exit(1);
  });
