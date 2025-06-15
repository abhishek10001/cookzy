import React, { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaSpinner, FaCheck, FaTimes } from "react-icons/fa";

const CooksList = () => {
  const { cooks, aToken, getAllCooks, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllCooks();
    }
  }, [aToken]);

  if (!cooks) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-8"
      >
        <FaUser className="text-primary text-xl" />
        <h1 className="text-2xl font-bold text-gray-800">All Cooks</h1>
      </motion.div>

      <AnimatePresence>
        {cooks.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-40"
          >
            <p className="text-gray-500 text-lg">
              No cooks available at the moment
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cooks.map((cook, index) => (
              <motion.div
                key={cook._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden group">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    src={cook.image}
                    alt={`Chef ${cook.name}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm">{cook.speciality}</p>
                    <p className="text-xs mt-1">{cook.experience} experience</p>
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {cook.name}
                  </h2>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        cook.available ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <span className="text-sm text-gray-600">
                        {cook.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => changeAvailability(cook._id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        cook.available
                          ? 'bg-green-100 text-green-600 hover:bg-green-200'
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                    >
                      {cook.available ? <FaCheck /> : <FaTimes />}
                    </motion.button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Signature Dishes:</span>
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {Object.values(cook.signatureDish || {}).map((dish, i) => (
                        dish && (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                          >
                            {dish}
                          </span>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CooksList;
