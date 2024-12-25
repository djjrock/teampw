import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// In-memory fallback storage
let inMemoryTheme: Theme | null = null;

// DOM manipulation helpers with error handling
const setDocumentTheme = (theme: Theme) => {
  try {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-color-scheme', theme);
    
    // Set colors directly for maximum compatibility
    const isDark = theme === 'dark';
    document.documentElement.style.backgroundColor = isDark ? '#18181B' : '#ffffff';
    document.documentElement.style.color = isDark ? '#ffffff' : '#18181B';
  } catch (error) {
    console.error('Failed to set document theme:', error);
  }
};

// Storage wrapper with error handling
const storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('Failed to access localStorage:', error);
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

const getInitialTheme = (): Theme => {
  // Check in-memory theme first
  if (inMemoryTheme) {
    return inMemoryTheme;
  }

  // Try localStorage
  const storedTheme = storage.get('theme') as Theme | null;
  if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
    return storedTheme;
  }

  // Check system preference
  try {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (error) {
    console.warn('Failed to check system theme preference:', error);
  }

  // Check DOM for existing theme
  try {
    if (document.documentElement.classList.contains('dark')) {
      return 'dark';
    }
  } catch (error) {
    console.warn('Failed to check DOM theme:', error);
  }

  // Default to light theme
  return 'light';
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: getInitialTheme(),
  setTheme: (newTheme: Theme) => {
    // Update in-memory theme
    inMemoryTheme = newTheme;
    
    // Update localStorage if available
    storage.set('theme', newTheme);
    
    // Apply theme to document
    setDocumentTheme(newTheme);
    
    // Update store state
    set({ theme: newTheme });
  },
}));