// Export TypeScript types
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'manager' | 'member';
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export interface Theme {
  theme: 'light' | 'dark';
  isDark: boolean;
}