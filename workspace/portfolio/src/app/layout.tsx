import type { Metadata } from 'next';
import { ThemeProvider } from '@/lib/ThemeProvider';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: '홍진호 | 게임 개발자 포트폴리오',
  description: '게임 개발자 홍진호의 포트폴리오 사이트',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 새로고침 시 테마 깜빡임 방지 — 렌더 전에 실행 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  var stored = localStorage.getItem('portfolio-theme');
  var resolved = stored === 'dark' ? 'dark'
    : stored === 'light' ? 'light'
    : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', resolved);
  if (resolved === 'dark') document.documentElement.classList.add('dark');
})();
`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
