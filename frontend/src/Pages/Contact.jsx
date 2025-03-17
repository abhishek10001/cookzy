import React, { useState } from 'react';
import Feedback from '../components/Feedback';
import { FaPaperPlane, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with email: ${email}`);
    setEmail("");
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
     
  

      {/* Newsletter Section - Enhanced */}
      <section
        id="newsletter"
        className="py-20 px-4 bg-gradient-to-r from-[#FF5200] to-orange-500 text-white"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-xl border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Stay Inspired</h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto text-center">
              Subscribe to our newsletter and get fresh recipes, cooking tips, and
              culinary inspiration delivered straight to your inbox.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow px-6 py-4 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-[#FF5200] px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 font-semibold"
              >
                <FaPaperPlane /> Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
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
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Component */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Share Your Feedback</h2>
          <Feedback />
        </div>
      </div>
    </div>
  );
};

export default Contact;