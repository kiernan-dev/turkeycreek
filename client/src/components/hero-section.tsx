import { ArrowRight, Flame, Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuroraText from "@/components/ui/aurora-text";
import HyperText from "@/components/ui/hyper-text";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const target = document.querySelector(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Background carousel images
  const backgroundImages = [
    "/images/hero-1.jpg",
    "/images/hero-2.jpg", 
    "/images/hero-3.jpg",
    "/images/concept-bike-lift.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [iterations, setIterations] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating || iterations >= 5) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex: number) => {
        const nextIndex = (prevIndex + 1) % backgroundImages.length;
        
        // If we've completed a full cycle, increment iterations
        if (nextIndex === 0) {
          setIterations((prev: number) => {
            const newIterations = prev + 1;
            if (newIterations >= 5) {
              setIsAnimating(false);
            }
            return newIterations;
          });
        }
        
        return nextIndex;
      });
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length, iterations, isAnimating]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background Carousel */}
      <div className="absolute inset-0">
        {/* Base dark background */}
        <div className="absolute inset-0 bg-tcc-black"></div>
        
        {/* Animated motorcycle image carousel - Left to Right Sliding */}
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
            style={{
              backgroundImage: `url('${backgroundImages[currentImageIndex]}')`
            }}
            initial={{ 
              x: "100%"
            }}
            animate={{ 
              x: "0%"
            }}
            exit={{ 
              x: "-100%"
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          />
        </AnimatePresence>

        {/* Subtle static orange glow overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-tcc-orange/5 via-transparent to-transparent"></div>
        
        {/* Static smoke/fire overlay */}
        <div className="absolute inset-0 smoke-overlay opacity-30"></div>
        
        {/* Rust texture overlay */}
        <div className="absolute bottom-0 left-0 w-full h-32 rust-texture opacity-30"></div>
        
        {/* Animated subtle ambient dots */}
        <motion.div 
          className="absolute top-20 right-20 w-1 h-1 bg-tcc-orange rounded-full"
          animate={isAnimating ? {
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1]
          } : { opacity: 0.4 }}
          transition={{
            duration: 3,
            repeat: iterations < 5 ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-32 right-32 w-0.5 h-0.5 bg-yellow-400 rounded-full"
          animate={isAnimating ? {
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.5, 1]
          } : { opacity: 0.3 }}
          transition={{
            duration: 2.5,
            delay: 0.5,
            repeat: iterations < 5 ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-28 right-16 w-0.5 h-0.5 bg-orange-300 rounded-full"
          animate={isAnimating ? {
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1]
          } : { opacity: 0.2 }}
          transition={{
            duration: 3.5,
            delay: 1,
            repeat: iterations < 5 ? Infinity : 0,
            ease: "easeInOut"
          }}
        />

        {/* Iteration counter for debugging (remove in production) */}
        {/* <div className="absolute top-4 left-4 text-white bg-black/50 px-2 py-1 rounded text-sm">
          Iteration: {iterations}/5 | Image: {currentImageIndex + 1}/{backgroundImages.length}
        </div> */}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-6xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center bg-rust/80 backdrop-blur-gritty border border-copper/50 px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Flame className="h-4 w-4 text-tcc-orange mr-2" />
            <span className="font-oswald text-xs text-orange-200 tracking-wider">EST. 2008 • BASEHOR, KANSAS</span>
          </motion.div>
          
          {/* Main headline with enhanced prominence for wide screens */}
          <h1 className="font-staatliches text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight text-white mb-8 text-shadow-gritty">
            <motion.span 
              className="inline-block mr-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              TURKEY
            </motion.span>
            <AuroraText className="inline-block text-tcc-orange mr-4">
              <HyperText text="CREEK" />
            </AuroraText>
            <motion.span 
              className="inline-block relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              CYCLES
              <div className="absolute -top-2 -right-4 w-8 h-0.5 bg-tcc-orange transform rotate-12 opacity-60"></div>
            </motion.span>
          </h1>
          
          {/* Tagline with marker font */}
          <motion.div 
            className="relative mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <p className="font-marker text-2xl md:text-4xl text-copper mb-4 transform -rotate-2">
              "We Build Legends"
            </p>
            <p className="font-oswald text-lg md:text-xl text-gray-300 max-w-2xl">
              CUSTOM V-TWIN FABRICATION • PERFORMANCE BUILDS • VINTAGE RESTORATIONS
            </p>
          </motion.div>
          
          {/* CTA Buttons with industrial styling */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <motion.button
              onClick={() => scrollToSection("#services")}
              className="group relative bg-tcc-orange hover:bg-tcc-orange-bright text-tcc-black px-10 py-5 font-oswald text-lg font-bold transition-all duration-300 overflow-hidden"
              style={{
                clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                <Wrench className="mr-3 h-5 w-5" />
                VIEW SERVICES
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 metallic-gradient opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection("#gallery")}
              className="group relative border-2 border-chrome hover:border-tcc-orange text-chrome hover:text-tcc-orange px-10 py-5 font-oswald text-lg font-bold transition-all duration-300 backdrop-blur-gritty"
              style={{
                clipPath: 'polygon(0% 0%, calc(100% - 10px) 0%, 100% 100%, 10px 100%)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center">
                <Flame className="mr-3 h-5 w-5" />
                SEE THE BUILDS
              </span>
            </motion.button>
          </motion.div>
          
          {/* Stats with metal styling and card backgrounds */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            {[
              { number: "17+", label: "YEARS FORGING IRON", icon: "🔥" },
              { number: "500+", label: "CUSTOM BEASTS BUILT", icon: "⚡" },
              { number: "175+", label: "RIDERS SATISFIED", icon: "🤘" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="relative text-center group card-tilt bg-rust/20 backdrop-blur-gritty border border-copper/30 rounded-lg p-6 hover:bg-rust/30 hover:border-tcc-orange/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + (index * 0.2), duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-copper/5 to-transparent rounded-lg"></div>
                <div className="relative z-10">
                  <div className="relative mb-3">
                    <div className="font-staatliches text-5xl md:text-6xl text-tcc-orange transition-all duration-300 group-hover:text-tcc-orange-bright">
                      {stat.number}
                    </div>
                    <div className="absolute -top-2 -right-2 text-2xl opacity-70 group-hover:opacity-100 transition-opacity">{stat.icon}</div>
                  </div>
                  <div className="font-oswald text-xs text-gray-300 group-hover:text-gray-200 tracking-widest transition-colors">
                    {stat.label}
                  </div>
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-steel to-transparent mt-3 group-hover:via-tcc-orange transition-colors"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 w-16 h-16 border-l-2 border-b-2 border-rust opacity-30"></div>
      <div className="absolute top-10 right-10 w-16 h-16 border-r-2 border-t-2 border-copper opacity-30"></div>
    </section>
  );
}
