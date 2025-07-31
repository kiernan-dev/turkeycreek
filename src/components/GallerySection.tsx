import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const GallerySection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentCategory, setCurrentCategory] = useState('all');

  const galleryItems = [
    {
      id: 1,
      image: '/images/custom_harley_workshop.jpg',
      title: 'Custom Harley Build',
      category: 'custom',
      description: 'Complete ground-up custom build with chrome details'
    },
    {
      id: 2,
      image: '/images/chrome_engine_detail.jpeg',
      title: 'Chrome V-Twin Engine',
      category: 'engine',
      description: 'Fully rebuilt and chromed V-Twin powerplant'
    },
    {
      id: 3,
      image: '/images/welding_fabrication.jpg',
      title: 'Custom Fabrication',
      category: 'fabrication',
      description: 'Precision welding and metal fabrication work'
    },
    {
      id: 4,
      image: '/images/custom_chopper_chrome.jpg',
      title: 'Chrome Chopper',
      category: 'custom',
      description: 'Show-stopping chrome chopper build'
    },
    {
      id: 5,
      image: '/images/v_twin_engine_0.jpg',
      title: 'V-Twin Rebuild',
      category: 'engine',
      description: 'Complete engine rebuild with performance upgrades'
    },
    {
      id: 6,
      image: '/images/v_twin_engine_2.jpg',
      title: 'Engine Detail Work',
      category: 'engine',
      description: 'Precision engine work and detailing'
    },
    {
      id: 7,
      image: '/images/industrial_garage.jpg',
      title: 'Workshop Environment',
      category: 'shop',
      description: 'Professional workshop with state-of-the-art equipment'
    },
    {
      id: 8,
      image: '/images/v_twin_engine_4.jpg',
      title: 'Performance Engine',
      category: 'engine',
      description: 'High-performance V-Twin build'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'custom', name: 'Custom Builds' },
    { id: 'engine', name: 'Engine Work' },
    { id: 'fabrication', name: 'Fabrication' },
    { id: 'shop', name: 'Our Shop' }
  ];

  const filteredItems = currentCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === currentCategory);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const currentIndex = selectedImage;
    const maxIndex = filteredItems.length - 1;
    
    if (direction === 'prev') {
      setSelectedImage(currentIndex === 0 ? maxIndex : currentIndex - 1);
    } else {
      setSelectedImage(currentIndex === maxIndex ? 0 : currentIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'ArrowRight') navigateImage('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative">
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
            OUR <span className="text-amber-500">GALLERY</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Take a look at some of our finest work. Each project represents our commitment to 
            excellence and passion for custom V-Twin motorcycles.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setCurrentCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                currentCategory === category.id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-lg cursor-pointer aspect-square"
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center text-white p-4">
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-300">{item.description}</p>
                    </div>
                  </div>
                </div>

                {/* Hover Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500 transition-all duration-300 rounded-lg"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredItems[selectedImage].image}
                  alt={filteredItems[selectedImage].title}
                  className="w-full h-full object-contain rounded-lg"
                />
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {filteredItems[selectedImage].title}
                  </h3>
                  <p className="text-gray-300">
                    {filteredItems[selectedImage].description}
                  </p>
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default GallerySection;
