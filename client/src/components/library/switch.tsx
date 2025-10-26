import { useState } from "react";
import { cn } from "@/lib/utils";

interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "error";
  label?: string;
  description?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function LibrarySwitch({
  checked,
  defaultChecked = false,
  disabled = false,
  size = "md",
  variant = "default",
  label,
  description,
  onChange,
  className
}: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked ?? defaultChecked);

  const handleToggle = () => {
    if (disabled) return;
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  const sizeClasses = {
    sm: {
      switch: "w-8 h-4",
      thumb: "w-3 h-3",
      translate: "translate-x-4"
    },
    md: {
      switch: "w-11 h-6",
      thumb: "w-5 h-5",
      translate: "translate-x-5"
    },
    lg: {
      switch: "w-14 h-8",
      thumb: "w-7 h-7",
      translate: "translate-x-6"
    }
  };

  const variantClasses = {
    default: "bg-blue-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    error: "bg-red-600"
  };

  const currentChecked = checked !== undefined ? checked : isChecked;

  return (
    <div className={cn("flex items-center", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={currentChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          "relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
          sizeClasses[size].switch,
          currentChecked ? variantClasses[variant] : "bg-gray-200",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out",
            sizeClasses[size].thumb,
            currentChecked ? sizeClasses[size].translate : "translate-x-0"
          )}
        />
      </button>

      {(label || description) && (
        <div className="ml-3">
          {label && (
            <label
              onClick={handleToggle}
              className={cn(
                "text-sm font-medium text-gray-900 cursor-pointer",
                disabled && "cursor-not-allowed opacity-50"
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className={cn(
              "text-sm text-gray-500",
              disabled && "opacity-50"
            )}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// Specialized switch components
export function ToggleSwitch({ 
  checked, 
  onToggle, 
  leftLabel, 
  rightLabel, 
  className 
}: {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {leftLabel && (
        <span className={cn("text-sm", !checked ? "font-medium text-gray-900" : "text-gray-500")}>
          {leftLabel}
        </span>
      )}
      <LibrarySwitch checked={checked} onChange={onToggle} />
      {rightLabel && (
        <span className={cn("text-sm", checked ? "font-medium text-gray-900" : "text-gray-500")}>
          {rightLabel}
        </span>
      )}
    </div>
  );
}

export function SwitchGroup({ 
  switches, 
  onChange, 
  className 
}: {
  switches: Array<{
    id: string;
    label: string;
    description?: string;
    checked: boolean;
    disabled?: boolean;
  }>;
  onChange: (id: string, checked: boolean) => void;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {switches.map((switchItem) => (
        <LibrarySwitch
          key={switchItem.id}
          checked={switchItem.checked}
          disabled={switchItem.disabled}
          label={switchItem.label}
          description={switchItem.description}
          onChange={(checked) => onChange(switchItem.id, checked)}
        />
      ))}
    </div>
  );
}

export function StatusSwitch({ 
  status, 
  onStatusChange, 
  className 
}: {
  status: "active" | "inactive";
  onStatusChange: (status: "active" | "inactive") => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className={cn(
        "text-sm",
        status === "inactive" ? "font-medium text-gray-900" : "text-gray-500"
      )}>
        Inactive
      </span>
      <LibrarySwitch
        checked={status === "active"}
        variant={status === "active" ? "success" : "default"}
        onChange={(checked) => onStatusChange(checked ? "active" : "inactive")}
      />
      <span className={cn(
        "text-sm",
        status === "active" ? "font-medium text-green-600" : "text-gray-500"
      )}>
        Active
      </span>
    </div>
  );
}