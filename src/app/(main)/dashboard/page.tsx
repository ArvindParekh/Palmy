import { FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   TemplateCard,
   TemplateCardProps,
} from "@/components/palmlet/template-card";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { getRecentlyEditedPalmlets } from "@/actions/palmlet";
import { createNewPalmlet } from "@/actions/palmlet";
import { QuickStart } from "@/components/dashboard/quick-start";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
   const handleNewTemplate = async () => {
      // In a real app, get userId from session/auth
      const result = await createNewPalmlet("user-123", "1", "Untitled", "");
      if (result.success && result.data) {
         redirect(`/palmlets/${result.data.folderId}/editor/${result.data.id}`);
      } else {
         // Handle error, maybe with a toast notification
         console.error(result.message);
      }
   };

   const session = await auth.api.getSession({
      headers: await headers(),
   });

   const { data: recentTemplates } = await getRecentlyEditedPalmlets(
      session?.user?.id as string
   );

   return (
      <div className='w-full min-h-screen p-4 md:p-12 space-y-12'>
         {/* Header */}
         <header className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='space-y-1'>
               <h1 className='text-3xl md:text-4xl font-bold text-card-foreground dark:text-foreground tracking-tighter'>
                  Dashboard
               </h1>
               <p className='text-muted-foreground'>
                  Welcome back, let's get you started.
               </p>
            </div>
         </header>

         <main className='space-y-12'>
            {/* Quick Start Section */}
            <section>
               <QuickStart />
            </section>

            {/* Recent Templates Section */}
            {recentTemplates && recentTemplates.length > 0 && (
               <>
                  <Separator />
                  <section>
                     <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-2xl font-semibold text-card-foreground dark:text-foreground flex items-center gap-3'>
                           <FilePlus className='w-6 h-6 text-muted-foreground' />
                           Recently Edited
                        </h2>
                        <Link href='/palmlets'>
                           <Button variant='outline'>View all</Button>
                        </Link>
                     </div>
                     <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
                        {recentTemplates.map((template) => (
                           <TemplateCard {...template} key={template.id} tags={template.tags} variables={template.variables} folderId={template.folderId} />
                        ))}
                     </div>
                  </section>
               </>
            )}
         </main>
      </div>
   );
}
