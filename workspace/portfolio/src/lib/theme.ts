export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'portfolio-theme';

export function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null;
  return (localStorage.getItem(STORAGE_KEY) as Theme) ?? null;
}

export function setStoredTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, theme);
}

export function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') return getSystemTheme();
  return theme;
}

export function applyTheme(resolved: 'light' | 'dark'): void {
  const root = document.documentElement;
  root.setAttribute('data-theme', resolved);
  if (resolved === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}
