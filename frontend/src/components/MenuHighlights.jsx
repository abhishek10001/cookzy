import React, { useContext, useEffect, useState } from "react";
import { CiForkAndKnife } from "react-icons/ci";
import { AppContext } from "../context/AppContext";

const MenuHighlights = () => {
  const { cooks } = useContext(AppContext);
  const [menuItems, setMenuItems] = useState([]);
  
  // Get current cook ID from URL
  const currentPath = window.location.pathname;
  const cookId = currentPath.split('/').pop();

  useEffect(() => {
    if (cooks && cooks.length > 0 && cookId) {
      // Find current cook
      const foundCook = cooks.find(cook => cook._id === cookId);
      
      if (foundCook && foundCook.signatureDish) {
        // Convert signatureDish object to array of dish names
        const dishItems = Object.entries(foundCook.signatureDish)
          .filter(([key, value]) => key.startsWith('dish') && value)
          .map(([key, value]) => ({ name: value }));
        
        setMenuItems(dishItems);
      }
    }
  }, [cooks, cookId]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Menu Highlights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menuItems.length > 0 ? (
          menuItems.slice(0, 6).map((item, index) => (
            <div key={index} className="flex items-center p-3 border border-gray-100 rounded-xl">
              <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mr-4">
                <CiForkAndKnife className="text-primary h-8 w-8" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">Chef's specialty</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-gray-500 text-center py-4">No signature dishes available</p>
        )}
      </div>
    </div>
  );
};

export default MenuHighlights;