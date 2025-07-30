import type { StepType } from "@reactour/tour";
import { Button } from "@/components/ui/button";
import { updateUserOnboardingStatus } from "@/actions/onboarding";
import { authClient } from "@/lib/auth-client";

export const steps: StepType[] = [
   // === DASHBOARD SECTION ===
   {
      selector: '[data-tour="quick-start-0"]',
      content: (
         <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-foreground'>
               🚀 Create from Scratch
            </h3>
            <p className='text-sm text-muted-foreground'>
               Start building your own palmlet templates from a blank canvas.
               Perfect when you have specific ideas in mind!
            </p>
         </div>
      ),
      position: "top",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
   },
   {
      selector: '[data-tour="quick-start-1"]',
      content: (
         <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-foreground'>
               🤖 AI-Powered Generation
            </h3>
            <p className='text-sm text-muted-foreground'>
               Describe what you need and let our AI assistant create a draft
               template for you. Great for getting started quickly!
            </p>
         </div>
      ),
      position: "top",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
   },
   {
      selector: '[data-tour="quick-start-2"]',
      content: (
         <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-foreground'>
               📚 Community Templates
            </h3>
            <p className='text-sm text-muted-foreground'>
               Browse and use proven templates from top performers in your
               field. Save time with battle-tested content!
            </p>
         </div>
      ),
      position: "top",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
   },
   //TODO: figure out how to add this later
   // {
   //   selector: '[data-tour="quick-start-3"]',
   //   content: (
   //     <div className="space-y-3">
   //       <h3 className="text-lg font-semibold text-foreground">🗂️ New Folder</h3>
   //       <p className="text-sm text-muted-foreground">
   //         Create a new folder to organize your templates.
   //       </p>
   //     </div>
   //   ),
   //   position: "top",
   //   padding: 8,
   //   styles: {
   //     maskArea: (base) => ({
   //       ...base,
   //       rx: 12,
   //     }),
   //   },
   // },
   {
      selector: '[data-tour="quick-start-community"]',
      content: (
         <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-foreground'>
               💡 Need Inspiration?
            </h3>
            <p className='text-sm text-muted-foreground'>
               Browse our community templates to get ideas for your next
               template.
            </p>
         </div>
      ),
      position: "top",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
   },
   {
      selector: '[data-tour="quick-start-leaderboard"]',
      content: (
         <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-foreground'>
               🏆 Top Templates
            </h3>
            <p className='text-sm text-muted-foreground'>
               See the most popular templates in the community.
            </p>
         </div>
      ),
      position: "right",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
   },
   // === NAVIGATION TO TEMPLATES ===
   {
      selector: '[data-tour="quick-start-templates"]',
      content: (
         <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-foreground'>
               📁 Your Template Library
            </h3>
            <p className='text-sm text-muted-foreground'>
               Now let's explore your template library where you can organize 
               your templates into folders. Click Next to continue!
            </p>
         </div>
      ),
      position: "right",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
      action: () => {
         // Navigate to templates page
         window.location.href = '/palmlets?tour=templates';
      },
   },
   
   // === TEMPLATES PAGE SECTION ===
   {
      selector: '[data-tour="templates-header"]',
      content: (
         <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-foreground'>
               📚 Welcome to Your Templates
            </h3>
            <p className='text-sm text-muted-foreground'>
               This is where you organize all your palmlet templates into folders.
               Think of folders as categories like "Cover Letters", "LinkedIn Messages", etc.
            </p>
         </div>
      ),
      position: "bottom",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
   },
   {
      selector: '[data-tour="templates-new-folder"]',
      content: (
         <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-foreground'>
               ➕ Create New Folders
            </h3>
            <p className='text-sm text-muted-foreground'>
               Click here to create new folders to organize your templates.
               You can create folders for different types of templates!
            </p>
         </div>
      ),
      position: "left",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
   },
   {
      selector: '[data-tour="templates-grid"]',
      content: (
         <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-foreground'>
               🗂️ Your Folder Grid
            </h3>
            <p className='text-sm text-muted-foreground'>
               Your folders appear here as cards. Each folder shows how many 
               templates it contains. Click on any folder to view its templates!
            </p>
         </div>
      ),
      position: "top",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
   },

   // === NAVIGATION TO LAB ===
   {
      selector: '[data-tour="quick-start-lab"]',
      content: (
         <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-foreground'>
               🧪 AI-Powered Lab
            </h3>
            <p className='text-sm text-muted-foreground'>
               Next, let's check out the Lab where you can generate templates 
               using AI. This is where the magic happens!
            </p>
         </div>
      ),
      position: "right",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
      action: () => {
         // Navigate to lab page
         window.location.href = '/lab?tour=lab';
      },
   },

   // === LAB PAGE SECTION ===
   {
      selector: '[data-tour="lab-header"]',
      content: (
         <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-foreground'>
               🚀 AI Template Generation
            </h3>
            <p className='text-sm text-muted-foreground'>
               Welcome to the Lab! Here you can describe what kind of template 
               you need and our AI will generate it for you in seconds.
            </p>
         </div>
      ),
      position: "bottom",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
   },
   {
      selector: '[data-tour="lab-prompt-input"]',
      content: (
         <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-foreground'>
               ✍️ Describe Your Template
            </h3>
            <p className='text-sm text-muted-foreground'>
               Type a description of what template you need. For example: 
               "Create a cold email template for reaching out to startups"
            </p>
         </div>
      ),
      position: "bottom",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
   },
   {
      selector: '[data-tour="lab-generate-button"]',
      content: (
         <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-foreground'>
               ⚡ Generate with AI
            </h3>
            <p className='text-sm text-muted-foreground'>
               Click this button to generate your template! The AI will create 
               a personalized template based on your description.
            </p>
         </div>
      ),
      position: "left",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
   },

   // === NAVIGATION TO COMMUNITY ===
   {
      selector: '[data-tour="quick-start-community"]',
      content: (
         <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-foreground'>
               🌍 Join the Community
            </h3>
            <p className='text-sm text-muted-foreground'>
               Finally, let's explore the Community where you can discover 
               templates shared by other users and share your own!
            </p>
         </div>
      ),
      position: "right",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
      action: () => {
         // Navigate to community page
         window.location.href = '/community?tour=community';
      },
   },

   // === COMMUNITY PAGE SECTION ===
   {
      selector: '[data-tour="community-header"]',
      content: (
         <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-foreground'>
               🎉 Welcome to the Community
            </h3>
            <p className='text-sm text-muted-foreground'>
               This is where you can discover amazing templates created by other users,
               get inspired, and share your own templates with the community!
            </p>
         </div>
      ),
      position: "bottom",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
   },
   {
      selector: '[data-tour="community-share-prompt"]',
      content: (
         <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-foreground'>
               📤 Share Your Templates
            </h3>
            <p className='text-sm text-muted-foreground'>
               Use this section to share your own templates with the community.
               Help others by sharing your best templates!
            </p>
         </div>
      ),
      position: "bottom",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
   },
   {
      selector: '[data-tour="community-filters"]',
      content: (
         <div className='space-y-3'>
            <h3 className='text-lg font-semibold text-foreground'>
               🔍 Find What You Need
            </h3>
            <p className='text-sm text-muted-foreground'>
               Use these filters to search and sort templates by category, 
               popularity, or specific keywords to find exactly what you need.
            </p>
         </div>
      ),
      position: "bottom",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
   },

   // === TOUR COMPLETION ===
   {
      selector: 'body',
      content: ({ setIsOpen }: { setIsOpen: (open: boolean) => void }) => (
         <div className='space-y-4 text-center'>
            <h3 className='text-lg font-semibold text-foreground'>
               🎉 Tour Complete!
            </h3>
            <p className='text-sm text-muted-foreground'>
               You've successfully completed the Palmly tour!
            </p>
            {/* <ul className='text-xs text-muted-foreground text-left space-y-1'>
               <li>• Organize templates in folders</li>
               <li>• Generate templates with AI</li>
               <li>• Discover community templates</li>
               <li>• Share your own templates</li>
            </ul> */}
            <p className='text-sm font-medium text-foreground'>
               Ready to start creating amazing templates? 🚀
            </p>
            <Button onClick={() =>{
               setIsOpen(false);
               window.location.href = '/dashboard';
            }}>Get Started!</Button>
         </div>
      ),
      position: "center",
      padding: 8,
      styles: {
         maskArea: (base) => ({
            ...base,
            rx: 12,
         }),
      },
      actionAfter: async () => {
         // Mark onboarding as completed
         try {
            const session = await authClient.getSession();
            if (session?.data?.user?.id) {
               await updateUserOnboardingStatus(true, session.data.user.id);
            }
         } catch (error) {
            console.error('Failed to update onboarding status:', error);
         }
         // Navigate back to dashboard
         // window.location.href = '/dashboard';
      }
   },
  //  {
  //     selector: "",
  //     content: (
  //        <div className='space-y-3'>
  //           <h3 className='text-lg font-semibold text-foreground'>
  //              🚀 Ready to Explore?
  //           </h3>
  //           <p className='text-sm text-muted-foreground'>
  //              Click the button below to start exploring the app.
  //           </p>
  //           <Button onClick={() => close()}>Explore</Button>
  //        </div>
  //     ),
  //     position: "center",
  //     padding: 8,
  //     styles: {
  //        maskArea: (base) => ({
  //           ...base,
  //           rx: 12,
  //        }),
  //     },
  //  },
];

