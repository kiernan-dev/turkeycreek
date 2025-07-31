import { Check, Wrench, Zap, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
  const expertisePoints = [
    {
      title: "Custom V-Twin Specialists",
      description: "Complete custom builds and modifications for American V-Twin motorcycles"
    },
    {
      title: "Vintage Restoration Experts", 
      description: "Bringing classic motorcycles back to life with authentic parts and techniques"
    },
    {
      title: "Performance & Fabrication",
      description: "Custom fabrication work and performance upgrades that deliver results"
    }
  ];

  return (
    <section id="about" className="py-24 bg-tcc-black relative overflow-hidden">
      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff6600' fill-opacity='0.1'%3E%3Cpath d='M20 20L0 0h40L20 20zM0 40h40L20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Header with Industrial Styling */}
              <div className="relative mb-8">
                <h2 className="font-oswald text-5xl md:text-6xl text-white mb-2 tracking-wider">
                  ABOUT
                </h2>
                <div 
                  className="bg-tcc-orange text-tcc-black px-6 py-4 mb-6 relative"
                  style={{
                    clipPath: 'polygon(0% 0%, calc(100% - 20px) 0%, 100% 100%, 20px 100%)'
                  }}
                >
                  <h3 className="font-oswald text-3xl md:text-4xl font-black tracking-widest">
                    TURKEY CREEK CYCLES
                  </h3>
                  <div className="absolute inset-0 metallic-gradient opacity-30"></div>
                </div>
              </div>

              {/* Story Content */}
              <div className="space-y-6 text-gray-300 text-lg font-inter leading-relaxed">
                <p className="text-xl text-white font-semibold border-l-4 border-tcc-orange pl-6">
                  Since 2008, Turkey Creek Cycles has been the premier destination for American V-Twin motorcycle 
                  fabrication, service, and performance work in Leavenworth County, Kansas.
                </p>
                <p>
                  Our team specializes in custom baggers, vintage restorations, and one-off fabrication projects 
                  that other shops won't touch. We're known throughout the Kansas City area for our expertise 
                  with classic Harley-Davidson models and complex custom builds.
                </p>
                <p>
                  With over 175 five-star customer reviews, we've built our reputation on quality craftsmanship, 
                  honest service, and a deep passion for American V-Twin motorcycles.
                </p>
              </div>
              
              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-oswald font-black text-tcc-orange">17+</div>
                  <div className="text-sm text-gray-400 font-inter">YEARS</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-oswald font-black text-tcc-orange">175+</div>
                  <div className="text-sm text-gray-400 font-inter">5-STAR REVIEWS</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-oswald font-black text-tcc-orange">1000+</div>
                  <div className="text-sm text-gray-400 font-inter">BIKES BUILT</div>
                </div>
              </div>
            </div>
            
            {/* Expertise Points with Industrial Styling */}
            <div className="mt-12 space-y-4">
              {expertisePoints.map((point, index) => (
                <motion.div 
                  key={index} 
                  className="relative group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div 
                    className="bg-steel/20 border border-steel/40 p-4 relative overflow-hidden group-hover:border-tcc-orange/50 transition-all duration-300"
                    style={{
                      clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)'
                    }}
                  >
                    <div className="flex items-start">
                      <div className="bg-tcc-orange p-2 mr-4" style={{
                        clipPath: 'polygon(0% 0%, calc(100% - 8px) 0%, 100% 100%, 8px 100%)'
                      }}>
                        {index === 0 && <Wrench className="h-5 w-5 text-tcc-black" />}
                        {index === 1 && <Award className="h-5 w-5 text-tcc-black" />}
                        {index === 2 && <Zap className="h-5 w-5 text-tcc-black" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-oswald font-bold text-white text-lg tracking-wide">{point.title}</h4>
                        <p className="text-gray-400 font-inter mt-1">{point.description}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 metallic-gradient opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Visual Section */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Main Image with Industrial Frame */}
              <div 
                className="relative overflow-hidden border-4 border-steel shadow-2xl"
                style={{
                  clipPath: 'polygon(20px 0%, 100% 0%, calc(100% - 20px) 100%, 0% 100%)'
                }}
              >
                <img 
                  src="/images/tcc-concept-signage-vertical.png"
                  alt="Turkey Creek Cycles Expert Mechanic"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 metallic-gradient opacity-20"></div>
              </div>
              
              {/* Est. 2008 Badge with Industrial Styling */}
              <div 
                className="absolute bottom-8 left-8 bg-tcc-orange text-tcc-black px-6 py-4 border-2 border-tcc-orange-bright relative"
                style={{
                  clipPath: 'polygon(0% 0%, calc(100% - 15px) 0%, 100% 100%, 15px 100%)'
                }}
              >
                <div className="font-oswald text-2xl font-black tracking-widest">EST. 2008</div>
                <div className="text-sm font-inter font-bold">17+ YEARS EXPERIENCE</div>
                <div className="absolute inset-0 metallic-gradient opacity-40"></div>
              </div>

              {/* Industrial Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-tcc-orange"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-tcc-orange"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
