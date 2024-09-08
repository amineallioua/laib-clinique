const express = require('express');
const { createAppointment , getAllappointment , deleteAppointment } = require('../controllers/appointment');
const authenticateToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/create_appointment' ,createAppointment);
router.get('/get_appointment', getAllappointment);
router.delete('/delete_appointment', deleteAppointment);


module.exports = router;
