"use client";

import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupContent,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarRail,
} from "@/components/ui/sidebar";
import {
   LayoutDashboard,
   FileText,
   Users,
   FlaskConical,
   Trophy,
   Settings,
   Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "./theme/mode-toggle";

const menuItems = [
   { title: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
   { title: "Templates", icon: FileText, id: "templates", badge: "24" },
   { title: "Community", icon: Users, id: "community" },
   { title: "Lab", icon: FlaskConical, id: "lab", badge: "3" },
   { title: "Leaderboard", icon: Trophy, id: "leaderboard" },
   { title: "Settings", icon: Settings, id: "settings" },
];

interface AppSidebarProps {
   currentView: string;
   onNavigate: (view: string) => void;
}

export function AppSidebar({ currentView, onNavigate }: AppSidebarProps) {
   return (
      <Sidebar
         variant='inset'
         className='border-r border-neutral-200 dark:border-neutral-800'
      >
         <SidebarHeader className='p-6 border-b border-neutral-200 dark:border-neutral-800'>
            <div className='flex items-center gap-3'>
               <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
                  <Sparkles className='w-4 h-4 text-white' />
               </div>
               <div>
                  <h1 className='font-semibold text-neutral-900 dark:text-white'>
                     Templates
                  </h1>
                  <p className='text-xs text-neutral-500'>
                     Job application toolkit
                  </p>
               </div>
            </div>
         </SidebarHeader>

         <SidebarContent className='p-4'>
            <SidebarGroup>
               <SidebarGroupContent>
                  <SidebarMenu className='space-y-1'>
                     {menuItems.map((item) => (
                        <SidebarMenuItem key={item.id}>
                           <SidebarMenuButton
                              onClick={() => onNavigate(item.id)}
                              isActive={currentView === item.id}
                              className='w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium transition-all hover:bg-neutral-100 dark:hover:bg-neutral-900 data-[active=true]:bg-neutral-100 dark:data-[active=true]:bg-neutral-900 data-[active=true]:text-neutral-900 dark:data-[active=true]:text-white group'
                           >
                              <item.icon className='w-4 h-4 group-data-[active=true]:text-blue-600' />
                              <span className='flex-1'>{item.title}</span>
                              {item.badge && (
                                 <Badge
                                    variant='secondary'
                                    className='text-xs h-5 px-1.5'
                                 >
                                    {item.badge}
                                 </Badge>
                              )}
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>

         <SidebarFooter className='p-4 border-t border-neutral-200 dark:border-neutral-800'>
            <div className='flex items-center gap-3'>
               <Avatar className='w-8 h-8'>
                  <AvatarImage src='/placeholder.svg?height=32&width=32' />
                  <AvatarFallback className='bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-medium'>
                     JD
                  </AvatarFallback>
               </Avatar>
               <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-neutral-900 dark:text-white truncate'>
                     John Doe
                  </p>
                  <div className='flex items-center gap-2'>
                     <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                     <p className='text-xs text-neutral-500 truncate'>
                        Pro Member
                     </p>
                  </div>
               </div>
               <ModeToggle />
            </div>
         </SidebarFooter>

         <SidebarRail />
      </Sidebar>
   );
}
