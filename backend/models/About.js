import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Bharath Kulal'
  },
  shortIntro: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  education: {
    type: String,
    default: ''
  },
  goal: {
    type: String,
    default: ''
  },
  interests: [{
    type: String
  }],
  status: {
    type: String,
    default: 'Open to opportunities'
  }
}, { timestamps: true });

export default mongoose.model('About', aboutSchema);
