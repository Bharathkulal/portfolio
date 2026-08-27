import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
  portfolioTitle: {
    type: String,
    default: 'Bharath Kulal'
  },
  description: {
    type: String,
    default: 'AI / ML Developer & Full-Stack Builder portfolio'
  },
  profileName: {
    type: String,
    default: 'Bharath Kulal'
  },
  email: {
    type: String,
    default: 'contact@bharathkulal.com'
  },
  location: {
    type: String,
    default: 'Kundapura, Karnataka, India'
  },
  // SEO
  seoTitle: {
    type: String,
    default: 'Bharath Kulal | Portfolio'
  },
  seoDescription: {
    type: String,
    default: 'AI / ML Developer & Full-Stack Builder'
  },
  seoKeywords: [{
    type: String
  }],
  ogImage: {
    type: String,
    default: ''
  },
  favicon: {
    type: String,
    default: ''
  },
  // Hero Section Config
  heroTitle: {
    type: String,
    default: 'Bharath Kulal'
  },
  heroSubtitle: {
    type: String,
    default: 'AI / ML Developer · Full-Stack Builder'
  },
  heroDescription: {
    type: String,
    default: 'I build with AI, solve real-world problems, and create modern digital experiences.'
  },
  contactEmail: {
    type: String,
    default: ''
  },
  contactPhone: {
    type: String,
    default: ''
  },
  contactLocation: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('SiteSettings', siteSettingsSchema);
