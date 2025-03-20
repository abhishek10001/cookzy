import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTimes,
  FaRegCreditCard,
  FaPhone,
  FaEnvelope,
  FaRegSadTear,
} from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdOutlineDomainVerification } from "react-icons/md";

const MyBookings = () => {
  const { cooks, backendUrl, token, getCooksData, currencySymbol } =
    useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all', 'active', 'cancelled'
  const [confirmCancel, setConfirmCancel] = useState(null);
  const navigate = useNavigate();

  const getUserBookings = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(backendUrl + "/api/user/bookings", {
        headers: { token },
      });
      if (data.success) {
        setBookings(data.bookings.reverse());
        console.log(data.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error(error.response?.data?.message || "Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  };

  const checkBookingStatus = async (bookingId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/confirm-booking",
        { bookingId },
        { headers: { token } }
      );
      
      if (data.success) {
        // If the status has changed, refresh bookings
        getUserBookings();
        return data.isConfirmed;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      console.error("Error checking booking status:", error);
      toast.error(error.response?.data?.message || "Failed to check booking status");
      return false;
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      // First check if the booking is confirmed before canceling
      const isConfirmed = await checkBookingStatus(bookingId);
      
      if (isConfirmed) {
        toast.error("This booking has been confirmed and cannot be cancelled");
        setConfirmCancel(null);
        return;
      }
      
      setIsLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-booking",
        { bookingId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Booking cancelled successfully!");
        setConfirmCancel(null);
        getUserBookings();
        getCooksData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    } finally {
      setIsLoading(false);
    }
  };

  const initpay = (order) => {
    const options = {
      key_id: import.meta.env.RAZORPAY_TEST_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Booking Payment",
      description: "Booking Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-razorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            console.log(data.success);
            toast.success("Payment successful!");
            getUserBookings();
            navigate("/myBookings");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          toast.error(
            error.response?.data?.message || "Failed to process payment"
          );
        }
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const bookingRazorPay = async (bookingId) => {
    try {
      // First check if the booking is confirmed
      const isConfirmed = await checkBookingStatus(bookingId);
      
      if (!isConfirmed) {
        toast.warning("This booking is pending confirmation");
      }
      
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { bookingId },
        { headers: { token } }
      );

      if (data.success) {
        initpay(data.order);
        console.log(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error(error.response?.data?.message || "Failed to initiate payment");
    }
  };

  useEffect(() => {
    if (token) {
      getUserBookings();
    } else {
      navigate("/login");
    }
  }, [token]);

  // Filter bookings based on selected filter
  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    if (filter === "cancelled") return booking.cancelled;
    if (filter === "completed") return booking.isCompleted;
    return true;
  });

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
            <p className="text-gray-500 mt-2">
              Manage your upcoming and past cooking sessions
            </p>
          </div>

          {/* Filter buttons */}
          <div className="flex items-center space-x-2 mt-4 md:mt-0 p-1 bg-white rounded-lg shadow-sm border border-gray-100">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === "all"
                  ? "bg-orange-50 text-primary"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
         
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === "cancelled"
                  ? "bg-orange-50 text-primary"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setFilter("cancelled")}
            >
              Cancelled
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === "completed"
                  ? "bg-orange-50 text-primary"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <BiLoaderAlt className="animate-spin text-4xl text-primary" />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredBookings.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <div className="flex justify-center mb-4">
              <FaRegSadTear className="text-5xl text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === "all"
                ? "You haven't made any bookings yet."
                : filter === "cancelled"
                ? "You don't have any cancelled bookings."
                : filter === "completed"
                ? "You don't have any completed bookings."
                : "You don't have any active bookings."}
            </p>
            <button
              onClick={() => navigate("/cooks")}
              className="px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-orange-600 transition-colors shadow-sm"
            >
              Browse Available Cooks
            </button>
          </div>
        )}

        {/* Bookings list */}
        {!isLoading && filteredBookings.length > 0 && (
          <div className="space-y-6">
            {filteredBookings.map((booking, index) => (
              <div
                key={booking._id || index}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="md:flex">
                  {/* Cook Image */}
                  <div className="md:w-1/4 h-48 md:h-auto relative">
                    <img
                      src={booking.cookData?.image}
                      alt={booking.cookData?.name || "Cook"}
                      className="w-80 h-90"
                    />
                    {booking.cancelled && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                          Cancelled
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Booking Details */}
                  <div className="p-6 md:w-3/4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          <h2 className="text-xl font-bold text-gray-800">
                            {booking.cookData?.name}
                          </h2>
                         
                        </div>
                        <p className="text-gray-600 mb-4">
                          {booking.cookData?.speciality}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-start">
                            <FaMapMarkerAlt className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Address:
                              </p>
                              <p className="text-sm text-gray-600">
                                {booking.cookData?.address?.line1}
                              </p>
                              <p className="text-sm text-gray-600">
                                {booking.cookData?.address?.line2}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center">
                              <FaCalendarAlt className="h-4 w-4 text-primary mr-2" />
                              <span className="text-sm text-gray-700">
                                {(booking.bookingDate)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <FaClock className="h-4 w-4 text-primary mr-2" />
                              <span className="text-sm text-gray-700">
                                {booking.bookingTime}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <FaPhone className="h-4 w-4 text-primary mr-2" />
                              <span className="text-sm text-gray-700">
                                {booking.cookData?.phone || "Not provided"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price and Status */}
                      <div className="flex flex-col items-end">
                        <div className="text-right mb-4">
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="text-xl font-bold text-gray-800">
                            {currencySymbol} {booking.cookData?.fees || "N/A"}
                          </p>
                          <p className="text-xs text-gray-500">per hour</p>
                        </div>
                      </div>
                    </div>

                    {/* Status and Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-6 justify-between items-center">
                      {/* Status label */}
                      <div>
                        {booking.cancelled ? (
                          <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                            Cancelled
                          </span>
                        ) : booking.isCompleted ? (
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                            Completed
                          </span>
                        ) : booking.payment ? (
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                            Paid
                          </span>
                        ) : booking.isconfirmed ? (
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                            Confirmed
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                            Pending
                          </span>
                        )}
                      </div>

                      {/* Action buttons - Only show if not cancelled and not confirmed */}
                      {!booking.cancelled && !booking.isconfirmed && (
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => bookingRazorPay(booking._id)}
                            className="px-5 py-2 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 transition-colors duration-200 flex items-center"
                          >
                            <FaRegCreditCard className="h-4 w-4 mr-2" />
                            Pay Online
                          </button>
                          <button
                            onClick={() => setConfirmCancel(booking._id)}
                            className="px-5 py-2 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors duration-200 flex items-center"
                          >
                            <FaTimes className="h-3 w-3 mr-2" />
                            Cancel Booking
                          </button>
                        </div>
                      )}

                      {/* Only show Pay button if confirmed but not paid and not completed */}
                      {!booking.cancelled && booking.isconfirmed && !booking.payment && !booking.isCompleted && (
                        <button
                          onClick={() => bookingRazorPay(booking._id)}
                          className="px-5 py-2 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 transition-colors duration-200 flex items-center"
                        >
                          <FaRegCreditCard className="h-4 w-4 mr-2" />
                          Pay Online
                        </button>
                      )}
                    </div>

                    {/* Contact cook button for all non-cancelled and non-completed bookings */}
                    {!booking.cancelled && !booking.isCompleted && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <button
                          className="text-sm text-orange-500 hover:text-orange-600 transition-colors flex items-center"
                          onClick={() =>
                            (window.location.href = `mailto:${
                              booking.cookData?.email || ""
                            }`)
                          }
                        >
                          <FaEnvelope className="h-3 w-3 mr-1" />
                          Contact Cook
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination or load more button (if needed) */}
        {!isLoading &&
          filteredBookings.length > 0 &&
          filteredBookings.length % 5 === 0 && (
            <div className="mt-8 text-center">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors">
                Load More
              </button>
            </div>
          )}

        {/* Browse more cooks link */}
        {!isLoading && filteredBookings.length > 0 && (
          <div className="text-center mt-10">
            <p className="text-gray-500">
              Looking for more cooks?{" "}
              <button
                onClick={() => navigate("/cooks")}
                className="text-orange-500 hover:underline font-medium"
              >
                Browse available cooks
              </button>
            </p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md animate-fadeIn">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Cancel Booking
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmCancel(null)}
                className="px-5 py-2 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={() => cancelBooking(confirmCancel)}
                className="px-5 py-2 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition-colors"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
