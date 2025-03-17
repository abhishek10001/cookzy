
import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const {token ,setToken,userData}=useContext(AppContext);

  const logout =()=>{
    setToken(false);
    localStorage.removeItem('token');
    navigate('/');

  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-md relative">
      {/* Logo */}
      <img
        onClick={() => {
          navigate("/");
          scrollTo(0, 0);
        }}
        className="w-16 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-5 font-medium text-gray-700 absolute left-1/2 transform -translate-x-1/2">
      <NavLink
            
            to={'/'}
            className={({ isActive }) =>
              isActive ? "text-orange-600" : "hover:text-orange-500"
            }
          >
            <li>Home</li>
          </NavLink>
      <NavLink
            
            to={'/cooks'}
            className={({ isActive }) =>
              isActive ? "text-orange-600" : "hover:text-orange-500"
            }
          >
            <li>All Cooks</li>
          </NavLink>
      <NavLink
            
            to={'/about'}
            className={({ isActive }) =>
              isActive ? "text-orange-600" : "hover:text-orange-500"
            }
          >
            <li>About</li>
          </NavLink>
      <NavLink
            
            to={'/contact'}
            className={({ isActive }) =>
              isActive ? "text-orange-600" : "hover:text-orange-500"
            }
          >
            <li>Contact</li>
          </NavLink>
        
      </ul>

      {/* User Section */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="relative cursor-pointer group">
            <img
              className="w-8 h-8 rounded-full"
              src={userData.image}
              alt="Profile"
            />
            <img className="w-2.5 h-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md py-2 hidden group-hover:block">
              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                My Profile
              </p>
              <p
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/myBookings")}
              >
                My Bookings
              </p>
              <p
                className="px-4 py-2 hover:bg-red-100 cursor-pointer text-red-500"
                onClick={logout}
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            className="bg-primary text-white px-8 py-3 rounded-full hidden md:block"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden text-2xl cursor-pointer">
        <HiMenu onClick={() => setShowMenu(true)} />
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="bg-white w-3/4 h-full p-6 shadow-lg relative flex flex-col">
            <IoMdClose
              className="text-3xl absolute top-4 right-4 cursor-pointer"
              onClick={() => setShowMenu(false)}
            />
            <img className="w-20 mb-6" src={assets.logo} alt="Logo" />
            <ul className="flex flex-col gap-5 text-lg font-medium">
              <NavLink to='/'
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : "hover:text-orange-500"
                }
                onClick={() => setShowMenu(false)}
              >
                Home
              </NavLink>
              <NavLink to='/cooks'
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : "hover:text-orange-500"
                }
                onClick={() => setShowMenu(false)}
              >
                All Cooks
              </NavLink>
              <NavLink to='/contact'
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : "hover:text-orange-500"
                }
                onClick={() => setShowMenu(false)}
              >
                Contact Us
              </NavLink>
              <NavLink to='/about'
                className={({ isActive }) =>
                  isActive ? "text-orange-600" : "hover:text-orange-500"
                }
                onClick={() => setShowMenu(false)}
              >
                About Us
              </NavLink>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
