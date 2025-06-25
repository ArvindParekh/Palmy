
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
import { usePathname } from "next/navigation";
import AppSidebarContent from "./app-sidebar-content";



export function AppSidebar() {

   


   return (
      <Sidebar
         variant='inset'
         className='border-r border-border'
      >
         <SidebarHeader className='p-6 border-b border-border'>
            <div className='flex items-center gap-3'>
               <div className='w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center'>
                  <Sparkles className='w-4 h-4 text-foreground' />
               </div>
               <div>
                  <h1 className='font-semibold text-foreground'>
                     Palmly
                  </h1>
                  <p className='text-xs text-muted-foreground'>
                     Job application toolkit
                  </p>
               </div>
            </div>
         </SidebarHeader>

         <AppSidebarContent/>

         <SidebarFooter className='p-4 border-t border-border'>
            <div className='flex items-center gap-3'>
               <Avatar className='w-8 h-8'>
                  <AvatarImage src='/placeholder.svg?height=32&width=32' />
                  <AvatarFallback className='bg-gradient-to-br from-primary to-accent text-foreground text-xs font-medium'>
                     JD
                  </AvatarFallback>
               </Avatar>
               <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-foreground truncate'>
                     John Doe
                  </p>
                  <div className='flex items-center gap-2'>
                     <div className='w-2 h-2 bg-success rounded-full'></div>
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
