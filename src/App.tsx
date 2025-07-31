import React, { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoHeroSection from './components/VideoHeroSection';
import SimpleServicesSection from './components/SimpleServicesSection';
import GallerySection from './components/GallerySection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Navigation from './components/Navigation';
import LoadingScreen from './components/LoadingScreen';

import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fast loading for clean, business-focused design
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App relative overflow-x-hidden bg-black">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <Navigation />
          
          <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-white text-xl">Loading...</div>
          </div>}>
            <main className="relative">
              <VideoHeroSection />
              <SimpleServicesSection />
              <GallerySection />
              <AboutSection />
              <ContactSection />
            </main>
          </Suspense>
        </>
      )}
    </div>
  );
}

export default App;
