import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaUser, FaCheck } from 'react-icons/fa';
import { FiMail, FiMessageSquare } from 'react-icons/fi';

const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [name, setName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    
    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        if (!contactEmail.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(contactEmail)) {
            newErrors.email = 'Email is invalid';
        }
        if (!feedback.trim()) newErrors.feedback = 'Feedback is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Add feedback submission logic here
        setIsSubmitted(true);
        setTimeout(() => {
            setFeedback("");
            setName("");
            setContactEmail("");
            setIsSubmitted(false);
        }, 3000);
        setIsSubmitting(false);
    };

    const inputVariants = {
        focus: { scale: 1.02 },
        blur: { scale: 1 }
    };

    return (
        <section id="contact" className="py-20 px-8 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-4xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-orange-100 text-primary px-4 py-1 rounded-full text-sm font-medium inline-block"
                    >
                        GET IN TOUCH
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-800"
                    >
                        We Value Your Feedback
                    </motion.h2>
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="h-1 bg-primary mx-auto mb-8 rounded-full"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <form
                        onSubmit={handleFeedbackSubmit}
                        className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                    >
                        <div className="mb-6">
                            <label
                                htmlFor="name"
                                className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2"
                            >
                                <FaUser className="text-primary" />
                                Your Name
                            </label>
                            <motion.input
                                variants={inputVariants}
                                whileFocus="focus"
                                whileBlur="blur"
                                type="text"
                                id="name"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                            />
                            {errors.name && (
                                <motion.p 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm mt-1"
                                >
                                    {errors.name}
                                </motion.p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="contactEmail"
                                className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2"
                            >
                                <FiMail className="text-primary" />
                                Your Email
                            </label>
                            <motion.input
                                variants={inputVariants}
                                whileFocus="focus"
                                whileBlur="blur"
                                type="email"
                                id="contactEmail"
                                placeholder="john@example.com"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                            />
                            {errors.email && (
                                <motion.p 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm mt-1"
                                >
                                    {errors.email}
                                </motion.p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="feedback"
                                className="block text-lg font-bold text-gray-700 mb-2 flex items-center gap-2"
                            >
                                <FiMessageSquare className="text-primary" />
                                Your Feedback
                            </label>
                            <motion.textarea
                                variants={inputVariants}
                                whileFocus="focus"
                                whileBlur="blur"
                                id="feedback"
                                placeholder="Share your feedback, suggestions, or cooking stories..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                required
                                rows={5}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.feedback ? 'border-red-500' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                            />
                            {errors.feedback && (
                                <motion.p 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm mt-1"
                                >
                                    {errors.feedback}
                                </motion.p>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isSubmitting || isSubmitted}
                            className={`w-full bg-primary text-white px-6 py-4 rounded-full transition-all duration-300 shadow-lg flex items-center justify-center gap-2 font-semibold ${
                                isSubmitting || isSubmitted ? 'opacity-75 cursor-not-allowed' : 'hover:bg-primary/90'
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                    />
                                    Sending...
                                </>
                            ) : isSubmitted ? (
                                <>
                                    <FaCheck />
                                    Thank You!
                                </>
                            ) : (
                                <>
                                    <FaEnvelope />
                                    Send Feedback
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Feedback;