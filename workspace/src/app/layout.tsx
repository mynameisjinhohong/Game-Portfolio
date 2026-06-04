import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '홍진호 | 게임 개발자 포트폴리오',
  description: '게임 개발자 홍진호의 포트폴리오입니다. 챗봇을 통해 경험과 프로젝트를 탐색해보세요.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
