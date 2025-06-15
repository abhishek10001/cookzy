import React, { useEffect, useRef } from 'react';
import assets from '../assets/assets_frontend/assets';
import banner_img from '../assets/assets_frontend/banner.png';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Banner = () => {
    const navigate = useNavigate();
    const bannerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { left, top, width, height } = bannerRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            bannerRef.current.style.setProperty('--mouse-x', x);
            bannerRef.current.style.setProperty('--mouse-y', y);
        };

        const banner = bannerRef.current;
        banner.addEventListener('mousemove', handleMouseMove);

        return () => banner.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            ref={bannerRef}
            className='relative flex flex-col md:flex-row bg-gradient-to-br from-primary via-primary/95 to-primary/90 rounded-2xl shadow-2xl overflow-hidden mx-20 sm:mx-6 md:mx-10 my-10 sm:my-16 md:my-20 group hover:shadow-primary/20 transition-all duration-500'
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

            <div className='flex-1 py-8 px-6 sm:px-8 sm:py-10 md:py-16 lg:py-20 flex flex-col justify-center relative z-10'>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 sm:mb-8'
                >
                    <p className='mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80'>Book Now</p>
                    <p className='bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80'>With 100+ Trusted Cooks</p>
                </motion.div>
                <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className='text-white/90 mb-8 max-w-md text-sm sm:text-base leading-relaxed'
                >
                    Find the perfect chef for your occasion. Our trusted cooks bring restaurant-quality meals directly to your home.
                </motion.p>
                <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-white text-primary py-3 px-8 rounded-full font-semibold w-fit hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20" 
                    onClick={() => {
                        navigate('/login');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    Create Account
                </motion.button>
            </div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className='relative h-48 sm:h-56 md:h-auto md:w-1/2 lg:w-2/5'
            >
                <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className='absolute bottom-0 right-0 h-full md:h-auto md:max-h-full object-contain object-bottom max-w-full mr-5 filter drop-shadow-2xl' 
                    src={banner_img} 
                    alt="Chef preparing food" 
                />
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl transform -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl transform translate-y-1/2 -translate-x-1/2" />
        </motion.div>
    );
};

export default Banner;