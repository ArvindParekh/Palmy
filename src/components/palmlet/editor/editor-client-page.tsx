"use client";

import { useState, useRef, useCallback } from "react";
import {
  ArrowLeft,
  Sparkles,
  Wand2,
  Eye,
  Bot,
  FileText,
  BrainCircuit,
  Sidebar,
  X,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AICommandMenu } from "@/components/ai/command-menu";
import { InlineAIToolbar } from "@/components/ai/inline-toolbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Prisma } from "@/generated/prisma";
import { createNewPalmlet, updatePalmlet } from "@/actions/palmlet";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { generatePalmletText } from "@/actions/ai";

// This will be the main editor page.
export default function EditorPage({ id, folderNumber, templateData }: { id: string, folderNumber: string, templateData: Prisma.PalmletGetPayload<{
  include: {
    tags: true,
    variables: true,
  };
}> }) {
  const router = useRouter();

  const [content, setContent] = useState(templateData.content || "");
  const [previewContent, setPreviewContent] = useState(templateData.content || "");
  const [title, setTitle] = useState(templateData.title);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selection, setSelection] = useState<{
    text: string;
    start: number;
    end: number;
  } | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // do not concat the current variables with the template variables
  const variables = [...new Set([...(content?.match(/{{(.*?)}}/g)?.map((v) => v.slice(2, -2)) || [])])];

  const handleGenerate = async (prompt: string) => {
    console.log("Generating with prompt:", prompt);
    setIsGenerating(true);
    
    try {
      const result = await generatePalmletText(prompt, content);
      
      if (result.success) {
        handleContentChange(result.text as string);
        toast.success("Content generated successfully");
      } else {
        toast.error(result.error || "Failed to generate content");
      }
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Failed to generate content');
    } finally {
      setIsGenerating(false);
      setIsCommandMenuOpen(false);
    }
  };

  const handleMouseUp = useCallback(() => {
    if (!editorRef.current) return;

    const textarea = editorRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content?.substring(start, end) || "";

    if (selectedText.trim().length > 0) {
      const rect = textarea.getBoundingClientRect();
      const measureDiv = document.createElement("div");
      const styles = window.getComputedStyle(textarea);
      measureDiv.style.position = "absolute";
      measureDiv.style.visibility = "hidden";
      measureDiv.style.whiteSpace = "pre-wrap";
      measureDiv.style.wordWrap = "break-word";
      measureDiv.style.font = styles.font;
      measureDiv.style.fontSize = styles.fontSize;
      measureDiv.style.fontFamily = styles.fontFamily;
      measureDiv.style.lineHeight = styles.lineHeight;
      measureDiv.style.padding = styles.padding;
      measureDiv.style.border = styles.border;
      measureDiv.style.width = textarea.offsetWidth + "px";
      document.body.appendChild(measureDiv);
      const textBeforeSelection = content?.substring(0, start) || "";
      measureDiv.textContent = textBeforeSelection;
      const selectionSpan = document.createElement("span");
      selectionSpan.textContent = selectedText;
      measureDiv.appendChild(selectionSpan);
      const spanRect = selectionSpan.getBoundingClientRect();
      setToolbarPosition({
        top:
          rect.top + spanRect.top - measureDiv.getBoundingClientRect().top - 45,
        left:
          rect.left +
          spanRect.left -
          measureDiv.getBoundingClientRect().left +
          spanRect.width / 2,
      });
      document.body.removeChild(measureDiv);
      setSelection({
        text: selectedText,
        start,
        end,
      });
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.focus();
          editorRef.current.setSelectionRange(start, end);
        }
      }, 0);
    } else {
      setSelection(null);
    }
  }, [content]);

  const handleAICommand = (command: string) => {
    if (!selection) return;
    console.log(`AI Command: ${command} on text: "${selection.text}"`);
    setSelection(null);
  };

  const handleSave = async () => {
    console.log("Saving template:", title, content);

    if (title === templateData.title && content === templateData.content) {
      toast.info("No changes to save");
      return;
    }

    if (id === "") {
      const result = await createNewPalmlet(folderNumber, title, content || "", templateData.tags.map((t) => t.tagName), variables);
      if (result.success) {
        toast.success("Template created successfully");
        router.push(`/palmlets/${folderNumber}/editor/${result.data?.id}`);
      } else {
        toast.error("Failed to save template");
      }
    } else {
      const result = await updatePalmlet(id, title, content || "", templateData.tags.map((t) => t.tagName), variables, folderNumber);
      if (result.success) {
        toast.success("Template saved successfully");
      } else {
        toast.error("Failed to save template");
      }
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    setPreviewContent(value);
  };


  return (
    <TooltipProvider>
      <Toaster />
      <div className="flex flex-col h-screen w-full bg-background text-foreground">
        {selection && (
          <InlineAIToolbar
            position={toolbarPosition}
            onCommand={handleAICommand}
          />
        )}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <Link href={`/palmlets/${folderNumber}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Back to Folder</p>
                </TooltipContent>
              </Tooltip>
            </Link>
            <div className="min-w-0 flex-1">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-base sm:text-lg font-semibold border-none focus-visible:ring-0 px-2 h-10 bg-transparent max-w-md"
                placeholder="My Awesome Template"
              />
              <p className="text-xs sm:text-sm text-muted-foreground px-2">
                Last saved {formatDistanceToNow(templateData.updatedAt)} ago
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Sidebar className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground">
              Share
            </Button>
            <Button onClick={handleSave} size="sm" className="bg-foreground text-background hover:bg-foreground/90 shadow-lg hover:scale-105 transition-all duration-300">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Save</span>
            </Button>
          </div>
        </header>

        <div className="flex-1 flex min-h-0 relative">
          <div className="flex-1 flex flex-col p-4 md:p-8">
            <div className="relative flex-1">
              <Textarea
                ref={editorRef}
                value={content || ""}
                onChange={(e) => handleContentChange(e.target.value)}
                onMouseUp={handleMouseUp}
                onKeyUp={handleMouseUp}
                className="absolute inset-0 w-full h-full text-sm md:text-base lg:text-base font-mono text-foreground/90 font-medium bg-transparent border-0 resize-none focus-visible:ring-0 p-0 leading-relaxed tracking-wide"
                placeholder="Start typing your template here... use {{variables}} for personalization."
              />
            </div>
            <div className="absolute bottom-4 right-1/3 bg-background/80 backdrop-blur-sm text-muted-foreground text-xs px-2 py-1 rounded border border-border pointer-events-none select-none">
              {(content ?? "").length} characters, {content?.split(/\s+/).filter(word => word.length > 0).length} words
            </div>
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden md:flex w-[400px] bg-background border-l border-border flex-col">
            <Tabs defaultValue="preview" className="flex-1 flex flex-col">
              <div className="p-4 border-b border-border">
                <TabsList className="grid w-full grid-cols-3 bg-muted">
                  <TabsTrigger value="preview">
                    <Eye className="w-4 h-4 mr-2" /> Preview
                  </TabsTrigger>
                  <TabsTrigger value="variables">
                    <FileText className="w-4 h-4 mr-2" /> Variables
                  </TabsTrigger>
                  <TabsTrigger value="ai">
                    <BrainCircuit className="w-4 h-4 mr-2" /> AI
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="preview" className="flex-1 overflow-y-auto p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">
                  Live Preview
                </h3>
                <Card className="flex-1 bg-card border-border">
                  <CardContent className="p-4 text-base whitespace-pre-wrap text-foreground">
                    {previewContent?.split(/({{.*?}})/).map((part, index) => {
                      const match = part.match(/{{(.*?)}}/);
                      if (match) {
                        return <span key={index} className="bg-orange-500 text-foreground p-0.5 rounded-sm shadow-sm">{match[1]}</span>;
                      }
                      return part;
                    }) || (
                      <span className="text-muted-foreground">
                        Preview will appear here.
                      </span>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent
                value="variables"
                className="flex-1 overflow-y-auto p-6"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Variables
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Variables are dynamic placeholders. Use {"{{name}}"} to
                    create one.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {variables.length > 0 ? (
                      variables.map((v, i) => (
                        <Badge key={i} variant="secondary">
                          {v}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No variables found.
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="ai" className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Bot className="w-6 h-6 text-blue-500" />
                    <h3 className="text-lg font-semibold text-foreground">
                      AI Assistant
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Generate, rewrite, or improve your template with AI.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsCommandMenuOpen(true)}
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate with AI...
                  </Button>
                  <p className="text-xs text-center text-muted-foreground pt-4">
                    Select text in the editor to get contextual AI actions.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </aside>

          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsSidebarOpen(false)}>
              <aside className="absolute right-0 top-0 h-full w-[90vw] max-w-sm bg-background border-l border-border flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h2 className="font-semibold">Editor Tools</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <Tabs defaultValue="preview" className="flex-1 flex flex-col">
                  <div className="p-4 border-b border-border">
                    <TabsList className="grid w-full grid-cols-3 bg-muted text-xs">
                      <TabsTrigger value="preview" className="text-xs">
                        <Eye className="w-3 h-3 mr-1" /> 
                        <span className="hidden sm:inline">Preview</span>
                      </TabsTrigger>
                      <TabsTrigger value="variables" className="text-xs">
                        <FileText className="w-3 h-3 mr-1" /> 
                        <span className="hidden sm:inline">Variables</span>
                      </TabsTrigger>
                      <TabsTrigger value="ai" className="text-xs">
                        <BrainCircuit className="w-3 h-3 mr-1" /> 
                        <span className="hidden sm:inline">AI</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="preview" className="flex-1 overflow-y-auto p-4">
                    <h3 className="text-base font-semibold mb-4 text-foreground">
                      Live Preview
                    </h3>
                    <Card className="flex-1 bg-card border-border">
                      <CardContent className="p-3 text-sm whitespace-pre-wrap text-foreground">
                        {previewContent?.split(/({{.*?}})/).map((part, index) => {
                          const match = part.match(/{{(.*?)}}/);
                          if (match) {
                            return <span key={index} className="bg-orange-500 text-foreground p-0.5 rounded-sm shadow-sm">{match[1]}</span>;
                          }
                          return part;
                        }) || (
                          <span className="text-muted-foreground">
                            Preview will appear here.
                          </span>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent
                    value="variables"
                    className="flex-1 overflow-y-auto p-4"
                  >
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-foreground">
                        Variables
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Variables are dynamic placeholders. Use {"{{name}}"} to
                        create one.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {variables.length > 0 ? (
                          variables.map((v, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {v}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            No variables found.
                          </p>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="ai" className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Bot className="w-5 h-5 text-blue-500" />
                        <h3 className="text-base font-semibold text-foreground">
                          AI Assistant
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Generate, rewrite, or improve your template with AI.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start border-border hover:bg-accent hover:text-accent-foreground"
                        onClick={() => setIsCommandMenuOpen(true)}
                      >
                        <Wand2 className="w-3 h-3 mr-2" />
                        Generate with AI...
                      </Button>
                      <p className="text-xs text-center text-muted-foreground pt-4">
                        Select text in the editor to get contextual AI actions.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </aside>
            </div>
          )}
        </div>
        <AICommandMenu
          open={isCommandMenuOpen}
          onOpenChange={setIsCommandMenuOpen}
          onGenerate={handleGenerate}
          loading={isGenerating}
        />
      </div>
    </TooltipProvider>
  );
} 