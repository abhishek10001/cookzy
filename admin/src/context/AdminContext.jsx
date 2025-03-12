import { createContext, useState } from "react";

export const AdminContext = createContext();
import { toast } from "react-toastify";
import axios from "axios";

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [cooks, setCooks] = useState([]);

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

  const value = {
    aToken,
    setAToken,
    backendUrl,
    cooks,
    getAllCooks,
    changeAvailability,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
