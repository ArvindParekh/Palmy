import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Eye, FileText, BrainCircuit, Sidebar, Bot, Sparkles } from "lucide-react";

export default function NewEditorLoading() {
  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b border-border shrink-0">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          <Button variant="ghost" size="icon" className="shrink-0" disabled>
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <Skeleton className="h-6 sm:h-7 w-32 mb-1" />
            <Skeleton className="h-3 sm:h-4 w-24" />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Button variant="outline" size="icon" className="md:hidden" disabled>
            <Sidebar className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex" disabled>
            <Skeleton className="h-4 w-12" />
          </Button>
          <Button size="sm" className="bg-foreground text-background" disabled>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Save</span>
          </Button>
        </div>
      </header>

      <div className="flex-1 flex min-h-0 relative">
        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col p-4 md:p-8">
          <div className="relative flex-1">
            <div className="absolute inset-0 w-full h-full bg-transparent border-0 p-0 font-mono leading-relaxed tracking-wide flex items-center justify-center">
              <div className="text-center opacity-50">
                <Skeleton className="h-6 w-64 mx-auto mb-4" />
                <Skeleton className="h-4 w-48 mx-auto" />
              </div>
            </div>
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
            
            {/* Preview Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <Skeleton className="h-6 w-24 mb-4" />
              <Card className="flex-1 bg-card border-border">
                <CardContent className="p-4 flex items-center justify-center min-h-[200px]">
                  <Skeleton className="h-4 w-40" />
                </CardContent>
              </Card>
            </div>
          </Tabs>
        </aside>
      </div>
    </div>
  );
} 