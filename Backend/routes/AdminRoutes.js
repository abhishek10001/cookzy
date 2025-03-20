import express from 'express';
import { addCook , adminDashboard, adminLogin, allCooks, bookingsAdmin, cancelBookingsAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/Multer.js';
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/CookController.js';


const adminRouter =express.Router();

adminRouter.post('/add-cook',authAdmin, upload.single('image'),addCook);
adminRouter.post('/login-admin', adminLogin);
adminRouter.get('/all-cooks', authAdmin,allCooks);
adminRouter.get('/change-availability', authAdmin,changeAvailability);
adminRouter.get('/bookings', authAdmin,bookingsAdmin);
adminRouter.post('/cancel-booking-admin', authAdmin,cancelBookingsAdmin);
adminRouter.get('/dashboard', authAdmin,adminDashboard);

export default adminRouter;