import { Suspense } from "react";
import { ArrowLeft, FileText, Tag, Hash, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getFolderInfo, getFolderPalmlets } from "@/lib/data/palmlet";
import Link from "next/link";
import { FolderClientWrapper } from "@/components/palmlet/folder-client-wrapper";

export default async function FolderPage({
   params,
}: {
   params: Promise<{
      folderNumber: string;
   }>;
}) {
   // Await params to fix Next.js 15 requirement
   const { folderNumber } = await params;

   const folderInfo = await getFolderInfo(folderNumber);

   const folderPalmlets = await getFolderPalmlets(folderNumber);

   if (!folderPalmlets.success || !folderInfo.success) {
      return (
         <div className='w-full min-h-screen flex items-center justify-center'>
            <div className='text-center'>
               <h1 className='text-2xl font-bold text-foreground mb-2'>
                  Error
               </h1>
               <p className='text-muted-foreground mb-4'>
                  {folderPalmlets.message || folderInfo.message}
               </p>
               <Link href='/palmlets'>
                  <Button variant='outline'>
                     <ArrowLeft className='w-4 h-4 mr-2' />
                     Back to Folders
                  </Button>
               </Link>
            </div>
         </div>
      );
   }

   const palmlets = folderPalmlets.data;

   // Handle case where folder has no palmlets or folder info
   if (palmlets.length === 0) {
      return (
         <div className='w-full min-h-screen'>
            {/* Header Section */}
            <div className='relative overflow-hidden'>
               {/* Background gradient */}
               {/* <div className='absolute inset-0 bg-gradient-to-br from-slate-50/90 via-gray-50/70 to-slate-100/60 dark:from-slate-950/40 dark:via-gray-950/30 dark:to-slate-900/20' /> */}

               <div className='relative z-10 p-8 pb-16'>
                  {/* Navigation */}
                  <div className='flex items-center space-x-4 mb-8'>
                     <Link href='/palmlets'>
                        <Button
                           variant='ghost'
                           size='sm'
                           className='h-8 w-8 p-0'
                        >
                           <ArrowLeft className='w-4 h-4' />
                        </Button>
                     </Link>
                     <div className='flex items-center space-x-3'>
                        <span className='text-2xl'>💼</span>
                        <div>
                           <h1 className='text-3xl font-bold text-foreground'>
                              {folderInfo.data?.folderName}
                           </h1>
                           <p className='text-sm text-muted-foreground mt-1'>
                              This folder doesn't contain any templates yet.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <FolderClientWrapper
               palmlets={[]}
               folderName={folderInfo.data?.folderName || ""}
               folderNumber={folderNumber}
               folderId={folderInfo.data?.id || ""}
            />
         </div>
      );
   }

   // Get folder info from first palmlet (they all belong to the same folder)
   // const folderInfo = palmlets[0].folder;

   return (
      <div className='w-full min-h-screen'>
         {/* Header Section */}
         <div className='relative overflow-hidden'>
            {/* Background gradient */}
            {/* <div className='absolute inset-0 bg-gradient-to-br from-slate-50/90 via-gray-50/70 to-slate-100/60 dark:from-slate-950/40 dark:via-gray-950/30 dark:to-slate-900/20' /> */}

            <div className='relative z-10 p-8 pb-16'>
               {/* Navigation */}
               <div className='flex items-center space-x-4 mb-8'>
                  <Link href='/palmlets'>
                     <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
                        <ArrowLeft className='w-4 h-4' />
                     </Button>
                  </Link>
                  <div className='flex items-center space-x-3'>
                     <span className='text-2xl'>💼</span>
                     <div>
                        <h1 className='text-3xl font-bold text-foreground'>
                           {folderInfo.data?.folderName}
                        </h1>
                        <p className='text-sm text-muted-foreground mt-1'>
                           {folderInfo.data?.folderDescription ||
                              "No description provided"}
                        </p>
                     </div>
                  </div>
               </div>

               {/* Stats */}
               <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-8'>
                  <div className='bg-card backdrop-blur-md rounded-2xl p-6 border border-border'>
                     <div className='flex items-center space-x-3'>
                        <div className='p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50'>
                           <FileText className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                        </div>
                        <div>
                           <p className='text-2xl font-bold text-foreground'>
                              {palmlets.length}
                           </p>
                           <p className='text-xs text-muted-foreground'>
                              Templates
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className='bg-card backdrop-blur-md rounded-2xl p-6 border border-border'>
                     <div className='flex items-center space-x-3'>
                        <div className='p-2 rounded-xl bg-green-100 dark:bg-green-900/50'>
                           <Tag className='w-5 h-5 text-green-600 dark:text-green-400' />
                        </div>
                        <div>
                           <p className='text-2xl font-bold text-foreground'>
                              {
                                 Array.from(
                                    new Set(
                                       palmlets.flatMap((p) =>
                                          p.tags.map((tag) => tag.tagName)
                                       )
                                    )
                                 ).length
                              }
                           </p>
                           <p className='text-xs text-muted-foreground'>
                              Unique Tags
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className='bg-card backdrop-blur-md rounded-2xl p-6 border border-border'>
                     <div className='flex items-center space-x-3'>
                        <div className='p-2 rounded-xl bg-purple-100 dark:bg-purple-900/50'>
                           <Hash className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                        </div>
                        <div>
                           <p className='text-2xl font-bold text-foreground'>
                              {palmlets.reduce(
                                 (total, p) => total + p.variables.length,
                                 0
                              )}
                           </p>
                           <p className='text-xs text-muted-foreground'>
                              Total Variables
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className='bg-card backdrop-blur-md rounded-2xl p-6 border border-border'>
                     <div className='flex items-center space-x-3'>
                        <div className='p-2 rounded-xl bg-amber-100 dark:bg-amber-900/50'>
                           <TrendingUp className='w-5 h-5 text-amber-600 dark:text-amber-400' />
                        </div>
                        <div>
                           <p className='text-2xl font-bold text-foreground'>
                              {Math.round(
                                 (palmlets.filter(
                                    (p) => p.content && p.content.length > 0
                                 ).length /
                                    palmlets.length) *
                                    100
                              ) || 0}
                              %
                           </p>
                           <p className='text-xs text-muted-foreground'>
                              Completion Rate
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Client-side interactive components */}
         <FolderClientWrapper
            palmlets={palmlets}
            folderName={folderInfo.data?.folderName || ""}
            folderNumber={folderNumber}
            folderId={folderInfo.data?.id || ""}
         />
      </div>
   );
}

function TemplatesLoadingSkeleton() {
   return (
      <div className='w-full min-h-screen p-8'>
         <div className='space-y-8'>
            {/* Header skeleton */}
            <div className='space-y-4'>
               <Skeleton className='h-8 w-64' />
               <Skeleton className='h-4 w-96' />
            </div>

            {/* Stats skeleton */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
               {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className='h-24 rounded-2xl' />
               ))}
            </div>

            {/* Controls skeleton */}
            <div className='flex items-center justify-between'>
               <Skeleton className='h-10 w-80' />
               <div className='flex space-x-3'>
                  <Skeleton className='h-10 w-24' />
                  <Skeleton className='h-10 w-20' />
                  <Skeleton className='h-10 w-32' />
               </div>
            </div>

            {/* Templates skeleton */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
               {[...Array(8)].map((_, i) => (
                  <Skeleton key={i} className='h-80 rounded-3xl' />
               ))}
            </div>
         </div>
      </div>
   );
}
