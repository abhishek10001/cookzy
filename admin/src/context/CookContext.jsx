import { createContext } from "react";

export const CookContext = createContext();

const CookContextProvider = (props) => {
  const value = {};

  return (
    <CookContext.Provider value={value}>{props.children}</CookContext.Provider>
  );
};

export default CookContextProvider;
