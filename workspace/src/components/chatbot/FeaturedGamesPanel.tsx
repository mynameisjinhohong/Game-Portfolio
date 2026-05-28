"use client";

const FEATURED_GAMES = [
  {
    id: "g1",
    title: "Skybound Quest",
    genre: "Puzzle Platformer",
    color: "#1A3A50",
  },
  {
    id: "g2",
    title: "Mech Buster",
    genre: "Action Shooter",
    color: "#1A2E40",
  },
  {
    id: "g3",
    title: "Arcane Core",
    genre: "Roguelike RPG",
    color: "#1E2A40",
  },
];

const TECH_ICONS = ["U", "C#", "Ps", "Bl", "Gi", "X"];

export function FeaturedGamesPanel() {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Featured Games */}
      <div className="hud-panel rounded p-4 flex-1">
        <p className="font-mono text-[10px] text-hud-teal tracking-widest mb-3 uppercase">
          Featured Games
        </p>
        <div className="flex flex-col gap-2">
          {FEATURED_GAMES.map((game) => (
            <div
              key={game.id}
              className="flex items-center gap-2 p-2 rounded border border-hud-border hover:border-hud-teal/40 transition-colors cursor-pointer"
              style={{ backgroundColor: game.color }}
            >
              {/* 게임 썸네일 자리 */}
              <div className="w-12 h-8 bg-hud-bg rounded flex-shrink-0 border border-hud-border/50 flex items-center justify-center">
                <span className="text-hud-teal/40 text-xs">▶</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-hud-text truncate leading-tight">
                  {game.title}
                </p>
                <p className="font-mono text-[10px] text-hud-text-dim truncate">
                  {game.genre}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="hud-panel rounded p-4">
        <p className="font-mono text-[10px] text-hud-teal tracking-widest mb-3 uppercase">
          Tech Stack
        </p>
        <div className="grid grid-cols-3 gap-2">
          {TECH_ICONS.map((icon) => (
            <div
              key={icon}
              className="h-8 bg-hud-bg border border-hud-border rounded flex items-center justify-center"
            >
              <span className="font-mono text-[10px] text-hud-text-dim font-semibold">
                {icon}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
