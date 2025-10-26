import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-6 h-6", 
        lg: "w-8 h-8",
        xl: "w-12 h-12",
      },
      variant: {
        default: "text-blue-600",
        primary: "text-blue-600",
        secondary: "text-gray-600",
        success: "text-green-600",
        warning: "text-yellow-600",
        error: "text-red-600",
        white: "text-white",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
  overlay?: boolean;
}

function LibrarySpinner({ 
  className, 
  size, 
  variant, 
  label,
  overlay,
  ...props 
}: SpinnerProps) {
  const spinner = (
    <div
      className={cn(spinnerVariants({ size, variant }), className)}
      role="status"
      aria-label={label || "Loading"}
      {...props}
    >
      <span className="sr-only">{label || "Loading..."}</span>
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-4">
          {spinner}
          {label && <p className="text-sm text-gray-600">{label}</p>}
        </div>
      </div>
    );
  }

  return spinner;
}

// Dots Spinner
export interface DotsSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "secondary";
  className?: string;
}

function DotsSpinner({ 
  size = "md", 
  variant = "default", 
  className 
}: DotsSpinnerProps) {
  const sizeClasses = {
    sm: "w-1 h-1",
    md: "w-2 h-2", 
    lg: "w-3 h-3",
  };

  const colorClasses = {
    default: "bg-blue-600",
    primary: "bg-blue-600",
    secondary: "bg-gray-600",
  };

  return (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            "rounded-full animate-pulse",
            sizeClasses[size],
            colorClasses[variant]
          )}
          style={{
            animationDelay: `${index * 150}ms`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );
}

// Pulse Spinner
export interface PulseSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "secondary";
  className?: string;
}

function PulseSpinner({ 
  size = "md", 
  variant = "default", 
  className 
}: PulseSpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const colorClasses = {
    default: "bg-blue-600",
    primary: "bg-blue-600", 
    secondary: "bg-gray-600",
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "rounded-full animate-ping absolute",
        sizeClasses[size],
        colorClasses[variant],
        "opacity-75"
      )} />
      <div className={cn(
        "rounded-full",
        sizeClasses[size],
        colorClasses[variant]
      )} />
    </div>
  );
}

// Loading Button Spinner
export interface LoadingButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  spinnerSize?: SpinnerProps["size"];
  spinnerVariant?: SpinnerProps["variant"];
}

function LoadingButton({
  loading = false,
  children,
  spinnerSize = "sm",
  spinnerVariant = "white",
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      disabled={loading || disabled}
      className={cn(
        "relative inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium",
        "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {loading && (
        <LibrarySpinner
          size={spinnerSize}
          variant={spinnerVariant}
          className="mr-2"
        />
      )}
      {children}
    </button>
  );
}

// Page Loading component
export interface PageLoadingProps {
  message?: string;
  className?: string;
}

function PageLoading({ message = "Loading...", className }: PageLoadingProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-[200px] space-y-4",
      className
    )}>
      <LibrarySpinner size="lg" />
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
}

export { 
  LibrarySpinner, 
  DotsSpinner, 
  PulseSpinner, 
  LoadingButton, 
  PageLoading,
  spinnerVariants 
};