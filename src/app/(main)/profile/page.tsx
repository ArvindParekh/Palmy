import {
   Calendar,
   FileText,
   Trophy,
   Award,
   Flame,
   Star,
   Edit,
   GitBranch,
   Eye,
   Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserWithPalmlets } from "@/lib/data/user";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { format } from "date-fns";

// Dummy Users icon for achievements
const UsersIcon = (props: any) => (
   <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
   >
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
      <path d='M16 3.13a4 4 0 0 1 0 7.75' />
   </svg>
);

// Mock user data
// const userData = {
//   name: "Arvind Kumar",
//   username: "arvind_dev",
//   avatar: "/placeholder.svg?height=120&width=120",
//   joinedDate: "March 2024",
//   bio: "Software engineer passionate about crafting compelling job applications and helping others land their dream roles.",
//   stats: {
//     templates: 24,
//     forks: 143,
//     rating: 4.8,
//   },
// };

// const templates = [
//   { id: 1, title: "Senior SWE Cover Letter", category: "Cover Letter", forks: 82, rating: 4.9 },
//   { id: 2, title: "LinkedIn Cold DM", category: "Outreach", forks: 31, rating: 4.7 },
//   { id: 3, title: "Follow-up Email", category: "Follow-up", forks: 19, rating: 4.8 },
//   { id: 4, title: "Venture Capital Pitch", category: "Business", forks: 11, rating: 4.6 },
// ];

const achievements = [
   {
      name: "Template Master",
      icon: Award,
      description: "Created 20+ templates",
      earned: true,
   },
   {
      name: "Community Star",
      icon: Star,
      description: "Top 5% rated creator",
      earned: true,
   },
   {
      name: "Streak Master",
      icon: Flame,
      description: "Maintained a 20+ day streak",
      earned: true,
   },
   {
      name: "Helper",
      icon: Users,
      description: "Received 100+ community forks",
      earned: true,
   },
   {
      name: "Perfectionist",
      icon: Trophy,
      description: "Achieved a 90%+ success rate",
      earned: false,
   },
   {
      name: "Influencer",
      icon: Eye,
      description: "Gained 1000+ profile views",
      earned: false,
   },
];

export default async function ProfilePage() {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   const { data: userData } = await getUserWithPalmlets(
      session?.user.id as string
   );

   const allPalmlets = userData?.folders.flatMap((folder) =>
      folder.palmlets.map((palmlet) => ({
         id: palmlet.id,
         title: palmlet.title,
         tags: palmlet.tags || [],
         forks: 0,
         rating: 0,
      }))
   );
   console.log(allPalmlets);

   const allPalmletsCount = allPalmlets?.length || 0;

   console.log(userData);

   if (!userData) {
      return <div>User not found</div>;
   }

   return (
      <div className='w-full max-w-5xl mx-auto min-h-screen p-4 md:p-6 space-y-6'>
         <Card className='overflow-hidden'>
            <div className='relative h-32 md:h-40 bg-muted'>
               {/* Abstract background pattern */}
               <svg
                  className='absolute inset-0 w-full h-full opacity-50'
                  style={{
                     backgroundImage:
                        "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(203 213 225 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
                     backgroundPosition: "10px 10px",
                  }}
               />
            </div>
            <div className='px-6 pb-6'>
               <div className='flex flex-col md:flex-row items-start gap-6 -mt-16 md:-mt-20'>
                  <Avatar className='w-32 h-32 md:w-40 md:h-40 border-4 border-border flex-shrink-0'>
                     <AvatarImage
                        src={userData.image as string}
                        alt={userData.name}
                     />
                     <AvatarFallback className='text-5xl'>
                        {userData.name
                           .split(" ")
                           .map((n: string) => n[0])
                           .join("")}
                     </AvatarFallback>
                  </Avatar>
                  <div className='flex-1 pt-20 md:pt-24 space-y-4'>
                     <div className='flex flex-col md:flex-row md:items-start justify-between'>
                        <div className='space-y-1'>
                           <h1 className='text-2xl md:text-3xl font-bold text-foreground'>
                              {userData.name}
                           </h1>
                           <p className='text-muted-foreground'>
                              @{userData.email}
                           </p>
                           <p className='text-sm text-muted-foreground pt-2 max-w-md'>
                              {userData.email}
                           </p>
                        </div>
                        <Button variant='outline' className='mt-4 md:mt-0'>
                           <Edit className='w-4 h-4 mr-2' />
                           Edit Profile
                        </Button>
                     </div>

                     <div className='flex flex-wrap gap-6 text-sm text-muted-foreground'>
                        <StatItem
                           icon={FileText}
                           value={allPalmletsCount}
                           label='Templates'
                        />
                        <StatItem icon={GitBranch} value={0} label='Forks' />
                        <StatItem icon={Star} value={0} label='Avg. Rating' />
                        <StatItem
                           icon={Calendar}
                           value={format(userData.createdAt, "MMM d, yyyy")}
                           label='Joined'
                        />
                     </div>
                  </div>
               </div>
            </div>
         </Card>

         <Tabs defaultValue='overview' className='w-full'>
            <TabsList className='grid w-full grid-cols-3 bg-muted'>
               <TabsTrigger value='overview'>Overview</TabsTrigger>
               <TabsTrigger value='templates'>Templates</TabsTrigger>
               <TabsTrigger value='achievements'>Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value='overview' className='mt-6'>
               <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <Card>
                     <CardHeader>
                        <CardTitle>Top Templates</CardTitle>
                     </CardHeader>
                     <CardContent className='space-y-4'>
                        {allPalmlets?.slice(0, 5).map((palmlet: any) => (
                           <TemplateItem key={palmlet.id} palmlet={palmlet} />
                        ))}
                     </CardContent>
                  </Card>
                  <Card>
                     <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                     </CardHeader>
                     <CardContent>
                        {/* Placeholder for activity feed */}
                        <p className='text-sm text-muted-foreground'>
                           Activity feed coming soon.
                        </p>
                     </CardContent>
                  </Card>
               </div>
            </TabsContent>

            <TabsContent value='templates' className='mt-6'>
               <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {allPalmlets?.map((palmlet: any) => (
                     <TemplateCard key={palmlet.id} palmlet={palmlet} />
                  ))}
               </div>
            </TabsContent>

            <TabsContent value='achievements' className='mt-6'>
               <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {achievements.map((achievement) => (
                     <AchievementCard key={achievement.name} {...achievement} />
                  ))}
               </div>
            </TabsContent>
         </Tabs>
      </div>
   );
}

