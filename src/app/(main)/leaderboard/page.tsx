"use client";

import { useState } from "react";
import { LeaderboardHero } from "@/components/leaderboard/leaderboard-hero";
import { LeaderboardTabs, LeaderboardTab } from "@/components/leaderboard/leaderboard-tabs";
import { PodiumSection, LeaderboardUser } from "@/components/leaderboard/podium-section";
import { LeaderboardList } from "@/components/leaderboard/leaderboard-list";
import { AchievementsSection } from "@/components/leaderboard/achievements-section";

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('creators');

  // Mock data - replace with real data in production
  const mockUsers: LeaderboardUser[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      rank: 1,
      score: 2847,
      badges: ['Template Master', 'Community Star', 'Premium Creator'],
      stats: { templates: 47, forks: 1203, likes: 892, successRate: 94 },
      streak: 23,
      joinedDate: '2024-01',
      isVerified: true,
      title: 'Template Architect'
    },
    {
      id: '2', 
      name: 'Alex Rivera',
      rank: 2,
      score: 2341,
      badges: ['Rising Star', 'Innovator'],
      stats: { templates: 35, forks: 876, likes: 654, successRate: 91 },
      streak: 18,
      joinedDate: '2024-02',
      isVerified: true,
      title: 'Innovation Lead'
    },
    {
      id: '3',
      name: 'Maya Patel', 
      rank: 3,
      score: 1987,
      badges: ['Precision Pro', 'Speed Demon'],
      stats: { templates: 28, forks: 567, likes: 432, successRate: 89 },
      streak: 15,
      joinedDate: '2024-03',
      title: 'Growth Specialist'
    },
    {
      id: '4',
      name: 'Jordan Kim',
      rank: 4,
      score: 1654,
      badges: ['Community Helper'],
      stats: { templates: 22, forks: 398, likes: 287, successRate: 86 },
      streak: 12,
      joinedDate: '2024-04',
      title: 'Strategy Consultant'
    },
    {
      id: '5',
      name: 'Luna Zhang',
      rank: 5,
      score: 1432,
      badges: ['Quality Focused'],
      stats: { templates: 19, forks: 234, likes: 198, successRate: 88 },
      streak: 9,
      joinedDate: '2024-05',
      title: 'Creative Director'
    },
    {
      id: '6',
      name: 'Marcus Thompson',
      rank: 6,
      score: 1298,
      badges: ['Consistent Creator'],
      stats: { templates: 16, forks: 189, likes: 145, successRate: 82 },
      streak: 7,
      joinedDate: '2024-06',
      title: 'Product Manager'
    },
    {
      id: '7',
      name: 'Emma Wilson',
      rank: 7,
      score: 1156,
      badges: ['Team Player'],
      stats: { templates: 14, forks: 167, likes: 123, successRate: 85 },
      streak: 5,
      joinedDate: '2024-07',
      title: 'UX Designer'
    }
  ];

  const communityStats = {
    totalUsers: 12847,
    totalTemplates: 3421,
    totalForks: 45678,
    successRate: 87
  };

  const achievements = [
    { 
      name: 'Template Master', 
      description: 'Created 50+ high-quality templates', 
      rarity: 'legendary' as const,
      icon: 'trophy',
      category: 'Creation'
    },
    { 
      name: 'Community Star', 
      description: 'Received 1000+ likes from the community', 
      rarity: 'epic' as const,
      icon: 'star',
      category: 'Recognition'
    },
    { 
      name: 'Consistency King', 
      description: 'Maintained a 30-day creation streak', 
      rarity: 'rare' as const,
      icon: 'zap',
      category: 'Dedication'
    },
    { 
      name: 'Premium Creator', 
      description: 'Achieved 95%+ success rate', 
      rarity: 'legendary' as const,
      icon: 'crown',
      category: 'Quality'
    },
    { 
      name: 'Rising Star', 
      description: 'Reached top 10 within first month', 
      rarity: 'epic' as const,
      icon: 'trending',
      category: 'Growth'
    },
    { 
      name: 'Innovation Pioneer', 
      description: 'First to adopt new platform features', 
      rarity: 'rare' as const,
      icon: 'shield',
      category: 'Innovation'
    },
    { 
      name: 'Speed Demon', 
      description: 'Fastest template creation times', 
      rarity: 'common' as const,
      icon: 'zap',
      category: 'Efficiency'
    },
    { 
      name: 'Precision Pro', 
      description: 'Consistently high-quality submissions', 
      rarity: 'rare' as const,
      icon: 'target',
      category: 'Quality'
    }
  ];

  return (
    <div className="">
      {/* Hero Section */}
      <LeaderboardHero communityStats={communityStats} />

      {/* Navigation Tabs */}
      <LeaderboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content based on active tab */}
      {activeTab === 'achievements' ? (
        <AchievementsSection achievements={achievements} />
      ) : (
        <>
          {/* Podium Section */}
          <PodiumSection topUsers={mockUsers.slice(0, 3)} />
          
          {/* Leaderboard List */}
          <LeaderboardList users={mockUsers.slice(3)} />
        </>
      )}
    </div>
  );
}
