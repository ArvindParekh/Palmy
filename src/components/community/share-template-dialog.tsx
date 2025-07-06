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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Prisma } from "@/generated/prisma/client";

interface ShareTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTemplateShare: (template: { title: string; content: string; tags: string[]; variables: string[] }) => Promise<void>;
  userTemplates: Prisma.PalmletGetPayload<{
    include: {
      tags: true,
      variables: true,
    }
  }>[] | undefined
}

const userTemplates = [
  {
    id: 'user-template-1',
    title: "High-Impact Startup Pitch",
    content: "Hey {{name}}, I'm reaching out because I'm incredibly impressed with what you're building at {{company}}. My experience in {{skill}} could be a great asset...",
    tags: ["Startups", "Outreach", "Networking"],
  },
  {
    id: 'user-template-2',
    title: "FAANG-Ready Cover Letter",
    content: "Dear {{hiringManager}}, I am writing to apply for the {{role}} position at {{company}}. With my background in large-scale systems and passion for {{field}}, I am confident I can contribute significantly to your team.",
    tags: ["CoverLetter", "Interview"],
  },
  {
    id: 'user-template-3',
    title: "Networking Follow-Up",
    content: "Hi {{name}}, it was great connecting at {{event}}. I really enjoyed our conversation about {{topic}}. Let's keep in touch.",
    tags: ["Networking", "FollowUp"],
  },
];

const availableTags = [
  "LinkedIn",
  "Outreach", 
  "Networking",
  "FollowUp",
  "Interview",
  "PostInterview",
  "CoverLetter",
  "Startups",
  "ColdEmail"
];

export function ShareTemplateDialog({ open, onOpenChange, onTemplateShare, userTemplates }: ShareTemplateDialogProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [variables, setVariables] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (selectedTemplateId) {
        const selected = userTemplates?.find(t => t.id === selectedTemplateId);
        if (selected) {
            setTitle(selected.title);
            setContent(selected.content ?? "");
            // Don't autofill tags - let user choose them manually
            setVariables(selected.variables.map(v => v.variableName));
        }
    }
  }, [selectedTemplateId]);

  const resetForm = () => {
    setSelectedTemplateId(null);
    setTitle("");
    setContent("");
    setTags([]);
    setVariables([]);
  }
  
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
        resetForm();
    }
    onOpenChange(isOpen);
  }

  const handleTagSelect = (tag: string) => {
    if (!tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!title || !content) return;
    setIsSubmitting(true);
    try {
      await onTemplateShare({ title, content, tags, variables });
      handleOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
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
          <Select value={selectedTemplateId || ""} onValueChange={setSelectedTemplateId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a template to pre-fill..." />
            </SelectTrigger>
            <SelectContent>
              {userTemplates?.map(template => (
                <SelectItem key={template.id} value={template.id}>
                  {template.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            <Label>Tags (up to 5)</Label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 p-0.5">
                      <X className="w-3 h-3"/>
                    </button>
                  </Badge>
                ))}
              </div>
              <Select value="" onValueChange={handleTagSelect} disabled={tags.length >= 5}>
                <SelectTrigger>
                  <SelectValue placeholder={tags.length >= 5 ? "Maximum 5 tags selected" : "Add a tag..."} />
                </SelectTrigger>
                <SelectContent>
                  {availableTags.filter(tag => !tags.includes(tag)).map(tag => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit} disabled={!title || !content || isSubmitting}>
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Share Template"}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 