// components/InstantBooking.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMapPin, FiClock, FiCheck } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";

const InstantBooking = ({ cookInfo }) => {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Fetch user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`Lat: ${latitude}, Long: ${longitude}`);
        setIsLoading(false);
      },
      () => {
        alert("Unable to retrieve location.");
        setIsLoading(false);
      }
    );
  };

  // Confirm Instant Booking
  const handleInstantBooking = () => {
    if (!location) {
      alert("Please select your location.");
      return;
    }
    setIsBooked(true);
    setTimeout(() => {
      alert(`Instant booking confirmed for ${cookInfo.name} at ${location}.`);
      setIsBooked(false);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 border-t pt-6"
    >
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"
      >
        <FiClock className="text-primary" />
        Instant Booking
      </motion.h3>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={getCurrentLocation}
        disabled={isLoading}
        className={`w-full px-4 py-3 bg-gray-50 rounded-xl text-sm mb-4 flex items-center justify-center gap-2 transition-all duration-300 ${
          isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        <HiLocationMarker className={`text-lg ${isLoading ? 'animate-pulse' : ''}`} />
        {isLoading ? (
          <span className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
            />
            Getting location...
          </span>
        ) : (
          "Use Current Location"
        )}
      </motion.button>

      <AnimatePresence>
        {location && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-100">
              <FiMapPin className="text-green-500" />
              <p className="text-sm text-gray-600">{location}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleInstantBooking}
        disabled={!location || isBooked}
        className={`w-full px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
          isBooked
            ? 'bg-green-500 text-white'
            : location
            ? 'bg-primary text-white hover:bg-primary/90'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isBooked ? (
          <>
            <FiCheck className="text-lg" />
            Booking Confirmed!
          </>
        ) : (
          "Book Instantly"
        )}
      </motion.button>

      {!location && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-gray-500 mt-2 text-center"
        >
          Please select your location to proceed with booking
        </motion.p>
      )}
    </motion.div>
  );
};

export default InstantBooking;
