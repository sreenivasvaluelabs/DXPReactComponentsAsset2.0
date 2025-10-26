import { useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";

interface FabAction {
  id: string;
  icon: ReactNode;
  label: string;
  onClick: () => void;
  color?: "primary" | "secondary" | "success" | "warning" | "error";
}

interface FabProps {
  icon?: ReactNode;
  actions?: FabAction[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  variant?: "default" | "extended" | "mini";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  label?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

export function LibraryFab({
  icon = <Plus className="w-6 h-6" />,
  actions = [],
  position = "bottom-right",
  variant = "default",
  color = "primary",
  label,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className
}: FabProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6"
  };

  const colorClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    warning: "bg-yellow-600 hover:bg-yellow-700 text-white",
    error: "bg-red-600 hover:bg-red-700 text-white"
  };

  const actionColorClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    error: "bg-red-500 hover:bg-red-600 text-white"
  };

  const sizeClasses = {
    default: "w-14 h-14",
    extended: "px-6 py-4 h-14",
    mini: "w-10 h-10"
  };

  const handleMainClick = () => {
    if (actions.length > 0) {
      setIsExpanded(!isExpanded);
    } else {
      onClick?.();
    }
  };

  const getActionPosition = (index: number) => {
    const spacing = variant === "mini" ? 50 : 64;
    const offset = (index + 1) * spacing;
    
    switch (position) {
      case "bottom-right":
      case "bottom-left":
        return { bottom: offset };
      case "top-right":
      case "top-left":
        return { top: offset };
      default:
        return { bottom: offset };
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isExpanded && actions.length > 0 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      <div className={cn("fixed z-50", positionClasses[position], className)}>
        {/* Action buttons */}
        {actions.length > 0 && (
          <div className="relative">
            {actions.map((action, index) => (
              <div
                key={action.id}
                className={cn(
                  "absolute transition-all duration-200 ease-out",
                  position.includes("right") ? "right-0" : "left-0",
                  isExpanded
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-75 translate-y-2 pointer-events-none"
                )}
                style={{
                  ...getActionPosition(index),
                  transitionDelay: isExpanded ? `${index * 50}ms` : "0ms"
                }}
              >
                <div className="flex items-center gap-3">
                  {/* Label */}
                  {position.includes("right") && (
                    <span className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap">
                      {action.label}
                    </span>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => {
                      action.onClick();
                      setIsExpanded(false);
                    }}
                    className={cn(
                      "rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95",
                      variant === "mini" ? "w-10 h-10" : "w-12 h-12",
                      actionColorClasses[action.color || "primary"]
                    )}
                  >
                    {action.icon}
                  </button>

                  {/* Label */}
                  {position.includes("left") && (
                    <span className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap">
                      {action.label}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main FAB */}
        <button
          onClick={handleMainClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className={cn(
            "rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center gap-2",
            sizeClasses[variant],
            colorClasses[color],
            isExpanded && actions.length > 0 && "rotate-45"
          )}
        >
          {/* Icon */}
          <span className={cn(
            "flex items-center justify-center",
            variant === "mini" ? "text-sm" : "text-base"
          )}>
            {isExpanded && actions.length > 0 ? <X className="w-6 h-6" /> : icon}
          </span>

          {/* Extended label */}
          {variant === "extended" && label && (
            <span className="font-medium text-sm whitespace-nowrap">
              {label}
            </span>
          )}
        </button>
      </div>
    </>
  );
}

// Specialized FAB components
export function SpeedDialFab({ 
  actions, 
  position, 
  className 
}: {
  actions: FabAction[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}) {
  return (
    <LibraryFab
      actions={actions}
      position={position}
      className={className}
    />
  );
}

export function ScrollToTopFab({ 
  showAt = 300, 
  position = "bottom-right",
  className 
}: {
  showAt?: number;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAt);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAt]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <LibraryFab
      icon={<span className="text-xl font-bold">↑</span>}
      onClick={scrollToTop}
      position={position}
      variant="mini"
      color="primary"
      className={cn("transition-opacity duration-300", className)}
    />
  );
}

export function CreateFab({ 
  onCreatePost, 
  onCreateMessage, 
  onCreateEvent, 
  position,
  className 
}: {
  onCreatePost?: () => void;
  onCreateMessage?: () => void;
  onCreateEvent?: () => void;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}) {
  const actions: FabAction[] = [
    ...(onCreatePost ? [{
      id: "post",
      icon: <span className="text-sm">📝</span>,
      label: "Create Post",
      onClick: onCreatePost,
      color: "primary" as const
    }] : []),
    ...(onCreateMessage ? [{
      id: "message",
      icon: <span className="text-sm">💬</span>,
      label: "New Message", 
      onClick: onCreateMessage,
      color: "success" as const
    }] : []),
    ...(onCreateEvent ? [{
      id: "event",
      icon: <span className="text-sm">📅</span>,
      label: "Create Event",
      onClick: onCreateEvent,
      color: "warning" as const
    }] : [])
  ];

  return (
    <LibraryFab
      actions={actions}
      position={position}
      className={className}
    />
  );
}

export function ExtendedFab({ 
  icon, 
  label, 
  onClick, 
  color,
  position,
  className 
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}) {
  return (
    <LibraryFab
      icon={icon}
      label={label}
      onClick={onClick}
      variant="extended"
      color={color}
      position={position}
      className={className}
    />
  );
}

export function MiniFab({ 
  icon, 
  onClick, 
  color,
  position,
  className 
}: {
  icon: ReactNode;
  onClick: () => void;
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}) {
  return (
    <LibraryFab
      icon={icon}
      onClick={onClick}
      variant="mini"
      color={color}
      position={position}
      className={className}
    />
  );
}

// FAB with tooltip
export function TooltipFab({ 
  icon, 
  tooltip, 
  onClick, 
  color,
  position,
  className 
}: {
  icon: ReactNode;
  tooltip: string;
  onClick: () => void;
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <LibraryFab
        icon={icon}
        onClick={onClick}
        color={color}
        position={position}
        className={cn(
          className,
          "transition-all duration-200"
        )}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />
      
      {showTooltip && (
        <div className={cn(
          "absolute z-60 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg whitespace-nowrap transition-opacity duration-200",
          position?.includes("right") ? "-left-2 transform -translate-x-full" : "-right-2 transform translate-x-full",
          position?.includes("bottom") ? "bottom-full mb-2" : "top-full mt-2"
        )}>
          {tooltip}
          <div className={cn(
            "absolute w-2 h-2 bg-gray-900 transform rotate-45",
            position?.includes("right") ? "right-0 translate-x-1" : "left-0 -translate-x-1",
            position?.includes("bottom") ? "top-full -translate-y-1" : "bottom-full translate-y-1"
          )} />
        </div>
      )}
    </div>
  );
}