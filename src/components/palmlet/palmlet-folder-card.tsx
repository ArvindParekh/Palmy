import {
   Folder,
   FolderOpen,
   FileText,
   ChevronRight,
   ArrowRight,
   MoreHorizontal,
   Sparkles,
   Edit,
   Trash,
   Tag,
   Zap,
   Pencil,
} from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export interface PalmletFolderCardProps {
   title: string;
   description: string;
   palmletCount: number;
   colorTheme?: "sage" | "lavender" | "cream" | "pearl" | "stone" | "mist";
   icon?: React.ReactNode;
   url: string;
   onRename?: () => void;
   onEditDescription?: () => void;
}

// Variant 1: Luxurious glass morphism card with perfect dark mode
export function PalmletFolderCard({
   title,
   description,
   palmletCount,
   colorTheme = "sage",
   icon,
   url,
   onRename,
   onEditDescription,
}: PalmletFolderCardProps) {
   const colorClasses = {
      sage: {
         lightBg: "from-emerald-50/90 via-teal-50/70 to-emerald-100/60",
         darkBg: "from-emerald-950/40 via-teal-950/30 to-emerald-900/20",
         lightAccent:
            "bg-emerald-100/80 text-emerald-800 border-emerald-200/60",
         darkAccent: "bg-emerald-900/60 text-emerald-200 border-emerald-700/40",
         lightIcon: "text-emerald-700",
         darkIcon: "text-emerald-300",
      },
      lavender: {
         lightBg: "from-purple-50/90 via-violet-50/70 to-purple-100/60",
         darkBg: "from-purple-950/40 via-violet-950/30 to-purple-900/20",
         lightAccent: "bg-purple-100/80 text-purple-800 border-purple-200/60",
         darkAccent: "bg-purple-900/60 text-purple-200 border-purple-700/40",
         lightIcon: "text-purple-700",
         darkIcon: "text-purple-300",
      },
      cream: {
         lightBg: "from-amber-50/90 via-yellow-50/70 to-amber-100/60",
         darkBg: "from-amber-950/40 via-yellow-950/30 to-amber-900/20",
         lightAccent: "bg-amber-100/80 text-amber-800 border-amber-200/60",
         darkAccent: "bg-amber-900/60 text-amber-200 border-amber-700/40",
         lightIcon: "text-amber-700",
         darkIcon: "text-amber-300",
      },
      pearl: {
         lightBg: "from-slate-50/90 via-gray-50/70 to-slate-100/60",
         darkBg: "from-slate-950/40 via-gray-950/30 to-slate-900/20",
         lightAccent: "bg-slate-100/80 text-slate-800 border-slate-200/60",
         darkAccent: "bg-slate-900/60 text-slate-200 border-slate-700/40",
         lightIcon: "text-slate-700",
         darkIcon: "text-slate-300",
      },
      stone: {
         lightBg: "from-stone-50/90 via-neutral-50/70 to-stone-100/60",
         darkBg: "from-stone-950/40 via-neutral-950/30 to-stone-900/20",
         lightAccent: "bg-stone-100/80 text-stone-800 border-stone-200/60",
         darkAccent: "bg-stone-900/60 text-stone-200 border-stone-700/40",
         lightIcon: "text-stone-700",
         darkIcon: "text-stone-300",
      },
      mist: {
         lightBg: "from-blue-50/90 via-sky-50/70 to-blue-100/60",
         darkBg: "from-blue-950/40 via-sky-950/30 to-blue-900/20",
         lightAccent: "bg-blue-100/80 text-blue-800 border-blue-200/60",
         darkAccent: "bg-blue-900/60 text-blue-200 border-blue-700/40",
         lightIcon: "text-blue-700",
         darkIcon: "text-blue-300",
      },
   };

   const colors = colorClasses[colorTheme];

   return (
      <Link
         href={url}
         className='group relative w-full h-full min-h-60 max-w-sm rounded-3xl bg-white/70 dark:bg-slate-900/80 backdrop-blur-lg border border-white/40 dark:border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30 transition-all duration-500 cursor-pointer overflow-hidden'
      >
         {/* Dual gradient background for light/dark modes */}
         <div
            className={`absolute inset-0 bg-gradient-to-br light:${colors.lightBg} dark:${colors.darkBg} opacity-70 group-hover:opacity-90 transition-opacity duration-500`}
         />

         {/* Subtle animated shimmer effect */}
         <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out' />

         {/* Content */}
         <div className='relative z-10 p-8 h-full flex flex-col justify-between'>
            <div className='space-y-5'>
               <div className='flex items-center justify-between'>
                  <div
                     className={`p-3 rounded-2xl border backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 ${colors.lightAccent} dark:${colors.darkAccent}`}
                  >
                     {icon || (
                        <Folder
                           className={`w-5 h-5 ${colors.lightIcon} dark:${colors.darkIcon}`}
                        />
                     )}
                  </div>
                  <div className='flex items-center space-x-2'>
                     <span className='text-xs font-semibold text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20 dark:border-slate-600/30'>
                        {palmletCount}
                     </span>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button
                              variant='ghost'
                              size='icon'
                              className='opacity-60 group-hover:opacity-100 hover:bg-accent hover:text-accent-foreground'
                              onClick={(e) => e.stopPropagation()}
                           >
                              <MoreHorizontal className='w-4 h-4' />
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                           <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              onRename?.();
                           }}>
                              <Pencil className='w-4 h-4 mr-2' />
                              Rename
                           </DropdownMenuItem>
                           <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              onEditDescription?.();
                           }}>
                              <Edit className='w-4 h-4 mr-2' />
                              Edit Description
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div>
               </div>

               <div className='space-y-3'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white leading-tight'>
                     {title}
                  </h3>
                  <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 opacity-90'>
                     {description}
                  </p>
               </div>
            </div>

            <div className='flex items-center justify-between pt-5 border-t border-white/30 dark:border-slate-600/30'>
               <span className='text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wide'>
                  {palmletCount} {palmletCount === 1 ? "template" : "templates"}
               </span>
               <ChevronRight className='w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200 group-hover:translate-x-1 transition-all duration-300' />
            </div>
         </div>
      </Link>
   );
}

