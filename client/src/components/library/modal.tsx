import { ReactNode, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const modalVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center p-4",
  {
    variants: {
      overlay: {
        default: "bg-black bg-opacity-50",
        light: "bg-black bg-opacity-30",
        dark: "bg-black bg-opacity-70",
        blur: "bg-black bg-opacity-40 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      overlay: "default",
    },
  }
);

const contentVariants = cva(
  "relative bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-200",
  {
    variants: {
      size: {
        sm: "max-w-md w-full",
        md: "max-w-lg w-full",
        lg: "max-w-2xl w-full",
        xl: "max-w-4xl w-full",
        full: "max-w-[95vw] max-h-[95vh] w-full h-full",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface ModalProps extends VariantProps<typeof modalVariants>, VariantProps<typeof contentVariants> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  contentClassName?: string;
}

export function LibraryModal({
  isOpen,
  onClose,
  children,
  title,
  description,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  overlay,
  size,
  className,
  contentClassName,
  ...props
}: ModalProps) {
  useEffect(() => {
    if (!closeOnEscape) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={cn(modalVariants({ overlay }), className)}
      onClick={handleOverlayClick}
      {...props}
    >
      <div className={cn(contentVariants({ size }), contentClassName)}>
        {/* Header */}
        {(title || description || showCloseButton) && (
          <div className="flex items-start justify-between p-6 border-b border-gray-200">
            <div className="flex-1">
              {title && (
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-gray-600">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="ml-4 p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={cn("p-6", (title || description) && "pt-4")}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Modal Footer Component
interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div className={cn("flex items-center justify-end gap-3 p-6 pt-4 border-t border-gray-200", className)}>
      {children}
    </div>
  );
}

// Modal Body Component
interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export function ModalBody({ children, className }: ModalBodyProps) {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  );
}