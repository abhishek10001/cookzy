// components/MenuHighlights.jsx
import React from "react";

const MenuHighlights = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Menu Highlights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex items-center p-3 border border-gray-100 rounded-xl">
            <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Signature Dish {item}</h3>
              <p className="text-sm text-gray-500">Special preparation with seasonal ingredients</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuHighlights;