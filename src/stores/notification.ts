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

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [],
      unreadCount: 0,
      setNotifications: (notifications) => 
        set({ 
          notifications,
          unreadCount: notifications.filter(n => !n.isRead).length 
        }),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadCount: state.unreadCount + (notification.isRead ? 0 : 1)
        })),
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
      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
          unreadCount: 0
        })),
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