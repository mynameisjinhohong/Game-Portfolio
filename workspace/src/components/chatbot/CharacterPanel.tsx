"use client";

const SKILLS = [
  { label: "Creativity", value: 85 },
  { label: "Problem Solving", value: 78 },
  { label: "Teamwork", value: 72 },
];

export function CharacterPanel() {
  return (
    <div className="hud-panel rounded p-4 flex flex-col gap-4 h-full">
      {/* 레벨 배지 */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-hud-teal bg-hud-teal/10 border border-hud-teal/30 px-2 py-0.5 rounded">
          Lv. 18
        </span>
        <span className="flex gap-1">
          {/* HP 하트 3개 */}
          {[0, 1, 2].map((i) => (
            <span key={i} className="text-red-400 text-sm">♥</span>
          ))}
        </span>
      </div>

      {/* 캐릭터 아바타 */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-hud-bg border-2 border-hud-teal/50 rounded flex items-center justify-center overflow-hidden">
          {/* 픽셀 아트 스타일 아바타 자리 */}
          <div className="w-16 h-16 flex items-center justify-center">
            <svg viewBox="0 0 32 32" width="64" height="64" className="pixelated">
              {/* 머리 */}
              <rect x="10" y="4" width="12" height="10" fill="#F4C68A" />
              {/* 눈 */}
              <rect x="12" y="7" width="2" height="2" fill="#2D3142" />
              <rect x="18" y="7" width="2" height="2" fill="#2D3142" />
              {/* 입 */}
              <rect x="13" y="11" width="6" height="1" fill="#2D3142" />
              {/* 머리카락 */}
              <rect x="10" y="4" width="12" height="3" fill="#3D2B1F" />
              <rect x="8" y="5" width="2" height="5" fill="#3D2B1F" />
              {/* 몸 */}
              <rect x="9" y="14" width="14" height="10" fill="#2A5F8F" />
              {/* 팔 */}
              <rect x="5" y="14" width="4" height="8" fill="#2A5F8F" />
              <rect x="23" y="14" width="4" height="8" fill="#2A5F8F" />
              {/* 다리 */}
              <rect x="9" y="24" width="5" height="4" fill="#1A2E3F" />
              <rect x="18" y="24" width="5" height="4" fill="#1A2E3F" />
            </svg>
          </div>
        </div>
      </div>

      {/* 이름 및 역할 */}
      <div className="text-center">
        <p className="font-semibold text-hud-text text-base leading-tight">Hong Jinho</p>
        <span className="inline-block mt-1 font-mono text-xs text-hud-orange border border-hud-orange/40 px-2 py-0.5 rounded">
          Game Developer
        </span>
      </div>

      {/* 스킬 바 */}
      <div className="flex flex-col gap-2">
        {SKILLS.map((skill) => (
          <div key={skill.label}>
            <div className="flex justify-between mb-0.5">
              <span className="font-mono text-[10px] text-hud-text-dim">{skill.label}</span>
              <span className="font-mono text-[10px] text-hud-teal">{skill.value}</span>
            </div>
            <div className="h-1.5 bg-hud-bg rounded-full overflow-hidden border border-hud-border">
              <div
                className="h-full bg-hud-teal rounded-full"
                style={{ width: `${skill.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 한 줄 소개 */}
      <p className="font-mono text-[10px] text-hud-text-dim leading-relaxed mt-auto">
        I build playful experiences<br />
        and systems that players<br />
        love to explore.
      </p>
    </div>
  );
}
