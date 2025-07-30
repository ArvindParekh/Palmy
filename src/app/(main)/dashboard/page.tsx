import { FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TemplateCard } from "@/components/palmlet/template-card";
import { Separator } from "@/components/ui/separator";
import {
   getRecentlyEditedPalmlets,
   getUserOnBoardingStatus,
} from "@/lib/data/palmlet";
import { QuickStart } from "@/components/dashboard/quick-start";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   const { data: recentTemplates } = await getRecentlyEditedPalmlets(
      session?.user?.id as string
   );

   const { data: onboardingStatus } = await getUserOnBoardingStatus(
      session?.user?.id as string
   );

   return (
      <div className='w-full min-h-screen p-4 md:p-8 space-y-8 md:space-y-12'>
         {/* Header */}
         <header className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='space-y-1'>
               <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-card-foreground dark:text-foreground tracking-tighter'>
                  Dashboard
               </h1>
               <p className='text-sm md:text-base text-muted-foreground'>
                  Welcome back, let's get you started.
               </p>
            </div>
         </header>

         <main className='space-y-8 md:space-y-12'>
            {/* Quick Start Section */}
            <section>
               <QuickStart onboardingStatus={onboardingStatus ?? false} />
            </section>

            {/* Recent Templates Section */}
            {recentTemplates && recentTemplates.length > 0 && (
               <>
                  <Separator />
                  <section>
                     <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
                        <h2 className='text-lg md:text-xl lg:text-2xl font-semibold text-card-foreground dark:text-foreground flex items-center gap-3'>
                           <FilePlus className='w-5 h-5 md:w-6 md:h-6 text-muted-foreground' />
                           Recently Edited
                        </h2>
                        <Link href='/palmlets'>
                           <Button
                              variant='outline'
                              size='sm'
                              className='cursor-pointer'
                           >
                              View all
                           </Button>
                        </Link>
                     </div>
                     <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                        {recentTemplates.map((template) => {
                           if (!template) return null;
                           return (
                              <TemplateCard
                                 {...template}
                                 key={template.id}
                                 tags={template.tags}
                                 variables={template.variables}
                                 folderId={template.folderId}
                              />
                           );
                        })}
                     </div>
                  </section>
               </>
            )}
         </main>
      </div>
   );
}
