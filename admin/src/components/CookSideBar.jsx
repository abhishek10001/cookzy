import React, { useContext } from 'react';
import { assets } from '../assets/assets_admin/assets.js';
import { NavLink } from 'react-router-dom';
import { CookContext } from '../context/CookContext.jsx';
import { FaUser } from "react-icons/fa";

const CookSideBar = () => {
  const {cToken}=useContext(CookContext);


  return (
    <div className='h-full bg-white border-r mt-6 rounded-md'>
      {
        cToken  && <ul className='text-gray-600 mt-5 '>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/cook-dashboard'}>
            <img src={assets.home_icon} alt="" />
            <p className='hidden md:block'>Cook DashBoard</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/cook-bookings'}>
            <img src={assets.appointment_icon} alt="" />
            <p className='hidden md:block'>Cook Booking</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/cook-profile'}>
            <FaUser/>
            <p className='hidden md:block'>Your Profile</p>
          </NavLink>
          
        </ul>
      }
    </div>
  )
}

export default CookSideBar;