import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ContactSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      project: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Location',
      details: ['20476 147th St', 'Basehor, KS 66007'],
      action: 'Get Directions',
      link: 'https://maps.google.com?q=20476+147th+St,+Basehor,+KS+66007'
    },
    {
      icon: '📞',
      title: 'Phone',
      details: ['913-432-4041'],
      action: 'Call Now',
      link: 'tel:913-432-4041'
    },
    {
      icon: '⏰',
      title: 'Hours',
      details: ['Mon-Fri: 8AM-6PM', 'Sat: 9AM-4PM', 'Sun: By Appointment'],
      action: 'Schedule Visit',
      link: 'tel:913-432-4041'
    }
  ];

  const projectTypes = [
    'Complete Custom Build',
    'Engine Rebuild',
    'Performance Upgrade',
    'Custom Fabrication',
    'Restoration',
    'Maintenance/Repair',
    'Other'
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-[url('/images/industrial_garage.jpg')] bg-cover bg-center opacity-10"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 30, repeat: Infinity, repeatType: 'reverse' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            GET IN <span className="text-amber-500">TOUCH</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your custom V-Twin vision to life? Contact Turkey Creek Cycles today 
            and let's start building something legendary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Visit Our Shop
            </h3>
            
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-amber-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{info.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2">{info.title}</h4>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-300 mb-1">
                        {detail}
                      </p>
                    ))}
                    <motion.a
                      href={info.link}
                      className="inline-block mt-3 text-amber-500 hover:text-amber-400 font-medium transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {info.action} →
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Emergency Contact */}
            <motion.div
              className="bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h4 className="text-xl font-bold text-amber-500 mb-2">
                Need Immediate Service?
              </h4>
              <p className="text-gray-300 mb-4">
                For urgent motorcycle repairs or emergency roadside assistance, 
                call us directly and we'll get you back on the road.
              </p>
              <motion.a
                href="tel:913-432-4041"
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-black px-6 py-3 rounded-md font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-200 inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                EMERGENCY CALL 913-432-4041
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8"
          >
            <h3 className="text-3xl font-bold text-white mb-8">
              Start Your Project
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors duration-200"
                    placeholder="John Rider"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-300 font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors duration-200"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors duration-200"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="project" className="block text-gray-300 font-medium mb-2">
                  Project Type *
                </label>
                <select
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-md text-white focus:border-amber-500 focus:outline-none transition-colors duration-200"
                >
                  <option value="">Select a project type</option>
                  {projectTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-300 font-medium mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-colors duration-200 resize-none"
                  placeholder="Tell us about your dream bike... What's your vision? Any specific requirements or ideas?"
                />
              </div>
              
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-black px-8 py-4 rounded-md font-bold text-lg hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                SEND MESSAGE
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20 pt-12 border-t border-gray-800"
        >
          <div className="text-2xl font-bold text-white mb-4 tracking-wider">
            TURKEY CREEK <span className="text-amber-500">CYCLES</span>
          </div>
          <p className="text-gray-400 mb-6">
            Custom V-Twin Specialists | Basehor, Kansas
          </p>
          <div className="flex justify-center space-x-8 text-gray-400">
            <span>© 2024 Turkey Creek Cycles</span>
            <span>|</span>
            <span>All Rights Reserved</span>
            <span>|</span>
            <a href="tel:913-432-4041" className="hover:text-amber-500 transition-colors">
              913-432-4041
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;
