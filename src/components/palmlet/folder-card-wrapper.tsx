"use client";

import { useState } from "react";
import { PalmletFolderCard, PalmletFolderCardProps } from "./palmlet-folder-card";
import { RenameFolderDialog, EditDescriptionDialog, DeleteFolderDialog } from "./folder-dialogs";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { deletePalmletFolder, updatePalmletFolder } from "@/actions/palmlet-folder";

interface FolderCardWrapperProps {
  folderId: string;
  title: string;
  description: string;
  palmletCount: number;
  colorTheme?: "sage" | "lavender" | "cream" | "pearl" | "stone" | "mist";
  icon?: React.ReactNode;
  url: string;
  userId: string;
  // onRename?: (folderId: string, newName: string) => Promise<void>;
  // onEditDescription?: (folderId: string, newDescription: string) => Promise<void>;
}

export function FolderCardWrapper({
  folderId,
  title,
  description,
  palmletCount,
  colorTheme,
  icon,
  url,
  userId,
  // onRename,
  // onEditDescription,
}: FolderCardWrapperProps) {
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showEditDescriptionDialog, setShowEditDescriptionDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const handleRename = () => {
    setShowRenameDialog(true);
  };

  const handleEditDescription = () => {
    setShowEditDescriptionDialog(true);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleRenameFolder = async (newName: string) => {
    // if (onRename) {
    //   await onRename(folderId, newName);
    // }
    if (newName === title) {
      toast.error("New name cannot be the same as the current name");
      return;
    }
    const response = await updatePalmletFolder({
      folderId,
      folderName: newName,
      folderDescription: description,
    });
    if (response.success) {
      toast.success("Folder renamed successfully");
    } else {
      toast.error("Failed to rename folder");
    }
  };

  const handleUpdateDescription = async (newDescription: string) => {
    // if (onEditDescription) {
    //   await onEditDescription(folderId, newDescription);
    // }
    if (newDescription === description) {
      toast.error("New description cannot be the same as the current description");
      return;
    }
    const response = await updatePalmletFolder({
      folderId,
      folderName: title,
      folderDescription: newDescription,
    });
    if (response.success) {
      toast.success("Folder description updated successfully");
    } else {
      toast.error("Failed to update folder description");
    }
  };

  const handleDeleteFolder = async () => {
    const response = await deletePalmletFolder(folderId);
    if (response.success) {
      toast.success("Folder deleted successfully");
    } else {
      toast.error("Failed to delete folder");
    }
  };

  return (
    <>
      <PalmletFolderCard
        title={title}
        description={description}
        palmletCount={palmletCount}
        colorTheme={colorTheme}
        icon={icon}
        url={url}
        onRename={handleRename}
        onEditDescription={handleEditDescription}
        onDelete={handleDelete}
      />

      {/* Rename Dialog */}
      <RenameFolderDialog
        open={showRenameDialog}
        onOpenChange={setShowRenameDialog}
        currentName={title}
        onSave={handleRenameFolder}
      />

      {/* Edit Description Dialog */}
      <EditDescriptionDialog
        open={showEditDescriptionDialog}
        onOpenChange={setShowEditDescriptionDialog}
        currentDescription={description}
        onSave={handleUpdateDescription}
      />

      <DeleteFolderDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onDelete={handleDeleteFolder}
      />
    </>
  );
} 