import { createContext } from "react";
import assetsData from "../assets/assets_frontend/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // Extract the cooks array from the object
  const cooksList = assetsData.cooks;
  
  console.log("Cooks in context:", cooksList);
  console.log("Type of cooks:", typeof cooksList);
  console.log("Is array:", Array.isArray(cooksList));

  const currencySymbol ='₹'
  
  const value = {
    cooks: cooksList,
    currencySymbol: currencySymbol,
    // Add any other necessary context values here
  };

  return (<AppContext.Provider value={value}>{props.children}</AppContext.Provider>);
};

export default AppContextProvider;