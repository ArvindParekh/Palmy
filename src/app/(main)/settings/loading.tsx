import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, User, Shield, Palette, Bell, CreditCard, Save, UploadCloud } from "lucide-react";

export default function SettingsLoading() {
  return (
    <div className="w-full min-h-screen p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 md:h-10 w-32 md:w-40" />
        <Skeleton className="h-4 md:h-5 w-80 md:w-96" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10">
        {/* Mobile Dropdown Navigation */}
        <div className="lg:hidden">
          <Button variant="outline" className="w-full justify-between" disabled>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:flex-col gap-2 lg:w-48">
          {[
            { icon: User, label: "Public Profile" },
            { icon: Shield, label: "Account" },
            { icon: Palette, label: "Appearance" },
            { icon: Bell, label: "Notifications" },
            { icon: CreditCard, label: "Subscription" },
          ].map((item, index) => (
            <Button
              key={index}
              variant={index === 0 ? "secondary" : "ghost"}
              className="justify-start gap-2 md:gap-3 w-full text-sm whitespace-nowrap"
              disabled
            >
              <item.icon className="w-4 h-4" />
              <span className="truncate">{item.label}</span>
            </Button>
          ))}
        </nav>

        {/* Main Content */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-32" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-80" />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
                  <AvatarFallback>
                    <Skeleton className="w-full h-full rounded-full" />
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" disabled>
                    <UploadCloud className="w-4 h-4 mr-2" />
                    <Skeleton className="h-4 w-32" />
                  </Button>
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    <Skeleton className="h-4 w-20" />
                  </Label>
                  <Input disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">
                    <Skeleton className="h-4 w-20" />
                  </Label>
                  <Input disabled />
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-2">
                <Label htmlFor="bio">
                  <Skeleton className="h-4 w-12" />
                </Label>
                <div className="w-full rounded-md border border-input bg-background px-3 py-2">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <Button disabled>
                <Save className="w-4 h-4 mr-2" />
                <Skeleton className="h-4 w-24" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 