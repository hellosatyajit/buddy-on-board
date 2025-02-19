import {
  pgTable,
  text,
  timestamp,
  boolean,
  serial,
  uuid,
  integer,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export enum NotificationCategoryEnum {
  CHAT = "chat",
  REQUEST = "request",
  PAYMENT = "payment",
  SYSTEM = "system",
  REVIEW = "review",
}

export enum NotificationStatusEnum {
  PENDING = "pending",
  SENT = "sent",
  FAILED = "failed",
}

export enum NotificationTypeEnum {
  // Chat related
  CHAT_MESSAGE = "chat_message",

  // Request related
  REQUEST_NEW = "request_new",
  REQUEST_ACCEPTED = "request_accepted",
  REQUEST_CANCELED = "request_canceled",
  REQUEST_COMPLETED = "request_completed",

  // Payment related
  PAYMENT_RECEIVED = "payment_received",
  PAYMENT_SENT = "payment_sent",
  PAYOUT_PROCESSED = "payout_processed",
  PLATFORM_FEE = "platform_fee",

  // System related
  VERIFICATION_STATUS = "verification_status",
  STRIPE_SETUP = "stripe_setup",
  PROFILE_APPROVAL = "profile_approval",
  DISPUTE_OPENED = "dispute_opened",
  DISPUTE_RESOLVED = "dispute_resolved",

  // Review related
  REVIEW_RECEIVED = "review_received",
  REVIEW_REMINDER = "review_reminder",
}

export const notificationCategoryEnum = pgEnum(
  "notification_category",
  Object.values(NotificationCategoryEnum) as [string, ...string[]]
);
export const notificationStatusEnum = pgEnum(
  "notification_status",
  Object.values(NotificationStatusEnum) as [string, ...string[]]
);
export const notificationTypeEnum = pgEnum(
  "notification_type",
  Object.values(NotificationTypeEnum) as [string, ...string[]]
);

export const notificationTypes = pgTable("notification_types", {
  id: serial("id").primaryKey(),
  category: notificationCategoryEnum().notNull(),
  type: notificationTypeEnum().notNull().unique(),
  description: text("description").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  notificationTypeId: integer("notification_type_id")
    .notNull()
    .references(() => notificationTypes.id),
  title: text("title"),
  message: text("message").notNull(),
  actionUrl: text("action_url"),
  isRead: boolean("is_read").notNull().default(false),
  readAt: timestamp("read_at"),
  emailStatus: notificationStatusEnum().notNull().default("pending"),
  emailSentAt: timestamp("email_sent_at"),
  emailError: text("email_error"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const notificationTypesRelations = relations(notificationTypes, ({ one }) => ({
  notifications: one(notifications, {
    fields: [notificationTypes.id],
    references: [notifications.notificationTypeId],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
  notificationType: one(notificationTypes, {
    fields: [notifications.notificationTypeId],
    references: [notificationTypes.id],
  }),
}));

export type NotificationTypeRecord = typeof notificationTypes.$inferSelect;
export type NewNotificationTypeRecord = typeof notificationTypes.$inferInsert;
export type NotificationRecord = typeof notifications.$inferSelect;
export type NewNotificationRecord = typeof notifications.$inferInsert;