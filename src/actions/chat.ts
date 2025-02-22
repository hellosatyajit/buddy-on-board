"use server";

import { db } from "@/db";
import {
  messages,
  messageAttachments,
  conversations,
  userConversationStates,
  conversationParticipants,
  users,
} from "@/db/schema";
import { and, eq, desc, sql, not } from "drizzle-orm";
import {
  SendMessageParams,
  SendMessageWithAttachmentParams,
  GetMessagesParams,
  MessageResponse,
  ChatSubscriptionEvents,
  CHAT_EVENTS,
  ConversationResponse,
} from "@/types/chat";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const MESSAGES_PER_PAGE = 50;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10MB

async function validateUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized");
  }

  return user;
}

async function broadcastEvent(
  supabase: any,
  event: keyof ChatSubscriptionEvents,
  payload: any,
  conversationId: string
) {
  try {
    await supabase.channel(`chat:${conversationId}`).send({
      type: "broadcast",
      event: CHAT_EVENTS[event],
      payload,
    });
  } catch (error) {
    console.error(`Failed to broadcast ${event}:`, error);
  }
}

export async function sendMessage({
  conversationId,
  content,
  bookingId,
}: SendMessageParams) {
  const user = await validateUser();
  const supabase = await createClient();

  try {
    const [newMessage] = await db
      .insert(messages)
      .values({
        conversationId,
        senderId: user.id,
        content,
        bookingId,
        deliveryStatus: "sent",
      })
      .returning();

    await db.transaction(async (tx) => {
      await tx
        .update(conversations)
        .set({ updatedAt: new Date() })
        .where(eq(conversations.id, conversationId));

      await tx
        .update(userConversationStates)
        .set({
          unreadCount: sql`${userConversationStates.unreadCount} + 1`,
          lastSeenAt: new Date(),
        })
        .where(
          and(
            eq(userConversationStates.conversationId, conversationId),
            sql`${userConversationStates.userId} != ${user.id}`
          )
        );
    });

    await broadcastEvent(supabase, "NEW_MESSAGE", newMessage, conversationId);

    revalidatePath("/chat/[id]");

    return newMessage;
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Failed to send message");
  }
}

export async function sendMessageWithAttachment({
  conversationId,
  content,
  bookingId,
  file,
}: SendMessageWithAttachmentParams) {
  const user = await validateUser();
  const supabase = await createClient();

  if (!file.type.match(/^(image\/(jpeg|png)|application\/pdf)$/)) {
    throw new Error(
      "Invalid file type. Only JPEG, PNG and PDF files are allowed."
    );
  }

  if (file.type.startsWith("image/") && file.size > MAX_IMAGE_SIZE) {
    throw new Error("Image size exceeds 5MB limit");
  }
  if (file.type === "application/pdf" && file.size > MAX_PDF_SIZE) {
    throw new Error("PDF size exceeds 10MB limit");
  }

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("chat-attachments")
      .upload(`${conversationId}/${fileName}`, file);

    if (uploadError) throw uploadError;

    const newMessage = await db.transaction(async (tx) => {
      const [message] = await tx
        .insert(messages)
        .values({
          conversationId,
          senderId: user.id,
          content,
          bookingId,
          deliveryStatus: "sent",
        })
        .returning();

      const [attachment] = await tx
        .insert(messageAttachments)
        .values({
          messageId: message.id,
          fileUrl: uploadData.path,
          fileType: file.type as any,
          fileSize: file.size,
          fileName: file.name,
        })
        .returning();

      await tx
        .update(conversations)
        .set({ updatedAt: new Date() })
        .where(eq(conversations.id, conversationId));

      await tx
        .update(userConversationStates)
        .set({
          unreadCount: sql`${userConversationStates.unreadCount} + 1`,
          lastSeenAt: new Date(),
        })
        .where(
          and(
            eq(userConversationStates.conversationId, conversationId),
            sql`${userConversationStates.userId} != ${user.id}`
          )
        );

      return { ...message, attachments: [attachment] };
    });

    await broadcastEvent(supabase, "NEW_MESSAGE", newMessage, conversationId);

    revalidatePath("/chat/[id]");

    return newMessage;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Failed to create message")
    ) {
      const fileName = error.message.split("Failed to create message: ")[1];
      await supabase.storage
        .from("chat-attachments")
        .remove([`${conversationId}/${fileName}`]);
    }

    console.error("Error sending message with attachment:", error);
    throw new Error("Failed to send message with attachment");
  }
}

