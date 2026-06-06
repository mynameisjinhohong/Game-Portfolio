'use client';

import { FEATURED_GAMES } from '@/data/games';

const TECH_ICONS = ['Unity', 'C#', 'Photon', 'Blender', 'Git', 'Xcode'];

export function FeaturedGamesPanel() {
  return (
    <div className="flex h-full flex-col gap-4">
      {/* Featured Games */}
      <div className="hud-panel flex-1 rounded p-4">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accent">
          Featured Games
        </p>
        <ul className="flex flex-col gap-2">
          {FEATURED_GAMES.map((game) => (
            <li key={game.slug}>
              <a
                href={`#${game.slug}`}
                className="hud-panel-clickable flex items-center gap-2 rounded border border-border bg-panel-soft p-2 transition-colors duration-150 hover:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-12 flex-shrink-0 items-center justify-center rounded border border-border bg-bg-sunken"
                  style={{ backgroundColor: game.color, color: '#FFFFFF' }}
                >
                  <span className="text-xs opacity-80">▶</span>
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xs font-semibold leading-tight text-content">
                    {game.title}
                  </span>
                  <span className="block truncate font-mono text-[10px] text-content-dim">
                    {game.genre} · {game.platform}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="hud-panel rounded p-4">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accent">
          Tech Stack
        </p>
        <ul className="grid grid-cols-3 gap-2">
          {TECH_ICONS.map((icon) => (
            <li
              key={icon}
              className="flex h-8 items-center justify-center rounded border border-border bg-bg-sunken"
            >
              <span className="font-mono text-[10px] font-semibold text-content-dim">{icon}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
