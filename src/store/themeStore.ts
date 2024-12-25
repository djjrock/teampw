import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// In-memory fallback storage
let inMemoryTheme: Theme | null = null;

// DOM manipulation helpers with error handling
const setDocumentTheme = (theme: Theme) => {
  try {
    // Remove existing theme classes
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    // Set data attributes
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-color-scheme', theme);
    
    // Set colors directly
    const isDark = theme === 'dark';
    document.documentElement.style.setProperty('--theme-bg', isDark ? '#18181B' : '#ffffff');
    document.documentElement.style.setProperty('--theme-text', isDark ? '#ffffff' : '#18181B');
    document.documentElement.style.backgroundColor = isDark ? '#18181B' : '#ffffff';
    document.documentElement.style.color = isDark ? '#ffffff' : '#18181B';
    
    // Force a repaint
    const body = document.body;
    body.style.display = 'none';
    body.offsetHeight; // Trigger reflow
    body.style.display = '';
  } catch (error) {
    console.error('Failed to set document theme:', error);
  }
};

// Try to get theme from various sources
const getInitialTheme = (): Theme => {
  // Check in-memory theme first
  if (inMemoryTheme) {
    return inMemoryTheme;
  }

  // Try localStorage if available
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
  } catch (error) {
    // Ignore localStorage errors
  }

  // Check system preference
  try {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (error) {
    // Ignore media query errors
  }

  // Check DOM for existing theme
  if (document.documentElement.classList.contains('dark')) {
    return 'dark';
  }

  // Default to light theme
  return 'light';
};

// Create the store
export const useThemeStore = create<ThemeStore>((set, get) => {
  // Get initial theme
  const initialTheme = getInitialTheme();
  
  // Apply initial theme immediately
  setDocumentTheme(initialTheme);
  
  return {
    theme: initialTheme,
    isDark: initialTheme === 'dark',
    setTheme: (newTheme: Theme) => {
      // Update in-memory theme
      inMemoryTheme = newTheme;
      
      // Try to persist to localStorage
      try {
        localStorage.setItem('theme', newTheme);
      } catch (error) {
        // Ignore localStorage errors
      }
      
      // Apply theme to document
      setDocumentTheme(newTheme);
      
      // Update store state
      set({ theme: newTheme, isDark: newTheme === 'dark' });
    },
    toggleTheme: () => {
      const currentTheme = get().theme;
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      get().setTheme(newTheme);
    },
  };
});