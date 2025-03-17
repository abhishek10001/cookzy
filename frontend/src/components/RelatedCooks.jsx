// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const RelatedCooks = ({ relatedCooks, cookId }) => {
//   const navigate = useNavigate();
//   const { cooks } = useContext(AppContext);
//   const [relCooks, setRelCooks] = useState([]);

//   useEffect(() => {
//     if (cooks.length > 0 && relatedCooks.length > 0) {
//       const cooksData = cooks.filter(
//         (cook) => cook.speciality === relatedCooks[0].speciality && cook._id !== cookId
//       );
//       setRelCooks(cooksData);
//     }
//   }, [cooks, relatedCooks, cookId]);

//   return (
//     <div className="py-16 px-4 max-w-7xl mx-auto">
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-bold text-gray-800">Other Cooks To Consider</h1>
//         <p className="max-w-2xl mx-auto text-gray-600 text-lg">
//           Discover our top cooks who are known for their culinary excellence and authenticity.
//         </p>
//       </div>

//       {/* Scrollable container when there are more than 8 cooks */}
//       <div
//         className={`flex gap-6 overflow-x-auto ${relCooks.length > 8 ? "scrollbar-hide" : ""} px-2 py-4`}
//         style={{ scrollBehavior: "smooth" }}
//       >
//         {relCooks.map((item) => (
//           <div
//             key={item._id}
//             onClick={() => navigate(`/bookings/${item._id}`)}
//             className="group w-80 bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-orange-200 transform hover:-translate-y-1 flex-shrink-0"
//           >
//             <div className="overflow-hidden">
//               <img
//                 className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                 src={item.image}
//                 alt={item.name}
//               />
//             </div>
//             <div className="p-5">
//               <h3 className="text-gray-900 text-xl font-semibold mb-1 group-hover:text-orange-500 transition-colors">
//                 {item.name}
//               </h3>
//               <p className="text-gray-600 text-sm mb-3">{item.speciality}</p>

//               <div className="flex justify-between items-center pt-3 border-t border-gray-100">
//                 <span className="text-sm text-gray-600">5.0 ★</span>
//                 <button className="text-sm font-medium text-orange-500 hover:text-orange-600">
//                   Book Now →
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* View All Button */}
    
//     </div>
//   );
// };

// export default RelatedCooks;


import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedCooks = () => {
  const navigate = useNavigate();
  const { cooks } = useContext(AppContext);
  const [relCooks, setRelCooks] = useState([]);
  
  // Get current cook ID from URL
  const currentPath = window.location.pathname;
  const cookId = currentPath.split('/').pop();

  useEffect(() => {
    if (cooks && cooks.length > 0 && cookId) {
      // Find current cook
      const currentCook = cooks.find(cook => cook._id === cookId);
      
      if (currentCook) {
        // Filter cooks with same speciality but different ID
        const relatedCooksData = cooks.filter(
          cook => cook.speciality === currentCook.speciality && cook._id !== cookId
        );
        setRelCooks(relatedCooksData);
      }
    }
  }, [cooks, cookId]);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Other Cooks To Consider</h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Discover our top cooks who are known for their culinary excellence and authenticity.
        </p>
      </div>

      {/* Scrollable container when there are more than 8 cooks */}
      <div
        className={`flex gap-6 overflow-x-auto ${relCooks.length > 8 ? "scrollbar-hide" : ""} px-2 py-4`}
        style={{ scrollBehavior: "smooth" }}
      >
        {relCooks.length > 0 ? (
          relCooks.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/bookings/${item._id}`)}
              className="group w-80 bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-orange-200 transform hover:-translate-y-1 flex-shrink-0"
            >
              <div className="overflow-hidden">
                <img
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <div className="p-5">
                <h3 className="text-gray-900 text-xl font-semibold mb-1 group-hover:text-orange-500 transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{item.speciality}</p>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-600">5.0 ★</span>
                  <button className="text-sm font-medium text-orange-500 hover:text-orange-600">
                    Book Now →
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full py-8">No related cooks found</p>
        )}
      </div>
    </div>
  );
};

export default RelatedCooks;
