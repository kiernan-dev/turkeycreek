import { Wrench, Settings, Zap, Package, Lightbulb, Flame, Cog, Bolt } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesSection() {
  const services = [
    {
      icon: <Wrench className="h-16 w-16 text-tcc-orange" />,
      title: "CUSTOM FABRICATION",
      subtitle: "Forge Your Vision",
      description: "Complete custom motorcycle builds, frames, and one-off fabrication work that brings your wildest dreams to life.",
      features: [
        "Custom frames & chassis",
        "Bagger conversions", 
        "Unique bodywork",
        "Specialty mounting"
      ],
      accent: "🔥",
      bgStyle: "rust-texture"
    },
    {
      icon: <Settings className="h-16 w-16 text-tcc-orange" />,
      title: "SERVICE & REPAIR",
      subtitle: "Resurrect The Beast",
      description: "Expert maintenance and repair services for all American V-Twin motorcycles, especially those vintage beasts others won't touch.",
      features: [
        "Engine rebuilds",
        "Transmission service",
        "Electrical diagnostics",
        "Vintage restorations"
      ],
      accent: "⚡",
      bgStyle: "metallic-gradient"
    },
    {
      icon: <Zap className="h-16 w-16 text-tcc-orange" />,
      title: "PERFORMANCE UPGRADES",
      subtitle: "Unleash The Power",
      description: "Boost your bike's power and performance with our proven upgrade packages and dyno tuning expertise.",
      features: [
        "Engine performance mods",
        "Exhaust systems",
        "Air intake upgrades",
        "Dyno tuning"
      ],
      accent: "🏎️",
      bgStyle: "flame-gradient"
    },
    {
      icon: <Package className="h-16 w-16 text-tcc-orange" />,
      title: "PARTS & ACCESSORIES",
      subtitle: "Gear For Legends",
      description: "Quality motorcycle parts, accessories, and supplies for your American V-Twin projects and daily rides.",
      features: [
        "OEM & aftermarket parts",
        "Custom accessories",
        "Maintenance supplies",
        "Special orders"
      ],
      accent: "🔧",
      bgStyle: "bg-steel"
    },
    {
      icon: <Lightbulb className="h-16 w-16 text-tcc-orange" />,
      title: "CONSULTATION",
      subtitle: "Battle Plans",
      description: "Expert advice and project planning for your custom motorcycle build or restoration project.",
      features: [
        "Build planning",
        "Cost estimation",
        "Technical advice",
        "Project timeline"
      ],
      accent: "💡",
      bgStyle: "bg-copper"
    }
  ];

  return (
    <section id="services" className="py-32 bg-tcc-dark-gray relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-l-4 border-b-4 border-rust transform rotate-45"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-r-4 border-t-4 border-copper transform -rotate-45"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-steel rounded-full opacity-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with aggressive styling */}
        <div className="text-center mb-20">
          <motion.div 
            className="inline-flex items-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-1 w-16 bg-tcc-orange mr-4"></div>
            <Cog className="h-8 w-8 text-tcc-orange" />
            <div className="h-1 w-16 bg-tcc-orange ml-4"></div>
          </motion.div>
          
          <motion.h2 
            className="font-staatliches text-6xl md:text-8xl text-white mb-6 text-shadow-gritty"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            OUR <span className="text-tcc-orange">SERVICES</span>
          </motion.h2>
          
          <motion.p 
            className="font-marker text-2xl md:text-3xl text-copper transform -rotate-1 mb-4"
            initial={{ opacity: 0, rotate: -5 }}
            whileInView={{ opacity: 1, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            "We Don't Just Fix 'Em..."
          </motion.p>
          <motion.p 
            className="font-oswald text-lg text-gray-300 max-w-4xl mx-auto tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            FROM CUSTOM FABRICATION TO PERFORMANCE UPGRADES • WE'RE YOUR ONE-STOP SHOP FOR AMERICAN V-TWIN EXCELLENCE
          </motion.p>
        </div>
        
        {/* Services Grid with extreme styling */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="group relative bg-tcc-black border-2 border-steel hover:border-tcc-orange transition-all duration-500 overflow-hidden card-tilt"
              style={{
                clipPath: index % 2 === 0 
                  ? 'polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%)'
                  : 'polygon(0% 0%, calc(100% - 15px) 0%, 100% 100%, 15px 100%)'
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, rotateY: 2 }}
            >
              {/* Background texture/gradient */}
              <div className={`absolute inset-0 ${service.bgStyle} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
              
              {/* Service icon and accent */}
              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="relative">
                    {service.icon}
                    <div className="absolute -inset-2 border border-tcc-orange/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity engine-pulse"></div>
                  </div>
                </div>
                
                {/* Service title and subtitle */}
                <div className="mb-6">
                  <h3 className="font-staatliches text-2xl text-white mb-2 group-hover:text-tcc-orange transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-marker text-lg text-copper transform -rotate-1">
                    {service.subtitle}
                  </p>
                </div>
                
                {/* Description */}
                <p className="text-gray-400 mb-8 font-oswald text-sm leading-relaxed">
                  {service.description}
                </p>
                
                {/* Features list with custom styling */}
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                      <Bolt className="h-3 w-3 text-tcc-orange mr-3 flex-shrink-0" />
                      <span className="font-oswald">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tcc-orange to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="inline-flex items-center">
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent to-tcc-orange mr-6"></div>
            <p className="font-marker text-xl text-copper">
              "Ready to Build Something Legendary?"
            </p>
            <div className="h-0.5 w-24 bg-gradient-to-l from-transparent to-tcc-orange ml-6"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
