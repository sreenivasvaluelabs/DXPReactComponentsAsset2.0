import { cn } from "@/lib/utils";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// Toast Provider Component
export interface ToastProviderProps {
  children: ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  maxToasts?: number;
}

export function ToastProvider({ 
  children, 
  position = "top-right",
  maxToasts = 5 
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 5000,
      dismissible: toast.dismissible ?? true,
    };

    setToasts(prev => {
      const updated = [newToast, ...prev].slice(0, maxToasts);
      return updated;
    });

    // Auto-dismiss toast
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  }, [maxToasts]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "top-center":
        return "top-4 left-1/2 -translate-x-1/2";
      case "top-right":
        return "top-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "bottom-center":
        return "bottom-4 left-1/2 -translate-x-1/2";
      case "bottom-right":
        return "bottom-4 right-4";
      default:
        return "top-4 right-4";
    }
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      
      {/* Toast Container */}
      {toasts.length > 0 && (
        <div
          className={cn(
            "fixed z-50 flex flex-col gap-2",
            getPositionClasses(),
            position.includes("center") ? "items-center" : "items-end"
          )}
        >
          {toasts.map(toast => (
            <ToastComponent key={toast.id} toast={toast} onClose={removeToast} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

// Individual Toast Component
interface ToastComponentProps {
  toast: Toast;
  onClose: (id: string) => void;
}

function ToastComponent({ toast, onClose }: ToastComponentProps) {
  const getVariantStyles = () => {
    switch (toast.variant) {
      case "success":
        return {
          container: "bg-green-50 border-green-200 text-green-800",
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        };
      case "warning":
        return {
          container: "bg-yellow-50 border-yellow-200 text-yellow-800",
          icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
        };
      case "error":
        return {
          container: "bg-red-50 border-red-200 text-red-800",
          icon: <AlertCircle className="w-5 h-5 text-red-500" />,
        };
      case "info":
        return {
          container: "bg-blue-50 border-blue-200 text-blue-800",
          icon: <Info className="w-5 h-5 text-blue-500" />,
        };
      default:
        return {
          container: "bg-white border-gray-200 text-gray-900",
          icon: <Info className="w-5 h-5 text-gray-500" />,
        };
    }
  };

  const { container, icon } = getVariantStyles();

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg max-w-md min-w-[300px]",
        "animate-in slide-in-from-right-full duration-300",
        container
      )}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {toast.title && (
          <div className="font-semibold text-sm mb-1">
            {toast.title}
          </div>
        )}
        {toast.description && (
          <div className="text-sm opacity-90">
            {toast.description}
          </div>
        )}
        
        {/* Action */}
        {toast.action && (
          <button
            onClick={() => {
              toast.action!.onClick();
              onClose(toast.id);
            }}
            className="mt-2 text-sm font-medium underline hover:no-underline"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      {/* Close Button */}
      {toast.dismissible && (
        <button
          onClick={() => onClose(toast.id)}
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// Toast Hook with convenient methods
export function useToastActions() {
  const { addToast } = useToast();

  const success = useCallback((title: string, description?: string) => {
    addToast({ title, description, variant: "success" });
  }, [addToast]);

  const error = useCallback((title: string, description?: string) => {
    addToast({ title, description, variant: "error" });
  }, [addToast]);

  const warning = useCallback((title: string, description?: string) => {
    addToast({ title, description, variant: "warning" });
  }, [addToast]);

  const info = useCallback((title: string, description?: string) => {
    addToast({ title, description, variant: "info" });
  }, [addToast]);

  const custom = useCallback((toast: Omit<Toast, 'id'>) => {
    addToast(toast);
  }, [addToast]);

  return { success, error, warning, info, custom };
}

// Simple Toast component for direct use
export interface SimpleToastProps {
  title?: string;
  description?: string;
  variant?: Toast["variant"];
  visible?: boolean;
  onClose?: () => void;
  className?: string;
}

export function SimpleToast({
  title,
  description,
  variant = "default",
  visible = true,
  onClose,
  className,
}: SimpleToastProps) {
  if (!visible) return null;

  const toast: Toast = {
    id: "simple",
    title,
    description,
    variant,
    dismissible: Boolean(onClose),
  };

  return (
    <div className={cn("fixed top-4 right-4 z-50", className)}>
      <ToastComponent toast={toast} onClose={onClose || (() => {})} />
    </div>
  );
}

export { ToastComponent };