// import React, { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const TopCooks = () => {
//   const navigate = useNavigate();
//   const { cooks } = useContext(AppContext);
  
//   useEffect(() => {
//     console.log("Cooks in TopCooks component:", cooks);
//     console.log("Type of cooks:", typeof cooks);
//     console.log("Is array:", Array.isArray(cooks));
//   }, [cooks]);
  
//   // Make sure we're working with an array
//   const cooksList = Array.isArray(cooks) ? cooks : [];
  
//   return (
//     <div className="py-16 px-4 max-w-7xl mx-auto">
//       {/* Header Section with Decorative Element */}
//       <div className="text-center mb-12 relative">
//         <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-16 h-1 bg-orange-400 rounded-full"></div>
//         <h1 className="text-4xl font-bold text-gray-800 mt-6 mb-3">Top Cooks to Book</h1>
//         <p className="max-w-2xl mx-auto text-gray-600 text-lg">
//           Discover our top cooks who are known for their culinary excellence and
//           authenticity. Choose from our selection and book a table now!
//         </p>
//       </div>
      
//       {/* Cooks Grid with Improved Layout */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//         {cooksList.slice(0, 8).map((item) => (
//           <div 
//             key={item._id} 
//             onClick={() => navigate(`/bookings/${item._id}`)} 
//             className="group bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-orange-200 transform hover:-translate-y-1"
//           >
//             <div className="overflow-hidden">
//               <img 
//                 className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" 
//                 src={item.image} 
//                 alt={item.name} 
//               />
//             </div>
            
//             <div className="p-5">
//               {/* Status Badge */}
//               <div className="flex items-center gap-2 mb-3">
//                 <span className="flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
//                 {
//                   item.available ? 'Available Now': 'Not Available'
//                 }
//                   <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
//                  {item.available}
//                 </span>
//               </div>
              
//               {/* Cook Info */}
//               <h3 className="text-gray-900 text-xl font-semibold mb-1 group-hover:text-orange-500 transition-colors">{item.name}</h3>
//               <p className="text-gray-600 text-sm mb-3">{item.speciality}</p>
              
//               {/* Rating and Book Button */}
//               <div className="flex justify-between items-center pt-3 border-t border-gray-100">
//                 <div className="flex items-center">
//                   <div className="flex text-yellow-400">
//                     {[...Array(5)].map((_, i) => (
//                       <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                     ))}
//                   </div>
//                   <span className="text-sm ml-1 text-gray-600">5.0</span>
//                 </div>
//                 <button className="text-sm font-medium text-orange-500 hover:text-orange-600">
//                   Book Now →
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {/* View All Button with Enhanced Style */}
//       <div className="flex justify-center mt-12">
//         <button 
//           onClick={() => {navigate('/cooks'); scrollTo(0,0)}}
//           className="px-8 py-3 bg-orange-500 text-white rounded-full font-medium transition-all duration-300 hover:bg-orange-600 hover:shadow-lg flex items-center gap-2"
//         >
//           View All Cooks
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//           </svg>
//         </button>
//       </div>
      
//       {/* Decorative Element */}
//       <div className="mt-16 flex justify-center">
//         <div className="w-24 h-1 bg-gray-200 rounded-full"></div>
//       </div>
//     </div>
//   );
// };

// export default TopCooks;

import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopCooks = () => {
  const navigate = useNavigate();
  const { cooks } = useContext(AppContext);
  
  useEffect(() => {
    console.log("Cooks in TopCooks component:", cooks);
    console.log("Type of cooks:", typeof cooks);
    console.log("Is array:", Array.isArray(cooks));
  }, [cooks]);
  
  // Make sure we're working with an array
  const cooksList = Array.isArray(cooks) ? cooks : [];
  
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      {/* Header Section with Decorative Element */}
      <div className="text-center mb-12 relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-16 h-1 bg-orange-400 rounded-full"></div>
        <h1 className="text-4xl font-bold text-gray-800 mt-6 mb-3">Top Cooks to Book</h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Discover our top cooks who are known for their culinary excellence and
          authenticity. Choose from our selection and book a table now!
        </p>
      </div>
      
      {/* Cooks Grid with Improved Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cooksList.slice(0, 8).map((item) => (
          <div 
            key={item._id} 
            onClick={() => navigate(`/bookings/${item._id}`)} 
            className="group bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-orange-200 transform hover:-translate-y-1"
          >
            <div className="overflow-hidden">
              <img 
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                src={item.image} 
                alt={item.name} 
              />
            </div>
            
            <div className="p-5">
              {/* Status Badge - Fixed to properly use the boolean value and conditional colors */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  item.available 
                    ? 'bg-green-50 text-green-600' 
                    : 'bg-red-50 text-red-600'
                }`}>
                  {item.available ? 'Available Now' : 'Not Available'}
                  <span className={`w-2 h-2 rounded-full ml-1 ${
                    item.available ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                </span>
              </div>
              
              {/* Cook Info */}
              <h3 className="text-gray-900 text-xl font-semibold mb-1 group-hover:text-orange-500 transition-colors">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{item.speciality}</p>
              
              {/* Rating and Book Button */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm ml-1 text-gray-600">5.0</span>
                </div>
                <button className="text-sm font-medium text-orange-500 hover:text-orange-600">
                  Book Now →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* View All Button with Enhanced Style */}
      <div className="flex justify-center mt-12">
        <button 
          onClick={() => {navigate('/cooks'); scrollTo(0,0)}}
          className="px-8 py-3 bg-orange-500 text-white rounded-full font-medium transition-all duration-300 hover:bg-orange-600 hover:shadow-lg flex items-center gap-2"
        >
          View All Cooks
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Decorative Element */}
      <div className="mt-16 flex justify-center">
        <div className="w-24 h-1 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default TopCooks;
