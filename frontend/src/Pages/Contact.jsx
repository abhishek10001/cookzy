import React, { useState } from 'react'
import Feedback from '../components/Feedback'
import { FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [email, setEmail] = useState("");
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Add newsletter signup logic here
    alert(`Thank you for subscribing with email: ${email}`);
    setEmail("");
  };
  return (
    <div>
    
    <section
        id="newsletter"
        className="py-20 px-8 bg-gradient-to-r from-[#FF5200] to-orange-500 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Inspired</h2> */}
          <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
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
      </section>
      <Feedback/>
    </div>
  )
}

export default Contact