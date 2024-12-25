import { create } from 'zustand';

interface ThemeState {
  theme: 'light' | 'dark';
  isDark: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}

// Get initial theme from system preference
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getSystemTheme(),
  isDark: getSystemTheme() === 'dark',
  setTheme: (theme) => set({ theme, isDark: theme === 'dark' }),
  toggleTheme: () => 
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      return { theme: newTheme, isDark: newTheme === 'dark' };
    }),
}));