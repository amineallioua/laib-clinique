const trai = require('../models/training.js')

// Create a new training
const Createtrainig = async (req, res) => {
    try {
        const { description, photo, title, date, places } = req.body;
        const training = await trai.create({ description, photo, title, date, places });
        res.status(201).json(training);
    } catch (error) {
        res.status(500).json({ message: 'Error creating training', error });
    }
};

// Get all trainings
const getAlltrai = async (req, res) => {
    try {
        const trainings = await trai.find(); 
        res.status(200).json(trainings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving trainings', error });
    }
};

// Get training by ID
const getTrainigById = async (req, res) => {
  try {
      const { id } = req.params;
      const training = await trai.findById(id);
      
      if (!training) {
          return res.status(404).json({ message: 'Training not found' }); // Ensure this returns JSON
      }
      
      res.status(200).json(training);
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving training', error });
  }
};


// Delete training
const deleteTrai = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const result = await trai.deleteOne({ name });
        res.status(200).json({ message: 'Training deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting training', error });
    }
};

module.exports = { Createtrainig, getAlltrai, getTrainigById, deleteTrai };
