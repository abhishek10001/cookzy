import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/AdminContext.jsx";
import CookContextProvider from "./context/CookContext.jsx";
import AppContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <CookContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </CookContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);
