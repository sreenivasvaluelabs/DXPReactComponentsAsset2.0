import { useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { X, Check, AlertCircle, Info, AlertTriangle } from "lucide-react";

interface SnackbarProps {
  message: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
  duration?: number;
  visible?: boolean;
  showIcon?: boolean;
  showCloseButton?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose?: () => void;
  className?: string;
}

export function LibrarySnackbar({
  message,
  description,
  variant = "default",
  position = "bottom-center",
  duration = 4000,
  visible = false,
  showIcon = true,
  showCloseButton = true,
  action,
  onClose,
  className
}: SnackbarProps) {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const icons = {
    default: null,
    success: <Check className="w-4 h-4" />,
    error: <X className="w-4 h-4" />,
    warning: <AlertTriangle className="w-4 h-4" />,
    info: <Info className="w-4 h-4" />
  };

  const variantClasses = {
    default: "bg-gray-900 text-white border-gray-700",
    success: "bg-green-600 text-white border-green-500",
    error: "bg-red-600 text-white border-red-500",
    warning: "bg-yellow-600 text-white border-yellow-500",
    info: "bg-blue-600 text-white border-blue-500"
  };

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
    "bottom-right": "bottom-4 right-4"
  };

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed z-50 max-w-md mx-auto",
      positionClasses[position]
    )}>
      <div className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg transition-all duration-300",
        "animate-in slide-in-from-bottom-2",
        variantClasses[variant],
        className
      )}>
        {showIcon && icons[variant] && (
          <div className="flex-shrink-0">
            {icons[variant]}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm">
            {message}
          </p>
          {description && (
            <p className="text-xs opacity-90 mt-1">
              {description}
            </p>
          )}
        </div>

        {action && (
          <button
            onClick={action.onClick}
            className="px-3 py-1 text-xs font-medium bg-white bg-opacity-20 hover:bg-opacity-30 rounded transition-colors"
          >
            {action.label}
          </button>
        )}

        {showCloseButton && (
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// Snackbar hook for programmatic usage
export function useSnackbar() {
  const [snackbars, setSnackbars] = useState<Array<{
    id: string;
    message: string;
    variant: "default" | "success" | "error" | "warning" | "info";
    description?: string;
  }>>([]);

  const show = (
    message: string,
    variant: "default" | "success" | "error" | "warning" | "info" = "default",
    description?: string
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    setSnackbars(prev => [...prev, { id, message, variant, description }]);
    
    setTimeout(() => {
      setSnackbars(prev => prev.filter(snack => snack.id !== id));
    }, 4000);
  };

  const dismiss = (id: string) => {
    setSnackbars(prev => prev.filter(snack => snack.id !== id));
  };

  return { snackbars, show, dismiss };
}

// Specialized snackbar components
export function SuccessSnackbar({ message, onClose, visible }: { message: string; onClose?: () => void; visible: boolean }) {
  return (
    <LibrarySnackbar
      message={message}
      variant="success"
      visible={visible}
      onClose={onClose}
    />
  );
}

export function ErrorSnackbar({ message, onClose, visible }: { message: string; onClose?: () => void; visible: boolean }) {
  return (
    <LibrarySnackbar
      message={message}
      variant="error"
      visible={visible}
      onClose={onClose}
    />
  );
}

export function SnackbarContainer({ snackbars, onDismiss }: {
  snackbars: Array<{id: string; message: string; variant?: "default" | "success" | "error" | "warning" | "info"}>;
  onDismiss: (id: string) => void;
}) {
  return (
    <>
      {snackbars.map((snackbar, index) => (
        <div
          key={snackbar.id}
          className="fixed bottom-4 right-4 z-50"
          style={{ bottom: `${16 + index * 70}px` }}
        >
          <LibrarySnackbar
            message={snackbar.message}
            variant={snackbar.variant || "default"}
            visible={true}
            onClose={() => onDismiss(snackbar.id)}
          />
        </div>
      ))}
    </>
  );
}