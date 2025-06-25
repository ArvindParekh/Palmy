"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { PersonalizationModal } from "@/components/personalization-modal";
import { useState } from "react";

export default function MainLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const [currentView, setCurrentView] = useState("dashboard");
   const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

   //TODO: auth check

   return (
      <SidebarProvider defaultOpen={true}>
         <div className='flex min-h-screen bg-white dark:bg-black'>
            <AppSidebar currentView={currentView} onNavigate={setCurrentView} />
            <SidebarInset className='flex-1'>
               <Header />
               <main className="flex-1 p-8 max-w-7xl mx-auto w-full">{children}</main>
            </SidebarInset>

            <PersonalizationModal
               template={selectedTemplate}
               onClose={() => setSelectedTemplate(null)}
            />
         </div>
      </SidebarProvider>
   );
}
