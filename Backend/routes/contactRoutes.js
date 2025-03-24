import express from 'express';
import {sendMessage} from '../controllers/contactController.js';

const contactrouter = express.Router();

contactrouter.post('/send', sendMessage);

export default contactrouter;