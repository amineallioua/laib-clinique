// database.js
const mongoose = require('mongoose');

// MongoDB connection string
const mongoURI = 'mongodb+srv://amarbouzida62:1234@cluster0.nlsdc.mongodb.net/';

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

