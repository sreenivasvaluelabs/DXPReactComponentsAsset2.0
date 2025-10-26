import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted";
  thickness?: "thin" | "medium" | "thick";
  color?: "default" | "light" | "dark" | "primary" | "success" | "warning" | "error";
  className?: string;
  children?: ReactNode;
  textPosition?: "left" | "center" | "right";
  spacing?: "none" | "sm" | "md" | "lg";
}

function LibraryDivider({
  orientation = "horizontal",
  variant = "solid",
  thickness = "thin",
  color = "default",
  className,
  children,
  textPosition = "center",
  spacing = "md",
}: DividerProps) {
  const isHorizontal = orientation === "horizontal";

  const getThicknessClass = () => {
    if (isHorizontal) {
      switch (thickness) {
        case "medium":
          return "border-t-2";
        case "thick":
          return "border-t-4";
        default:
          return "border-t";
      }
    } else {
      switch (thickness) {
        case "medium":
          return "border-l-2";
        case "thick":
          return "border-l-4";
        default:
          return "border-l";
      }
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case "dashed":
        return "border-dashed";
      case "dotted":
        return "border-dotted";
      default:
        return "border-solid";
    }
  };

  const getColorClass = () => {
    switch (color) {
      case "light":
        return "border-gray-100";
      case "dark":
        return "border-gray-800";
      case "primary":
        return "border-blue-300";
      case "success":
        return "border-green-300";
      case "warning":
        return "border-yellow-300";
      case "error":
        return "border-red-300";
      default:
        return "border-gray-300";
    }
  };

  const getSpacingClass = () => {
    if (isHorizontal) {
      switch (spacing) {
        case "none":
          return "";
        case "sm":
          return "my-2";
        case "lg":
          return "my-8";
        default:
          return "my-4";
      }
    } else {
      switch (spacing) {
        case "none":
          return "";
        case "sm":
          return "mx-2";
        case "lg":
          return "mx-8";
        default:
          return "mx-4";
      }
    }
  };

  const baseClasses = cn(
    getThicknessClass(),
    getVariantClass(),
    getColorClass(),
    getSpacingClass()
  );

  // Divider with text
  if (children && isHorizontal) {
    const textAlignmentClass = {
      left: "justify-start",
      center: "justify-center", 
      right: "justify-end",
    }[textPosition];

    return (
      <div className={cn("relative flex items-center", getSpacingClass(), className)}>
        <div className={cn("flex-1", baseClasses)} />
        <div className={cn("flex px-4", textAlignmentClass)}>
          <span className={cn(
            "bg-white text-sm font-medium",
            {
              "text-gray-500": color === "default",
              "text-gray-400": color === "light",
              "text-gray-700": color === "dark",
              "text-blue-600": color === "primary",
              "text-green-600": color === "success",
              "text-yellow-600": color === "warning",
              "text-red-600": color === "error",
            }
          )}>
            {children}
          </span>
        </div>
        <div className={cn("flex-1", baseClasses)} />
      </div>
    );
  }

  // Vertical divider with text
  if (children && !isHorizontal) {
    return (
      <div className={cn("flex flex-col items-center", getSpacingClass(), className)}>
        <div className={cn("flex-1 w-px", baseClasses)} />
        <div className="py-2">
          <span className={cn(
            "bg-white text-sm font-medium px-2",
            {
              "text-gray-500": color === "default",
              "text-gray-400": color === "light", 
              "text-gray-700": color === "dark",
              "text-blue-600": color === "primary",
              "text-green-600": color === "success",
              "text-yellow-600": color === "warning",
              "text-red-600": color === "error",
            }
          )}>
            {children}
          </span>
        </div>
        <div className={cn("flex-1 w-px", baseClasses)} />
      </div>
    );
  }

  // Simple divider without text
  return (
    <div
      className={cn(
        baseClasses,
        isHorizontal ? "w-full" : "h-full",
        className
      )}
      role="separator"
    />
  );
}

// Convenience components
function HorizontalDivider(props: Omit<DividerProps, 'orientation'>) {
  return <LibraryDivider {...props} orientation="horizontal" />;
}

function VerticalDivider(props: Omit<DividerProps, 'orientation'>) {
  return <LibraryDivider {...props} orientation="vertical" />;
}

// Section Divider with icons
export interface SectionDividerProps {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  variant?: "default" | "gradient" | "decorative";
  className?: string;
}

function SectionDivider({
  title,
  subtitle,
  icon,
  variant = "default",
  className,
}: SectionDividerProps) {
  if (variant === "gradient") {
    return (
      <div className={cn("relative py-8", className)}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full">
            <div className="flex items-center space-x-3 text-white">
              {icon && <div className="flex-shrink-0">{icon}</div>}
              <div className="text-center">
                {title && <h3 className="font-semibold">{title}</h3>}
                {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "decorative") {
    return (
      <div className={cn("relative py-6", className)}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-dashed border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <div className="bg-white px-4">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
              {icon || (
                <div className="w-2 h-2 bg-gray-400 rounded-full" />
              )}
            </div>
          </div>
        </div>
        {(title || subtitle) && (
          <div className="text-center mt-4">
            {title && <h3 className="font-medium text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative py-4", className)}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <div className="bg-white px-4 py-2">
          <div className="flex items-center space-x-3">
            {icon && <div className="flex-shrink-0 text-gray-500">{icon}</div>}
            <div className="text-center">
              {title && (
                <h3 className="font-medium text-gray-900">{title}</h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-600">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Space Divider - just adds space without a line
export interface SpaceDividerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

function SpaceDivider({ size = "md", className }: SpaceDividerProps) {
  const sizeClasses = {
    xs: "h-2",
    sm: "h-4",
    md: "h-8",
    lg: "h-12",
    xl: "h-16",
  };

  return <div className={cn(sizeClasses[size], className)} />;
}

export { 
  LibraryDivider, 
  HorizontalDivider, 
  VerticalDivider, 
  SectionDivider, 
  SpaceDivider 
};