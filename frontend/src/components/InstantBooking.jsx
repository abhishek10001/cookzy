// components/InstantBooking.jsx
import React, { useState } from "react";

const InstantBooking = ({ cookInfo }) => {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    alert(`Instant booking confirmed for ${cookInfo.name} at ${location}.`);
  };

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-lg font-bold text-gray-800 mb-3">Instant Booking</h3>
      <button
        onClick={getCurrentLocation}
        className="w-full px-4 py-2 bg-gray-100 rounded-lg text-sm mb-2"
      >
        {isLoading ? "Getting location..." : "Use Current Location"}
      </button>

      {location && <p className="text-sm text-gray-600 mb-2">{location}</p>}

      <button
        onClick={handleInstantBooking}
        className="w-full px-4 py-3 bg-primary text-white rounded-xl font-medium"
      >
        Book Instantly
      </button>
    </div>
  );
};

export default InstantBooking;
