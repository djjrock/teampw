import * as React from 'react';
import { useThemeStore } from '../store/themeStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, setTheme } = useThemeStore();

  // Initialize theme on mount
  React.useEffect(() => {
    // Force initial theme application
    const root = document.documentElement;
    const isDark = theme === 'dark';

    // Remove transitions temporarily
    root.classList.add('no-transitions');

    // Apply theme aggressively
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.style.setProperty('color-scheme', theme);
    root.style.backgroundColor = isDark ? '#18181B' : '#ffffff';
    root.style.color = isDark ? '#ffffff' : '#18181B';

    // Re-enable transitions after a short delay
    const timeoutId = setTimeout(() => {
      root.classList.remove('no-transitions');
      root.classList.add('theme-transition');
    }, 100);

    // Try to detect system theme changes
    try {
      const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
      if (mediaQuery) {
        const handleChange = (e: MediaQueryListEvent) => {
          setTheme(e.matches ? 'dark' : 'light');
        };

        if (mediaQuery.addEventListener) {
          mediaQuery.addEventListener('change', handleChange);
        } else if (mediaQuery.addListener) {
          mediaQuery.addListener(handleChange);
        }

        return () => {
          if (mediaQuery.removeEventListener) {
            mediaQuery.removeEventListener('change', handleChange);
          } else if (mediaQuery.removeListener) {
            mediaQuery.removeListener(handleChange);
          }
          clearTimeout(timeoutId);
        };
      }
    } catch (error) {
      console.warn('System theme detection not available');
    }

    return () => clearTimeout(timeoutId);
  }, [theme, setTheme]);

  return <>{children}</>;
}