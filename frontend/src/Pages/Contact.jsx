import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTimes, FaCheckCircle, FaAngleDown, FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaComments } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Feedback from '../components/Feedback';

// API base URL - change this to match your backend
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const Contact = () => {
  // State for newsletter form
  const [email, setEmail] = useState('');
  
  // State for contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // Loading states
  const [loading, setLoading] = useState({
    newsletter: false,
    contact: false
  });
  
  // Notification state
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  // FAQ accordion state
  const [activeFaq, setActiveFaq] = useState(null);

  // Animation state for sections
  const [sectionsVisible, setSectionsVisible] = useState({
    contact: false,
    newsletter: false,
    faq: false
  });

  // Add state for chat button
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Intersection Observer for animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setSectionsVisible(prev => ({
            ...prev,
            [sectionId]: true
          }));
        }
      });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll('section[id]').forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Show notification helper
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  // Handle newsletter form submission
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(prev => ({ ...prev, newsletter: true }));
      
      const response = await axios.post(`${API_URL}/api/newsletter/subscribe`, { email });
      
      showNotification('Thank you for subscribing to CookZy newsletter!');
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      
      showNotification(
        error.response?.data?.message || 'Subscription failed. Please try again.',
        'error'
      );
    } finally {
      setLoading(prev => ({ ...prev, newsletter: false }));
    }
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(prev => ({ ...prev, contact: true }));
      
      const response = await axios.post(`${API_URL}/api/contact/send`, formData);
      
      showNotification('Your message has been sent. We\'ll get back to you soon!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      
      showNotification(
        error.response?.data?.message || 'Message sending failed. Please try again.',
        'error'
      );
    } finally {
      setLoading(prev => ({ ...prev, contact: false }));
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Toggle FAQ item
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // FAQ data
  const faqs = [
    {
      question: "How quickly will I receive a response?",
      answer: "We typically respond to all inquiries within 24-48 business hours."
    },
    {
      question: "Can I submit my own recipe?",
      answer: "Absolutely! We love featuring community recipes. Please use the contact form and mention 'Recipe Submission' in your message."
    },
    {
      question: "How often is the newsletter sent?",
      answer: "Our newsletter is sent weekly, usually on Sundays, with occasional special editions for holidays and events."
    },
    {
      question: "Can I unsubscribe from the newsletter?",
      answer: "Yes, every newsletter includes an unsubscribe link at the bottom that lets you opt out instantly."
    }
  ];

  // Animation variants
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
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      {/* Floating Chat Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
      >
        <FaComments className="text-xl" />
        <span className="hidden sm:inline-block font-medium">Chat with Us</span>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
        >
          Live
        </motion.div>
      </motion.button>

      {/* Chat Window - You can customize this based on your chat implementation */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-primary text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">Chat with Us</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <FaTimes />
              </motion.button>
            </div>
            <div className="p-4 h-96 flex flex-col">
              <div className="flex-grow overflow-y-auto">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%] mb-4">
                  <p className="text-sm text-gray-800">👋 Hi there! How can we help you today?</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-white p-2 rounded-lg"
                >
                  <FaPaperPlane />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-primary to-orange-600 text-white overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto max-w-4xl relative z-10 text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl mb-8 max-w-2xl mx-auto text-white/90"
          >
            We'd love to hear from you! Share your thoughts, questions, or culinary adventures.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsChatOpen(true)}
            className="bg-white text-primary px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 font-semibold mx-auto"
          >
            <FaComments className="text-xl" />
            Chat with Us
          </motion.button>
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Notification Component */}
      <AnimatePresence>
        {notification.show && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white max-w-md transition-all duration-300 flex items-center gap-3`}
          >
            {notification.type === 'success' ? 
              <FaCheckCircle className="flex-shrink-0" /> : 
              <FaTimes className="flex-shrink-0" />
            }
            <span>{notification.message}</span>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setNotification(prev => ({ ...prev, show: false }))}
              className="ml-auto text-white/80 hover:text-white"
            >
              <FaTimes />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <section 
        id="contact" 
        className={`py-16 px-4 ${sectionsVisible.contact ? 'animate-fadeIn' : 'opacity-0'}`}
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-2 text-gray-800">We Value Your Feedback</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Your thoughts help us improve. Let us know what you think about our recipes, website, or services.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-5 gap-8 items-stretch">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:col-span-3 bg-white p-8 rounded-2xl shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <span className="inline-block w-10 h-10 rounded-full bg-orange-100 text-primary flex items-center justify-center mr-3">
                  <FaPaperPlane />
                </span>
                Send us your Feedback
              </h3>
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                      placeholder="John Doe"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="contact-email" className="block text-gray-700 mb-2 font-medium">Your Email</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                      placeholder="john@example.com"
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Your Feedback</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="Share your thoughts or questions with us..."
                  />
                </motion.div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading.contact}
                  className="w-full bg-primary hover:bg-orange-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center gap-2 font-medium"
                >
                  {loading.contact ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <FaPaperPlane className="text-sm" />
                  )}
                  {loading.contact ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:col-span-2 bg-gradient-to-br from-primary to-orange-600 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-pattern opacity-10"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-8">Contact Information</h3>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: <FaEnvelope className="h-5 w-5" />,
                      label: "Email",
                      value: "hello@foodiehub.com",
                      link: "mailto:hello@foodiehub.com"
                    },
                    {
                      icon: <FaPhone className="h-5 w-5" />,
                      label: "Phone",
                      value: "+1 (234) 567-8900",
                      link: "tel:+12345678900"
                    },
                    {
                      icon: <FaMapMarkerAlt className="h-5 w-5" />,
                      label: "Address",
                      value: "123 Culinary Street, Foodie City, FC 10001"
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 transform transition-all duration-300 hover:translate-x-2"
                    >
                      <div className="bg-white/20 p-3 rounded-full">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-white/70 text-sm">{item.label}</p>
                        {item.link ? (
                          <a href={item.link} className="hover:underline font-medium">
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium">{item.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-10 pt-6 border-t border-white/20">
                  <h4 className="font-medium mb-3 text-white/90">Business Hours</h4>
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span>Monday-Friday:</span>
                      <span className="font-medium">9:00 AM - 5:00 PM</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Saturday-Sunday:</span>
                      <span className="font-medium">Closed</span>
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <h4 className="font-medium mb-4 text-white/90">Follow Us</h4>
                  <div className="flex gap-4">
                    {[
                      { icon: <FaFacebook />, href: "#" },
                      { icon: <FaTwitter />, href: "#" },
                      { icon: <FaInstagram />, href: "#" },
                      { icon: <FaLinkedin />, href: "#" }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        id="newsletter"
        className={`py-20 px-4 bg-gradient-to-r from-primary to-orange-500 text-white relative overflow-hidden ${sectionsVisible.newsletter ? 'animate-fadeIn' : 'opacity-0'}`}
      >
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="backdrop-blur-md bg-white/10 rounded-3xl p-10 shadow-xl border border-white/20 transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Stay Inspired</h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto text-center">
              Subscribe to our newsletter and get fresh recipes, cooking tips, and
              culinary inspiration delivered straight to your inbox.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            >
              <div className="flex-grow relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-6 py-4 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
                />
                {email && (
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button" 
                    onClick={() => setEmail('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    <FaTimes />
                  </motion.button>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading.newsletter}
                className="bg-white text-primary px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 font-semibold"
              >
                {loading.newsletter ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                  />
                ) : (
                  <FaPaperPlane />
                )}
                {loading.newsletter ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </form>
            <p className="text-center text-white/70 mt-6 text-sm">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.div>
        </div>
        
        <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section 
        id="faq" 
        className={`py-16 px-4 bg-white ${sectionsVisible.faq ? 'animate-fadeIn' : 'opacity-0'}`}
      >
        <div className="container mx-auto max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our services.
            </p>
          </motion.div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${
                  activeFaq === index ? 'shadow-md' : 'hover:shadow-sm'
                }`}
              >
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left bg-white flex justify-between items-center"
                >
                  <h3 className={`font-medium text-lg ${activeFaq === index ? 'text-primary' : 'text-gray-800'}`}>
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaAngleDown 
                      className={`text-gray-500 transition-colors ${
                        activeFaq === index ? 'text-primary' : ''
                      }`}
                    />
                  </motion.div>
                </motion.button>
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: activeFaq === index ? 'auto' : 0,
                    opacity: activeFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 py-4 text-gray-600 border-t border-gray-100">
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <motion.a 
              href="#contact" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              Contact us directly
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800">Find Us</h3>
              <p className="text-gray-600">Visit our location or send mail to this address</p>
            </div>
            <div className="aspect-w-16 aspect-h-9 h-64 bg-gray-200">
              {/* Replace with actual map component or embed */}
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <p>Map loading... (123 Culinary Street, Foodie City, FC 10001)</p>
              </div>
            </div>
          </motion.div>
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
        
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default Contact;