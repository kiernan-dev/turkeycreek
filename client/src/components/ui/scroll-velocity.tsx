import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ScrollVelocityProps {
  children: ReactNode;
  baseVelocity: number;
  className?: string;
}

export default function ScrollVelocity({ 
  children, 
  baseVelocity = 100,
  className = ""
}: ScrollVelocityProps) {
  const baseX = useRef(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useSpring(
    useTransform(scrollY, (latest) => {
      const previous = scrollY.getPrevious() ?? 0;
      const velocity = latest - previous;
      baseX.current += velocity * (baseVelocity / 1000);
      return baseX.current;
    }),
    { stiffness: 100, damping: 30, restDelta: 0.001 }
  );

  return (
    <motion.div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{ x: scrollVelocity }}
    >
      {children}
    </motion.div>
  );
}