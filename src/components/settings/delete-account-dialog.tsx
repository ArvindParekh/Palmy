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
import { Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function DeleteAccountDialog({ userId }: { userId: string }) {
   const [confirm, setConfirm] = useState("");
   const router = useRouter();
   const handleDeleteAccount = async () => {
      const res = await authClient.deleteUser(); // deletion of user data is automatically taken care of because of the cascade delete in the prisma schema
      if (res.error) {
         toast.error(res.error.message);
      } else {
         router.push("/");
         toast.success("Account deleted successfully");
         router.refresh();
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
               <DialogDescription>
                  This action is irreversible. This will permanently delete your
                  account and all of your content.
               </DialogDescription>
               <DialogDescription>
                  <p className='mb-2'>
                     Write{" "}
                     <span className='font-bold text-destructive uppercase'>
                        confirm
                     </span>{" "}
                     to delete your account
                  </p>
                  <Input
                     type='text'
                     value={confirm}
                     className='mb-2'
                     onChange={(e) => setConfirm(e.target.value.toUpperCase())}
                  />
               </DialogDescription>
            </DialogHeader>
            <DialogFooter>
               <DialogClose asChild>
                  <Button variant='outline'>Cancel</Button>
               </DialogClose>
               <Button
                  variant='destructive'
                  onClick={() => handleDeleteAccount()}
                  disabled={confirm !== "CONFIRM"}
               >
                  Delete Account
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
