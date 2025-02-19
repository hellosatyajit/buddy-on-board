import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  primaryKey,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";

export const messageDeliveryStatusEnum = pgEnum("message_delivery_status", [
  "sent",
  "delivered",
  "read",
]);

export const fileTypeEnum = pgEnum("file_type", [
  "image/png",
  "image/jpeg",
  "application/pdf",
]);

export const conversations = pgTable("conversations", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const conversationParticipants = pgTable(
  "conversation_participants",
  {
    conversationId: uuid("conversation_id")
      .references(() => conversations.id, { onDelete: "cascade" })
      .notNull(),
    userId: text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.conversationId, table.userId] }),
  })
);

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  conversationId: uuid("conversation_id")
    .references(() => conversations.id, { onDelete: "cascade" })
    .notNull(),
  senderId: text("sender_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  bookingId: uuid("booking_id").notNull(), // Reference to your bookings table
  content: text("content"),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  deliveryStatus: messageDeliveryStatusEnum("delivery_status")
    .default("sent")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messageAttachments = pgTable("message_attachments", {
  id: uuid("id").defaultRandom().primaryKey(),
  messageId: uuid("message_id")
    .references(() => messages.id, { onDelete: "cascade" })
    .notNull(),
  fileUrl: text("file_url").notNull(),
  fileType: fileTypeEnum("file_type").notNull(),
  fileSize: integer("file_size").notNull(), // in bytes
  fileName: text("file_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userConversationStates = pgTable(
  "user_conversation_states",
  {
    userId: text("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    conversationId: uuid("conversation_id")
      .references(() => conversations.id, { onDelete: "cascade" })
      .notNull(),
    lastReadMessageId: uuid("last_read_message_id")
      .references(() => messages.id)
      .notNull(),
    unreadCount: integer("unread_count").default(0).notNull(),
    lastSeenAt: timestamp("last_seen_at").defaultNow().notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.conversationId] }),
  })
);

export const userStatus = pgTable("user_status", {
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .primaryKey(),
  isOnline: boolean("is_online").default(false).notNull(),
  lastSeenAt: timestamp("last_seen_at").defaultNow().notNull(),
});

export const conversationsRelations = relations(conversations, ({ many }) => ({
  participants: many(conversationParticipants),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one, many }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
  attachments: many(messageAttachments),
}));

export type Conversation = typeof conversations.$inferSelect;
export type NewConversation = typeof conversations.$inferInsert;

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;

export type MessageAttachment = typeof messageAttachments.$inferSelect;
export type NewMessageAttachment = typeof messageAttachments.$inferInsert;

export type UserConversationState = typeof userConversationStates.$inferSelect;
export type NewUserConversationState =
  typeof userConversationStates.$inferInsert;

export type UserStatus = typeof userStatus.$inferSelect;
export type NewUserStatus = typeof userStatus.$inferInsert;
