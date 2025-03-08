"use server";
import { db } from "@/db";
import { NotificationRecord, notifications, notificationTypes } from "@/db/tables/notification";
import { eq, and, isNull, desc } from "drizzle-orm";
import { Resend } from "resend";
import { NotificationEmail } from "@/components/emails/notification-email";
import { users } from "@/db/schema";
import { enqueueEmail } from "@/actions/queue";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Creates and sends a notification to a user through both in-app and email channels.
 * Validates notification type, creates a database record, and queues an email if the user has an email address.
 * 
 * @throws Error if notification type is invalid or user is not found
 */
export async function sendNotification({
  userId,
  type,
  title,
  message,
  actionUrl,
  metadata = {},
}: {
  userId: string;
  type: string;
  title?: string;
  message: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
}) {
  try {
    let notificationType: any = await db
      .select({
        id: notificationTypes.id,
        type: notificationTypes.type,
      })
      .from(notificationTypes)
      .where(eq(notificationTypes.type, type))
      .limit(1);

    if (!notificationType.length) {
      throw new Error(`Invalid notification type: ${type}`);
    }

    notificationType = notificationType[0];

    const [notification] = await db
      .insert(notifications)
      .values({
        userId,
        notificationTypeId: notificationType.id,
        title,
        message,
        actionUrl,
        metadata,
      })
      .returning();

    if (notification) {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (!user.length) {
        throw new Error(`User not found: ${userId}`);
      }

      if (user[0].email) {
        await enqueueEmail({
          userId,
          title: title ?? "New Notification",
          message,
          actionUrl,
          notificationId: notification.id,
        });
      }
    }

    return notification;
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
}

/**
 * Retrieves all active notifications for a user, ordered by creation date.
 * Includes notification type category and excludes soft-deleted notifications.
 */
export async function getNotifications(userId: string): Promise<NotificationRecord[]> {
  try {
    return await db
      .select({
        id: notifications.id,
        userId: notifications.userId,
        title: notifications.title,
        notificationTypeId: notifications.notificationTypeId,
        message: notifications.message,
        actionUrl: notifications.actionUrl,
        isRead: notifications.isRead,
        readAt: notifications.readAt,
        emailStatus: notifications.emailStatus,
        emailSentAt: notifications.emailSentAt,
        emailError: notifications.emailError,
        metadata: notifications.metadata,
        createdAt: notifications.createdAt,
        updatedAt: notifications.updatedAt,
        deletedAt: notifications.deletedAt,
        notificationCategory: notificationTypes.category,
      })
      .from(notifications)
      .leftJoin(notificationTypes, eq(notifications.notificationTypeId, notificationTypes.id))
      .where(
        and(eq(notifications.userId, userId), isNull(notifications.deletedAt))
      )
      .orderBy(desc(notifications.createdAt));
  } catch (error) {
    console.error("Error getting notifications:", error);
    throw error;
  }
}

/**
 * Marks a notification as read and updates the read timestamp.
 * Used for tracking user interaction with notifications.
 */
export async function markNotificationAsRead(notificationId: string) {
  try {
    const [notification] = await db
      .update(notifications)
      .set({
        isRead: true,
        readAt: new Date(),
      })
      .where(eq(notifications.id, notificationId))
      .returning();

    return notification;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
}

/**
 * Soft deletes a notification by setting its deletedAt timestamp.
 * Notifications are never permanently deleted to maintain audit trail.
 */
export async function deleteNotification(notificationId: string) {
  try {
    const [notification] = await db
      .update(notifications)
      .set({
        deletedAt: new Date(),
      })
      .where(eq(notifications.id, notificationId))
      .returning();

    return notification;
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
}
