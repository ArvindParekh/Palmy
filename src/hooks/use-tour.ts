import { useTour } from '@reactour/tour'

export function useOnboardingTour() {
  const { setIsOpen, isOpen, currentStep, setCurrentStep } = useTour()

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
  }
} 