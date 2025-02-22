import { useEffect, useCallback, useRef } from "react";
import { ConversationResponse, CHAT_EVENTS } from "@/types/chat";
import { createClient } from "@/utils/supabase/client";
import { getConversations, markConversationAsRead } from "@/actions/chat";
import { useChatStore } from "@/stores/chat";
import { useAuth } from "@/components/context/auth";

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

    if (user && !initialFetchDone.current) {
      fetchConversations();
      initialFetchDone.current = true;
    }

    const channel = supabase
      .channel("conversations")
      .on("broadcast", { event: "CONVERSATION_UPDATED" }, (payload) => {
        const updatedConversation = payload.payload as ConversationResponse;
        updateConversation(updatedConversation);
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user, authLoading, fetchConversations, updateConversation, supabase]);

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