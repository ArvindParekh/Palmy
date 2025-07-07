import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function DeleteAccountDialog({ userId }: { userId: string }) {
   const [confirm, setConfirm] = useState("");
   const [isDeleting, setIsDeleting] = useState(false);
   const router = useRouter();
   
   const handleDeleteAccount = async () => {
      setIsDeleting(true);
      try {
         const res = await authClient.deleteUser(); // deletion of user data is automatically taken care of because of the cascade delete in the prisma schema
         if (res.error) {
            toast.error(res.error.message);
         } else {
            toast.success("Account deleted successfully");
            router.push("/");
            router.refresh();
         }
      } catch (error) {
         toast.error("Failed to delete account. Please try again.");
      } finally {
         setIsDeleting(false);
      }
   };

   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant='destructive'>
               <Trash2 className='w-4 h-4 mr-2' />
               Delete Account
            </Button>
         </DialogTrigger>

         <DialogContent>
            <DialogHeader>
               <DialogTitle>Delete Account</DialogTitle>
               <DialogDescription className="space-y-4">
                  This action is irreversible. This will permanently delete your
                  account and all of your content.
               </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
               <div className='mb-2 text-sm text-muted-foreground'>
                  Write{" "}
                  <span className='font-bold text-destructive uppercase'>
                     confirm
                  </span>{" "}
                  to delete your account
               </div>
               <Input
                  type='text'
                  value={confirm}
                  className='mb-2'
                  onChange={(e) => setConfirm(e.target.value.toUpperCase())}
                  disabled={isDeleting}
               />
            </div>

            <DialogFooter>
               <DialogClose asChild>
                  <Button variant='outline' disabled={isDeleting}>
                     Cancel
                  </Button>
               </DialogClose>
               <Button
                  variant='destructive'
                  onClick={handleDeleteAccount}
                  disabled={confirm !== "CONFIRM" || isDeleting}
               >
                  {isDeleting ? (
                     <>
                        <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                        Deleting...
                     </>
                  ) : (
                     <>
                        <Trash2 className='w-4 h-4 mr-2' />
                        Delete Account
                     </>
                  )}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
