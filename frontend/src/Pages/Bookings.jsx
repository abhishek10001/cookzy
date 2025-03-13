
// Bookings.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import ChefHeader from "../components/ChefHeader";
import MenuHighlights from "../components/MenuHighlights";
import ReviewsSection from "../components/ReviewSection";
import BookingCard from "../components/BookingCard";
import RelatedCooks from "../components/RelatedCooks";

const Bookings = () => {
  const { cookId } = useParams();
  const navigate = useNavigate();
  const { cooks } = useContext(AppContext);
  const [cookInfo, setCookInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedCooks, setRelatedCooks] = useState([]);

  

  const fetchCookInfo = () => {
    setLoading(true);
    try {
      const foundCook = cooks.find((cook) => cook._id === cookId);
      if (foundCook) {
        setCookInfo(foundCook);
        // Find related cooks with the same specialty
        const related = cooks.filter(
          (cook) => 
            cook._id !== cookId && 
            cook.speciality === foundCook.speciality
        ).slice(0, 5); // Limit to 3 related cooks
        console.log(cookId);
        setRelatedCooks(related);
      } else {
        console.error("Cook not found");
      }
    } catch (error) {
      console.error("Error fetching cook info:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cooks && cooks.length > 0 && cookId) {
      fetchCookInfo();
    }
  }, [cooks, cookId]);

  // Scroll to top when component mounts or when the cookId parameter changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cookId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Handle the case where cook info is not found
  if (!cookInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Chef Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find the chef you're looking for.</p>
        <button 
          onClick={() => navigate("/cooks")}
          className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary transition-colors"
        >
          Browse All Chefs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Chef Profile Header */}
      <ChefHeader cookInfo={cookInfo} />
      
      {/* Booking Section */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Menu Highlights and Reviews */}
        <div className="md:col-span-2">
          <MenuHighlights />
          <ReviewsSection />
          
          {/* Related Cooks Section */}
          <RelatedCooks relatedCooks={relatedCooks} cookId={cookId} />
        </div>
        
        {/* Booking Card */}
        <div className="md:col-span-1">
          <BookingCard cookInfo={cookInfo} />
        </div>
      </div>
    </div>
  );
};

export default Bookings;