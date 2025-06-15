import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets_admin/assets.js';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaCalendarAlt, FaUserPlus, FaUsers, FaChevronRight } from 'react-icons/fa';

const SideBar = () => {
  const { aToken } = useContext(AdminContext);

  const menuItems = [
    { path: '/admin-dashboard', icon: <FaHome />, text: 'Dashboard' },
    { path: '/all-bookings', icon: <FaCalendarAlt />, text: 'Bookings' },
    { path: '/add-cook', icon: <FaUserPlus />, text: 'Add Cook' },
    { path: '/cook-list', icon: <FaUsers />, text: 'Cooks List' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className='h-full bg-white border-r mt-6 rounded-lg shadow-sm'
    >
      {aToken && (
        <ul className='text-gray-600 mt-5 space-y-2 p-2'>
          {menuItems.map((item, index) => (
            <motion.li
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <NavLink 
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300
                  ${isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'hover:bg-gray-50 text-gray-600'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <span className="text-lg">{item.icon}</span>
                    <span className='hidden md:block flex-1'>{item.text}</span>
                    <FaChevronRight className={`hidden md:block text-xs transition-transform duration-300 ${
                      isActive ? 'rotate-90' : ''
                    }`} />
                  </>
                )}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}

export default SideBar