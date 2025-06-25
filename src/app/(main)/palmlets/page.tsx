import { DashboardCard } from "@/components/dashboard/dashboard-card-variants";
import { PalmletFolderCard } from "@/components/palmlet/palmlet-folder-card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function PalmletPage() {
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
                  10 folders • 100 templates • 1000 total uses
               </p>
            </div>
            <Dialog>
               <DialogTrigger asChild>
                  <Button className='bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90'>
                     <FolderPlus className='w-4 h-4 mr-2 text-primary-foreground' />
                     New Folder
                  </Button>
               </DialogTrigger>
               <DialogContent>
                  <DialogHeader>
                     <DialogTitle>Create New Folder</DialogTitle>
                     <DialogDescription>
                        Organize your templates by creating folders for
                        different job types or industries.
                     </DialogDescription>
                  </DialogHeader>
                  <div className='space-y-4'>
                     <div className='space-y-2'>
                        <Label htmlFor='folder-name'>Folder Name</Label>
                        <Input
                           id='folder-name'
                           placeholder='e.g., Software Engineering'
                        //    value={newFolderName}
                        //    onChange={(e) => setNewFolderName(e.target.value)}
                        />
                     </div>
                     <div className='space-y-2'>
                        <Label htmlFor='folder-icon'>Icon</Label>
                        <div className='flex gap-2'>
                           {[
                              "💻",
                              "📊",
                              "🤝",
                              "🎯",
                              "📝",
                              "🚀",
                              "💼",
                              "🔬",
                           ].map((icon) => (
                              <Button
                                 key={icon}
                                 variant={
                                    // newFolderIcon === icon
                                    //    ? "default"
                                    //    : "outline"
                                    "default"
                                 }
                                 size='sm'
                                //  onClick={() => setNewFolderIcon(icon)}
                                 className='text-lg bg-primary/10 hover:bg-primary/20'
                              >
                                 {icon}
                              </Button>
                           ))}
                        </div>
                     </div>
                     <Button
                        // onClick={createFolder}
                        className='w-full bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90'
                     >
                        Create Folder
                     </Button>
                  </div>
               </DialogContent>
            </Dialog>
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
            <PalmletFolderCard
               title='Templates'
               description='See your templates here'
               palmletCount={10}
               colorTheme='sage'
            />
            <PalmletFolderCard
               title='Templates'
               description='See your templates here'
               palmletCount={10}
               colorTheme='lavender'
            />
            <PalmletFolderCard
               title='Templates'
               description='See your templates here'
               palmletCount={10}
               colorTheme='cream'
            />
            <PalmletFolderCard
               title='Templates'
               description='See your templates here'
               palmletCount={10}
               colorTheme='pearl'
            />
            <PalmletFolderCard
               title='Templates'
               description='See your templates here'
               palmletCount={10}
               colorTheme='stone'
            />
            <PalmletFolderCard
               title='Templates'
               description='See your templates here'
               palmletCount={10}
               colorTheme='mist'
            />
         </div>
      </div>
   );
}
