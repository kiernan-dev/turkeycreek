import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { number: '25+', label: 'Years Experience' },
    { number: '500+', label: 'Custom Builds' },
    { number: '100%', label: 'V-Twin Specialists' },
    { number: '24/7', label: 'Passion for Bikes' }
  ];

  const values = [
    {
      icon: '🔥',
      title: 'Passion',
      description: 'Every bolt, every weld, every detail is crafted with genuine passion for V-Twin motorcycles.'
    },
    {
      icon: '⚡',
      title: 'Precision',
      description: 'Decades of experience ensure every custom build meets the highest standards of quality and performance.'
    },
    {
      icon: '🏆',
      title: 'Excellence',
      description: 'We don\'t just build motorcycles—we create rolling masterpieces that turn heads and drop jaws.'
    },
    {
      icon: '🤝',
      title: 'Partnership',
      description: 'Your vision combined with our expertise creates something truly special. We build relationships, not just bikes.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>
        <motion.div 
          className="absolute inset-0 bg-[url('/images/garage_atmosphere.png')] bg-cover bg-center opacity-20"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        />
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
            ABOUT <span className="text-amber-500">TURKEY CREEK</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto mb-6"></div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          
          {/* Left Side - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Where Legends Are Born
            </h3>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Nestled in Basehor, Kansas, Turkey Creek Cycles has been the heartbeat of custom V-Twin 
              culture for over two decades. What started as a passion project in a garage has evolved 
              into the region's premier destination for custom Harley builds and motorcycle fabrication.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Our shop isn't just about motorcycles—it's about brotherhood, craftsmanship, and the 
              relentless pursuit of perfection. Every bike that rolls through our doors gets the 
              attention it deserves, whether it's a simple tune-up or a complete ground-up custom build.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              We believe in the American spirit of freedom, rebellion, and the open road. That's why 
              every Turkey Creek Cycles build carries not just our signature craftsmanship, but the 
              soul of what makes riding a way of life.
            </p>

            {/* Quote */}
            <motion.div 
              className="border-l-4 border-amber-500 pl-6 py-4 bg-gradient-to-r from-amber-500/10 to-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-xl text-amber-400 italic font-medium">
                "We don't just build motorcycles. We build dreams, we build legends, 
                and we build the machines that carry your spirit down every mile of road ahead."
              </p>
              <p className="text-gray-400 mt-3">— Turkey Creek Cycles Team</p>
            </motion.div>
          </motion.div>

          {/* Right Side - Workshop Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="/images/workshop_hero.png" 
                alt="Turkey Creek Cycles Workshop" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Floating stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-amber-400 font-bold text-lg">Professional Workshop</p>
                  <p className="text-gray-300">State-of-the-art equipment & experienced craftsmen</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <div className="text-4xl lg:text-5xl font-bold text-amber-500 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 text-lg font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            What Drives Us
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors duration-300">
                  {value.title}
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/20 rounded-lg p-8"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Join the Legend?
          </h3>
          <p className="text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
            Visit our workshop in Basehor and see where the magic happens. 
            Let's discuss your next custom V-Twin project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="tel:913-432-4041"
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-black px-8 py-4 rounded-md font-bold text-lg hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-200 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CALL US NOW
            </motion.a>
            <motion.button
              className="border-2 border-amber-500 text-amber-500 px-8 py-4 rounded-md font-bold text-lg hover:bg-amber-500 hover:text-black transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              VISIT OUR SHOP
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;
