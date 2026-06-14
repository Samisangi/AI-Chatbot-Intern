'use client';

import { useCallback } from 'react';
import { useChatStore } from '@/store/chatStore';
import { generateAIResponse } from '@/services/geminiService';
import { generateId, sanitizeInput } from '@/utils/helpers';
import { ChatMessage } from '@/types/chat';

export function useChat() {
  const messages = useChatStore((state) => state.messages);
  const isLoading = useChatStore((state) => state.isLoading);
  const error = useChatStore((state) => state.error);
  const addMessage = useChatStore((state) => state.addMessage);
  const clearMessages = useChatStore((state) => state.clearMessages);
  const setLoading = useChatStore((state) => state.setLoading);
  const setError = useChatStore((state) => state.setError);
  const updateMessage = useChatStore((state) => state.updateMessage);

  const sendMessage = useCallback(
    async (content: string) => {
      const sanitized = sanitizeInput(content);

      if (!sanitized) return;

      try {
        // Add user message
        const userMessage: ChatMessage = {
          id: generateId(),
          role: 'user',
          content: sanitized,
          timestamp: new Date(),
        };

        addMessage(userMessage);
        setLoading(true);
        setError(null);

        // Add loading message for AI
        const aiMessageId = generateId();
        const aiMessage: ChatMessage = {
          id: aiMessageId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
          isStreaming: true,
        };

        addMessage(aiMessage);

        // Get AI response
        const response = await generateAIResponse(sanitized);

        // Update AI message with response
        updateMessage(aiMessageId, response);

        setLoading(false);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        setLoading(false);
      }
    },
    [addMessage, setLoading, setError, updateMessage]
  );

  const clearChat = useCallback(() => {
    clearMessages();
    setError(null);
  }, [clearMessages, setError]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
  };
}
