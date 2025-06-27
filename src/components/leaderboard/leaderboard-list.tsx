import { ChevronRight } from "lucide-react";
import { LeaderboardUser } from "./podium-section";
import { cn } from "@/lib/utils";

interface LeaderboardListProps {
  users: LeaderboardUser[];
  startRank?: number;
}

export function LeaderboardList({ users, startRank = 4 }: LeaderboardListProps) {
  return (
    <div className="px-8 pb-16">
      <div className="max-w-4xl mx-auto space-y-3">
        {users.map((user, index) => (
          <UserCard key={user.id} user={user} rank={startRank + index} />
        ))}
      </div>
    </div>
  );
}

function UserCard({ user, rank }: { user: LeaderboardUser; rank: number }) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all duration-200 cursor-pointer">
      <div className="flex items-center space-x-6">
        {/* Rank */}
        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            {rank}
          </span>
        </div>
        
        {/* Avatar */}
        <div className="flex-shrink-0 relative">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {getInitials(user.name)}
            </span>
          </div>
          {user.isVerified && (
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          )}
        </div>
        
        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-1">
            <h3 className="text-base font-semibold text-foreground truncate">
              {user.name}
            </h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {user.title}
          </p>
        </div>
        
        {/* Stats */}
        <div className="hidden md:flex items-center space-x-8 text-sm">
          <div className="text-center">
            <p className="font-semibold text-foreground">
              {user.stats.templates}
            </p>
            <p className="text-gray-500 dark:text-gray-500">Templates</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground">
              {user.stats.forks}
            </p>
            <p className="text-gray-500 dark:text-gray-500">Forks</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground">
              {user.stats.successRate}%
            </p>
            <p className="text-gray-500 dark:text-gray-500">Success</p>
          </div>
        </div>
        
        {/* Score */}
        <div className="text-right">
          <p className="text-lg font-bold text-foreground">
            {user.score.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">points</p>
        </div>
        
        {/* Arrow */}
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-1 transition-all duration-200" />
      </div>
    </div>
  );
} 