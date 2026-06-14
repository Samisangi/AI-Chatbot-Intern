'use client';

import { motion } from 'framer-motion';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { formatTime } from '@/utils/helpers';
import AnimatedDots from './AnimatedDots';

interface ChatMessageProps {
  message: ChatMessageType;
  index: number;
  showAvatar?: boolean;
}

export default function ChatMessage({ message, index, showAvatar = true }: ChatMessageProps) {
  const isUser = message.role === 'user';

  const messageVariants = {
    initial: { opacity: 0, x: isUser ? 20 : -20, scale: 0.9 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  // Reduce spacing for grouped bot messages
  const marginBottom = !isUser && !showAvatar ? 'mb-2' : 'mb-5';

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={messageVariants}
      transition={{ duration: 0.4, delay: index * 0.05, type: "spring" }}
      className={`flex gap-3 ${marginBottom} ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Bot Avatar - Only show when showAvatar is true */}
      {!isUser && showAvatar && (
        <motion.div
          animate={{ 
            boxShadow: [
              '0 0 10px rgba(0, 209, 255, 0.3)',
              '0 0 20px rgba(0, 209, 255, 0.6)',
              '0 0 10px rgba(0, 209, 255, 0.3)'
            ]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-futuristic-userStart to-futuristic-accent 
          flex items-center justify-center text-lg flex-shrink-0 border-2 border-futuristic-accent/30
          shadow-lg shadow-futuristic-accent/30"
        >
          🤖
        </motion.div>
      )}
      
      {/* Spacer when avatar is hidden but message is from bot */}
      {!isUser && !showAvatar && (
        <div className="w-10 flex-shrink-0"></div>
      )}

      {/* Message Content */}
      <div
        className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] sm:max-w-[75%] md:max-w-[70%] lg:max-w-[65%]`}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`px-5 py-4 rounded-2xl transition-all duration-300 break-words relative overflow-hidden ${
            isUser
              ? 'bg-gradient-to-r from-futuristic-userStart to-futuristic-userEnd text-futuristic-textMain rounded-br-sm shadow-lg shadow-futuristic-userStart/30'
              : 'bg-futuristic-botBubble backdrop-blur-md text-futuristic-textMain rounded-bl-sm border border-futuristic-accent/20 shadow-md'
          }`}
        >
          {/* Glow effect for user messages */}
          {isUser && (
            <div className="absolute inset-0 bg-gradient-to-r from-futuristic-accent/10 to-transparent rounded-2xl opacity-50"></div>
          )}
          
          {/* Message text or typing indicator */}
          <div className="relative z-10">
            {message.isStreaming ? (
              <AnimatedDots size="sm" color={isUser ? "white" : "cyan"} />
            ) : (
              <p className="text-[15px] sm:text-base leading-relaxed whitespace-pre-wrap" style={{ lineHeight: '1.6' }}>
                {message.content}
              </p>
            )}
          </div>
        </motion.div>

        {/* Timestamp */}
        <span className="text-xs text-futuristic-textSecondary/60 mt-1.5 px-2 font-medium">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </motion.div>
  );
}
