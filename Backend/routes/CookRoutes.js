import express from 'express';
import { cookList } from '../controllers/CookController.js';

const cookRouter = express.Router();

cookRouter.get('/list', cookList);

export default cookRouter;