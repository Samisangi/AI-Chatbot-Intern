'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { IoSend, IoMic, IoImage, IoDocument, IoAttach } from 'react-icons/io5';
import { isEmpty } from '@/utils/helpers';

interface InputFieldProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function InputField({ onSend, isLoading }: InputFieldProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!isEmpty(input) && !isLoading) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  };

  const handleFileUpload = (type: string, accept: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('⚠️ File too large! Maximum size is 5MB');
          return;
        }
        
        // Show file selected notification
        const reader = new FileReader();
        reader.onload = (event) => {
          const preview = event.target?.result;
          // For now, just show what was selected
          onSend(`[${type} uploaded: ${file.name}]\n\nNote: File processing will be added in the next update. For now, you can describe what you need help with!`);
        };
        
        if (type === 'Image') {
          reader.readAsDataURL(file);
        } else {
          reader.readAsText(file);
        }
      }
    };
    input.click();
  };

  return (
    <div className="p-6 border-t border-futuristic-accent/10 backdrop-blur-xl 
    bg-gradient-to-t from-futuristic-botBubble/60 to-transparent relative">
      
      {/* Glow line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-futuristic-accent to-transparent opacity-50"></div>

      {/* Input Container - Pill-shaped */}
      <div className={`relative flex items-end gap-3 px-5 py-3.5 rounded-full
      bg-futuristic-botBubble/80 backdrop-blur-md border-2 transition-all duration-300
      ${isFocused 
        ? 'border-futuristic-accent shadow-lg shadow-futuristic-accent/30' 
        : 'border-futuristic-accent/20 hover:border-futuristic-accent/40'
      }`}>
        
        {/* Left side icons */}
        <div className="flex items-center gap-2 flex-shrink-0 pb-1">
          {/* Mic button */}
          <motion.button
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleFileUpload('Voice', 'audio/*')}
            className="p-2 rounded-full bg-futuristic-accent/10 text-futuristic-accent 
            hover:bg-futuristic-accent/20 border border-futuristic-accent/30
            hover:shadow-lg hover:shadow-futuristic-accent/30 transition-all duration-200"
            title="Upload Voice 🎤"
          >
            <IoMic size={18} />
          </motion.button>

          {/* Attachment button */}
          <motion.button
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleFileUpload('File', '*')}
            className="p-2 rounded-full bg-futuristic-userStart/10 text-futuristic-userStart 
            hover:bg-futuristic-userStart/20 border border-futuristic-userStart/30
            hover:shadow-lg hover:shadow-futuristic-userStart/30 transition-all duration-200"
            title="Attach File 📎"
          >
            <IoAttach size={18} />
          </motion.button>

          {/* Image button */}
          <motion.button
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleFileUpload('Image', 'image/*')}
            className="p-2 rounded-full bg-purple-500/10 text-purple-400 
            hover:bg-purple-500/20 border border-purple-500/30
            hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
            title="Upload Image 📷"
          >
            <IoImage size={18} />
          </motion.button>

          {/* Document button */}
          <motion.button
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleFileUpload('Document', '.pdf,.doc,.docx,.txt')}
            className="p-2 rounded-full bg-green-500/10 text-green-400 
            hover:bg-green-500/20 border border-green-500/30
            hover:shadow-lg hover:shadow-green-500/30 transition-all duration-200"
            title="Upload Document 📄"
          >
            <IoDocument size={18} />
          </motion.button>
        </div>

        {/* Textarea input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="💬 Ask me about AI courses, marketing, or business automation…"
            disabled={isLoading}
            rows={1}
            className="w-full px-4 py-2.5 bg-transparent text-futuristic-textMain
            placeholder-futuristic-textSecondary/50 
            transition-all duration-200 outline-none disabled:opacity-50 resize-none
            text-[15px] leading-relaxed"
            style={{
              minHeight: '42px',
              maxHeight: '120px'
            }}
          />
        </div>

        {/* Send button - Glowing */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: -8 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSend}
          disabled={isEmpty(input) || isLoading}
          className="rounded-full bg-gradient-to-r from-futuristic-userStart to-futuristic-accent 
          text-white disabled:opacity-40 disabled:cursor-not-allowed 
          transition-all duration-300 disabled:hover:scale-100
          relative overflow-hidden group flex-shrink-0 flex items-center justify-center
          border-2 border-futuristic-accent/30 hover:border-futuristic-accent
          shadow-lg hover:shadow-futuristic-accent/60"
          style={{
            width: '48px',
            height: '48px',
            minWidth: '48px',
            minHeight: '48px',
          }}
        >
          {/* Hover glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-futuristic-accent to-futuristic-userEnd 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          
          {/* Send icon */}
          <IoSend size={20} className="relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          
          {/* Pulse effect when enabled */}
          {!isEmpty(input) && !isLoading && (
            <div className="absolute inset-0 rounded-full border-2 border-futuristic-accent animate-ping opacity-40"></div>
          )}
        </motion.button>
      </div>

      {/* Tooltip below */}
      <div className="flex items-center justify-between mt-3 px-2">
        <div className="text-xs text-futuristic-textSecondary/70 flex items-center gap-2">
          <span className="opacity-80">💡</span>
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-futuristic-botBubble border border-futuristic-accent/20 text-futuristic-accent text-[10px] font-semibold">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-futuristic-botBubble border border-futuristic-accent/20 text-futuristic-accent text-[10px] font-semibold">Shift+Enter</kbd> for new line</span>
        </div>
        {input.length > 0 && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xs text-futuristic-textSecondary/60 font-medium"
          >
            {input.length} chars
          </motion.span>
        )}
      </div>
    </div>
  );
}
