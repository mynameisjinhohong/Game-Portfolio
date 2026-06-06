import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 의미 기반 토큰 (CSS 변수 → 라이트/다크 모두 동일 클래스명으로 사용)
        bg: {
          DEFAULT: 'var(--color-bg)',
          elevated: 'var(--color-bg-elevated)',
          sunken: 'var(--color-bg-sunken)',
        },
        panel: {
          DEFAULT: 'var(--color-panel)',
          soft: 'var(--color-panel-soft)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          strong: 'var(--color-border-strong)',
        },
        content: {
          DEFAULT: 'var(--color-text)',
          dim: 'var(--color-text-dim)',
          muted: 'var(--color-text-muted)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          strong: 'var(--color-accent-strong)',
          soft: 'var(--color-accent-soft)',
        },
        cta: {
          DEFAULT: 'var(--color-cta)',
          strong: 'var(--color-cta-strong)',
          soft: 'var(--color-cta-soft)',
        },
        // A-04 정적 팔레트 (참조용)
        cream: '#FAF7F2',
        graphite: '#2D3142',
        teal: {
          DEFAULT: '#2A9D8F',
          light: '#3FB8A8',
          dark: '#1F7268',
        },
        // 하위 호환: 기존 hud-* 클래스가 라이트/다크 모두에서 자연스럽게 보이도록 토큰에 매핑
        hud: {
          bg: 'var(--color-bg)',
          panel: 'var(--color-panel)',
          border: 'var(--color-border)',
          teal: 'var(--color-accent)',
          'teal-dim': 'var(--color-accent-strong)',
          orange: 'var(--color-cta)',
          text: 'var(--color-text)',
          'text-dim': 'var(--color-text-dim)',
          green: 'var(--color-success)',
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        panel: 'var(--shadow-panel)',
        cta: 'var(--shadow-cta)',
      },
    },
  },
  plugins: [],
};

export default config;
