'use client';

const SKILLS = [
  { label: 'Creativity', value: 85 },
  { label: 'Problem Solving', value: 78 },
  { label: 'Teamwork', value: 72 },
];

export function CharacterPanel() {
  return (
    <div className="hud-panel flex h-full flex-col gap-4 rounded p-4 sm:p-5">
      {/* 레벨 배지 */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded border border-accent/40 bg-accent-soft px-2 py-0.5 font-mono text-xs text-accent">
          Lv. 18
        </span>
        <span className="flex gap-1" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="text-sm leading-none text-[var(--color-heart)]">
              ♥
            </span>
          ))}
        </span>
      </div>

      {/* 캐릭터 아바타 */}
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded border-2 border-accent/50 bg-bg-sunken">
          <div className="flex h-16 w-16 items-center justify-center">
            <svg
              viewBox="0 0 32 32"
              width="64"
              height="64"
              className="pixelated"
              aria-hidden="true"
            >
              <rect x="10" y="4" width="12" height="10" fill="var(--color-avatar-skin)" />
              <rect x="12" y="7" width="2" height="2" fill="var(--color-avatar-eye)" />
              <rect x="18" y="7" width="2" height="2" fill="var(--color-avatar-eye)" />
              <rect x="13" y="11" width="6" height="1" fill="var(--color-avatar-eye)" />
              <rect x="10" y="4" width="12" height="3" fill="var(--color-avatar-hair)" />
              <rect x="8" y="5" width="2" height="5" fill="var(--color-avatar-hair)" />
              <rect x="9" y="14" width="14" height="10" fill="var(--color-avatar-shirt)" />
              <rect x="5" y="14" width="4" height="8" fill="var(--color-avatar-shirt)" />
              <rect x="23" y="14" width="4" height="8" fill="var(--color-avatar-shirt)" />
              <rect x="9" y="24" width="5" height="4" fill="var(--color-avatar-pants)" />
              <rect x="18" y="24" width="5" height="4" fill="var(--color-avatar-pants)" />
            </svg>
          </div>
        </div>
      </div>

      {/* 이름 및 역할 */}
      <div className="text-center">
        <p className="text-base font-semibold leading-tight text-content">Hong Jinho</p>
        <span className="mt-1 inline-flex min-h-8 items-center rounded border border-cta/40 px-2 py-0.5 font-mono text-xs text-cta">
          Game Developer
        </span>
      </div>

      {/* 스킬 바 */}
      <div className="flex flex-col gap-2">
        {SKILLS.map((skill) => (
          <div key={skill.label}>
            <div className="mb-0.5 flex justify-between">
              <span className="font-mono text-[10px] text-content-dim">{skill.label}</span>
              <span className="font-mono text-[10px] text-accent">{skill.value}</span>
            </div>
            <div
              className="h-1.5 overflow-hidden rounded-full border border-border bg-bg-sunken"
              role="progressbar"
              aria-label={skill.label}
              aria-valuenow={skill.value}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="h-full rounded-full bg-accent" style={{ width: `${skill.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* 한 줄 소개 */}
      <p className="mt-auto text-balance font-mono text-[10px] leading-relaxed text-content-dim">
        I build playful experiences and systems that players love to explore.
      </p>
    </div>
  );
}
