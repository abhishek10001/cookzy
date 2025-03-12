import React from 'react';
import assets from '../assets/assets_frontend/assets';
import banner_img from '../assets/assets_frontend/banner.png';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col md:flex-row bg-primary rounded-lg shadow-lg overflow-hidden mx-4 sm:mx-6 md:mx-10 my-10 sm:my-16 md:my-20'>
      <div className='flex-1 py-8 px-6 sm:px-8 sm:py-10 md:py-16 lg:py-20 flex flex-col justify-center'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white mb-6 sm:mb-8'>
          <p className='mb-1'>Book Now</p>
          <p>With 100+ Trusted Cooks</p>
        </div>
        <p className='text-white/80 mb-6 max-w-md text-sm sm:text-base'>
          Find the perfect chef for your occasion. Our trusted cooks bring restaurant-quality meals directly to your home.
        </p>
        <button className="flex items-center gap-2 bg-white text-primary py-3 px-6 rounded-full font-medium w-fit hover:bg-opacity-90 hover:scale-105 transition-all duration-300 " onClick={()=>{navigate('/login'); scrollTo(0,0)}}>
          Create Account
        </button>
      </div>
      
      <div className='relative h-48 sm:h-56 md:h-auto md:w-1/2 lg:w-2/5'>
        <img 
          className='absolute bottom-0 right-0 h-full md:h-auto md:max-h-full object-contain object-bottom max-w-full mr-5' 
          src={banner_img} 
          alt="Chef preparing food" 
        />
      </div>
    </div>
  );
};

export default Banner;