import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Crown, Medal, Award } from "lucide-react";

export default function LeaderboardLoading() {
  return (
    <div className="w-full max-w-6xl mx-auto min-h-screen p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-block p-3 bg-muted rounded-lg">
          <Trophy className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
        </div>
        <Skeleton className="h-8 md:h-10 lg:h-12 w-64 md:w-80 mx-auto" />
        <Skeleton className="h-4 md:h-5 w-80 md:w-96 lg:w-[32rem] mx-auto" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="creators">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-muted">
          <TabsTrigger value="creators" className="text-xs md:text-sm">
            <Skeleton className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            <Skeleton className="h-4 w-16" />
          </TabsTrigger>
          <TabsTrigger value="templates" className="text-xs md:text-sm">
            <Skeleton className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            <Skeleton className="h-4 w-16" />
          </TabsTrigger>
        </TabsList>

        {/* Podium Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 items-end mt-6 md:mt-8">
          {/* Second Place */}
          <div className="text-center space-y-3 md:space-y-4 order-first sm:order-1">
            <div className="relative inline-block">
              <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border-4 border-background">
                <AvatarFallback>
                  <Skeleton className="w-full h-full rounded-full" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-background rounded-full flex items-center justify-center">
                <Medal className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-neutral-400" />
              </div>
            </div>
            <div className="text-center">
              <Skeleton className="h-4 sm:h-5 w-24 sm:w-32 mx-auto mb-1" />
              <Skeleton className="h-3 sm:h-4 w-20 sm:w-24 mx-auto" />
            </div>
          </div>

          {/* First Place */}
          <div className="text-center space-y-3 md:space-y-4 order-first sm:order-2 sm:pt-6">
            <div className="relative inline-block">
              <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border-4 border-background">
                <AvatarFallback>
                  <Skeleton className="w-full h-full rounded-full" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-background rounded-full flex items-center justify-center">
                <Crown className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-500" />
              </div>
            </div>
            <div className="text-center">
              <Skeleton className="h-4 sm:h-5 w-24 sm:w-32 mx-auto mb-1" />
              <Skeleton className="h-3 sm:h-4 w-20 sm:w-24 mx-auto" />
            </div>
          </div>

          {/* Third Place */}
          <div className="text-center space-y-3 md:space-y-4 order-first sm:order-3">
            <div className="relative inline-block">
              <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border-4 border-background">
                <AvatarFallback>
                  <Skeleton className="w-full h-full rounded-full" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-background rounded-full flex items-center justify-center">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-600" />
              </div>
            </div>
            <div className="text-center">
              <Skeleton className="h-4 sm:h-5 w-24 sm:w-32 mx-auto mb-1" />
              <Skeleton className="h-3 sm:h-4 w-20 sm:w-24 mx-auto" />
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <Card className="mt-6 md:mt-8">
          <CardContent className="p-0">
            <div className="space-y-1 md:space-y-2 p-2 md:p-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8">
                      <Skeleton className="w-6 h-6 rounded-full" />
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        <Skeleton className="w-full h-full rounded-full" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="w-4 h-4" />
                      </div>
                      <Skeleton className="h-3 w-32 mt-1" />
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center hidden md:block">
                      <Skeleton className="h-4 w-6 mx-auto mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="text-center">
                      <Skeleton className="h-4 w-8 mx-auto mb-1" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                    <div className="text-center hidden md:block">
                      <Skeleton className="h-4 w-6 mx-auto mb-1" />
                      <Skeleton className="h-3 w-10" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
} 