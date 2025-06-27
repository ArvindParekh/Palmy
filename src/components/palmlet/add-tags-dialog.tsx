"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import { X, Tag, Plus } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface AddTagsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templateId: string;
  templateTitle: string;
  existingTags: Array<{ tagName: string }>;
  onSave: (templateId: string, allTags: string[]) => Promise<void>;
}

export function AddTagsDialog({ 
  open, 
  onOpenChange, 
  templateId, 
  templateTitle, 
  existingTags,
  onSave 
}: AddTagsDialogProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize tags when dialog opens
  useEffect(() => {
    if (open) {
      setTags(existingTags.map(t => t.tagName));
    }
  }, [open, existingTags]);

  const handleTagInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const tag = currentTag.trim().toLowerCase();
    if (tag && !tags.includes(tag) && tags.length < 10) {
      setTags(prev => [...prev, tag]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(templateId, tags);
      setTags([]);
      setCurrentTag("");
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update tags:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setTags([]);
    setCurrentTag("");
    onOpenChange(false);
  };

  const hasChanges = JSON.stringify(tags.sort()) !== JSON.stringify(existingTags.map(t => t.tagName).sort());

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Manage Tags
          </DialogTitle>
          <DialogDescription>
            Add or remove tags for "{templateTitle}" to help organize and find your templates.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Tag Input */}
          <div>
            <Label htmlFor="tag-input" className="text-sm font-medium">
              Add New Tag
            </Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="tag-input"
                placeholder="Type a tag and press Enter or Space"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleTagInput}
                disabled={tags.length >= 10}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addTag}
                disabled={!currentTag.trim() || tags.length >= 10}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* All Tags Display */}
          <div>
            <Label className="text-sm font-medium">
              Tags {tags.length > 0 && `(${tags.length})`}
            </Label>
            <div className="mt-2 space-y-3">
              {tags.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">
                  No tags added yet
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <button 
                        onClick={() => removeTag(tag)}
                        className="rounded-full hover:bg-secondary/80 p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Limits Info */}
              <p className="text-xs text-muted-foreground">
                {tags.length}/10 tags • Click × to remove tags • Use spaces or Enter to add tags
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={!hasChanges || isLoading}
            className="min-w-[80px]"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 