import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn, MdDirections } from 'react-icons/md';
import { FiClock } from 'react-icons/fi';
import { IoIosSend } from 'react-icons/io';
import { BiChevronRight } from 'react-icons/bi';

import logo from '../assets/assets_frontend/logo-czy.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-gray-50 pt-16 pb-8 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-orange-100 -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-orange-100 translate-x-1/3 translate-y-1/3 opacity-60"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <img src={logo} alt="CookZy" className="h-14" />
            </div>
            <p className="text-gray-600 mb-6 text-md leading-relaxed">
              Connecting food enthusiasts with professional home cooks for unique dining experiences tailored to your taste.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white shadow-sm text-[#FF5200] hover:bg-[#FF5200] hover:text-white transition-all duration-300 p-2 rounded-full">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="bg-white shadow-sm text-[#FF5200] hover:bg-[#FF5200] hover:text-white transition-all duration-300 p-2 rounded-full">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="bg-white shadow-sm text-[#FF5200] hover:bg-[#FF5200] hover:text-white transition-all duration-300 p-2 rounded-full">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="bg-white shadow-sm text-[#FF5200] hover:bg-[#FF5200] hover:text-white transition-all duration-300 p-2 rounded-full">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#FF5200] rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Our Cooks", "Services", "Book a Cook", "Become a Cook"].map((item, index) => (
                <li key={index} className="text-md transition-transform hover:translate-x-1 ">
                  <a href="#" className="text-gray-600 hover:text-[#FF5200] transition-colors flex items-center text-md">
                    <BiChevronRight className="text-[#FF5200]" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#FF5200] rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="bg-white shadow-sm p-2 rounded-full text-[#FF5200] group-hover:bg-[#FF5200] group-hover:text-white transition-all duration-300 mr-3 mt-1 flex-shrink-0">
                  <MdLocationOn size={16} />
                </div>
                <div>
                  <span className="text-gray-600 text-md">131, Sutlej Hostel, JNU, New Delhi</span>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-[#FF5200] text-xs mt-1 hover:underline">
                    <MdDirections size={12} className="mr-1" /> Get directions
                  </a>
                </div>
              </li>
              
              <li className="flex items-center group">
                <div className="bg-white shadow-sm p-2 rounded-full text-[#FF5200] group-hover:bg-[#FF5200] group-hover:text-white transition-all duration-300 mr-3 flex-shrink-0">
                  <MdPhone size={16} />
                </div>
                <a href="tel:+916398937329" className="text-gray-600 hover:text-[#FF5200] transition-colors text-md">
                  +91 6398937329
                </a>
              </li>
              
              <li className="flex items-center group">
                <div className="bg-white shadow-sm p-2 rounded-full text-[#FF5200] group-hover:bg-[#FF5200] group-hover:text-white transition-all duration-300 mr-3 flex-shrink-0">
                  <MdEmail size={16} />
                </div>
                <a href="mailto:support@cookzy.com" className="text-gray-600 hover:text-[#FF5200] transition-colors text-md">
                  support@cookzy.com
                </a>
              </li>
              
              <li className="flex items-start group">
                <div className="bg-white shadow-sm p-2 rounded-full text-[#FF5200] group-hover:bg-[#FF5200] group-hover:text-white transition-all duration-300 mr-3 mt-1 flex-shrink-0">
                  <FiClock size={16} />
                </div>
                <div className="text-gray-600 text-md">
                  <p>Mon-Fri: 9AM-6PM</p>
                  <p>Sat-Sun: 10AM-4PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#FF5200] rounded-full"></span>
            </h3>
            <p className="text-gray-600 mb-4 text-md">Subscribe to get updates on new cooks and special offers.</p>
            <form className="mb-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white border border-gray-200 rounded-full px-5 py-3 text-md focus:outline-none focus:ring-2 focus:ring-[#FF5200]/40 focus:border-[#FF5200] pr-12"
                />
                <button 
                  type="submit" 
                  className="absolute right-1 top-1 bg-[#FF5200] hover:bg-[#e64a00] text-white rounded-full p-2 transition-colors"
                  aria-label="Subscribe"
                >
                  <IoIosSend size={18} />
                </button>
              </div>
            </form>
            <div className="bg-orange-50 border-l-4 border-[#FF5200] p-3 rounded-r-md">
              <p className="text-xs text-gray-600">Get <span className="text-[#FF5200] font-semibold">10% off</span> your first booking when you subscribe to our newsletter!</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 mt-8 text-center md:flex md:justify-between md:items-center">
          <p className="text-gray-500 text-md">
            &copy; {currentYear} <span className="text-[#FF5200] font-medium">CookZy</span>. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex justify-center md:justify-end space-x-6">
              <li><a href="#" className="text-gray-500 hover:text-[#FF5200] transition-colors text-md">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-[#FF5200] transition-colors text-md">Terms of Service</a></li>
              <li><a href="#" className="text-gray-500 hover:text-[#FF5200] transition-colors text-md">Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;