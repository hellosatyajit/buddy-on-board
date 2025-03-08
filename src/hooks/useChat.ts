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

/**
 * Custom hook to manage chat messages for a specific conversation.
 * This hook handles fetching messages, sending new messages, and marking messages as read.
 *
 * @param {string} conversationId - The ID of the conversation for which messages are managed.
 * @returns {Object} An object containing messages, loading state, error state, and functions to send messages, retry fetching, and mark messages as read.
 */
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

  /**
   * Fetches messages for the current conversation from the server.
   * Updates the chat store with the fetched messages and handles loading and error states.
   */
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

  /**
   * Marks a specific message as read by its ID.
   * This function is called when a new message is received from another user.
   *
   * @param {string} messageId - The ID of the message to mark as read.
   */
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

    // Fetch messages only once when the component mounts
    if (!isMounted.current) {
      fetchMessages();
      isMounted.current = true;
    }

    // Subscribe to real-time updates for the conversation
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

    // Cleanup function to unsubscribe from the channel
    return () => {
      channel.unsubscribe();
      isMounted.current = false;
    };
  }, [conversationId, fetchMessages, handleMessageRead, addMessage, setMessages, user, authLoading]);

  /**
   * Sends a message to the conversation, with optional file attachment.
   * Handles error states and updates the sending status.
   *
   * @param {string} content - The content of the message to send.
   * @param {string} bookingId - The ID of the booking associated with the message.
   * @param {File} [file] - An optional file to attach to the message.
   * @returns {Promise<MessageResponse>} The sent message object.
   * @throws {Error} if sending the message fails.
   */
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

  /**
   * Retries fetching messages from the server, resetting any previous errors.
   *
   * @returns {Promise<void>} A promise that resolves when the fetch is complete.
   */
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
