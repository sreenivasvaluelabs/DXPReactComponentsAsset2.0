import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const progressVariants = cva(
  "w-full bg-secondary rounded-full overflow-hidden",
  {
    variants: {
      size: {
        sm: "h-2",
        md: "h-3",
        lg: "h-4",
        xl: "h-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const progressBarVariants = cva(
  "h-full transition-all duration-300 ease-in-out rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-gray-600",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        error: "bg-red-500",
        info: "bg-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressBarVariants> {
  value?: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  striped?: boolean;
}

function LibraryProgress({
  className,
  value = 0,
  max = 100,
  size,
  variant,
  showLabel,
  label,
  animated,
  striped,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const displayValue = Math.round(percentage);

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {label || "Progress"}
          </span>
          {showLabel && (
            <span className="text-sm text-gray-500">
              {displayValue}%
            </span>
          )}
        </div>
      )}
      
      <div
        className={cn(progressVariants({ size }), className)}
        {...props}
      >
        <div
          className={cn(
            progressBarVariants({ variant }),
            {
              "bg-stripes": striped,
              "animate-pulse": animated,
            }
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Circular Progress
export interface CircularProgressProps {
  value?: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: "default" | "success" | "warning" | "error" | "info";
  showLabel?: boolean;
  className?: string;
}

function CircularProgress({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  variant = "default",
  showLabel = true,
  className
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorMap = {
    default: "stroke-blue-500",
    success: "stroke-green-500",
    warning: "stroke-yellow-500",
    error: "stroke-red-500",
    info: "stroke-blue-400",
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-gray-200 fill-none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className={cn("fill-none transition-all duration-300 ease-in-out", colorMap[variant])}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-semibold text-gray-900">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}

// Multi-step Progress
export interface Step {
  label: string;
  description?: string;
  completed?: boolean;
  active?: boolean;
}

export interface StepProgressProps {
  steps: Step[];
  currentStep?: number;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

function StepProgress({
  steps,
  currentStep = 0,
  className,
  orientation = "horizontal"
}: StepProgressProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <div className={cn(
      "flex",
      isHorizontal ? "items-center space-x-4" : "flex-col space-y-4",
      className
    )}>
      {steps.map((step, index) => {
        const isCompleted = step.completed || index < currentStep;
        const isActive = step.active || index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={index} className={cn(
            "flex items-center",
            isHorizontal ? "flex-1" : "flex-row"
          )}>
            <div className="flex items-center">
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium",
                {
                  "bg-blue-600 border-blue-600 text-white": isCompleted,
                  "bg-blue-100 border-blue-600 text-blue-600": isActive && !isCompleted,
                  "bg-gray-100 border-gray-300 text-gray-400": !isActive && !isCompleted,
                }
              )}>
                {isCompleted ? "✓" : index + 1}
              </div>
              
              <div className="ml-3">
                <p className={cn(
                  "text-sm font-medium",
                  {
                    "text-blue-600": isActive,
                    "text-gray-900": isCompleted,
                    "text-gray-400": !isActive && !isCompleted,
                  }
                )}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-500">{step.description}</p>
                )}
              </div>
            </div>
            
            {!isLast && isHorizontal && (
              <div className={cn(
                "flex-1 h-px ml-4",
                isCompleted ? "bg-blue-600" : "bg-gray-300"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export { LibraryProgress, CircularProgress, StepProgress };