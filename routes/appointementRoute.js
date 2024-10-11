const express = require('express');
const { createAppointment , getAllappointment , deleteAppointment ,deleteAllAppointments, getRecentAppointments ,getAppointmentById} = require('../controllers/appointment');
const authenticateToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/create_appointment' ,createAppointment);
router.get('/get_appointment', getAllappointment);
router.get('/:id',getAppointmentById)
router.delete('/delete_appointment', deleteAppointment);
router.get ('/recent_appointemnt',getRecentAppointments)
router.delete('/delete_all_appointments', deleteAllAppointments); // New route



module.exports = router;
