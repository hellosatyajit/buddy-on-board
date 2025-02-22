import { useEffect, useCallback, useRef } from "react";
import { MessageResponse } from "@/types/chat";
import { createClient } from "@/utils/supabase/client";
import {
  sendMessage,
  sendMessageWithAttachment,
  getMessages,
  markMessageAsRead,
} from "@/actions/chat";
import { useChatStore } from "@/stores/chat";
import { useAuth } from "@/components/context/auth";

export function useMessages(conversationId: string) {
  const supabase = createClient();
  const isMounted = useRef(false);
  const {
    messages: storeMessages,
    setMessages,
    addMessage,
    setLoading,
    setError,
    isSendingMessage,
    setIsSendingMessage,
    loading,
    error,
  } = useChatStore();
  const { user, loading: authLoading } = useAuth();
  
  const messages = (storeMessages[conversationId] || []).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const fetchMessages = useCallback(async () => {
    if (!conversationId || !user || authLoading) return;
    
    try {
      setLoading(true);
      const data = await getMessages({ conversationId });
      setMessages(conversationId, data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
    }
  }, [conversationId, setMessages, setError, setLoading, user, authLoading]);

  const handleMessageRead = useCallback(async (messageId: string) => {
    if (!user) return;
    try {
      await markMessageAsRead(messageId);
    } catch (err) {
      console.error("Error marking message as read:", err);
    }
  }, [user]);

  useEffect(() => {
    if (!conversationId || !user || authLoading) return;

    if (!isMounted.current) {
      fetchMessages();
      isMounted.current = true;
    }

    const channel = supabase
      .channel(`chat:${conversationId}`)
      .on("broadcast", { event: "NEW_MESSAGE" }, async (payload) => {
        const newMessage = payload.payload as MessageResponse;
        if (newMessage.conversationId === conversationId) {
          addMessage(conversationId, newMessage);
          if (newMessage.senderId !== user.id) {
            handleMessageRead(newMessage.id);
          }
        }
      })
      .on("broadcast", { event: "MESSAGE_UPDATED" }, (payload) => {
        const updatedMessage = payload.payload as MessageResponse;
        if (updatedMessage.conversationId === conversationId) {
          setMessages(
            conversationId,
            messages.map((msg) =>
              msg.id === updatedMessage.id ? updatedMessage : msg
            )
          );
        }
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
      isMounted.current = false;
    };
  }, [conversationId, fetchMessages, handleMessageRead, addMessage, setMessages, user, authLoading]);

  const handleSendMessage = useCallback(
    async (content: string, bookingId: string, file?: File) => {
      if (!user) return;
      try {
        setError(null);
        setIsSendingMessage(true);
        const message = file
          ? await sendMessageWithAttachment({
              conversationId,
              content,
              bookingId,
              file,
            })
          : await sendMessage({
              conversationId,
              content,
              bookingId,
            });

        addMessage(conversationId, message);
        return message;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsSendingMessage(false);
      }
    },
    [conversationId, addMessage, setError, user, setIsSendingMessage]
  );

  const retryFetch = useCallback(() => {
    setError(null);
    return fetchMessages();
  }, [fetchMessages, setError]);

  return {
    messages,
    loading: loading || authLoading,
    error,
    sendMessage: handleSendMessage,
    retryFetch,
    markAsRead: handleMessageRead,
    isSendingMessage,
  };
}
