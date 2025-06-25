"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, GitBranch, ArrowRight, User } from "lucide-react";

export interface CommunityTemplateCardProps {
  id: string;
  title: string;
  category: string;
  forks: number;
  rating: number;
  author: {
    name: string;
    avatarUrl: string;
  };
}

export function CommunityTemplateCard({
  title,
  category,
  forks,
  rating,
  author,
}: CommunityTemplateCardProps) {
  return (
    <div className="group relative rounded-2xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md border border-white/40 dark:border-neutral-700/50 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/10 transition-all duration-300 h-full flex flex-col">
       <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200/80 dark:border-blue-800/80">{category}</Badge>
            <div className="flex items-center gap-1.5 text-yellow-500 dark:text-yellow-400">
                <Star className="w-4 h-4" />
                <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
            </div>
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3 leading-tight">
            {title}
        </h3>
       </div>
       <div className="border-t border-neutral-200/80 dark:border-neutral-800/80 mt-auto">
        <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                    <AvatarImage src={author.avatarUrl} alt={author.name} />
                    <AvatarFallback>{author.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{author.name}</span>
            </div>
            <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                    <GitBranch className="w-4 h-4" />
                    <span>{forks}</span>
                </div>
                 <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    Fork
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
            </div>
        </div>
       </div>
    </div>
  );
} 