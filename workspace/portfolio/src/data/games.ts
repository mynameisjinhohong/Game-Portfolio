export interface Game {
  slug: string;
  title: string;
  titleKo: string;
  subtitle: string;
  genre: string;
  platform: string;
  teamSize: number;
  color: string;
  awards?: string[];
  featured?: boolean;
}

export const GAMES: Game[] = [
  {
    slug: 'math-king',
    title: '수학의 제왕',
    titleKo: '수학의 제왕 (HotSix)',
    subtitle: '2D 횡스크롤 디펜스 · Unity',
    genre: '2D 횡스크롤 디펜스',
    platform: 'Android',
    teamSize: 6,
    color: '#4A90D9',
    awards: ['제3회 웅진씽크빅 게임 개발 챌린지 우수상'],
    featured: true,
  },
  {
    slug: 'strong-rabbit',
    title: '강한 토끼만이 살아남는다',
    titleKo: '강한 토끼만이 살아남는다 (Cardungeon)',
    subtitle: '실시간 멀티플레이 덱빌딩 · Unity',
    genre: '실시간 멀티플레이 덱빌딩 서바이벌',
    platform: 'PC + 모바일',
    teamSize: 6,
    color: '#E76F51',
    awards: ['뒤끝 게임잼 수상', '2024 인디크래프트 챌린저 부문 입상', 'PlayX4 인디오락실 부스'],
    featured: true,
  },
  {
    slug: 'panda-rush',
    title: '판다러쉬',
    titleKo: '판다러쉬 : 황금 죽순을 향한 여정',
    subtitle: '러닝게임 · Unity',
    genre: '러닝게임',
    platform: 'Android (Google Play)',
    teamSize: 7,
    color: '#27AE60',
    awards: ['이븐아이 게임톤 대상', 'Google Play Store 런칭'],
    featured: true,
  },
  {
    slug: 'black-fog-red-moon',
    title: '검은 안개, 붉은 달',
    titleKo: '검은 안개, 붉은 달 (unizam)',
    subtitle: '턴제 전략 · Unity',
    genre: '한국형 오컬트 턴제 전략',
    platform: 'PC',
    teamSize: 0,
    color: '#8E44AD',
    awards: ['전국 게임개발 동아리 UniDev 게임잼'],
    featured: false,
  },
  {
    slug: 'universe',
    title: 'Universe',
    titleKo: 'Universe',
    subtitle: '2D 메타버스 플랫폼 · Unity',
    genre: '2D 메타버스 플랫폼',
    platform: 'PC',
    teamSize: 0,
    color: '#2C3E50',
    featured: false,
  },
  {
    slug: 'inoriter',
    title: 'Inoriter',
    titleKo: '아이노리터 (Inoriter)',
    subtitle: '인터렉티브 미니게임 플랫폼 · Unity',
    genre: '인터렉티브 미니게임 플랫폼',
    platform: '빔프로젝터 / 전자칠판',
    teamSize: 0,
    color: '#E67E22',
    awards: ['TV스토리 외주 납품', '쌤활용품점 판매'],
    featured: false,
  },
];

export const FEATURED_GAMES = GAMES.filter((g) => g.featured);
