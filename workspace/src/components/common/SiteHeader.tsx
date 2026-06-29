'use client';

import { ThemeToggle } from './ThemeToggle';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-border bg-bg-elevated/85 backdrop-blur supports-[backdrop-filter]:bg-bg-elevated/70">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="min-w-0 break-all font-mono text-[11px] tracking-[0.18em] text-accent transition-colors hover:text-accent-strong sm:text-sm"
        >
          hongjinho.dev
        </a>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <span className="hidden font-mono text-xs tracking-widest text-content-dim sm:inline">
            PORTFOLIO_v1
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
