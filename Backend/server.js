import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudNiary from './config/cloudinary.js';
import adminRouter from './routes/AdminRoutes.js';
import cookRouter from './routes/CookRoutes.js';
import userRouter from './routes/UserRoutes.js';
import newsletterrouter from './routes/newsletterRoutes.js';
import contactrouter from './routes/contactRoutes.js';
import reviewsRouter from './routes/reviewsRoutes.js';

const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudNiary();

//middlewares
app.use(express.json());
app.use(cors());

// Add these at the top of your server.js file
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

//api end points
app.use('/api/admin', adminRouter);
app.use('/api/cook', cookRouter);
app.use('/api/user', userRouter);
app.use('/api/newsletter', newsletterrouter);
app.use('/api/contact', contactrouter);
app.use('/api/reviews', reviewsRouter);

app.get('/', (req, res) => {
    res.send('API WORKING');
});

// Start server in development mode
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel serverless
export default app;
