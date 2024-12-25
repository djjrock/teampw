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

// In-memory theme storage fallback
let inMemoryTheme: 'light' | 'dark' | null = null;

// Storage wrapper that falls back to memory storage
const storage = {
  get: (key: string): string | null => {
    if (key === 'theme' && inMemoryTheme) {
      return inMemoryTheme;
    }
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('Storage not available, using memory storage');
      return null;
    }
  },
  set: (key: string, value: string): void => {
    if (key === 'theme') {
      inMemoryTheme = value as 'light' | 'dark';
    }
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Storage not available, using memory storage');
    }
  }
};

// Get initial theme with fallback strategy
const getInitialTheme = (): 'light' | 'dark' => {
  // Try storage first
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
    console.warn('System theme detection not available');
  }

  // Default to light theme
  return 'light';
};

// Apply theme to document with error handling
const applyTheme = (theme: 'light' | 'dark'): void => {
  try {
    const root = document.documentElement;
    const isDark = theme === 'dark';

    // Remove both classes first
    root.classList.remove('light', 'dark');
    
    // Add the current theme class
    root.classList.add(theme);
    
    // Update CSS variables for immediate effect
    root.style.setProperty('color-scheme', theme);
    
    // Set background and text colors directly
    root.style.backgroundColor = isDark ? '#18181B' : '#ffffff';
    root.style.color = isDark ? '#ffffff' : '#18181B';

    // Store the theme
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