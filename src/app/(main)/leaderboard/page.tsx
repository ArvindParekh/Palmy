"use client";

import { useState } from "react";
import * as React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   ArrowLeft,
   Zap,
   Trophy,
   Star,
   TrendingUp,
   Users,
   Crown,
   Medal,
   Award,
   Flame,
   Target,
   GitBranch,
   Calendar,
   Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const topCreators = [
   {
      rank: 1,
      name: "Sarah Chen",
      username: "sarah_chen",
      avatar: "/placeholder.svg?height=40&width=40",
      templates: 47,
      forks: 2847,
      avgRating: 4.9,
      successRate: 89,
      streak: 23,
      badges: ["Top Creator", "Verified", "Streak Master"],
      joinedDate: "2023-08-15",
      specialty: "AI & Product",
      isVerified: true,
   },
   {
      rank: 2,
      name: "Alex Rodriguez",
      username: "alex_dev",
      avatar: "/placeholder.svg?height=40&width=40",
      templates: 32,
      forks: 1876,
      avgRating: 4.8,
      successRate: 85,
      streak: 18,
      badges: ["Rising Star", "Verified"],
      joinedDate: "2023-09-22",
      specialty: "Engineering",
      isVerified: true,
   },
   {
      rank: 3,
      name: "Jordan Kim",
      username: "jordan_codes",
      avatar: "/placeholder.svg?height=40&width=40",
      templates: 28,
      forks: 1543,
      avgRating: 4.7,
      successRate: 91,
      streak: 12,
      badges: ["Quality Master"],
      joinedDate: "2023-10-05",
      specialty: "Full Stack",
      isVerified: false,
   },
   {
      rank: 4,
      name: "Taylor Swift",
      username: "taylor_dev",
      avatar: "/placeholder.svg?height=40&width=40",
      templates: 24,
      forks: 1234,
      avgRating: 4.6,
      successRate: 82,
      streak: 8,
      badges: ["Consistent"],
      joinedDate: "2023-11-12",
      specialty: "Product Design",
      isVerified: true,
   },
   {
      rank: 5,
      name: "Morgan Lee",
      username: "morgan_pm",
      avatar: "/placeholder.svg?height=40&width=40",
      templates: 19,
      forks: 987,
      avgRating: 4.5,
      successRate: 78,
      streak: 15,
      badges: ["Newcomer"],
      joinedDate: "2023-12-01",
      specialty: "Product Management",
      isVerified: false,
   },
];

const topTemplates = [
   {
      rank: 1,
      title: "Product Manager @ AI Startup",
      author: "Sarah Chen",
      forks: 234,
      rating: 4.9,
      successRate: 94,
      category: "Cover Letters",
      createdDate: "2024-01-15",
   },
   {
      rank: 2,
      title: "Senior Engineer Interview Follow-up",
      author: "Jordan Kim",
      forks: 189,
      rating: 4.8,
      successRate: 91,
      category: "Follow-up",
      createdDate: "2024-01-08",
   },
   {
      rank: 3,
      title: "YC Founder Cold Outreach",
      author: "Alex Rodriguez",
      forks: 156,
      rating: 4.7,
      successRate: 67,
      category: "Cold Outreach",
      createdDate: "2024-01-10",
   },
   {
      rank: 4,
      title: "LinkedIn Connection → Coffee",
      author: "Taylor Swift",
      forks: 123,
      rating: 4.6,
      successRate: 89,
      category: "LinkedIn Messages",
      createdDate: "2024-01-05",
   },
   {
      rank: 5,
      title: "Referral Request Template",
      author: "Morgan Lee",
      forks: 89,
      rating: 4.5,
      successRate: 73,
      category: "Referrals",
      createdDate: "2024-01-03",
   },
];

const achievements = [
   {
      title: "First Template",
      description: "Created your first template",
      icon: Target,
      rarity: "Common",
      unlockedBy: 2847,
   },
   {
      title: "Rising Star",
      description: "Reached top 100 creators",
      icon: Star,
      rarity: "Uncommon",
      unlockedBy: 234,
   },
   {
      title: "Streak Master",
      description: "20+ day creation streak",
      icon: Flame,
      rarity: "Rare",
      unlockedBy: 67,
   },
   {
      title: "Community Favorite",
      description: "Template with 100+ forks",
      icon: GitBranch,
      rarity: "Epic",
      unlockedBy: 23,
   },
   {
      title: "Perfect Score",
      description: "5.0 average rating",
      icon: Crown,
      rarity: "Legendary",
      unlockedBy: 5,
   },
];

