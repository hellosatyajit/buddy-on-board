import { Message, MessageAttachment, Conversation, UserConversationState } from "@/db/tables/chat";

export type SendMessageParams = {
  conversationId: string;
  content: string;
  bookingId: string;
};

export type SendMessageWithAttachmentParams = SendMessageParams & {
  file: File;
};

export type GetMessagesParams = {
  conversationId: string;
  limit?: number;
  offset?: number;
};

export type GetConversationsParams = {
  userId: string;
  limit?: number;
  offset?: number;
};

export type MessageResponse = Message & {
  attachments?: MessageAttachment[];
};

export type ParticipantResponse = {
  userId: string;
  name: string;
  email: string;
  image: string | null;
};

export type ConversationResponse = Conversation & {
  participant: ParticipantResponse;
  lastMessage?: MessageResponse;
  unreadCount: number;
};

export type ChatSubscriptionEvents = {
  NEW_MESSAGE: 'NEW_MESSAGE';
  MESSAGE_UPDATED: 'MESSAGE_UPDATED';
  CONVERSATION_UPDATED: 'CONVERSATION_UPDATED';
};

export const CHAT_EVENTS: ChatSubscriptionEvents = {
  NEW_MESSAGE: 'NEW_MESSAGE',
  MESSAGE_UPDATED: 'MESSAGE_UPDATED',
  CONVERSATION_UPDATED: 'CONVERSATION_UPDATED',
} as const; 