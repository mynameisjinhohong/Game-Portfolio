# 스타일 사용 기준 가이드

GP-24(디자인 토큰 및 글로벌 스타일) 작업으로 정착한 앱 전역 스타일을 후속 화면 작업자가 어떻게 사용해야 하는지 정리한다. 새 화면을 추가할 때는 이 문서의 규칙을 우선 따른다.

## 적용 위치

- 앱 엔트리: `workspace/src/app/layout.tsx`
- 전역 CSS: `workspace/src/app/globals.css`
- Tailwind 설정: `workspace/tailwind.config.ts`

`layout.tsx`에서 `globals.css`를 임포트하고 `<html>` 태그에 폰트 변수 클래스를 부여하므로, 하위 화면(`page.tsx`, 컴포넌트)에서는 별도 글로벌 임포트가 필요 없다.

## 폰트 로딩 (next/font)

`workspace/src/app/layout.tsx`에서 `next/font/google`로 두 가지 폰트를 로드한다.

- `Inter` → `--font-inter` (본문, UI 텍스트)
- `JetBrains Mono` → `--font-mono` (코드, 수치 레이블, 모노스페이스 표기)

`<html>` 태그에 두 폰트 변수 클래스가 자동으로 부여되며, Tailwind 설정에서 `font-sans`, `font-mono` 유틸리티가 동일한 변수를 우선 참조한다.

사용 예:

```tsx
<span className="font-mono text-sm text-hud-teal">hongjinho.dev</span>
<p className="text-hud-text">기본 본문 텍스트는 자동으로 Inter가 적용된다.</p>
```

외부 `@import url(fonts.googleapis.com/...)` 방식은 사용하지 않는다. 폰트는 `next/font`만 통해 로드해 빌드 시 셀프 호스팅된다.

## 디자인 토큰 (Tailwind 색상)

`workspace/tailwind.config.ts`의 `theme.extend.colors.hud`에 정의된 토큰을 사용한다. 직접 hex 값을 적지 않는다.

| Tailwind 키 | CSS 변수(globals.css) | 용도 |
|---|---|---|
| `hud-bg` | `--color-hud-bg` | 페이지 배경 |
| `hud-panel` | `--color-hud-panel` | 카드·패널 배경 |
| `hud-border` | `--color-hud-border` | 테두리 |
| `hud-teal` | `--color-hud-teal` | 주요 강조색(청록) |
| `hud-teal-dim` | — | 비활성 강조 |
| `hud-orange` | `--color-hud-orange` | 보조 강조·CTA |
| `hud-text` | `--color-hud-text` | 기본 텍스트 |
| `hud-text-dim` | — | 보조 텍스트 |
| `hud-green` | — | 상태 표시(온라인 등) |

사용 예:

```tsx
<section className="bg-hud-panel border border-hud-border text-hud-text">
  <h2 className="text-hud-teal">제목</h2>
</section>
```

## 공통 컴포넌트 클래스

`globals.css`에 정의된 유틸리티 클래스는 그대로 재사용한다.

- `.hud-panel` — 패널 배경·테두리·청록색 코너 장식을 한 번에 적용한다.
- `.skill-bar-fill` — `--fill` 변수와 함께 사용하면 막대 그래프 채우기 애니메이션을 재생한다.

## 새 화면 추가 시 체크리스트

1. 색상은 hex 대신 `bg-hud-*`, `text-hud-*`, `border-hud-*` 등 Tailwind 토큰을 쓴다.
2. 폰트는 기본값이 Inter이므로 본문에 별도 지정이 필요 없다. 모노스페이스가 필요하면 `font-mono`만 추가한다.
3. 패널 모서리 강조가 필요하면 새 스타일을 만들지 말고 `.hud-panel`을 적용한다.
4. 외부 폰트나 색상을 새로 추가해야 한다면 먼저 `tailwind.config.ts`와 `globals.css`의 토큰을 확장한 뒤 화면에서 참조한다.
5. 전역 CSS는 `workspace/src/app/globals.css`에만 정의한다. 컴포넌트별 글로벌 스타일 파일을 새로 만들지 않는다.

## 동작 확인

- `npm run build` 가 통과하면 `next/font`로 폰트가 정상 셀프 호스팅된다.
- 메인 화면(`workspace/src/app/page.tsx`)에서 `font-mono`, `text-hud-teal`, `border-hud-border` 등을 이미 사용하므로 토큰·폰트가 화면에 반영되는 최소 적용 예시 역할을 한다.
