
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Sparkles } from "lucide-react";

export default async function MainLayout({
   children,
}: {
   children: React.ReactNode;
}) {

   const session = await auth.api.getSession({
      headers: await headers()
   })

   if (!session) {
      redirect("/");
   }

   //TODO: auth check

   return (
      <SidebarProvider defaultOpen={true}>
         <div className='flex min-h-screen w-full bg-background'>
            <div className="hidden md:block">
               <AppSidebar />
            </div>
            <SidebarInset className='flex-1 min-w-0'>
               {/* Mobile Header */}
               <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <div className="flex items-center gap-3">
                     <div className="w-6 h-6 bg-orange-400 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-foreground" />
                     </div>
                     <span className="font-semibold text-foreground">Palmly</span>
                  </div>
                  <MobileNav />
               </header>
               <main className="flex-1 p-4 md:p-8 w-full">{children}</main>
            </SidebarInset>
         </div>
      </SidebarProvider>
   );
}
