import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { useState } from "react";

const chipVariants = cva(
  "inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full transition-all",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        primary: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        success: "bg-green-100 text-green-800 hover:bg-green-200",
        warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        error: "bg-red-100 text-red-800 hover:bg-red-200",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
        filled: "bg-gray-800 text-white hover:bg-gray-700",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
      },
      clickable: {
        true: "cursor-pointer hover:shadow-sm",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      clickable: false,
    },
  }
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chipVariants> {
  label: string;
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  deletable?: boolean;
  disabled?: boolean;
  onDelete?: () => void;
  onChipClick?: () => void;
}

function LibraryChip({
  className,
  variant,
  size,
  label,
  icon,
  avatar,
  deletable,
  disabled,
  clickable,
  onDelete,
  onChipClick,
  onClick,
  ...props
}: ChipProps) {
  const isClickable = Boolean(onChipClick || onClick) && !disabled;

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (disabled) return;
    onChipClick?.();
    onClick?.(e);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      onDelete?.();
    }
  };

  return (
    <span
      className={cn(
        chipVariants({
          variant,
          size,
          clickable: isClickable ? true : undefined,
        }),
        {
          "opacity-50 cursor-not-allowed": disabled,
          "hover:shadow-none": disabled,
        },
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {avatar && <span className="flex-shrink-0">{avatar}</span>}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="truncate">{label}</span>
      {deletable && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={disabled}
          className={cn(
            "flex-shrink-0 rounded-full p-0.5 hover:bg-black/10 transition-colors",
            size === "sm" ? "w-3 h-3" : "w-4 h-4",
            disabled && "cursor-not-allowed"
          )}
        >
          <X className="w-full h-full" />
        </button>
      )}
    </span>
  );
}

// Chip Group component for managing multiple chips
export interface ChipGroupProps {
  chips: Array<{
    id: string | number;
    label: string;
    variant?: ChipProps["variant"];
    icon?: React.ReactNode;
    deletable?: boolean;
    disabled?: boolean;
  }>;
  variant?: ChipProps["variant"];
  size?: ChipProps["size"];
  className?: string;
  onChipClick?: (chipId: string | number) => void;
  onChipDelete?: (chipId: string | number) => void;
  max?: number;
}

function ChipGroup({
  chips,
  variant = "default",
  size = "md",
  className,
  onChipClick,
  onChipDelete,
  max,
}: ChipGroupProps) {
  const displayChips = max ? chips.slice(0, max) : chips;
  const remainingCount = max && chips.length > max ? chips.length - max : 0;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {displayChips.map((chip) => (
        <LibraryChip
          key={chip.id}
          label={chip.label}
          variant={chip.variant || variant}
          size={size}
          icon={chip.icon}
          deletable={chip.deletable}
          disabled={chip.disabled}
          onChipClick={() => onChipClick?.(chip.id)}
          onDelete={() => onChipDelete?.(chip.id)}
        />
      ))}
      {remainingCount > 0 && (
        <LibraryChip
          label={`+${remainingCount}`}
          variant="outline"
          size={size}
        />
      )}
    </div>
  );
}

// Input Chip component for tag-like behavior
export interface InputChipProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  maxChips?: number;
  variant?: ChipProps["variant"];
  size?: ChipProps["size"];
  className?: string;
  onEnterPress?: (value: string) => void;
}

function InputChip({
  value,
  onChange,
  placeholder = "Type and press Enter...",
  disabled,
  maxChips,
  variant = "default",
  size = "md",
  className,
  onEnterPress,
}: InputChipProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newValue = inputValue.trim();
      
      if (!value.includes(newValue) && (!maxChips || value.length < maxChips)) {
        onChange([...value, newValue]);
        onEnterPress?.(newValue);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const handleDelete = (chipToDelete: string) => {
    onChange(value.filter(chip => chip !== chipToDelete));
  };

  return (
    <div className={cn(
      "flex flex-wrap gap-1 p-2 border border-gray-300 rounded-lg bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500",
      disabled && "bg-gray-50 cursor-not-allowed",
      className
    )}>
      {value.map((chip, index) => (
        <LibraryChip
          key={index}
          label={chip}
          variant={variant}
          size={size}
          deletable={!disabled}
          onDelete={() => handleDelete(chip)}
        />
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ""}
        disabled={disabled || (maxChips && value.length >= maxChips)}
        className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm disabled:cursor-not-allowed"
      />
    </div>
  );
}

export { LibraryChip, ChipGroup, InputChip, chipVariants };