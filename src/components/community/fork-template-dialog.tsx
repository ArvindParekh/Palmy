"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderPlus, Folder } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { Prisma } from "@/generated/prisma/client";

interface ForkTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: {
    id: string;
    title: string;
    content: string;
    tags: string[];
    variables: string[];
  };
  userFolders: Prisma.Palmlet_FolderGetPayload<{
    include: {
      palmlets: true;
    };
  }>[];
  onFork: (folderId: string, templateData: any) => Promise<void>;
}

export function ForkTemplateDialog({ 
  open, 
  onOpenChange, 
  template, 
  userFolders, 
  onFork 
}: ForkTemplateDialogProps) {
  const [activeTab, setActiveTab] = useState("existing");
  const [selectedFolderId, setSelectedFolderId] = useState<string>("");
  const [newFolderName, setNewFolderName] = useState("");
  const [customTitle, setCustomTitle] = useState(template.title);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setActiveTab("existing");
    setSelectedFolderId("");
    setNewFolderName("");
    setCustomTitle(template.title);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm();
    }
    onOpenChange(isOpen);
  };

  const handleFork = async () => {
    if (activeTab === "existing" && !selectedFolderId) {
      toast.error("Please select a folder");
      return;
    }

    if (activeTab === "new" && !newFolderName.trim()) {
      toast.error("Please enter a folder name");
      return;
    }

    if (!customTitle.trim()) {
      toast.error("Please enter a template title");
      return;
    }

    setIsLoading(true);
    try {
      const templateData = {
        title: customTitle,
        content: template.content,
        tags: template.tags,
        variables: template.variables,
      };

      if (activeTab === "existing") {
        await onFork(selectedFolderId, templateData);
      } else {
        // For new folder, we'll need to create the folder first
        // This would require an additional API call
        await onFork("new", { ...templateData, folderName: newFolderName });
      }

      toast.success("Template forked successfully!");
      handleOpenChange(false);
    } catch (error) {
      toast.error("Failed to fork template");
      console.error("Fork error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Fork Template</DialogTitle>
          <DialogDescription>
            Choose where to save "{template.title}" in your workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template-title">Template Title</Label>
            <Input
              id="template-title"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Enter template title"
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="existing" className="flex items-center gap-2">
                <Folder className="w-4 h-4" />
                Existing Folder
              </TabsTrigger>
              <TabsTrigger value="new" className="flex items-center gap-2">
                <FolderPlus className="w-4 h-4" />
                New Folder
              </TabsTrigger>
            </TabsList>

            <TabsContent value="existing" className="space-y-4">
              <div className="space-y-2">
                <Label>Select Folder</Label>
                <Select value={selectedFolderId} onValueChange={setSelectedFolderId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a folder..." />
                  </SelectTrigger>
                  <SelectContent>
                    {userFolders.map((folder) => (
                      <SelectItem key={folder.id} value={folder.id}>
                        {folder.folderName} ({folder.palmlets.length} templates)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="new" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="folder-name">New Folder Name</Label>
                <Input
                  id="folder-name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter folder name"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleFork}
            disabled={isLoading}
          >
            {isLoading ? "Forking..." : "Fork Template"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 