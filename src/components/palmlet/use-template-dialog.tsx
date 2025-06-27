"use client";

import { useState, useEffect } from "react";
import { Copy, Download, Mail, Eye, Zap, X } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface Template {
  id: string;
  title: string;
  content?: string | null;
  variables: Array<{ variableName: string }>;
}

interface UseTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: Template | null;
}

export function UseTemplateDialog({ open, onOpenChange, template }: UseTemplateDialogProps) {
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [personalizedContent, setPersonalizedContent] = useState("");

  useEffect(() => {
    if (template) {
      // Initialize variables from template data and content
      const contentVariables = template.content?.match(/\{\{([^}]+)\}\}/g)?.map((v: string) => v.slice(2, -2)) || [];
      const dbVariables = template.variables.map(v => v.variableName);
      const allVariables = [...new Set([...contentVariables, ...dbVariables])];
      
      const initialVariables: Record<string, string> = {};
      allVariables.forEach((variable: string) => {
        initialVariables[variable] = "";
      });
      setVariables(initialVariables);
    }
  }, [template]);

  useEffect(() => {
    if (template?.content) {
      let content = template.content;
      Object.entries(variables).forEach(([key, value]) => {
        content = content.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value || `{{${key}}}`);
      });
      setPersonalizedContent(content);
    }
  }, [template, variables]);

  const handleVariableChange = (key: string, value: string) => {
    setVariables((prev) => ({ ...prev, [key]: value }));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(personalizedContent);
      toast.success("Content copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy content");
    }
  };

  const downloadAsText = () => {
    const blob = new Blob([personalizedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template?.title || "template"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openInEmail = () => {
    const subject = encodeURIComponent(template?.title || "Template");
    const body = encodeURIComponent(personalizedContent);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const handleClose = () => {
    setVariables({});
    setPersonalizedContent("");
    onOpenChange(false);
  };

  if (!template) return null;

  const variableKeys = Object.keys(variables);
  const allVariablesFilled = variableKeys.length === 0 || variableKeys.every((key) => variables[key].trim() !== "");

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] w-[90vw] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Zap className="w-5 h-5" />
            Use Template: {template.title}
          </DialogTitle>
          <DialogDescription>
            Fill in the variables below to personalize your template
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden space-y-6">
          {/* Variables Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-foreground">Variables</h3>
              {variableKeys.length > 0 && (
                <span className="text-sm text-muted-foreground">({variableKeys.length})</span>
              )}
            </div>
            
            {variableKeys.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    This template doesn't have any variables to fill.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {variableKeys.map((key) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key} className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                    <Input
                      id={key}
                      value={variables[key]}
                      onChange={(e) => handleVariableChange(key, e.target.value)}
                      placeholder={`Enter ${key.toLowerCase()}...`}
                      className="border-border"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="flex flex-col gap-4 flex-1 overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <h3 className="font-medium text-foreground">Preview</h3>
              </div>
              
              {/* Actions */}
              
            </div>
            
            <Card className="flex-1 overflow-hidden">
              <CardContent className="p-6 h-full overflow-y-auto">
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {personalizedContent.split(/({{.*?}})/).map((part, index) => {
                    const match = part.match(/{{(.*?)}}/);
                    if (match) {
                      return (
                        <span 
                          key={index} 
                          className="bg-orange-500/20 text-orange-700 dark:text-orange-300 px-1 py-0.5 rounded font-medium border border-orange-500/30"
                        >
                          {match[1]}
                        </span>
                      );
                    }
                    return part;
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
                <Button
                  onClick={copyToClipboard}
                  disabled={!allVariablesFilled}
                  size="sm"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </Button>
                <Button
                  variant="outline"
                  onClick={downloadAsText}
                  disabled={!allVariablesFilled}
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  onClick={openInEmail}
                  disabled={!allVariablesFilled}
                  size="sm"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 