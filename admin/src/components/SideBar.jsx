import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets_admin/assets.js';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  const {aToken}=useContext(AdminContext);

  return (
    <div className='h-full bg-white border-r mt-6 rounded-md'>
      {
        aToken && <ul className='text-gray-600 mt-5 '>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/admin-dashboard'}>
            <img src={assets.home_icon} alt="" />
            <p>DashBoard</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/all-bookings'}>
            <img src={assets.appointment_icon} alt="" />
            <p>Booking</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/add-cook'}>
            <img src={assets.add_icon} alt="" />
            <p>Add-Cook</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary':''}`} to={'/cook-list'}>
            <img src={assets.people_icon} alt="" />
            <p>Cooks List</p>
          </NavLink>
        </ul>
      }
    </div>
  )
}

export default SideBar