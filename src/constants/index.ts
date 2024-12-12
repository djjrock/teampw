// Export constants
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  SETTINGS: '/settings',
  PROFILE: '/settings/profile',
  SECURITY: '/settings/security',
  NOTIFICATIONS: '/settings/notifications',
} as const;

export const AUTH_ERRORS = {
  INVALID_EMAIL: 'Please enter a valid email address',
  NETWORK_ERROR: 'Network error. Please try again.',
} as const;