import React, { useState, useEffect } from 'react';

const SimpleHeroSection: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      
      {/* Full Viewport Background Image with Cinematic Effects */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0 transform transition-transform duration-[20s] ease-in-out"
        style={{
          backgroundImage: 'url(/images/workshop_hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw',
          height: '100vh',
          animation: 'subtle-zoom 20s ease-in-out infinite alternate',
        }}
      />
      
      {/* Animated Dark Overlay with Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/60 via-black/40 to-black/70 z-10" />
      
      {/* Subtle Animated Sparks Effect */}
      <div className="absolute top-0 left-0 w-full h-full z-15 opacity-30">
        <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-amber-400 rounded-full animate-pulse" 
             style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-1/2 right-1/4 w-0.5 h-0.5 bg-orange-400 rounded-full animate-pulse" 
             style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute top-3/4 right-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" 
             style={{ animationDelay: '2s', animationDuration: '2s' }} />
      </div>
      
      {/* Content Overlay with Enhanced Animations */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center min-h-screen">
          
          {/* Left Side - Business Information */}
          <div className={`w-full lg:w-3/5 lg:pr-12 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            
            {/* Company Name with Dramatic Entrance */}
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight transition-all duration-1500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
                style={{
                  textShadow: '0 0 30px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.5)',
                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.9))'
                }}>
              TURKEY CREEK
              <br />
              <span className="text-amber-500 relative">
                CYCLES
                <div className="absolute -inset-1 bg-amber-500/20 blur-xl rounded-lg animate-pulse" />
              </span>
            </h1>
            
            {/* Tagline with Glow Effect */}
            <p className={`text-xl sm:text-2xl text-amber-500 font-semibold mb-8 transition-all duration-1500 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
               style={{
                 textShadow: '0 0 20px rgba(245, 158, 11, 0.5), 0 0 40px rgba(245, 158, 11, 0.3)',
                 filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))'
               }}>
              Custom V-Twin Specialists
            </p>
            
            {/* Services List with Staggered Animation */}
            <div className={`mb-8 transition-all duration-1500 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="flex flex-wrap gap-4 text-lg text-gray-200"
                   style={{ 
                     textShadow: '0 0 15px rgba(0,0,0,0.8)',
                     filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.9))'
                   }}>
                <span className="hover:text-amber-400 transition-colors duration-300">Custom Builds</span>
                <span className="text-amber-500 animate-pulse">•</span>
                <span className="hover:text-amber-400 transition-colors duration-300">Fabrication</span>
                <span className="text-amber-500 animate-pulse">•</span>
                <span className="hover:text-amber-400 transition-colors duration-300">Restoration</span>
              </div>
            </div>
            
            {/* Business Information with Enhanced Shadow */}
            <div className={`mb-8 space-y-2 transition-all duration-1500 delay-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <p className="text-lg text-gray-200"
                 style={{ 
                   textShadow: '0 0 15px rgba(0,0,0,0.8)',
                   filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.9))'
                 }}>
                20476 147th St, Basehor, KS 66007
              </p>
              <p className="text-xl text-white font-semibold"
                 style={{ 
                   textShadow: '0 0 20px rgba(0,0,0,0.8)',
                   filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.9))'
                 }}>
                913-432-4041
              </p>
            </div>
            
            {/* CTA Buttons with Enhanced Effects */}
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1500 delay-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <button
                onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 text-lg font-bold transition-all duration-300 shadow-2xl hover:shadow-amber-500/25 hover:scale-105 transform relative overflow-hidden group"
              >
                <span className="relative z-10">View Gallery</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black px-8 py-4 text-lg font-bold transition-all duration-300 backdrop-blur-sm bg-black/20 shadow-2xl hover:shadow-amber-500/25 hover:scale-105 transform relative overflow-hidden group"
              >
                <span className="relative z-10">Get Quote</span>
                <div className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
            
          </div>
          
        </div>
      </div>
      

    </section>
  );
};

export default SimpleHeroSection;
