// // Bookings.jsx
// import React, { useContext, useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext.jsx";
// import ChefHeader from "../components/ChefHeader";
// import MenuHighlights from "../components/MenuHighlights";
// import ReviewsSection from "../components/ReviewSection";
// import BookingCard from "../components/BookingCard";
// import RelatedCooks from "../components/RelatedCooks";
// import { toast } from "react-toastify";

// const Bookings = () => {
//   const { cookId } = useParams();
//   const navigate = useNavigate();
//   const { cooks, currencySymbol, backendUrl, token, getCooksData } =
//     useContext(AppContext);
//   const [cookInfo, setCookInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [relatedCooks, setRelatedCooks] = useState([]);

//   const fetchCookInfo = () => {
//     setLoading(true);
//     try {
//       const foundCook = cooks.find((cook) => cook._id === cookId);
//       if (foundCook) {
//         setCookInfo(foundCook);
//         // Find related cooks with the same specialty
//         const related = cooks
//           .filter(
//             (cook) =>
//               cook._id !== cookId && cook.speciality === foundCook.speciality
//           )
//           .slice(0, 5); // Limit to 3 related cooks
//         console.log(cookId);
//         setRelatedCooks(related);
//       } else {
//         console.error("Cook not found");
//       }
//     } catch (error) {
//       console.error("Error fetching cook info:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const bookAcook = async () => {
//   //   if (!token) {
//   //     toast.warn("Login to Book a Cook");
//   //     return navigate("/login");
//   //   }
//   // };

//   useEffect(() => {
//     if (cooks && cooks.length > 0 && cookId) {
//       fetchCookInfo();
//     }
//   }, [cooks, cookId]);

//   // Scroll to top when component mounts or when the cookId parameter changes
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [cookId]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   // Handle the case where cook info is not found
//   if (!cookInfo) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">
//           Chef Not Found
//         </h2>
//         <p className="text-gray-600 mb-6">
//           We couldn't find the chef you're looking for.
//         </p>
//         <button
//           onClick={() => navigate("/cooks")}
//           className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary transition-colors"
//         >
//           Browse All Chefs
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Chef Profile Header */}
//       <ChefHeader cookInfo={cookInfo} />

//       {/* Booking Section */}
//       <div className="grid md:grid-cols-3 gap-8">
//         {/* Menu Highlights and Reviews */}
//         <div className="md:col-span-2">
//           <MenuHighlights />
//           <ReviewsSection />

//           {/* Related Cooks Section */}
//           <RelatedCooks relatedCooks={relatedCooks} cookId={cookId} />
//         </div>

//         {/* Booking Card */}
//         <div className="md:col-span-1">
//           <BookingCard cookInfo={cookInfo} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Bookings;

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { MdVerified } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import RelatedCooks from "../components/RelatedCooks";
import MenuHighlights from "../components/MenuHighlights";
import { toast } from "react-toastify";
import axios from "axios";

