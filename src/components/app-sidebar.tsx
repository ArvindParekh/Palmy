
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
   SidebarTrigger,
} from "@/components/ui/sidebar";
import {
   Home,
   BookOpen,
   Globe,
   Zap,
   Crown,
   Sliders,
   Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "./theme/mode-toggle";
import { usePathname } from "next/navigation";
import AppSidebarContent from "./app-sidebar-content";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserInfo } from "@/lib/data/user";



export async function AppSidebar() {

   const session = await auth.api.getSession({
      headers: await headers()
   })

   const user = (await getUserInfo(session?.user?.id as string)).data;

   return (
      <Sidebar
         variant='inset'
         collapsible='icon'
         className='border-r border-border'
      >
         <SidebarHeader className='p-4 border-b border-border'>
            <div className='flex items-center justify-between'>
               <div className='flex items-center gap-3 group-data-[collapsible=icon]:hidden'>
                  <div className='w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center'>
                     <Sparkles className='w-4 h-4 text-foreground' />
                  </div>
                  <div className='group-data-[collapsible=icon]:hidden'>
                     <h1 className='font-semibold text-foreground'>
                        Palmly
                     </h1>
                     <p className='text-xs text-muted-foreground'>
                        Job application toolkit
                     </p>
                  </div>
               </div>
               <SidebarTrigger className='w-8 h-8' />
            </div>
         </SidebarHeader>

         <AppSidebarContent/>

         <SidebarFooter className='p-4 border-t border-border'>
            <div className='flex items-center gap-3'>
               <Avatar className='w-8 h-8'>
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback className='bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 text-foreground text-xs font-medium'>
                     {user?.name.split(" ").map((n: string) => n[0]).join("")}
                  </AvatarFallback>
               </Avatar>
               <div className='flex-1 min-w-0 group-data-[collapsible=icon]:hidden'>
                  <Link href="/profile" className='hover:underline'>
                     <p className='text-sm font-medium text-foreground truncate cursor-pointer'>
                        {user?.name}
                     </p>
                  </Link>
                  <div className='flex items-start gap-2'>
                     <p className='text-xs text-muted-foreground truncate'>
                        {user?.email}
                     </p>
                  </div>
               </div>
               <div className='group-data-[collapsible=icon]:hidden'>
                  <ModeToggle />
               </div>
            </div>
         </SidebarFooter>

         <SidebarRail />
      </Sidebar>
   );
}
