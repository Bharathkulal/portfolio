import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import dns from 'dns';

// Fix querySrv DNS ECONNREFUSED on MongoDB Atlas connections
dns.setServers(['8.8.8.8', '1.1.1.1']);

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

// Load models for database seeding
import User from './models/User.js';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import About from './models/About.js';
import Education from './models/Education.js';
import Certification from './models/Certification.js';

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
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@bharathkulal.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'adminpassword123';

    let admin = await User.findOne({ email: adminEmail.toLowerCase() });
    if (!admin) {
      await User.create({
        username: 'admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log('==================================================');
      console.log('  ADMIN ACCOUNT SEEDED SUCCESSFULLY FROM .ENV:');
      console.log(`  Email: ${adminEmail}`);
      console.log(`  Password: ${adminPassword}`);
      console.log('==================================================');
    } else {
      // Force sync the password in MongoDB to match the password defined in .env
      admin.password = adminPassword;
      await admin.save();
      console.log('==================================================');
      console.log('  ADMIN ACCOUNT PASSWORD SYNCED FROM .ENV:');
      console.log(`  Email: ${adminEmail}`);
      console.log(`  Password: ${adminPassword}`);
      console.log('==================================================');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};

// Seed default data if database is empty
const seedInitialData = async () => {
  await seedAdminUser();

  try {
    // 1. Seed About Details
    const aboutCount = await About.countDocuments();
    if (aboutCount === 0) {
      await About.create({
        name: 'Bharath Kulal',
        shortIntro: 'Hey, I’m Bharath Kulal',
        bio: 'I am Bharath Kulal, a BCA student specializing in Artificial Intelligence & Machine Learning at Dr. B.B. Hegde First Grade College, Kundapura. I strongly believe the best way to master new technology frameworks is to build real systems. Rather than memorizing abstract documentation, I spend my time designing interactive web applications, configuring localized hardware layers, and exploring data science modeling tools.',
        profileImage: '/images/profile.jpg',
        location: 'Kundapura, Karnataka, India',
        education: 'BCA (Artificial Intelligence & Machine Learning)',
        goal: 'Engineering intelligent systems by writing code and building.',
        interests: ['Machine Learning', 'Full-Stack Development', 'Data Science', 'IoT'],
        status: 'Active Student'
      });
      console.log('Seeded About details in database.');
    }

    // 2. Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const initialProjects = [
        {
          title: 'CivicSolve',
          shortDescription: 'Smart civic problem solving and public utility reporting platform.',
          description: '[ CivicSolve: Problem Statement ]\nPublic infrastructure issues (like potholes, streetlights, or waste) often go unreported due to complex municipal channels. This module provides direct logging for citizens.\n\n[ CivicSolve: Solution Architecture ]\nA responsive web client map mapping coordinates to a database. Uses local storage or basic web databases to report, categorize, and track resolution steps.',
          coverImage: '/images/projects/civicsolve.png',
          images: [],
          technologies: ['React', 'Node.js', 'MongoDB', 'Maps API'],
          category: 'Full-Stack',
          status: 'Live',
          date: '2025-06',
          featured: true,
          published: true,
          order: 0
        },
        {
          title: 'Bimba AI',
          shortDescription: 'Vision intelligence and cognitive object classification model pipeline.',
          description: '[ Bimba AI: Problem Statement ]\nImage parsing and cognitive object classification are challenging to build as lightweight, accessible client services without heavy cloud dependencies.\n\n[ Bimba AI: Solution Architecture ]\nA Python-driven pipeline testing neural frameworks to process local image assets, optimize resolution, and run bounding box predictions.',
          coverImage: '/images/projects/bimba-ai.png',
          images: [],
          technologies: ['Python', 'TensorFlow', 'Computer Vision', 'FastAPI'],
          category: 'AI / ML',
          status: 'In Development',
          date: '2025-08',
          featured: true,
          published: true,
          order: 1
        },
        {
          title: 'EduVerse AI',
          shortDescription: 'Adaptive teaching workflow platform and dynamic LLM tutor engine.',
          description: '[ EduVerse AI: Problem Statement ]\nTraditional educational frameworks present static, non-adaptive curricula. Learners encounter barriers when concepts do not adapt to current comprehension speeds.\n\n[ EduVerse AI: Solution Architecture ]\nAn adaptive interface generating educational flows using large language model prompts to analyze answers and dynamically adjust text difficulty.',
          coverImage: '/images/projects/eduverse-ai.png',
          images: [],
          technologies: ['Generative AI', 'React', 'Tailwind CSS', 'LLM APIs'],
          category: 'AI / ML',
          status: 'Prototype',
          date: '2025-10',
          featured: true,
          published: true,
          order: 2
        },
        {
          title: 'Nova AI',
          shortDescription: 'Intelligent virtual assistant and local automation agent orchestrator.',
          description: '[ Nova AI: Problem Statement ]\nVirtual assistants often lack domain-specific execution power, running general search lookups rather than acting as systemic utility tools.\n\n[ Nova AI: Solution Architecture ]\nAn orchestrator system matching user phrases to structured internal tools. Written in Python, calling automation layers.',
          coverImage: '/images/projects/nova-ai.png',
          images: [],
          technologies: ['LLM Integration', 'Python', 'Automation', 'OS Utilities'],
          category: 'AI / ML',
          status: 'In Development',
          date: '2025-11',
          featured: false,
          published: true,
          order: 3
        },
        {
          title: 'Scholar AI',
          shortDescription: 'Academic literature mining pipeline and contextual search index.',
          description: '[ Scholar AI: Problem Statement ]\nStudents and researchers scan thousands of PDF documents to extract key insights. Manual scanning is highly time-consuming.\n\n[ Scholar AI: Solution Architecture ]\nA document extraction pipeline parsing academic papers, extracting reference metadata, and outputting summaries.',
          coverImage: '/images/projects/scholar-ai.png',
          images: [],
          technologies: ['Python', 'Natural Language Processing', 'Data Mining'],
          category: 'AI / ML',
          status: 'Prototype',
          date: '2025-12',
          featured: false,
          published: true,
          order: 4
        },
        {
          title: 'Gym Management System',
          shortDescription: 'Membership portal, scheduling system, and analytical database manager.',
          description: '[ Gym Management: Problem Statement ]\nIndependent gyms require membership management, subscription scheduling, and trainer allocation logs without complex enterprise software.\n\n[ Gym Management: Solution Architecture ]\nA database-driven application built using MySQL schemas, custom query logic, and a Java or web interface controller.',
          coverImage: '/images/projects/gym.png',
          images: [],
          technologies: ['MySQL', 'Java', 'JDBC', 'Desktop Swing'],
          category: 'Full-Stack',
          status: 'Live',
          date: '2026-02',
          featured: true,
          published: true,
          order: 5
        },
        {
          title: 'VBMS',
          shortDescription: 'Vehicle Booking & Monitoring System for fleet management.',
          description: '[ VBMS: Problem Statement ]\nFleet vehicle scheduling is prone to booking conflicts, double allocations, and lack of real-time telemetry logs.\n\n[ VBMS: Solution Architecture ]\nA React frontend dashboard binding fleet allocations to a MongoDB database, charting availability calendars.',
          coverImage: '/images/projects/vbms.png',
          images: [],
          technologies: ['React.js', 'MongoDB', 'Express', 'Node.js'],
          category: 'Full-Stack',
          status: 'In Development',
          date: '2026-04',
          featured: false,
          published: true,
          order: 6
        }
      ];
      await Project.create(initialProjects);
      console.log('Seeded Projects in database.');
    }

    // 3. Seed Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      const initialSkills = [
        // Frontend
        { name: 'HTML5', category: 'frontend', order: 0 },
        { name: 'CSS3', category: 'frontend', order: 1 },
        { name: 'JavaScript', category: 'frontend', order: 2 },
        { name: 'React', category: 'frontend', order: 3 },
        { name: 'Vite', category: 'frontend', order: 4 },
        { name: 'Tailwind CSS', category: 'frontend', order: 5 },
        // Backend
        { name: 'Node.js', category: 'database', order: 6 },
        { name: 'Express.js', category: 'database', order: 7 },
        { name: 'FastAPI', category: 'database', order: 8 },
        { name: 'REST API', category: 'database', order: 9 },
        // Databases
        { name: 'MongoDB', category: 'database', order: 10 },
        { name: 'MySQL', category: 'database', order: 11 },
        { name: 'PostgreSQL', category: 'database', order: 12 },
        // AI / ML
        { name: 'Python', category: 'aiMl', order: 13 },
        { name: 'OpenAI', category: 'aiMl', order: 14 },
        { name: 'Google Gemini', category: 'aiMl', order: 15 },
        { name: 'TensorFlow', category: 'aiMl', order: 16 },
        { name: 'scikit-learn', category: 'aiMl', order: 17 },
        { name: 'Generative AI', category: 'aiMl', order: 18 },
        // Tools
        { name: 'Antigravity', category: 'tools', order: 19 },
        { name: 'Cursor', category: 'tools', order: 20 },
        { name: 'Visual Studio Code', category: 'tools', order: 21 },
        { name: 'Canva', category: 'tools', order: 22 },
        { name: 'Git', category: 'tools', order: 23 },
        { name: 'GitHub', category: 'tools', order: 24 }
      ];
      await Skill.create(initialSkills);
      console.log('Seeded Skills orbit in database.');
    }

    // 4. Seed Education entries
    const eduCount = await Education.countDocuments();
    if (eduCount === 0) {
      const initialEdu = [
        {
          institution: 'Dr. B.B. Hegde First Grade College, Kundapura',
          course: 'BCA (Artificial Intelligence & Machine Learning)',
          description: 'Focusing on computational logic, neural networking bases, database modeling, and generative workflows.',
          startYear: '2025',
          endYear: '2028',
          current: true,
          order: 0
        },
        {
          institution: 'RN Shetty PU College, Kundapura',
          course: 'PUC (Pre-University Education)',
          description: 'Core science coursework establishing standard logical and mathematics systems.',
          startYear: '2023',
          endYear: '2025',
          current: false,
          order: 1
        },
        {
          institution: 'GHS Siddapur',
          course: '10th Grade (SSLC)',
          description: 'Secondary school education credentials.',
          startYear: '2022',
          endYear: '2023',
          current: false,
          order: 2
        }
      ];
      await Education.create(initialEdu);
      console.log('Seeded Education records in database.');
    }

    // 5. Seed Certifications
    const certCount = await Certification.countDocuments();
    if (certCount === 0) {
      const initialCerts = [
        { name: 'Data Science', issuer: 'Coursework / Institution', date: '2025-06', order: 0 },
        { name: 'DevOps', issuer: 'Coursework / Institution', date: '2025-09', order: 1 },
        { name: 'Machine Learning', issuer: 'Coursework / Institution', date: '2025-12', order: 2 },
        { name: 'Other Tech Courses', issuer: 'Coursework / Institution', date: '2026-03', order: 3 }
      ];
      await Certification.create(initialCerts);
      console.log('Seeded Certifications list in database.');
    }
  } catch (error) {
    console.error('Error during data seeding:', error);
  }
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
