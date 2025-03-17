import express from 'express';
import { bookCook, getUserProfile, listBookings, loginUser, reigisterUser, updateUserProfile } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/Multer.js';

const  userRouter = express.Router();

userRouter.post('/register', reigisterUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile',authUser ,getUserProfile)
userRouter.post('/update-profile',upload.single('image'),authUser, updateUserProfile);
userRouter.post('/book-cook',authUser,bookCook);
userRouter.get('/bookings',authUser,listBookings);

export default userRouter;