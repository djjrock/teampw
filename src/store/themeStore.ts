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

// In-memory theme storage as primary storage in bolt.new
let inMemoryTheme: 'light' | 'dark' | null = null;

// Direct DOM manipulation helpers
const DOM = {
  setThemeClass: (theme: 'light' | 'dark') => {
    const root = document.documentElement;
    const isDark = theme === 'dark';

    // Remove all theme classes
    root.classList.remove('light', 'dark');
    // Add new theme class
    root.classList.add(theme);

    // Set data attribute for additional theme targeting
    root.setAttribute('data-theme', theme);

    // Apply colors directly to ensure they take effect
    root.style.setProperty('--theme-bg', isDark ? '#18181B' : '#ffffff');
    root.style.setProperty('--theme-text', isDark ? '#ffffff' : '#18181B');
    root.style.backgroundColor = isDark ? '#18181B' : '#ffffff';
    root.style.color = isDark ? '#ffffff' : '#18181B';
  },
  
  setColorScheme: (theme: 'light' | 'dark') => {
    // Set color-scheme property
    document.documentElement.style.setProperty('color-scheme', theme);
    
    // Also set meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#18181B' : '#ffffff');
    }
  }
};

// Storage wrapper that prioritizes in-memory storage for bolt.new
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

// Get initial theme with multiple fallback strategies
const getInitialTheme = (): 'light' | 'dark' => {
  // Try in-memory theme first (for bolt.new)
  if (inMemoryTheme) {
    return inMemoryTheme;
  }

  // Try localStorage
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

  // Try reading from DOM
  if (document.documentElement.classList.contains('dark')) {
    return 'dark';
  }

  // Default to light theme
  return 'light';
};

// Apply theme aggressively with multiple strategies
const applyTheme = (theme: 'light' | 'dark'): void => {
  try {
    // Store theme in memory first
    inMemoryTheme = theme;

    // Apply theme to DOM
    DOM.setThemeClass(theme);
    DOM.setColorScheme(theme);

    // Try to persist theme
    storage.set('theme', theme);

    // Force a re-render by updating body class
    document.body.classList.remove('theme-applied');
    setTimeout(() => {
      document.body.classList.add('theme-applied');
    }, 0);

  } catch (error) {
    console.warn('Error applying theme:', error);
    // Fallback: try direct style application
    try {
      const isDark = theme === 'dark';
      document.documentElement.style.backgroundColor = isDark ? '#18181B' : '#ffffff';
      document.documentElement.style.color = isDark ? '#ffffff' : '#18181B';
    } catch (e) {
      console.error('Critical error applying theme:', e);
    }
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