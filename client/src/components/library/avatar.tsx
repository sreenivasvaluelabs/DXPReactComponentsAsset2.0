import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { User } from "lucide-react";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  showBadge?: boolean;
  badgeColor?: "green" | "red" | "yellow" | "blue" | "gray";
  badgePosition?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
}

function LibraryAvatar({
  className,
  size,
  src,
  alt,
  fallback,
  showBadge,
  badgeColor = "green",
  badgePosition = "bottom-right",
  ...props
}: AvatarProps) {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
    "2xl": 80,
  };

  const currentSize = size || "md";
  const avatarSize = sizeMap[currentSize];

  const getBadgeClasses = () => {
    const badgeColors = {
      green: "bg-green-500",
      red: "bg-red-500",
      yellow: "bg-yellow-500",
      blue: "bg-blue-500",
      gray: "bg-gray-500",
    };

    const positions = {
      "top-right": "top-0 right-0",
      "bottom-right": "bottom-0 right-0",
      "top-left": "top-0 left-0",
      "bottom-left": "bottom-0 left-0",
    };

    const badgeSize = avatarSize <= 32 ? "w-2 h-2" : "w-3 h-3";

    return cn(
      "absolute rounded-full border-2 border-white",
      badgeSize,
      badgeColors[badgeColor],
      positions[badgePosition]
    );
  };

  const getInitials = (name?: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const getFontSize = () => {
    const fontSizes = {
      xs: "text-xs",
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
      "2xl": "text-xl",
    };
    return fontSizes[currentSize];
  };

  return (
    <div className={cn(avatarVariants({ size }), className)} {...props}>
      {src ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className="aspect-square h-full w-full object-cover"
          onError={(e) => {
            // Hide image on error, will show fallback
            e.currentTarget.style.display = "none";
          }}
        />
      ) : fallback ? (
        <div className={cn(
          "flex h-full w-full items-center justify-center bg-gray-200 text-gray-600 font-medium",
          getFontSize()
        )}>
          {getInitials(fallback)}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-600">
          <User className={cn(
            currentSize === "xs" ? "h-3 w-3" :
            currentSize === "sm" ? "h-4 w-4" :
            currentSize === "md" ? "h-5 w-5" :
            currentSize === "lg" ? "h-6 w-6" :
            currentSize === "xl" ? "h-8 w-8" : "h-10 w-10"
          )} />
        </div>
      )}
      
      {showBadge && <div className={getBadgeClasses()} />}
    </div>
  );
}

// Avatar Group component
export interface AvatarGroupProps {
  avatars: Array<{
    src?: string;
    alt?: string;
    fallback?: string;
  }>;
  max?: number;
  size?: AvatarProps["size"];
  className?: string;
  spacing?: "tight" | "normal" | "loose";
}

function AvatarGroup({
  avatars,
  max = 5,
  size = "md",
  className,
  spacing = "normal",
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = Math.max(0, avatars.length - max);

  const getSpacingClasses = () => {
    const spacings = {
      tight: "-space-x-1",
      normal: "-space-x-2",
      loose: "-space-x-1",
    };
    return spacings[spacing];
  };

  return (
    <div className={cn("flex items-center", getSpacingClasses(), className)}>
      {visibleAvatars.map((avatar, index) => (
        <LibraryAvatar
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          fallback={avatar.fallback}
          size={size}
          className="ring-2 ring-white"
        />
      ))}
      
      {remainingCount > 0 && (
        <LibraryAvatar
          size={size}
          fallback={`+${remainingCount}`}
          className="ring-2 ring-white bg-gray-100"
        />
      )}
    </div>
  );
}

// User card with avatar
export interface UserCardProps {
  avatar?: string;
  name: string;
  email?: string;
  role?: string;
  size?: AvatarProps["size"];
  orientation?: "horizontal" | "vertical";
  className?: string;
  showBadge?: boolean;
  badgeColor?: AvatarProps["badgeColor"];
}

function UserCard({
  avatar,
  name,
  email,
  role,
  size = "md",
  orientation = "horizontal",
  className,
  showBadge,
  badgeColor,
}: UserCardProps) {
  const isVertical = orientation === "vertical";

  return (
    <div className={cn(
      "flex items-center",
      isVertical ? "flex-col space-y-2 text-center" : "space-x-3",
      className
    )}>
      <LibraryAvatar
        src={avatar}
        fallback={name}
        size={size}
        showBadge={showBadge}
        badgeColor={badgeColor}
      />
      
      <div className={cn("min-w-0 flex-1", isVertical && "text-center")}>
        <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
        {email && (
          <p className="text-sm text-gray-500 truncate">{email}</p>
        )}
        {role && (
          <p className="text-xs text-gray-400 truncate">{role}</p>
        )}
      </div>
    </div>
  );
}

export { LibraryAvatar, AvatarGroup, UserCard, avatarVariants };