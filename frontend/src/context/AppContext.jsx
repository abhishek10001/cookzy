import { createContext, useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // Extract the cooks array from the object

  const [cooks, setCooks] = useState([]);

  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    cooks,
    currencySymbol,
    // Add any other necessary context values here
  };
console.log(backendUrl);
  const getCooksData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/cook/list');
      console.log(data);
      if (data.success) {
        setCooks(data.cooks);
        console.log(data.cooks);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCooksData();
  }, []);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
