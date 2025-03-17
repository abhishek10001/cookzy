import { createContext, useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // Extract the cooks array from the object

  const [cooks, setCooks] = useState([]);
  const [token , setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false); //ensure that when page relods we dont get back to the logn page.
const [userData, setUserData] =useState(false);
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  
  
  const getCooksData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/cook/list");
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

const loadUserProfileData =async ()=>{
try {
  const {data} = await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}});
  if (data.success) {
    setUserData(data.userData);
  }else{
    toast.error(data.message);
  }
} catch (error) {
  console.log(error);
  toast.error(error.message);
}
}

  const value = {
    cooks,getCooksData,
    currencySymbol,
    token,setToken,
    backendUrl,
    userData,setUserData,
    loadUserProfileData
    // Add any other necessary context values here
  };

  useEffect(() => {
    getCooksData();
  }, []);
  useEffect(() => {
    if(token){
      loadUserProfileData();
    }else{
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
