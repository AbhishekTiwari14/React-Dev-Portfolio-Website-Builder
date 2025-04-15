import { useSelector } from "react-redux"
import { cn } from "@/lib/utils"
import { RootState } from "@/utils/store"

export function FormProgress() {
  const currentStep = useSelector(
    (state: RootState) => state.userData.currentStep
  )

  const steps = [
    { label: "Personal Info", step: 0 },
    { label: "Social Media Links", step: 1 },
    { label: "Experience Info", step: 2 },
    { label: "Projects Info", step: 3 },
    { label: "Generate Portfolio", step: 4 },
  ]

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-center items-center gap-3">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-center">
            <div
              className={cn(
                "w-4 h-4 rounded-full transition-all duration-200",
                currentStep === index
                  ? "bg-primary w-5 h-5"
                  : currentStep > index
                  ? "bg-primary/80"
                  : "bg-gray-300",
                "relative group"
              )}
            >
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {step.label}
                </span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-12 h-[2px] mx-1",
                  currentStep > index ? "bg-primary/80" : "bg-gray-200"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
