import { ArrowRight, Camera, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function GallerySection() {
  const galleryItems = [
    {
      image: "/images/builds/cta_patriot-chopper.png",
      title: "CUSTOM CHOPPER",
      description: "Vintage inspired build"
    },
    {
      image: "/images/builds/cta_v-twin-moto.png",
      title: "ENGINE REBUILD",
      description: "Complete restoration"
    },
    {
      image: "/images/builds/cta_tcc-knucklehead.png",
      title: "VINTAGE RESTORATION",
      description: "Classic Harley revival"
    },
    {
      image: "/images/builds/cta_tcc-black-street-glide.png",
      title: "STREET BAGGER",
      description: "Extended touring setup"
    },
    {
      image: "/images/builds/cta_tcc-frame-weld.png",
      title: "FABRICATION WORK",
      description: "Custom metalwork"
    },
    {
      image: "/images/builds/cta_tcc-performance.png",
      title: "PERFORMANCE BUILD",
      description: "Power and style"
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-tcc-dark-gray relative overflow-hidden">
      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff6600' fill-opacity='1'%3E%3Cpath d='M30 30L0 0h60L30 30zM0 60h60L30 30z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-16 bg-tcc-orange mr-4"></div>
            <Camera className="h-8 w-8 text-tcc-orange" />
            <div className="h-1 w-16 bg-tcc-orange ml-4"></div>
          </div>
          
          <h2 className="font-oswald text-5xl md:text-6xl text-white mb-2 tracking-wider">
            CUSTOM <span className="text-tcc-orange">BUILDS</span>
          </h2>
          
          <div 
            className="bg-tcc-orange text-tcc-black px-6 py-3 mx-auto w-fit mb-6 relative"
            style={{
              clipPath: 'polygon(20px 0%, calc(100% - 20px) 0%, 100% 100%, 0% 100%)'
            }}
          >
            <p className="font-oswald text-lg font-bold tracking-widest">GALLERY SHOWCASE</p>
            <div className="absolute inset-0 metallic-gradient opacity-30"></div>
          </div>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-inter">
            Check out some of our latest custom American V-Twin builds and fabrication work.
          </p>
        </motion.div>
        
        {/* Featured Build */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div 
            className="relative overflow-hidden border-4 border-steel"
            style={{
              clipPath: 'polygon(30px 0%, 100% 0%, calc(100% - 30px) 100%, 0% 100%)'
            }}
          >
            <img 
              src="/images/builds/tcc-bagger-white-4.jpg"
              alt="Featured Custom Road Glide Build"
              className="w-full h-96 md:h-[500px] object-cover gallery-vignette"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tcc-black/60 via-transparent to-transparent">
              <div className="absolute bottom-8 left-8 right-8">
                <div 
                  className="bg-tcc-orange text-tcc-black px-6 py-3 mb-4 w-fit relative"
                  style={{
                    clipPath: 'polygon(0% 0%, calc(100% - 15px) 0%, 100% 100%, 15px 100%)'
                  }}
                >
                  <span className="font-oswald text-sm font-bold tracking-widest">FEATURED BUILD</span>
                  <div className="absolute inset-0 metallic-gradient opacity-40"></div>
                </div>
                <h3 className="font-oswald text-3xl md:text-4xl text-white mb-2 tracking-wide">CUSTOM ROAD GLIDE</h3>
                <p className="text-gray-600 text-lg font-inter">Full custom fabrication with extended bags, custom paint, and performance upgrades.</p>
              </div>
            </div>
            <div className="absolute inset-0 metallic-gradient opacity-10"></div>
          </div>
        </motion.div>
        
        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div 
                className="relative overflow-hidden border-2 border-steel/40 group-hover:border-tcc-orange/60 transition-all duration-300"
                style={{
                  clipPath: index % 2 === 0 
                    ? 'polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%)'
                    : 'polygon(0% 0%, calc(100% - 15px) 0%, 100% 100%, 15px 100%)'
                }}
              >
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 gallery-vignette"
                />
                <div className="absolute inset-0 bg-tcc-black/10 group-hover:bg-tcc-black/5 transition-colors">
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div 
                      className="bg-tcc-orange text-tcc-black px-3 py-2 mb-2 w-fit relative"
                      style={{
                        clipPath: 'polygon(0% 0%, calc(100% - 8px) 0%, 100% 100%, 8px 100%)'
                      }}
                    >
                      <h4 className="font-oswald text-lg font-bold tracking-wider">{item.title}</h4>
                      <div className="absolute inset-0 metallic-gradient opacity-30"></div>
                    </div>
                    <p className="text-gray-300 text-sm font-inter">{item.description}</p>
                  </div>
                </div>
                <div className="absolute inset-0 metallic-gradient opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div 
            className="bg-tcc-orange hover:bg-tcc-orange-bright text-tcc-black px-8 py-4 font-oswald font-bold text-lg tracking-widest transition-all duration-300 inline-flex items-center cursor-pointer relative group"
            style={{
              clipPath: 'polygon(20px 0%, calc(100% - 20px) 0%, 100% 100%, 0% 100%)'
            }}
          >
            VIEW FULL GALLERY
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 metallic-gradient opacity-30"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
