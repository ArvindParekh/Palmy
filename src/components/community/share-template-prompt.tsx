"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
import { ShareTemplateDialog } from "./share-template-dialog";

interface ShareTemplatePromptProps {
    onTemplateShare: (template: { title: string; content: string; tags: string[] }) => void;
}

export function ShareTemplatePrompt({ onTemplateShare }: ShareTemplatePromptProps) {
    // Dummy user data
    const user = {
        name: "Arvind Kumar",
        avatarUrl: "https://github.com/arvind-kum.png"
    }
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            <div className="bg-card border border-border rounded-xl p-5 flex gap-4 items-start cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => setDialogOpen(true)}
            >
                <Avatar className="w-10 h-10">
                    <AvatarImage src={user.avatarUrl} alt={user.name} />
                    <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="w-full text-left pt-2 text-neutral-500 dark:text-neutral-400">
                    Share a new template...
                </div>
            </div>
            <ShareTemplateDialog 
                open={dialogOpen} 
                onOpenChange={setDialogOpen}
                onTemplateShare={onTemplateShare}
            />
        </>
    )
} 