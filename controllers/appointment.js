const Appointment = require("../models/appointement");
const mongoose = require('mongoose');

const createAppointment = async (req, res) => {
  try {
    const { fullName, phoneNumber, location, date, category } = req.body;

    const newAppointment = new Appointment({
      fullName,
      phoneNumber,
      location,
      date,
      category,
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating appointment', error });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();

    // Format each appointment's date to "yyyy-MM-dd"
    const formattedAppointments = appointments.map((appointment) => ({
      ...appointment.toObject(),
      date: appointment.date.toISOString().split('T')[0], // Format date
    }));

    res.status(200).json(formattedAppointments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving appointments', error });
  }
};

// Confirm Appointment
const confirmAppointment = async (req, res) => {
  const { id } = req.params;
  const { time, status } = req.body; // Destructure time and status from the request body

  // Validate the ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid appointment ID format' });
  }

  try {
    // Update the status and time
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { time, status: 'Confirmed' }, // Ensure the status is set to 'Confirmed'
      { new: true } // Return the updated document
    );

    // Check if the appointment exists
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Return success response with the updated appointment
    res.status(200).json({ message: 'Appointment confirmed successfully', appointment });
  } catch (error) {
    // Handle errors and return a server error response
    res.status(500).json({ message: 'Error confirming appointment', error });
  }
};



// Cancel Appointment
const cancelAppointment = async (req, res) => {
  const { id } = req.params;

  // Validate the ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid appointment ID format' });
  }

  try {
    // Update the status to 'Cancelled'
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: 'Cancelled' }, // Capitalized 'Cancelled' to match the enum
      { new: true } // Return the updated document
    );

    // Check if the appointment exists
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Return success response with the updated appointment
    res.status(200).json({ message: 'Appointment canceled successfully', appointment });
  } catch (error) {
    // Handle errors and return a server error response
    res.status(500).json({ message: 'Error canceling appointment', error });
  }
};


const getRecentAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ date: -1 })
      .limit(6)
      .select('fullName date category');

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found' });
    }

    const formattedAppointments = appointments.map(app => {
      if (!app.date) {
        return {
          fullName: app.fullName,
          date: 'Unknown',
          time: 'Unknown',
          category: app.category,
        };
      }
      return {
        fullName: app.fullName,
        date: app.date.toISOString().split('T')[0],
        time: app.date.toISOString().split('T')[1].slice(0, 5),
        category: app.category,
      };
    });

    res.status(200).json(formattedAppointments);
  } catch (error) {
    console.error('Error retrieving appointments:', error);
    res.status(500).json({ message: 'Error retrieving appointments', error });
  }
};

const getAppointmentById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid appointment ID format' });
  }

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Format the date to "yyyy-MM-dd"
    const formattedAppointment = {
      ...appointment.toObject(),
      date: appointment.date.toISOString().split('T')[0], // Format date
    };

    res.status(200).json(formattedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const deleteAppointment = async (req, res) => {
  const { fullName, phoneNumber } = req.body;

  if (!fullName || !phoneNumber) {
    return res.status(400).json({ message: 'FullName and PhoneNumber are required' });
  }

  try {
    const result = await Appointment.deleteOne({ fullName, phoneNumber });
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error });
  }
};

const deleteAllAppointments = async (req, res) => {
  try {
    await Appointment.deleteMany({});
    res.status(200).json({ message: 'All appointments have been deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointments', error });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  confirmAppointment,
  cancelAppointment,
  getRecentAppointments,
  getAppointmentById,
  deleteAppointment,
  deleteAllAppointments
};
