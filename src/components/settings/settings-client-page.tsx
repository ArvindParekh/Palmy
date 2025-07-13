"use client";

import { useState } from "react";
import {
   User,
   Shield,
   Palette,
   Bell,
   CreditCard,
   Save,
   Key,
   Trash2,
   Moon,
   Sun,
   Laptop,
   UploadCloud,
   Mail,
   Building,
   ChevronDown,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Prisma } from "@/generated/prisma";
import { updateUserDetails, updateUserPassword } from "@/actions/user";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

import DeleteAccountDialog from "./delete-account-dialog";

// This is a placeholder for a real Switch component.
// You can install the shadcn/ui Switch component with:
// pnpm dlx shadcn-ui@latest add switch
const Switch = ({
   checked,
   onCheckedChange,
}: {
   checked: boolean;
   onCheckedChange: (checked: boolean) => void;
}) => (
   <button
      type='button'
      role='switch'
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-neutral-900 ${
         checked ? "bg-blue-600" : "bg-muted"
      }`}
   >
      <span
         aria-hidden='true'
         className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow ring-0 transition duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
         }`}
      />
   </button>
);

const settingsTabs = [
   { id: "profile", title: "Public Profile", icon: User },
   { id: "account", title: "Account", icon: Shield },
   { id: "appearance", title: "Appearance", icon: Palette },
   // { id: "notifications", title: "Notifications", icon: Bell },
   // { id: "billing", title: "Subscription", icon: CreditCard },
];

export default function SettingsClientPage({
   user,
}: {
   user: Prisma.UserGetPayload<{
      select: {
         name: true;
         email: true;
         image: true;
         createdAt: true;
         updatedAt: true;
         emailVerified: true;
         id: true;
      };
   }>;
}) {
   const [activeTab, setActiveTab] = useState("profile");

   const renderContent = () => {
      switch (activeTab) {
         case "profile":
            return <ProfileSettings user={user} />;
         case "account":
            return <AccountSettings user={user} />;
         case "appearance":
            return <AppearanceSettings />;
         // case "notifications":
         //    return <NotificationSettings />;
         // case "billing":
         //    return <BillingSettings />;
         default:
            return <ProfileSettings user={user} />;
      }
   };

   return (
      <div className='w-full min-h-screen p-4 md:p-6 space-y-6 md:space-y-8'>
         <Toaster />
         <div className='space-y-2'>
            <h1 className='text-2xl md:text-3xl font-bold text-foreground'>Settings</h1>
            <p className='text-sm md:text-base text-muted-foreground'>
               Manage your account settings and preferences.
            </p>
         </div>

         <div className='flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10'>
            {/* Mobile Dropdown Navigation */}
            <div className='lg:hidden'>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="outline" className="w-full justify-between">
                                                 <div className="flex items-center gap-2">
                            {(() => {
                               const activeTabData = settingsTabs.find(tab => tab.id === activeTab) || settingsTabs[0];
                               return (
                                  <>
                                     <activeTabData.icon className="w-4 h-4" />
                                     {activeTabData.title}
                                  </>
                               );
                            })()}
                         </div>
                        <ChevronDown className="w-4 h-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                     {settingsTabs.map((tab) => (
                        <DropdownMenuItem
                           key={tab.id}
                           onClick={() => setActiveTab(tab.id)}
                           className="flex items-center gap-2"
                        >
                           <tab.icon className="w-4 h-4" />
                           {tab.title}
                        </DropdownMenuItem>
                     ))}
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>

            {/* Desktop Navigation */}
            <nav className='hidden lg:flex lg:flex-col gap-2 lg:w-48'>
               {settingsTabs.map((tab) => (
                  <Button
                     key={tab.id}
                     variant={activeTab === tab.id ? "secondary" : "ghost"}
                     className='justify-start gap-2 md:gap-3 w-full text-sm whitespace-nowrap'
                     onClick={() => setActiveTab(tab.id)}
                  >
                     <tab.icon className='w-4 h-4' />
                     <span className='truncate'>{tab.title}</span>
                  </Button>
               ))}
            </nav>

            <div className='flex-1'>{renderContent()}</div>
         </div>
      </div>
   );
}

