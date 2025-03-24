import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    cook: { type: mongoose.Schema.Types.ObjectId, ref: 'cook', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewText: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const reviewModelCook= mongoose.model('ReviewCook', reviewSchema);

export default reviewModelCook;
