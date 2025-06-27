"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FolderOpen } from "lucide-react";
import { TemplateCard } from "./template-card";
import { AddTagsDialog } from "./add-tags-dialog";
import { UseTemplateDialog } from "./use-template-dialog";
import { cn } from "@/lib/utils";
import { deletePalmlet, addTagsToPalmlet } from "@/actions/palmlet";
import { toast } from "sonner";
import { Toaster } from "../ui/sonner";

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

interface TemplateListProps {
  palmlets: Palmlet[];
  filters: {
    searchQuery: string;
    selectedTags: string[];
    sortBy: SortBy;
    sortOrder: SortOrder;
    viewMode: ViewMode;
  };
  folderId: string;
}

export function TemplateList({ palmlets, filters, folderId }: TemplateListProps) {
  const router = useRouter();
  const colorThemes = ['sage', 'lavender', 'cream', 'pearl', 'stone', 'mist'] as const;
  
  // Dialog state
  const [showAddTagsDialog, setShowAddTagsDialog] = useState(false);
  const [showUseTemplateDialog, setShowUseTemplateDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Palmlet | null>(null);

  const filteredAndSortedTemplates = useMemo(() => {
    let filtered = [...palmlets];

    // Filter by search query
    if (filters.searchQuery) {
      filtered = filtered.filter(template => 
        template.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        template.content?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.tagName.toLowerCase().includes(filters.searchQuery.toLowerCase()))
      );
    }

    // Filter by selected tags
    if (filters.selectedTags.length > 0) {
      filtered = filtered.filter(template =>
        template.tags.some(tag => filters.selectedTags.includes(tag.tagName))
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'created':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'updated':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'variables':
          comparison = a.variables.length - b.variables.length;
          break;
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [palmlets, filters]);

  const handleUseTemplate = (id: string) => {
    const template = palmlets.find(p => p.id === id);
    if (template) {
      setSelectedTemplate(template);
      setShowUseTemplateDialog(true);
    }
  };

  const handleEditTemplate = (id: string) => {
    router.push(`/palmlets/editor/${id}`);
  };

  const handleCopyTemplate = (id: string) => {
    // Duplicate template
    console.log('Copy template:', id);
  };

  const handleAddTags = (id: string) => {
    const template = palmlets.find(p => p.id === id);
    if (template) {
      setSelectedTemplate(template);
      setShowAddTagsDialog(true);
    }
  };

  const handleAddTagsToTemplate = async (templateId: string, newTags: string[]) => {
    try {
      const result = await addTagsToPalmlet(templateId, newTags, folderId);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to add tags");
    }
  };

  const handleDeleteTemplate = async (id: string, folderNumber: string) => {
    // Delete template
    console.log('Delete template:', id);
    const result = await deletePalmlet(id, folderNumber); 
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  if (filteredAndSortedTemplates.length === 0) {
    return (
      <EmptyState 
        searchQuery={filters.searchQuery} 
      />
    );
  }

  return (
    <div className="p-8">
      <Toaster />
      <div 
        className={cn(
          "grid gap-6",
          filters.viewMode === 'grid' 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1 max-w-4xl"
        )}
      >
        {filteredAndSortedTemplates.map((template, index) => (
          <TemplateCard
            key={template.id}
            id={template.id}
            title={template.title}
            content={template.content}
            tags={template.tags}
            variables={template.variables}
            createdAt={template.createdAt}
            updatedAt={template.updatedAt}
            colorTheme={colorThemes[index % colorThemes.length]}
            variant={filters.viewMode === 'list' ? 'compact' : 'default'}
            onEdit={handleEditTemplate}
            onCopy={handleCopyTemplate}
            onUse={handleUseTemplate}
            onAddTags={handleAddTags}
            onDelete={handleDeleteTemplate}
            folderId={folderId}
          />
        ))}
      </div>

      {/* Add Tags Dialog */}
      <AddTagsDialog
        open={showAddTagsDialog}
        onOpenChange={setShowAddTagsDialog}
        templateId={selectedTemplate?.id || ""}
        templateTitle={selectedTemplate?.title || ""}
        existingTags={selectedTemplate?.tags || []}
        onSave={handleAddTagsToTemplate}
      />

      {/* Use Template Dialog */}
      <UseTemplateDialog
        open={showUseTemplateDialog}
        onOpenChange={setShowUseTemplateDialog}
        template={selectedTemplate ? {
          id: selectedTemplate.id,
          title: selectedTemplate.title,
          content: selectedTemplate.content,
          variables: selectedTemplate.variables
        } : null}
      />
    </div>
  );
}

function EmptyState({ searchQuery }: { searchQuery?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="p-6 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
        <FolderOpen className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {searchQuery ? 'No templates found' : 'No templates yet'}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {searchQuery 
          ? `No templates match "${searchQuery}". Try adjusting your search or filters.`
          : 'Start building your template collection by creating your first template.'
        }
      </p>
    </div>
  );
} 