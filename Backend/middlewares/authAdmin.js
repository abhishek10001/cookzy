import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
    try {
        const  {atoken}=req.headers
        if(!atoken){
return res.json({success: false, message:'Not authorized'})
        }

        const decoded_token=jwt.verify(atoken, process.env.JWT_SECRET)

        if (decoded_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({success: false, message:'Not authorized'})
        }

        next()
        
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'You are not authorized USER.' });
    }
}

export default authAdmin;
