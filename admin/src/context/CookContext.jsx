import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const CookContext = createContext();

const CookContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [cToken,setCToken] = useState(localStorage.getItem('cToken')?localStorage.getItem('cToken'):'');
  const [bookings, setBookings] = useState([]);
  const [dashData, setDashData] = useState(false);

  const [profileData, setProfileData] = useState(false);
  const getBookings = async() => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/cook/bookings`, {
        headers: { cToken }
      });
      if (data.success) {
        setBookings(data.bookings.reverse());
        console.log(data.bookings.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to get bookings");
    }
  }

  const completeBooking = async (bookingId) => {
 try {
   const { data } = await axios.post(backendUrl+'/api/cook/booking-completed', {bookingId}, {
       headers: { cToken }
     });
   if (data.success) {
     toast.success("Booking marked completed successfully");
     getBookings();
   } else {
     toast.error(data.message);
   }
  
 } catch (error) {
   console.error("Error completing booking:", error);
   toast.error(error.response?.data?.message || "Failed to complete booking");
 }
  }
  const cancelBooking = async (bookingId) => {
 try {
   const { data } = await axios.post(backendUrl+'/api/cook/booking-cancelled', {bookingId}, {
       headers: { cToken }
     });
   if (data.success) {
     toast.success("Booking marked cancelled");
     getBookings();
   } else {
     toast.error(data.message);
   }
  
 } catch (error) {
   console.error("Error canceling booking:", error);
   toast.error(error.response?.data?.message || "Failed to cancel booking");
 }
  }
  const confirmBooking = async (bookingId) => {
 try {
   const { data } = await axios.post(backendUrl+'/api/cook/booking-confirmed', {bookingId}, {
       headers: { cToken }
     });
   if (data.success) {
     toast.success("Booking marked confirm");
     getBookings();
   } else {
     toast.error(data.message);
   }
  
 } catch (error) {
   console.error("Error confirming booking:", error);
   toast.error(error.response?.data?.message || "Failed to confirm booking");
 }
  }

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl+'/api/cook/cook-dashboard', {
        headers: { cToken }
      });
      console.log(data);
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to get dashboard data");
    }
  }

const getProfileData = async ()=>{
  try {
    const { data } = await axios.get(backendUrl+'/api/cook/cook-profile', {
      headers: { cToken }
    });
    if (data.success) {
      setProfileData(data.profileData);
      console.log(data.profileData);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
    toast.error("Failed to get profile data");
  }
 
}

  const value = {
    cToken,
    setCToken,
    backendUrl,
    bookings,
    getBookings,
    completeBooking,
    cancelBooking,
    confirmBooking,
    getDashData,
    dashData,
    setDashData,
    getProfileData,
    profileData,
    setProfileData,
  
  };

  return (
    <CookContext.Provider value={value}>{props.children}</CookContext.Provider>
  );
};

export default CookContextProvider;
