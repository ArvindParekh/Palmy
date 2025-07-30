import type { StepType } from "@reactour/tour";
import { Button } from "@/components/ui/button";

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
};
