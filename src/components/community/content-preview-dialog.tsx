"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, X } from "lucide-react";
import { toast } from "sonner";
import { useMemo } from "react";

interface ContentPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: string;
  variables: string[];
}

export function ContentPreviewDialog({ open, onOpenChange, title, content, variables }: ContentPreviewDialogProps) {
  const highlightedContent = useMemo(() => {
    let highlighted = content;
    
    // Replace variables with highlighted spans
    variables.forEach((variable) => {
      const regex = new RegExp(`\\{\\{${variable}\\}\\}`, 'gi');
      highlighted = highlighted.replace(regex, `<span class="bg-primary/20 text-primary px-1 py-0.5 rounded font-semibold">{{${variable}}}</span>`);
    });
    
    return highlighted;
  }, [content, variables]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast.success("Content copied to clipboard!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <span>{title}</span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>
            Template content with variables highlighted. Click copy to use this template.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-y-auto min-h-0">
          <div className="bg-muted/50 border rounded-lg p-4 max-h-96 overflow-y-auto">
            <div 
              className="whitespace-pre-wrap text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: highlightedContent }}
            />
          </div>
          
          {variables.length > 0 && (
            <div className="space-y-2 flex-shrink-0">
              <h4 className="font-semibold text-sm">Variables in this template:</h4>
              <div className="flex flex-wrap gap-2">
                {variables.map((variable) => (
                  <Badge key={variable} variant="outline" className="bg-primary/10 text-primary">
                    {variable}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 