import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LabLoading() {
  return (
    <div className="h-full bg-background flex flex-col items-center justify-center font-inter">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 lg:py-16">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="mb-4">
            <Skeleton className="h-12 md:h-16 lg:h-20 w-80 md:w-96 lg:w-[32rem] mx-auto mb-2" />
            <Skeleton className="h-12 md:h-16 lg:h-20 w-32 md:w-40 lg:w-48 mx-auto" />
          </div>
          <Skeleton className="h-4 md:h-5 lg:h-6 w-80 md:w-96 lg:w-[32rem] mx-auto" />
        </div>

        {/* Main Input */}
        <div className="mb-8 md:mb-12">
          <div className="relative">
            <div className="h-12 md:h-14 rounded-2xl bg-accent/50 border py-3 md:py-7 px-4 flex items-center">
              <Skeleton className="flex-1 h-4 md:h-5" />
              <Button className="ml-2 h-8 md:h-10 px-3 md:px-6 rounded-xl" disabled>
                <Skeleton className="h-4 w-4 mr-1" />
                <Skeleton className="h-4 w-16 hidden sm:block" />
              </Button>
            </div>
          </div>
        </div>

        {/* Template Examples */}
        <div className="mb-8 md:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Skeleton className="w-4 h-4" />
                    </div>
                    <Skeleton className="h-4 md:h-5 w-24 md:w-32" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Skeleton className="h-3 md:h-4 w-full mb-2" />
                  <Skeleton className="h-3 md:h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Generated Template Placeholder */}
        <Card className="mb-8 opacity-50">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="w-4 h-4 md:w-5 md:h-5" />
                  <Skeleton className="h-5 md:h-6 w-40" />
                </div>
                <Skeleton className="h-3 md:h-4 w-32" />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  <Skeleton className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  <Skeleton className="h-3 w-8 hidden sm:block" />
                </Button>
                <Button size="sm" disabled>
                  <Skeleton className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                  <Skeleton className="h-3 w-16 hidden sm:block" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-3 md:p-4 mb-4">
              <Skeleton className="h-3 md:h-4 w-full mb-2" />
              <Skeleton className="h-3 md:h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 md:h-4 w-5/6 mb-2" />
              <Skeleton className="h-3 md:h-4 w-2/3" />
            </div>
            <div>
              <Skeleton className="h-4 md:h-5 w-20 mb-3" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-14" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button variant="outline" size="default" disabled>
            <Skeleton className="w-4 h-4 mr-2" />
            <Skeleton className="h-4 w-32 md:w-40" />
          </Button>
        </div>
      </div>
    </div>
  );
} 