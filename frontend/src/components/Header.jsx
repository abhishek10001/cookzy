import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row bg-primary rounded-lg p-6 md:p-10 lg:p-16 overflow-hidden mt-6">
      {/* Left Content Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-6 py-8 md:py-12 lg:py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
          Book a Trusted Cook From <br className="hidden sm:block" /> CookZy
        </h1>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-white">
          <img className="w-28 h-auto" src={assets.group_profiles} alt="Profile group" />
          <p className="text-sm font-light">
            Simply browse through our extensive list of trusted cooks, <br className="hidden sm:block" />
            schedule your hassle-free Booking.
          </p>
        </div>
        
        <a href="#speaciality" className="flex items-center gap-2 bg-white text-primary py-3 px-6 rounded-full font-medium w-fit hover:bg-opacity-90 hover:scale-105 transition-all duration-300 ">
          Book Now 
          <img src={assets.arrow_icon} alt="Arrow" className="w-4 h-4" />
        </a>
      </div>
      
      {/* Right Image Section */}
      <div className="w-full md:w-1/2 relative mt-6 md:mt-0">
        <div className="md:absolute md:bottom-0 md:right-0 md:h-full">
          <img
            className="w-full h-auto rounded-lg object-cover "
            src={assets.header_img}
            alt="Chef cooking"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;