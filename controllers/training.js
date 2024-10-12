const Training = require('../models/training.js'); // Use proper naming for the model

// Create a new training
const createTraining = async (req, res) => {
    try {
        const { description, title, date, places, type, audience, price } = req.body;

        // Validate 'type', 'audience', and 'price'
        const validTypes = ['paid', 'free', 'reduced'];
        const validAudiences = ['family and children', 'specialist'];

        if (!validTypes.includes(type)) {
            return res.status(400).json({ message: `Invalid training type. Allowed values: ${validTypes.join(', ')}` });
        }

        if (!validAudiences.includes(audience)) {
            return res.status(400).json({ message: `Invalid audience. Allowed values: ${validAudiences.join(', ')}` });
        }

        if (type === 'paid' && (!price || isNaN(price) || price <= 0)) {
            return res.status(400).json({ message: 'Price must be a valid positive number for paid trainings.' });
        }

        // Get the uploaded image (if provided)
        const photo = req.file ? req.file.path : null; // Ensure that `req.file` is available

        // Check if photo is required and is not provided
        if (!photo) {
            return res.status(400).json({ message: 'Photo is required.' });
        }

        // Create a new training
        const training = await Training.create({
            description,
            photo,
            title,
            date,
            places,
            type,
            audience,
            price: type === 'free' ? 0 : price // If type is 'free', set price to 0
        });

        res.status(201).json(training);
    } catch (error) {
        res.status(500).json({ message: 'Error creating training', error: error.message });
    }
};


// Get all trainings
const getAllTrainings = async (req, res) => {
    try {
        const trainings = await Training.find(); 
        res.status(200).json(trainings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving trainings', error: error.message });
    }
};

// Get training by ID
const getTrainingById = async (req, res) => {
    try {
        const { id } = req.params;
        const training = await Training.findById(id);
        
        if (!training) {
            return res.status(404).json({ message: 'Training not found' });
        }
        
        res.status(200).json(training);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving training', error: error.message });
    }
};

// Delete training by name
const deleteTraining = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const result = await Training.deleteOne({ name });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Training not found' });
        }

        res.status(200).json({ message: 'Training deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting training', error: error.message });
    }
};
const deleteAllTrainings = async (req, res) => {
    try {
      await Training.deleteMany({});
      res.status(200).json({ message: "All trainings have been deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting trainings", error });
    }
  };
  

module.exports = {
    createTraining,
    getAllTrainings,
    getTrainingById,
    deleteTraining,
    deleteAllTrainings
};
