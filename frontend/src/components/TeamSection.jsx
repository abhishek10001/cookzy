import React, { useState } from 'react';
import { FaEnvelope, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const TeamSection = ({ profile }) => {
  const [expandedMember, setExpandedMember] = useState(null);

  const teamMembers = [
    {
      name: "Abhishek Gangwar",
      role: "Founder",
      image: profile,
      bio: "I'm Abhishek Gangwar, the founder of CookZy, an online cook booking platform designed to make booking and hiring skilled cooks and chefs easier than ever. My vision has always been to bridge the gap between talented culinary professionals and people looking for high-quality, home-cooked meals—whether for daily dining, special occasions, or professional catering needs.",
      fullBio: "The idea for CookZy came from my belief that great food should be accessible, personalized, and hassle-free. I wanted to create a platform where households, businesses, and event planners could easily connect with verified chefs and home cooks. At the same time, I saw an opportunity to empower skilled cooks, giving them a platform to showcase their talent and earn a sustainable income. With a background in computer science, I combined my passion for food and innovation to build CookZy. My goal is to redefine the way people experience home dining and catering services, ensuring convenience, authenticity, and quality with every meal.",
      social: {
        email: "mailto:abhishek@cookzy.com",
        linkedin: "https://linkedin.com/in/abhishekgangwar",
        twitter: "https://twitter.com/abhishekgangwar"
      }
    },
    // You can add more team members here
  ];

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="team" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-primary font-medium uppercase tracking-wider bg-orange-50 px-4 py-1 rounded-full inline-block"
          >
            Our Team
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mt-3 mb-6 text-gray-800"
          >
            Meet the Vision Behind <span className="text-primary">CookZy</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-1 bg-primary mx-auto mb-8 rounded-full"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Our featured cooks bring years of experience from top restaurants and culinary 
            institutions to create exceptional dining experiences for you.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                {/* Left side - Profile Image */}
                <div className="md:w-2/5 relative overflow-hidden">
                  <motion.div 
                    className="h-full aspect-square md:aspect-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent transition-opacity duration-300 flex items-center justify-center"
                  >
                    <div className="p-6">
                      <div className="flex space-x-3 mb-2">
                        <motion.a 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={member.social.email} 
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
                        >
                          <FaEnvelope className="text-white" />
                        </motion.a>
                        <motion.a 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={member.social.linkedin} 
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
                        >
                          <FaLinkedinIn className="text-white" />
                        </motion.a>
                        <motion.a 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={member.social.twitter} 
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-colors"
                        >
                          <FaTwitter className="text-white" />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Decorative element */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2"
                  >
                    <div className="w-12 h-12 bg-primary rotate-45 shadow-lg"></div>
                  </motion.div>
                </div>
                
                {/* Right side - Content */}
                <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                  <div className="mb-6">
                    <motion.h3 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="font-bold text-2xl md:text-3xl text-gray-800 mb-2"
                    >
                      {member.name}
                    </motion.h3>
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="flex items-center"
                    >
                      <span className="h-px w-8 bg-primary mr-3"></span>
                      <p className="text-primary font-medium text-lg">
                        {member.role}
                      </p>
                    </motion.div>
                  </div>
                  
                  <div className="space-y-4">
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-gray-600 leading-relaxed"
                    >
                      {member.bio}
                    </motion.p>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="cursor-pointer"
                      onClick={() => setExpandedMember(expandedMember === index ? null : index)}
                    >
                      <div className="flex items-center text-sm font-medium text-primary mt-4 group">
                        <span>{expandedMember === index ? 'Show less' : 'Read more'}</span>
                        <motion.svg 
                          animate={{ rotate: expandedMember === index ? 180 : 0 }}
                          className="ml-1 w-4 h-4 transition-transform" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </motion.svg>
                      </div>
                      <AnimatePresence>
                        {expandedMember === index && (
                          <motion.p 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-600 mt-3 leading-relaxed overflow-hidden"
                          >
                            {member.fullBio}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8 md:hidden"
                  >
                    <div className="flex space-x-3">
                      <motion.a 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={member.social.email} 
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      >
                        <FaEnvelope />
                      </motion.a>
                      <motion.a 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={member.social.linkedin} 
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      >
                        <FaLinkedinIn />
                      </motion.a>
                      <motion.a 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={member.social.twitter} 
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      >
                        <FaTwitter />
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/about" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-200/30"
          >
            Meet our entire team
            <motion.svg 
              whileHover={{ x: 5 }}
              className="ml-2 w-5 h-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;