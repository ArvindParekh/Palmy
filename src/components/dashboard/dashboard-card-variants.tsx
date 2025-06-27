import { ArrowRight, ChevronRight, ExternalLink } from "lucide-react";

// Variant 1: Gradient hover effect
export function DashboardCardGradient({ title, description }: { title: string, description: string }) {
    return (
        <div className="group relative w-full h-full min-h-48 min-w-48 rounded-xl bg-white dark:bg-gray-900 p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                </div>
                <div className="flex justify-end mt-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Variant 2: Minimal modern card
export function DashboardCardMinimal({ title, description }: { title: string, description: string }) {
    return (
        <div className="group w-full h-full min-h-48 min-w-48 rounded-2xl bg-gray-50 dark:bg-gray-800/50 p-6 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="flex flex-col justify-between h-full">
                <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                    </div>
                    <div>
                        <h2 className="text-lg font-medium text-foreground">{title}</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
                    </div>
                </div>
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium mt-4 group-hover:gap-2 transition-all duration-300">
                    <span>View details</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
            </div>
        </div>
    )
}

// Variant 3: Card with animated border
export function DashboardCardAnimated({ title, description }: { title: string, description: string }) {
    return (
        <div className="group relative w-full h-full min-h-48 min-w-48 rounded-xl bg-white dark:bg-gray-900 p-6 border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="space-y-3">
                    <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Click to explore</span>
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors duration-300">
                        <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export function DashboardCard({ title, description }: { title: string, description: string }) {
    return (
        <div className="group w-full h-full min-h-48 max-w-80 rounded-xl bg-accent p-6 border-2 border-gray-200 dark:border-accent-foreground border-dashed shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-primary">
            <div className="flex flex-row gap-2 justify-between items-center w-full h-full">
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-bold text-primary group-hover:text-primary">{title}</h2>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600">{description}</p>
                </div>
                <div className="flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
                </div>
            </div>
        </div>
    )
}

export default DashboardCardGradient; 