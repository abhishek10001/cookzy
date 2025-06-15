import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { PiChefHatFill } from "react-icons/pi";
import { IoCalendarNumber } from "react-icons/io5";
import { FaRegCalendar, FaUserLarge, FaSpinner } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import list_icon from "../../assets/assets_admin/list_icon.svg";
import cancel_icon from "../../assets/assets_admin/cancel_icon.svg";

const Dashboard = () => {
  const { aToken, getDashData, cancelBookings, dashData } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  const handleCancelBooking = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBookings(id);
    }
  };

  if (!dashData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  const stats = [
    {
      icon: <PiChefHatFill className="text-2xl" />,
      value: dashData.cooksCount,
      label: "Total Cooks",
      color: "blue"
    },
    {
      icon: <FaUserLarge className="text-2xl" />,
      value: dashData.usersCount,
      label: "Registered Users",
      color: "green"
    },
    {
      icon: <IoCalendarNumber className="text-2xl" />,
      value: dashData.bookingsCount,
      label: "Total Bookings",
      color: "purple"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-gray-800 mb-6"
      >
        Admin Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bg-white rounded-lg shadow-md p-6 flex items-center transition-all hover:shadow-lg hover:scale-[1.02]`}
          >
            <div className={`rounded-full bg-${stat.color}-100 p-4 mr-4`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">
                {stat.value}
              </p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Latest Bookings */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="border-b border-gray-200 p-4 flex items-center bg-gray-50">
          <img src={list_icon} alt="List" className="w-5 h-5 mr-2" />
          <p className="font-semibold text-gray-800">Latest Bookings</p>
        </div>

        <div className="divide-y divide-gray-100">
          <AnimatePresence>
            {dashData.latestBookings.length > 0 ? (
              dashData.latestBookings.map((item, index) => {
                let statusClass = "";
                let statusText = "";

                if (item.cancelled) {
                  statusClass = "bg-red-100 text-red-600";
                  statusText = "Cancelled";
                } else if (item.isconfirmed && !item.isCompleted) {
                  statusClass = "bg-yellow-100 text-yellow-600";
                  statusText = "Confirmed";
                } else if (item.isCompleted) {
                  statusClass = "bg-green-100 text-green-600";
                  statusText = "Completed";
                } else {
                  statusClass = "bg-orange-100 text-orange-600";
                  statusText = "Pending";
                }

                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 flex items-center justify-between hover:bg-gray-50 ${
                      item.cancelled ? "bg-red-50" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={item.cookData.image}
                        alt={item.cookData.name}
                        className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-200"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.cookData.name}
                        </p>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <FaRegCalendar className="mr-1 text-primary" />
                          <p>{item.bookingDate}</p>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <FaRegClock className="mr-1 text-primary" />
                          <p>{item.bookingTime}</p>
                        </div>
                      </div>
                    </div>

                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}
                    >
                      {statusText}
                    </motion.span>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center text-gray-500"
              >
                No bookings found
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;