const Bookings = () => {
  const { cookId } = useParams();
  const navigate = useNavigate(); 
  const { cooks, currencySymbol, backendUrl, token, getCooksData } =
    useContext(AppContext);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [cookInfo, setCookInfo] = useState(null);
  const [cookSlot, setCookSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [bookingTime, setBookingTime] = useState("");

  const fetchCookInfo = async () => {
    const cookInfo = cooks.find((cook) => cook._id === cookId);
    setCookInfo(cookInfo);
    console.log(cookInfo);
  };

  // Helper function to add/subtract minutes from a time string
  const getAdjacentTimeSlot = (timeStr, minutesToAdd) => {
    const [hours, minutes] = timeStr.match(/(\d+):(\d+)/).slice(1).map(Number);
    const period = timeStr.includes('PM') ? 'PM' : 'AM';
    
    // Convert to Date object for easy manipulation
    const date = new Date();
    date.setHours(period === 'PM' && hours !== 12 ? hours + 12 : hours);
    date.setMinutes(minutes);
    
    // Add/subtract minutes
    date.setMinutes(date.getMinutes() + minutesToAdd);
    
    // Format back to string
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAvailableSlots = async () => {
    setCookSlot([]);
    const today = new Date();

    for (let index = 0; index < 30; index++) {
      let currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + index);
      let endTime = new Date();
      endTime.setDate(today.getDate() + index);
      endTime.setHours(23, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 9 ? currentDate.getHours() + 1 : 9
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(9);
        currentDate.setMinutes(0);
      }
      let timeslots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const bookedDate = day + "-" + month + "-" + year;
        const bookedTime = formattedTime;

        // Check if the current slot is booked
        const isCurrentSlotBooked = 
          cookInfo.slots_booked[bookedDate] &&
          cookInfo.slots_booked[bookedDate].includes(bookedTime);

        // Check if the previous slot is booked (30 minutes before)
        const prevTime = getAdjacentTimeSlot(bookedTime, -30);
        const isPrevSlotBooked = 
          cookInfo.slots_booked[bookedDate] &&
          cookInfo.slots_booked[bookedDate].includes(prevTime);

        // Check if the next slot is booked (30 minutes after)
        const nextTime = getAdjacentTimeSlot(bookedTime, 30);
        const isNextSlotBooked = 
          cookInfo.slots_booked[bookedDate] &&
          cookInfo.slots_booked[bookedDate].includes(nextTime);

        // Slot is available if current, previous, and next slots are not booked
        const isSlotAvailable = !isCurrentSlotBooked && !isPrevSlotBooked && !isNextSlotBooked;

        if (isSlotAvailable) {
          timeslots.push({
            datTime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setCookSlot((prev) => [...prev, timeslots]);
    }
  };

  const bookACook = async () => {
    if (!token) {
      toast.warn("Login to Book a Cook");
      return navigate("/login");
    }

    // Check if a booking time has been selected
    if (!bookingTime) {
      toast.warn("Please select a booking time");
      return;
    }

    try {
      const date = cookSlot[slotIndex][0].datTime;
      console.log(date);

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const bookingDate = day + "-" + month + "-" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-cook",
        { cookId, bookingDate, bookingTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getCooksData();
        console.log("Cook Booked Successfully");
        navigate("/mybookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error booking cook:", error);
      toast.error(error.response?.data?.message || "Failed to book cook");
    }
  };

  useEffect(() => {
    fetchCookInfo();
  }, [cooks, cookId]);

  useEffect(() => {
    if (cookInfo) {
      getAvailableSlots();
    }
  }, [cookInfo]);

  useEffect(() => {
    console.log(cookSlot);
  }, [cookSlot]);

  return (
    cookInfo && (
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={cookInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              Cook {cookInfo.name}
              <MdVerified className="text-green-400" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>{cookInfo.speciality}</p>
              <button className="py-0.5 border text-xs rounded-full px-1">
                {cookInfo.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About
                <IoMdInformationCircleOutline className="text-gray-500" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {cookInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Booking Fee:
              <span className="text-primary">
                {currencySymbol}
                {cookInfo.fees}
              </span>
            </p>
          </div>
        </div>
        <MenuHighlights />
        <div className="sm:pl-4 mt-4 font-medium text-gray-700">
          <p className="m-2 text-center font-bold text-xl">Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll">
            {cookSlot.length > 0 &&
              cookSlot.map((item, index) => (
                item.length > 0 && (
                  <div
                    onClick={() => setSlotIndex(index)}
                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                      slotIndex === index
                        ? "bg-primary text-white"
                        : "border border-gray"
                    }`}
                    key={index}
                  >
                    <p>{item[0] && daysOfWeek[item[0].datTime.getDay()]}</p>
                    <p>{item[0] && item[0].datTime.getDate()}</p>
                  </div>
                )
              ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {cookSlot.length > 0 && cookSlot[slotIndex] && cookSlot[slotIndex].length > 0 ?
              cookSlot[slotIndex].map((item, index) => (
                <p
                  onClick={() => setBookingTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-3 rounded-full cursor-pointer  ${
                    item.time === bookingTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              )) : (
                <p className="text-sm text-gray-500">No available slots for this day</p>
              )}
          </div>
          <button
            onClick={bookACook}
            className="bg-primary rounded-full px-5 py-3 mt-3 text-white"
          >
            Book Now
          </button>
        </div>
        <RelatedCooks />
      </div>
    )
  );
};

export default Bookings;