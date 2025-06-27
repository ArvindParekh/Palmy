"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Calendar,
  FileText,
  TrendingUp,
  Trophy,
  Users,
  Target,
  Award,
  Flame,
  Star,
  Crown,
  Zap,
  GitBranch,
  Clock,
  Mail,
  Edit,
} from "lucide-react";

// Mock user data - replace with real data from your auth/user system
const userData = {
  name: "Arvind Kumar",
  username: "arvind_dev",
  email: "arvind@example.com",
  avatar: "/placeholder.svg?height=120&width=120",
  joinedDate: "March 2024",
  membershipType: "Pro",
  isVerified: true,
  bio: "Software engineer passionate about crafting compelling job applications and helping others land their dream roles.",
  location: "San Francisco, CA",
};

const userStats = {
  templates: 24,
  successRate: 87,
  communityRank: 127,
  totalViews: 2847,
  totalForks: 143,
  activeStreak: 23,
  avgRating: 4.8,
  templatesUsed: 156,
};

const achievements = [
  { name: "Template Master", icon: Crown, description: "Created 20+ templates", earned: true },
  { name: "Community Star", icon: Star, description: "Top 5% rated creator", earned: true },
  { name: "Streak Master", icon: Flame, description: "20+ day streak", earned: true },
  { name: "Helper", icon: Users, description: "100+ community forks", earned: true },
  { name: "Perfectionist", icon: Target, description: "90%+ success rate", earned: false },
  { name: "Influencer", icon: Zap, description: "1000+ profile views", earned: false },
];

const recentActivity = [
  { action: "Created template", item: "Senior PM Cover Letter", time: "2h ago", type: "create" },
  { action: "Template forked", item: "LinkedIn Cold DM", time: "5h ago", type: "fork" },
  { action: "Received rating", item: "Follow-up Email Template", time: "1d ago", type: "rating" },
  { action: "Updated template", item: "Startup Application", time: "2d ago", type: "update" },
];

export default function ProfilePage() {
  return (
    <div className="w-full min-h-screen p-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <Button variant="outline" size="sm" className="gap-2">
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        </div>

        {/* Profile Header Card */}
        <Card className="border-neutral-200 dark:border-neutral-800">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-2xl font-bold">
                    {userData.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-foreground">
                      {userData.name}
                    </h2>
                    {userData.isVerified && (
                      <Badge variant="secondary" className="gap-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        <Award className="w-3 h-3" />
                        Verified
                      </Badge>
                    )}
                    <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                      {userData.membershipType}
                    </Badge>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400">@{userData.username}</p>
                </div>

                <p className="text-neutral-700 dark:text-neutral-300 max-w-2xl">
                  {userData.bio}
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {userData.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Joined {userData.joinedDate}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Main Stats - Large Cards */}
        <Card className="md:col-span-1 border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Templates</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{userStats.templates}</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">+3 this week</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Success Rate</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{userStats.successRate}%</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">+5% this month</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Rank</span>
            </div>
            <p className="text-3xl font-bold text-foreground">#{userStats.communityRank}</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">↑12 positions</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 border-neutral-200 dark:border-neutral-800 hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Streak</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{userStats.activeStreak}</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">days active</p>
          </CardContent>
        </Card>

        {/* Detailed Stats - Spans 2 columns */}
        <Card className="lg:col-span-2 border-neutral-200 dark:border-neutral-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Detailed Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Total Views</span>
                  <span className="font-semibold text-foreground">{userStats.totalViews.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Community Forks</span>
                  <span className="font-semibold text-foreground">{userStats.totalForks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Average Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-foreground">{userStats.avgRating}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Templates Used</span>
                  <span className="font-semibold text-foreground">{userStats.templatesUsed}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Member Since</span>
                  <span className="font-semibold text-foreground">{userData.joinedDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Status</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Active
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements - Spans 2 columns */}
        <Card className="lg:col-span-2 border-neutral-200 dark:border-neutral-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned
                      ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20"
                      : "border-border bg-muted opacity-60"
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      achievement.earned
                        ? "bg-blue-500"
                        : "bg-neutral-400"
                    }`}>
                      <achievement.icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${
                        achievement.earned
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}>
                        {achievement.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity - Full width */}
        <Card className="lg:col-span-4 border-neutral-200 dark:border-neutral-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activity.type === "create" ? "bg-green-500" :
                    activity.type === "fork" ? "bg-blue-500" :
                    activity.type === "rating" ? "bg-yellow-500" :
                    "bg-purple-500"
                  }`}>
                    {activity.type === "create" && <FileText className="w-4 h-4 text-primary-foreground" />}
                    {activity.type === "fork" && <GitBranch className="w-4 h-4 text-primary-foreground" />}
                    {activity.type === "rating" && <Star className="w-4 h-4 text-primary-foreground" />}
                    {activity.type === "update" && <Edit className="w-4 h-4 text-primary-foreground" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.item}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
