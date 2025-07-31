import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SimpleServicesSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      title: "Custom V-Twin Builds",
      description: "From ground-up custom builds to complete engine rebuilds, we craft V-Twin masterpieces that reflect your vision and riding style.",
      image: "/images/custom_harley_workshop.jpg",
      features: ["Engine Rebuilds", "Custom Frames", "Performance Tuning", "Electronic Systems"],
      icon: "🔧"
    },
    {
      title: "Professional Fabrication",
      description: "Expert metalwork and welding services for custom parts, frames, and modifications. We bring decades of fabrication expertise to every project.",
      image: "/images/welding_fabrication.jpg",
      features: ["Custom Parts", "Frame Modifications", "Exhaust Systems", "Mounting Brackets"],
      icon: "⚡"
    },
    {
      title: "Engine Performance",
      description: "Maximize your V-Twin's potential with our performance upgrades and precision tuning. We specialize in extracting every ounce of power.",
      image: "/images/engine_detail.png",
      features: ["Performance Cams", "High-Flow Intake", "Exhaust Upgrades", "ECU Tuning"],
      icon: "✨"
    },
    {
      title: "Restoration Services",
      description: "Bring classic motorcycles back to life with our comprehensive restoration services. We preserve history while upgrading performance.",
      image: "/images/garage_atmosphere.png",
      features: ["Complete Restoration", "Paint & Chrome", "Engine Rebuild", "Electrical Systems"],
      icon: "🚀"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            OUR <span className="text-amber-500">SERVICES</span>
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            At Turkey Creek Cycles, we offer comprehensive custom motorcycle services. 
            From complete rebuilds to precision fabrication, we bring decades of V-Twin expertise to every project.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative overflow-hidden bg-gray-800 hover:bg-gray-750 transition-all duration-300 min-h-[400px]"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `url('${service.image}')`,
                  filter: 'brightness(0.3)',
                }}
              />
              
              {/* Content Overlay */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                {/* Features List */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-3 h-0.5 bg-amber-500"></div>
                      <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Simple Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/50 transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-lg text-gray-300 mb-8">
            Ready to transform your motorcycle? Let's discuss your project.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 text-lg font-bold transition-colors duration-300"
          >
            Start Your Project
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default SimpleServicesSection;
