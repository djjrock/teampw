import * as React from 'react';
import { useThemeStore } from '../store/themeStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, setTheme } = useThemeStore();
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Initialize theme on mount
  React.useEffect(() => {
    // Prevent transition flash on initial load
    const root = document.documentElement;
    root.classList.add('no-transitions');

    // Add transition class after a short delay
    const timeoutId = setTimeout(() => {
      root.classList.remove('no-transitions');
      root.classList.add('theme-transition');
      setIsInitialized(true);
    }, 100);

    // Listen for system theme changes
    try {
      const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
      if (mediaQuery) {
        const handleChange = (e: MediaQueryListEvent) => {
          // Only update if there's no saved theme preference
          if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
          }
        };

        // Use the appropriate event listener method
        if (mediaQuery.addEventListener) {
          mediaQuery.addEventListener('change', handleChange);
        } else if (mediaQuery.addListener) {
          // Fallback for older browsers
          mediaQuery.addListener(handleChange);
        }

        return () => {
          // Clean up event listener
          if (mediaQuery.removeEventListener) {
            mediaQuery.removeEventListener('change', handleChange);
          } else if (mediaQuery.removeListener) {
            mediaQuery.removeListener(handleChange);
          }
          root.classList.remove('theme-transition', 'no-transitions');
          clearTimeout(timeoutId);
        };
      }
    } catch (error) {
      console.warn('System theme detection not supported:', error);
    }

    return () => {
      root.classList.remove('theme-transition', 'no-transitions');
      clearTimeout(timeoutId);
    };
  }, [setTheme]);

  // Handle theme changes
  React.useEffect(() => {
    if (isInitialized) {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
  }, [theme, isInitialized]);

  return <>{children}</>;
}