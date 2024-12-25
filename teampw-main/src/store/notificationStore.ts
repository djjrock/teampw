import { create } from 'zustand';

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  showFlyout: boolean;
  unreadCount: number;
  setShowFlyout: (show: boolean) => void;
  markAllAsRead: () => void;
  markAsRead: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    {
      id: '1',
      type: 'warning',
      title: 'Password Expiring Soon',
      description: 'Your AWS Console password will expire in 3 days',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'success',
      title: 'New Team Member',
      description: 'Sarah Wilson joined Engineering Team',
      time: '5 hours ago',
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'Security Update',
      description: 'Two-factor authentication was enabled for your account',
      time: '1 day ago',
      read: true
    }
  ],
  showFlyout: false,
  unreadCount: 2,
  setShowFlyout: (show) => set({ showFlyout: show }),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true })),
    unreadCount: 0
  })),
  markAsRead: (id) => set((state) => {
    const notifications = state.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    const unreadCount = notifications.filter(n => !n.read).length;
    return { notifications, unreadCount };
  })
}));