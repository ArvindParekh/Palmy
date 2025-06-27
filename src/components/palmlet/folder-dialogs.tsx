"use client";

import { useState, useEffect } from "react";
import { Pencil, Edit } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

interface RenameFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentName: string;
  onSave: (newName: string) => Promise<void>;
}

interface EditDescriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentDescription: string;
  onSave: (newDescription: string) => Promise<void>;
}

export function RenameFolderDialog({ 
  open, 
  onOpenChange, 
  currentName,
  onSave 
}: RenameFolderDialogProps) {
  const [name, setName] = useState(currentName);
  const [isLoading, setIsLoading] = useState(false);

  // Update name when dialog opens
  useEffect(() => {
    if (open) {
      setName(currentName);
    }
  }, [open, currentName]);

  const handleSave = async () => {
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName === currentName) {
      onOpenChange(false);
      return;
    }

    setIsLoading(true);
    try {
      await onSave(trimmedName);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to rename folder:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName(currentName);
    onOpenChange(false);
  };

  const hasChanges = name.trim() !== currentName && name.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="w-5 h-5" />
            Rename Folder
          </DialogTitle>
          <DialogDescription>
            Enter a new name for your folder.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="folder-name" className="text-sm font-medium">
              Folder Name
            </Label>
            <Input
              id="folder-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter folder name..."
              className="border-border"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && hasChanges) {
                  handleSave();
                }
              }}
            />
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
            {isLoading ? "Saving..." : "Rename"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function EditDescriptionDialog({ 
  open, 
  onOpenChange, 
  currentDescription,
  onSave 
}: EditDescriptionDialogProps) {
  const [description, setDescription] = useState(currentDescription);
  const [isLoading, setIsLoading] = useState(false);

  // Update description when dialog opens
  useEffect(() => {
    if (open) {
      setDescription(currentDescription);
    }
  }, [open, currentDescription]);

  const handleSave = async () => {
    const trimmedDescription = description.trim();
    if (trimmedDescription === currentDescription) {
      onOpenChange(false);
      return;
    }

    setIsLoading(true);
    try {
      await onSave(trimmedDescription);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update description:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setDescription(currentDescription);
    onOpenChange(false);
  };

  const hasChanges = description.trim() !== currentDescription;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Edit Description
          </DialogTitle>
          <DialogDescription>
            Update the description for your folder.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="folder-description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="folder-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter folder description..."
              className="border-border min-h-[100px] resize-none"
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              {description.length}/500 characters
            </p>
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