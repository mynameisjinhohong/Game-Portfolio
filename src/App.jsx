import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Github, Mail, Gamepad2, Star, Calendar, Copy, Check } from 'lucide-react'
import './App.css'
import cleanRoomImg from './assets/cleanRoom.png'


const games = [
  {
    id: 1,
    title: "방좀 치워!",
    description: "제한 시간 내에 방을 치워야 하는 코딩 퍼즐 게임",
    image: cleanRoomImg,  // 따옴표 제거!
    technologies: ["Unity", "C#", "Ai Art"],
    gameJam: "만들래 - 10분 게임 콘테스트[방치편]",
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
  const [showEmailPopup, setShowEmailPopup] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const emailPopupRef = useRef(null)
  const emailAddress = "ghddhksduq@naver.com"

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emailPopupRef.current && !emailPopupRef.current.contains(event.target)) {
        setShowEmailPopup(false)
        setEmailCopied(false)
      }
    }

    if (showEmailPopup) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showEmailPopup])

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email: ', err)
      const textArea = document.createElement('textarea')
      textArea.value = emailAddress
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    }
  }

  const handlePlayGame = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Gamepad2 className="h-8 w-8 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white">Jinho's Games</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/mynameisjinhohong" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-cyan-400 hover:bg-slate-700/50 transition-colors duration-200">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </a>
              
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-300 hover:text-cyan-400 hover:bg-slate-700/50 transition-colors duration-200"
                  onClick={() => setShowEmailPopup(!showEmailPopup)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
                {showEmailPopup && (
                  <div 
                    ref={emailPopupRef}
                    className="absolute top-full mt-2 right-0 bg-slate-800 border border-slate-600 rounded-lg shadow-lg p-4 min-w-[280px] z-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-slate-400 mb-1">Email Address</p>
                        <p className="text-slate-200 font-mono text-sm break-all">{emailAddress}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-3 text-slate-300 hover:text-cyan-400 hover:bg-slate-700/50 transition-colors duration-200"
                        onClick={copyEmailToClipboard}
                      >
                        {emailCopied ? (
                          <Check className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {emailCopied && (
                      <p className="text-green-400 text-xs mt-2">Email copied to clipboard!</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            홍진호의 <span className="text-cyan-400">미니 게임들</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              제가 지금까지 만든 다양한 미니게임들을 소개합니다!
          </p>
          <p className="text-sm text-slate-400 mt-2">
            출시, 멀티, 볼륨이 너무 큼 등등의 이유로 여기에 없는 작품들도 많습니다.<br />
            그런 작품들은 포트폴리오를 참고해주시길 바랍니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {games.map((game) => (
            <Card 
              key={game.id}
              className="bg-slate-800/50 border-slate-700 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer"
              onMouseEnter={() => setHoveredCard(game.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handlePlayGame(game.playUrl)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white text-xl mb-2 group-hover:text-cyan-400 transition-colors">
                      {game.title}
                      {game.featured && (
                        <Star className="inline-block w-5 h-5 text-yellow-400 ml-2" />
                      )}
                    </CardTitle>
                    <CardDescription className="text-slate-300 text-sm mb-3">
                      {game.description}
                    </CardDescription>
                    <div className="flex items-center text-slate-400 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      {game.gameJam}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-4">
                <div className="aspect-video bg-slate-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center">
                    <Gamepad2 className="w-16 h-16 text-slate-500" />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {game.technologies.map((tech, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-slate-700 text-slate-200 hover:bg-cyan-400/20 hover:text-cyan-400 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white transition-all duration-200 group-hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePlayGame(game.playUrl)
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  게임 플레이
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-700/50 bg-slate-900/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-slate-400">
              봐주셔서 감사합니다 ^^
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App