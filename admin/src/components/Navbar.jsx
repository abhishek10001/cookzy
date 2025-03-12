// import React, { useContext } from 'react'
// import { assets } from '../assets/assets_admin/assets.js';
// import { AdminContext } from '../context/AdminContext';

// const Navbar = () => {
//     const {aToken} = useContext(AdminContext)
//   return (
//     <div>
//         <div>
//             <img src={assets.admin_logo} alt="" />
//             <p>{aToken ? 'Admin' :'Cook'}</p>
//         </div>
//         <button>LogOut</button>
//     </div>
//   )
// }

// export default Navbar;
import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets.js";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from context
    navigate("/");
    setAToken(null);
    // Clear from localStorage if you're using it
    localStorage.removeItem("aToken");
  };

  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <img src={assets.admin_logo} alt="Admin Logo" className="h-10 w-auto" />
        <div className="flex flex-col">
          <p className="font-bold text-lg text-gray-800">Admin Dashboard</p>
          <div className="border border-primary w-14 text-center p-0.5 rounded-full">
            <p className="text-sm text-primary mb-0.5">
              {aToken ? "Admin" : "Cook Management"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-gray-600 hover:text-primary transition-colors">Dashboard</a>
          <a href="#" className="text-gray-600 hover:text-primary transition-colors">Orders</a>
          <a href="#" className="text-gray-600 hover:text-primary transition-colors">Users</a>
          <a href="#" className="text-gray-600 hover:text-primary transition-colors">Settings</a>
        </div> */}

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-primary font-medium">
                {aToken ? "A" : "C"}
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
