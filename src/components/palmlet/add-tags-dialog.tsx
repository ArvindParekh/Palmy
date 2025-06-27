"use client";

import { useState, KeyboardEvent } from "react";
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
  onSave: (templateId: string, newTags: string[]) => Promise<void>;
}

export function AddTagsDialog({ 
  open, 
  onOpenChange, 
  templateId, 
  templateTitle, 
  existingTags,
  onSave 
}: AddTagsDialogProps) {
  const [newTags, setNewTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const allTags = [...existingTags.map(t => t.tagName), ...newTags];

  const handleTagInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const tag = currentTag.trim().toLowerCase();
    if (tag && !allTags.includes(tag) && allTags.length < 10) {
      setNewTags(prev => [...prev, tag]);
      setCurrentTag("");
    }
  };

  const removeNewTag = (tagToRemove: string) => {
    setNewTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSave = async () => {
    if (newTags.length === 0) {
      onOpenChange(false);
      return;
    }

    setIsLoading(true);
    try {
      await onSave(templateId, newTags);
      setNewTags([]);
      setCurrentTag("");
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to add tags:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setNewTags([]);
    setCurrentTag("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Add Tags
          </DialogTitle>
          <DialogDescription>
            Add tags to "{templateTitle}" to help organize and find your templates.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Existing Tags */}
          {existingTags.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Current Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {existingTags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-muted">
                    {tag.tagName}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* New Tags */}
          <div>
            <Label htmlFor="new-tags" className="text-sm font-medium">
              New Tags {newTags.length > 0 && `(${newTags.length})`}
            </Label>
            <div className="mt-2 space-y-3">
              {/* Tag Input */}
              <div className="flex gap-2">
                <Input
                  id="new-tags"
                  placeholder="Type a tag and press Enter or Space"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleTagInput}
                  disabled={allTags.length >= 10}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addTag}
                  disabled={!currentTag.trim() || allTags.length >= 10}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* New Tags Display */}
              {newTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {newTags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="default" 
                      className="flex items-center gap-1 bg-primary"
                    >
                      {tag}
                      <button 
                        onClick={() => removeNewTag(tag)}
                        className="rounded-full hover:bg-primary/80 p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Limits Info */}
              <p className="text-xs text-muted-foreground">
                {allTags.length}/10 tags • Use spaces or Enter to add tags
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
            disabled={newTags.length === 0 || isLoading}
            className="min-w-[80px]"
          >
            {isLoading ? "Saving..." : `Add ${newTags.length} Tag${newTags.length === 1 ? '' : 's'}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 