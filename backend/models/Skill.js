import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  logoUrl: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['frontend', 'programming', 'database', 'aiMl', 'iot', 'tools']
  },
  order: {
    type: Number,
    default: 0
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
