import express from 'express';
import {subscribeNewsletter, unsubscribeNewsletter}  from '../controllers/newsletterController.js';

const newsletterrouter = express.Router();

newsletterrouter.post('/subscribe', subscribeNewsletter);
newsletterrouter.post('/unsubscribe', unsubscribeNewsletter);

export default newsletterrouter;