import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

export interface StepperStep {
  title: string;
  description?: string;
  status?: "pending" | "current" | "completed" | "error";
  optional?: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep?: number;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "numbered" | "dots";
  size?: "sm" | "md" | "lg";
  className?: string;
  onStepClick?: (stepIndex: number) => void;
}

function LibraryStepper({
  steps,
  currentStep = 0,
  orientation = "horizontal",
  variant = "default",
  size = "md",
  className,
  onStepClick,
}: StepperProps) {
  const isHorizontal = orientation === "horizontal";

  const getStepStatus = (index: number, step: StepperStep) => {
    if (step.status) return step.status;
    if (index < currentStep) return "completed";
    if (index === currentStep) return "current";
    return "pending";
  };

  const getStepClasses = (status: string) => {
    const baseClasses = {
      sm: "w-6 h-6 text-xs",
      md: "w-8 h-8 text-sm",
      lg: "w-10 h-10 text-base",
    };

    const statusClasses = {
      pending: "bg-gray-100 border-gray-300 text-gray-500",
      current: "bg-blue-600 border-blue-600 text-white",
      completed: "bg-green-600 border-green-600 text-white",
      error: "bg-red-600 border-red-600 text-white",
    };

    return cn(
      "flex items-center justify-center rounded-full border-2 font-medium transition-all",
      baseClasses[size],
      statusClasses[status as keyof typeof statusClasses],
      onStepClick && status !== "pending" && "cursor-pointer hover:scale-105"
    );
  };

  const renderStepIcon = (index: number, status: string) => {
    if (variant === "dots") {
      return (
        <div className={cn(
          "rounded-full transition-all",
          size === "sm" ? "w-3 h-3" : size === "md" ? "w-4 h-4" : "w-5 h-5",
          {
            "bg-gray-300": status === "pending",
            "bg-blue-600": status === "current",
            "bg-green-600": status === "completed",
            "bg-red-600": status === "error",
          }
        )} />
      );
    }

    if (status === "completed") {
      return <Check className="w-4 h-4" />;
    }

    if (status === "error") {
      return <X className="w-4 h-4" />;
    }

    if (variant === "numbered") {
      return <span>{index + 1}</span>;
    }

    return <span>{index + 1}</span>;
  };

  const renderConnector = (index: number, isLast: boolean) => {
    if (isLast || variant === "dots") return null;

    const isCompleted = index < currentStep;
    
    return (
      <div className={cn(
        "transition-all",
        {
          "flex-1 h-px mx-4": isHorizontal,
          "w-px h-8 mx-auto my-2": !isHorizontal,
          "bg-green-600": isCompleted,
          "bg-gray-300": !isCompleted,
        }
      )} />
    );
  };

  return (
    <div className={cn(
      "flex",
      isHorizontal ? "items-center" : "flex-col",
      className
    )}>
      {steps.map((step, index) => {
        const status = getStepStatus(index, step);
        const isLast = index === steps.length - 1;
        const isClickable = onStepClick && (status === "completed" || status === "current");

        return (
          <div
            key={index}
            className={cn(
              "flex",
              isHorizontal ? "items-center" : "flex-col",
              !isLast && !isHorizontal && "mb-4"
            )}
          >
            <div className={cn(
              "flex items-center",
              !isHorizontal && "w-full"
            )}>
              {/* Step Icon */}
              <div
                className={getStepClasses(status)}
                onClick={() => isClickable && onStepClick!(index)}
              >
                {renderStepIcon(index, status)}
              </div>

              {/* Step Content */}
              {variant !== "dots" && (
                <div className={cn(
                  "ml-3",
                  isHorizontal ? "text-center" : "flex-1"
                )}>
                  <div className={cn(
                    "font-medium text-sm",
                    {
                      "text-gray-500": status === "pending",
                      "text-blue-600": status === "current",
                      "text-gray-900": status === "completed",
                      "text-red-600": status === "error",
                    }
                  )}>
                    {step.title}
                    {step.optional && (
                      <span className="text-xs text-gray-400 ml-1">(Optional)</span>
                    )}
                  </div>
                  {step.description && (
                    <div className="text-xs text-gray-500 mt-1">
                      {step.description}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Connector */}
            {renderConnector(index, isLast)}
          </div>
        );
      })}
    </div>
  );
}

// Progress Stepper - shows completion percentage
export interface ProgressStepperProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

function ProgressStepper({ steps, currentStep, className }: ProgressStepperProps) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}% ` }}
          />
        </div>
        <div className="absolute -top-1 text-xs font-medium text-blue-600" style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}>
          {Math.round(progress)}%
        </div>
      </div>

      {/* Step Labels */}
      <div className="flex justify-between text-sm">
        {steps.map((step, index) => (
          <span
            key={index}
            className={cn(
              index <= currentStep ? "text-blue-600 font-medium" : "text-gray-500"
            )}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}

export { LibraryStepper, ProgressStepper };