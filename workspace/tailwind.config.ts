import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        teal: {
          DEFAULT: '#2A9D8F',
          light: '#3FB8A8',
          dark: '#1F7268',
        },
        graphite: '#2D3142',
        orange: {
          accent: '#F4A261',
        },
        hud: {
          bg: '#0B1622',
          panel: '#0E1F30',
          border: '#1A3A50',
          teal: '#00C9A7',
          'teal-dim': '#007A65',
          orange: '#FF7A2F',
          text: '#C8E6EF',
          'text-dim': '#5A7A8A',
          green: '#4ADE80',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        heading: ['var(--font-rajdhani)', 'Inter', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', "'JetBrains Mono'", 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
