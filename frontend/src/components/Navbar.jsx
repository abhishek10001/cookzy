// import React, { useState } from "react";
// import { assets } from "../assets/assets_frontend/assets";
// import { NavLink, useNavigate } from "react-router-dom";
// import { HiMenu } from "react-icons/hi";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const [showMenue, setShowMenue] = useState(false);
//   const [token, setSToken] = useState(true);

//   return (
//     <nav className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-md">
//       {/* Logo */}
//       <img onClick={()=>{navigate('/'); scrollTo(0,0)}} className="w-16 cursor-pointer" src={assets.logo} alt="Logo" />

//       {/* Desktop Menu - Centered */}
//       <ul className="hidden md:flex items-center gap-5 font-medium text-gray-700 absolute left-1/2 transform -translate-x-1/2">
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             isActive ? "text-orange-600 " : "hover:text-orange-500 "
//           }
//         >
//           <li>Home</li>
//         </NavLink>
//         <NavLink
//           to="/cooks"
//           className={({ isActive }) =>
//             isActive ? "text-orange-600 " : "hover:text-orange-500"
//           }
//         >
//           <li>All Cooks</li>
//         </NavLink>
//         <NavLink
//           to="/about"
//           className={({ isActive }) =>
//             isActive ? "text-orange-600 " : "hover:text-orange-500"
//           }
//         >
//           <li>About</li>
//         </NavLink>
//         <NavLink
//           to="/contact"
//           className={({ isActive }) =>
//             isActive ? "text-orange-600 " : "hover:text-orange-500"
//           }
//         >
//           <li>Contact Us</li>
//         </NavLink>
//       </ul>

//       {/* Sign In Button - Extreme Right */}
//       <div className="flex items-center gap-4">
//         {token ? (
//           <div className="flex item-center gap-2 cursor-pointer group relative">
//             <img className="w-8 rounded-full" src={assets.profile_pic} />
//             <img className="w-2.5" src={assets.dropdown_icon} />
//             <div className="absolute top-0 right-0 pt-16 text-base font-medium text-gray-700 z-20 hidden group-hover:block">
//               <div className="flex flex-col min-w-48 bg-stone-100  gap-4 p-4">
//                 <p className="hover:text-primary cursor-pointer"  onClick={() => navigate("/profile")}>My Profile</p>
//                 <p className="hover:text-primary cursor-pointer" onClick={() => navigate("/myBookings")}>My Bookings</p>
//                 <p className="hover:text-primary cursor-primary"  onClick={() => setSToken(false)}>Logout</p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <button
//             className="bg-primary text-white px-8 py-3 rounded-full font light hidden md:block"
//             onClick={() => navigate("/login")}
//           >
//             {" "}
//             Sign In
//           </button>
//         )}
//       </div>

//       {/* Mobile Menu Icon */}
//       <div className="md:hidden text-2xl cursor-pointer">
//         <HiMenu onClick={()=>setShowMenue(true)} />
//       </div>
//       <div className={`${showMenue ? 'fixed w-full':'h-0 w-0'}md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
//       <div>
//         <img src={assets.logo-czy} alt="" />
//         <img src={assets.cross_icon} onClick={()=>setShowMenue(false)} alt="" />
//       </div>
//       <ul>
//         <NavLink>Home</NavLink>
//         <NavLink>All Cooks</NavLink>
//         <NavLink>About</NavLink>
//         <NavLink>Conatact</NavLink>
//       </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

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
        {["Home", "All Cooks", "About", "Contact"].map((item, index) => (
          <NavLink
            key={index}
            to={`/${item.toLowerCase().replace(" ", "")}`}
            className={({ isActive }) =>
              isActive ? "text-orange-600" : "hover:text-orange-500"
            }
          >
            <li>{item}</li>
          </NavLink>
        ))}
      </ul>

      {/* User Section */}
      <div className="flex items-center gap-4">
        {token ? (
          <div className="relative cursor-pointer group">
            <img
              className="w-8 rounded-full"
              src={assets.profile_pic}
              alt="Profile"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
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
                onClick={() => setToken(false)}
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
