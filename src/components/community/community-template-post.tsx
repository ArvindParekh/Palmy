"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, GitBranch, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

export interface CommunityTemplatePostProps {
  id: string;
  author: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  timestamp: string;
  title: string;
  contentSnippet: string;
  tags: string[];
  stats: {
    likes: number;
    forks: number;
    comments: number;
  };
}

export function CommunityTemplatePost({
  author,
  timestamp,
  title,
  contentSnippet,
  tags,
  stats,
}: CommunityTemplatePostProps) {
  return (
    <div className="group bg-card border border-border rounded-2xl p-6 flex gap-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      <Avatar className="w-10 h-10 hidden md:block flex-shrink-0">
        <AvatarImage src={author.avatarUrl} alt={author.name} />
        <AvatarFallback>{author.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm">
           <Avatar className="w-8 h-8 md:hidden">
            <AvatarImage src={author.avatarUrl} alt={author.name} />
            <AvatarFallback>{author.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <span className="font-semibold text-foreground">{author.name}</span>
            <div className="flex items-center gap-1.5">
                <span className="text-neutral-500 dark:text-neutral-400">@{author.username}</span>
                <span className="text-neutral-500 dark:text-neutral-400">·</span>
                <span className="text-neutral-500 dark:text-neutral-400">{timestamp}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-muted-foreground whitespace-pre-wrap line-clamp-4 font-mono text-sm p-4 bg-muted rounded-lg border border-border">
            {contentSnippet}
          </p>
          <div className="flex gap-2">
            {tags.map(tag => <Badge variant="secondary" key={tag}>{tag}</Badge>)}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <ActionButton icon={Heart} count={stats.likes} label="Like" activeColor="text-red-500" />
          <ActionButton icon={GitBranch} count={stats.forks} label="Fork" activeColor="text-green-500" />
          <ActionButton icon={MessageSquare} count={stats.comments} label="Comment" activeColor="text-blue-500" />
        </div>
      </div>
    </div>
  );
}

const ActionButton = ({icon: Icon, count, label, activeColor}: {icon: React.ElementType, count: number, label: string, activeColor: string}) => {
    const [isLiked, setIsLiked] = React.useState(false);

    return (
        <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
            onClick={() => setIsLiked(!isLiked)}
        >
            <Icon className={cn("w-4 h-4", isLiked && activeColor)} />
            <span className={cn("text-sm font-medium", isLiked && activeColor)}>{isLiked ? count + 1 : count}</span>
            <span className="sr-only">{label}</span>
        </Button>
    )
} 