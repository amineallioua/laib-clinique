const TR = require ('../models/TrainingRequest')



const CreateTR = async (req , res)=>{
    try {
        const {name , phone ,email ,title,training } = req.body ;
        const trainingrequest =await  TR.create({name , phone ,email ,title,training });
        res.status(201).json(trainingrequest);
    }
<<<<<<< HEAD
    catch{
        res.status(500).json({ message: 'Error creating trainingrequest',  });
=======
    catch(error){
        res.status(500).json({ message: 'Error creating trainingrequest', error });
>>>>>>> 5d4caf17937186ff61a0048479a48513102eccfc
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



module.exports={CreateTR,getAlltr,deleteTR,getTrainingByCourse}