const express = require('express');
const { CreateTR , getAlltr , deleteTR } = require('../controllers/TrainingRequest');

const router = express.Router();

router.post('/create_trainingRequest', CreateTR);
router.get('/get_trainingRequest', getAlltr);
router.delete('/delete_trainingRequest', deleteTR);


module.exports = router;