export async function getMessages({
  conversationId,
  limit = MESSAGES_PER_PAGE,
  offset = 0,
}: GetMessagesParams): Promise<MessageResponse[]> {
  await validateUser();

  try {
    const result = await db
      .select({
        message: messages,
        attachment: messageAttachments,
      })
      .from(messages)
      .leftJoin(
        messageAttachments,
        eq(messages.id, messageAttachments.messageId)
      )
      .where(
        and(
          eq(messages.conversationId, conversationId),
          eq(messages.isDeleted, false)
        )
      )
      .orderBy(desc(messages.createdAt))
      .limit(limit)
      .offset(offset);

    const messagesMap = new Map<string, MessageResponse>();

    result.forEach(({ message, attachment }) => {
      if (!messagesMap.has(message.id)) {
        messagesMap.set(message.id, {
          ...message,
          attachments: attachment ? [attachment] : [],
        });
      } else if (attachment) {
        messagesMap.get(message.id)?.attachments?.push(attachment);
      }
    });   

    return Array.from(messagesMap.values());
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw new Error("Failed to fetch messages");
  }
}

export async function markMessageAsRead(messageId: string) {
  const user = await validateUser();
  const supabase = await createClient();

  try {
    const [updatedMessage] = await db
      .update(messages)
      .set({ deliveryStatus: "read" })
      .where(eq(messages.id, messageId))
      .returning();

    if (updatedMessage) {
      await broadcastEvent(
        supabase,
        "MESSAGE_UPDATED",
        updatedMessage,
        updatedMessage.conversationId
      );
    }

    return updatedMessage;
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw new Error("Failed to mark message as read");
  }
}

export async function getConversations() {
  const user = await validateUser();

  try {
    const result = await db
      .select({
        conversation: conversations,
        participant: conversationParticipants,
        otherParticipantUser: {
          id: users.id,
          name: users.firstName,
          email: users.email,
          image: users.firstName,
        },
        lastMessage: messages,
        unreadCount: userConversationStates.unreadCount,
      })
      .from(conversations)
      .innerJoin(
        conversationParticipants,
        eq(conversations.id, conversationParticipants.conversationId)
      )
      .innerJoin(users, eq(conversationParticipants.userId, users.id))
      .leftJoin(
        messages,
        and(
          eq(conversations.id, messages.conversationId),
          eq(messages.isDeleted, false)
        )
      )
      .leftJoin(
        userConversationStates,
        and(
          eq(conversations.id, userConversationStates.conversationId),
          eq(userConversationStates.userId, user.id)
        )
      )
      .where(not(eq(conversationParticipants.userId, user.id)))
      .orderBy(desc(conversations.updatedAt));

    if (!result || result.length === 0) {
      return [];
    }

    const conversationsMap = new Map<string, ConversationResponse>();

    result.forEach(
      ({ conversation, otherParticipantUser, lastMessage, unreadCount }) => {
        if (!conversationsMap.has(conversation.id)) {
          conversationsMap.set(conversation.id, {
            ...conversation,
            participant: {
              userId: otherParticipantUser.id,
              name: otherParticipantUser.name,
              email: otherParticipantUser.email,
              image: otherParticipantUser.image,
            },

            lastMessage: lastMessage || undefined,
            unreadCount: unreadCount || 0,
          });
        }
      }
    );

    return Array.from(conversationsMap.values());
  } catch (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }
}

export async function createConversation(
  participantIds: string[],
  bookingId: string
) {
  const user = await validateUser();
  const supabase = await createClient();

  const allParticipants = new Set([...participantIds, user.id]);

  try {
    const newConversation = await db.transaction(async (tx) => {
      const [conversation] = await tx
        .insert(conversations)
        .values({})
        .returning();

      await tx.insert(conversationParticipants).values(
        Array.from(allParticipants).map((userId) => ({
          conversationId: conversation.id,
          userId,
        }))
      );

      const [message] = await tx
        .insert(messages)
        .values({
          conversationId: conversation.id,
          senderId: user.id,
          content: "Conversation started",
          bookingId,
          deliveryStatus: "sent",
        })
        .returning();

      await tx.insert(userConversationStates).values(
        Array.from(allParticipants).map((userId) => ({
          conversationId: conversation.id,
          userId,
          lastReadMessageId: message.id,
          unreadCount: 0,
          lastSeenAt: new Date(),
        }))
      );

      return {
        ...conversation,
        participants: Array.from(allParticipants).map((userId) => ({ userId })),
        lastMessage: message,
        unreadCount: 0,
      };
    });

    await broadcastEvent(
      supabase,
      "CONVERSATION_UPDATED",
      newConversation,
      newConversation.id
    );

    revalidatePath("/chat");
    return newConversation;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw new Error("Failed to create conversation");
  }
}

export async function markConversationAsRead(conversationId: string) {
  const user = await validateUser();

  try {
    await db.transaction(async (tx) => {
      await tx
        .update(messages)
        .set({ deliveryStatus: "read" })
        .where(
          and(
            eq(messages.conversationId, conversationId),
            not(eq(messages.senderId, user.id))
          )
        );

      await tx
        .update(userConversationStates)
        .set({
          unreadCount: 0,
          lastSeenAt: new Date(),
        })
        .where(
          and(
            eq(userConversationStates.conversationId, conversationId),
            eq(userConversationStates.userId, user.id)
          )
        );
    });

    revalidatePath("/chat");
  } catch (error) {
    console.error("Error marking conversation as read:", error);
    throw new Error("Failed to mark conversation as read");
  }
}
