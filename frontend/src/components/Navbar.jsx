import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { FiUser, FiBookmark, FiLogOut, FiHome, FiUsers, FiInfo, FiMail } from "react-icons/fi";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  // Handle scrolling effect with smooth transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest(".profile-dropdown")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItems = [
    { path: "/", label: "Home", icon: <FiHome /> },
    { path: "/cooks", label: "All Cooks", icon: <FiUsers /> },
    { path: "/about", label: "About", icon: <FiInfo /> },
    { path: "/contact", label: "Contact", icon: <FiMail /> },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 shadow-lg py-2 backdrop-blur-md"
          : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        {/* Logo with hover effect */}
        <div className="flex items-center">
          <img
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-16 md:w-20 cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-2"
            src={assets.logo}
            alt="Logo"
          />
        </div>

        {/* Desktop Menu with enhanced hover effects */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative py-2 transition-all duration-300 group ${
                  isActive
                    ? "text-orange-600 font-semibold"
                    : "hover:text-orange-500"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <li className="flex items-center gap-2">
                    <span className="text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.icon}
                    </span>
                    {item.label}
                  </li>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full transform origin-left scale-x-100 transition-transform duration-300"></span>
                  )}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </ul>

        {/* User Section with enhanced animations */}
        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="relative profile-dropdown">
              <div
                className="flex items-center gap-2 cursor-pointer group p-1 rounded-full hover:bg-gray-100 transition-all duration-300"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="relative">
                  <img
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover border-2 border-orange-400 transition-transform duration-300 group-hover:scale-110"
                    src={userData.image}
                    alt="Profile"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <img
                  className={`w-2.5 h-2.5 transition-transform duration-300 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                  src={assets.dropdown_icon}
                  alt="Dropdown"
                />
              </div>
              
              {showDropdown && (
                <div className="absolute top-12 right-0 bg-white shadow-xl rounded-lg py-2 min-w-48 border border-gray-100 z-50 animate-fadeIn">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-center font-medium text-gray-900">{userData.name || "User"}</p>
                  </div>
                  <div 
                    className="px-4 py-3 hover:bg-gray-50 flex items-center gap-3 cursor-pointer group transition-all duration-300"
                    onClick={() => {
                      navigate("/profile");
                      setShowDropdown(false);
                    }}
                  >
                    <FiUser className="text-gray-500 group-hover:text-orange-500 text-lg transition-colors duration-300" />
                    <p className="group-hover:text-orange-500 transition-colors duration-300">My Profile</p>
                  </div>
                  <div 
                    className="px-4 py-3 hover:bg-gray-50 flex items-center gap-3 cursor-pointer group transition-all duration-300"
                    onClick={() => {
                      navigate("/myBookings");
                      setShowDropdown(false);
                    }}
                  >
                    <FiBookmark className="text-gray-500 group-hover:text-orange-500 text-lg transition-colors duration-300" />
                    <p className="group-hover:text-orange-500 transition-colors duration-300">My Bookings</p>
                  </div>
                  <div className="border-t border-gray-100 mt-1">
                    <div 
                      className="px-4 py-3 hover:bg-red-50 flex items-center gap-3 cursor-pointer group transition-all duration-300"
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                      }}
                    >
                      <FiLogOut className="text-red-500 text-lg" />
                      <p className="text-red-500">Logout</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-primary text-white px-6 py-2 md:px-8 md:py-3 rounded-full hidden md:flex items-center gap-2 hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105"
              onClick={() => navigate("/login")}
            >
              <FiUser className="text-lg" />
              <span>Sign In</span>
            </button>
          )}
          
          {/* Mobile Menu Icon with animation */}
          <div className="md:hidden text-2xl cursor-pointer">
            <HiMenu 
              onClick={() => setShowMenu(true)}
              className="text-gray-700 hover:text-orange-500 transition-all duration-300 hover:scale-110"
            />
          </div>
        </div>

        {/* Mobile Menu with enhanced animations */}
        {showMenu && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-fadeIn">
            <div className="bg-white w-3/4 h-full shadow-lg relative flex flex-col animate-slideInRight">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <img 
                  className="w-20 transition-transform duration-300 hover:scale-105" 
                  src={assets.logo} 
                  alt="Logo" 
                />
                <IoMdClose
                  className="text-3xl cursor-pointer text-gray-500 hover:text-red-500 transition-all duration-300 hover:rotate-90"
                  onClick={() => setShowMenu(false)}
                />
              </div>
              
              {token && userData && (
                <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                  <img
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-400 transition-transform duration-300 hover:scale-110"
                    src={userData.image}
                    alt="Profile"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{userData.name || "User"}</p>
                    <p className="text-xs text-gray-500 truncate">{userData.email || ""}</p>
                  </div>
                </div>
              )}
              
              <div className="p-6 flex-1 overflow-y-auto">
                <ul className="flex flex-col gap-5 text-lg font-medium">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? "text-orange-600 bg-orange-50" 
                            : "text-gray-700 hover:text-orange-500 hover:bg-gray-50"
                        }`
                      }
                      onClick={() => setShowMenu(false)}
                    >
                      <span className="text-xl">{item.icon}</span>
                      {item.label}
                    </NavLink>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 border-t border-gray-100">
                {token && userData ? (
                  <button
                    className="w-full bg-red-50 text-red-500 px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-red-100 transition-all duration-300 hover:scale-105"
                    onClick={() => {
                      logout();
                      setShowMenu(false);
                    }}
                  >
                    <FiLogOut className="text-lg" />
                    <span>Logout</span>
                  </button>
                ) : (
                  <button
                    className="w-full bg-primary text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                    onClick={() => {
                      navigate("/login");
                      setShowMenu(false);
                    }}
                  >
                    <FiUser className="text-lg" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;