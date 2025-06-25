import { Trophy, Users, Star, Copy, Target } from "lucide-react";

interface LeaderboardHeroProps {
  communityStats: {
    totalUsers: number;
    totalTemplates: number;
    totalForks: number;
    successRate: number;
  };
}

export function LeaderboardHero({ communityStats }: LeaderboardHeroProps) {
  return (
    <div className="relative px-8 pt-20 pb-16 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-900 dark:bg-white mb-6">
            <Trophy className="w-8 h-8 text-white dark:text-gray-900" />
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4 tracking-tight">
            Community Leaders
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Recognizing the exceptional creators who are shaping the future of job applications 
            through innovative templates and community contribution.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { 
              label: 'Active Creators', 
              value: communityStats.totalUsers.toLocaleString(), 
              icon: Users,
              description: 'Community members'
            },
            { 
              label: 'Templates Created', 
              value: communityStats.totalTemplates.toLocaleString(), 
              icon: Star,
              description: 'Total library size'
            },
            { 
              label: 'Times Forked', 
              value: communityStats.totalForks.toLocaleString(), 
              icon: Copy,
              description: 'Community engagement'
            },
            { 
              label: 'Success Rate', 
              value: `${communityStats.successRate}%`, 
              icon: Target,
              description: 'Average effectiveness'
            }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center space-y-3 group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors duration-200">
                <stat.icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-3xl font-semibold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 