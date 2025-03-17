
// // import React, { useState, useRef } from "react";

// // const BookingCard = ({ cookInfo }) => {
// //   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
// //   const [selectedTime, setSelectedTime] = useState("");
// //   const [guestCount, setGuestCount] = useState(2);
// //   const [isInstantBooking, setIsInstantBooking] = useState(false);
// //   const timeSlotRef = useRef(null);

// //   // Generate all time slots
// //   const allTimeSlots = [
// //     "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
// //     "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
// //     "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
// //     "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"
// //   ];

// //   // Function to get the dates from the current date to the end of the month
// //   const getDatesForMonth = () => {
// //     const today = new Date();
// //     const currentMonth = today.getMonth();
// //     const currentYear = today.getFullYear();
// //     const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
// //     const dates = [];

// //     for (let i = today.getDate(); i <= lastDayOfMonth; i++) {
// //       const date = new Date(currentYear, currentMonth, i);
// //       dates.push(date);
// //     }
// //     return dates;
// //   };

// //   // Get available slots based on the selected date
// //   const getAvailableSlots = () => {
// //     if (!selectedDate) return [];

// //     const today = new Date();
// //     const selected = new Date(selectedDate);

// //     // If the selected date is today, filter slots based on current time + 1 hour buffer
// //     if (
// //       selected.getDate() === today.getDate() &&
// //       selected.getMonth() === today.getMonth() &&
// //       selected.getFullYear() === today.getFullYear()
// //     ) {
// //       const currentHour = today.getHours();
// //       const currentMinute = today.getMinutes();
// //       const currentTimeInMinutes = currentHour * 60 + currentMinute;

// //       return allTimeSlots.filter((slot) => {
// //         const [hour, minutePart] = slot.split(":");
// //         const minutes = parseInt(minutePart.slice(0, 2));
// //         const isPM = slot.includes("PM");
// //         const slotHourIn24 = isPM && hour !== "12" ? parseInt(hour) + 12 : parseInt(hour);
// //         const slotTimeInMinutes = slotHourIn24 * 60 + minutes;

// //         // Add a buffer of 1 hour (60 minutes)
// //         return slotTimeInMinutes > currentTimeInMinutes + 60;
// //       });
// //     }

// //     // For other dates, show all slots
// //     return allTimeSlots;
// //   };

// //   // Format date to yyyy-MM-dd for comparison
// //   const formatDate = (date) => {
// //     const year = date.getFullYear();
// //     const month = String(date.getMonth() + 1).padStart(2, '0');
// //     const day = String(date.getDate()).padStart(2, '0');
// //     return `${year}-${month}-${day}`;
// //   };

// //   // Handle booking submission
// //   const handleBooking = () => {
// //     if (!selectedDate || !selectedTime) {
// //       alert("Please select both date and time for your booking.");
// //       return;
// //     }

// //     const bookingType = isInstantBooking ? "Instant booking" : "Regular booking";
// //     alert(`${bookingType} confirmed with ${cookInfo.name} on ${selectedDate} at ${selectedTime} for ${guestCount} guests.`);
// //     // Navigate to confirmation page or show success modal
// //   };

// //   return (
// //     <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
// //       <h2 className="text-xl font-bold text-gray-800 mb-4">Book This Chef</h2>

// //       {/* Date Picker */}
// //       <div className="mb-4">
// //         <label className="block text-gray-700 text-sm font-medium mb-2">Select Date</label>
// //         <div className="flex overflow-x-auto">
// //           {getDatesForMonth().map((date) => {
// //             const formattedDate = formatDate(date);
// //             const isSelected = formattedDate === selectedDate;
// //             return (
// //               <button
// //                 key={formattedDate}
// //                 className={`mx-2 px-4 py-2 rounded-xl text-sm font-medium ${
// //                   isSelected
// //                     ? "bg-primary text-white"
// //                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// //                 }`}
// //                 onClick={() => setSelectedDate(formattedDate)}
// //               >
// //                 <div>{new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date)}</div>
// //                 <div>{new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)}</div>
// //               </button>
// //             );
// //           })}
// //         </div>
// //       </div>

