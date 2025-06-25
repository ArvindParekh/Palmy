
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
         <div className='flex min-h-screen min-w-screen bg-background'>
            <AppSidebar />
            <SidebarInset className='flex-1'>
               <Header />
               <main className="flex-1 p-8 w-full">{children}</main>
            </SidebarInset>
         </div>
      </SidebarProvider>
   );
}
