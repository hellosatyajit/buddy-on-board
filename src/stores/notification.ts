import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NotificationRecord } from '@/db/tables/notification';

interface NotificationState {
  notifications: NotificationRecord[];
  unreadCount: number;
  setNotifications: (notifications: NotificationRecord[]) => void;
  addNotification: (notification: NotificationRecord) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
}

/**
 * Creates a Zustand store for managing notifications.
 * This store handles the state of notifications, including unread counts and actions to modify the notification list.
 *
 * @returns {NotificationState} The state and actions for managing notifications.
 */
export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [],
      unreadCount: 0,
      /**
       * Sets the notifications in the store and updates the unread count.
       *
       * @param {NotificationRecord[]} notifications - The list of notifications to set in the store.
       */
      setNotifications: (notifications) => 
        set({ 
          notifications,
          unreadCount: notifications.filter(n => !n.isRead).length 
        }),
      /**
       * Adds a new notification to the store and updates the unread count if necessary.
       *
       * @param {NotificationRecord} notification - The notification to add to the store.
       */
      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadCount: state.unreadCount + (notification.isRead ? 0 : 1)
        })),
      /**
       * Marks a specific notification as read by its ID.
       *
       * @param {string} id - The ID of the notification to mark as read.
       */
      markAsRead: (id) => 
        set((state) => {
          const notifications = state.notifications.map((n) =>
            n.id === id && !n.isRead ? { ...n, isRead: true } : n
          );
          return {
            notifications,
            unreadCount: notifications.filter(n => !n.isRead).length
          };
        }),
      /**
       * Marks all notifications as read.
       */
      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
          unreadCount: 0
        })),
      /**
       * Removes a notification from the store by its ID.
       *
       * @param {string} id - The ID of the notification to remove.
       */
      removeNotification: (id) =>
        set((state) => {
          const notifications = state.notifications.filter((n) => n.id !== id);
          return {
            notifications,
            unreadCount: notifications.filter(n => !n.isRead).length
          };
        }),
    }),
    {
      name: 'notification-store',
    }
  )
); 