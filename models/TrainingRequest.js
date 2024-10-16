const mongoose = require('mongoose');

const trainingRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true
  }
  // training: {
  //   type: mongoose.Schema.Types.ObjectId, // Refers to the ID of a Training document
  //   ref: 'Training', // Refers to the Training model
  //   required: true
  // }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const TrainingRequest = mongoose.model('TrainingRequest', trainingRequestSchema);

module.exports = TrainingRequest;
