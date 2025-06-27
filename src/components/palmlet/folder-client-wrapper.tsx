"use client";

import { useState, useMemo } from "react";
import { FolderControls } from "./folder-controls";
import { TemplateList } from "./template-list";

type ViewMode = 'grid' | 'list';
type SortBy = 'updated' | 'created' | 'title' | 'variables';
type SortOrder = 'asc' | 'desc';

interface Palmlet {
  id: string;
  title: string;
  content?: string | null;
  tags: Array<{ tagName: string }>;
  variables: Array<{ variableName: string }>;
  createdAt: Date;
  updatedAt: Date;
}

interface FolderClientWrapperProps {
  palmlets: Palmlet[];
  folderName: string;
  folderNumber: string;
  folderId: string;
}

export function FolderClientWrapper({ 
  palmlets, 
  folderName, 
  folderNumber, 
  folderId 
}: FolderClientWrapperProps) {
  const [filters, setFilters] = useState({
    searchQuery: "",
    selectedTags: [] as string[],
    sortBy: 'updated' as SortBy,
    sortOrder: 'desc' as SortOrder,
    viewMode: 'grid' as ViewMode,
  });

  // Get all unique tags from palmlets
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    palmlets.forEach(palmlet => {
      palmlet.tags.forEach(tag => tagSet.add(tag.tagName));
    });
    return Array.from(tagSet).map(tagName => ({ tagName }));
  }, [palmlets]);

  return (
    <div className="w-full">
      <FolderControls
        allTags={allTags}
        folderName={folderName}
        folderNumber={folderNumber}
        onFiltersChange={setFilters}
      />
      
      <TemplateList
        palmlets={palmlets}
        filters={filters}
        folderId={folderId}
      />
    </div>
  );
} 