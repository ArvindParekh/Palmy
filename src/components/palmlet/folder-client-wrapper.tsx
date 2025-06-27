"use client";

import { useState } from "react";
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
}

export function FolderClientWrapper({ palmlets, folderName, folderNumber }: FolderClientWrapperProps) {
  const [filters, setFilters] = useState({
    searchQuery: "",
    selectedTags: [] as string[],
    sortBy: 'updated' as SortBy,
    sortOrder: 'desc' as SortOrder,
    viewMode: 'grid' as ViewMode,
  });

  // Extract all unique tags from palmlets
  const allTags = Array.from(
    new Set(palmlets.flatMap(p => p.tags.map(tag => tag.tagName)))
  ).map(tagName => ({ tagName }));

  const handleFiltersChange = (newFilters: {
    searchQuery: string;
    selectedTags: string[];
    sortBy: SortBy;
    sortOrder: SortOrder;
    viewMode: ViewMode;
  }) => {
    setFilters(newFilters);
  };

  return (
    <>
      <FolderControls
        allTags={allTags}
        folderName={folderName}
        folderNumber={folderNumber}
        onFiltersChange={handleFiltersChange}
      />
      <TemplateList
        palmlets={palmlets}
        filters={filters}
      />
    </>
  );
} 