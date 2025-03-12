import express from 'express';
import { addCook , adminLogin } from '../controllers/adminController.js';
import upload from '../middlewares/Multer.js';
import authAdmin from '../middlewares/authAdmin.js'


const adminRouter =express.Router();

adminRouter.post('/add-cook',authAdmin, upload.single('image'),addCook);
adminRouter.post('/login-admin', adminLogin);

export default adminRouter;