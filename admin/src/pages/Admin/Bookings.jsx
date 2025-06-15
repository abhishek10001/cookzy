import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import cancel_icon from "../../assets/assets_admin/cancel_icon.svg";
import { CookContext } from "../../context/CookContext";

const Bookings = () => {
  const { aToken, bookings, getAllBookings } =
    useContext(AdminContext);
  const {
    completeBooking,
    cancelBooking,
    confirmBooking,

    
  } = useContext(CookContext);

  useEffect(() => {
    if (aToken) {
      getAllBookings();
    }
  }, [aToken]);

  const getBookingStatus = (booking) => {
    if (booking.cancelled) {
      return {
        class: "text-red-600",
        text: "Cancelled",
      };
    }

    if (booking.isCompleted) {
      return {
        class: "text-green-600",
        text: "Completed",
      };
    }

    if (booking.isconfirmed) {
      return {
        class: "text-yellow-600",
        text: "Confirmed",
      };
    }

    return {
      class: "text-orange-600",
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

  const renderActionButtons = (item) => {
    // If booking is cancelled or completed, show N/A
    if (item.cancelled || item.isCompleted) {
      return <p className="text-gray-400">N/A</p>;
    }

    // If booking is confirmed, show Done button
    if (item.isconfirmed) {
      return (
        <button
        onClick={completeBooking(item._id)}
          className="bg-green-500 text-white px-2 py-1 rounded text-xs"
          disabled
        >
          Done
        </button>
      );
    }

    // If not cancelled and not confirmed, show Confirm and Cancel buttons
    return (
      <div className="flex gap-2">
        <button
          onClick={() => handleConfirmBooking(item._id)}
          className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
        >
          Confirm
        </button>
        <button
          onClick={() => handleCancelBooking(item._id)}
          className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mv-3 text-lg font-medium">ALL BOOKINGS</p>
      <div className="bg-white border border-gray-600 max-h-[80vh] min-h-[60vh] text-sm overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_3fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6">
          <p>S.No.</p>
          <p>Client Name</p>
          <p>Date & Time</p>
          <p>Cook Name</p>
          <p>Fee</p>
          <p>Status</p>
          {/* <p>Action</p> */}
        </div>

        {bookings && bookings.length > 0 ? (
          bookings.map((item, index) => {
            const status = getBookingStatus(item);

            return (
              <div
                key={index}
                className="flex flex-wrap max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_3fr_3fr_3fr_1fr_1fr] py-3 px-6 border-t border-gray-300 item-center text-gray-500 hover:bg-orange-100"
              >
                <p>{index + 1}</p>
                <div className="flex items-center gap-2">
                  {item.userData && item.userData.image && (
                    <img
                      src={item.userData.image}
                      alt="User"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <p>{item.userData?.name || "N/A"}</p>
                </div>
                <p>
                  {item.bookingDate || "N/A"} --- {item.bookingTime || "N/A"}
                </p>
                <p className="flex items-center gap-0.5">
                  <img
                    src={item.cookData.image}
                    className="h-10 w-10 rounded-full mr-2"
                    alt=""
                  />
                  {item.cookData?.name || "N/A"}{" "}
                </p>
                <p>Rs {item.amount || "N/A"}</p>

                {/* Status Column */}
                <p className={`text-sm font-medium ${status.class}`}>
                  {status.text}
                </p>

                {/* Action Column */}
                {/* <div className="flex items-center justify-center">
                  {renderActionButtons(item)}
                </div> */}
              </div>
            );
          })
        ) : (
          <div className="py-4 text-center">No bookings found</div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
