import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets.js";
import { AdminContext } from "../context/AdminContext";
import { CookContext } from "../context/CookContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { cToken, setCToken } = useContext(CookContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Determine which type of token is active
      if (aToken) {
        // Admin logout
        localStorage.removeItem("aToken");
        setAToken(null);
        toast.success("Admin logged out successfully");
        navigate("/");
      } else if (cToken) {
        // Cook logout
        localStorage.removeItem("cToken");
        setCToken(null);
        toast.success("Cook logged out successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error during logout");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <img src={assets.admin_logo} alt="Admin Logo" className="h-10 w-auto" />
        <div className="flex flex-col">
          <p className="font-bold text-lg text-gray-800">Dashboard</p>
          <div className="border border-primary w-auto text-center py-1 rounded-full">
            <p className="text-sm text-primary mb-0.5">
              {aToken ? "Admin Portal" : cToken ? "Cook Portal" : "Portal"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-primary font-medium">
                {aToken ? "A" : cToken ? "C" : ""}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;