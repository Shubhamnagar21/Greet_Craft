const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Template title is required'], trim: true },
    imageUrl: { type: String, required: [true, 'Template image URL is required'] },
    category: { type: String, required: [true, 'Category is required'], enum: ['Birthday', 'Anniversary', 'Festivals', 'Shayari', 'Joke', 'Updesh', 'Love', 'Trending'] },
    isPremium: { type: Boolean, default: false },
    overlayConfig: {
      profileImage: {
        x: { type: Number, default: 0.5 },
        y: { type: Number, default: 0.75 },
        size: { type: Number, default: 0.15 },
      },
      text: {
        x: { type: Number, default: 0.5 },
        y: { type: Number, default: 0.92 },
        color: { type: String, default: '#ffffff' },
        fontSize: { type: Number, default: 0.04 },
        fontFamily: { type: String, default: 'bold 24px Arial' },
      },
    },
  },
  { timestamps: true }
);

templateSchema.index({ category: 1 });
templateSchema.index({ isPremium: 1 });

module.exports = mongoose.model('Template', templateSchema);
