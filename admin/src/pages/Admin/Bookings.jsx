import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { CookContext } from "../../context/CookContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaUser, FaClock, FaRupeeSign, FaSpinner } from "react-icons/fa";

const Bookings = () => {
  const { aToken, bookings, getAllBookings } = useContext(AdminContext);
  const { completeBooking, cancelBooking, confirmBooking } = useContext(CookContext);

  useEffect(() => {
    if (aToken) {
      getAllBookings();
    }
  }, [aToken]);

  const getBookingStatus = (booking) => {
    if (booking.cancelled) {
      return {
        class: "bg-red-100 text-red-600",
        text: "Cancelled",
      };
    }

    if (booking.isCompleted) {
      return {
        class: "bg-green-100 text-green-600",
        text: "Completed",
      };
    }

    if (booking.isconfirmed) {
      return {
        class: "bg-yellow-100 text-yellow-600",
        text: "Confirmed",
      };
    }

    return {
      class: "bg-orange-100 text-orange-600",
      text: "Pending",
    };
  };

  const handleCancelBooking = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking(id);
    }
  };

  const handleConfirmBooking = (id) => {
    if (window.confirm("Are you sure you want to confirm this booking?")) {
      confirmBooking(id);
    }
  };

  if (!bookings) {
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
      className="w-full max-w-6xl m-5"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-4"
      >
        <FaCalendarAlt className="text-primary text-xl" />
        <h1 className="text-xl font-semibold text-gray-800">All Bookings</h1>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_3fr_3fr_3fr_1fr] gap-4 py-4 px-6 bg-gray-50 border-b">
          <p className="font-medium text-gray-600">S.No.</p>
          <p className="font-medium text-gray-600">Client Name</p>
          <p className="font-medium text-gray-600">Date & Time</p>
          <p className="font-medium text-gray-600">Cook Name</p>
          <p className="font-medium text-gray-600">Fee</p>
          <p className="font-medium text-gray-600">Status</p>
        </div>

        <AnimatePresence>
          {bookings && bookings.length > 0 ? (
            bookings.map((item, index) => {
              const status = getBookingStatus(item);

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex flex-wrap max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_3fr_3fr_3fr_1fr] gap-4 py-4 px-6 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <p className="text-gray-600">{index + 1}</p>
                  
                  <div className="flex items-center gap-3">
                    {item.userData && item.userData.image && (
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={item.userData.image}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-800">{item.userData?.name || "N/A"}</p>
                      <p className="text-sm text-gray-500">{item.userData?.email || ""}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaCalendarAlt className="text-primary" />
                      <p>{item.bookingDate || "N/A"}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaClock className="text-primary" />
                      <p>{item.bookingTime || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={item.cookData.image}
                      alt={item.cookData.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.cookData?.name || "N/A"}</p>
                      <p className="text-sm text-gray-500">{item.cookData?.speciality || ""}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaRupeeSign className="text-primary" />
                    <p className="font-medium text-gray-800">{item.amount || "N/A"}</p>
                  </div>

                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${status.class}`}
                  >
                    {status.text}
                  </motion.span>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 text-center text-gray-500"
            >
              No bookings found
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Bookings;
