import React, { useContext, useEffect, useState } from "react";
import { CookContext } from "../../context/CookContext";
import {
  FaCalendarAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaTimes,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaClock,
  FaCheck,
  FaChevronDown,
  FaArrowDown,
} from "react-icons/fa";

const CookBookings = () => {
  const {
    cToken,
    bookings,
    getBookings,
    cancelBooking,
    completeBooking,
    confirmBooking,
  } = useContext(CookContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    if (cToken) {
      getBookings();
    }
  }, [cToken]);

  useEffect(() => {
    if (bookings) {
      let filtered = [...bookings];

      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(
          (booking) =>
            booking.userData.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            booking.userData.email
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
      }

      // Apply status filter
      if (statusFilter !== "all") {
        filtered = filtered.filter((booking) => {
          if (statusFilter === "confirmed")
            return !booking.cancelled && !booking.isCompleted;
          if (statusFilter === "completed") return booking.isCompleted;
          if (statusFilter === "cancelled") return booking.cancelled;
          return true;
        });
      }

      // Apply sorting - Enhanced sorting functionality
      filtered.sort((a, b) => {
        // Format date strings for comparison
        const getDateObj = (booking) => {
          const dateParts = booking.bookingDate.split("/");
          const [day, month, year] =
            dateParts.length === 3 ? dateParts : [1, 1, 2023];
          const [hours, minutes] = booking.bookingTime.split(":");
          return new Date(year, month - 1, day, hours || 0, minutes || 0);
        };

        const dateA = getDateObj(a);
        const dateB = getDateObj(b);

        // Sort by different criteria
        switch (sortBy) {
          case "newest":
            return dateB - dateA;
          case "oldest":
            return dateA - dateB;
          case "amount-high":
            return b.amount - a.amount;
          case "amount-low":
            return a.amount - b.amount;
          case "name-asc":
            return a.userData.name.localeCompare(b.userData.name);
          case "name-desc":
            return b.userData.name.localeCompare(a.userData.name);
          default:
            return 0;
        }
      });

      setFilteredBookings(filtered);
    }
  }, [searchTerm, bookings, statusFilter, sortBy]);

  // Get booking status consistently
  const getBookingStatus = (booking) => {
    if (booking.cancelled) return "cancelled";
    if (booking.isCompleted) return "completed";
    return "confirmed";
  };

  // Card view for mobile screens with improved design
  const BookingCard = ({ item, index }) => {
    const status = getBookingStatus(item);

    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 border-orange-500">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-orange-100 overflow-hidden flex-shrink-0 border-2 border-orange-200">
              <img
                src={item.userData.image}
                alt={item.userData.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/api/placeholder/40/40";
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-gray-800 text-lg">
                {item.userData.name}
              </p>
              <p className="text-sm text-gray-500">
                {item.userData.email || "No email provided"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-3 rounded-lg">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-medium">
              Date & Time
            </p>
            <div className="flex items-center text-gray-700 text-sm mb-1">
              <FaCalendarAlt className="text-orange-500 mr-2 flex-shrink-0" />
              <span className="truncate">{item.bookingDate}</span>
            </div>
            <div className="flex items-center text-gray-700 text-sm">
              <FaClock className="text-orange-500 mr-2 flex-shrink-0" />
              <span>{item.bookingTime}</span>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-medium">
              Payment
            </p>
            <div className="flex items-center text-sm mb-1">
              {item.payment ? (
                <span className="flex items-center text-green-600">
                  <FaCreditCard className="mr-2 flex-shrink-0" /> Online
                </span>
              ) : (
                <span className="flex items-center text-blue-600">
                  <FaMoneyBillWave className="mr-2 flex-shrink-0" /> Cash
                </span>
              )}
            </div>
            <div className="font-medium text-gray-800 text-sm">
              Rs {item.amount}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          {status === "confirmed" ? (
            <>
              <button
                onClick={() => completeBooking(item._id)}
                className="px-3 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm flex items-center"
              >
                <FaCheck className="mr-2" /> Mark as Done
              </button>
              <button
                onClick={() => cancelBooking(item._id)}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
            </>
          ) : (
            <div className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm flex items-center">
              {status === "completed" ? (
                <>
                  <FaCheck className="mr-2 text-green-600" />
                  <span className="text-green-600 font-medium">Completed</span>
                </>
              ) : (
                <>
                  <FaTimes className="mr-2 text-red-600" />
                  <span className="text-red-600 font-medium">Cancelled</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          <span className="border-b-4 border-orange-500 pb-1">Booking</span>{" "}
          Management
        </h1>

        {/* Search and filter bar with improved design */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            {/* Filter dropdown */}
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="px-3 py-2 sm:px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1 sm:gap-2 text-sm"
              >
                <FaFilter /> <span className="hidden xs:inline">Filter</span>{" "}
                <FaChevronDown className="text-xs" />
              </button>

              {filterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                  <div className="p-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-700">Status</p>
                  </div>
                  <div className="p-2">
                    <div
                      className={`p-2 rounded-md cursor-pointer ${
                        statusFilter === "all"
                          ? "bg-orange-100 text-orange-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setStatusFilter("all");
                        setFilterOpen(false);
                      }}
                    >
                      All Bookings
                    </div>
                    <div
                      className={`p-2 rounded-md cursor-pointer ${
                        statusFilter === "confirmed"
                          ? "bg-orange-100 text-orange-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setStatusFilter("confirmed");
                        setFilterOpen(false);
                      }}
                    >
                      Confirmed
                    </div>
                    <div
                      className={`p-2 rounded-md cursor-pointer ${
                        statusFilter === "completed"
                          ? "bg-orange-100 text-orange-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setStatusFilter("completed");
                        setFilterOpen(false);
                      }}
                    >
                      Completed
                    </div>
                    <div
                      className={`p-2 rounded-md cursor-pointer ${
                        statusFilter === "cancelled"
                          ? "bg-orange-100 text-orange-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setStatusFilter("cancelled");
                        setFilterOpen(false);
                      }}
                    >
                      Cancelled
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sort dropdown with enhanced options */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="px-3 py-2 sm:px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1 sm:gap-2 text-sm"
              >
                <FaSortAmountDown />{" "}
                <span className="hidden xs:inline">Sort</span>{" "}
                <FaChevronDown className="text-xs" />
              </button>

              {sortOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                  <div className="p-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-700">Sort By</p>
                  </div>
                  <div className="p-2">
                    <div
                      className={`p-2 rounded-md cursor-pointer ${
                        sortBy === "newest"
                          ? "bg-orange-100 text-orange-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setSortBy("newest");
                        setSortOpen(false);
                      }}
                    >
                      Date (Newest First)
                    </div>
                    <div
                      className={`p-2 rounded-md cursor-pointer ${
                        sortBy === "oldest"
                          ? "bg-orange-100 text-orange-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setSortBy("oldest");
                        setSortOpen(false);
                      }}
                    >
                      Date (Oldest First)
                    </div>

                    <div
                      className={`p-2 rounded-md cursor-pointer ${
                        sortBy === "name-asc"
                          ? "bg-orange-100 text-orange-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setSortBy("name-asc");
                        setSortOpen(false);
                      }}
                    >
                      Name (A to Z)
                    </div>
                    <div
                      className={`p-2 rounded-md cursor-pointer ${
                        sortBy === "name-desc"
                          ? "bg-orange-100 text-orange-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setSortBy("name-desc");
                        setSortOpen(false);
                      }}
                    >
                      Name (Z to A)
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-12 sm:py-16 bg-white rounded-lg shadow-md">
          <div className="mx-auto w-16 sm:w-20 h-16 sm:h-20 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <FaCalendarAlt className="text-orange-500 text-2xl sm:text-3xl" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            No bookings found
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filters"
              : "You don't have any bookings yet. Check back later!"}
          </p>
        </div>
      ) : (
        <>
          {/* Mobile view - cards */}
          <div className="md:hidden">
            {filteredBookings.map((item, index) => (
              <BookingCard key={index} item={item} index={index} />
            ))}
          </div>

          {/* Desktop view - table with improved styling */}
          <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-orange-50">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      S.No.
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Fees
                    </th>
                    <th className="px-4 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBookings.map((item, index) => {
                    const status = getBookingStatus(item);

                    return (
                      <tr
                        key={index}
                        className={`hover:bg-orange-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap font-medium text-gray-700">
                          {index + 1}
                        </td>

                        <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-orange-100 overflow-hidden flex-shrink-0 border border-orange-200">
                              <img
                                src={item.userData.image}
                                alt={item.userData.name}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/api/placeholder/40/40";
                                }}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                {item.userData.name}
                              </p>
                              <p className="text-xs lg:text-sm text-gray-500">
                                {item.userData.email || "No email provided"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {item.payment ? (
                              <span className="flex items-center bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full">
                                <FaCreditCard className="mr-1" /> Online
                              </span>
                            ) : (
                              <span className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 text-xs rounded-full">
                                <FaMoneyBillWave className="mr-1" /> Cash
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          <div className="flex items-center text-gray-700 text-sm">
                            <FaCalendarAlt className="text-orange-500 mr-2" />
                            <span>{item.bookingDate}</span>
                          </div>
                          <div className="flex items-center text-gray-700 text-sm mt-1">
                            <FaClock className="text-orange-500 mr-2" />
                            <span>{item.bookingTime}</span>
                          </div>
                        </td>

                        <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          <span className="font-medium text-gray-800">
                            Rs {item.amount}
                          </span>
                        </td>

                        <td className="px-4 lg:px-6 py-3 lg:py-4 whitespace-nowrap">
                          {status === "confirmed" ? (
                            <div className="flex gap-2">
                              
                              {item.isconfirmed ? (
                                     <button
                                onClick={() => completeBooking(item._id)}
                                className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors text-xs lg:text-sm flex items-center"
                              >
                                <FaCheck className="mr-1" /> Done
                              </button>
                                  ) : (""
                                   
                                  )}
                              {item.isconfirmed ? (
                                    ""
                                  ) : (
                                    <button
                                onClick={() => cancelBooking(item._id)}
                                className="px-3 py-1.5 bg-gray-100 text-black rounded-full hover:bg-gray-200 transition-colors text-xs lg:text-sm flex items-center"
                              >
                                <FaTimes className="mr-1" /> Cancel
                              </button>
                                  )}
                              {item.isconfirmed ? (
                                <div className="bg-yellow-400 rounded-full py-1 px-2"><p className="text-semibold text-sm text-white text-center">confirmed</p></div>
                                  ) : (
                                    <button
                                onClick={() => confirmBooking(item._id)}
                                className="px-3 py-1.5 bg-orange-300 text-white rounded-full hover:bg-gray-200 transition-colors text-xs lg:text-sm flex items-center"
                              >
                                <FaArrowDown className="mr-1" /> Confirm
                              </button>
                                    
                                  )}
                              
                             
                            </div>
                          ) : (
                            <div className="text-sm font-medium">
                              {status === "completed" ? (
                                <span className="text-green-600 flex items-center">
                                  <FaCheck className="mr-1" /> Completed
                                </span>
                              ) : (
                                <span className="text-red-600 flex items-center">
                                <FaTimes className="mr-1" /> Cancelled
                                  
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CookBookings;
