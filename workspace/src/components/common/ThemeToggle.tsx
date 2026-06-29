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
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-panel
                  px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-content-dim sm:px-3.5 sm:text-xs
                  shadow-panel transition-colors duration-150
                  hover:border-accent hover:text-accent
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${className}`}
    >
      <span aria-hidden="true" className="text-sm leading-none">
        {isDark ? '☾' : '☀'}
      </span>
      <span>{isDark ? '다크' : '라이트'}</span>
    </button>
  );
}
