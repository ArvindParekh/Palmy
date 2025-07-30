import type { StepType } from "@reactour/tour";
import { Button } from "@/components/ui/button";
import { updateUserOnboardingStatus } from "@/actions/onboarding";
import { authClient } from "@/lib/auth-client";

export const steps: StepType[] = [
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
      actionAfter: async () => {
         // onboarding completed
         try {
            const session = await authClient.getSession();
            if (session?.data?.user?.id) {
               await updateUserOnboardingStatus(true, session.data.user.id);
            }
         } catch (error) {
            console.error('Failed to update onboarding status:', error);
         }
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
