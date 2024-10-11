const TR = require ('../models/TrainingRequest')



const CreateTR = async (req , res)=>{
    try {
        const {name , phone ,email ,title } = req.body ;
        const trainingrequest =await  TR.create({name , phone ,email ,title });
        res.status(201).json(trainingrequest);
    }
    catch{
        res.status(500).json({ message: 'Error creating trainingrequest',  });
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





module.exports={CreateTR,getAlltr,deleteTR,}