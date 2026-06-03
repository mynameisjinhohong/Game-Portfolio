export interface Game {
  slug: string;
  title: string;
  subtitle?: string;
  genre: string;
  platform: string;
  color: string;
  awards?: string[];
  featured: boolean;
}

export const GAMES: Game[] = [
  {
    slug: "math-king",
    title: "수학의 제왕",
    subtitle: "HotSix",
    genre: "2D 횡스크롤 디펜스",
    platform: "Android",
    color: "#4A90D9",
    awards: ["웅진씽크빅 우수상"],
    featured: true,
  },
  {
    slug: "strong-rabbit",
    title: "강한 토끼만이 살아남는다",
    subtitle: "Cardungeon",
    genre: "실시간 멀티플레이 덱빌딩 서바이벌",
    platform: "PC + 모바일",
    color: "#E76F51",
    awards: ["뒤끝 게임잼 수상", "인디크래프트 입상", "PlayX4 부스 출품"],
    featured: true,
  },
  {
    slug: "panda-rush",
    title: "판다러쉬",
    genre: "러닝게임",
    platform: "Android (Google Play)",
    color: "#27AE60",
    awards: ["이븐아이 게임톤 대상"],
    featured: true,
  },
  {
    slug: "black-fog-red-moon",
    title: "검은 안개, 붉은 달",
    subtitle: "unizam",
    genre: "한국형 오컬트 턴제 전략",
    platform: "PC",
    color: "#6C3483",
    awards: ["UniDev 게임잼"],
    featured: false,
  },
  {
    slug: "universe",
    title: "Universe",
    genre: "2D 메타버스 플랫폼",
    platform: "PC",
    color: "#2E86AB",
    featured: false,
  },
  {
    slug: "inoriter",
    title: "아이노리터",
    subtitle: "Inoriter",
    genre: "인터렉티브 미니게임 플랫폼",
    platform: "빔프로젝터/전자칠판",
    color: "#F18F01",
    featured: false,
  },
];

export const FEATURED_GAMES = GAMES.filter((g) => g.featured);
