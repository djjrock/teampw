import { create } from 'zustand';
import { StoreApi } from 'zustand';

// Theme store with persistence and system preference detection
// Handles theme toggling, persistence, and system preference syncing
interface ThemeState {
  theme: 'light' | 'dark';
  isDark: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

// Safe localStorage wrapper with fallback
const storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return null;
    }
  },
  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Failed to write to localStorage:', error);
    }
  }
};

// Get initial theme with fallback strategy
const getInitialTheme = (): 'light' | 'dark' => {
  // Try local storage first
  const savedTheme = storage.get('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  // Try system preference
  try {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (error) {
    console.warn('Failed to detect system theme:', error);
  }

  // Default to light theme
  return 'light';
};

// Apply theme to document with error handling
const applyTheme = (theme: 'light' | 'dark'): void => {
  try {
    // Remove both classes first to ensure clean state
    document.documentElement.classList.remove('light', 'dark');
    // Add the current theme class
    document.documentElement.classList.add(theme);
    // Try to persist the theme
    storage.set('theme', theme);
  } catch (error) {
    console.warn('Failed to apply theme:', error);
  }
};

// Create the theme store
export const useThemeStore = create<ThemeState>((set: StoreApi<ThemeState>['setState'], get: StoreApi<ThemeState>['getState']) => {
  // Get and apply initial theme
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  return {
    theme: initialTheme,
    isDark: initialTheme === 'dark',
    setTheme: (theme: 'light' | 'dark') => {
      applyTheme(theme);
      set({ theme, isDark: theme === 'dark' });
    },
    toggleTheme: () => {
      const currentTheme = get().theme;
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      set({ theme: newTheme, isDark: newTheme === 'dark' });
    },
  };
});