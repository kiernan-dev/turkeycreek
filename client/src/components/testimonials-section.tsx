import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Mike Johnson",
      role: "Harley Owner",
      initials: "MJ",
      text: "These guys are top mechanics. They handled my vintage Harley that the dealer couldn't fix. Quality work and honest pricing."
    },
    {
      name: "Rick Stevens", 
      role: "Custom Build Client",
      initials: "RS",
      text: "Amazing custom build work! They turned my vision into reality. The fabrication quality is incredible and the attention to detail is unmatched."
    },
    {
      name: "Dave Wilson",
      role: "Regular Customer", 
      initials: "DW",
      text: "Fast, reliable service. They know their stuff and always respond within 24 hours. My go-to shop for all my motorcycle needs."
    }
  ];

  const StarRating = () => (
    <div className="flex text-tcc-orange">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-5 w-5" fill="currentColor" />
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-tcc-black relative overflow-hidden">
      {/* Industrial Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ff6600' fill-opacity='0.08'%3E%3Cpath d='M40 40L0 0h80L40 40zM0 80h80L40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
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
            <Quote className="h-8 w-8 text-tcc-orange" />
            <div className="h-1 w-16 bg-tcc-orange ml-4"></div>
          </div>
          
          <h2 className="font-oswald text-5xl md:text-6xl text-white mb-2 tracking-wider">
            WHAT RIDERS <span className="text-tcc-orange">SAY</span>
          </h2>
          
          <div 
            className="bg-tcc-orange text-tcc-black px-6 py-3 mx-auto w-fit mb-6 relative"
            style={{
              clipPath: 'polygon(20px 0%, calc(100% - 20px) 0%, 100% 100%, 0% 100%)'
            }}
          >
            <p className="font-oswald text-lg font-bold tracking-widest">175+ FIVE-STAR REVIEWS</p>
            <div className="absolute inset-0 metallic-gradient opacity-30"></div>
          </div>
          
          <p className="text-xl text-gray-300 font-inter">From satisfied customers across Kansas City</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div 
                className="bg-tcc-dark-gray border-2 border-steel/40 p-8 relative overflow-hidden group-hover:border-tcc-orange/50 transition-all duration-300"
                style={{
                  clipPath: index % 2 === 0 
                    ? 'polygon(15px 0%, 100% 0%, calc(100% - 15px) 100%, 0% 100%)'
                    : 'polygon(0% 0%, calc(100% - 15px) 0%, 100% 100%, 15px 100%)'
                }}
              >
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-tcc-orange/30 mb-4" />
                
                {/* Star Rating */}
                <div className="flex items-center mb-6">
                  <StarRating />
                </div>
                
                {/* Testimonial Text */}
                <p className="text-gray-300 mb-8 font-inter text-lg leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                {/* Author Info */}
                <div className="flex items-center">
                  <div 
                    className="bg-tcc-orange h-12 w-12 flex items-center justify-center relative"
                    style={{
                      clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)'
                    }}
                  >
                    <span className="font-oswald text-tcc-black text-lg font-bold">{testimonial.initials}</span>
                    <div className="absolute inset-0 metallic-gradient opacity-40"></div>
                  </div>
                  <div className="ml-4">
                    <div className="font-oswald font-bold text-white text-lg tracking-wide">{testimonial.name}</div>
                    <div className="text-tcc-orange text-sm font-inter uppercase tracking-wider">{testimonial.role}</div>
                  </div>
                </div>
                
                {/* Background Effect */}
                <div className="absolute inset-0 metallic-gradient opacity-0 group-hover:opacity-5 transition-opacity"></div>
                
                {/* Industrial Corner Accents */}
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-tcc-orange/30"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-tcc-orange/30"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