// Variant 2: Minimal luxe design with enhanced dark mode
export function PalmletFolderCardMinimal({
   title,
   description,
   palmletCount,
   colorTheme = "sage",
}: PalmletFolderCardProps) {
   const colorClasses = {
      sage: "text-emerald-700 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200/60 dark:border-emerald-700/50",
      lavender:
         "text-purple-700 dark:text-purple-300 bg-purple-50/70 dark:bg-purple-950/30 border-purple-200/60 dark:border-purple-700/50",
      cream: "text-amber-700 dark:text-amber-300 bg-amber-50/70 dark:bg-amber-950/30 border-amber-200/60 dark:border-amber-700/50",
      pearl: "text-slate-700 dark:text-slate-300 bg-slate-50/70 dark:bg-slate-950/30 border-slate-200/60 dark:border-slate-700/50",
      stone: "text-stone-700 dark:text-stone-300 bg-stone-50/70 dark:bg-stone-950/30 border-stone-200/60 dark:border-stone-700/50",
      mist: "text-blue-700 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/30 border-blue-200/60 dark:border-blue-700/50",
   };

   return (
      <div className='group w-full h-full min-h-60 max-w-sm rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur-md hover:bg-white/90 dark:hover:bg-slate-900/90 border border-white/50 dark:border-slate-600/40 shadow-lg hover:shadow-xl transition-all duration-400 cursor-pointer p-7'>
         <div className='flex flex-col justify-between h-full space-y-5'>
            {/* Header with sparkles icon */}
            <div className='flex items-start justify-between'>
               <div
                  className={`p-3 rounded-xl border ${colorClasses[colorTheme]} group-hover:scale-105 transition-transform duration-300 backdrop-blur-sm`}
               >
                  <Sparkles className='w-5 h-5' />
               </div>
               <div className='flex items-center space-x-2 bg-white/70 dark:bg-slate-800/70 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/30 dark:border-slate-600/40'>
                  <span className='text-xs font-semibold text-gray-700 dark:text-gray-200'>
                     {palmletCount}
                  </span>
               </div>
            </div>

            {/* Content */}
            <div className='space-y-4'>
               <div>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-3 leading-tight'>
                     {title}
                  </h3>
                  <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 opacity-90'>
                     {description}
                  </p>
               </div>

               <div className='flex items-center text-gray-500 dark:text-gray-400 text-xs font-semibold group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300'>
                  <span className='tracking-widest'>VIEW COLLECTION</span>
                  <ArrowRight className='w-3 h-3 ml-3 group-hover:translate-x-1 transition-transform duration-300' />
               </div>
            </div>
         </div>
      </div>
   );
}

