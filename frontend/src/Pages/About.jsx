import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUtensils,
  FaUsers,
  FaRegCalendarCheck,
  FaPaperPlane,
  FaEnvelope,
  FaQuoteLeft,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import profile from '../assets/assets_frontend/profile-photo.png';
import TeamSection from "../components/TeamSection";
import { useNavigate } from "react-router-dom";

const About = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionsVisible, setSectionsVisible] = useState({
    mission: false,
    features: false,
    testimonials: false,
    cta: false
  });

  const navigate = useNavigate();

  const handlebookNow = async (e) => {
    e.preventDefault();
    navigate('/cooks');
  };

  // Handle scroll effect for navbar and section visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Check section visibility
      const sections = ['mission', 'features', 'testimonials', 'cta'];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.75) {
            setSectionsVisible(prev => ({ ...prev, [section]: true }));
          }
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4000/api/reviews/platform/reviews');
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews");
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (reviews.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Fallback testimonials in case of error or empty reviews
  const fallbackTestimonials = [
    {
      name: "Sarah Johnson",
      role: "Home Cook Enthusiast",
      quote: "ChefConnect made it so easy to book a personal chef for my anniversary dinner. The chef was amazing and the experience was unforgettable!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Michael Chen",
      role: "Food Blogger",
      quote: "As someone who writes about culinary experiences, I'm impressed by the quality of chefs available on ChefConnect. Booking is seamless!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Priya Patel",
      role: "Busy Professional",
      quote: "ChefConnect has transformed my dinner parties. I can now focus on my guests while an expert chef handles the cooking!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
  ];

  // Use actual reviews or fallback if no reviews are available
  const displayTestimonials = reviews.length > 0 ? reviews : fallbackTestimonials;

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
    <div className="bg-gray-50 text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 text-center overflow-hidden bg-gradient-to-r from-primary to-orange-500 text-white">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight"
          >
            Welcome to <span className="text-yellow-300">CookZy</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl max-w-2xl mx-auto leading-relaxed mb-10 text-white/90"
          >
            Your personal connection to professional cooks. Book skilled culinary experts for private dining, cooking classes, and special events.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlebookNow} 
              className="bg-white text-primary px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg font-semibold"
            >
              Book a Cook
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/10 transition-all duration-300 shadow-lg font-semibold"
            >
              Explore Services
            </motion.button>
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Mission Section */}
      <section 
        id="mission" 
        className={`py-20 px-8 bg-white ${sectionsVisible.mission ? 'animate-fadeIn' : 'opacity-0'}`}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-800">
              Our Mission
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.5 }}
              className="h-1 bg-primary mx-auto mb-8 rounded-full"
            />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 leading-relaxed text-center mb-10"
          >
            At CookConnect, we believe everyone deserves access to exceptional culinary experiences. Our platform connects talented cooks with food lovers, bringing restaurant-quality dining into your home or venue.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Our Vision",
                content: "To transform how people experience food by making personal cook services accessible, affordable, and extraordinary for every occasion."
              },
              {
                title: "Our Values",
                content: [
                  "Culinary excellence and authenticity",
                  "Personalized dining experiences",
                  "Supporting culinary professionals"
                ]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-orange-50 p-8 rounded-2xl border border-orange-100 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  {item.title}
                </h3>
                {Array.isArray(item.content) ? (
                  <ul className="text-gray-600 space-y-2">
                    {item.content.map((value, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {value}
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">{item.content}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        className={`py-20 px-8 bg-gray-50 ${sectionsVisible.features ? 'animate-fadeIn' : 'opacity-0'}`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-orange-100 text-primary px-4 py-1 rounded-full text-sm font-medium inline-block"
            >
              WHAT WE OFFER
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-800">
              Discover Our Services
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.5 }}
              className="h-1 bg-primary mx-auto mb-8 rounded-full"
            />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaUtensils className="text-white text-3xl" />,
                title: "Private Dining",
                description: "Book professional chefs to create memorable dining experiences in the comfort of your own home for special occasions.",
                color: "from-primary to-orange-600",
              },
              {
                icon: <FaUsers className="text-white text-3xl" />,
                title: "Cooking Classes",
                description: "Learn culinary skills from expert chefs with personalized, hands-on cooking lessons for individuals or groups.",
                color: "from-orange-500 to-amber-500",
              },
              {
                icon: <FaRegCalendarCheck className="text-white text-3xl" />,
                title: "Event Catering",
                description: "Hire talented chefs for your events, from intimate gatherings to large celebrations with customized menus.",
                color: "from-amber-500 to-yellow-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="mt-6 text-primary font-medium flex items-center group-hover:translate-x-2 transition-transform"
                >
                  Learn more <FaArrowRight className="ml-2" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection profile={profile}/>

      {/* Testimonials Section */}
      <section 
        id="testimonials" 
        className={`py-20 px-8 bg-gray-50 ${sectionsVisible.testimonials ? 'animate-fadeIn' : 'opacity-0'}`}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-orange-100 text-primary px-4 py-1 rounded-full text-sm font-medium inline-block"
            >
              TESTIMONIALS
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-800">
              What Our Users Say
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.5 }}
              className="h-1 bg-primary mx-auto mb-8 rounded-full"
            />
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
              />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 overflow-hidden"
            >
              <FaQuoteLeft className="text-orange-100 text-8xl absolute top-4 left-4" />

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-center"
                  >
                    <div className="mb-6 md:mb-0 md:mr-10">
                      <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-primary text-2xl font-bold">
                        {displayTestimonials[activeTestimonial]?.user?.name?.charAt(0) || "U"}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex mb-3">
                        {[...Array(displayTestimonials[activeTestimonial]?.rating || 5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 mr-1" />
                        ))}
                      </div>
                      <p className="text-gray-600 text-lg italic mb-6">
                        "{displayTestimonials[activeTestimonial]?.reviewText || displayTestimonials[activeTestimonial]?.quote}"
                      </p>
                      <h4 className="font-bold text-lg text-gray-800">
                        {displayTestimonials[activeTestimonial]?.user?.name || displayTestimonials[activeTestimonial]?.name}
                      </h4>
                      <p className="text-primary">
                        {displayTestimonials[activeTestimonial]?.role || "Satisfied Client"}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-center mt-8">
                {displayTestimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full mx-1 transition-colors ${
                      activeTestimonial === index ? "bg-primary" : "bg-gray-300"
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Booking CTA Section */}
      <section 
        id="cta" 
        className={`py-16 px-8 bg-white ${sectionsVisible.cta ? 'animate-fadeIn' : 'opacity-0'}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
          >
            Ready to Book Your Cook?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Whether it's a special occasion, a cooking lesson, or weekly meal prep, we have the perfect chef for your needs.
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlebookNow} 
            className="bg-primary text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg"
          >
            Book a Cook Now
          </motion.button>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default About;