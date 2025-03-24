import express from "express";
import authUser from "../middlewares/authUser.js";
import { addCookReview, addPlatformReview, getCookReviews, getPlatformReviews } from "../controllers/reviewsController.js";

const reviewsRouter = express.Router();

reviewsRouter.post("/cook/:cookId/review", authUser, addCookReview);
reviewsRouter.get("/cook/:cookId/reviews", getCookReviews);
reviewsRouter.post("/platform/review", authUser, addPlatformReview);
reviewsRouter.get("/platform/reviews", getPlatformReviews); // Fixed: Changed from addPlatformReview to getPlatformReviews

export default reviewsRouter;