import { useEffect, useState } from 'react';
import { useThemeStore } from '../store/themeStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useThemeStore();

  useEffect(() => {
    // Disable transitions initially
    document.documentElement.style.setProperty('transition', 'none');
    
    // Force immediate theme application
    const currentTheme = theme;
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    
    // Re-enable transitions after a short delay
    const timeoutId = setTimeout(() => {
      document.documentElement.style.removeProperty('transition');
      setMounted(true);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}