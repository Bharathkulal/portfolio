import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Default Resume'
  },
  fileUrl: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Ensure only one resume can be active at a time
resumeSchema.pre('save', async function(next) {
  if (this.active) {
    await this.constructor.updateMany({ _id: { $ne: this._id } }, { active: false });
  }
  next();
});

export default mongoose.model('Resume', resumeSchema);
