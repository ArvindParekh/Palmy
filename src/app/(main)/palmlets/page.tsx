import { PalmletFolderCard } from "@/components/palmlet/palmlet-folder-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { NewFolderDialog } from "@/components/palmlet/new-folder-dialog";
import { getPalmletFolders } from "@/actions/palmlet-folder";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { FolderCardWrapper } from "@/components/palmlet/folder-card-wrapper";
import { Toaster } from "@/components/ui/sonner";

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
      <div className='w-full h-full p-4 md:p-8 lg:p-12'>
         <Toaster />
         <div className='space-y-6 md:space-y-8'>
            {/* Header */}
            <div className='space-y-4'>
               <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-foreground'>Palmlets</h1>
               <p className='text-sm md:text-base text-muted-foreground font-medium'>
                  Organize your palmlets into folders and manage them here.
               </p>
            </div>

            {/* Stats and Actions */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
               <div>
                  <p className='text-sm text-muted-foreground font-medium'>
                     {folders?.length || 0} folders • {folders?.reduce((sum, f) => sum + (f.palmlets?.length || 0), 0) || 0} templates
                  </p>
               </div>
               <NewFolderDialog />
            </div>

            {/* Search - I guess not really needed */}
            {/* <div className='relative max-w-md'>
               <Search className='absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-muted-foreground' />
               <Input
                  placeholder='Search folders and templates...'
                  // value={searchQuery}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10 border-muted'
               />
            </div> */}

            {/* Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
               {folders && folders.length > 0 ? (
                  folders.map((folder, index) => (
                     <FolderCardWrapper
                        key={folder.id}
                        folderId={folder.id}
                        title={folder.folderName}
                        description={folder.folderDescription || 'No description'}
                        palmletCount={folder.palmlets?.length || 0}
                        colorTheme={colorThemes[index % colorThemes.length]}
                        url={`/palmlets/${folder.id}`}
                        userId={session.user.id}
                     />
                  ))
               ) : (
                  <div className="col-span-full text-center py-20">
                     <p className="text-muted-foreground">No folders yet. Create your first folder to get started!</p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
