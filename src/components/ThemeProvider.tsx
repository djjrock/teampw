import { useEffect, useState } from 'react';
import { useThemeStore } from '../store/themeStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useThemeStore();

  // Handle initial theme setup
  useEffect(() => {
    // Disable transitions initially
    document.documentElement.style.setProperty('transition', 'none');
    
    // Force immediate theme application
    const isDark = theme === 'dark';
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-color-scheme', theme);
    document.documentElement.style.setProperty('--theme-bg', isDark ? '#18181B' : '#ffffff');
    document.documentElement.style.setProperty('--theme-text', isDark ? '#ffffff' : '#18181B');
    document.documentElement.style.backgroundColor = isDark ? '#18181B' : '#ffffff';
    document.documentElement.style.color = isDark ? '#ffffff' : '#18181B';
    
    // Re-enable transitions after a short delay
    const timeoutId = setTimeout(() => {
      document.documentElement.style.removeProperty('transition');
      setMounted(true);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [theme]);

  // Watch for system theme changes
  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        try {
          const hasStoredTheme = localStorage.getItem('theme');
          if (!hasStoredTheme) {
            setTheme(e.matches ? 'dark' : 'light');
          }
        } catch (error) {
          // Ignore localStorage errors
          setTheme(e.matches ? 'dark' : 'light');
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch (error) {
      console.warn('System theme detection not available:', error);
    }
  }, [setTheme]);

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}