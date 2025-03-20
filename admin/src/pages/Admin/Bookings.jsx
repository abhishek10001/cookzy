import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import cancel_icon from "../../assets/assets_admin/cancel_icon.svg";

const Bookings = () => {
  const { aToken, bookings, getAllBookings,cancelBookings } = useContext(AdminContext);

  console.log(bookings);

  useEffect(() => {
    if (aToken) {
      getAllBookings();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mv-3 text-lg font-medium">ALL BOOKINGS</p>
      <div className="bg-white border border-gray-600 max-h-[80vh] min-h-[60vh] text-sm overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_3fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6">
          <p>S.No.</p>
          <p>Client Name</p>
          {/* <p>Age</p> */}
          <p>Date & Time</p>
          <p>Cook Name</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {/* Add conditional check before mapping */}
        {bookings && bookings.length > 0 ? (
          bookings.map((item, index) => (
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
              {/* <p>{item.userData?.age || "N/A"}</p> */}
              <p>
                {item.bookingDate || "N/A"} --- {item.bookingTime || "N/A"}
              </p>
              <p className="flex gap-0.5">
                <img
                  src={item.cookData.image}
                  className="h-10 w-10 rounded-full"
                  alt=""
                />
                {item.cookData?.name || "N/A"}{" "}
              </p>
              <p>Rs {item.amount || "N/A"}</p>
              {item.cancelled ? (
                <p className="text-red-600 text-sm font-medium">Cancelled</p>
              ) : (
                <img onClick={()=>cancelBookings(item._id)} src={cancel_icon} alt="" />
              )}
            </div>
          ))
        ) : (
          <div className="py-4 text-center">No bookings found</div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
