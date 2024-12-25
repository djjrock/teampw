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
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-color-scheme', theme);
    
    // Re-enable transitions after a short delay
    const timeoutId = setTimeout(() => {
      document.documentElement.style.removeProperty('transition');
      setMounted(true);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  // Watch for theme changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-color-scheme', theme);
    }
  }, [theme, mounted]);

  // Watch for system theme changes
  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem('theme')) {
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