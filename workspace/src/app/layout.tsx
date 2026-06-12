import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '홍진호 | 게임 개발자 포트폴리오',
  description: '게임 개발자 홍진호의 포트폴리오입니다. 챗봇을 통해 경험과 프로젝트를 탐색해보세요.',
};

// hydration 전에 저장된/시스템 테마를 미리 적용해 깜빡임을 방지한다.
const themeBootstrap = `
(function() {
  try {
    var stored = localStorage.getItem('portfolio-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    var root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    root.dataset.theme = theme;
  } catch (_) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="bg-bg text-content antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
