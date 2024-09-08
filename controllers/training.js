const trai = require('../models/training.js')


const Createtrainig = async (req, res)=>{
    try {
        const {description,photo,title,date,places}=req.body;
        const training = await trai.create({description,photo,title,date,places});
        res.status(201).json(training);

    }
    catch{
        res.status(500).json({ message: 'Error retrieving training', error })
    }
} 


//---------------------------------------------------------------------------------------------------


const getAlltrai= async (req, res) => {
    try {
      const trainings = await trai.find(); 
      res.status(200).json(trainings);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving trainings', error });
    }
  };

  //---------------------------------------------------------------------------------------------------



  const deleteTrai = async (req , res) => {
    try{
        const {name} = req.body ;


        if (!name) {
            return res.status(400).json({ message: 'name are require' });
          }

          const result = await trai.deleteOne({ name});
          res.status(200).json({ message: 'training deleted successfully' });
    }
    catch{
        res.status(500).json({message: 'Error deleting training', error })
    }


}
//---------------------------------------------------------------------------------------------------





module.exports={Createtrainig,getAlltrai,deleteTrai,}