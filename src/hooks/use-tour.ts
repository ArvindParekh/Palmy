import { useTour } from '@reactour/tour'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function useOnboardingTour() {
  const { setIsOpen, isOpen, currentStep, setCurrentStep } = useTour()
  const searchParams = useSearchParams()

  // Tour step mappings for different pages
  const tourStepMapping = {
    dashboard: 0,
    templates: 7,  
    lab: 11,       
    community: 15, 
  }

  // Handle tour continuation from URL parameters
  useEffect(() => {
    const tourParam = searchParams.get('tour')
    if (tourParam && tourParam in tourStepMapping) {
      const stepIndex = tourStepMapping[tourParam as keyof typeof tourStepMapping]
      setCurrentStep(stepIndex)
      setIsOpen(true)
      
      // Clean up URL parameter after starting tour
      const url = new URL(window.location.href)
      url.searchParams.delete('tour')
      window.history.replaceState({}, '', url.toString())
    }
  }, [searchParams, setCurrentStep, setIsOpen])

  const startTour = () => {
    setCurrentStep(0)
    setIsOpen(true)
  }

  const stopTour = () => {
    setIsOpen(false)
  }

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }

  return {
    isOpen,
    currentStep,
    startTour,
    stopTour,
    nextStep,
    prevStep,
    tourStepMapping,
  }
} 