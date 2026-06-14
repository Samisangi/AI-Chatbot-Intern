import { create } from 'zustand';
import { ChatMessage } from '@/types/chat';

interface ChatStore {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  addMessage: (message: ChatMessage) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, content: string) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getMessages: () => ChatMessage[];
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,

  addMessage: (message: ChatMessage) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  removeMessage: (id: string) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    })),

  updateMessage: (id: string, content: string) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, content, isStreaming: false } : msg
      ),
    })),

  clearMessages: () => set({ messages: [], error: null }),

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  setError: (error: string | null) => set({ error }),

  getMessages: () => get().messages,
}));
