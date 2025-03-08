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

/**
 * Creates a Zustand store for managing chat state, including messages and conversations.
 * This store provides functions to manipulate the chat state, such as setting messages,
 * adding new messages, and updating conversation details.
 *
 * @returns {ChatState} The state and actions for managing chat functionality.
 */
export const useChatStore = create<ChatState>((set) => ({
  messages: {},
  conversations: [],
  activeConversationId: null,
  activeTab: "all",
  loading: false,
  error: null,
  isSendingMessage: false,

  /**
   * Updates the state to indicate whether a message is currently being sent.
   *
   * @param {boolean} isSendingMessage - Indicates if a message is in the process of being sent.
   */
  setIsSendingMessage: (isSendingMessage: boolean) => set({ isSendingMessage }),

  /**
   * Sets the active tab for viewing messages (either 'all' or 'unread').
   *
   * @param {"all" | "unread"} tab - The tab to set as active.
   */
  setActiveTab: (tab) => set({ activeTab: tab }),

  /**
   * Updates the messages for a specific conversation, sorting them by creation date.
   *
   * @param {string} conversationId - The ID of the conversation to update.
   * @param {MessageResponse[]} messages - The messages to set for the conversation.
   */
  setMessages: (conversationId, messages) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: messages.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
      },
    })),

  /**
   * Adds a new message to a conversation while maintaining the order by creation date.
   *
   * @param {string} conversationId - The ID of the conversation to which the message is added.
   * @param {MessageResponse} message - The message to add to the conversation.
   */
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

  /**
   * Sets the list of conversations, sorting them by the last updated date.
   *
   * @param {ConversationResponse[]} conversations - The list of conversations to set.
   */
  setConversations: (conversations) =>
    set({
      conversations: conversations.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      ),
    }),

  /**
   * Updates a specific conversation in the list, maintaining the order by last updated date.
   *
   * @param {ConversationResponse} conversation - The conversation object to update.
   */
  updateConversation: (conversation) =>
    set((state) => ({
      conversations: state.conversations
        .map((conv) => (conv.id === conversation.id ? conversation : conv))
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    })),

  /**
   * Sets the currently active conversation ID.
   *
   * @param {string | null} id - The ID of the conversation to set as active.
   */
  setActiveConversationId: (id) => set({ activeConversationId: id }),

  /**
   * Updates the loading state of the chat store.
   *
   * @param {boolean} loading - Indicates if the chat is currently loading.
   */
  setLoading: (loading) => set({ loading }),

  /**
   * Sets the error state for the chat store.
   *
   * @param {Error | null} error - The error to set, or null to clear the error.
   */
  setError: (error) => set({ error }),
}));