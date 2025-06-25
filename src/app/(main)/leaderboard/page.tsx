"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Zap,
  Trophy,
  Star,
  TrendingUp,
  Users,
  Crown,
  Medal,
  Award,
  Flame,
  Target,
  GitBranch,
  Calendar,
  Sparkles,
} from "lucide-react"

const topCreators = [
  {
    rank: 1,
    name: "Sarah Chen",
    username: "sarah_chen",
    avatar: "/placeholder.svg?height=40&width=40",
    templates: 47,
    totalForks: 2847,
    avgRating: 4.9,
    successRate: 89,
    streak: 23,
    badges: ["Top Creator", "Verified", "Streak Master"],
    joinedDate: "2023-08-15",
    specialty: "AI & Product",
    isVerified: true,
  },
  {
    rank: 2,
    name: "Alex Rodriguez",
    username: "alex_dev",
    avatar: "/placeholder.svg?height=40&width=40",
    templates: 32,
    totalForks: 1876,
    avgRating: 4.8,
    successRate: 85,
    streak: 18,
    badges: ["Rising Star", "Verified"],
    joinedDate: "2023-09-22",
    specialty: "Engineering",
    isVerified: true,
  },
  {
    rank: 3,
    name: "Jordan Kim",
    username: "jordan_codes",
    avatar: "/placeholder.svg?height=40&width=40",
    templates: 28,
    totalForks: 1543,
    avgRating: 4.7,
    successRate: 91,
    streak: 12,
    badges: ["Quality Master"],
    joinedDate: "2023-10-05",
    specialty: "Full Stack",
    isVerified: false,
  },
  {
    rank: 4,
    name: "Taylor Swift",
    username: "taylor_dev",
    avatar: "/placeholder.svg?height=40&width=40",
    templates: 24,
    totalForks: 1234,
    avgRating: 4.6,
    successRate: 82,
    streak: 8,
    badges: ["Consistent"],
    joinedDate: "2023-11-12",
    specialty: "Product Design",
    isVerified: true,
  },
  {
    rank: 5,
    name: "Morgan Lee",
    username: "morgan_pm",
    avatar: "/placeholder.svg?height=40&width=40",
    templates: 19,
    totalForks: 987,
    avgRating: 4.5,
    successRate: 78,
    streak: 15,
    badges: ["Newcomer"],
    joinedDate: "2023-12-01",
    specialty: "Product Management",
    isVerified: false,
  },
]

const topTemplates = [
  {
    rank: 1,
    title: "Product Manager @ AI Startup",
    author: "Sarah Chen",
    forks: 234,
    rating: 4.9,
    successRate: 94,
    category: "Cover Letters",
    createdDate: "2024-01-15",
  },
  {
    rank: 2,
    title: "Senior Engineer Interview Follow-up",
    author: "Jordan Kim",
    forks: 189,
    rating: 4.8,
    successRate: 91,
    category: "Follow-up",
    createdDate: "2024-01-08",
  },
  {
    rank: 3,
    title: "YC Founder Cold Outreach",
    author: "Alex Rodriguez",
    forks: 156,
    rating: 4.7,
    successRate: 67,
    category: "Cold Outreach",
    createdDate: "2024-01-10",
  },
  {
    rank: 4,
    title: "LinkedIn Connection → Coffee",
    author: "Taylor Swift",
    forks: 123,
    rating: 4.6,
    successRate: 89,
    category: "LinkedIn Messages",
    createdDate: "2024-01-05",
  },
  {
    rank: 5,
    title: "Referral Request Template",
    author: "Morgan Lee",
    forks: 89,
    rating: 4.5,
    successRate: 73,
    category: "Referrals",
    createdDate: "2024-01-03",
  },
]

