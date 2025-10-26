import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border",
        success: "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
        warning: "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        info: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  count?: number;
  showZero?: boolean;
}

function LibraryBadge({ className, variant, size, dot, count, showZero, children, ...props }: BadgeProps) {
  if (dot) {
    return (
      <span className="relative inline-flex">
        {children}
        <span className={cn(
          "absolute -top-1 -right-1 h-2 w-2 rounded-full",
          variant === "destructive" ? "bg-red-500" : "bg-blue-500"
        )} />
      </span>
    );
  }

  if (count !== undefined) {
    const displayCount = count > 99 ? "99+" : count.toString();
    const shouldShow = count > 0 || showZero;

    return (
      <span className="relative inline-flex">
        {children}
        {shouldShow && (
          <span className={cn(
            badgeVariants({ variant: variant || "destructive", size: "sm" }),
            "absolute -top-2 -right-2 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full text-xs"
          )}>
            {displayCount}
          </span>
        )}
      </span>
    );
  }

  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
    </div>
  );
}

// Convenience components
const SuccessBadge = ({ children, ...props }: Omit<BadgeProps, "variant">) => (
  <LibraryBadge variant="success" {...props}>{children}</LibraryBadge>
);

const WarningBadge = ({ children, ...props }: Omit<BadgeProps, "variant">) => (
  <LibraryBadge variant="warning" {...props}>{children}</LibraryBadge>
);

const ErrorBadge = ({ children, ...props }: Omit<BadgeProps, "variant">) => (
  <LibraryBadge variant="destructive" {...props}>{children}</LibraryBadge>
);

const InfoBadge = ({ children, ...props }: Omit<BadgeProps, "variant">) => (
  <LibraryBadge variant="info" {...props}>{children}</LibraryBadge>
);

export { LibraryBadge, SuccessBadge, WarningBadge, ErrorBadge, InfoBadge, badgeVariants };