'use client';

import { FEATURED_GAMES } from '@/data/games';

const TECH_ICONS = ['Unity', 'C#', 'Photon', 'Blender', 'Git', 'Xcode'];

export function FeaturedGamesPanel() {
  return (
    <div className="flex h-full flex-col gap-4 md:grid md:grid-cols-2 xl:flex">
      {/* Featured Games */}
      <div className="hud-panel flex-1 rounded p-4 sm:p-5">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accent">
          Featured Games
        </p>
        <ul className="flex flex-col gap-2">
          {FEATURED_GAMES.map((game) => (
            <li key={game.slug}>
              <a
                href={`#${game.slug}`}
                className="interactive-card hud-panel-clickable flex items-start gap-3 rounded border border-border bg-panel-soft p-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <span
                  aria-hidden="true"
                  className="flex h-10 w-14 flex-shrink-0 items-center justify-center rounded border border-border bg-bg-sunken sm:h-8 sm:w-12"
                  style={{ backgroundColor: game.color, color: '#FFFFFF' }}
                >
                  <span className="text-xs opacity-80">▶</span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-semibold leading-tight text-content sm:truncate">
                    {game.title}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] leading-relaxed text-content-dim sm:truncate">
                    {game.genre} · {game.platform}
                  </span>
                  {game.awards?.[0] ? (
                    <span className="mt-1 block font-mono text-[10px] leading-relaxed text-cta">
                      {game.awards[0]}
                    </span>
                  ) : null}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="hud-panel rounded p-4 sm:p-5">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-accent">
          Tech Stack
        </p>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {TECH_ICONS.map((icon) => (
            <li
              key={icon}
              className="flex min-h-10 items-center justify-center rounded border border-border bg-bg-sunken px-2 py-2 text-center"
            >
              <span className="font-mono text-[10px] font-semibold text-content-dim">{icon}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
