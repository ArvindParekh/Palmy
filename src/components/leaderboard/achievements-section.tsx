import { Award, Star, Zap, Target, TrendingUp, Trophy, Shield, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Achievement {
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
  category: string;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  const getAchievementIcon = (iconName: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      trophy: Trophy,
      star: Star,
      crown: Crown,
      shield: Shield,
      target: Target,
      trending: TrendingUp,
      zap: Zap,
      award: Award
    };
    return iconMap[iconName] || Award;
  };

  const rarityConfig = {
    common: {
      bg: 'bg-gray-50 dark:bg-gray-800',
      border: 'border-gray-200 dark:border-gray-700',
      iconBg: 'bg-gray-100 dark:bg-gray-700',
      badgeColor: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
    },
    rare: {
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      border: 'border-blue-200 dark:border-blue-800',
      iconBg: 'bg-blue-100 dark:bg-blue-900/50',
      badgeColor: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
    },
    epic: {
      bg: 'bg-purple-50 dark:bg-purple-950/20',
      border: 'border-purple-200 dark:border-purple-800',
      iconBg: 'bg-purple-100 dark:bg-purple-900/50',
      badgeColor: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
    },
    legendary: {
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      border: 'border-amber-200 dark:border-amber-800',
      iconBg: 'bg-amber-100 dark:bg-amber-900/50',
      badgeColor: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
    }
  };

  return (
    <div className="px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Achievement System
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Unlock milestones as you contribute to the community and help others succeed 
            in their job search journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => {
            const config = rarityConfig[achievement.rarity];
            const IconComponent = getAchievementIcon(achievement.icon);
            
            return (
              <div 
                key={index}
                className={cn(
                  "group relative rounded-xl border p-6 transition-all duration-200 hover:-translate-y-1",
                  config.bg,
                  config.border
                )}
              >
                <div className="text-center space-y-4">
                  {/* Icon */}
                  <div className={cn(
                    "mx-auto w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110",
                    config.iconBg
                  )}>
                    <IconComponent className="w-7 h-7 text-gray-600 dark:text-gray-400" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {achievement.description}
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                      <Badge 
                        variant="secondary" 
                        className={cn("text-xs font-medium capitalize", config.badgeColor)}
                      >
                        {achievement.rarity}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 