import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const setDocumentTheme = (theme: Theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const getInitialTheme = (): Theme => {
  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const useThemeStore = create<ThemeStore>((set, get) => {
  // Get and apply initial theme
  const initialTheme = getInitialTheme();
  setDocumentTheme(initialTheme);

  return {
    theme: initialTheme,
    setTheme: (newTheme: Theme) => {
      setDocumentTheme(newTheme);
      set({ theme: newTheme });
    },
    toggleTheme: () => {
      const currentTheme = get().theme;
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      get().setTheme(newTheme);
    },
  };
});