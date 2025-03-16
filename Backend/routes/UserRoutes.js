import express from 'express';
import { getUserProfile, loginUser, reigisterUser, updateUserProfile } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/Multer.js';

const  userRouter = express.Router();

userRouter.post('/register', reigisterUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile',authUser ,getUserProfile)
userRouter.post('/update-profile',upload.single('image'),authUser, updateUserProfile);

export default userRouter;