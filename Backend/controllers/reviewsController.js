import reviewModelCook from '../models/reviewModelCook.js';
import reviewModelCookzy from '../models/reviewModelCookzy.js';

// Add review for a cook
const addCookReview = async (req, res) => {
    try {
        const { rating, reviewText } = req.body;
        const cookId = req.params.cookId; // Get cookId from params instead of body
        const userId = req.userId;

        const newReview = new reviewModelCook({
            cook: cookId,
            user: userId,
            rating,
            reviewText
        });

        await newReview.save();
        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get reviews for a cook
const getCookReviews = async (req, res) => {
    try {
        const cookId = req.params.cookId;
        const reviews = await reviewModelCook.find({ cook: cookId }).populate('user', 'name');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add review for the platform
const addPlatformReview = async (req, res) => {
    try {
        const { rating, reviewText } = req.body;
        const userId = req.userId;

        const newReview = new reviewModelCookzy({
            user: userId,
            rating,
            reviewText
        });

        await newReview.save();
        res.status(201).json({ message: 'Platform review added successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all platform reviews
const getPlatformReviews = async (req, res) => {
    try {
        const reviews = await reviewModelCookzy.find().populate('user', 'name');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { addCookReview, getCookReviews, addPlatformReview, getPlatformReviews };