import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-gray-200 bg-white hover:shadow-md",
        elevated: "border-gray-200 bg-white shadow-lg hover:shadow-xl",
        outlined: "border-2 border-blue-200 bg-white hover:border-blue-300",
        filled: "border-blue-200 bg-blue-50 hover:bg-blue-100",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      interactive: {
        true: "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false,
    },
  }
);

interface CardProps extends VariantProps<typeof cardVariants> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  title?: string;
  subtitle?: string;
  image?: string;
  actions?: ReactNode;
}

export function LibraryCard({
  children,
  className,
  variant,
  size,
  interactive,
  onClick,
  title,
  subtitle,
  image,
  actions,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, size, interactive }), className)}
      onClick={onClick}
      {...props}
    >
      {image && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title || "Card image"}
            className="h-48 w-full object-cover transition-transform duration-200 hover:scale-105"
          />
        </div>
      )}
      
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div className="flex-1">
        {children}
      </div>
      
      {actions && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          {actions}
        </div>
      )}
    </div>
  );
}