// //       {/* Time Slots */}
// //       <div className="mb-4">
// //         <label className="block text-gray-700 text-sm font-medium mb-2">Select Time</label>
// //         <div ref={timeSlotRef} className="flex overflow-x-auto py-2 px-6 no-scrollbar">
// //           {getAvailableSlots().map((time) => (
// //             <button
// //               key={time}
// //               className={`flex-shrink-0 mx-1 px-3 py-2 rounded-lg text-sm font-medium min-w-[85px] ${
// //                 selectedTime === time ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// //               }`}
// //               onClick={() => setSelectedTime(time)}
// //             >
// //               {time}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Guest Count */}
// //       <div className="mb-6">
// //         <label className="block text-gray-700 text-sm font-medium mb-2">Number of Guests</label>
// //         <div className="flex items-center">
// //           <button
// //             className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
// //             onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
// //           >
// //             -
// //           </button>
// //           <span className="mx-4 text-xl font-medium w-6 text-center">{guestCount}</span>
// //           <button
// //             className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
// //             onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
// //           >
// //             +
// //           </button>
// //           {/* Book Button */}
// //       <button
// //         onClick={handleBooking}
// //         className="ml-12 px-10 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary transition-colors"
// //       >
// //         {isInstantBooking ? "Book Instantly" : "Book Now"}
// //       </button>
// //         </div>
// //       </div>

      
// //     </div>
// //   );
// // };

// // export default BookingCard;

// import React, { useState, useRef, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext.jsx";

// const BookingCard = ({ cookInfo }) => {
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
//   const [selectedTime, setSelectedTime] = useState("");
//   const [guestCount, setGuestCount] = useState(2);
//   const [isInstantBooking, setIsInstantBooking] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const timeSlotRef = useRef(null);
//   const navigate = useNavigate();
//   const { token, backendUrl } = useContext(AppContext);

//   // Generate all time slots
//   const allTimeSlots = [
//     "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM, " ,"10:00 AM " ,"10:30 AM","11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
//     "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
//     "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
//     "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM, " ,"10:00 PM " ,"10:30 PM","11:00 PM"
//   ];

//   // Function to get the dates from the current date to the end of the month
//   const getDatesForMonth = () => {
//     const today = new Date();
//     const currentMonth = today.getMonth();
//     const currentYear = today.getFullYear();
//     const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
//     const dates = [];

//     for (let i = today.getDate(); i <= lastDayOfMonth; i++) {
//       const date = new Date(currentYear, currentMonth, i);
//       dates.push(date);
//     }
//     return dates;
//   };

//   // Get available slots based on the selected date
//   const getAvailableSlots = () => {
//     if (!selectedDate || !cookInfo.slots_booked) return allTimeSlots;

//     const today = new Date();
//     const selected = new Date(selectedDate);
//     let availableSlots = [...allTimeSlots];

//     // Filter out booked slots for the selected date
//     if (cookInfo.slots_booked[selectedDate]) {
//       availableSlots = availableSlots.filter(
//         slot => !cookInfo.slots_booked[selectedDate].includes(slot)
//       );
//     }

//     // If the selected date is today, filter slots based on current time + 1 hour buffer
//     if (
//       selected.getDate() === today.getDate() &&
//       selected.getMonth() === today.getMonth() &&
//       selected.getFullYear() === today.getFullYear()
//     ) {
//       const currentHour = today.getHours();
//       const currentMinute = today.getMinutes();
//       const currentTimeInMinutes = currentHour * 60 + currentMinute;

//       return availableSlots.filter((slot) => {
//         const [hour, minutePart] = slot.split(":");
//         const minutes = parseInt(minutePart.slice(0, 2));
//         const isPM = slot.includes("PM");
//         const slotHourIn24 = isPM && hour !== "12" ? parseInt(hour) + 12 : parseInt(hour);
//         const slotTimeInMinutes = slotHourIn24 * 60 + minutes;