export default function LeaderboardPage() {
   const [activeTab, setActiveTab] = useState("creators");
   const [podium, restOfList] = [topCreators.slice(0, 3), topCreators.slice(3)];

   const getRankIcon = (rank: number) => {
      switch (rank) {
         case 1:
            return <Crown className='w-6 h-6 text-yellow-500' />;
         case 2:
            return <Medal className='w-6 h-6 text-neutral-400' />;
         case 3:
            return <Award className='w-6 h-6 text-amber-600' />;
         default:
            return (
               <div className='w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold'>
                  {rank}
               </div>
            );
      }
   };

   const getRarityColor = (rarity: string) => {
      switch (rarity) {
         case "Common":
            return "bg-[#666]/20 text-[#666]";
         case "Uncommon":
            return "bg-[#00FF88]/20 text-[#00FF88]";
         case "Rare":
            return "bg-[#00D2FF]/20 text-[#00D2FF]";
         case "Epic":
            return "bg-[#FF6B6B]/20 text-[#FF6B6B]";
         case "Legendary":
            return "bg-[#FFD700]/20 text-[#FFD700]";
         default:
            return "bg-[#666]/20 text-[#666]";
      }
   };

   return (
      <div className='w-full max-w-6xl mx-auto min-h-screen p-4 md:p-6 space-y-6 md:space-y-8'>
         <div className='text-center space-y-2'>
            <div className='inline-block p-3 bg-muted rounded-lg'>
               <Trophy className='w-6 h-6 md:w-8 md:h-8 text-yellow-500' />
            </div>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-foreground'>
               Community Leaderboard
            </h1>
            <p className='text-sm md:text-base text-muted-foreground max-w-2xl mx-auto'>
               See who's making the biggest impact. Rankings are updated daily
               based on community engagement and template success.
            </p>
         </div>

         <Tabs defaultValue='creators'>
            <TabsList className='grid w-full max-w-md mx-auto grid-cols-2 bg-muted'>
               <TabsTrigger value='creators' className='text-xs md:text-sm'>
                  <Users className='w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2' />
                  <span className='hidden sm:inline'>Top </span>Creators
               </TabsTrigger>
               <TabsTrigger value='templates' className='text-xs md:text-sm'>
                  <TrendingUp className='w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2' />
                  <span className='hidden sm:inline'>Top </span>Templates
               </TabsTrigger>
            </TabsList>

            <TabsContent value='creators' className='mt-6 md:mt-8'>
               <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 items-end'>
                  {podium.map((creator, index) => (
                     <PodiumItem
                        key={creator.username}
                        user={creator}
                        order={index === 0 ? 'order-first sm:order-2' : index === 1 ? 'order-first sm:order-1' : 'order-first sm:order-3'}
                     />
                  ))}
               </div>

               <Card className='mt-6 md:mt-8'>
                  <CardContent className='p-0'>
                     <div className='space-y-1 md:space-y-2 p-2 md:p-4'>
                        {topCreators.map((creator) => (
                           <LeaderboardRow key={creator.username} user={creator} getRankIcon={getRankIcon} />
                        ))}
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>

            <TabsContent value='templates' className='mt-6 md:mt-8'>
               <Card>
                  <div className='overflow-x-auto'>
                     <Table>
                        <TableHeader>
                           <TableRow>
                              <TableHead className='w-16 text-xs md:text-sm'>Rank</TableHead>
                              <TableHead className='text-xs md:text-sm'>Template</TableHead>
                              <TableHead className='text-xs md:text-sm'>Category</TableHead>
                              <TableHead className='text-right text-xs md:text-sm'>Forks</TableHead>
                              <TableHead className='text-right text-xs md:text-sm'>
                                 Success Rate
                              </TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {topTemplates.map((template) => (
                              <TableRow key={template.rank}>
                                 <TableCell className='font-medium text-sm md:text-base'>
                                    {template.rank}
                                 </TableCell>
                                 <TableCell className='min-w-[200px]'>
                                    <p className='font-medium text-sm md:text-base'>{template.title}</p>
                                    <p className='text-xs md:text-sm text-muted-foreground'>
                                       by @{template.author}
                                    </p>
                                 </TableCell>
                                 <TableCell>
                                    <Badge variant='secondary' className='text-xs'>
                                       {template.category}
                                    </Badge>
                                 </TableCell>
                                 <TableCell className='text-right font-medium text-sm md:text-base'>
                                    {template.forks.toLocaleString()}
                                 </TableCell>
                                 <TableCell className='text-right font-medium text-green-600 dark:text-green-400 text-sm md:text-base'>
                                    {template.successRate}%
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </div>
               </Card>
            </TabsContent>
         </Tabs>
      </div>
   );
}

const PodiumItem = ({ user, order }: { user: (typeof topCreators)[0], order: string }) => {
   const rankMeta = {
      1: { border: "border-yellow-400 dark:border-yellow-500", shadow: "shadow-yellow-500/20", height: "sm:pt-6" },
      2: { border: "border-neutral-300 dark:border-neutral-600", shadow: "shadow-neutral-400/20", height: "" },
      3: { border: "border-amber-500 dark:border-amber-600", shadow: "shadow-amber-600/20", height: "" },
   }[user.rank] || {};

   return (
      <div className={cn("text-center space-y-3 md:space-y-4", order, rankMeta.height)}>
         <div className="relative inline-block">
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border-4 border-background">
               <AvatarImage src={user.avatar} />
               <AvatarFallback className="text-lg sm:text-xl md:text-3xl">{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-background rounded-full flex items-center justify-center">
               {user.rank === 1 ? <Crown className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-500" /> : <span className="font-bold text-xs sm:text-sm">{user.rank}</span>}
            </div>
         </div>
         <div className="text-center">
            <h3 className="font-bold text-base sm:text-lg">{user.name}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">@{user.username}</p>
         </div>
      </div>
   )
};

const LeaderboardRow = ({ user, getRankIcon }: { user: (typeof topCreators)[0], getRankIcon: (rank: number) => React.JSX.Element }) => (
   <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
      <div className="flex items-center gap-4">
         <div className="flex items-center justify-center w-8">{getRankIcon(user.rank)}</div>
         <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
         </Avatar>
         <div>
            <div className="flex items-center gap-2">
               <p className="font-medium">{user.name}</p>
               {user.isVerified && <Award className="w-4 h-4 text-blue-500" />}
            </div>
            <p className="text-sm text-muted-foreground">@{user.username} • {user.specialty}</p>
         </div>
      </div>
      <div className="flex items-center gap-6 text-sm">
         <div className="text-center hidden md:block">
            <p className="font-semibold">{user.templates}</p>
            <p className="text-muted-foreground text-xs">Templates</p>
         </div>
         <div className="text-center">
            <p className="font-semibold text-green-600">{user.successRate}%</p>
            <p className="text-muted-foreground text-xs">Success</p>
         </div>
         <div className="text-center hidden md:block">
            <p className="font-semibold text-yellow-500">{user.avgRating}</p>
            <p className="text-muted-foreground text-xs">Rating</p>
         </div>
      </div>
   </div>
);

const TemplateRow = ({ template, getRankIcon }: { template: (typeof topTemplates)[0], getRankIcon: (rank: number) => React.JSX.Element }) => (
   <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
      <div className="flex items-center gap-4">
         <div className="flex items-center justify-center w-8">{getRankIcon(template.rank)}</div>
         <div>
            <p className="font-medium">{template.title}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
               <span>by @{template.author}</span>
               <Badge variant="secondary">{template.category}</Badge>
            </div>
         </div>
      </div>
      <div className="flex items-center gap-6 text-sm">
         <div className="text-center">
            <p className="font-semibold">{template.forks}</p>
            <p className="text-muted-foreground text-xs">Forks</p>
         </div>
         <div className="text-center">
            <p className="font-semibold text-green-600">{template.successRate}%</p>
            <p className="text-muted-foreground text-xs">Success</p>
         </div>
         <div className="text-center hidden md:block">
            <p className="font-semibold text-yellow-500">{template.rating}</p>
            <p className="text-muted-foreground text-xs">Rating</p>
         </div>
      </div>
   </div>
);
