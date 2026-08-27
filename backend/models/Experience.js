import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    default: ''
  },
  current: {
    type: Boolean,
    default: false
  },
  technologies: [{
    type: String,
    trim: true
  }],
  logoUrl: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model('Experience', experienceSchema);
