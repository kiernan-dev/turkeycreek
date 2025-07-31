import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AuroraTextProps {
  children: ReactNode;
  className?: string;
}

export default function AuroraText({ children, className = "" }: AuroraTextProps) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative z-10">{children}</div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-tcc-orange/20 via-yellow-400/20 to-tcc-orange/20 blur-sm"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundSize: "200% 100%",
        }}
      />
    </motion.div>
  );
}