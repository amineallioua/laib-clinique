const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  photo: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  places: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
