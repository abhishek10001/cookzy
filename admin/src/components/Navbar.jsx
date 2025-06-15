import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets.js";
import { AdminContext } from "../context/AdminContext";
import { CookContext } from "../context/CookContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaSignOutAlt, FaBell } from "react-icons/fa";

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
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-10"
    >
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-3"
      >
        <img src={assets.admin_logo} alt="Admin Logo" className="h-10 w-auto" />
        <div className="flex flex-col">
          <p className="font-bold text-lg text-gray-800">Dashboard</p>
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="border border-primary w-auto text-center py-1 rounded-full"
          >
            <p className="text-sm text-primary mb-0.5">
              {aToken ? "Admin Portal" : cToken ? "Cook Portal" : "Portal"}
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:block"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center">
              <span className="text-primary font-medium">
                {aToken ? "A" : cToken ? "C" : ""}
              </span>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2"
          >
            <FaSignOutAlt />
            <span>Log Out</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navbar;