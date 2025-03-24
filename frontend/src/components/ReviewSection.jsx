import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { FaStar, FaRegStar, FaUserCircle, FaQuoteLeft } from "react-icons/fa";
import { MdSend, MdOutlineRateReview } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsStarHalf, BsEmojiSmile, BsEmojiNeutral, BsEmojiFrown } from "react-icons/bs";

const ReviewsSection = ({ cookId }) => {
  const { token, backendUrl } = useContext(AppContext);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [error, setError] = useState("");
  const [ratingStats, setRatingStats] = useState([0, 0, 0, 0, 0]);

  // Calculate average rating and rating distribution
  const calculateRatingStats = (reviewsData) => {
    if (!reviewsData.length) return { avg: 0, stats: [0, 0, 0, 0, 0] };
    
    const sum = reviewsData.reduce((acc, review) => acc + review.rating, 0);
    const avg = (sum / reviewsData.length).toFixed(1);
    
    // Calculate distribution of ratings (5★, 4★, 3★, 2★, 1★)
    const stats = [0, 0, 0, 0, 0];
    reviewsData.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        stats[5 - review.rating]++;
      }
    });
    
    return { avg, stats };
  };

  // Fetch reviews for this cook
  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `${backendUrl}/api/reviews/cook/${cookId}/reviews`
      );
      
      setReviews(response.data);
      const { avg, stats } = calculateRatingStats(response.data);
      setAverageRating(avg);
      setRatingStats(stats);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Submit a new review
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.warn("Please login to submit a review");
      return;
    }

    if (rating === 0) {
      toast.warn("Please select a rating");
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/reviews/cook/${cookId}/review`,
        { rating, reviewText },
        { headers: { token } }
      );

      if (data) {
        toast.success("Review submitted successfully");
        setRating(0);
        setReviewText("");
        setShowForm(false);
        fetchReviews(); // Refresh reviews
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate time ago
  const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return formatDate(dateString);
  };

  // Get emoji based on rating
  const getRatingEmoji = (rating) => {
    if (rating >= 4) return <BsEmojiSmile className="text-green-500" />;
    if (rating >= 3) return <BsEmojiNeutral className="text-yellow-500" />;
    return <BsEmojiFrown className="text-red-500" />;
  };

  // Calculate percentage for rating bar
  const calculatePercentage = (count) => {
    if (!reviews.length) return 0;
    return (count / reviews.length) * 100;
  };

  useEffect(() => {
    if (cookId) {
      fetchReviews();
    }
  }, [cookId]);

  return (
    <div className="mt-16 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header with summary */}
      <div className="bg-gradient-to-r from-primary/80 to-primary p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 text-white">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4 flex items-center">
          <MdOutlineRateReview className="mr-3" size={30} />
          Customer Reviews
        </h2>
        
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          {/* Average Rating */}
          <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-36">
            <div className="text-4xl font-bold">{averageRating}</div>
            <div className="flex my-1">
              {[...Array(5)].map((_, i) => {
                // Create full, half, or empty stars
                const value = i + 1;
                const fullStar = value <= Math.floor(averageRating);
                const halfStar = !fullStar && value <= Math.ceil(averageRating) && averageRating % 1 >= 0.3;
                
                if (fullStar) return <FaStar key={i} className="text-yellow-400 mx-0.5" />;
                if (halfStar) return <BsStarHalf key={i} className="text-yellow-400 mx-0.5" />;
                return <FaRegStar key={i} className="text-yellow-400 mx-0.5" />;
              })}
            </div>
            <div className="text-sm mt-1 opacity-90">
              {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
            </div>
          </div>
          
          {/* Rating Distribution */}
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((star, i) => (
              <div key={i} className="flex items-center mb-1.5 text-sm">
                <div className="w-14 flex justify-end pr-2">{star} stars</div>
                <div className="flex-1 h-3 mx-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full" 
                    style={{ width: `${calculatePercentage(ratingStats[i])}%` }}
                  ></div>
                </div>
                <div className="w-8 text-right">{ratingStats[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 border-l-4 border-red-500">
          {error}
        </div>
      )}

      {/* Add review button */}
      <div className="px-8 py-6 border-b border-gray-100 sticky top-0 bg-white z-10 shadow-sm">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-full transition-all flex items-center shadow-md hover:shadow-lg"
          >
            <FaStar className="mr-2" /> Write a Review
          </button>
        ) : (
          <div className="bg-gray-50 p-6 rounded-xl mb-4 transition-all border border-gray-200 shadow-inner">
            <h3 className="text-xl font-semibold mb-5 text-gray-800 flex items-center">
              <BiMessageSquareDetail className="mr-2" size={22} /> Share Your Experience
            </h3>
            
            {/* Rating selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overall Rating
              </label>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index} className="cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        className="hidden"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                      />
                      <FaStar
                        size={36}
                        className="mr-2 transform hover:scale-110 transition-all duration-150"
                        color={
                          ratingValue <= (hover || rating) ? "#FFD700" : "#e4e5e9"
                        }
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                      />
                    </label>
                  );
                })}
                <span className="ml-4 text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm border">
                  {rating > 0 ? (
                    <span className="font-medium flex items-center">
                      {rating} out of 5 {getRatingEmoji(rating)}
                    </span>
                  ) : (
                    "Select a rating"
                  )}
                </span>
              </div>
            </div>
            
            {/* Review text */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review (optional)
              </label>
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg resize-none h-32 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-inner"
                placeholder="What did you like or dislike? How was the food quality? Would you recommend this cook to others?"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </div>
            
            {/* Action buttons */}
            <div className="flex justify-end space-x-3">
              <button
                className="px-5 py-2.5 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-all font-medium"
                onClick={() => {
                  setShowForm(false);
                  setRating(0);
                  setReviewText("");
                  setHover(0);
                }}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2.5 bg-primary text-white rounded-full hover:bg-primary/90 transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg"
                onClick={handleSubmitReview}
                disabled={submitting || rating === 0}
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <MdSend className="mr-2" /> Submit Review
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="p-8">
        <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
          {reviews.length > 0 ? (
            <>Customer Feedback ({reviews.length})</>
          ) : (
            <>Customer Feedback</>
          )}
        </h3>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : reviews.length > 0 ? (
          <div className="space-y-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="flex">
                  {/* User Info */}
                  <div className="mr-4 flex flex-col items-center">
                    <div className="bg-gradient-to-br from-primary/70 to-primary rounded-full p-3 text-white shadow-md">
                      <FaUserCircle size={24} />
                    </div>
                    <div className="mt-2 flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={12}
                          className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <div className="text-xs font-medium mt-1">{review.rating}.0</div>
                  </div>
                  
                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold text-gray-800">
                          {review.user?.name || "Customer"}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {timeAgo(review.createdAt)}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        {getRatingEmoji(review.rating)}
                      </div>
                    </div>
                    
                    {review.reviewText ? (
                      <div className="relative">
                        <FaQuoteLeft className="absolute -left-2 -top-2 text-gray-200 opacity-50" size={16} />
                        <p className="text-gray-700 leading-relaxed pl-4">
                          {review.reviewText}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-400 italic text-sm pl-4">
                        No written review provided
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4">
            <div className="bg-gray-50 inline-block rounded-full p-6 mb-4">
              <MdOutlineRateReview className="text-primary opacity-70" size={48} />
            </div>
            <h4 className="text-xl font-semibold text-gray-800">No Reviews Yet</h4>
            <p className="mt-2 text-gray-500 max-w-md mx-auto">
              Be the first to share your experience with this cook and help others make informed decisions.
            </p>
            <button 
              onClick={() => setShowForm(true)}
              className="mt-6 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center mx-auto shadow-md"
            >
              <FaStar className="mr-2" /> Write the First Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;