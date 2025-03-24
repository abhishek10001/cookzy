import mongoose from "mongoose";

const platformReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const reviewModelCookzy = mongoose.model('PlatformReview', platformReviewSchema);

export default reviewModelCookzy;
