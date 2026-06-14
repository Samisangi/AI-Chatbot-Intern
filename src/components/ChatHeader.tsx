'use client';

import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { GrRefresh } from 'react-icons/gr';
import { IoSettingsSharp, IoRemoveOutline } from 'react-icons/io5';

interface ChatHeaderProps {
  onClose: () => void;
  onClear: () => void;
}

export default function ChatHeader({ onClose, onClear }: ChatHeaderProps) {
  return (
    <div className="relative px-6 py-5 border-b border-futuristic-accent/10 
    bg-gradient-to-r from-futuristic-botBubble/80 via-futuristic-background/60 to-futuristic-botBubble/80
    backdrop-blur-xl">
      
      {/* Glow line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-futuristic-accent to-transparent opacity-50"></div>
      
      <div className="flex items-center justify-between">
        {/* Left: Avatar + Title */}
        <div className="flex items-center gap-4">
          {/* Avatar with glowing pulse ring */}
          <div className="relative">
            <motion.div
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(0, 209, 255, 0.4)',
                  '0 0 40px rgba(0, 209, 255, 0.8)',
                  '0 0 20px rgba(0, 209, 255, 0.4)'
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-futuristic-userStart to-futuristic-accent 
              flex items-center justify-center text-2xl border-2 border-futuristic-accent/30
              shadow-lg shadow-futuristic-accent/40"
            >
              🤖
            </motion.div>
            
            {/* Animated pulse rings */}
            <div className="absolute inset-0 rounded-full">
              <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-40"></div>
            </div>
            
            {/* Online indicator */}
            <div className="absolute bottom-0 right-0 flex">
              <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-futuristic-background
              shadow-lg shadow-green-500/60"></span>
            </div>
          </div>

          {/* Title and status */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-futuristic-textMain tracking-tight"
                style={{ textShadow: '0 0 10px rgba(0, 209, 255, 0.3)' }}>
                TheNetrider AI
              </h2>
              <motion.span
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full
                bg-gradient-to-r from-futuristic-accent/20 to-futuristic-userStart/20 
                text-futuristic-accent border border-futuristic-accent/40 shadow-lg shadow-futuristic-accent/20"
              >
                Pro
              </motion.span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/60"
              />
              <p className="text-sm text-futuristic-textSecondary font-medium">
                Online & Ready to Help
              </p>
            </div>
          </div>
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-2">
          {/* Minimize button */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 209, 255, 0.2)' }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-xl bg-futuristic-botBubble/60 text-futuristic-textSecondary 
            hover:text-futuristic-accent transition-all duration-200 border border-transparent
            hover:border-futuristic-accent/30 hover:shadow-lg hover:shadow-futuristic-accent/20"
            title="Minimize"
          >
            <IoRemoveOutline size={20} />
          </motion.button>

          {/* Settings button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90, backgroundColor: 'rgba(0, 209, 255, 0.2)' }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-xl bg-futuristic-botBubble/60 text-futuristic-textSecondary 
            hover:text-futuristic-accent transition-all duration-300 border border-transparent
            hover:border-futuristic-accent/30 hover:shadow-lg hover:shadow-futuristic-accent/20"
            title="Settings"
          >
            <IoSettingsSharp size={20} />
          </motion.button>

          {/* Clear chat button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180, backgroundColor: 'rgba(0, 209, 255, 0.2)' }}
            whileTap={{ scale: 0.9 }}
            onClick={onClear}
            className="p-2.5 rounded-xl bg-futuristic-botBubble/60 text-futuristic-textSecondary 
            hover:text-futuristic-accent transition-all duration-300 border border-transparent
            hover:border-futuristic-accent/30 hover:shadow-lg hover:shadow-futuristic-accent/20"
            title="Clear chat"
          >
            <GrRefresh size={18} />
          </motion.button>

          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2.5 rounded-xl bg-futuristic-botBubble/60 text-futuristic-textSecondary 
            hover:text-red-400 transition-all duration-200 border border-transparent
            hover:border-red-400/30 hover:shadow-lg hover:shadow-red-400/20"
            title="Close"
          >
            <MdClose size={22} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