// Variant 3: Elegant card with soft aesthetics and perfect dark mode
export function PalmletFolderCardLarge({
   title,
   description,
   palmletCount,
   colorTheme = "sage",
}: PalmletFolderCardProps) {
   const colorClasses = {
      sage: "text-emerald-700 dark:text-emerald-300",
      lavender: "text-purple-700 dark:text-purple-300",
      cream: "text-amber-700 dark:text-amber-300",
      pearl: "text-slate-700 dark:text-slate-300",
      stone: "text-stone-700 dark:text-stone-300",
      mist: "text-blue-700 dark:text-blue-300",
   };

   return (
      <div className='group relative w-full h-full min-h-60 max-w-sm rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border border-white/50 dark:border-slate-600/50 hover:bg-white/90 dark:hover:bg-slate-900/90 shadow-lg hover:shadow-2xl dark:hover:shadow-black/30 transition-all duration-500 cursor-pointer p-8 overflow-hidden'>
         {/* Floating count display - now with proper visibility in dark mode */}
         <div className='absolute top-6 right-6 z-0'>
            <div
               className={`text-5xl font-light ${colorClasses[colorTheme]} opacity-15 dark:opacity-20 group-hover:opacity-30 dark:group-hover:opacity-35 transition-opacity duration-500`}
            >
               {palmletCount}
            </div>
         </div>

         <div className='relative z-10 flex flex-col justify-between h-full space-y-6'>
            {/* Header */}
            <div className='space-y-4'>
               <div className='flex items-center space-x-4'>
                  <div className='p-4 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/30 dark:border-slate-600/40 group-hover:scale-105 transition-transform duration-300'>
                     <Folder
                        className={`w-6 h-6 ${colorClasses[colorTheme]}`}
                     />
                  </div>
                  <div className='min-w-0 flex-1'>
                     <h3 className='text-xl font-medium text-gray-900 dark:text-white leading-tight'>
                        {title}
                     </h3>
                  </div>
               </div>
               <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4 ml-1 opacity-90'>
                  {description}
               </p>
            </div>

            {/* Footer */}
            <div className='flex items-center justify-between pt-4 border-t border-white/30 dark:border-slate-600/40'>
               <span className='text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest'>
                  {palmletCount} templates
               </span>
               <div className='p-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-600/30 group-hover:bg-white/70 dark:group-hover:bg-slate-800/70 transition-colors duration-300'>
                  <MoreHorizontal className='w-3 h-3 text-gray-500 dark:text-gray-400' />
               </div>
            </div>
         </div>
      </div>
   );
}

// Variant 4: Ultra minimal horizontal layout with stunning dark mode
export function PalmletFolderCardCompact({
   title,
   description,
   palmletCount,
   colorTheme = "sage",
}: PalmletFolderCardProps) {
   const colorClasses = {
      sage: {
         bg: "bg-emerald-100/70 dark:bg-emerald-950/40 border-emerald-200/50 dark:border-emerald-700/40",
         text: "text-emerald-800 dark:text-emerald-200",
      },
      lavender: {
         bg: "bg-purple-100/70 dark:bg-purple-950/40 border-purple-200/50 dark:border-purple-700/40",
         text: "text-purple-800 dark:text-purple-200",
      },
      cream: {
         bg: "bg-amber-100/70 dark:bg-amber-950/40 border-amber-200/50 dark:border-amber-700/40",
         text: "text-amber-800 dark:text-amber-200",
      },
      pearl: {
         bg: "bg-slate-100/70 dark:bg-slate-950/40 border-slate-200/50 dark:border-slate-700/40",
         text: "text-slate-800 dark:text-slate-200",
      },
      stone: {
         bg: "bg-stone-100/70 dark:bg-stone-950/40 border-stone-200/50 dark:border-stone-700/40",
         text: "text-stone-800 dark:text-stone-200",
      },
      mist: {
         bg: "bg-blue-100/70 dark:bg-blue-950/40 border-blue-200/50 dark:border-blue-700/40",
         text: "text-blue-800 dark:text-blue-200",
      },
   };

   const colors = colorClasses[colorTheme];

   return (
      <div className='group w-full h-28 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-white/40 dark:border-slate-600/40 hover:bg-white/85 dark:hover:bg-slate-900/85 shadow-md hover:shadow-lg transition-all duration-400 cursor-pointer p-6'>
         <div className='flex items-center space-x-6 h-full'>
            {/* Enhanced color indicator with count and border */}
            <div
               className={`flex-shrink-0 w-14 h-14 ${colors.bg} border rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 backdrop-blur-sm`}
            >
               <span className={`text-lg font-semibold ${colors.text}`}>
                  {palmletCount}
               </span>
            </div>

            {/* Content */}
            <div className='flex-1 min-w-0 space-y-1'>
               <h3 className='text-base font-semibold text-gray-900 dark:text-white truncate'>
                  {title}
               </h3>
               <p className='text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed opacity-90'>
                  {description}
               </p>
               <span className='text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide'>
                  {palmletCount} {palmletCount === 1 ? "template" : "templates"}
               </span>
            </div>

            {/* Enhanced arrow */}
            <div className='flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300'>
               <ChevronRight className='w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200 group-hover:translate-x-1 transition-all duration-300' />
            </div>
         </div>
      </div>
   );
}

export default PalmletFolderCard;
