import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ExternalLink, Github, Mail, Gamepad2, Star, Calendar } from 'lucide-react'
import './App.css'

// 게임 데이터
const games = [
  {
    id: 1,
    title: "Forest Adventure",
    description: "신비로운 숲을 탐험하는 2D 플랫포머 게임",
    image: "/src/assets/game1-thumbnail.png",
    technologies: ["Unity", "C#", "Pixel Art"],
    gameJam: "Global Game Jam 2024",
    playUrl: "https://your-username.github.io/forest-adventure",
    featured: true
  },
  {
    id: 2,
    title: "Block Puzzle Master",
    description: "전략적 사고가 필요한 미니멀 퍼즐 게임",
    image: "/src/assets/game2-thumbnail.png",
    technologies: ["JavaScript", "HTML5", "CSS3"],
    gameJam: "Ludum Dare 52",
    playUrl: "https://your-username.github.io/block-puzzle",
    featured: false
  },
  {
    id: 3,
    title: "Space Defender",
    description: "레트로 스타일의 우주 슈팅 게임",
    image: "/src/assets/game3-thumbnail.png",
    technologies: ["Godot", "GDScript", "Pixel Art"],
    gameJam: "Mini Jam 120",
    playUrl: "https://your-username.github.io/space-defender",
    featured: true
  },
  {
    id: 4,
    title: "Endless Runner",
    description: "활기찬 무한 러닝 액션 게임",
    image: "/src/assets/game4-thumbnail.png",
    technologies: ["Unity", "C#", "Mobile"],
    gameJam: "Game Jam Plus 2024",
    playUrl: "https://your-username.github.io/endless-runner",
    featured: false
  }
]

function App() {
  const [hoveredCard, setHoveredCard] = useState(null)

  const handlePlayGame = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Gamepad2 className="h-8 w-8 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white">Game Jam Portfolio</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              게임잼 포트폴리오
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              다양한 게임잼에서 제작한 창의적이고 독특한 게임들을 만나보세요. 
              각 게임은 제한된 시간 안에서 탄생한 아이디어와 열정의 결과물입니다.
            </p>
            <div className="flex items-center justify-center space-x-6 text-slate-400">
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-400" />
                <span>{games.filter(g => g.featured).length}개의 추천 게임</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-400" />
                <span>{games.length}개의 게임잼 참여</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">게임 컬렉션</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {games.map((game) => (
              <Card 
                key={game.id}
                className={`bg-slate-800/50 border-slate-700 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/20 ${
                  hoveredCard === game.id ? 'ring-2 ring-cyan-400/50' : ''
                }`}
                onMouseEnter={() => setHoveredCard(game.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={game.image} 
                      alt={game.title}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                    {game.featured && (
                      <Badge className="absolute top-3 right-3 bg-yellow-500 text-black">
                        <Star className="h-3 w-3 mr-1" />
                        추천
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-white mb-2 text-xl">{game.title}</CardTitle>
                  <CardDescription className="text-slate-300 mb-4 leading-relaxed">
                    {game.description}
                  </CardDescription>
                  <div className="mb-4">
                    <p className="text-sm text-slate-400 mb-2">게임잼: {game.gameJam}</p>
                    <div className="flex flex-wrap gap-2">
                      {game.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    onClick={() => handlePlayGame(game.playUrl)}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    게임 플레이
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold text-white mb-4">함께 게임을 만들어요!</h4>
            <p className="text-slate-300 mb-6">
              게임 개발에 관심이 있으시거나 협업을 원하신다면 언제든 연락주세요.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Mail className="h-4 w-4 mr-2" />
                이메일
              </Button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-700/50">
            <p className="text-slate-400 text-sm">
              © 2024 Game Jam Portfolio. 모든 게임은 해당 게임잼 기간 동안 제작되었습니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

