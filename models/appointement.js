const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