function StatItem({
   icon: Icon,
   value,
   label,
}: {
   icon: React.ElementType;
   value: string | number;
   label: string;
}) {
   return (
      <div className='flex items-center gap-2'>
         <Icon className='w-4 h-4 text-muted-foreground' />
         <span className='font-semibold text-foreground'>{value}</span>
         <span className='text-muted-foreground'>{label}</span>
      </div>
   );
}

function TemplateItem({
   palmlet,
}: {
   palmlet: {
      id: string;
      title: string;
      tags: { tagName: string }[];
      forks: number;
      rating: number;
   };
}) {
   return (
      <div className='flex items-center justify-between'>
         <div>
            <p className='font-medium text-foreground'>{palmlet.title}</p>
            <div className='flex flex-wrap gap-1 mt-1'>
               {palmlet.tags.slice(0, 3).map((tag) => (
                  <Badge
                     key={tag.tagName}
                     variant='secondary'
                     className='text-xs'
                  >
                     {tag.tagName}
                  </Badge>
               ))}
               {palmlet.tags.length > 3 && (
                  <Badge variant='secondary' className='text-xs'>
                     +{palmlet.tags.length - 3}
                  </Badge>
               )}
            </div>
         </div>
         <div className='flex items-center gap-4 text-sm'>
            <StatItem icon={GitBranch} value={palmlet.forks} label='forks' />
            <StatItem icon={Star} value={palmlet.rating} label='rating' />
         </div>
      </div>
   );
}

function TemplateCard({
   palmlet,
}: {
   palmlet: {
      id: string;
      title: string;
      tags: { tagName: string }[];
      forks: number;
      rating: number;
   };
}) {
   return (
      <Card>
         <CardHeader>
            <CardTitle className='text-base'>{palmlet.title}</CardTitle>
            <div className='flex flex-wrap gap-1 mt-2'>
               {palmlet.tags.map((tag) => (
                  <Badge
                     key={tag.tagName}
                     variant='secondary'
                     className='text-xs'
                  >
                     {tag.tagName}
                  </Badge>
               ))}
               {palmlet.tags.length === 0 && (
                  <Badge variant='outline' className='text-xs'>
                     No tags
                  </Badge>
               )}
            </div>
         </CardHeader>
         <CardContent className='flex items-center justify-between text-sm'>
            <StatItem icon={GitBranch} value={palmlet.forks} label='Forks' />
            <StatItem icon={Star} value={palmlet.rating} label='Rating' />
         </CardContent>
      </Card>
   );
}

function AchievementCard({
   name,
   icon: Icon,
   description,
   earned,
}: (typeof achievements)[0]) {
   return (
      <Card className={`transition-all ${!earned && "opacity-60"}`}>
         <CardContent className='pt-6'>
            <div className='flex items-center gap-4'>
               <div
                  className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                     earned
                        ? "bg-blue-100 text-blue-600"
                        : "bg-muted text-muted-foreground"
                  }`}
               >
                  <Icon className='w-6 h-6' />
               </div>
               <div>
                  <h3 className='font-semibold text-foreground'>{name}</h3>
                  <p className='text-sm text-muted-foreground'>{description}</p>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
