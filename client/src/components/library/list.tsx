import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Check, X, Clock, Star } from "lucide-react";

interface ListItem {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  disabled?: boolean;
  selected?: boolean;
}

interface LibraryListProps {
  items: ListItem[];
  variant?: "default" | "bordered" | "divided" | "card";
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  multiSelect?: boolean;
  onItemClick?: (item: ListItem) => void;
  onItemSelect?: (selectedIds: string[]) => void;
  className?: string;
}

export function LibraryList({
  items,
  variant = "default",
  size = "md",
  interactive = false,
  multiSelect = false,
  onItemClick,
  onItemSelect,
  className
}: LibraryListProps) {
  const sizeClasses = {
    sm: "py-2 px-3 text-sm",
    md: "py-3 px-4",
    lg: "py-4 px-5 text-lg"
  };

  const variantClasses = {
    default: "bg-white",
    bordered: "bg-white border border-gray-200 rounded-lg",
    divided: "bg-white divide-y divide-gray-200",
    card: "bg-white rounded-lg shadow-sm border border-gray-100"
  };

  return (
    <div className={cn("w-full", variantClasses[variant], className)}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "flex items-center justify-between transition-colors",
            sizeClasses[size],
            interactive && !item.disabled && "hover:bg-gray-50 cursor-pointer",
            item.selected && "bg-blue-50 border-l-4 border-l-blue-500",
            item.disabled && "opacity-50 cursor-not-allowed",
            variant === "card" && index > 0 && "border-t border-gray-100"
          )}
          onClick={() => !item.disabled && onItemClick?.(item)}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {item.icon && (
              <div className="flex-shrink-0 text-gray-500">
                {item.icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className={cn(
                "font-medium text-gray-900 truncate",
                item.disabled && "text-gray-400"
              )}>
                {item.title}
              </h4>
              {item.description && (
                <p className="text-sm text-gray-500 truncate mt-1">
                  {item.description}
                </p>
              )}
            </div>
          </div>
          {item.action && (
            <div className="flex-shrink-0 ml-3">
              {item.action}
            </div>
          )}
          {interactive && !item.action && (
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}

// Specialized list components
export function TaskList({ 
  tasks, 
  onTaskToggle, 
  className 
}: { 
  tasks: Array<{id: string; title: string; completed: boolean; priority?: "high" | "medium" | "low"}>;
  onTaskToggle?: (id: string) => void;
  className?: string;
}) {
  return (
    <LibraryList
      items={tasks.map(task => ({
        id: task.id,
        title: task.title,
        icon: task.completed ? <Check className="w-4 h-4 text-green-500" /> : <div className="w-4 h-4 border border-gray-300 rounded" />,
        action: task.priority && (
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            task.priority === "high" && "bg-red-100 text-red-700",
            task.priority === "medium" && "bg-yellow-100 text-yellow-700",
            task.priority === "low" && "bg-green-100 text-green-700"
          )}>
            {task.priority}
          </span>
        ),
        selected: task.completed
      }))}
      interactive
      onItemClick={(item) => onTaskToggle?.(item.id)}
      className={className}
    />
  );
}

export function ContactList({ 
  contacts, 
  onContactClick, 
  className 
}: { 
  contacts: Array<{id: string; name: string; email: string; avatar?: string; online?: boolean}>;
  onContactClick?: (id: string) => void;
  className?: string;
}) {
  return (
    <LibraryList
      items={contacts.map(contact => ({
        id: contact.id,
        title: contact.name,
        description: contact.email,
        icon: (
          <div className="relative">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium text-sm">
                {contact.name.charAt(0)}
              </span>
            </div>
            {contact.online && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
            )}
          </div>
        )
      }))}
      variant="divided"
      interactive
      onItemClick={(item) => onContactClick?.(item.id)}
      className={className}
    />
  );
}

export function MenuList({ 
  menuItems, 
  onMenuClick, 
  className 
}: { 
  menuItems: Array<{id: string; label: string; icon?: ReactNode; shortcut?: string; disabled?: boolean}>;
  onMenuClick?: (id: string) => void;
  className?: string;
}) {
  return (
    <LibraryList
      items={menuItems.map(item => ({
        id: item.id,
        title: item.label,
        icon: item.icon,
        action: item.shortcut && (
          <kbd className="px-2 py-1 text-xs bg-gray-100 border rounded">
            {item.shortcut}
          </kbd>
        ),
        disabled: item.disabled
      }))}
      size="sm"
      interactive
      onItemClick={(item) => onMenuClick?.(item.id)}
      className={className}
    />
  );
}