function ProfileSettings({
   user,
}: {
   user: Prisma.UserGetPayload<{
      select: {
         name: true;
         email: true;
         image: true;
         id: true;
      };
   }>;
}) {
   const [name, setName] = useState(user.name);

   const handleProfileUpdate = async () => {
      if (!name) {
         toast.error("Name is required");
         return;
      }

      if (name === user.name) {
         toast.error("Name is the same as the current name");
         return;
      }

      const res = await updateUserDetails(user.id, name);
      if (res.success) {
         toast.success(res.message);
      } else {
         toast.error(res.message);
      }
   };

   return (
      <Card>
         <CardHeader>
            <CardTitle>Public Profile</CardTitle>
            <CardDescription>
               This information will be displayed publicly on your profile page.
            </CardDescription>
         </CardHeader>
         <CardContent className='space-y-6'>
            <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6'>
               <Avatar className='w-16 h-16 sm:w-20 sm:h-20'>
                  <AvatarImage src={user.image as string} />
                  <AvatarFallback className='text-xl sm:text-2xl'>
                     {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                  </AvatarFallback>
               </Avatar>
               <div className='space-y-2'>
                  <Button variant='outline' size='sm'>
                     <UploadCloud className='w-4 h-4 mr-2' />
                     Upload new picture
                  </Button>
                  <p className='text-xs text-muted-foreground'>
                     PNG, JPG, GIF up to 10MB.
                  </p>
               </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
               <div className='space-y-2'>
                  <Label htmlFor='name'>Full Name</Label>
                  <Input
                     id='name'
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
               </div>
               <div className='space-y-2'>
                  <Label htmlFor='username'>Username</Label>
                  <Input disabled id='username' value={user.email} />
               </div>
            </div>
            <div className='space-y-2'>
               <Label htmlFor='bio'>Bio</Label>
               <textarea
                  id='bio'
                  rows={3}
                  className='flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                  defaultValue='Software engineer passionate about crafting compelling job applications.'
               />
            </div>
         </CardContent>
         <CardFooter className='border-t pt-6'>
            <Button onClick={() => handleProfileUpdate()}>
               <Save className='w-4 h-4 mr-2' />
               Save Changes
            </Button>
         </CardFooter>
      </Card>
   );
}

function AccountSettings({
   user,
}: {
   user: Prisma.UserGetPayload<{
      select: {
         email: true;
         id: true;
         name: true;
         image: true;
         createdAt: true;
         updatedAt: true;
         emailVerified: true;
      };
   }>;
}) {
   const [password, setPassword] = useState("");

   const handlePasswordUpdate = async () => {
      if (!password) {
         toast.error("Password is required");
         return;
      }

      // if (password === user.) {
      //    toast.error("Password is the same as the current password");
      //    return;
      // }
      const res = await updateUserPassword(user.id, password);
      if (res.success) {
         toast.success(res.message);
      } else {
         toast.error(res.message);
      }
   };

   return (
      <div className='space-y-8'>
         <Card>
            <CardHeader>
               <CardTitle>Email Address</CardTitle>
               <CardDescription>
                  Used for login and notifications.
               </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
               <Label htmlFor='email'>Email</Label>
               <Input
                  disabled
                  id='email'
                  type='email'
                  defaultValue={user.email}
               />
            </CardContent>
            <CardFooter className='border-t pt-6'>
               <Button>
                  <Save className='w-4 h-4 mr-2' />
                  Update Email
               </Button>
            </CardFooter>
         </Card>
         <Card>
            <CardHeader>
               <CardTitle>Password</CardTitle>
               <CardDescription>Manage your account password.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
               <div className='space-y-2'>
                  <Label htmlFor='current-password'>Current Password</Label>
                  <Input id='current-password' type='password' />
               </div>
               <div className='space-y-2'>
                  <Label htmlFor='new-password'>New Password</Label>
                  <Input
                     id='new-password'
                     type='password'
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
            </CardContent>
            <CardFooter className='border-t pt-6'>
               <Button onClick={() => handlePasswordUpdate()}>
                  <Key className='w-4 h-4 mr-2' />
                  Change Password
               </Button>
            </CardFooter>
         </Card>
         <Card className='border-destructive'>
            <CardHeader>
               <CardTitle className='text-destructive'>Danger Zone</CardTitle>
               <CardDescription>
                  Permanently delete your account and all of your content.
               </CardDescription>
            </CardHeader>
            <CardFooter>
               <DeleteAccountDialog userId={user.id} />
            </CardFooter>
         </Card>
      </div>
   );
}

function AppearanceSettings() {
   const { theme, setTheme } = useTheme();

   return (
      <Card>
         <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
               Customize the look and feel of the app.
            </CardDescription>
         </CardHeader>
         <CardContent className='space-y-4'>
            <h3 className='font-medium text-sm'>Theme</h3>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
               <ThemeButton
                  themeName='Light'
                  icon={Sun}
                  currentTheme={theme}
                  setTheme={setTheme}
                  value='light'
               />
               <ThemeButton
                  themeName='Dark'
                  icon={Moon}
                  currentTheme={theme}
                  setTheme={setTheme}
                  value='dark'
               />
               <ThemeButton
                  themeName='System'
                  icon={Laptop}
                  currentTheme={theme}
                  setTheme={setTheme}
                  value='system'
               />
            </div>
         </CardContent>
      </Card>
   );
}

function ThemeButton({
   themeName,
   icon: Icon,
   currentTheme,
   setTheme,
   value,
}: any) {
   return (
      <button
         onClick={() => setTheme(value)}
         className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
            currentTheme === value
               ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
               : "border-muted bg-background hover:bg-muted hover:border-muted"
         }`}
      >
         <Icon className='w-6 h-6' />
         <span className='text-sm font-medium'>{themeName}</span>
      </button>
   );
}

//TODO: Add Later when we want notifications and introduce billing

// function NotificationSettings() {
//    const [notifications, setNotifications] = useState({
//       community: true,
//       product: true,
//       weekly: false,
//       mentions: true,
//    });

//    const toggleNotification = (key: keyof typeof notifications) => {
//       setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
//    };

//    return (
//       <Card>
//          <CardHeader>
//             <CardTitle>Notifications</CardTitle>
//             <CardDescription>
//                Choose how you want to be notified.
//             </CardDescription>
//          </CardHeader>
//          <CardContent className='divide-y divide-muted'>
//             <NotificationItem
//                title='Community Activity'
//                description='Get notified about forks, ratings, and comments.'
//                checked={notifications.community}
//                onToggle={() => toggleNotification("community")}
//             />
//             <NotificationItem
//                title='Product Updates'
//                description='Receive updates about new features and improvements.'
//                checked={notifications.product}
//                onToggle={() => toggleNotification("product")}
//             />
//             <NotificationItem
//                title='Weekly Digest'
//                description='A summary of your template performance.'
//                checked={notifications.weekly}
//                onToggle={() => toggleNotification("weekly")}
//             />
//             <NotificationItem
//                title='Mentions'
//                description='Get notified when someone mentions you in a comment.'
//                checked={notifications.mentions}
//                onToggle={() => toggleNotification("mentions")}
//             />
//          </CardContent>
//       </Card>
//    );
// }

// function NotificationItem({ title, description, checked, onToggle }: any) {
//    return (
//       <div className='py-4 flex items-center justify-between'>
//          <div className='max-w-prose'>
//             <h4 className='font-medium text-foreground'>{title}</h4>
//             <p className='text-sm text-muted-foreground'>{description}</p>
//          </div>
//          <Switch checked={checked} onCheckedChange={onToggle} />
//       </div>
//    );
// }

// function BillingSettings() {
//    return (
//       <Card>
//          <CardHeader>
//             <CardTitle>Subscription</CardTitle>
//             <CardDescription>
//                You are currently on the{" "}
//                <span className='font-semibold text-primary'>Pro</span> plan.
//             </CardDescription>
//          </CardHeader>
//          <CardContent className='space-y-4'>
//             <Button>Manage Subscription</Button>
//             <Separator />
//             <div className='space-y-2'>
//                <h4 className='font-medium'>Billing History</h4>
//                <p className='text-sm text-muted-foreground'>No invoices yet.</p>
//             </div>
//          </CardContent>
//          <CardFooter className='border-t pt-6 flex justify-between items-center'>
//             <p className='text-sm text-muted-foreground'>
//                Next invoice on July 1, 2024
//             </p>
//             <Button variant='outline'>Update Payment Method</Button>
//          </CardFooter>
//       </Card>
//    );
// }
