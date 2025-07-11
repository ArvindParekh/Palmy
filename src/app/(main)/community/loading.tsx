import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CommunityLoading() {
  return (
    <div className="w-full min-h-screen">
      <div className="relative w-full min-h-screen">
        <div className="absolute inset-0 w-full h-full opacity-50 bg-grid" />
        <div className="relative w-full max-w-4xl mx-auto min-h-screen p-4 md:p-6">
          {/* Header */}
          <header className="mb-6">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </header>

          <main className="space-y-6">
            {/* Share Template Prompt */}
            <Card className="p-5">
              <div className="flex gap-4 items-start">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>
                    <Skeleton className="w-full h-full rounded-full" />
                  </AvatarFallback>
                </Avatar>
                <Skeleton className="flex-1 h-6 mt-2" />
              </div>
            </Card>

            {/* Community Filters */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <Skeleton className="h-10 w-full md:w-80" />
                <Skeleton className="h-10 w-32" />
              </div>
              <div className="border-b border-neutral-200 dark:border-neutral-800">
                <Tabs defaultValue="recent" className="w-full">
                  <TabsList className="bg-transparent p-0">
                    <TabsTrigger value="recent" className="data-[state=active]:bg-transparent">
                      <Skeleton className="h-4 w-16" />
                    </TabsTrigger>
                    <TabsTrigger value="popular" className="data-[state=active]:bg-transparent">
                      <Skeleton className="h-4 w-16" />
                    </TabsTrigger>
                    <TabsTrigger value="trending" className="data-[state=active]:bg-transparent">
                      <Skeleton className="h-4 w-16" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* Template Posts */}
            <div className="space-y-6">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="p-6">
                  <div className="flex gap-5">
                    <Avatar className="w-10 h-10 hidden md:block">
                      <AvatarFallback>
                        <Skeleton className="w-full h-full rounded-full" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm mb-4">
                        <Avatar className="w-8 h-8 md:hidden">
                          <AvatarFallback>
                            <Skeleton className="w-full h-full rounded-full" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Skeleton className="h-4 w-32 mb-1" />
                          <div className="flex items-center gap-1.5">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-3 w-16" />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Skeleton className="h-5 w-64" />
                        <div className="bg-muted rounded-lg border p-4">
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-5/6" />
                        </div>
                        <div className="flex gap-2">
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-20" />
                          <Skeleton className="h-5 w-18" />
                        </div>
                      </div>
                      <div className="mt-5 flex items-center gap-2">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center">
              <Button variant="outline" disabled>
                <Skeleton className="h-4 w-20" />
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 