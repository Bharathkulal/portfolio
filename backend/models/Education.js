import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  startYear: {
    type: String,
    required: true
  },
  endYear: {
    type: String,
    default: ''
  },
  current: {
    type: Boolean,
    default: false
  },
  logoUrl: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('Education', educationSchema);
