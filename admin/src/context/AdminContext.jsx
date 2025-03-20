import { createContext, useState } from "react";

export const AdminContext = createContext();
import { toast } from "react-toastify";
import axios from "axios";


const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [cooks, setCooks] = useState([]);
  const[bookings, setBookings] = useState([]);
  const[dashData, setDashData] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllCooks = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/all-cooks", {
        headers: { aToken },
      });
      if (data.success) {
        setCooks(data.cooks);
        console.log(data.cooks);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (cookId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { cookId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllCooks();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllBookings = async (req, res) => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/bookings", {
        headers: { aToken }
      });
      if (data.success) {
        setBookings(data.bookings);
        // console.log(data.bookings);
        
      } else {
        res.json({ success: false, message: data.message });
      }
    } catch (error) {
      toast.error(error.message);
      res.json({ success: false, message: error.message });
    }
  };

  const cancelBookings = async (bookingId)=>{

    try {
      const {data} = await axios.post(backendUrl+'/api/admin/cancel-booking-admin',{bookingId},{headers:{aToken}});
      if(data.success){
        toast.success(data.message);
        getAllBookings(); 
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      
    }
  }
  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });
      
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const value = {
    aToken,
    setAToken,
    backendUrl,
    cooks,
    getAllCooks,
    changeAvailability,
    getAllBookings,bookings,
    cancelBookings,
    getDashData,
    dashData
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
