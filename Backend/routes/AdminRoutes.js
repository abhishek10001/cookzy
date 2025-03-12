import express from 'express';
import { addCook , adminLogin, allCooks } from '../controllers/adminController.js';
import upload from '../middlewares/Multer.js';
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/CookController.js';


const adminRouter =express.Router();

adminRouter.post('/add-cook',authAdmin, upload.single('image'),addCook);
adminRouter.post('/login-admin', adminLogin);
adminRouter.get('/all-cooks', authAdmin,allCooks);
adminRouter.get('/change-availability', authAdmin,changeAvailability);

export default adminRouter;