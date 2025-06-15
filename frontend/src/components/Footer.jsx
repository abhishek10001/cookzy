import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn, MdDirections } from 'react-icons/md';
import { FiClock } from 'react-icons/fi';
import { IoIosSend } from 'react-icons/io';
import { BiChevronRight } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/assets_frontend/logo-czy.png';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowSuccess(true);
    setEmail('');
    setIsSubmitting(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <footer className="relative bg-gradient-to-b from-gray-50 to-gray-100 pt-16 pb-8 overflow-hidden">
      {/* Decorative Elements */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-32 h-32 rounded-full bg-orange-100 -translate-x-1/2 -translate-y-1/2"
      />
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-orange-100 translate-x-1/3 translate-y-1/3"
      />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <motion.div 
              className="mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={logo} alt="CookZy" className="h-14" />
            </motion.div>
            <p className="text-gray-600 mb-6 text-md leading-relaxed">
              Connecting food enthusiasts with professional home cooks for unique dining experiences tailored to your taste.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebook size={20} />, href: "#" },
                { icon: <FaTwitter size={18} />, href: "#" },
                { icon: <FaInstagram size={20} />, href: "#" },
                { icon: <FaLinkedin size={20} />, href: "#" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white shadow-sm text-primary hover:bg-primary hover:text-white transition-all duration-300 p-2 rounded-full"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 relative inline-block group">
              Quick Links
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 0.5 }}
                className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
              />
            </h3>
            <ul className="space-y-3">
              {[
                { text: "Home", path: "/" },
                { text: "About Us", path: "/about" },
                { text: "Our Cooks", path: "/cooks" },
                { text: "Book a Cook", path: "/cooks" },
                { text: "Become a Partner", path: "/" },
                { text: "Services", path: "/" }
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="text-md"
                >
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-600 hover:text-primary transition-colors flex items-center text-md w-full text-left"
                  >
                    <BiChevronRight className="text-primary" />
                    <span>{link.text}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 relative inline-block group">
              Contact Us
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 0.5 }}
                className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
              />
            </h3>
            <ul className="space-y-4">
              {[
                {
                  icon: <MdLocationOn size={16} />,
                  text: "131, Sutlej Hostel, JNU, New Delhi",
                  link: "https://maps.google.com",
                  linkText: "Get directions",
                  icon: <MdDirections size={12} />
                },
                {
                  icon: <MdPhone size={16} />,
                  text: "+91 6398937329",
                  link: "tel:+916398937329"
                },
                {
                  icon: <MdEmail size={16} />,
                  text: "support@cookzy.com",
                  link: "mailto:support@cookzy.com"
                },
                {
                  icon: <FiClock size={16} />,
                  text: ["Mon-Fri: 9AM-6PM", "Sat-Sun: 10AM-4PM"]
                }
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-start group"
                >
                  <div className="bg-white shadow-sm p-2 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mr-3 mt-1 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    {Array.isArray(item.text) ? (
                      item.text.map((line, i) => (
                        <p key={i} className="text-gray-600 text-md">{line}</p>
                      ))
                    ) : (
                      <>
                        <span className="text-gray-600 text-md">{item.text}</span>
                        {item.link && (
                          <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center text-primary text-xs mt-1 hover:underline"
                          >
                            {item.icon && <span className="mr-1">{item.icon}</span>}
                            {item.linkText}
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 relative inline-block group">
              Newsletter
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                transition={{ duration: 0.5 }}
                className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
              />
            </h3>
            <p className="text-gray-600 mb-4 text-md">Subscribe to get updates on new cooks and special offers.</p>
            <form onSubmit={handleNewsletterSubmit} className="mb-4">
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className="w-full bg-white border border-gray-200 rounded-full px-5 py-3 text-md focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary pr-12 transition-all duration-300"
                />
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit" 
                  disabled={isSubmitting}
                  className="absolute right-1 top-1 bg-primary hover:bg-primary/90 text-white rounded-full p-2 transition-colors"
                  aria-label="Subscribe"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <IoIosSend size={18} />
                    </motion.div>
                  ) : (
                    <IoIosSend size={18} />
                  )}
                </motion.button>
              </div>
            </form>
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r-md"
                >
                  <p className="text-sm text-green-600">Thank you for subscribing!</p>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="bg-orange-50 border-l-4 border-primary p-3 rounded-r-md mt-4">
              <p className="text-xs text-gray-600">Get <span className="text-primary font-semibold">10% off</span> your first booking when you subscribe to our newsletter!</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-gray-200 mt-8 text-center md:flex md:justify-between md:items-center"
        >
          <p className="text-gray-500 text-md">
            &copy; {currentYear} <span className="text-primary font-medium">CookZy</span>. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex justify-center md:justify-end space-x-6">
              {["Privacy Policy", "Terms of Service", "Cookies"].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a href="#" className="text-gray-500 hover:text-primary transition-colors text-md">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;