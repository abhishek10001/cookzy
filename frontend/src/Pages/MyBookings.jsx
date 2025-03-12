// import React, { useContext } from "react";
// import { AppContext } from "../context/AppContext";
// const MyBookings = () => {
//   const { cooks } = useContext(AppContext);
//   return (
//     <div>
//       <p>My Bookings</p>
//       <div>
//         {cooks.slice(0, 2).map((item, index) => (
//           <div key={index}>
//             <div>
//               <img src={item.image} alt="" />
//               {console.log(item.name)}
//             </div>
//             <div>
//               <p>{item.name}</p>
//               <p>{item.speciality}</p>
//               <p>Address:</p>
//               <p>{item.address.line1}</p>
//               <p>{item.address.line2}</p>
//               <p><span>Date & Time</span> 22 , march , 2025 </p>
//             </div>
//             <div></div>
//             <div>
//             <button>
// Pay Online
//             </button>
//             <button>
//               Cancel Booking
//             </button></div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyBookings;



"use client"

import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTimes } from "react-icons/fa"

const MyBookings = () => {
  const { cooks } = useContext(AppContext)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h1>

      {cooks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You don't have any bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {cooks.slice(0, 2).map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="md:flex">
                {/* Cook Image */}
                <div className="md:w-1/3 h-48 md:h-auto relative">
                  <img
                    src={item.image || "/placeholder.svg?height=200&width=200"}
                    alt={item.name}
                    className="w-80 h-80 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=200&width=200"
                    }}
                  />
                </div>

                {/* Booking Details */}
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h2>
                      <p className="text-gray-600 mb-4">{item.speciality}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-start">
                          <FaMapMarkerAlt className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Address:</p>
                            <p className="text-sm text-gray-600">{item.address.line1}</p>
                            <p className="text-sm text-gray-600">{item.address.line2}</p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="flex items-center mr-4">
                            <FaCalendarAlt className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-700">22 March, 2025</span>
                          </div>
                          <div className="flex items-center">
                            <FaClock className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-700">7:00 PM</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 mt-6">
                        <button className="px-5 py-2 bg-[#FF5200] text-white font-medium rounded-full hover:bg-opacity-90 transition-colors duration-200 flex items-center">
                          Pay Online
                        </button>
                        <button className="px-5 py-2 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors duration-200 flex items-center">
                          <FaTimes className="h-3 w-3 mr-1" />
                          Cancel Booking
                        </button>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Pending
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state if needed */}
      {cooks.length > 0 && cooks.length <= 2 && (
        <div className="text-center mt-8">
          <p className="text-gray-500">
            Looking for more cooks?{" "}
            <a href="#" className="text-[#FF5200] hover:underline">
              Browse available cooks
            </a>
          </p>
        </div>
      )}
    </div>
  )
}

export default MyBookings

