'use client';

import { motion } from 'framer-motion';

interface AnimatedDotsProps {
  size?: 'sm' | 'md';
  color?: 'blue' | 'white' | 'cyan';
}

export default function AnimatedDots({
  size = 'md',
  color = 'white',
}: AnimatedDotsProps) {
  const dotSize = size === 'sm' ? 2 : 3;
  const colorClass = 
    color === 'blue' ? 'bg-blue-400' : 
    color === 'cyan' ? 'bg-cyan-400' : 
    'bg-white';

  const containerVariants = {
    animate: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const dotVariants = {
    animate: {
      y: [0, -8, 0],
      transition: { duration: 0.6, repeat: Infinity },
    },
  };

  return (
    <motion.div
      className="flex gap-1"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-${dotSize} h-${dotSize} rounded-full ${colorClass}`}
          variants={dotVariants}
        />
      ))}
    </motion.div>
  );
}
