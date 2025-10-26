import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LibraryContainerProps extends HTMLAttributes<HTMLDivElement> {
  layout?: "flex" | "grid" | "block";
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  children: ReactNode;
}

export function LibraryContainer({
  layout = "block",
  cols = 1,
  gap = "md",
  align = "stretch",
  justify = "start",
  padding = "none",
  maxWidth = "full",
  className,
  children,
  ...props
}: LibraryContainerProps) {
  const gapStyles = {
    none: "gap-0",
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8"
  };

  const paddingStyles = {
    none: "p-0",
    xs: "p-1",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
    xl: "p-8"
  };

  const maxWidthStyles = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full"
  };

  const alignStyles = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch"
  };

  const justifyStyles = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly"
  };

  const colsStyles = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3", 
    4: "grid-cols-4",
    6: "grid-cols-6",
    12: "grid-cols-12"
  };

  let layoutClasses = "";
  
  if (layout === "flex") {
    layoutClasses = cn(
      "flex",
      gapStyles[gap],
      alignStyles[align],
      justifyStyles[justify]
    );
  } else if (layout === "grid") {
    layoutClasses = cn(
      "grid",
      colsStyles[cols],
      gapStyles[gap],
      alignStyles[align],
      justifyStyles[justify]
    );
  } else {
    layoutClasses = "block";
  }

  return (
    <div
      className={cn(
        layoutClasses,
        paddingStyles[padding],
        maxWidthStyles[maxWidth],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
