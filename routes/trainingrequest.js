const express = require('express');
const { CreateTR , getAlltr , deleteTR, getTrainingByCourse,confirmTR } = require('../controllers/TrainingRequest');
const { getTrainingById } = require('../controllers/training');

const router = express.Router();

router.post('/create_trainingRequest', CreateTR);
router.get('/get_trainingRequest', getAlltr);
router.delete('/delete_trainingRequest', deleteTR);
router.get('/training_request_by_course/:title',getTrainingByCourse)
router.put('/trainingrequest/confirm/:id/:trainingId', confirmTR); // Updated route


module.exports = router;
