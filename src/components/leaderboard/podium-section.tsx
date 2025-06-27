import { Crown, Medal, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface LeaderboardUser {
  id: string;
  name: string;
  rank: number;
  score: number;
  badges: string[];
  stats: {
    templates: number;
    forks: number;
    likes: number;
    successRate: number;
  };
  streak: number;
  joinedDate: string;
  isVerified?: boolean;
  title?: string;
}

interface PodiumSectionProps {
  topUsers: LeaderboardUser[];
}

export function PodiumSection({ topUsers }: PodiumSectionProps) {
  const [first, second, third] = topUsers;
  
  return (
    <div className="px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Top Performers
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            This month's leading contributors to the community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-4xl mx-auto">
          {/* Second Place */}
          {second && (
            <div className="order-1 md:order-1">
              <PodiumCard user={second} position={2} />
            </div>
          )}
          
          {/* First Place */}
          {first && (
            <div className="order-2 md:order-2">
              <PodiumCard user={first} position={1} />
            </div>
          )}
          
          {/* Third Place */}
          {third && (
            <div className="order-3 md:order-3">
              <PodiumCard user={third} position={3} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PodiumCard({ user, position }: { user: LeaderboardUser; position: number }) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const positionConfig = {
    1: { 
      height: 'md:h-80',
      icon: Crown,
      iconBg: 'bg-amber-500',
      cardBg: 'bg-gradient-to-b from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20',
      border: 'border-amber-200 dark:border-amber-800'
    },
    2: { 
      height: 'md:h-72',
      icon: Medal,
      iconBg: 'bg-gray-400',
      cardBg: 'bg-gradient-to-b from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20',
      border: 'border-gray-200 dark:border-gray-800'
    },
    3: { 
      height: 'md:h-64',
      icon: Award,
      iconBg: 'bg-orange-500',
      cardBg: 'bg-gradient-to-b from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20',
      border: 'border-orange-200 dark:border-orange-800'
    }
  };
  
  const config = positionConfig[position as keyof typeof positionConfig];
  const Icon = config.icon;
  
  return (
    <div className={cn("relative group", config.height)}>
      {/* Position indicator */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-900", config.iconBg)}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {/* Main Card */}
      <div className={cn(
        "relative rounded-2xl border p-8 h-full flex flex-col justify-center transition-all duration-200 group-hover:-translate-y-1",
        config.cardBg,
        config.border
      )}>
        <div className="text-center space-y-6">
          {/* Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center">
                <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                  {getInitials(user.name)}
                </span>
              </div>
              {user.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              )}
            </div>
          </div>
          
          {/* User Info */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              {user.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {user.title}
            </p>
          </div>
          
          {/* Score */}
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {user.score.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider">
              Points
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <p className="font-semibold text-foreground">
                {user.stats.templates}
              </p>
              <p className="text-gray-500 dark:text-gray-500">Templates</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground">
                {user.stats.successRate}%
              </p>
              <p className="text-gray-500 dark:text-gray-500">Success</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 