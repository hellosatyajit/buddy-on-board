import { useEffect, useCallback, useRef } from "react";
import { ConversationResponse } from "@/types/chat";
import { createClient } from "@/utils/supabase/client";
import { getConversations, markConversationAsRead } from "@/actions/chat";
import { useChatStore } from "@/stores/chat";
import { useAuth } from "@/components/context/auth";

/**
 * Custom hook to manage conversations for the user.
 * This hook fetches conversations, updates their state, and handles marking them as read.
 *
 * It utilizes Supabase for real-time updates and Zustand for state management.
 *
 * @returns {Object} An object containing conversations, loading state, error state,
 *                   a function to mark conversations as read, and a function to refresh conversations.
 */
export function useConversations() {
  const supabase = createClient();
  const initialFetchDone = useRef(false);
  const {
    conversations,
    setConversations,
    updateConversation,
    setLoading,
    setError,
    loading,
    error,
  } = useChatStore();
  const { user, loading: authLoading } = useAuth();

  /**
   * Fetches conversations from the server and updates the state.
   * This function is called only if the user is authenticated and no other fetch is in progress.
   */
  const fetchConversations = useCallback(async () => {
    if (!user || authLoading || loading) return;

    try {
      setLoading(true);
      const data = await getConversations();

      if (!data) {
        setConversations([]);
        return;
      }

      setConversations(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      setConversations([]);
      console.error("Error fetching conversations:", err);
    } finally {
      setLoading(false);
    }
  }, [user, authLoading, setConversations, setError, setLoading]);

  useEffect(() => {
    if (authLoading || loading) return;

    // Fetch conversations only once when the user is authenticated
    if (user && !initialFetchDone.current) {
      fetchConversations();
      initialFetchDone.current = true;
    }

    // Subscribe to real-time updates for conversation changes
    const channel = supabase
      .channel("conversations")
      .on("broadcast", { event: "CONVERSATION_UPDATED" }, (payload) => {
        const updatedConversation = payload.payload as ConversationResponse;
        updateConversation(updatedConversation);
      })
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      channel.unsubscribe();
    };
  }, [user, authLoading, fetchConversations, updateConversation, supabase]);

  /**
   * Marks a specific conversation as read by its ID.
   * Updates the conversation state to reflect the read status.
   *
   * @param {string} conversationId - The ID of the conversation to mark as read.
   */
  const handleMarkAsRead = useCallback(
    async (conversationId: string) => {
      if (!user) return;

      try {
        await markConversationAsRead(conversationId);
        const conversation = conversations.find((c) => c.id === conversationId);
        if (conversation) {
          updateConversation({
            ...conversation,
            unreadCount: 0,
          });
        }
      } catch (err) {
        console.error("Error marking conversation as read:", err);
      }
    },
    [conversations, updateConversation, user]
  );

  return {
    conversations,
    loading: loading || authLoading,
    error,
    markAsRead: handleMarkAsRead,
    refresh: fetchConversations,
  };
}