import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NotificationState, Notification } from '@/lib/types';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      setNotifications: (notifications) => 
        set({ 
          notifications,
          unreadCount: notifications.filter(n => !n.read).length 
        }),
      markAsRead: (id) => 
        set((state) => {
          const notifications = state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          );
          return {
            notifications,
            unreadCount: notifications.filter(n => !n.read).length
          };
        }),
      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0
        })),
      addNotification: (notification) =>
        set((state) => {
          const newNotification: Notification = {
            ...notification,
            id: generateId(),
            timestamp: new Date(),
          };
          return {
            notifications: [newNotification, ...state.notifications],
            unreadCount: state.unreadCount + 1
          };
        }),
      removeNotification: (id) =>
        set((state) => {
          const notifications = state.notifications.filter((n) => n.id !== id);
          return {
            notifications,
            unreadCount: notifications.filter(n => !n.read).length
          };
        }),
    }),
    {
      name: 'notification-store',
    }
  )
); 