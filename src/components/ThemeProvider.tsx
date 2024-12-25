import * as React from 'react';
import { useThemeStore } from '../store/themeStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = React.useState(false);

  // Initialize theme on mount
  React.useEffect(() => {
    // Disable transitions initially
    const root = document.documentElement;
    root.classList.add('no-transitions');

    // Force immediate theme application
    const isDark = theme === 'dark';
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    root.style.setProperty('color-scheme', theme);
    root.style.setProperty('--theme-bg', isDark ? '#18181B' : '#ffffff');
    root.style.setProperty('--theme-text', isDark ? '#ffffff' : '#18181B');
    root.style.backgroundColor = isDark ? '#18181B' : '#ffffff';
    root.style.color = isDark ? '#ffffff' : '#18181B';

    // Enable transitions after a short delay
    const transitionTimeout = setTimeout(() => {
      root.classList.remove('no-transitions');
      root.classList.add('theme-transition');
      setMounted(true);
    }, 100);

    // Try to detect system theme changes
    let mediaQuery: MediaQueryList | undefined;
    try {
      mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
      if (mediaQuery) {
        const handleChange = (e: MediaQueryListEvent) => {
          setTheme(e.matches ? 'dark' : 'light');
        };

        if (mediaQuery.addEventListener) {
          mediaQuery.addEventListener('change', handleChange);
        } else if (mediaQuery.addListener) {
          mediaQuery.addListener(handleChange);
        }
      }
    } catch (error) {
      console.warn('System theme detection not available');
    }

    return () => {
      clearTimeout(transitionTimeout);
      if (mediaQuery) {
        const handleChange = (e: MediaQueryListEvent) => {
          setTheme(e.matches ? 'dark' : 'light');
        };
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleChange);
        } else if (mediaQuery.removeListener) {
          mediaQuery.removeListener(handleChange);
        }
      }
      root.classList.remove('theme-transition', 'no-transitions');
    };
  }, [theme, setTheme]);

  // Re-apply theme on any changes
  React.useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      const isDark = theme === 'dark';

      // Apply theme aggressively
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);
      root.style.setProperty('color-scheme', theme);
      root.style.setProperty('--theme-bg', isDark ? '#18181B' : '#ffffff');
      root.style.setProperty('--theme-text', isDark ? '#ffffff' : '#18181B');
      root.style.backgroundColor = isDark ? '#18181B' : '#ffffff';
      root.style.color = isDark ? '#ffffff' : '#18181B';

      // Force a re-render by toggling a class
      document.body.classList.remove('theme-applied');
      requestAnimationFrame(() => {
        document.body.classList.add('theme-applied');
      });
    }
  }, [theme, mounted]);

  return <>{children}</>;
}