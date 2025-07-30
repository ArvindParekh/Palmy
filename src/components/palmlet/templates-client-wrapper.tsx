"use client";

import { useOnboardingTour } from "@/hooks/use-tour";
import { ReactNode } from "react";

interface TemplatesClientWrapperProps {
  children: ReactNode;
}

export function TemplatesClientWrapper({ children }: TemplatesClientWrapperProps) {
  // Initialize tour for this page
  useOnboardingTour();
  
  return <>{children}</>;
}