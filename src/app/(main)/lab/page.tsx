'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import { Sparkles, Plus, Save, Copy, Check, Mail, MessageSquare, FileText, Users, Loader2, ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TemplateData {
  content: string
  variables: string[]
  title: string
  category: string
}

interface TemplateExample {
  icon: React.ElementType
  title: string
  description: string
  prompt: string
}

export default function LabPage() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTemplate, setGeneratedTemplate] = useState<TemplateData | null>(null)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [saveFolder, setSaveFolder] = useState('')
  const [newFolderName, setNewFolderName] = useState('')
  const [isCreatingNewFolder, setIsCreatingNewFolder] = useState(false)
  const [copied, setCopied] = useState(false)

  const templateExamples: TemplateExample[] = [
    {
      icon: Mail,
      title: 'Cold Email',
      description: 'Reach out to potential clients or partners',
      prompt: 'Create a professional cold email template for reaching out to potential business partners about collaboration opportunities'
    },
    {
      icon: MessageSquare,
      title: 'LinkedIn Outreach',
      description: 'Connect with professionals on LinkedIn',
      prompt: 'Generate a LinkedIn connection request template for networking with people in the tech industry'
    },
    {
      icon: FileText,
      title: 'Cover Letter',
      description: 'Apply for job positions effectively',
      prompt: 'Create a cover letter template for applying to software engineering positions at startups'
    },
    // {
    //   icon: Users,
    //   title: 'Follow-up',
    //   description: 'Follow up after meetings or interviews',
    //   prompt: 'Write a follow-up email template to send after a job interview to express continued interest'
    // }
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const mockTemplate: TemplateData = {
      title: generateTemplateTitle(prompt),
      category: 'Cold Email',
      content: `Subject: Quick question about {{Company}}'s {{Recent_News}}

Hi {{First_Name}},

I hope this message finds you well. I came across {{Company}} and was impressed by {{Recent_News}}.

I'm {{Your_Name}} from {{Your_Company}}, and we specialize in {{Your_Service}}. I noticed that {{Company}} might benefit from {{Specific_Benefit}}.

Would you be open to a brief 15-minute call to discuss how we could help {{Company}} achieve {{Specific_Goal}}?

Best regards,
{{Your_Name}}
{{Your_Title}}
{{Your_Company}}`,
      variables: ['Company', 'Recent_News', 'First_Name', 'Your_Name', 'Your_Company', 'Your_Service', 'Specific_Benefit', 'Specific_Goal', 'Your_Title']
    }
    
    setGeneratedTemplate(mockTemplate)
    setIsGenerating(false)
  }

  const generateTemplateTitle = (prompt: string) => {
    if (prompt.toLowerCase().includes('cold email')) return 'Cold Email Template'
    if (prompt.toLowerCase().includes('linkedin')) return 'LinkedIn Outreach Template'
    if (prompt.toLowerCase().includes('cover letter')) return 'Cover Letter Template'
    if (prompt.toLowerCase().includes('follow')) return 'Follow-up Template'
    return 'Custom Template'
  }

  const handleCopy = () => {
    if (generatedTemplate) {
      navigator.clipboard.writeText(generatedTemplate.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving template:', generatedTemplate)
    console.log('To folder:', saveFolder || newFolderName)
    setShowSaveDialog(false)
    setPrompt('')
    setGeneratedTemplate(null)
  }

  const handleExampleClick = (example: TemplateExample) => {
    setPrompt(example.prompt)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleGenerate()
    }
  }

  return (
    <div className="h-full bg-background flex flex-col items-center justify-center font-inter">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Prompts to templates in{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              seconds
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Describe the template you need and let us do the rest.
          </p>
        </div>

        {/* Main Input */}
        <div className="mb-12">
          <div className="relative">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe the template you want to create..."
              className="text-lg h-14 pr-32 rounded-2xl bg-accent/50 border py-7"
              disabled={isGenerating}
            />
            <Button
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className="absolute right-2 top-2 h-10 px-6 rounded-xl"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <ArrowUpRight className="w-4 h-4" />
                  {/* Generate */}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Template Examples */}
        {!generatedTemplate && (
          <div className="mb-12">
            {/* <h2 className="text-lg font-semibold mb-6 text-center">Or try one of these:</h2> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templateExamples.map((example, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-lg hover:shadow-white/30 transition-shadow border-2 hover:border-blue-200"
                  onClick={() => handleExampleClick(example)}
                >
                  <CardHeader className="">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <example.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <CardTitle className="text-sm">{example.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="">
                    <p className="text-sm text-muted-foreground">{example.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Generated Template */}
        {generatedTemplate && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    {generatedTemplate.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {generatedTemplate.variables.length} variables detected
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Save to Library
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Save Template</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Choose existing folder or create new one
                          </label>
                          <div className="flex items-center gap-2 mb-3">
                            <Button
                              variant={!isCreatingNewFolder ? "default" : "outline"}
                              size="sm"
                              onClick={() => setIsCreatingNewFolder(false)}
                            >
                              Existing Folder
                            </Button>
                            <Button
                              variant={isCreatingNewFolder ? "default" : "outline"}
                              size="sm"
                              onClick={() => setIsCreatingNewFolder(true)}
                            >
                              New Folder
                            </Button>
                          </div>
                          
                          {isCreatingNewFolder ? (
                            <Input
                              value={newFolderName}
                              onChange={(e) => setNewFolderName(e.target.value)}
                              placeholder="Enter folder name..."
                            />
                          ) : (
                            <div className="space-y-2">
                              <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => setSaveFolder('cold-emails')}
                              >
                                📧 Cold Emails
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => setSaveFolder('linkedin')}
                              >
                                💼 LinkedIn Messages
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => setSaveFolder('cover-letters')}
                              >
                                📄 Cover Letters
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSave}
                            disabled={!saveFolder && !newFolderName}
                            className="flex-1"
                          >
                            Save Template
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setShowSaveDialog(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 mb-4">
                <div className="text-sm whitespace-pre-wrap font-mono">
                  {generatedTemplate.content.split(/(\{\{[^}]+\}\})/g).map((part, index) => 
                    part.startsWith('{{') && part.endsWith('}}') ? (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md font-medium">
                        {part}
                      </span>
                    ) : (
                      <span key={index}>{part}</span>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">Variables</h3>
                <div className="flex flex-wrap gap-2">
                  {generatedTemplate.variables.map((variable, index) => (
                    <Badge key={index} variant="secondary">
                      {variable}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        {generatedTemplate && (
          <div className="flex justify-center">
            <Button
              onClick={() => {
                setPrompt('')
                setGeneratedTemplate(null)
              }}
              variant="outline"
              size="lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Another Template
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
