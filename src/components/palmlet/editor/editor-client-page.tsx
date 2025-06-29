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
    setIsCommandMenuOpen(false);
    
    try {
      const result = await generatePalmletText(prompt, content);
      
      if (result.success) {
        setContent(content + '\n\n' + result.text);
        toast.success("Content generated successfully");
      } else {
        toast.error(result.error || "Failed to generate content");
      }
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error('Failed to generate content');
    } finally {
      setIsGenerating(false);
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
        <header className="flex items-center justify-between p-4 border-b border-border shrink-0">
          <div className="flex items-center gap-4">
            <Link href={`/palmlets/${folderNumber}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Back to Folder</p>
                </TooltipContent>
              </Tooltip>
            </Link>
            <div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-semibold border-none focus-visible:ring-0 p-0 h-auto bg-transparent"
                placeholder="My Awesome Template"
              />
              <p className="text-sm text-muted-foreground">
                Last saved {formatDistanceToNow(templateData.updatedAt)} ago
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground">Share</Button>
            <Button onClick={handleSave} className="bg-foreground text-background hover:bg-foreground/90 shadow-lg hover:scale-105 transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </header>

        <div className="flex-1 flex min-h-0">
          <div className="flex-1 flex flex-col p-8">
            <div className="relative flex-1">
              <Textarea
                ref={editorRef}
                value={content || ""}
                onChange={(e) => handleContentChange(e.target.value)}
                onMouseUp={handleMouseUp}
                onKeyUp={handleMouseUp}
                className="absolute inset-0 w-full h-full text-lg bg-transparent border-0 resize-none focus-visible:ring-0 p-0 font-mono leading-relaxed tracking-wide"
                placeholder="Start typing your template here... use {{variables}} for personalization."
              />
            </div>
          </div>

          <aside className="w-[400px] bg-background border-l border-border flex flex-col">
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
                    {/* all variables should be highlighted with a span with the class text-orange-500 */}
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