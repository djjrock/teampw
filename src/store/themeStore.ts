import { create, StateCreator } from 'zustand';
import { StoreApi } from 'zustand';

interface ThemeState {
  theme: 'light' | 'dark';
  isDark: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

// Get initial theme from local storage or system preference
const getInitialTheme = (): 'light' | 'dark' => {
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (error) {
    console.warn('Error accessing theme preference:', error);
  }
  return 'light';
};

// Apply theme to document immediately
const applyTheme = (theme: 'light' | 'dark') => {
  try {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  } catch (error) {
    console.warn('Error applying theme:', error);
  }
};

export const useThemeStore = create<ThemeState>((
  set: StoreApi<ThemeState>['setState'],
  get: StoreApi<ThemeState>['getState']
) => ({
  theme: getInitialTheme(),
  isDark: getInitialTheme() === 'dark',
  setTheme: (theme: 'light' | 'dark') => {
    applyTheme(theme);
    set({ theme, isDark: theme === 'dark' });
  },
  toggleTheme: () => {
    const state = get();
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    set({ theme: newTheme, isDark: newTheme === 'dark' });
  },
}));