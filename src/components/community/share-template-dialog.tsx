"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface ShareTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTemplateShare: (template: { title: string; content: string; tags: string[] }) => void;
}

const userTemplates = [
  {
    id: 'user-template-1',
    title: "High-Impact Startup Pitch",
    content: "Hey {{name}}, I'm reaching out because I'm incredibly impressed with what you're building at {{company}}. My experience in {{skill}} could be a great asset...",
    tags: ["Business", "Pitch", "Startup"],
  },
  {
    id: 'user-template-2',
    title: "FAANG-Ready Cover Letter",
    content: "Dear {{hiringManager}}, I am writing to apply for the {{role}} position at {{company}}. With my background in large-scale systems and passion for {{field}}, I am confident I can contribute significantly to your team.",
    tags: ["Cover Letter", "FAANG", "Tech"],
  },
  {
    id: 'user-template-3',
    title: "Networking Follow-Up",
    content: "Hi {{name}}, it was great connecting at {{event}}. I really enjoyed our conversation about {{topic}}. Let's keep in touch.",
    tags: ["Networking", "Follow-up"],
  },
];

export function ShareTemplateDialog({ open, onOpenChange, onTemplateShare }: ShareTemplateDialogProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  useEffect(() => {
    if (selectedTemplateId) {
        const selected = userTemplates.find(t => t.id === selectedTemplateId);
        if (selected) {
            setTitle(selected.title);
            setContent(selected.content);
            setTags(selected.tags);
        }
    }
  }, [selectedTemplateId]);

  const resetForm = () => {
    setSelectedTemplateId(null);
    setTitle("");
    setContent("");
    setTags([]);
    setCurrentTag("");
  }
  
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
        resetForm();
    }
    onOpenChange(isOpen);
  }

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' && currentTag.trim() !== '') {
        e.preventDefault();
        const newTag = currentTag.trim();
        if (!tags.includes(newTag) && tags.length < 5) {
            setTags([...tags, newTag]);
        }
        setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };


  const handleSubmit = () => {
    if (!title || !content) return;
    onTemplateShare({ title, content, tags });
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Share a Template</DialogTitle>
          <DialogDescription>
            Select a template to pre-fill the form, then customize and share.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
            <Label>Select a personal template (optional)</Label>
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-4">
                {userTemplates.map(template => (
                    <div
                        key={template.id}
                        onClick={() => setSelectedTemplateId(template.id)}
                        className={cn(
                            "group p-3 rounded-lg border-2 cursor-pointer transition-all",
                            selectedTemplateId === template.id 
                                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/50" 
                                : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                        )}
                    >
                        <div className="flex justify-between items-start">
                             <h4 className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">{template.title}</h4>
                             <CheckCircle className={cn(
                                 "w-5 h-5 text-neutral-300 dark:text-neutral-700 transition-all",
                                 selectedTemplateId === template.id ? "text-blue-500" : "opacity-0 group-hover:opacity-100"
                             )}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="e.g., The best cold email template"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content">Template Content</Label>
            <Textarea
              id="content"
              placeholder="Paste your template here or select one above. Use {{variable}} for placeholders."
              className="min-h-[150px]"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tags">Tags (up to 5)</Label>
             <div className="flex flex-wrap items-center gap-2">
                {tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 p-0.5">
                            <X className="w-3 h-3"/>
                        </button>
                    </Badge>
                ))}
                 <Input
                    id="tags"
                    placeholder={tags.length > 0 ? "Add more..." : "Add tags (space-separated)"}
                    className="flex-1 min-w-[150px] border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleTagInput}
                    disabled={tags.length >= 5}
                />
            </div>
          </div>
        </div>
        <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit} disabled={!title || !content}>Share Template</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 