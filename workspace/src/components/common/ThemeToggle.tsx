'use client';

import { useTheme } from '@/lib/theme/ThemeProvider';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      aria-pressed={isDark}
      title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-panel
                  px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-content-dim
                  shadow-panel transition-colors duration-150
                  hover:border-accent hover:text-accent
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${className}`}
    >
      <span aria-hidden="true" className="text-sm leading-none">
        {isDark ? '☾' : '☀'}
      </span>
      <span className="hidden sm:inline">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
}