//         // Add a buffer of 1 hour (60 minutes)
//         return slotTimeInMinutes > currentTimeInMinutes + 60;
//       });
//     }

//     return availableSlots;
//   };

//   // Format date to yyyy-MM-dd for comparison
//   const formatDate = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   // Handle booking submission
//   const handleBooking = async () => {
//     if (!token) {
//       toast.warn("Login to Book a Cook");
//       return navigate("/login");
//     }

//     if (!selectedDate || !selectedTime) {
//       toast.error("Please select both date and time for your booking.");
//       return;
//     }

    
//   };

//   const availableSlots = getAvailableSlots();

//   return (
//     <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">Book This Chef</h2>

//       {/* Date Picker */}
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-medium mb-2">Select Date</label>
//         <div className="flex overflow-x-auto">
//           {getDatesForMonth().map((date) => {
//             const formattedDate = formatDate(date);
//             const isSelected = formattedDate === selectedDate;
//             return (
//               <button
//                 key={formattedDate}
//                 className={`mx-2 px-4 py-2 rounded-xl text-sm font-medium ${
//                   isSelected
//                     ? "bg-primary text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//                 onClick={() => {
//                   setSelectedDate(formattedDate);
//                   setSelectedTime(""); // Reset time selection when date changes
//                 }}
//               >
//                 <div>{new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date)}</div>
//                 <div>{new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date)}</div>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Time Slots */}
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-medium mb-2">Select Time</label>
//         <div ref={timeSlotRef} className="flex overflow-x-auto py-2 px-6 no-scrollbar">
//           {availableSlots.length > 0 ? (
//             availableSlots.map((time) => (
//               <button
//                 key={time}
//                 className={`flex-shrink-0 mx-1 px-3 py-2 rounded-lg text-sm font-medium min-w-[85px] ${
//                   selectedTime === time ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//                 onClick={() => setSelectedTime(time)}
//               >
//                 {time}
//               </button>
//             ))
//           ) : (
//             <p className="text-gray-500">No available slots for this date.</p>
//           )}
//         </div>
//       </div>

//       {/* Guest Count */}
//       <div className="mb-6">
//         <label className="block text-gray-700 text-sm font-medium mb-2">Number of Guests</label>
//         <div className="flex items-center">
//           <button
//             className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
//             onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
//             disabled={loading}
//           >
//             -
//           </button>
//           <span className="mx-4 text-xl font-medium w-6 text-center">{guestCount}</span>
//           <button
//             className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
//             onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
//             disabled={loading}
//           >
//             +
//           </button>
//         </div>
//       </div>

//       {/* Instant Booking Toggle */}
//       <div className="mb-6">
//         <label className="flex items-center cursor-pointer">
//           <input
//             type="checkbox"
//             className="form-checkbox h-5 w-5 text-primary"
//             checked={isInstantBooking}
//             onChange={() => setIsInstantBooking(!isInstantBooking)}
//             disabled={loading}
//           />
//           <span className="ml-2 text-gray-700">Instant Booking</span>
//         </label>
//         <p className="text-gray-500 text-xs mt-1">Get confirmed instantly without waiting for chef's approval</p>
//       </div>

//       {/* Book Button */}
//       <button
//         onClick={handleBooking}
//         disabled={loading || !selectedDate || !selectedTime}
//         className={`w-full px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary transition-colors ${
//           loading ? "opacity-70 cursor-not-allowed" : ""
//         }`}
//       >
//         {loading ? (
//           <span className="flex items-center justify-center">
//             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//             </svg>
//             Processing...
//           </span>
//         ) : (
//           `${isInstantBooking ? "Book Instantly" : "Book Now"}`
//         )}
//       </button>
//     </div>
//   );
// };

// export default BookingCard;
