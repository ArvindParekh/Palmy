"use client"

import { useState } from "react"
import { LandingPage } from "@/components/landing-page"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Header } from "@/components/header"
// import { Dashboard } from "@/components/dashboard"
// import { TemplateLibrary } from "@/components/template-library"
// import { TemplateEditor } from "@/components/template-editor"
// import { CommunityTemplates } from "@/components/community-templates"
// import { TemplateLab } from "@/components/template-lab"
// import { Leaderboard } from "@/components/leaderboard"
import { PersonalizationModal } from "@/components/personalization-modal"

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentView, setCurrentView] = useState("dashboard")
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

  if (!isLoggedIn) {
    return <LandingPage onLogin={() => setIsLoggedIn(true)} />
  }

//   const renderView = () => {
//     switch (currentView) {
//       case "dashboard":
//         return <Dashboard onNavigate={setCurrentView} onUseTemplate={setSelectedTemplate} />
//       case "templates":
//         return <TemplateLibrary onNavigate={setCurrentView} onUseTemplate={setSelectedTemplate} />
//       case "editor":
//         return <TemplateEditor onNavigate={setCurrentView} />
//       case "community":
//         return <CommunityTemplates onNavigate={setCurrentView} onUseTemplate={setSelectedTemplate} />
//       case "lab":
//         return <TemplateLab onNavigate={setCurrentView} />
//       case "leaderboard":
//         return <Leaderboard onNavigate={setCurrentView} />
//       default:
//         return <Dashboard onNavigate={setCurrentView} onUseTemplate={setSelectedTemplate} />
//     }
//   }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-white dark:bg-black">
        <AppSidebar currentView={currentView} onNavigate={setCurrentView} />
        <SidebarInset className="flex-1">
          <Header />
          {/* <main className="flex-1 p-8 max-w-7xl mx-auto w-full">{renderView()}</main> */}
        </SidebarInset>

        <PersonalizationModal template={selectedTemplate} onClose={() => setSelectedTemplate(null)} />
      </div>
    </SidebarProvider>
  )
}
