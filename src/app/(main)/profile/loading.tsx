import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit } from "lucide-react";

export default function ProfileLoading() {
  return (
    <div className="w-full max-w-5xl mx-auto min-h-screen p-4 md:p-6 space-y-6">
      <Card className="overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-24 sm:h-32 md:h-40 bg-muted">
          <svg
            className="absolute inset-0 w-full h-full opacity-50"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(203 213 225 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
              backgroundPosition: "10px 10px",
            }}
          />
        </div>
        
        <div className="px-4 md:px-6 pb-6">
          <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 -mt-12 sm:-mt-16 md:-mt-20">
            {/* Profile Avatar */}
            <Avatar className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 border-4 border-border flex-shrink-0">
              <AvatarFallback>
                <Skeleton className="w-full h-full rounded-full" />
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 pt-12 sm:pt-20 md:pt-24 space-y-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1">
                  <Skeleton className="h-6 sm:h-7 md:h-8 w-48 md:w-64" />
                  <Skeleton className="h-4 md:h-5 w-32 md:w-40" />
                  <Skeleton className="h-3 sm:h-4 w-40 md:w-48" />
                </div>
                <Button variant="outline" size="sm" className="mt-2 md:mt-0 self-start" disabled>
                  <Edit className="w-4 h-4 mr-2" />
                  <Skeleton className="h-4 w-20" />
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 md:gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-1 md:gap-2">
                  <Skeleton className="w-3 h-3 md:w-4 md:h-4" />
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <Skeleton className="w-3 h-3 md:w-4 md:h-4" />
                  <Skeleton className="h-4 w-6" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <Skeleton className="w-3 h-3 md:w-4 md:h-4" />
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <Skeleton className="w-3 h-3 md:w-4 md:h-4" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">
            <Skeleton className="h-4 w-16" />
          </TabsTrigger>
          <TabsTrigger value="templates" className="text-xs sm:text-sm">
            <Skeleton className="h-4 w-16" />
          </TabsTrigger>
          <TabsTrigger value="achievements" className="text-xs sm:text-sm">
            <Skeleton className="h-4 w-20" />
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <div className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Top Templates */}
            <Card>
              <CardHeader>
                <Skeleton className="h-5 md:h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div className="flex-1">
                      <Skeleton className="h-4 md:h-5 w-48 mb-1" />
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-14" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm">
                      <div className="flex items-center gap-1">
                        <Skeleton className="w-3 h-3" />
                        <Skeleton className="h-3 w-6" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Skeleton className="w-3 h-3" />
                        <Skeleton className="h-3 w-6" />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <Skeleton className="h-5 md:h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-48" />
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
} 