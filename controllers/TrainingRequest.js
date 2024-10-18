const TR = require ('../models/TrainingRequest')
const Training = require('../models/training'); // Import the Training model


const CreateTR = async (req , res)=>{
    try {
        const {name , phone ,email ,title,training } = req.body ;
        const trainingrequest =await  TR.create({name , phone ,email ,title,training });
        res.status(201).json(trainingrequest);
    }
    
    catch(error){
        res.status(500).json({ message: 'Error creating trainingrequest', error });
    }
}

//---------------------------------------------------------------------------------------------------


const getAlltr= async (req, res) => {
    try {
      const trainingrequests = await TR.find(); 
      res.status(200).json(trainingrequests);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving trainingrequests', error });
    }
  };

  //---------------------------------------------------------------------------------------------------



  const deleteTR = async (req , res) => {
    try{
        const {name} = req.body ;


        if (!name) {
            return res.status(400).json({ message: 'name are require' });
          }

          const result = await TR.deleteOne({ name});
          res.status(200).json({ message: 'trainingrequest deleted successfully' });
    }
    catch{
        res.status(500).json({message: 'Error deleting trainingrequest', error })
    }


}
//---------------------------------------------------------------------------------------------------

const getTrainingByCourse =async (req , res) => {
  try{
      const { title } = req.params;

      console.log(title);
      
      if (!title) {
          return res.status(400).json({ message: 'the title of the course is required' });
        }

        const result = await TR.find({ title: title });
        res.status(200).json({result });
  }
  catch(error){
      res.status(500).json({message: 'error getting training requests', error })
  } 
}


const confirmTR = async (req, res) => {
  try {
      const { id, trainingId } = req.params;

      if (!id || !trainingId) {
          return res.status(400).json({ message: 'Request ID and Training ID are required' });
      }

      // Update the training request to confirmed
      const trainingRequest = await TR.findByIdAndUpdate(
          id,
          { confirmed: true },
          { new: true }
      );

      if (!trainingRequest) {
          return res.status(404).json({ message: 'Training request not found' });
      }

      // Decrement the number of places in the corresponding training
      const training = await Training.findOneAndUpdate(
          { _id: trainingId, places: { $gt: 0 } }, // Ensure places are available
          { $inc: { places: -1 } },
          { new: true }
      );

      if (!training) {
          return res.status(400).json({ message: 'No available places for this training' });
      }

      res.status(200).json({ message: 'Training request confirmed successfully', trainingRequest, training });
  } catch (error) {
      res.status(500).json({ message: 'Error confirming training request', error });
  }
};




module.exports={CreateTR,getAlltr,deleteTR,getTrainingByCourse,confirmTR}