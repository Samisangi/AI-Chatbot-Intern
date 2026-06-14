'use client';

import { motion } from 'framer-motion';
import { SuggestionChip } from '@/types/chat';

interface SuggestionChipsProps {
  suggestions: SuggestionChip[];
  onSelect: (text: string) => void;
  isLoading: boolean;
}

const DEFAULT_SUGGESTIONS: SuggestionChip[] = [
  { id: '1', text: 'Show me your services' },
  { id: '2', text: 'Book a consultation' },
  { id: '3', text: 'Digital marketing plans' },
  { id: '4', text: 'AI courses available' },
];

export default function SuggestionChips({
  suggestions = DEFAULT_SUGGESTIONS,
  onSelect,
  isLoading,
}: SuggestionChipsProps) {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const chipVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={containerVariants}
      className="flex flex-wrap gap-2 p-4"
    >
      {suggestions.map((suggestion) => (
        <motion.button
          key={suggestion.id}
          variants={chipVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(suggestion.text)}
          disabled={isLoading}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20
          border border-white/30 text-white text-sm hover:border-cyan-500 hover:bg-cyan-500/30
          transition-all duration-200 disabled:opacity-50"
        >
          {suggestion.text}
        </motion.button>
      ))}
    </motion.div>
  );
}
