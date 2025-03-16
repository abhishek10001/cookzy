import cookModel from '../../Backend/models/cookModel.js';
const changeAvailability = async (req, res, next) => {
    try {
        
        const {cookId}=req.body
        const cookData = await cookModel.findById(cookId);
        await cookModel.findByIdAndUpdate(cookId,{available: !cookData.available});
        res.json({ success: true, message: 'Availability changed successfully' });

    } catch (error) {
      
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

const cookList = async (req, res)=>{
    try {
        const cooks = await cookModel.find({}).select(['-password','-email']);
        res.json({ success: true, cooks});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message }); 
    }
}

export {changeAvailability, cookList}