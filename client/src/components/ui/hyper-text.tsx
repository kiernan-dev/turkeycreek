import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface HyperTextProps {
  text: string;
  className?: string;
  animateOnLoad?: boolean;
}

export default function HyperText({ 
  text, 
  className = "", 
  animateOnLoad = true 
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(animateOnLoad ? "" : text);
  const [currentIndex, setCurrentIndex] = useState(0);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  useEffect(() => {
    if (!animateOnLoad) return;

    const interval = setInterval(() => {
      setDisplayText((prev) => {
        const next = prev
          .split("")
          .map((char, index) => {
            if (index < currentIndex) {
              return text[index];
            }
            if (index === currentIndex) {
              return text[index];
            }
            return alphabet[Math.floor(Math.random() * alphabet.length)];
          })
          .join("");

        return next;
      });

      if (currentIndex < text.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentIndex, text, animateOnLoad]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  );
}