const achievements = [
  {
    title: "First Template",
    description: "Created your first template",
    icon: Target,
    rarity: "Common",
    unlockedBy: 2847,
  },
  {
    title: "Rising Star",
    description: "Reached top 100 creators",
    icon: Star,
    rarity: "Uncommon",
    unlockedBy: 234,
  },
  {
    title: "Streak Master",
    description: "20+ day creation streak",
    icon: Flame,
    rarity: "Rare",
    unlockedBy: 67,
  },
  {
    title: "Community Favorite",
    description: "Template with 100+ forks",
    icon: GitBranch,
    rarity: "Epic",
    unlockedBy: 23,
  },
  {
    title: "Perfect Score",
    description: "5.0 average rating",
    icon: Crown,
    rarity: "Legendary",
    unlockedBy: 5,
  },
]

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState("creators")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-[#FFD700]" />
      case 2:
        return <Medal className="w-5 h-5 text-[#C0C0C0]" />
      case 3:
        return <Award className="w-5 h-5 text-[#CD7F32]" />
      default:
        return (
          <div className="w-6 h-6 bg-[#333] rounded-full flex items-center justify-center text-xs font-bold">
            {rank}
          </div>
        )
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-[#666]/20 text-[#666]"
      case "Uncommon":
        return "bg-[#00FF88]/20 text-[#00FF88]"
      case "Rare":
        return "bg-[#00D2FF]/20 text-[#00D2FF]"
      case "Epic":
        return "bg-[#FF6B6B]/20 text-[#FF6B6B]"
      case "Legendary":
        return "bg-[#FFD700]/20 text-[#FFD700]"
      default:
        return "bg-[#666]/20 text-[#666]"
    }
  }

  return (
    <div className="min-h-screen text-white">

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold">Leaderboard</h1>
          </div>
          <p className="text-[#666]">Top creators and most successful templates in the community</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-[#111] border-[#222] grid w-full grid-cols-3">
            <TabsTrigger value="creators" className="data-[state=active]:bg-[#222]">
              <Users className="w-4 h-4 mr-2" />
              Top Creators
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-[#222]">
              <TrendingUp className="w-4 h-4 mr-2" />
              Best Templates
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-[#222]">
              <Sparkles className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="creators" className="space-y-6">
            {/* Podium */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {topCreators.slice(0, 3).map((creator, index) => (
                <Card
                  key={creator.username}
                  className={`bg-[#111] border-[#222] hover:border-[#333] transition-all duration-200 p-6 ${
                    index === 0 ? "md:order-2 ring-2 ring-[#FFD700]/20" : index === 1 ? "md:order-1" : "md:order-3"
                  }`}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-4">{getRankIcon(creator.rank)}</div>
                    <Avatar className="h-16 w-16 mx-auto mb-4">
                      <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <h3 className="font-bold">{creator.name}</h3>
                      {creator.isVerified && (
                        <div className="w-4 h-4 bg-[#00D2FF] rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <p className="text-[#666] text-sm mb-3">@{creator.username}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#666]">Templates</span>
                        <span className="font-mono">{creator.templates}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#666]">Success Rate</span>
                        <span className="font-mono text-[#00FF88]">{creator.successRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#666]">Rating</span>
                        <span className="font-mono text-[#FFD700]">{creator.avgRating}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Full Leaderboard */}
            <Card className="bg-[#111] border-[#222]">
              <div className="p-6">
                <h3 className="font-bold text-lg mb-6">Full Rankings</h3>
                <div className="space-y-4">
                  {topCreators.map((creator) => (
                    <div
                      key={creator.username}
                      className="flex items-center justify-between p-4 bg-[#222] rounded-lg hover:bg-[#333] transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8">{getRankIcon(creator.rank)}</div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{creator.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{creator.name}</h4>
                            {creator.isVerified && (
                              <div className="w-4 h-4 bg-[#00D2FF] rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            )}
                          </div>
                          <p className="text-[#666] text-sm">
                            @{creator.username} • {creator.specialty}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <p className="font-mono">{creator.templates}</p>
                          <p className="text-[#666] text-xs">Templates</p>
                        </div>
                        <div className="text-center">
                          <p className="font-mono text-[#FFD700]">{creator.avgRating}</p>
                          <p className="text-[#666] text-xs">Rating</p>
                        </div>
                        <div className="text-center">
                          <p className="font-mono text-[#00FF88]">{creator.successRate}%</p>
                          <p className="text-[#666] text-xs">Success</p>
                        </div>
                        <div className="text-center">
                          <p className="font-mono text-[#FF6B6B]">{creator.streak}d</p>
                          <p className="text-[#666] text-xs">Streak</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card className="bg-[#111] border-[#222]">
              <div className="p-6">
                <h3 className="font-bold text-lg mb-6">Most Successful Templates</h3>
                <div className="space-y-4">
                  {topTemplates.map((template) => (
                    <div
                      key={template.title}
                      className="flex items-center justify-between p-4 bg-[#222] rounded-lg hover:bg-[#333] transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8">{getRankIcon(template.rank)}</div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{template.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-[#666]">
                            <span>by {template.author}</span>
                            <Badge variant="secondary" className="bg-[#333] text-[#999] text-xs">
                              {template.category}
                            </Badge>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(template.createdDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6 text-sm">
                        <div className="text-center">
                          <p className="font-mono text-[#FFD700]">{template.rating}</p>
                          <p className="text-[#666] text-xs">Rating</p>
                        </div>
                        <div className="text-center">
                          <p className="font-mono">{template.forks}</p>
                          <p className="text-[#666] text-xs">Forks</p>
                        </div>
                        <div className="text-center">
                          <p className="font-mono text-[#00FF88]">{template.successRate}%</p>
                          <p className="text-[#666] text-xs">Success</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="bg-[#111] border-[#222] hover:border-[#333] transition-all duration-200 p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00D2FF] to-[#3A7BD5] rounded-lg flex items-center justify-center">
                      <achievement.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-bold">{achievement.title}</h3>
                        <Badge variant="secondary" className={`text-xs border-0 ${getRarityColor(achievement.rarity)}`}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                      <p className="text-[#666] text-sm mb-3">{achievement.description}</p>
                      <div className="flex items-center text-xs text-[#666]">
                        <Users className="w-3 h-3 mr-1" />
                        {achievement.unlockedBy.toLocaleString()} users unlocked
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
