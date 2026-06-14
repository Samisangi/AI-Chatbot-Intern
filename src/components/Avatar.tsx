'use client';

import { motion } from 'framer-motion';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  isOnline?: boolean;
}

export default function Avatar({
  size = 'md',
  animated = true,
  isOnline = true,
}: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  const containerVariants = {
    idle: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity },
    },
  };

  return (
    <motion.div
      initial={false}
      animate={animated ? 'animate' : 'idle'}
      variants={containerVariants}
      className="relative"
    >
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold text-white
        bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg
        ${animated ? 'shadow-glow-cyan' : ''}`}
      >
        <span>🤖</span>
      </div>

      {isOnline && (
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white shadow-md"></div>
      )}
    </motion.div>
  );
}
