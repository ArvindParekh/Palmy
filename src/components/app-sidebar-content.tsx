"use client"

import { Badge, FileText, FlaskConical, LayoutDashboard, Settings, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";


const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, id: "dashboard", href: "/dashboard" },
    { title: "Templates", icon: FileText, id: "templates", href: "/palmlets", badge: "24" },
    { title: "Community", icon: Users, id: "community", href: "/community" },
    { title: "Lab", icon: FlaskConical, id: "lab", href: "/lab", badge: "3" },
    { title: "Leaderboard", icon: Trophy, id: "leaderboard", href: "/leaderboard" },
    { title: "Settings", icon: Settings, id: "settings", href: "/settings" },
 ];


export default function AppSidebarContent() {

    const activePath = usePathname();

    return (
        <SidebarContent className='p-4'>
            <SidebarGroup>
               <SidebarGroupContent>
                  <SidebarMenu className='space-y-1'>
                     {menuItems.map((item) => (
                        <SidebarMenuItem key={item.id}>
                           <SidebarMenuButton asChild className='w-full justify-start gap-3 px-3 py-2.5 text-sm font-medium transition-all hover:bg-accent data-[active=true]:bg-accent data-[active=true]:text-foreground group'>
                              <Link href={item.href}>
                                 <item.icon className='w-4 h-4 group-data-[active=true]:text-yellow-500' />
                                 <span className={cn('flex-1 font-medium', activePath === item.href ? 'text-yellow-500' : 'text-muted-foreground')}>{item.title}</span>
                              </Link>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>
    )
}