// components/ReviewsSection.jsx
import React from "react";

const ReviewsSection = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>
      {[1, 2].map((review) => (
        <div key={review} className="border-b border-gray-100 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <h3 className="font-medium text-gray-800">Customer {review}</h3>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-500">2 weeks ago</span>
          </div>
          <p className="text-gray-600">Amazing experience! The chef was professional and the food was absolutely delicious. Will definitely book again.</p>
        </div>
      ))}
      <button className="text-primary font-medium mt-2 hover:text-primary">View all reviews</button>
    </div>
  );
};

export default ReviewsSection;