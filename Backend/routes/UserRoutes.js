import express from 'express';
import { bookCook, cancelBookings, confirmBooking, getUserProfile, listBookings, loginUser, makePayment, reigisterUser, updateUserProfile, verifyRazorPay } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/Multer.js';

const  userRouter = express.Router();

userRouter.post('/register', reigisterUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile',authUser ,getUserProfile)
userRouter.post('/update-profile',upload.single('image'),authUser, updateUserProfile);
userRouter.post('/book-cook',authUser,bookCook);
userRouter.get('/bookings',authUser,listBookings);
userRouter.post('/cancel-booking',authUser,cancelBookings);
userRouter.post('/confirm-booking',authUser,confirmBooking);
userRouter.post('/payment-razorpay',authUser,makePayment);
userRouter.post('/verify-razorpay',authUser,verifyRazorPay);

export default userRouter;