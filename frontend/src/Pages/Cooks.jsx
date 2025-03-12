// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContext";

// const Cooks = () => {
//   const { speciality } = useParams();
//   console.log(speciality);

//   // this specialty is coming from the page where when i clicked the speciality button through useParams hook

//   const [filterCooks , setFilterCooks]= useState([]);

//   const { cooks } = useContext(AppContext);

//   const applyFilter = () =>
// {
//   if(speciality)
//   {
//     setFilterCooks(cooks.filter((cook) => cook.speciality === speciality));
//   }

//   else
//   {
//     setFilterCooks(cooks);
//   }

// } 

// useEffect(()=>{
//   applyFilter();

// },[cooks,speciality]);

//  return (
//     <div>
//       <p>Browse Through the Cook specialist.</p>
//       <div>
//         <div>
//           <p>American Cuisine</p>
//           <p>Indian Cuisine</p>
//           <p>Italian Cuisine</p>
//           <p>French Cuisine</p>
//           <p>Korean Cuisine</p>
//           <p>Mediterranean Cuisine</p>
//         </div>
//       </div>
//       {
//         filterCooks.map((item, index) => (
//                     <div key={item._id} onClick={() => navigate(`/bookings/${item._id}`)} className="border border-primary rounded-xl overflow-hidden cursor-pointer">
//                         <img className="bg-orange-50 h-60 w-72" src={item.image} alt={item.name} />
//                         <div className="p-4">
//                             <div className="flex items-center gap-2 text-center text-sm">
//                                 <p className="w-2 h-2 bg-green-500 rounded-full"></p>
//                                 <p>Available</p>
//                             </div>
//                             <p className="text-gray-900 text-lg font-medium">{item.name}</p>
//                             <p className="text-gray-600 text-sm">{item.speciality}</p>
//                         </div>
//                     </div>
//                 ))
//       }
//     </div>
//   );
// };

// export default Cooks;



import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Cooks = () => {
  const { speciality } = useParams();
  const navigate = useNavigate(); // Added missing navigate function
  
  const [filterCooks, setFilterCooks] = useState([]);
  const [activeFilter, setActiveFilter] = useState(speciality || "all");
  
  const { cooks } = useContext(AppContext);
  
  // List of available cuisines
  const cuisines = [
    "All Cuisines",
    "American Cuisine",
    "Indian Cuisine",
    "Italian Cuisine",
    "French Cuisine",
    "Korean Cuisine",
    "Mediterranean Cuisine"
  ];

  const applyFilter = () => {
    if (speciality && speciality !== "all") {
      setFilterCooks(cooks.filter((cook) => cook.speciality === speciality));
      setActiveFilter(speciality);
    } else {
      setFilterCooks(cooks);
      setActiveFilter("all");
    }
  };
  
  // Handle cuisine filter click
  const handleCuisineClick = (cuisine) => {
    const filterValue = cuisine === "All Cuisines" ? "all" : cuisine;
    navigate(`/cooks/${filterValue}`);
    setActiveFilter(filterValue);
  };

  useEffect(() => {
    applyFilter();
  }, [cooks, speciality]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Professional Cooks</h1>
        <p className="text-lg text-gray-600">Browse through our specialist cooks and find the perfect cook for your next meal</p>
      </div>
      
      {/* Cuisine Filter Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter by Cuisine</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => handleCuisineClick(cuisine)}
              className={`px-4 py-2 rounded-full transition-all ${
                (cuisine === "All Cuisines" && activeFilter === "all") || 
                cuisine === activeFilter
                  ? "bg-orange-500 text-white font-medium shadow-md"
                  : "bg-orange-100 text-orange-800 hover:bg-orange-200"
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>
      
      {/* Cooks Grid */}
      {filterCooks.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No chefs available for this cuisine yet. Please check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filterCooks.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/bookings/${item._id}`) }
              className="border border-orange-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <div className="overflow-hidden">
                <img
                  className="h-60 w-full object-cover transition-transform duration-300 hover:scale-105"
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-green-600 font-medium">Available</p>
                </div>
                <h3 className="text-gray-900 text-lg font-medium mb-1">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm ml-1">4.9</span>
                  </div>
                  <button className="text-sm text-orange-500 font-medium hover:text-orange-600">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cooks;