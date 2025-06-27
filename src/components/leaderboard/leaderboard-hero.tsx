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
    <div className="relative px-8 pt-20 pb-16 border-b border-border">
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-6">
            <Trophy className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-4 tracking-tight">
            Community Leaders
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted group-hover:bg-accent transition-colors duration-200">
                <stat.icon className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-3xl font-semibold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {stat.label}
                </p>
                <p className="text-xs text-muted-foreground">
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