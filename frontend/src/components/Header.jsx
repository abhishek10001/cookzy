import React, { useEffect, useRef } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { motion } from "framer-motion";

const Header = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { left, top, width, height } = headerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      headerRef.current.style.setProperty('--mouse-x', x);
      headerRef.current.style.setProperty('--mouse-y', y);
    };

    const header = headerRef.current;
    header.addEventListener('mousemove', handleMouseMove);

    return () => header.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      ref={headerRef}
      className="relative m-20 flex flex-col md:flex-row bg-gradient-to-br from-primary via-primary/95 to-primary/90 rounded-2xl p-6 md:p-10 lg:p-16 overflow-hidden mt-6 shadow-2xl group hover:shadow-primary/20 transition-all duration-500"
      style={{
        '--mouse-x': 0.5,
        '--mouse-y': 0.5,
      }}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), rgba(255,255,255,0.1) 0%, transparent 50%)`
        }}
      />

      {/* Left Content Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-6 py-8 md:py-12 lg:py-16 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight"
        >
          Book a Trusted Cook From <br className="hidden sm:block" /> 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">CookZy</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-white"
        >
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-28 h-auto filter drop-shadow-lg" 
            src={assets.group_profiles} 
            alt="Profile group" 
          />
          <p className="text-sm font-light leading-relaxed">
            Simply browse through our extensive list of trusted cooks, <br className="hidden sm:block" />
            schedule your hassle-free Booking.
          </p>
        </motion.div>
        
        <motion.a 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#speaciality" 
          className="flex items-center gap-2 bg-white text-primary py-3 px-8 rounded-full font-semibold w-fit hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20"
        >
          Book Now 
          <motion.img 
            whileHover={{ x: 5 }}
            transition={{ duration: 0.3 }}
            src={assets.arrow_icon} 
            alt="Arrow" 
            className="w-4 h-4" 
          />
        </motion.a>
      </div>
      
      {/* Right Image Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full md:w-1/2 relative mt-6 md:mt-0"
      >
        <div className="md:absolute md:bottom-0 md:right-0 md:h-full">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-auto rounded-lg object-cover filter drop-shadow-2xl" 
            src={assets.header_img}
            alt="Chef cooking"
          />
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl transform translate-y-1/2 -translate-x-1/2" />
    </motion.div>
  );
};

export default Header;