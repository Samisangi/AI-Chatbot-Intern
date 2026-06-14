'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@/hooks/useChat';
import ChatHeader from './ChatHeader';
import ChatWindow from './ChatWindow';
import InputField from './InputField';
import SuggestionChips from './SuggestionChips';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, sendMessage, clearChat, error } = useChat();

  const showSuggestions = messages.length === 0;

  const handleSuggestionClick = (text: string) => {
    sendMessage(text);
  };

  const floatingButtonVariants = {
    initial: { scale: 0, opacity: 0, rotate: -180 },
    animate: { scale: 1, opacity: 1, rotate: 0 },
    exit: { scale: 0, opacity: 0, rotate: 180 },
  };

  const chatWindowVariants = {
    initial: { opacity: 0, scale: 0.9, y: 50 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 50 },
  };

  return (
    <>
      {/* Floating Chat Button - Futuristic Design */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.button
            key="chatButton"
            data-chat-button
            variants={floatingButtonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.1, y: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 group z-50"
          >
            {/* Glow effect rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-futuristic-accent via-futuristic-userStart to-purple-500 opacity-60 blur-2xl animate-pulse"></div>
            <div className="absolute inset-0 rounded-full bg-futuristic-accent/40 animate-ping"></div>
            
            {/* Main button container */}
            <div className="relative flex flex-col items-center gap-3 px-8 py-6 rounded-3xl
            bg-gradient-to-br from-futuristic-userStart via-futuristic-userEnd to-futuristic-accent
            shadow-2xl border-2 border-futuristic-accent/30 backdrop-blur-xl
            transition-all duration-500 overflow-hidden min-w-[160px]">
              
              {/* Animated background shimmer */}
              <motion.div
                animate={{ 
                  x: ['-100%', '100%'],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
              
              {/* AI Robot Icon with pulse ring */}
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    y: [0, -4, 0]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-6xl drop-shadow-2xl relative z-10 filter brightness-110"
                >
                  🤖
                </motion.div>
                
                {/* Pulse ring animation */}
                <div className="absolute inset-0 -m-2">
                  <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping opacity-75"></div>
                  <div className="absolute inset-0 rounded-full border-2 border-green-300"></div>
                </div>
                
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-2 border-white shadow-lg shadow-green-500/50"></span>
                </div>
              </div>
              
              {/* Text labels */}
              <div className="flex flex-col items-center gap-1 relative z-10">
                <motion.span
                  animate={{ 
                    opacity: [0.9, 1, 0.9]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-lg font-black tracking-wide text-white drop-shadow-lg"
                  style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}
                >
                  AI Assistant
                </motion.span>
                <span className="text-[11px] font-semibold text-futuristic-accent tracking-widest uppercase">
                  Click to Chat
                </span>
              </div>
              
              {/* Sparkle effect */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-2 right-2 text-yellow-300 text-xl opacity-80"
              >
                ✨
              </motion.div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window - Sleek Futuristic Design */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="chatWindow"
            variants={chatWindowVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
            className="fixed bottom-8 right-8 w-[48vw] min-w-[650px] max-w-[900px] h-[88vh] 
            rounded-[24px] flex flex-col overflow-hidden z-50
            bg-gradient-to-br from-futuristic-background via-[#0D1425] to-futuristic-botBubble
            backdrop-blur-2xl border-2 border-futuristic-accent/20
            shadow-[0_25px_80px_-15px_rgba(0,209,255,0.4),0_0_100px_rgba(0,102,255,0.2),inset_0_1px_0_rgba(255,255,255,0.1)]
            md:w-[95vw] md:min-w-0 md:h-[95vh] md:bottom-0 md:right-0 md:rounded-none"
          >
            {/* Animated glow border effect */}
            <div className="absolute inset-0 rounded-[24px] opacity-50 pointer-events-none">
              <motion.div
                animate={{ 
                  rotate: 360,
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 rounded-[24px]"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(0, 209, 255, 0.4), transparent)'
                }}
              />
            </div>

            {/* Header */}
            <ChatHeader
              onClose={() => setIsOpen(false)}
              onClear={clearChat}
            />

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 bg-red-500/20 border-l-4 border-red-500 text-red-300 text-sm rounded-r-lg mx-4 mt-2
                backdrop-blur-md shadow-lg"
              >
                <span className="font-semibold">⚠️ Error: </span>{error}
              </motion.div>
            )}

            {/* Chat Messages */}
            <ChatWindow messages={messages} isLoading={isLoading} />

            {/* Quick Reply Suggestions */}
            {showSuggestions && (
              <SuggestionChips
                suggestions={[
                  { id: '1', text: '🎓 Learn AI Courses' },
                  { id: '2', text: '📞 Book a Call' },
                  { id: '3', text: '🚀 Explore Services' },
                  { id: '4', text: '💼 Business Automation' },
                ]}
                onSelect={handleSuggestionClick}
                isLoading={isLoading}
              />
            )}

            {/* Input Field */}
            <InputField onSend={sendMessage} isLoading={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
