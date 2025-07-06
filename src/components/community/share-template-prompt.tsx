"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
import { ShareTemplateDialog } from "./share-template-dialog";
import { Prisma } from "@/generated/prisma/client";

interface ShareTemplatePromptProps {
    onTemplateShare: (template: { title: string; content: string; tags: string[]; variables: string[] }) => void;
    userTemplates: Prisma.PalmletGetPayload<{
        include: {
            tags: true,
            variables: true,
        }
    }>[] | undefined
    user: {
        name: string;
        image: string;
    } | undefined
}

export function ShareTemplatePrompt({ onTemplateShare, userTemplates, user }: ShareTemplatePromptProps) {
    // Dummy user data
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <div className="bg-card border border-border rounded-xl p-5 flex gap-4 items-start cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => setDialogOpen(true)}
            >
                <Avatar className="w-10 h-10">
                    <AvatarImage src={user?.image} alt={user?.name ?? ""} />
                    <AvatarFallback>{user?.name?.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="w-full text-left pt-2 text-neutral-500 dark:text-neutral-400">
                    Share a new template...
                </div>
            </div>
            <ShareTemplateDialog 
                open={dialogOpen} 
                onOpenChange={setDialogOpen}
                onTemplateShare={onTemplateShare}
                userTemplates={userTemplates}
            />
        </>
    )
} 