'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import ChatMessage from './ChatMessage';
import AnimatedDots from './AnimatedDots';

interface ChatWindowProps {
  messages: ChatMessageType[];
  isLoading: boolean;
}

export default function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-5 space-y-3 scrollbar-hide
      [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/5
      [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:hover:bg-white/30"
    >
      {messages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full flex flex-col items-center justify-center text-center px-6"
        >
          <div className="text-5xl mb-4">👋</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Welcome to TheNetrider AI Assistant
          </h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-md leading-relaxed">
            I'm here to help you learn about our services, courses, and digital marketing strategies.
            Ask me anything!
          </p>
        </motion.div>
      ) : (
        <>
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => {
              // Check if previous message is also from bot (for avatar grouping)
              const prevMessage = index > 0 ? messages[index - 1] : null;
              const showAvatar = message.role === 'assistant' && 
                (!prevMessage || prevMessage.role !== 'assistant');
              
              return (
                <ChatMessage
                  key={message.id}
                  message={message}
                  index={index}
                  showAvatar={showAvatar}
                />
              );
            })}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 mb-4"
            >
              {/* Bot avatar - only show if last message wasn't from bot */}
              {messages.length === 0 || messages[messages.length - 1]?.role !== 'assistant' ? (
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
              ) : (
                <div className="w-10 flex-shrink-0"></div>
              )}
              
              {/* Typing indicator */}
              <div className="bg-futuristic-botBubble backdrop-blur-md px-5 py-3.5 rounded-2xl rounded-bl-sm 
              border border-futuristic-accent/20 shadow-md">
                <AnimatedDots size="sm" color="cyan" />
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
