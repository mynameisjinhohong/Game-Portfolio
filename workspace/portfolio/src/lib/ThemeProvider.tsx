'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  type Theme,
  applyTheme,
  getStoredTheme,
  getSystemTheme,
  resolveTheme,
  setStoredTheme,
} from './theme';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  const applyAndSet = useCallback((t: Theme) => {
    const resolved = resolveTheme(t);
    applyTheme(resolved);
    setThemeState(t);
    setResolvedTheme(resolved);
  }, []);

  useEffect(() => {
    const stored = getStoredTheme();
    applyAndSet(stored ?? 'system');

    if (!stored || stored === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyAndSet('system');
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [applyAndSet]);

  const setTheme = useCallback(
    (t: Theme) => {
      setStoredTheme(t);
      applyAndSet(t);
    },
    [applyAndSet]
  );

  const toggleTheme = useCallback(() => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }, [resolvedTheme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
