import { create } from "zustand";
import { MessageResponse, ConversationResponse } from "@/types/chat";

interface ChatState {
  messages: Record<string, MessageResponse[]>;
  conversations: ConversationResponse[];
  activeConversationId: string | null;
  activeTab: "all" | "unread";
  loading: boolean;
  isSendingMessage: boolean;
  error: Error | null;
  setActiveTab: (tab: "all" | "unread") => void;
  setMessages: (conversationId: string, messages: MessageResponse[]) => void;
  addMessage: (conversationId: string, message: MessageResponse) => void;
  setConversations: (conversations: ConversationResponse[]) => void;
  updateConversation: (conversation: ConversationResponse) => void;
  setActiveConversationId: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  setIsSendingMessage: (isSendingMessage: boolean) => void;
  setError: (error: Error | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: {},
  conversations: [],
  activeConversationId: null,
  activeTab: "all",
  loading: false,
  error: null,
  isSendingMessage: false,
  setIsSendingMessage: (isSendingMessage: boolean) => set({ isSendingMessage }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setMessages: (conversationId, messages) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: messages.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
      },
    })),
  addMessage: (conversationId, message) =>
    set((state) => {
      const existingMessages = state.messages[conversationId] || [];
      const updatedMessages = [message, ...existingMessages].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return {
        messages: {
          ...state.messages,
          [conversationId]: updatedMessages,
        },
      };
    }),
  setConversations: (conversations) =>
    set({
      conversations: conversations.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      ),
    }),
  updateConversation: (conversation) =>
    set((state) => ({
      conversations: state.conversations
        .map((conv) => (conv.id === conversation.id ? conversation : conv))
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    })),
  setActiveConversationId: (id) => set({ activeConversationId: id }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
})); 