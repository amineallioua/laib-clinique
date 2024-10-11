const express = require('express');
const { Createtrainig ,  getAlltrai , getTrainigById, deleteTrai  } = require('../controllers/training');

const router = express.Router();

router.post('/create_training', Createtrainig);
router.get('/get_training', getAlltrai);
router.get('/:id', getTrainigById);
router.delete('/delete_training', deleteTrai);


module.exports = router;
 