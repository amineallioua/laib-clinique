const appo = require("./models/appointment")

const createAppointment = async (req,res) => {
    try {
        const {fullName , phoneNumber ,location , date , category} = req.body ;
        const appointement = appo.create({fullName , phoneNumber ,location , date , category});
        res.status(201).json(appointement);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating appointment', error });
      }


}
//-----------------------------------------------------------------------------------------------------


const getAllappointment = async (req, res) => {
    try {
      const appointments = await appo.find(); 
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving appointments', error });
    }
  };

  //-----------------------------------------------------------------------------------------------------


  
const deleteAppointment = async (req , res) => {
    try{
        const {fullName , phoneNumber} = req.body ;


        if (!fullName || !phoneNumber) {
            return res.status(400).json({ message: 'fullname and phonenumber are required' });
          }

          const result = await appo.deleteOne({ fullName, phoneNumber });
          res.status(200).json({ message: 'appointement deleted successfully' });
    }
    catch{
        res.status(500).json({message: 'Error deleting appointement', error })
    }


}




module.exports = { createAppointment , getAllappointment , deleteAppointment};