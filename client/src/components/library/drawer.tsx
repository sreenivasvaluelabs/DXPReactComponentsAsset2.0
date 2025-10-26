import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  position?: "left" | "right" | "top" | "bottom";
  showOverlay?: boolean;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

export function LibraryDrawer({
  open,
  onClose,
  children,
  title,
  description,
  size = "md",
  position = "right",
  showOverlay = true,
  closeOnOverlayClick = true,
  showCloseButton = true,
  className
}: DrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full"
  };

  const positionClasses = {
    left: {
      container: "left-0 top-0 h-full",
      transform: open ? "translate-x-0" : "-translate-x-full",
      width: position === "left" ? sizeClasses[size] : "w-full"
    },
    right: {
      container: "right-0 top-0 h-full",
      transform: open ? "translate-x-0" : "translate-x-full",
      width: position === "right" ? sizeClasses[size] : "w-full"
    },
    top: {
      container: "top-0 left-0 w-full",
      transform: open ? "translate-y-0" : "-translate-y-full",
      width: "w-full max-h-96"
    },
    bottom: {
      container: "bottom-0 left-0 w-full",
      transform: open ? "translate-y-0" : "translate-y-full",
      width: "w-full max-h-96"
    }
  };

  if (!open && !showOverlay) return null;

  return (
    <>
      {/* Overlay */}
      {showOverlay && (
        <div
          className={cn(
            "fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={closeOnOverlayClick ? onClose : undefined}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out",
          positionClasses[position].container,
          positionClasses[position].width,
          positionClasses[position].transform,
          className
        )}
      >
        {/* Header */}
        {(title || description || showCloseButton) && (
          <div className="flex items-start justify-between p-6 border-b border-gray-200">
            <div className="flex-1">
              {title && (
                <h2 className="text-lg font-semibold text-gray-900">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-gray-500">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}

// Drawer content components
export function DrawerHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("px-6 py-4 border-b border-gray-200", className)}>
      {children}
    </div>
  );
}

export function DrawerBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  );
}

export function DrawerFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("px-6 py-4 border-t border-gray-200 bg-gray-50", className)}>
      {children}
    </div>
  );
}

// Specialized drawer components
export function NavigationDrawer({ 
  open, 
  onClose, 
  menuItems, 
  onMenuClick 
}: {
  open: boolean;
  onClose: () => void;
  menuItems: Array<{
    id: string;
    label: string;
    icon?: ReactNode;
    href?: string;
    active?: boolean;
  }>;
  onMenuClick: (id: string) => void;
}) {
  return (
    <LibraryDrawer
      open={open}
      onClose={onClose}
      position="left"
      size="sm"
      title="Navigation"
    >
      <DrawerBody className="p-0">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onMenuClick(item.id);
                onClose();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors",
                item.active && "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
              )}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </DrawerBody>
    </LibraryDrawer>
  );
}

export function FilterDrawer({ 
  open, 
  onClose, 
  filters, 
  onFiltersChange 
}: {
  open: boolean;
  onClose: () => void;
  filters: Record<string, any>;
  onFiltersChange: (filters: Record<string, any>) => void;
}) {
  return (
    <LibraryDrawer
      open={open}
      onClose={onClose}
      position="right"
      size="md"
      title="Filters"
      description="Refine your search results"
    >
      <DrawerBody>
        {/* Filter content would go here */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option>All Categories</option>
              <option>Technology</option>
              <option>Design</option>
            </select>
          </div>
        </div>
      </DrawerBody>
      <DrawerFooter>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </DrawerFooter>
    </LibraryDrawer>
  );
}