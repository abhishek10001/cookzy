import React from 'react';
import { FaEnvelope, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TeamSection = ({ profile }) => {
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
          <span className="text-[#FF5200] font-medium uppercase tracking-wider">Our Team</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-6 text-gray-800">
            Meet the Vision Behind <span className="text-[#FF5200]">CookZy</span>
          </h2>
          <div className="w-24 h-1 bg-[#FF5200] mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our featured cooks bring years of experience from top restaurants and culinary 
            institutions to create exceptional dining experiences for you.
          </p>
        </motion.div>

        <div className="space-y-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left side - Profile Image */}
                <div className="md:w-2/5 relative overflow-hidden">
                  <div className="h-full aspect-square md:aspect-auto">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-6">
                      <div className="flex space-x-3 mb-2">
                        <a href={member.social.email} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-[#FF5200] transition-colors">
                          <FaEnvelope className="text-white" />
                        </a>
                        <a href={member.social.linkedin} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-[#FF5200] transition-colors">
                          <FaLinkedinIn className="text-white" />
                        </a>
                        <a href={member.social.twitter} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-[#FF5200] transition-colors">
                          <FaTwitter className="text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 bg-[#FF5200] rotate-45 shadow-lg"></div>
                  </div>
                </div>
                
                {/* Right side - Content */}
                <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="font-bold text-2xl md:text-3xl text-gray-800 mb-2">
                      {member.name}
                    </h3>
                    <div className="flex items-center">
                      <span className="h-px w-8 bg-[#FF5200] mr-3"></span>
                      <p className="text-[#FF5200] font-medium text-lg">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      {member.bio}
                    </p>
                    
                    <details className="group cursor-pointer">
                      <summary className="list-none flex items-center text-sm font-medium text-[#FF5200] mt-4">
                        Read more
                        <svg className="ml-1 w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </summary>
                      <p className="text-gray-600 mt-3 leading-relaxed">
                        {member.fullBio}
                      </p>
                    </details>
                  </div>
                  
                  <div className="mt-8 md:hidden">
                    <div className="flex space-x-3">
                      <a href={member.social.email} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#FF5200] hover:text-white transition-colors">
                        <FaEnvelope />
                      </a>
                      <a href={member.social.linkedin} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#FF5200] hover:text-white transition-colors">
                        <FaLinkedinIn />
                      </a>
                      <a href={member.social.twitter} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#FF5200] hover:text-white transition-colors">
                        <FaTwitter />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <a href="/about" className="inline-flex items-center px-6 py-3 bg-[#FF5200] text-white font-medium rounded-full hover:bg-[#FF6B2A] transition-colors shadow-lg hover:shadow-xl hover:shadow-orange-200/30">
            Meet our entire team
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;