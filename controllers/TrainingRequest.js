const TR = require('../models/TrainingRequest');
const Notification = require('../models/notification');
const Training = require('../models/training'); // Import the Training model
const sendEmail = require('../utils/sendMail');

// Create a new training request
const CreateTR = async (req, res) => {
  try {
      const { name, phone, email, title } = req.body;
      // Set the training field to the value of title
      const trainingRequest = await TR.create({ name, phone, email, title, training: title });
      const training = await Training.findOne({ title });
      if(!training)
      {
        res.status(400).json({ message: 'No course with this titile' })
        return
      }
      const notification = {
        type: 'Training Request', // Specify the type of notification
        username: name,           // Assuming the username is the name of the person making the request
        id: training._id,  // Use the ID of the newly created training request
      };

      // Assuming you have a Notification model to handle notifications
      const Newnotification = await Notification.create(notification);
      req.io.emit("new-notification", Newnotification);
      await sendEmail(`New Training Request from the client ${name} \n you can check it in the url ${process.env.Front_URL}/courses/${training._id} `)

      res.status(201).json(trainingRequest);
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error creating training request', error });
  }
};


// Get all training requests
const getAlltr = async (req, res) => {
    try {
        const trainingRequests = await TR.find().populate('training'); // Populate the training details
        res.status(200).json(trainingRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving training requests', error });
    }
};

// Delete a training request by ID
const deleteTR = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const result = await TR.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Training request not found' });
        }

        res.status(200).json({ message: 'Training request deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting training request', error });
    }
};

// Get training requests by course title
const getTrainingByCourse = async (req, res) => {
    try {
        const { title } = req.params;

        if (!title) {
            return res.status(400).json({ message: 'The title of the course is required' });
        }

        const requests = await TR.find({ title }).populate('training');
        res.status(200).json({ result: requests });
    } catch (error) {
        res.status(500).json({ message: 'Error getting training requests', error });
    }
};


// Confirm a training request
const confirmTR = async (req, res) => {
    try {
      const { requestId } = req.params;
  
      if (!requestId) {
        return res.status(400).json({ message: 'Request ID is required' });
      }
  
      // Find the training request by ID
      const trainingRequest = await TR.findById(requestId);
      if (!trainingRequest) {
        return res.status(404).json({ message: 'Training request not found' });
      }
  
      // Ensure the request is not already confirmed (status: 'completed')
      if (trainingRequest.status === 'completed') {
        return res.status(400).json({ message: 'This request is already confirmed' });
      }
  
      // Find the corresponding training by title
      const training = await Training.findOneAndUpdate(
        { title: trainingRequest.title },
        { $inc: { reservedPlaces: 1 } },
        { new: true }
      );
  
      if (!training) {
        return res.status(404).json({ message: 'Training not found' });
      }
  
      if (training.places <= training.reservedPlaces) {
        return res.status(400).json({ message: 'No available places for this training' });
      }
  
      // Update the training request to mark it as confirmed
      trainingRequest.confirmed = true;
      trainingRequest.training = trainingRequest.title; // Assign training title to 'training' field
      trainingRequest.status = 'completed'; // Update status to 'completed'
      await trainingRequest.save();
  
      res.status(200).json({
        message: 'Training request confirmed successfully',
        trainingRequest,
        training,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error confirming training request', error });
    }
  };
  
module.exports = { CreateTR, getAlltr, deleteTR, getTrainingByCourse, confirmTR };
