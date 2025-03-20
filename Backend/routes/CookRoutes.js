import express from 'express';
import { cookBookings, CookDashboard, cookList, cookLogin, getCookProfile, markBookingCancelled, markBookingCompleted, markBookingConfirmed, updateCookProfile } from '../controllers/CookController.js';
import authCook from '../middlewares/authCook.js';

const cookRouter = express.Router();

cookRouter.get('/list', cookList);
cookRouter.post('/cook-login', cookLogin);
cookRouter.get('/bookings', authCook, cookBookings);
cookRouter.post('/booking-completed', authCook, markBookingCompleted);
cookRouter.post('/booking-cancelled', authCook, markBookingCancelled);
cookRouter.post('/booking-confirmed', authCook, markBookingConfirmed);
cookRouter.get('/cook-dashboard', authCook, CookDashboard);
cookRouter.get('/cook-profile', authCook,getCookProfile);
cookRouter.post('/update-cook-profile', authCook,updateCookProfile);

export default cookRouter;