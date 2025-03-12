// components/ChefHeader.jsx
import React from "react";
import assets from "../assets/assets_frontend/assets";
import { MdVerified } from "react-icons/md";

const ChefHeader = ({ cookInfo }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
      <div className="md:flex">
        {/* Chef Image */}
        <div className="md:w-1/3">
          <div className="h-full">
            <img 
              src={cookInfo.image} 
              alt={`Chef ${cookInfo.name}`} 
              className="w-full h-80 md:h-full object-cover"
            />
          </div>
        </div>
        
        {/* Chef Info */}
        <div className="md:w-2/3 p-6 md:p-8">
          <div className="flex items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800 mr-2">{cookInfo.name}</h1>
            <MdVerified className="text-green-400" />
          </div>
          
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <p className="text-gray-700">
              <span className="font-medium">{cookInfo.degree}</span> - {cookInfo.description}
            </p>
            <span className="px-4 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
              {cookInfo.experience} Experience
            </span>
            <span className="px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {cookInfo.speciality}
            </span>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-800 mr-2">About</h2>
              <img src={assets.info_icon} alt="Info" className="h-5 w-5" />
            </div>
            <p className="text-gray-600 leading-relaxed">{cookInfo.about}</p>
            <div>
              <p>
              <span className="font-medium">Address :</span> {cookInfo.address.line1} , {cookInfo.address.line2}
              </p>
              <p>
                <span className="font-medium">Fee:Rs</span> {cookInfo.fees}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center">
              <div className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="font-semibold">4.9</span>
              <span className="text-gray-500 ml-1">(128 reviews)</span>
            </div>
            
            <div className="flex items-center">
              <div className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-600">Completed 156 bookings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefHeader;