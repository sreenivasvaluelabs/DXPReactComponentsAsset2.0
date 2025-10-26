import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  X, 
  LucideIcon 
} from "lucide-react";

const alertVariants = cva(
  "relative flex items-start gap-3 rounded-lg border px-4 py-3 text-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-gray-200 bg-gray-50 text-gray-800",
        success: "border-green-200 bg-green-50 text-green-800",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
        error: "border-red-200 bg-red-50 text-red-800",
        info: "border-blue-200 bg-blue-50 text-blue-800",
      },
      size: {
        sm: "px-3 py-2 text-xs",
        md: "px-4 py-3 text-sm",
        lg: "px-6 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const iconVariants = cva(
  "flex-shrink-0 mt-0.5",
  {
    variants: {
      variant: {
        default: "text-gray-500",
        success: "text-green-500",
        warning: "text-yellow-500",
        error: "text-red-500",
        info: "text-blue-500",
      },
      size: {
        sm: "w-3 h-3",
        md: "w-4 h-4",
        lg: "w-5 h-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const getDefaultIcon = (variant: string): LucideIcon => {
  switch (variant) {
    case "success":
      return CheckCircle;
    case "warning":
      return AlertTriangle;
    case "error":
      return AlertCircle;
    case "info":
      return Info;
    default:
      return Info;
  }
};

interface AlertProps extends VariantProps<typeof alertVariants> {
  children: ReactNode;
  title?: string;
  description?: string;
  icon?: ReactNode | boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  actions?: ReactNode;
}

export function LibraryAlert({
  children,
  title,
  description,
  icon = true,
  dismissible = false,
  onDismiss,
  variant = "default",
  size = "md",
  className,
  actions,
  ...props
}: AlertProps) {
  const IconComponent = getDefaultIcon(variant!);

  const renderIcon = () => {
    if (icon === false) return null;
    if (icon === true) {
      return <IconComponent className={cn(iconVariants({ variant, size }))} />;
    }
    return <div className={cn(iconVariants({ variant, size }))}>{icon}</div>;
  };

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant, size }), className)}
      {...props}
    >
      {renderIcon()}
      
      <div className="flex-1 min-w-0">
        {title && (
          <div className="font-medium mb-1">
            {title}
          </div>
        )}
        
        <div className="text-current">
          {description || children}
        </div>
        
        {actions && (
          <div className="mt-3 flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
      
      {dismissible && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 ml-auto p-1 rounded hover:bg-black hover:bg-opacity-10 transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// Toast-style Alert for notifications
interface ToastAlertProps extends Omit<AlertProps, 'dismissible'> {
  visible: boolean;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

export function ToastAlert({
  visible,
  onClose,
  autoClose = true,
  autoCloseDelay = 5000,
  position = "top-right",
  className,
  ...alertProps
}: ToastAlertProps) {
  const [isVisible, setIsVisible] = React.useState(visible);

  React.useEffect(() => {
    setIsVisible(visible);
    
    if (visible && autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, autoCloseDelay);
      
      return () => clearTimeout(timer);
    }
  }, [visible, autoClose, autoCloseDelay, onClose]);

  const handleDismiss = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  const positionClasses = {
    "top-right": "fixed top-4 right-4 z-50",
    "top-left": "fixed top-4 left-4 z-50",
    "bottom-right": "fixed bottom-4 right-4 z-50",
    "bottom-left": "fixed bottom-4 left-4 z-50",
    "top-center": "fixed top-4 left-1/2 -translate-x-1/2 z-50",
    "bottom-center": "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
  };

  return (
    <div className={cn(positionClasses[position], "animate-in slide-in-from-top-2")}>
      <LibraryAlert
        {...alertProps}
        dismissible
        onDismiss={handleDismiss}
        className={cn("shadow-lg min-w-[300px] max-w-md", className)}
      />
    </div>
  );
}

// Alert variants for common use cases
export function SuccessAlert(props: Omit<AlertProps, 'variant'>) {
  return <LibraryAlert {...props} variant="success" />;
}

export function ErrorAlert(props: Omit<AlertProps, 'variant'>) {
  return <LibraryAlert {...props} variant="error" />;
}

export function WarningAlert(props: Omit<AlertProps, 'variant'>) {
  return <LibraryAlert {...props} variant="warning" />;
}

export function InfoAlert(props: Omit<AlertProps, 'variant'>) {
  return <LibraryAlert {...props} variant="info" />;
}

// Import React for ToastAlert
import React from "react";