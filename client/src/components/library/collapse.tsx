import { cn } from "@/lib/utils";
import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface CollapseProps {
  children: ReactNode;
  title?: string;
  defaultExpanded?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  showArrow?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "bordered" | "shadow";
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  onToggle?: (expanded: boolean) => void;
  icon?: ReactNode;
  extra?: ReactNode;
}

function LibraryCollapse({
  children,
  title,
  defaultExpanded = false,
  expanded,
  disabled = false,
  showArrow = true,
  size = "md",
  variant = "default",
  className,
  headerClassName,
  contentClassName,
  onToggle,
  icon,
  extra,
}: CollapseProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const contentRef = useRef<HTMLDivElement>(null);

  const isExpanded = expanded !== undefined ? expanded : internalExpanded;

  const handleToggle = () => {
    if (disabled) return;
    
    const newExpanded = !isExpanded;
    if (expanded === undefined) {
      setInternalExpanded(newExpanded);
    }
    onToggle?.(newExpanded);
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          header: "px-3 py-2 text-sm",
          content: "px-3 pb-2",
        };
      case "lg":
        return {
          header: "px-6 py-4 text-lg",
          content: "px-6 pb-4",
        };
      default:
        return {
          header: "px-4 py-3 text-base",
          content: "px-4 pb-3",
        };
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "bordered":
        return {
          container: "border border-gray-200 rounded-lg",
          header: "border-b border-gray-200 last:border-b-0",
        };
      case "shadow":
        return {
          container: "bg-white shadow-sm rounded-lg",
          header: "border-b border-gray-100 last:border-b-0",
        };
      default:
        return {
          container: "bg-gray-50 rounded-lg",
          header: "",
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const variantClasses = getVariantClasses();

  return (
    <div className={cn(variantClasses.container, className)}>
      {/* Header */}
      <div
        className={cn(
          "flex items-center justify-between cursor-pointer transition-colors",
          sizeClasses.header,
          variantClasses.header,
          {
            "hover:bg-gray-100": !disabled && variant !== "shadow",
            "hover:bg-gray-50": !disabled && variant === "shadow",
            "cursor-not-allowed opacity-50": disabled,
          },
          headerClassName
        )}
        onClick={handleToggle}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          {title && (
            <h3 className="font-medium text-gray-900 truncate">
              {title}
            </h3>
          )}
        </div>

        <div className="flex items-center gap-2">
          {extra && <div className="flex-shrink-0">{extra}</div>}
          {showArrow && (
            <div className="flex-shrink-0">
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          {
            "max-h-0": !isExpanded,
            "max-h-[1000px]": isExpanded, // Large enough value for most content
          }
        )}
      >
        <div className={cn(sizeClasses.content, contentClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Collapse Group - for managing multiple collapse panels
export interface CollapseGroupProps {
  items: Array<{
    key: string;
    title: string;
    content: ReactNode;
    disabled?: boolean;
    icon?: ReactNode;
    extra?: ReactNode;
  }>;
  accordion?: boolean; // Only one can be open at a time
  defaultActiveKeys?: string[];
  activeKeys?: string[];
  size?: CollapseProps["size"];
  variant?: CollapseProps["variant"];
  className?: string;
  onChange?: (activeKeys: string[]) => void;
}

function CollapseGroup({
  items,
  accordion = false,
  defaultActiveKeys = [],
  activeKeys,
  size = "md",
  variant = "default",
  className,
  onChange,
}: CollapseGroupProps) {
  const [internalActiveKeys, setInternalActiveKeys] = useState<string[]>(defaultActiveKeys);

  const currentActiveKeys = activeKeys !== undefined ? activeKeys : internalActiveKeys;

  const handleToggle = (key: string, expanded: boolean) => {
    let newActiveKeys: string[];

    if (accordion) {
      // In accordion mode, only one panel can be open
      newActiveKeys = expanded ? [key] : [];
    } else {
      // In normal mode, multiple panels can be open
      if (expanded) {
        newActiveKeys = [...currentActiveKeys, key];
      } else {
        newActiveKeys = currentActiveKeys.filter(k => k !== key);
      }
    }

    if (activeKeys === undefined) {
      setInternalActiveKeys(newActiveKeys);
    }
    onChange?.(newActiveKeys);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => (
        <LibraryCollapse
          key={item.key}
          title={item.title}
          expanded={currentActiveKeys.includes(item.key)}
          disabled={item.disabled}
          size={size}
          variant={variant}
          icon={item.icon}
          extra={item.extra}
          onToggle={(expanded) => handleToggle(item.key, expanded)}
        >
          {item.content}
        </LibraryCollapse>
      ))}
    </div>
  );
}

// Simple text collapse for long content
export interface TextCollapseProps {
  text: string;
  maxLines?: number;
  expandText?: string;
  collapseText?: string;
  className?: string;
}

function TextCollapse({
  text,
  maxLines = 3,
  expandText = "Show more",
  collapseText = "Show less",
  className,
}: TextCollapseProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowToggle, setShouldShowToggle] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight);
      const height = textRef.current.scrollHeight;
      const lines = height / lineHeight;
      setShouldShowToggle(lines > maxLines);
    }
  }, [text, maxLines]);

  return (
    <div className={className}>
      <p
        ref={textRef}
        className={cn(
          "text-gray-700",
          !isExpanded && shouldShowToggle && "line-clamp-3"
        )}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: !isExpanded && shouldShowToggle ? maxLines : "none",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {text}
      </p>
      
      {shouldShowToggle && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 text-sm font-medium hover:text-blue-800 mt-2"
        >
          {isExpanded ? collapseText : expandText}
        </button>
      )}
    </div>
  );
}

export { LibraryCollapse, CollapseGroup, TextCollapse };