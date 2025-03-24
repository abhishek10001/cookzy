import React, { useState } from 'react'
import { FaEnvelope } from 'react-icons/fa'

const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [name, setName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    
    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        // Add feedback submission logic here
        alert(`Thank you for your feedback: ${feedback}`);
        setFeedback("");
        setName("");
        setContactEmail("");
      };
  return (
    <div><section id="contact" className=" py-20 px-8 bg-white">
    <div className=" mx-auto">
      <div className="text-center mb-16">
        {/* <span className="bg-orange-100 text-[#FF5200] px-4 py-1 rounded-full text-sm font-medium">
          GET IN TOUCH
        </span> */}
        <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-800">
          We Value Your Feedback
        </h2>
        <div className="w-20 h-1 bg-[#FF5200] mx-auto mb-8 rounded-full"></div>
      </div>

      <div className="">
        <div>
          <form
            onSubmit={handleFeedbackSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >

            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-lg font-bold text-gray-700 mb-1"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5200]"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="contactEmail"
                className="block text-lg font-bold text-gray-700 mb-1"
              >
                Your Email
              </label>
              <input
                type="email"
                id="contactEmail"
                placeholder="john@example.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5200]"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="feedback"
                className="block text-lg font-bold text-gray-700 mb-1"
              >
                Your FeedBack
              </label>
              <textarea
                id="feedback"
                placeholder="Share your feedback, suggestions, or cooking stories..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5200]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#FF5200] text-white px-6 py-4 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 font-semibold"
            >
              <FaEnvelope /> Send FeedBack
            </button>
          </form>
        </div>
      </div>
    </div>
  </section></div>
  )
}

export default Feedback