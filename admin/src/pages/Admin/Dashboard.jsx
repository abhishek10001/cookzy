import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { PiChefHatFill } from "react-icons/pi";
import { IoCalendarNumber } from "react-icons/io5";
import { FaRegCalendar, FaUserLarge } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center transition-transform hover:scale-105">
          <div className="rounded-full bg-blue-100 p-4 mr-4">
            <PiChefHatFill className="text-blue-600 text-2xl" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">
              {dashData.cooksCount}
            </p>
            <p className="text-gray-500 text-sm">Total Cooks</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex items-center transition-transform hover:scale-105">
          <div className="rounded-full bg-green-100 p-4 mr-4">
            <FaUserLarge className="text-green-600 text-2xl" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">
              {dashData.usersCount}
            </p>
            <p className="text-gray-500 text-sm">Registered Users</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex items-center transition-transform hover:scale-105">
          <div className="rounded-full bg-purple-100 p-4 mr-4">
            <IoCalendarNumber className="text-purple-600 text-2xl" />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-800">
              {dashData.bookingsCount}
            </p>
            <p className="text-gray-500 text-sm">Total Bookings</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 p-4 flex items-center bg-gray-50">
          <img src={list_icon} alt="List" className="w-5 h-5 mr-2" />
          <p className="font-semibold text-gray-800">Latest Bookings</p>
        </div>

        <div className="divide-y divide-gray-100">
          {dashData.latestBookings.length > 0 ? (
            dashData.latestBookings.map((item, index) => (
              <div
                key={index}
                className={`p-4 flex items-center justify-between hover:bg-gray-50 ${
                  item.cancelled ? "bg-red-50" : ""
                }`}
              >
                <div className="flex items-center">
                  <img
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

                {item.cancelled ? (
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                    Cancelled
                  </span>
                ) : (
                  <img
                  
                    onClick={() => handleCancelBooking(item._id)}
                    src={cancel_icon}
                    alt="Cancel"
                  />
                )}
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              No bookings found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
