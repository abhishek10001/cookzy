import React, { useContext, useEffect, useState } from "react";
import { CiForkAndKnife } from "react-icons/ci";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-all duration-300"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-gray-800 mb-6 text-center relative"
      >
        Menu Highlights
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary rounded-full"></div>
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {menuItems.length > 0 ? (
          menuItems.slice(0, 6).map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="flex items-center p-4 border border-gray-100 rounded-xl bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <motion.div 
                whileHover={{ rotate: 10 }}
                className="bg-gradient-to-br from-orange-100 to-orange-50 w-16 h-16 rounded-lg flex items-center justify-center mr-4 shadow-sm"
              >
                <CiForkAndKnife className="text-primary h-8 w-8" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Chef's specialty
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-2 text-gray-500 text-center py-8 bg-gray-50 rounded-xl"
          >
            <CiForkAndKnife className="h-12 w-12 mx-auto mb-3 text-gray-400" />
            <p>No signature dishes available</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MenuHighlights;