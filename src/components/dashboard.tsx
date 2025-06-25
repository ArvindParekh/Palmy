"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, TrendingUp, Users, Plus, ArrowUpRight, Zap, Target, Award } from "lucide-react"

interface DashboardProps {
  onNavigate: (view: string) => void
  onUseTemplate: (template: any) => void
}

const stats = [
  { title: "Templates", value: "24", icon: FileText, change: "+3 this week", color: "text-blue-600" },
  { title: "Success Rate", value: "87%", icon: TrendingUp, change: "+12% this month", color: "text-green-600" },
  { title: "Community Rank", value: "#127", icon: Users, change: "↑23 positions", color: "text-purple-600" },
]

const recentTemplates = [
  {
    id: 1,
    title: "Senior SWE Cover Letter",
    category: "Cover Letter",
    lastUsed: "2h ago",
    successRate: 92,
    icon: "💻",
  },
  {
    id: 2,
    title: "LinkedIn Cold DM",
    category: "Outreach",
    lastUsed: "1d ago",
    successRate: 78,
    icon: "💼",
  },
  {
    id: 3,
    title: "Follow-up Email",
    category: "Follow-up",
    lastUsed: "3d ago",
    successRate: 85,
    icon: "📧",
  },
]

const quickActions = [
  {
    title: "Create Template",
    description: "Start from scratch",
    icon: Plus,
    action: "editor",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Browse Community",
    description: "Find inspiration",
    icon: Users,
    action: "community",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Template Lab",
    description: "A/B test & optimize",
    icon: Zap,
    action: "lab",
    color: "from-orange-500 to-orange-600",
  },
  {
    title: "View Leaderboard",
    description: "See top creators",
    icon: Award,
    action: "leaderboard",
    color: "from-green-500 to-green-600",
  },
]

export function Dashboard({ onNavigate, onUseTemplate }: DashboardProps) {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Good morning, John</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-lg">Ready to land your next role?</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{stat.title}</span>
                    </div>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-green-600 dark:text-green-400">{stat.change}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              onClick={() => onNavigate(action.action)}
              variant="outline"
              className="h-24 flex-col gap-3 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 group"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-center">
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-400">
                  {action.description}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Recent Templates */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Recent Templates</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate("templates")}
            className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          >
            View all
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="space-y-3">
          {recentTemplates.map((template) => (
            <Card
              key={template.id}
              className="border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors cursor-pointer group"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center text-lg">
                      {template.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-neutral-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {template.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-xs">
                          {template.category}
                        </Badge>
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                          {template.successRate}% success
                        </span>
                        <span className="text-xs text-neutral-500">{template.lastUsed}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onUseTemplate(template)}
                    className="bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-black opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Use
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">AI Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-neutral-900 dark:text-white">Optimization Tip</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Your cover letters perform 23% better when you mention specific company achievements. Try adding
                    this to your templates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-neutral-900 dark:text-white">Trending Pattern</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Templates with 150-200 words have the highest response rates in your industry. Consider adjusting
                    your length.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
