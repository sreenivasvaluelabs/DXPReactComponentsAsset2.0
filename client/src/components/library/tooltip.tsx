import { cn } from "@/lib/utils";
import { useState, useRef, useEffect, ReactNode } from "react";

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  trigger?: "hover" | "click" | "focus";
  disabled?: boolean;
  delay?: number;
  className?: string;
  contentClassName?: string;
  arrow?: boolean;
}

function LibraryTooltip({
  children,
  content,
  placement = "top",
  trigger = "hover",
  disabled = false,
  delay = 100,
  className,
  contentClassName,
  arrow = true,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showTooltip = () => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      updatePosition();
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (trigger === "click") return; // Don't hide on hover if it's click triggered
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 100);
  };

  const toggleTooltip = () => {
    if (disabled) return;
    setIsVisible(!isVisible);
    if (!isVisible) {
      updatePosition();
    }
  };

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = triggerRect.top - tooltipRect.height - 8;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + 8;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "left":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - 8;
        break;
      case "right":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + 8;
        break;
    }

    // Keep tooltip within viewport
    if (left < 8) left = 8;
    if (left + tooltipRect.width > viewport.width - 8) {
      left = viewport.width - tooltipRect.width - 8;
    }
    if (top < 8) top = 8;
    if (top + tooltipRect.height > viewport.height - 8) {
      top = viewport.height - tooltipRect.height - 8;
    }

    setPosition({ top, left });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        trigger === "click" &&
        isVisible &&
        triggerRef.current &&
        tooltipRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    if (trigger === "click") {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [trigger, isVisible]);

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) {
        updatePosition();
      }
    };

    const handleResize = () => {
      if (isVisible) {
        updatePosition();
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isVisible]);

  const getArrowClasses = () => {
    const baseClasses = "absolute w-2 h-2 bg-gray-900 rotate-45";
    
    switch (placement) {
      case "top":
        return `${baseClasses} top-full left-1/2 -translate-x-1/2 -translate-y-1/2`;
      case "bottom":
        return `${baseClasses} bottom-full left-1/2 -translate-x-1/2 translate-y-1/2`;
      case "left":
        return `${baseClasses} left-full top-1/2 -translate-x-1/2 -translate-y-1/2`;
      case "right":
        return `${baseClasses} right-full top-1/2 translate-x-1/2 -translate-y-1/2`;
      default:
        return baseClasses;
    }
  };

  const triggerProps = {
    ref: triggerRef,
    ...(trigger === "hover" && {
      onMouseEnter: showTooltip,
      onMouseLeave: hideTooltip,
    }),
    ...(trigger === "click" && {
      onClick: toggleTooltip,
    }),
    ...(trigger === "focus" && {
      onFocus: showTooltip,
      onBlur: hideTooltip,
    }),
  };

  return (
    <>
      <div className={cn("inline-block", className)} {...triggerProps}>
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            "fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-md shadow-lg pointer-events-none",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            contentClassName
          )}
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          {content}
          {arrow && <div className={getArrowClasses()} />}
        </div>
      )}
    </>
  );
}

// Convenience components for common use cases
const HoverTooltip = ({ children, content, ...props }: Omit<TooltipProps, 'trigger'>) => (
  <LibraryTooltip trigger="hover" content={content} {...props}>
    {children}
  </LibraryTooltip>
);

const ClickTooltip = ({ children, content, ...props }: Omit<TooltipProps, 'trigger'>) => (
  <LibraryTooltip trigger="click" content={content} {...props}>
    {children}
  </LibraryTooltip>
);

export { LibraryTooltip, HoverTooltip, ClickTooltip };