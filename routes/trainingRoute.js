const express = require('express');
const {
    getAllTrainings,
    createTraining,
    getTrainingById,
    deleteTraining,
<<<<<<< HEAD
    deleteAllTrainings
=======
    deleteAllTrainings,
    updateTraining
>>>>>>> 5d4caf17937186ff61a0048479a48513102eccfc
} = require('../controllers/training'); // Make sure the path is correct
const upload = require('../middlewares/upload'); // Multer configuration


const router = express.Router();

// Create a new training request
router.post('/create_training', upload.single('photo'), createTraining);

<<<<<<< HEAD
=======
//update training
router.put('/update/:id', upload.single('photo'), updateTraining);

>>>>>>> 5d4caf17937186ff61a0048479a48513102eccfc
// Get all training requests
router.get('/get_training', getAllTrainings);

// Get training by ID
router.get('/:id', getTrainingById);

// Delete a training request by ID
router.delete('/delete_training/:id', deleteTraining);

router.delete('/deleteAll',deleteAllTrainings)

module.exports = router;
