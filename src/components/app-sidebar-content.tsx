"use client"

import { Badge, BookOpen, Zap, Home, Sliders, Crown, Globe } from "lucide-react";
import Link from "next/link";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "./ui/sidebar";
import { usePathname } from "next/navigation";


const menuItems = [
    { title: "Dashboard", icon: Home, id: "dashboard", href: "/dashboard" },
    { title: "Templates", icon: BookOpen, id: "templates", href: "/palmlets", badge: "24" },
    { title: "Community", icon: Globe, id: "community", href: "/community" },
    { title: "Lab", icon: Zap, id: "lab", href: "/lab", badge: "3" },
    { title: "Leaderboard", icon: Crown, id: "leaderboard", href: "/leaderboard" },
    { title: "Settings", icon: Sliders, id: "settings", href: "/settings" },
 ];


export default function AppSidebarContent() {

    const activePath = usePathname();

    return (
        <SidebarContent className='p-2'>
            <SidebarGroup>
               <SidebarGroupContent>
                  <SidebarMenu className='space-y-1'>
                     {menuItems.map((item) => (
                        <SidebarMenuItem key={item.id} data-tour={`quick-start-${item.id}`}>
                           <SidebarMenuButton asChild isActive={activePath === item.href || activePath.startsWith(item.href)}>
                              <Link href={item.href}>
                                 <item.icon className='w-4 h-4' />
                                 <span>{item.title}</span>
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