import React, { useState, useEffect } from "react";
import {
  FaBook,
  FaUsers,
  FaRegSmileBeam,
  FaPaperPlane,
  FaEnvelope,
  FaQuoteLeft,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";
import Feedback from "../components/Feedback";

const About = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  

  

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Home Chef",
      quote:
        "Cookzy transformed my cooking journey. The recipes are easy to follow and the results are always delicious!",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Michael Chen",
      role: "Food Blogger",
      quote:
        "As someone who writes about food for a living, I'm impressed by the quality and diversity of recipes on Cookzy.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Priya Patel",
      role: "Culinary Student",
      quote:
        "The community aspect of Cookzy has helped me connect with other aspiring chefs and learn so much!",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-8 text-center overflow-hidden bg-gradient-to-r from-[#FF5200] to-orange-500 text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            Welcome to <span className="text-yellow-300">Cookzy</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed mb-10 text-white/90">
            Your culinary companion for discovering, creating, and sharing
            delicious recipes that bring joy to your kitchen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#FF5200] px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold">
              Explore Recipes
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold">
              Join Community
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="bg-orange-100 text-[#FF5200] px-4 py-1 rounded-full text-sm font-medium">
              OUR PURPOSE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-800">
              Our Mission
            </h2>
            <div className="w-20 h-1 bg-[#FF5200] mx-auto mb-8 rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed text-center mb-10">
            At Cookzy, we believe cooking is an art of love and connection. Our
            platform empowers food enthusiasts to explore, learn, and share
            culinary experiences that transform ordinary meals into
            extraordinary memories.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
              <h3 className="text-xl font-semibold mb-4 text-[#FF5200]">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To create a world where everyone can experience the joy of
                cooking and sharing meals, regardless of skill level or
                background.
              </p>
            </div>
            <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
              <h3 className="text-xl font-semibold mb-4 text-[#FF5200]">
                Our Values
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#FF5200] rounded-full mr-2"></span>{" "}
                  Inclusivity in culinary exploration
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#FF5200] rounded-full mr-2"></span>{" "}
                  Authenticity in recipes and stories
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-[#FF5200] rounded-full mr-2"></span>{" "}
                  Community-driven knowledge sharing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-orange-100 text-[#FF5200] px-4 py-1 rounded-full text-sm font-medium">
              WHAT WE OFFER
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-800">
              Discover Our Features
            </h2>
            <div className="w-20 h-1 bg-[#FF5200] mx-auto mb-8 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBook className="text-white text-3xl" />,
                title: "Explore Recipes",
                description:
                  "Discover thousands of recipes from global cuisines, tailored to every skill level and dietary preference.",
                color: "from-[#FF5200] to-orange-600",
              },
              {
                icon: <FaUsers className="text-white text-3xl" />,
                title: "Community Connection",
                description:
                  "Engage with passionate food lovers, share your culinary journey, and get inspired by diverse cooking styles.",
                color: "from-orange-500 to-amber-500",
              },
              {
                icon: <FaRegSmileBeam className="text-white text-3xl" />,
                title: "Culinary Creativity",
                description:
                  "Transform cooking from a chore to a joyful, creative expression that brings people together.",
                color: "from-amber-500 to-yellow-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 group-hover:text-[#FF5200] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <button className="mt-6 text-[#FF5200] font-medium flex items-center group-hover:translate-x-2 transition-transform">
                  Learn more <FaArrowRight className="ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#FF5200] to-orange-500 text-white">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: "10K+", label: "Recipes" },
              { number: "500K+", label: "Community Members" },
              { number: "50+", label: "Countries Represented" },
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <h3 className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </h3>
                <p className="text-white/80 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-800">
              Meet Our Team
            </h2>
            <div className="w-20 h-1 bg-[#FF5200] mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A passionate team of chefs, food photographers, and tech
              innovators dedicated to revolutionizing your cooking experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              {
                name: "Sofia Rodriguez",
                role: "Head Chef",
                color: "bg-[#FF5200]",
                image:
                  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
                bio: "Award-winning chef with 15 years of experience in Mediterranean cuisine.",
              },
              {
                name: "Marco Chen",
                role: "Recipe Developer",
                color: "bg-orange-500",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
                bio: "Specializes in fusion recipes that blend Eastern and Western culinary traditions.",
              },
              {
                name: "Elena Petrov",
                role: "Culinary Photographer",
                color: "bg-amber-500",
                image:
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
                bio: "Captures the art of food through her lens with a focus on natural lighting.",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#FF5200] font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#FF5200] hover:text-white transition-colors">
                      <FaEnvelope />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="bg-orange-100 text-[#FF5200] px-4 py-1 rounded-full text-sm font-medium">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-800">
              What Our Community Says
            </h2>
            <div className="w-20 h-1 bg-[#FF5200] mx-auto mb-8 rounded-full"></div>
          </div>

          <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 overflow-hidden">
            <FaQuoteLeft className="text-orange-100 text-8xl absolute top-4 left-4" />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-10">
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-orange-100"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 mr-1" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-lg italic mb-6">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <h4 className="font-bold text-lg text-gray-800">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-[#FF5200]">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full mx-1 ${
                    activeTestimonial === index ? "bg-[#FF5200]" : "bg-gray-300"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      

      {/* Feedback Section */}
      
    </div>
  );
};

export default About;
