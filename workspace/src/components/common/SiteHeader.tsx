'use client';

import { ThemeToggle } from './ThemeToggle';

export function SiteHeader() {
  return (
    <header className="w-full border-b border-border bg-bg-elevated/70 backdrop-blur supports-[backdrop-filter]:bg-bg-elevated/60">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="font-mono text-sm tracking-widest text-accent hover:text-accent-strong transition-colors"
        >
          hongjinho.dev
        </a>

        <div className="flex items-center gap-3">
          <span className="hidden font-mono text-xs tracking-widest text-content-dim sm:inline">
            PORTFOLIO_v1
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