export const tourStyles = {
   popover: (base: any) => ({
      ...base,
      boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.15)",
      color: "var(--foreground)",
      borderRadius: "0.75rem",
      padding: "1rem",
      backgroundColor: "var(--background)",
      border: "1px solid var(--border)",
      maxWidth: "320px",
   }),
   maskArea: (base: any) => ({
      ...base,
      rx: 12,
   }),
   // Fix button styles for dark mode
   button: (base: any, state: any) => {
      const disabled = state?.disabled || false;
      return {
         ...base,
         backgroundColor: disabled 
            ? "var(--muted)" 
            : "var(--primary)",
         color: disabled 
            ? "var(--muted-foreground)" 
            : "var(--primary-foreground)",
         border: "1px solid var(--border)",
         borderRadius: "0.375rem",
         padding: "0.5rem 1rem",
         fontSize: "0.875rem",
         fontWeight: "500",
         cursor: disabled ? "not-allowed" : "pointer",
         opacity: disabled ? 0.6 : 1,
         transition: "all 0.2s ease-in-out",
         '&:hover': {
            backgroundColor: disabled 
               ? "var(--muted)" 
               : "var(--primary/90)",
         },
      };
   },
   // Style navigation controls
   controls: (base: any) => ({
      ...base,
      marginTop: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
   }),
   // Style close button
   close: (base: any) => ({
      ...base,
      position: "absolute",
      top: "0.5rem",
      right: "0.5rem",
      backgroundColor: "transparent",
      border: "none",
      color: "var(--muted-foreground)",
      cursor: "pointer",
      borderRadius: "0.25rem",
      padding: "0.25rem",
      '&:hover': {
         backgroundColor: "var(--muted)",
         color: "var(--foreground)",
      },
   }),
};
