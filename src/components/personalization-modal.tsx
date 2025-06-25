"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Download, Mail } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface PersonalizationModalProps {
  template: any
  onClose: () => void
}

export function PersonalizationModal({ template, onClose }: PersonalizationModalProps) {
  const [variables, setVariables] = useState<Record<string, string>>({})
  const [personalizedContent, setPersonalizedContent] = useState("")

  useEffect(() => {
    if (template) {
      // Extract variables from template content
      const detectedVariables = template.content?.match(/\{\{([^}]+)\}\}/g)?.map((v: string) => v.slice(2, -2)) || []
      const initialVariables: Record<string, string> = {}
      detectedVariables.forEach((variable: string) => {
        initialVariables[variable] = ""
      })
      setVariables(initialVariables)
    }
  }, [template])

  useEffect(() => {
    if (template?.content) {
      let content = template.content
      Object.entries(variables).forEach(([key, value]) => {
        content = content.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value || `{{${key}}}`)
      })
      setPersonalizedContent(content)
    }
  }, [template, variables])

  const handleVariableChange = (key: string, value: string) => {
    setVariables((prev) => ({ ...prev, [key]: value }))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(personalizedContent)
    // You could add a toast notification here
  }

  const downloadAsText = () => {
    const blob = new Blob([personalizedContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${template?.title || "template"}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const openInEmail = () => {
    const subject = encodeURIComponent(
      `Application for ${variables.Role || "Position"} at ${variables.Company || "Company"}`,
    )
    const body = encodeURIComponent(personalizedContent)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  if (!template) return null

  const variableKeys = Object.keys(variables)
  const allVariablesFilled = variableKeys.every((key) => variables[key].trim() !== "")

  return (
    <Dialog open={!!template} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{template.title}</DialogTitle>
          <DialogDescription>Fill in the variables below to personalize your template</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden">
          {/* Variables Form */}
          <div className="space-y-4 overflow-y-auto">
            <div className="space-y-3">
              <h3 className="font-medium text-neutral-900 dark:text-white">Variables</h3>
              {variableKeys.map((key) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="text-sm font-medium">
                    {key}
                  </Label>
                  <Input
                    id={key}
                    value={variables[key]}
                    onChange={(e) => handleVariableChange(key, e.target.value)}
                    placeholder={`Enter ${key.toLowerCase()}...`}
                    className="border-neutral-200 dark:border-neutral-800"
                  />
                </div>
              ))}
            </div>

            {/* Template Info */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                  {template.successRate && (
                    <span className="text-xs text-green-600 dark:text-green-400">
                      {template.successRate}% success rate
                    </span>
                  )}
                </div>
                {template.author && (
                  <p className="text-xs text-neutral-500">Created by {template.author.name || template.author}</p>
                )}
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="space-y-4 overflow-hidden flex flex-col">
            <h3 className="font-medium text-neutral-900 dark:text-white">Preview</h3>
            <div className="flex-1 overflow-y-auto">
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4 border border-neutral-200 dark:border-neutral-800">
                <div className="whitespace-pre-wrap text-sm text-neutral-700 dark:text-neutral-300">
                  {personalizedContent}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <Button
                onClick={copyToClipboard}
                disabled={!allVariablesFilled}
                className="flex-1 bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-black"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button
                variant="outline"
                onClick={downloadAsText}
                disabled={!allVariablesFilled}
                className="border-neutral-200 dark:border-neutral-800"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                onClick={openInEmail}
                disabled={!allVariablesFilled}
                className="border-neutral-200 dark:border-neutral-800"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
