"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitBranch, ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Prisma } from "@/generated/prisma/client";
import { ContentPreviewDialog } from "./content-preview-dialog";
import { ForkTemplateDialog } from "./fork-template-dialog";
import { formatDistanceToNow } from "date-fns";
import { upvotePost } from "@/actions/community";
import { toast } from "sonner";

// export interface CommunityTemplatePostProps {
//   id: string;
//   author: {
//     name: string;
//     username: string;
//     avatarUrl: string;
//   };
//   timestamp: string;
//   title: string;
//   contentSnippet: string;
//   tags: string[];
//   stats: {
//     likes: number;
//     forks: number;
//     comments: number;
//   };
// }

export function CommunityTemplatePost({ post, userFolders }: { 
  post: Prisma.SharedPalmletGetPayload<{
    include: {
      user: {
        select: {
          name: true;
          image: true;
          email: true;
        }
      },
      variables: true,
    };
  }>, 
  userFolders?: Prisma.Palmlet_FolderGetPayload<{
    include: {
      palmlets: true;
    };
  }>[] 
}) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isForkDialogOpen, setIsForkDialogOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(post.upvotes);
  const [isUpvoting, setIsUpvoting] = useState(false);

  const handleUpvote = async () => {
    if (isUpvoting) return;
    
    setIsUpvoting(true);
    const result = await upvotePost(post.id);
    
    if (result.success && result.data) {
      setUpvoteCount(result.data.upvotes);
      // toast.success("Post upvoted!");
    } else {
      toast.error(result.message || "Failed to upvote post");
    }
    
    setIsUpvoting(false);
  };

  const handleFork = async (folderId: string, templateData: any) => {
    // This would need to be implemented with the actual fork API
    console.log("Forking template:", { folderId, templateData });
    // For now, just simulate the action
    throw new Error("Fork functionality not yet implemented");
  };

  return (
    <div className="group bg-card border border-border rounded-2xl p-6 flex gap-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      <Avatar className="w-10 h-10 hidden md:block flex-shrink-0">
        <AvatarImage src={post.user.image || ""} alt={post.user.name} />
        <AvatarFallback>{post.user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm">
           <Avatar className="w-8 h-8 md:hidden">
            <AvatarImage src={post.user.image || ""} alt={post.user.name} />
            <AvatarFallback>{post.user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <span className="font-semibold text-foreground">{post.user.name}</span>
            <div className="flex items-center gap-1.5">
                <span className="text-neutral-500 dark:text-neutral-400">@{post.user.email}</span>
                <span className="text-neutral-500 dark:text-neutral-400">·</span>
                <span className="text-neutral-500 dark:text-neutral-400">{formatDistanceToNow(post.createdAt, { addSuffix: true })}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">{post.title}</h3>
          <div 
            className="text-muted-foreground whitespace-pre-wrap line-clamp-4 font-mono text-sm p-4 bg-muted rounded-lg border border-border cursor-pointer transition-colors hover:bg-muted/90"
            onClick={() => setIsPreviewOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsPreviewOpen(true);
              }
            }}
          >
            {post.content}
          </div>
          <div className="flex gap-2">
            {post.tags.map(tag => <Badge variant="secondary" key={tag}>{tag}</Badge>)}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
            onClick={handleUpvote}
            disabled={isUpvoting}
          >
            <ArrowBigUp className="w-4 h-4" />
            <span className="text-sm font-medium">{upvoteCount}</span>
            <span className="sr-only">Upvote</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
            onClick={() => setIsForkDialogOpen(true)}
            disabled={!userFolders || userFolders.length === 0}
          >
            <GitBranch className="w-4 h-4" />
            <span className="text-sm font-medium">Fork</span>
            <span className="sr-only">Fork</span>
          </Button>
        </div>
        
        <ContentPreviewDialog
          open={isPreviewOpen}
          onOpenChange={setIsPreviewOpen}
          title={post.title}
          content={post.content}
          variables={post.variables?.map(v => v.variableName) || []}
        />
        
        {userFolders && userFolders.length > 0 && (
          <ForkTemplateDialog
            open={isForkDialogOpen}
            onOpenChange={setIsForkDialogOpen}
            template={{
              id: post.id,
              title: post.title,
              content: post.content,
              tags: post.tags,
              variables: post.variables?.map(v => v.variableName) || [],
            }}
            userFolders={userFolders}
            onFork={handleFork}
          />
        )}
      </div>
    </div>
  );
} 