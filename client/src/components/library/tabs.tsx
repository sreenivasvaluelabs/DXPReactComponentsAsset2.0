import { ReactNode, useState, createContext, useContext } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabsVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "",
        pills: "",
        underline: "",
        enclosed: "border border-gray-200 rounded-lg",
      },
      orientation: {
        horizontal: "",
        vertical: "flex gap-6",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
    },
  }
);

const tabListVariants = cva(
  "flex",
  {
    variants: {
      variant: {
        default: "border-b border-gray-200",
        pills: "p-1 bg-gray-100 rounded-lg",
        underline: "border-b-2 border-gray-200",
        enclosed: "border-b border-gray-200",
      },
      orientation: {
        horizontal: "",
        vertical: "flex-col border-r border-gray-200 min-w-[200px]",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
    },
  }
);

const tabTriggerVariants = cva(
  "relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-b-2 border-transparent hover:text-blue-600 hover:border-blue-300 data-[state=active]:text-blue-600 data-[state=active]:border-blue-600",
        pills: "rounded-md hover:bg-white hover:shadow-sm data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600",
        underline: "border-b-2 border-transparent hover:border-gray-300 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600",
        enclosed: "border-b-2 border-transparent hover:bg-gray-50 data-[state=active]:bg-white data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:-mb-px",
      },
      orientation: {
        horizontal: "",
        vertical: "w-full justify-start",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
      disabled: false,
    },
  }
);

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: "default" | "pills" | "underline" | "enclosed";
  orientation: "horizontal" | "vertical";
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs component");
  }
  return context;
};

// Main Tabs Container
interface TabsProps extends VariantProps<typeof tabsVariants> {
  children: ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function LibraryTabs({
  children,
  defaultValue,
  value,
  onValueChange,
  variant = "default",
  orientation = "horizontal",
  className,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const activeTab = value !== undefined ? value : internalValue;

  const handleTabChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab: handleTabChange,
        variant: variant!,
        orientation: orientation!,
      }}
    >
      <div className={cn(tabsVariants({ variant, orientation }), className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// Tabs List Container
interface TabsListProps {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function TabsList({ children, className, ...props }: TabsListProps) {
  const { variant, orientation } = useTabsContext();

  return (
    <div
      role="tablist"
      className={cn(tabListVariants({ variant, orientation }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Individual Tab Trigger
interface TabsTriggerProps {
  children: ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

export function TabsTrigger({
  children,
  value,
  disabled = false,
  className,
  icon,
}: TabsTriggerProps) {
  const { activeTab, setActiveTab, variant, orientation } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      data-state={isActive ? "active" : "inactive"}
      disabled={disabled}
      onClick={() => !disabled && setActiveTab(value)}
      className={cn(
        tabTriggerVariants({ variant, orientation, disabled }),
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}

// Tab Content Container
interface TabsContentProps {
  children: ReactNode;
  value: string;
  className?: string;
}

export function TabsContent({ children, value, className }: TabsContentProps) {
  const { activeTab } = useTabsContext();
  const isActive = activeTab === value;

  if (!isActive) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn("mt-4 focus:outline-none", className)}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

// Pre-configured Tab Items for easier use
interface TabItem {
  label: string;
  value: string;
  content: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

interface SimpleTabsProps extends VariantProps<typeof tabsVariants> {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  tabsListClassName?: string;
  tabContentClassName?: string;
}

export function SimpleTabs({
  items,
  defaultValue,
  value,
  onValueChange,
  variant = "default",
  orientation = "horizontal",
  className,
  tabsListClassName,
  tabContentClassName,
}: SimpleTabsProps) {
  return (
    <LibraryTabs
      defaultValue={defaultValue || items[0]?.value}
      value={value}
      onValueChange={onValueChange}
      variant={variant}
      orientation={orientation}
      className={className}
    >
      <TabsList className={tabsListClassName}>
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            icon={item.icon}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {items.map((item) => (
        <TabsContent
          key={item.value}
          value={item.value}
          className={tabContentClassName}
        >
          {item.content}
        </TabsContent>
      ))}
    </LibraryTabs>
  );
}