const Appointment = require("../models/appointement")
const mongoose = require ('mongoose');

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

const getAllappointment = async (req, res) => {
    try {
      const appointments = await Appointment.find()
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving appointments', error });
    }
  };

  //-----------------------------------------------------------------------------------------------------

  const getRecentAppointments = async (req, res) => {
    try {
      // Fetch the last 6 appointments, selecting only the required fields
      const appointments = await Appointment.find()
        .sort({ date: -1 }) // Sort by date descending
        .limit(6) // Get the last six appointments
        .select('fullName date category'); // Select only required fields
  
      // Check if appointments were found
      if (!appointments || appointments.length === 0) {
        return res.status(404).json({ message: 'No appointments found' });
      }
  
      // Map appointments to include formatted date and time
      const formattedAppointments = appointments.map(app => {
        if (!app.date) {
          return {
            fullName: app.fullName,
            date: 'Unknown', // Default value if date is missing
            time: 'Unknown', // Default value if time is missing
            category: app.category,
          };
        }
        return {
          fullName: app.fullName,
          date: app.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
          time: app.date.toISOString().split('T')[1].slice(0, 5), // Format time as HH:mm
          category: app.category,
        };
      });
  
      res.status(200).json(formattedAppointments);
    } catch (error) {
      console.error('Error retrieving appointments:', error);
      res.status(500).json({ message: 'Error retrieving appointments', error });
    }
  };
  
  
  // Make sure to update your route to use this function
  
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
      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  
    /////////////////////////
  
const deleteAppointment = async (req , res) => {
    try{
        const {fullName , phoneNumber} = req.body ;


        if (!fullName || !phoneNumber) {
            return res.status(400).json({ message: 'fullname and phonenumber are required' });
          }

          const result = await appo.deleteOne({ fullName, phoneNumber });
          res.status(200).json({ message: 'appointement deleted successfully' });
    }
    catch{
        res.status(500).json({message: 'Error deleting appointement', error })
    }


}

const deleteAllAppointments = async (req, res) => {
  try {
    // Delete all appointments
    await Appointment.deleteMany({});
    res.status(200).json({ message: 'All appointments have been deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointments', error });
  }
};







module.exports = { createAppointment , getAllappointment , deleteAppointment , getRecentAppointments ,deleteAllAppointments,getAppointmentById};