import { PalmletFolderCard } from "@/components/palmlet/palmlet-folder-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { NewFolderDialog } from "@/components/palmlet/new-folder-dialog";
import { getPalmletFolders } from "@/actions/palmlet-folder";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function PalmletPage() {
   const session = await auth.api.getSession({
      headers: await headers()
   });
   
   if (!session?.user?.id) {
      return <div>Please log in to view your folders.</div>;
   }

   const foldersResult = await getPalmletFolders(session.user.id);
   const folders = foldersResult.success ? foldersResult.data : [];

   const colorThemes = ['sage', 'lavender', 'cream', 'pearl', 'stone', 'mist'] as const;

   return (
      <div className='w-full h-full p-16'>
         <h1 className='text-5xl font-bold text-yellow-300'>Palmlets</h1>
         <p className='text-sm text-muted-foreground font-medium mt-4'>
            Organize your palmlets into folders and manage them here.
         </p>

         {/* Header */}
         <div className='flex items-center justify-between'>
            <div>
               <p className='text-sm text-muted-foreground font-medium mt-1'>
                  {folders?.length || 0} folders • {folders?.reduce((sum, f) => sum + (f.palmlets?.length || 0), 0) || 0} templates
               </p>
            </div>
            <NewFolderDialog />
         </div>

         {/* Search */}
         <div className='relative max-w-md'>
            <Search className='absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-neutral-400' />
            <Input
               placeholder='Search folders and templates...'
               // value={searchQuery}
               // onChange={(e) => setSearchQuery(e.target.value)}
               className='pl-10 border-neutral-200 dark:border-neutral-800'
            />
         </div>

         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20'>
            {folders && folders.length > 0 ? (
               folders.map((folder, index) => (
                  <PalmletFolderCard
                     key={folder.id}
                     title={folder.folderName}
                     description={folder.folderDescription || 'No description'}
                     palmletCount={folder.palmlets?.length || 0}
                     colorTheme={colorThemes[index % colorThemes.length]}
                  />
               ))
            ) : (
               <div className="col-span-full text-center py-20">
                  <p className="text-muted-foreground">No folders yet. Create your first folder to get started!</p>
               </div>
            )}
         </div>
      </div>
   );
}
