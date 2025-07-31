import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-tcc-orange hover:bg-tcc-orange-bright text-tcc-black p-4 transition-all duration-300 group"
          style={{
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
          }}
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 0 20px rgba(255, 102, 0, 0.5)" 
          }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronUp className="h-6 w-6 group-hover:animate-bounce" />
          <div className="absolute inset-0 metallic-gradient opacity-0 group-hover:opacity-30 transition-opacity"></div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}