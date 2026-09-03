import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function SectionReveal({ children, delay = 0, className = "" }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ 
        duration: 0.55, 
        delay: delay,
        ease: [0.215, 0.61, 0.355, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

