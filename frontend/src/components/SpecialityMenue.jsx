import React, { useState, useRef, useEffect } from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SpecialityMenu = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const scrollRef = useRef(null);
  const [showControls, setShowControls] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  // Detect if scrolling is possible
  useEffect(() => {
    if (scrollRef.current) {
      const updateScrollState = () => {
        const currentMaxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        setMaxScroll(currentMaxScroll);
        setShowControls(currentMaxScroll > 0);
      };

      // Update on resize
      window.addEventListener('resize', updateScrollState);
      // Initial calculation
      updateScrollState();

      return () => window.removeEventListener('resize', updateScrollState);
    }
  }, []);

  // Update scroll position on scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  // Scroll left/right functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-white to-orange-50" id="speciality">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Find By Speciality</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Simply browse through our extensive list of trusted chefs, book your
            cook now for an unforgettable culinary experience!
          </p>
        </div>

        {/* Speciality Cards Container */}
        <div className="relative">
          {/* Scroll Controls */}
          {showControls && (
            <>
              <button 
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 -ml-4 ${scrollPosition <= 5 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                onClick={scrollLeft}
                disabled={scrollPosition <= 5}
              >
                <FaChevronLeft />
              </button>
              <button 
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300 -mr-4 ${scrollPosition >= maxScroll - 5 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                onClick={scrollRight}
                disabled={scrollPosition >= maxScroll - 5}
              >
                <FaChevronRight />
              </button>
            </>
          )}

          {/* Scroll Area */}
          <div 
            ref={scrollRef} 
            onScroll={handleScroll}
            className="flex gap-6 pb-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {specialityData.map((item, index) => (
              <div 
                key={index}
                className="snap-center"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <Link 
                  onClick={() => scrollTo(0,0)} 
                  to={`/cooks/${item.speciality}`}
                  className="block"
                >
                  <div className={`relative group w-60 flex flex-col items-center transition-all duration-500 ${activeIndex === index ? 'scale-105' : ''}`}>
                    {/* Image Container */}
                    <div className="relative mb-4 rounded-full overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-xl">
                      <div className="w-52 h-52 md:w-56 md:h-56 overflow-hidden rounded-full">
                        <img 
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" 
                          src={item.image} 
                          alt={item.speciality} 
                        />
                      </div>
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full flex items-end justify-center">
                        <div className="text-white pb-8 font-medium">View Chefs</div>
                      </div>
                    </div>
                    
                    {/* Label */}
                    <div className="relative">
                      <h3 className={`text-lg font-medium text-center transition-all duration-300 ${activeIndex === index ? 'text-orange-600' : 'text-gray-800'}`}>
                        {item.speciality}
                      </h3>
                      <div className={`h-0.5 bg-orange-500 transition-all duration-300 ${activeIndex === index ? 'w-full' : 'w-0'} mx-auto mt-1`}></div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots for mobile */}
        <div className="md:hidden flex justify-center gap-1 mt-4">
          {specialityData.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${index === Math.floor(scrollPosition / 240) ? 'bg-orange-500 w-4' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center mt-10">
          <Link 
            to="/cooks"
            onClick={() => scrollTo(0,0)} 
            className="inline-block px-8 py-3 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            View All Categories
          </Link>
        </div>
      </div>

      {/* Custom style for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default SpecialityMenu;