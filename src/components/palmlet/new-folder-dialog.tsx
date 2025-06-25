"use client";

import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogTitle,
   DialogTrigger,
   DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { FolderPlus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { createPalmletFolder } from "@/actions/palmlet-folder";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

export function NewFolderDialog() {
   const { data: session, error, isPending, refetch } = authClient.useSession();
   const [open, setOpen] = useState(false);
   const [newFolderName, setNewFolderName] = useState("");
   const [newFolderDescription, setNewFolderDescription] = useState("");
   const [newFolderIcon, setNewFolderIcon] = useState("💻");

   const createFolder = async () => {
      if (!newFolderName.trim()) {
         toast.error("Folder name is required");
         return;
      }

      const result = await createPalmletFolder({
         userId: session?.user?.id as string,
         folderName: newFolderName,
         folderDescription: newFolderDescription,
      });

      if (result.success) {
         setNewFolderName("");
         setNewFolderDescription("");
         setNewFolderIcon("💻");
         setOpen(false); // Close the dialog
         toast.success(result.message);
      } else {
         toast.error(result.message);
      }
   };

   return (
      <>
         <Toaster />
         <Dialog open={open} onOpenChange={setOpen}>
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
                     Organize your templates by creating folders for different
                     job types or industries.
                  </DialogDescription>
               </DialogHeader>
               <div className='space-y-4'>
                  <div className='space-y-2'>
                     <Label htmlFor='folder-name'>Folder Name</Label>
                     <Input
                        id='folder-name'
                        placeholder='e.g., Software Engineering'
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                     />
                  </div>
                  <div className='space-y-2'>
                     <Label htmlFor='folder-description'>
                        Description (Optional)
                     </Label>
                     <Input
                        id='folder-description'
                        placeholder='Brief description of this folder'
                        value={newFolderDescription}
                        onChange={(e) =>
                           setNewFolderDescription(e.target.value)
                        }
                     />
                  </div>
                  <div className='space-y-2'>
                     <Label htmlFor='folder-icon'>Icon</Label>
                     <div className='flex gap-2'>
                        {["💻", "📊", "🤝", "🎯", "📝", "🚀", "💼", "🔬"].map(
                           (icon) => (
                              <Button
                                 key={icon}
                                 variant={
                                    newFolderIcon === icon
                                       ? "default"
                                       : "outline"
                                 }
                                 size='sm'
                                 onClick={() => setNewFolderIcon(icon)}
                                 className='text-lg bg-primary/10 hover:bg-primary/20'
                              >
                                 {icon}
                              </Button>
                           )
                        )}
                     </div>
                  </div>
                  <Button
                     onClick={createFolder}
                     className='w-full bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90'
                  >
                     Create Folder
                  </Button>
               </div>
            </DialogContent>
         </Dialog>
      </>
   );
}
