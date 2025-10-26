import { useRoute } from "wouter";
import { Link } from "wouter";
import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { LibraryButton } from "@/components/library/button";
import { LibraryAccordion } from "@/components/library/accordion";
import { LibraryCarousel } from "@/components/library/carousel";
import { LibraryContainer } from "@/components/library/container";
import { LibraryNavigation } from "@/components/library/navigation";
import { LibraryCard } from "@/components/library/card";
import { LibrarySearchBar } from "@/components/library/search-bar";
import { LibraryModal, ModalFooter } from "@/components/library/modal";
import { LibraryForm, FormField, FormLabel, Input, Textarea, Select, Checkbox, RadioGroup } from "@/components/library/form";
import { LibraryTable } from "@/components/library/table";
import { SimpleTabs, LibraryTabs, TabsList, TabsTrigger, TabsContent } from "@/components/library/tabs";
import { LibraryAlert, SuccessAlert, ErrorAlert, WarningAlert, InfoAlert } from "@/components/library/alert";
import { LibraryBadge, SuccessBadge, WarningBadge, ErrorBadge, InfoBadge } from "@/components/library/badge";
import { LibraryBreadcrumb, SimpleBreadcrumb } from "@/components/library/breadcrumb";
import { LibraryPagination, SimplePagination } from "@/components/library/pagination";
import { LibraryProgress, CircularProgress, StepProgress } from "@/components/library/progress";
import { LibrarySlider, RangeSlider } from "@/components/library/slider";
import { LibraryTooltip, HoverTooltip, ClickTooltip } from "@/components/library/tooltip";
import { LibraryAvatar, AvatarGroup, UserCard } from "@/components/library/avatar";
import { LibraryDropdown, SearchableDropdown, MultiSelectDropdown } from "@/components/library/dropdown";
import { LibraryStepper, ProgressStepper } from "@/components/library/stepper";
import { LibraryChip, ChipGroup } from "@/components/library/chip";
import { LibraryTimeline } from "@/components/library/timeline";
import { LibrarySpinner, DotsSpinner, PulseSpinner, LoadingButton } from "@/components/library/spinner";
import { LibraryCalendar, DatePicker } from "@/components/library/calendar";
import { LibraryRating, ReviewRating, RatingSummary } from "@/components/library/rating";
import { SimpleToast } from "@/components/library/toast";
import { LibraryCollapse, CollapseGroup, TextCollapse } from "@/components/library/collapse";
import { LibraryDivider, SectionDivider } from "@/components/library/divider";
import { LibraryList, TaskList, ContactList, MenuList } from "@/components/library/list";
import { LibrarySnackbar, SuccessSnackbar, ErrorSnackbar } from "@/components/library/snackbar";
import { LibrarySwitch, ToggleSwitch, SwitchGroup, StatusSwitch } from "@/components/library/switch";
import { LibraryDrawer, NavigationDrawer, FilterDrawer } from "@/components/library/drawer";
import { LibraryFileUpload, ImageUpload, DocumentUpload, AvatarUpload } from "@/components/library/file-upload";
import { LibraryTableOfContents, AutoTableOfContents, ScrollspyTableOfContents } from "@/components/library/table-of-contents";
import { LibraryCountdownTimer, EventCountdown, PomodoroTimer } from "@/components/library/countdown-timer";
import { LibraryColorPicker, GradientPicker, ThemePicker } from "@/components/library/color-picker";
import { LibraryStickyNote, StickyNotesBoard, QuickNote } from "@/components/library/sticky-note";
import { LibraryFab, SpeedDialFab, ExtendedFab, CreateFab } from "@/components/library/fab";
import { ChevronLeft, Save, Trash2, Download, Copy, Box, Search, Filter, Star, Settings, Bell, User, Calendar, Clock, MessageCircle, Heart, ThumbsUp, Upload, Menu, FileText, Play } from "lucide-react";

export default function ComponentDetails() {
  const [match, params] = useRoute("/component/:componentName");
  const componentName = params?.componentName;
  
  // State for interactive examples
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [selectedRadio, setSelectedRadio] = useState("");

  // New component states
  const [currentPage, setCurrentPage] = useState(1);
  const [progressValue, setProgressValue] = useState(60);
  const [sliderValue, setSliderValue] = useState(50);
  const [rangeValue, setRangeValue] = useState([20, 80]);

  if (!componentName) {
    return <div>Component not found</div>;
  }

  const componentTitle = componentName === 'search-bar' 
    ? 'Search Bar' 
    : componentName.charAt(0).toUpperCase() + componentName.slice(1);

  const getComponentJSXCode = () => {
    switch (componentName) {
      case "button":
        return `import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function LibraryButton({ 
  variant = "primary", 
  size = "md", 
  loading = false, 
  disabled = false, 
  icon, 
  children, 
  className,
  onClick,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-gray-600", 
    success: "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600"
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm", 
    lg: "h-11 px-6 text-base"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}`;

      case "accordion":
        return `import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function LibraryAccordion({ 
  items, 
  multiple = false, 
  className,
  ...props 
}) {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    
    if (multiple) {
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        newOpenItems.add(index);
      }
    } else {
      if (newOpenItems.has(index)) {
        newOpenItems.clear();
      } else {
        newOpenItems.clear();
        newOpenItems.add(index);
      }
    }
    
    setOpenItems(newOpenItems);
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg mb-2 last:mb-0">
          <button
            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
            onClick={() => toggleItem(index)}
          >
            <span className="font-medium text-gray-900">{item.title}</span>
            <ChevronDown 
              className={cn(
                "h-4 w-4 text-gray-500 transition-transform duration-200",
                openItems.has(index) && "transform rotate-180"
              )}
            />
          </button>
          <div 
            className={cn(
              "overflow-hidden transition-all duration-200 ease-in-out",
              openItems.has(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="px-4 pb-3 text-gray-600">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}`;

      case "carousel":
        return `import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function LibraryCarousel({ 
  items, 
  autoPlay = false, 
  interval = 3000, 
  showDots = true, 
  showArrows = true, 
  className,
  ...props 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, items.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const renderCarouselItem = (item, index) => {
    if (item.type === "image") {
      return (
        <img
          key={index}
          src={item.src}
          alt={item.alt || \`Slide \${index + 1}\`}
          className="w-full h-full object-cover"
        />
      );
    }
    
    return (
      <div key={index} className="w-full h-full flex items-center justify-center bg-gray-100">
        {item.content}
      </div>
    );
  };

  return (
    <div className={cn("relative w-full h-64 overflow-hidden rounded-lg", className)} {...props}>
      {/* Main carousel container */}
      <div 
        className="flex transition-transform duration-300 ease-in-out h-full"
        style={{ transform: \`translateX(-\${currentIndex * 100}%)\` }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            {renderCarouselItem(item, index)}
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {showArrows && items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {showDots && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === currentIndex 
                  ? "bg-white" 
                  : "bg-white/50 hover:bg-white/75"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}`;

      case "container":
        return `import { cn } from "@/lib/utils";

export function LibraryContainer({ 
  layout = "flex", 
  cols = 1, 
  gap = "md", 
  padding = "md", 
  background = "transparent", 
  children, 
  className,
  ...props 
}) {
  const layouts = {
    flex: "flex",
    grid: "grid"
  };

  const gaps = {
    none: "gap-0",
    xs: "gap-1", 
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8"
  };

  const paddings = {
    none: "p-0",
    xs: "p-1",
    sm: "p-2", 
    md: "p-4",
    lg: "p-6",
    xl: "p-8"
  };

  const backgrounds = {
    transparent: "bg-transparent",
    white: "bg-white",
    gray: "bg-gray-50",
    light: "bg-gray-100"
  };

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2", 
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6"
  };

  return (
    <div 
      className={cn(
        layouts[layout],
        layout === "grid" && gridCols[cols],
        gaps[gap],
        paddings[padding],
        backgrounds[background],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}`;

      case "navigation":
        return `import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";

export function LibraryNavigation({ 
  logo, 
  items = [], 
  breadcrumbs = [], 
  className,
  ...props 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={cn("bg-white shadow-sm border-b border-gray-200", className)} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="text-xl font-bold text-gray-900">{logo}</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <div className="py-2 border-t border-gray-100">
            <nav className="flex items-center space-x-1 text-sm text-gray-500">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
                  <span className={index === breadcrumbs.length - 1 ? "text-gray-900 font-medium" : "hover:text-gray-700"}>
                    {crumb}
                  </span>
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}`;

      case "card":
        return `import { cn } from "@/lib/utils";

export function LibraryCard({ 
  variant = "default", 
  title, 
  subtitle, 
  image, 
  actions, 
  children, 
  className,
  onClick,
  ...props 
}) {
  const variants = {
    default: "bg-white border border-gray-200 shadow-sm",
    elevated: "bg-white border border-gray-200 shadow-md",
    outlined: "bg-white border-2 border-gray-300",
    flat: "bg-gray-50 border-0"
  };

  return (
    <div 
      className={cn(
        "rounded-lg overflow-hidden transition-shadow",
        variants[variant],
        onClick && "cursor-pointer hover:shadow-lg",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Image */}
      {image && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={image.src} 
            alt={image.alt || "Card image"} 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        {(title || subtitle) && (
          <div className="mb-4">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-600">{subtitle}</p>
            )}
          </div>
        )}

        {/* Body */}
        {children && (
          <div className="mb-4">{children}</div>
        )}

        {/* Actions */}
        {actions && (
          <div className="flex items-center justify-end space-x-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}`;

      case "search-bar":
        return `import { cn } from "@/lib/utils";
import { useState } from "react";
import { Search, X } from "lucide-react";

export function LibrarySearchBar({ 
  placeholder = "Search...", 
  value, 
  onChange, 
  onSearch, 
  onClear, 
  showClearButton = true, 
  className,
  ...props 
}) {
  const [inputValue, setInputValue] = useState(value || "");

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange && onChange(newValue);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch && onSearch(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    onChange && onChange("");
    onClear && onClear();
  };

  return (
    <form onSubmit={handleSearch} className={cn("relative", className)} {...props}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
        
        {showClearButton && inputValue && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              type="button"
              onClick={handleClear}
              className="h-5 w-5 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </form>
  );
}`;

      case "modal":
        return `import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { X } from "lucide-react";

export function LibraryModal({ 
  isOpen, 
  onClose, 
  title, 
  size = "md", 
  closeOnBackdrop = true, 
  showCloseButton = true, 
  children, 
  className,
  ...props 
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg", 
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4"
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={closeOnBackdrop ? onClose : undefined}
        />

        {/* Modal */}
        <div 
          className={cn(
            "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full",
            sizes[size],
            className
          )}
          {...props}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              {title && (
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModalFooter({ children, className, ...props }) {
  return (
    <div 
      className={cn("flex items-center justify-end space-x-2 px-6 py-4 bg-gray-50 border-t border-gray-200", className)}
      {...props}
    >
      {children}
    </div>
  );
}`;

      case "form":
        return `import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export function LibraryForm({ title, description, children, className, ...props }) {
  return (
    <form className={cn("space-y-6", className)} {...props}>
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}
      {children}
    </form>
  );
}

export function FormField({ children, className, ...props }) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children}
    </div>
  );
}

export function FormLabel({ children, required, className, ...props }) {
  return (
    <label className={cn("block text-sm font-medium text-gray-700", className)} {...props}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

export const Input = forwardRef(function Input({ 
  variant = "default", 
  size = "md", 
  className, 
  ...props 
}, ref) {
  const variants = {
    default: "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
    success: "border-green-300 focus:ring-green-500 focus:border-green-500",
    error: "border-red-300 focus:ring-red-500 focus:border-red-500", 
    warning: "border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500"
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-3 py-2", 
    lg: "px-4 py-3 text-lg"
  };

  return (
    <input
      ref={ref}
      className={cn(
        "block w-full rounded-md border shadow-sm focus:outline-none focus:ring-1",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});

export const Textarea = forwardRef(function Textarea({ 
  className, 
  ...props 
}, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
        className
      )}
      {...props}
    />
  );
});

export const Select = forwardRef(function Select({ 
  children, 
  className, 
  ...props 
}, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

export const Checkbox = forwardRef(function Checkbox({ 
  children, 
  className, 
  ...props 
}, ref) {
  return (
    <label className="flex items-center">
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded",
          className
        )}
        {...props}
      />
      {children && <span className="ml-2 text-sm text-gray-700">{children}</span>}
    </label>
  );
});

export function RadioGroup({ children, className, ...props }) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children}
    </div>
  );
}`;

      case "table":
        return `import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";

export function LibraryTable({
  columns,
  data,
  sortable = false,
  striped = false,
  hoverable = false,
  bordered = false,
  size = "md",
  className,
  onRowClick
}) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const handleSort = (columnKey) => {
    if (!sortable) return;

    if (sortColumn === columnKey) {
      setSortDirection(
        sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc"
      );
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  const sizes = {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base"
  };

  const cellPadding = {
    sm: "px-3 py-2",
    md: "px-4 py-3",
    lg: "px-6 py-4"
  };

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "text-left font-medium text-gray-500 uppercase tracking-wider",
                  cellPadding[size],
                  sizes[size],
                  column.className,
                  (sortable && column.sortable !== false) && "cursor-pointer hover:bg-gray-100 select-none"
                )}
                onClick={() => column.sortable !== false && handleSort(column.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {sortable && column.sortable !== false && (
                    <div className="flex flex-col">
                      <ChevronUp
                        className={cn(
                          "h-3 w-3",
                          sortColumn === column.key && sortDirection === "asc"
                            ? "text-gray-900"
                            : "text-gray-400"
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 -mt-1",
                          sortColumn === column.key && sortDirection === "desc"
                            ? "text-gray-900"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cn("bg-white divide-y divide-gray-200", striped && "divide-gray-100")}>
          {sortedData.map((row, index) => (
            <tr
              key={index}
              className={cn(
                striped && index % 2 === 1 && "bg-gray-50",
                hoverable && "hover:bg-gray-50",
                onRowClick && "cursor-pointer",
                bordered && "border"
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    "text-gray-900 whitespace-nowrap",
                    cellPadding[size],
                    sizes[size],
                    column.className
                  )}
                >
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`;

      case "tabs":
        return `import { cn } from "@/lib/utils";
import { useState } from "react";

export function SimpleTabs({ items }) {
  const [activeTab, setActiveTab] = useState(items[0]?.value || "");

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {items.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === tab.value
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {items.map((tab) => (
          <div
            key={tab.value}
            className={cn("", activeTab === tab.value ? "block" : "hidden")}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}`;

      case "alert":
        return `import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, XCircle, Info, X } from "lucide-react";

export function LibraryAlert({ 
  variant = "info", 
  title, 
  children, 
  dismissible = false, 
  onDismiss, 
  className,
  ...props 
}) {
  const variants = {
    info: {
      container: "bg-blue-50 border-blue-200 text-blue-800",
      icon: "text-blue-400",
      IconComponent: Info
    },
    success: {
      container: "bg-green-50 border-green-200 text-green-800",
      icon: "text-green-400",
      IconComponent: CheckCircle
    },
    warning: {
      container: "bg-yellow-50 border-yellow-200 text-yellow-800",
      icon: "text-yellow-400",
      IconComponent: AlertCircle
    },
    error: {
      container: "bg-red-50 border-red-200 text-red-800",
      icon: "text-red-400",
      IconComponent: XCircle
    }
  };

  const { container, icon, IconComponent } = variants[variant];

  return (
    <div 
      className={cn(
        "border rounded-md p-4",
        container,
        className
      )}
      {...props}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <IconComponent className={cn("h-5 w-5", icon)} />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium mb-1">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onDismiss}
                className={cn(
                  "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  icon,
                  "hover:bg-black hover:bg-opacity-10"
                )}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function SuccessAlert({ children, ...props }) {
  return <LibraryAlert variant="success" {...props}>{children}</LibraryAlert>;
}

export function ErrorAlert({ children, ...props }) {
  return <LibraryAlert variant="error" {...props}>{children}</LibraryAlert>;
}

export function WarningAlert({ children, ...props }) {
  return <LibraryAlert variant="warning" {...props}>{children}</LibraryAlert>;
}

export function InfoAlert({ children, ...props }) {
  return <LibraryAlert variant="info" {...props}>{children}</LibraryAlert>;
}`;

      case "badge":
        return `import { cn } from "@/lib/utils";

export function LibraryBadge({ 
  variant = "primary", 
  size = "sm", 
  children, 
  className,
  ...props 
}) {
  const variants = {
    primary: "bg-blue-100 text-blue-800 border-blue-200",
    secondary: "bg-gray-100 text-gray-800 border-gray-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    error: "bg-red-100 text-red-800 border-red-200",
    info: "bg-cyan-100 text-cyan-800 border-cyan-200",
    light: "bg-white text-gray-800 border-gray-300",
    dark: "bg-gray-800 text-white border-gray-700"
  };

  const sizes = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-3 py-1.5 text-sm"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function SuccessBadge({ children, ...props }) {
  return <LibraryBadge variant="success" {...props}>{children}</LibraryBadge>;
}

export function WarningBadge({ children, ...props }) {
  return <LibraryBadge variant="warning" {...props}>{children}</LibraryBadge>;
}

export function ErrorBadge({ children, ...props }) {
  return <LibraryBadge variant="error" {...props}>{children}</LibraryBadge>;
}

export function InfoBadge({ children, ...props }) {
  return <LibraryBadge variant="info" {...props}>{children}</LibraryBadge>;
}`;

      case "breadcrumb":
        return `import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";

export function LibraryBreadcrumb({ 
  items = [], 
  showHome = true, 
  separator = "chevron", 
  className,
  ...props 
}) {
  const separators = {
    chevron: <ChevronRight className="h-4 w-4 text-gray-400" />,
    slash: <span className="text-gray-400">/</span>,
    arrow: <span className="text-gray-400">→</span>
  };

  const allItems = showHome ? [{ label: "Home", href: "/" }, ...items] : items;

  return (
    <nav className={cn("flex items-center space-x-1 text-sm text-gray-500", className)} {...props}>
      {allItems.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <div className="mx-2">{separators[separator]}</div>
          )}
          {index === 0 && showHome ? (
            <div className="flex items-center">
              <Home className="h-4 w-4 mr-1" />
              {item.href ? (
                <a 
                  href={item.href} 
                  className="hover:text-gray-700 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
            </div>
          ) : (
            <div className={cn(
              index === allItems.length - 1 
                ? "text-gray-900 font-medium" 
                : "hover:text-gray-700"
            )}>
              {item.href && index < allItems.length - 1 ? (
                <a href={item.href} className="transition-colors">
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}`;

      case "pagination":
        return `import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export function LibraryPagination({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange, 
  showFirst = true, 
  showLast = true, 
  showPrevNext = true, 
  siblingCount = 1, 
  className,
  ...props 
}) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - siblingCount);
    const endPage = Math.min(totalPages, currentPage + siblingCount);

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("ellipsis-start");
      }
    }

    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className={cn("flex items-center justify-center space-x-1", className)} {...props}>
      {/* Previous Button */}
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </button>
      )}

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) => {
          if (typeof page === "string") {
            return (
              <div key={index} className="px-3 py-2">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </div>
            );
          }

          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={cn(
                "px-3 py-2 text-sm border rounded-md transition-colors",
                page === currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center px-3 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      )}
    </nav>
  );
}`;

      case "progress":
        return `import { cn } from "@/lib/utils";

export function LibraryProgress({ 
  value = 0, 
  max = 100, 
  variant = "default", 
  size = "md", 
  showLabel = false, 
  label, 
  className,
  ...props 
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variants = {
    default: "bg-blue-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    error: "bg-red-600",
    info: "bg-cyan-600"
  };

  const sizes = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
    xl: "h-4"
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {label || "Progress"}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div className={cn("w-full bg-gray-200 rounded-full", sizes[size])}>
        <div
          className={cn(
            "rounded-full transition-all duration-300 ease-in-out",
            variants[variant],
            sizes[size]
          )}
          style={{ width: \`\${percentage}%\` }}
        />
      </div>
    </div>
  );
}

export function CircularProgress({ 
  value = 0, 
  max = 100, 
  size = 64, 
  strokeWidth = 4, 
  variant = "default", 
  showLabel = true, 
  className,
  ...props 
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const variants = {
    default: "stroke-blue-600",
    success: "stroke-green-600",
    warning: "stroke-yellow-600",
    error: "stroke-red-600",
    info: "stroke-cyan-600"
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} {...props}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn("transition-all duration-300 ease-in-out", variants[variant])}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-900">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}`;

      case "slider":
        return `import { cn } from "@/lib/utils";
import { useState, useRef, useCallback } from "react";

export function LibrarySlider({ 
  value = 0, 
  min = 0, 
  max = 100, 
  step = 1, 
  onChange, 
  onChangeCommitted, 
  disabled = false, 
  showValue = false, 
  showMarks = false, 
  marks = [], 
  className,
  ...props 
}) {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const updateValue = useCallback((clientX) => {
    if (!sliderRef.current || disabled) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const newValue = min + (percentage / 100) * (max - min);
    const steppedValue = Math.round(newValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));

    onChange?.(clampedValue);
  }, [min, max, step, onChange, disabled]);

  const handleMouseDown = (e) => {
    if (disabled) return;
    setIsDragging(true);
    updateValue(e.clientX);
  };

  const handleMouseMove = useCallback((e) => {
    if (isDragging && !disabled) {
      updateValue(e.clientX);
    }
  }, [isDragging, updateValue, disabled]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onChangeCommitted?.(value);
    }
  }, [isDragging, onChangeCommitted, value]);

  // Add global mouse events
  useState(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className={cn("w-full", className)} {...props}>
      {showValue && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Value</span>
          <span className="text-sm font-medium text-gray-900">{value}</span>
        </div>
      )}
      
      <div className="relative">
        {/* Track */}
        <div
          ref={sliderRef}
          className={cn(
            "relative h-2 bg-gray-200 rounded-full cursor-pointer",
            disabled && "cursor-not-allowed opacity-50"
          )}
          onMouseDown={handleMouseDown}
        >
          {/* Fill */}
          <div
            className="absolute h-full bg-blue-600 rounded-full"
            style={{ width: \`\${percentage}%\` }}
          />
          
          {/* Thumb */}
          <div
            className={cn(
              "absolute w-5 h-5 bg-white border-2 border-blue-600 rounded-full shadow transform -translate-y-1/2 -translate-x-1/2 transition-transform",
              isDragging && "scale-110",
              disabled && "cursor-not-allowed"
            )}
            style={{ left: \`\${percentage}%\`, top: "50%" }}
          />
        </div>
        
        {/* Marks */}
        {showMarks && marks.length > 0 && (
          <div className="relative mt-2">
            {marks.map((mark) => {
              const markPercentage = ((mark.value - min) / (max - min)) * 100;
              return (
                <div
                  key={mark.value}
                  className="absolute transform -translate-x-1/2"
                  style={{ left: \`\${markPercentage}%\` }}
                >
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  {mark.label && (
                    <span className="text-xs text-gray-500 mt-1 block text-center">
                      {mark.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}`;

      case "tooltip":
        return `import { cn } from "@/lib/utils";
import { useState } from "react";

export function LibraryTooltip({ 
  content, 
  placement = "top", 
  trigger = "hover", 
  delay = 0, 
  children, 
  className,
  ...props 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const showTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    
    if (delay > 0) {
      const id = setTimeout(() => setIsVisible(true), delay);
      setTimeoutId(id);
    } else {
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const toggleTooltip = () => {
    if (isVisible) {
      hideTooltip();
    } else {
      showTooltip();
    }
  };

  const placements = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2"
  };

  const arrows = {
    top: "top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900",
    bottom: "bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900",
    left: "left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-gray-900",
    right: "right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900"
  };

  const triggerProps = {
    ...(trigger === "hover" && {
      onMouseEnter: showTooltip,
      onMouseLeave: hideTooltip
    }),
    ...(trigger === "click" && {
      onClick: toggleTooltip
    }),
    ...(trigger === "focus" && {
      onFocus: showTooltip,
      onBlur: hideTooltip
    })
  };

  return (
    <div className="relative inline-block" {...props}>
      <div {...triggerProps}>
        {children}
      </div>
      
      {isVisible && content && (
        <div
          className={cn(
            "absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg whitespace-nowrap",
            placements[placement],
            className
          )}
        >
          {content}
          <div className={cn("absolute w-0 h-0", arrows[placement])} />
        </div>
      )}
    </div>
  );
}`;

      case "avatar":
        return `import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export function LibraryAvatar({ 
  src, 
  alt, 
  fallback, 
  size = "md", 
  variant = "circular", 
  status, 
  className,
  onClick,
  ...props 
}) {
  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
    "2xl": "w-20 h-20 text-2xl"
  };

  const variants = {
    circular: "rounded-full",
    rounded: "rounded-lg",
    square: "rounded-none"
  };

  const statusColors = {
    online: "bg-green-400",
    offline: "bg-gray-400",
    away: "bg-yellow-400",
    busy: "bg-red-400"
  };

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const statusSize = {
    xs: "w-1.5 h-1.5",
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
    xl: "w-3.5 h-3.5",
    "2xl": "w-4 h-4"
  };

  return (
    <div className="relative inline-block" {...props}>
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 text-gray-600 font-medium overflow-hidden",
          sizes[size],
          variants[variant],
          onClick && "cursor-pointer hover:opacity-80 transition-opacity",
          className
        )}
        onClick={onClick}
      >
        {src ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : fallback ? (
          <span>{getInitials(fallback)}</span>
        ) : (
          <User className={cn("w-1/2 h-1/2")} />
        )}
      </div>
      
      {status && (
        <div
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-white",
            statusColors[status],
            statusSize[size]
          )}
        />
      )}
    </div>
  );
}

export function AvatarGroup({ children, max = 5, size = "md", className, ...props }) {
  const avatars = Array.isArray(children) ? children : [children];
  const visibleAvatars = avatars.slice(0, max);
  const hiddenCount = avatars.length - max;

  const spacing = {
    xs: "-ml-1",
    sm: "-ml-1.5",
    md: "-ml-2",
    lg: "-ml-2.5",
    xl: "-ml-3",
    "2xl": "-ml-4"
  };

  return (
    <div className={cn("flex items-center", className)} {...props}>
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className={cn(index > 0 && spacing[size], "relative")}
          style={{ zIndex: visibleAvatars.length - index }}
        >
          {avatar}
        </div>
      ))}
      
      {hiddenCount > 0 && (
        <div className={cn("relative", spacing[size])}>
          <LibraryAvatar
            size={size}
            fallback={\`+\${hiddenCount}\`}
            className="bg-gray-200 text-gray-600 border-2 border-white"
          />
        </div>
      )}
    </div>
  );
}`;

      case "dropdown":
        return `import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export function LibraryDropdown({ 
  options = [], 
  value, 
  onChange, 
  placeholder = "Select an option", 
  disabled = false, 
  searchable = false, 
  multiple = false, 
  size = "md", 
  className,
  ...props 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-3 py-2",
    lg: "px-4 py-3 text-lg"
  };

  const filteredOptions = searchable 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOptions = multiple 
    ? (Array.isArray(value) ? value : [])
    : value;

  const isSelected = (option) => {
    if (multiple) {
      return selectedOptions.includes(option.value);
    }
    return value === option.value;
  };

  const handleSelect = (option) => {
    if (multiple) {
      const newSelected = isSelected(option)
        ? selectedOptions.filter(v => v !== option.value)
        : [...selectedOptions, option.value];
      onChange?.(newSelected);
    } else {
      onChange?.(option.value);
      setIsOpen(false);
    }
  };

  const getDisplayText = () => {
    if (multiple) {
      if (selectedOptions.length === 0) return placeholder;
      if (selectedOptions.length === 1) {
        const selected = options.find(opt => opt.value === selectedOptions[0]);
        return selected?.label || placeholder;
      }
      return \`\${selectedOptions.length} selected\`;
    }
    
    const selected = options.find(opt => opt.value === value);
    return selected?.label || placeholder;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={cn("relative", className)} {...props}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full flex items-center justify-between bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500",
          sizes[size],
          disabled && "bg-gray-50 cursor-not-allowed",
          isOpen && "ring-1 ring-blue-500 border-blue-500"
        )}
      >
        <span className={cn("truncate", !value && "text-gray-500")}>
          {getDisplayText()}
        </span>
        <ChevronDown 
          className={cn(
            "h-4 w-4 text-gray-400 transition-transform",
            isOpen && "transform rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {searchable && (
            <div className="p-2 border-b border-gray-100">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search options..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          )}
          
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between",
                    isSelected(option) && "bg-blue-50 text-blue-600"
                  )}
                >
                  <span>{option.label}</span>
                  {isSelected(option) && <Check className="h-4 w-4" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}`;

      case "stepper":
        return `import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

export function LibraryStepper({ 
  steps = [], 
  currentStep = 0, 
  orientation = "horizontal", 
  size = "md", 
  showLabels = true, 
  showDescription = false, 
  className,
  ...props 
}) {
  const sizes = {
    sm: {
      circle: "w-6 h-6 text-xs",
      line: "h-0.5",
      spacing: orientation === "horizontal" ? "space-x-4" : "space-y-4"
    },
    md: {
      circle: "w-8 h-8 text-sm",
      line: "h-1",
      spacing: orientation === "horizontal" ? "space-x-6" : "space-y-6"
    },
    lg: {
      circle: "w-10 h-10 text-base",
      line: "h-1.5",
      spacing: orientation === "horizontal" ? "space-x-8" : "space-y-8"
    }
  };

  const getStepStatus = (index) => {
    if (index < currentStep) return "completed";
    if (index === currentStep) return "current";
    return "upcoming";
  };

  const getStepClasses = (status) => {
    switch (status) {
      case "completed":
        return "bg-blue-600 text-white border-blue-600";
      case "current":
        return "bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200";
      case "upcoming":
        return "bg-white text-gray-400 border-gray-300";
      case "error":
        return "bg-red-600 text-white border-red-600";
      default:
        return "bg-white text-gray-400 border-gray-300";
    }
  };

  const renderStepContent = (step, index) => {
    const status = step.status || getStepStatus(index);
    
    return (
      <div className={cn(
        "flex items-center",
        orientation === "vertical" && "flex-col text-center"
      )}>
        {/* Step Circle */}
        <div className={cn(
          "flex items-center justify-center rounded-full border-2 font-medium",
          sizes[size].circle,
          getStepClasses(status)
        )}>
          {status === "completed" ? (
            <Check className="w-1/2 h-1/2" />
          ) : status === "error" ? (
            <X className="w-1/2 h-1/2" />
          ) : (
            <span>{index + 1}</span>
          )}
        </div>

        {/* Step Label and Description */}
        {(showLabels || showDescription) && (
          <div className={cn(
            orientation === "horizontal" ? "ml-3" : "mt-2"
          )}>
            {showLabels && (
              <div className={cn(
                "text-sm font-medium",
                status === "current" ? "text-blue-600" : "text-gray-700"
              )}>
                {step.label}
              </div>
            )}
            {showDescription && step.description && (
              <div className="text-xs text-gray-500 mt-1">
                {step.description}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  if (orientation === "vertical") {
    return (
      <div className={cn("flex flex-col", sizes[size].spacing, className)} {...props}>
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {renderStepContent(step, index)}
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={cn(
                "absolute left-1/2 transform -translate-x-1/2 bg-gray-300",
                sizes[size].line,
                "w-px h-8 mt-2"
              )} />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", sizes[size].spacing, className)} {...props}>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          {renderStepContent(step, index)}
          
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className={cn(
              "flex-1 bg-gray-300 mx-4",
              sizes[size].line
            )} />
          )}
        </div>
      ))}
    </div>
  );
}`;

      case "chip":
        return `import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function LibraryChip({ 
  children, 
  variant = "default", 
  size = "md", 
  deletable = false, 
  disabled = false, 
  selected = false, 
  onClick, 
  onDelete, 
  icon, 
  avatar, 
  className,
  ...props 
}) {
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    primary: "bg-blue-100 text-blue-800 border-blue-200",
    secondary: "bg-gray-100 text-gray-600 border-gray-300",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    error: "bg-red-100 text-red-800 border-red-200",
    outlined: "bg-white text-gray-700 border-gray-300"
  };

  const selectedVariants = {
    default: "bg-blue-600 text-white border-blue-600",
    primary: "bg-blue-600 text-white border-blue-600",
    secondary: "bg-gray-600 text-white border-gray-600",
    success: "bg-green-600 text-white border-green-600",
    warning: "bg-yellow-600 text-white border-yellow-600",
    error: "bg-red-600 text-white border-red-600",
    outlined: "bg-blue-600 text-white border-blue-600"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base"
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  const avatarSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const handleClick = (e) => {
    if (disabled) return;
    onClick?.(e);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (disabled) return;
    onDelete?.(e);
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border transition-colors",
        selected ? selectedVariants[variant] : variants[variant],
        sizes[size],
        onClick && !disabled && "cursor-pointer hover:opacity-80",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {/* Avatar */}
      {avatar && (
        <img
          src={avatar.src}
          alt={avatar.alt || ""}
          className={cn("rounded-full mr-1", avatarSizes[size])}
        />
      )}
      
      {/* Icon */}
      {icon && !avatar && (
        <span className={cn("mr-1", iconSizes[size])}>
          {icon}
        </span>
      )}
      
      {/* Content */}
      <span>{children}</span>
      
      {/* Delete Button */}
      {deletable && (
        <button
          onClick={handleDelete}
          disabled={disabled}
          className={cn(
            "ml-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors",
            "focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500",
            disabled && "cursor-not-allowed"
          )}
        >
          <X className={cn(iconSizes[size])} />
        </button>
      )}
    </span>
  );
}

export function ChipGroup({ children, spacing = "sm", className, ...props }) {
  const spacings = {
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4"
  };

  return (
    <div className={cn("flex flex-wrap", spacings[spacing], className)} {...props}>
      {children}
    </div>
  );
}`;

      case "timeline":
        return `import { cn } from "@/lib/utils";
import { Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";

export function LibraryTimeline({ 
  items = [], 
  variant = "default", 
  size = "md", 
  showTime = true, 
  className,
  ...props 
}) {
  const sizes = {
    sm: {
      dot: "w-2 h-2",
      line: "w-0.5",
      spacing: "space-y-4",
      text: "text-sm"
    },
    md: {
      dot: "w-3 h-3",
      line: "w-0.5",
      spacing: "space-y-6",
      text: "text-base"
    },
    lg: {
      dot: "w-4 h-4",
      line: "w-1",
      spacing: "space-y-8",
      text: "text-lg"
    }
  };

  const variants = {
    default: "bg-blue-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    error: "bg-red-600",
    info: "bg-cyan-600"
  };

  const getIcon = (item) => {
    const iconProps = { className: "w-4 h-4 text-white" };
    
    switch (item.type) {
      case "success":
        return <CheckCircle {...iconProps} />;
      case "warning":
        return <AlertCircle {...iconProps} />;
      case "error":
        return <XCircle {...iconProps} />;
      case "info":
        return <Clock {...iconProps} />;
      default:
        return item.icon || null;
    }
  };

  const getDotColor = (item) => {
    if (item.type) {
      return variants[item.type] || variants.default;
    }
    return item.color || variants[variant];
  };

  return (
    <div className={cn("relative", className)} {...props}>
      <div className={cn("space-y-6", sizes[size].spacing)}>
        {items.map((item, index) => (
          <div key={index} className="relative flex items-start">
            {/* Timeline Line */}
            {index < items.length - 1 && (
              <div 
                className={cn(
                  "absolute top-6 left-3 bg-gray-300 transform -translate-x-1/2",
                  sizes[size].line,
                  "h-full"
                )}
              />
            )}
            
            {/* Timeline Dot/Icon */}
            <div className="relative flex-shrink-0 mr-4">
              {item.icon || item.type ? (
                <div className={cn(
                  "flex items-center justify-center w-6 h-6 rounded-full",
                  getDotColor(item)
                )}>
                  {getIcon(item)}
                </div>
              ) : (
                <div className={cn(
                  "rounded-full",
                  sizes[size].dot,
                  getDotColor(item)
                )} />
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className={cn("font-medium text-gray-900", sizes[size].text)}>
                  {item.title}
                </h3>
                {showTime && item.time && (
                  <time className="text-sm text-gray-500 flex-shrink-0 ml-4">
                    {item.time}
                  </time>
                )}
              </div>
              
              {item.description && (
                <p className="mt-1 text-gray-600 text-sm">
                  {item.description}
                </p>
              )}
              
              {item.content && (
                <div className="mt-2">
                  {item.content}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TimelineItem({ 
  title, 
  description, 
  time, 
  type, 
  icon, 
  color, 
  content, 
  children 
}) {
  return {
    title,
    description,
    time,
    type,
    icon,
    color,
    content: content || children
  };
}`;

      case "spinner":
        return `import { cn } from "@/lib/utils";

export function LibrarySpinner({ 
  size = "md", 
  variant = "primary", 
  speed = "normal", 
  className,
  ...props 
}) {
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  const variants = {
    primary: "border-blue-600",
    secondary: "border-gray-600",
    success: "border-green-600",
    warning: "border-yellow-600",
    error: "border-red-600"
  };

  const speeds = {
    slow: "animate-spin duration-1000",
    normal: "animate-spin",
    fast: "animate-spin duration-500"
  };

  return (
    <div
      className={cn(
        "inline-block border-2 border-solid border-current border-r-transparent rounded-full",
        sizes[size],
        variants[variant],
        speeds[speed],
        className
      )}
      {...props}
    />
  );
}

export function DotSpinner({ 
  size = "md", 
  variant = "primary", 
  className,
  ...props 
}) {
  const sizes = {
    xs: "w-1 h-1",
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
    xl: "w-4 h-4"
  };

  const variants = {
    primary: "bg-blue-600",
    secondary: "bg-gray-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    error: "bg-red-600"
  };

  return (
    <div className={cn("flex space-x-1", className)} {...props}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full animate-bounce",
            sizes[size],
            variants[variant]
          )}
          style={{
            animationDelay: \`\${i * 0.1}s\`,
            animationDuration: "0.6s"
          }}
        />
      ))}
    </div>
  );
}`;

      case "calendar":
        return `import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function LibraryCalendar({ 
  value, 
  onChange, 
  minDate, 
  maxDate, 
  disabled = false, 
  showToday = true, 
  showWeekNumbers = false, 
  className,
  ...props 
}) {
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value.getFullYear(), value.getMonth(), 1) : new Date()
  );

  const today = new Date();
  const selectedDate = value ? new Date(value) : null;

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }

    // Add empty cells for days after the last day of the month
    const remainingCells = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingCells; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }

    return days;
  };

  const isDateDisabled = (date) => {
    if (disabled) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isToday = (date) => {
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const handleDateClick = (date) => {
    if (isDateDisabled(date)) return;
    onChange?.(date);
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className={cn("bg-white border border-gray-200 rounded-lg shadow-sm p-4", className)} {...props}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <h2 className="text-lg font-semibold">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        
        <button
          onClick={() => navigateMonth(1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(day.date)}
            disabled={isDateDisabled(day.date)}
            className={cn(
              "w-8 h-8 text-sm rounded transition-colors",
              day.isCurrentMonth 
                ? "text-gray-900 hover:bg-blue-50" 
                : "text-gray-400",
              isSelected(day.date) && "bg-blue-600 text-white hover:bg-blue-700",
              isToday(day.date) && !isSelected(day.date) && "bg-blue-100 text-blue-600",
              isDateDisabled(day.date) && "cursor-not-allowed opacity-50"
            )}
          >
            {day.date.getDate()}
          </button>
        ))}
      </div>

      {/* Today button */}
      {showToday && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={() => handleDateClick(today)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Today
          </button>
        </div>
      )}
    </div>
  );
}`;

      case "rating":
        return `import { cn } from "@/lib/utils";
import { useState } from "react";
import { Star } from "lucide-react";

export function LibraryRating({ 
  value = 0, 
  max = 5, 
  onChange, 
  readonly = false, 
  disabled = false, 
  size = "md", 
  precision = 1, 
  showValue = false, 
  emptyIcon, 
  filledIcon, 
  className,
  ...props 
}) {
  const [hoverValue, setHoverValue] = useState(0);

  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };

  const handleMouseEnter = (rating) => {
    if (readonly || disabled) return;
    setHoverValue(rating);
  };

  const handleMouseLeave = () => {
    if (readonly || disabled) return;
    setHoverValue(0);
  };

  const handleClick = (rating) => {
    if (readonly || disabled) return;
    onChange?.(rating);
  };

  const getStarValue = (index) => {
    const starValue = index + 1;
    const currentValue = hoverValue || value;
    
    if (precision === 0.5) {
      return currentValue >= starValue ? 1 : currentValue >= starValue - 0.5 ? 0.5 : 0;
    }
    
    return currentValue >= starValue ? 1 : 0;
  };

  const renderStar = (index) => {
    const starValue = getStarValue(index);
    const rating = index + 1;
    
    return (
      <button
        key={index}
        type="button"
        onClick={() => handleClick(rating)}
        onMouseEnter={() => handleMouseEnter(rating)}
        onMouseLeave={handleMouseLeave}
        disabled={disabled}
        className={cn(
          "relative transition-colors focus:outline-none",
          !readonly && !disabled && "hover:scale-110 transform transition-transform",
          disabled && "cursor-not-allowed opacity-50",
          readonly && "cursor-default"
        )}
      >
        {/* Empty star */}
        <div className={cn("text-gray-300", sizes[size])}>
          {emptyIcon || <Star className="w-full h-full" />}
        </div>
        
        {/* Filled star */}
        {starValue > 0 && (
          <div 
            className={cn(
              "absolute inset-0 text-yellow-400 overflow-hidden",
              sizes[size]
            )}
            style={{ width: \`\${starValue * 100}%\` }}
          >
            {filledIcon || <Star className="w-full h-full fill-current" />}
          </div>
        )}
      </button>
    );
  };

  return (
    <div className={cn("flex items-center", className)} {...props}>
      <div className="flex">
        {Array.from({ length: max }, (_, index) => renderStar(index))}
      </div>
      
      {showValue && (
        <span className="ml-2 text-sm text-gray-600">
          {value.toFixed(precision === 0.5 ? 1 : 0)}/{max}
        </span>
      )}
    </div>
  );
}`;

      case "toast":
        return `import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, XCircle, Info, X } from "lucide-react";

export function LibraryToast({ 
  message, 
  variant = "info", 
  duration = 5000, 
  position = "top-right", 
  showIcon = true, 
  closable = true, 
  onClose, 
  className,
  ...props 
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const variants = {
    info: {
      container: "bg-blue-50 border-blue-200 text-blue-800",
      icon: "text-blue-400",
      IconComponent: Info
    },
    success: {
      container: "bg-green-50 border-green-200 text-green-800",
      icon: "text-green-400",
      IconComponent: CheckCircle
    },
    warning: {
      container: "bg-yellow-50 border-yellow-200 text-yellow-800",
      icon: "text-yellow-400",
      IconComponent: AlertCircle
    },
    error: {
      container: "bg-red-50 border-red-200 text-red-800",
      icon: "text-red-400",
      IconComponent: XCircle
    }
  };

  const positions = {
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
    "bottom-right": "bottom-4 right-4"
  };

  const { container, icon, IconComponent } = variants[variant];

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed z-50 max-w-sm w-full pointer-events-auto",
        positions[position]
      )}
    >
      <div
        className={cn(
          "flex items-center p-4 border rounded-lg shadow-lg",
          container,
          className
        )}
        {...props}
      >
        {showIcon && IconComponent && (
          <div className="flex-shrink-0 mr-3">
            <IconComponent className={cn("h-5 w-5", icon)} />
          </div>
        )}
        
        <div className="flex-1 text-sm font-medium">
          {message}
        </div>
        
        {closable && (
          <button
            onClick={() => {
              setIsVisible(false);
              onClose?.();
            }}
            className={cn(
              "flex-shrink-0 ml-3 rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
              icon,
              "hover:bg-black hover:bg-opacity-10"
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now();
    setToasts(prev => [...prev, { ...toast, id }]);
    
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return {
    toasts,
    addToast,
    removeToast,
    success: (message, options) => addToast({ message, variant: "success", ...options }),
    error: (message, options) => addToast({ message, variant: "error", ...options }),
    warning: (message, options) => addToast({ message, variant: "warning", ...options }),
    info: (message, options) => addToast({ message, variant: "info", ...options })
  };
}`;

      case "collapse":
        return `import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function LibraryCollapse({ 
  title, 
  children, 
  defaultOpen = false, 
  disabled = false, 
  showIcon = true, 
  size = "md", 
  variant = "default", 
  className,
  ...props 
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const sizes = {
    sm: "text-sm p-3",
    md: "text-base p-4",
    lg: "text-lg p-5"
  };

  const variants = {
    default: "border border-gray-200 rounded-lg",
    outlined: "border-2 border-gray-300 rounded-lg",
    flat: "bg-gray-50 rounded-lg",
    minimal: ""
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={cn("overflow-hidden", variants[variant], className)} {...props}>
      <button
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "w-full flex items-center justify-between text-left font-medium transition-colors",
          sizes[size],
          disabled 
            ? "cursor-not-allowed opacity-50" 
            : "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        )}
      >
        <span>{title}</span>
        {showIcon && (
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen && "transform rotate-180"
            )}
          />
        )}
      </button>
      
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className={cn("border-t border-gray-200", sizes[size])}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function CollapseGroup({ children, accordion = false, className, ...props }) {
  const [openIndex, setOpenIndex] = useState(-1);

  const handleToggle = (index) => {
    if (accordion) {
      setOpenIndex(openIndex === index ? -1 : index);
    }
  };

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.isArray(children) 
        ? children.map((child, index) => (
            <div key={index} onClick={() => handleToggle(index)}>
              {child}
            </div>
          ))
        : children
      }
    </div>
  );
}`;

      case "divider":
        return `import { cn } from "@/lib/utils";

export function LibraryDivider({ 
  orientation = "horizontal", 
  variant = "solid", 
  size = "md", 
  children, 
  className,
  ...props 
}) {
  const orientations = {
    horizontal: "w-full h-px",
    vertical: "w-px h-full"
  };

  const variants = {
    solid: "bg-gray-200",
    dashed: "border-dashed border-gray-300 border-t",
    dotted: "border-dotted border-gray-300 border-t"
  };

  const sizes = {
    sm: orientation === "horizontal" ? "my-2" : "mx-2",
    md: orientation === "horizontal" ? "my-4" : "mx-4",
    lg: orientation === "horizontal" ? "my-6" : "mx-6",
    xl: orientation === "horizontal" ? "my-8" : "mx-8"
  };

  if (children) {
    return (
      <div className={cn("flex items-center", sizes[size], className)} {...props}>
        <div className={cn("flex-1", orientations[orientation], variants[variant])} />
        <div className="px-4 text-sm text-gray-500 font-medium">
          {children}
        </div>
        <div className={cn("flex-1", orientations[orientation], variants[variant])} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        orientations[orientation],
        variant === "solid" ? variants[variant] : "",
        variant !== "solid" && variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}`;

      case "list":
        return `import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export function LibraryList({ 
  items = [], 
  variant = "default", 
  size = "md", 
  divider = true, 
  clickable = false, 
  onItemClick, 
  className,
  ...props 
}) {
  const variants = {
    default: "bg-white border border-gray-200",
    flat: "bg-gray-50",
    minimal: ""
  };

  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  const itemSizes = {
    sm: "py-2 px-3",
    md: "py-3 px-4",
    lg: "py-4 px-5"
  };

  return (
    <div className={cn("rounded-lg overflow-hidden", variants[variant], className)} {...props}>
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => clickable && onItemClick?.(item, index)}
          className={cn(
            "flex items-center justify-between",
            itemSizes[size],
            sizes[size],
            clickable && "cursor-pointer hover:bg-gray-50 transition-colors",
            divider && index < items.length - 1 && "border-b border-gray-200"
          )}
        >
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* Avatar/Icon */}
            {item.avatar && (
              <img
                src={item.avatar.src}
                alt={item.avatar.alt || ""}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
            )}
            {item.icon && !item.avatar && (
              <div className="text-gray-400 flex-shrink-0">
                {item.icon}
              </div>
            )}
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 truncate">
                {item.title}
              </div>
              {item.subtitle && (
                <div className="text-sm text-gray-500 truncate">
                  {item.subtitle}
                </div>
              )}
            </div>
          </div>
          
          {/* Secondary action/content */}
          {item.secondaryAction && (
            <div className="flex-shrink-0 ml-3">
              {item.secondaryAction}
            </div>
          )}
          
          {/* Meta info */}
          {item.meta && (
            <div className="text-sm text-gray-500 flex-shrink-0 ml-3">
              {item.meta}
            </div>
          )}
          
          {/* Chevron for clickable items */}
          {clickable && (
            <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
          )}
        </div>
      ))}
    </div>
  );
}

export function ListItem({ 
  title, 
  subtitle, 
  avatar, 
  icon, 
  meta, 
  secondaryAction, 
  onClick, 
  className,
  ...props 
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-between py-3 px-4",
        onClick && "cursor-pointer hover:bg-gray-50 transition-colors",
        className
      )}
      {...props}
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        {avatar && (
          <img
            src={avatar.src}
            alt={avatar.alt || ""}
            className="w-8 h-8 rounded-full flex-shrink-0"
          />
        )}
        {icon && !avatar && (
          <div className="text-gray-400 flex-shrink-0">
            {icon}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-900 truncate">
            {title}
          </div>
          {subtitle && (
            <div className="text-sm text-gray-500 truncate">
              {subtitle}
            </div>
          )}
        </div>
      </div>
      
      {secondaryAction && (
        <div className="flex-shrink-0 ml-3">
          {secondaryAction}
        </div>
      )}
      
      {meta && (
        <div className="text-sm text-gray-500 flex-shrink-0 ml-3">
          {meta}
        </div>
      )}
      
      {onClick && (
        <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
      )}
    </div>
  );
}`;

      case "snackbar":
        return `import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, XCircle, Info, X } from "lucide-react";

export function LibrarySnackbar({ 
  message, 
  action, 
  variant = "default", 
  duration = 4000, 
  position = "bottom-center", 
  showIcon = false, 
  closable = true, 
  onClose, 
  className,
  ...props 
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const variants = {
    default: "bg-gray-900 text-white",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-blue-600 text-white"
  };

  const icons = {
    success: CheckCircle,
    warning: AlertCircle,
    error: XCircle,
    info: Info
  };

  const positions = {
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
    "bottom-right": "bottom-4 right-4"
  };

  const IconComponent = icons[variant];

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed z-50 max-w-sm pointer-events-auto",
        positions[position]
      )}
    >
      <div
        className={cn(
          "flex items-center p-4 rounded-lg shadow-lg",
          variants[variant],
          className
        )}
        {...props}
      >
        {showIcon && IconComponent && (
          <IconComponent className="h-5 w-5 mr-3 flex-shrink-0" />
        )}
        
        <div className="flex-1 text-sm font-medium mr-3">
          {message}
        </div>
        
        {action && (
          <div className="flex-shrink-0 mr-3">
            {action}
          </div>
        )}
        
        {closable && (
          <button
            onClick={() => {
              setIsVisible(false);
              onClose?.();
            }}
            className="flex-shrink-0 p-1 rounded hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export function useSnackbar() {
  const [snackbars, setSnackbars] = useState([]);

  const addSnackbar = (snackbar) => {
    const id = Date.now();
    setSnackbars(prev => [...prev, { ...snackbar, id }]);
    
    if (snackbar.duration !== 0) {
      setTimeout(() => {
        removeSnackbar(id);
      }, snackbar.duration || 4000);
    }
  };

  const removeSnackbar = (id) => {
    setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id));
  };

  return {
    snackbars,
    addSnackbar,
    removeSnackbar,
    show: (message, options) => addSnackbar({ message, ...options }),
    success: (message, options) => addSnackbar({ message, variant: "success", ...options }),
    error: (message, options) => addSnackbar({ message, variant: "error", ...options }),
    warning: (message, options) => addSnackbar({ message, variant: "warning", ...options }),
    info: (message, options) => addSnackbar({ message, variant: "info", ...options })
  };
}`;

      case "switch":
        return `import { cn } from "@/lib/utils";

export function LibrarySwitch({ 
  checked = false, 
  onChange, 
  disabled = false, 
  size = "md", 
  color = "blue", 
  label, 
  description, 
  className,
  ...props 
}) {
  const sizes = {
    sm: {
      switch: "w-8 h-5",
      thumb: "w-3 h-3",
      translate: "translate-x-3"
    },
    md: {
      switch: "w-11 h-6",
      thumb: "w-4 h-4",
      translate: "translate-x-5"
    },
    lg: {
      switch: "w-14 h-7",
      thumb: "w-5 h-5",
      translate: "translate-x-7"
    }
  };

  const colors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    red: "bg-red-600",
    yellow: "bg-yellow-600",
    purple: "bg-purple-600",
    gray: "bg-gray-600"
  };

  const handleToggle = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  const switchElement = (
    <button
      type="button"
      onClick={handleToggle}
      disabled={disabled}
      className={cn(
        "relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        sizes[size].switch,
        checked ? colors[color] : "bg-gray-200",
        disabled && "opacity-50 cursor-not-allowed"
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200",
          sizes[size].thumb,
          checked ? sizes[size].translate : "translate-x-0"
        )}
      />
    </button>
  );

  if (label || description) {
    return (
      <div className={cn("flex items-start", className)}>
        <div className="flex-shrink-0 mt-1">
          {switchElement}
        </div>
        <div className="ml-3">
          {label && (
            <label className={cn(
              "text-sm font-medium text-gray-900",
              disabled && "opacity-50"
            )}>
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
      </div>
    );
  }

  return (
    <div className={className}>
      {switchElement}
    </div>
  );
}`;

      case "drawer":
        return `import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { X } from "lucide-react";

export function LibraryDrawer({ 
  isOpen, 
  onClose, 
  title, 
  position = "right", 
  size = "md", 
  closeOnBackdrop = true, 
  showCloseButton = true, 
  children, 
  className,
  ...props 
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const positions = {
    top: {
      container: "top-0 left-0 right-0",
      transform: isOpen ? "translate-y-0" : "-translate-y-full",
      size: "h-auto max-h-screen"
    },
    bottom: {
      container: "bottom-0 left-0 right-0",
      transform: isOpen ? "translate-y-0" : "translate-y-full",
      size: "h-auto max-h-screen"
    },
    left: {
      container: "top-0 left-0 bottom-0",
      transform: isOpen ? "translate-x-0" : "-translate-x-full",
      size: "w-auto max-w-screen"
    },
    right: {
      container: "top-0 right-0 bottom-0",
      transform: isOpen ? "translate-x-0" : "translate-x-full",
      size: "w-auto max-w-screen"
    }
  };

  const sizes = {
    sm: position === "left" || position === "right" ? "w-64" : "h-64",
    md: position === "left" || position === "right" ? "w-80" : "h-80",
    lg: position === "left" || position === "right" ? "w-96" : "h-96",
    xl: position === "left" || position === "right" ? "w-120" : "h-120",
    full: position === "left" || position === "right" ? "w-full" : "h-full"
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      {/* Drawer */}
      <div 
        className={cn(
          "fixed bg-white shadow-xl transform transition-transform duration-300 ease-in-out",
          positions[position].container,
          positions[position].transform,
          sizes[size],
          className
        )}
        {...props}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && (
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export function DrawerHeader({ children, className, ...props }) {
  return (
    <div 
      className={cn("px-6 py-4 border-b border-gray-200", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function DrawerBody({ children, className, ...props }) {
  return (
    <div 
      className={cn("flex-1 overflow-y-auto p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function DrawerFooter({ children, className, ...props }) {
  return (
    <div 
      className={cn("px-6 py-4 border-t border-gray-200 bg-gray-50", className)}
      {...props}
    >
      {children}
    </div>
  );
}`;

      case "file-upload":
        return `import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { Upload, X, File, Image, Video } from "lucide-react";

export function LibraryFileUpload({ 
  accept = "*/*", 
  multiple = false, 
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 5, 
  onFileSelect, 
  onFileRemove, 
  disabled = false, 
  variant = "dropzone", 
  size = "md", 
  className,
  ...props 
}) {
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const variants = {
    dropzone: "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center",
    button: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700",
    minimal: "text-blue-600 hover:text-blue-700 underline cursor-pointer"
  };

  const sizes = {
    sm: variant === "dropzone" ? "p-4 text-sm" : "px-3 py-1.5 text-sm",
    md: variant === "dropzone" ? "p-8 text-base" : "px-4 py-2 text-sm",
    lg: variant === "dropzone" ? "p-12 text-lg" : "px-6 py-3 text-base"
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) return <Image className="h-5 w-5" />;
    if (file.type.startsWith("video/")) return <Video className="h-5 w-5" />;
    return <File className="h-5 w-5" />;
  };

  const validateFile = (file) => {
    if (file.size > maxSize) {
      return \`File size exceeds \${formatFileSize(maxSize)}\`;
    }
    return null;
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    const validFiles = [];
    const errors = [];

    newFiles.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(\`\${file.name}: \${error}\`);
      } else {
        validFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      const updatedFiles = multiple 
        ? [...files, ...validFiles].slice(0, maxFiles)
        : [validFiles[0]];
      
      setFiles(updatedFiles);
      onFileSelect?.(multiple ? updatedFiles : updatedFiles[0]);
    }

    if (errors.length > 0) {
      console.warn("File upload errors:", errors);
    }
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFileRemove?.(files[index], index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!disabled) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (variant === "dropzone") {
    return (
      <div className={cn("space-y-4", className)} {...props}>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
          className={cn(
            variants[variant],
            sizes[size],
            isDragOver && "border-blue-500 bg-blue-50",
            disabled && "opacity-50 cursor-not-allowed",
            !disabled && "cursor-pointer hover:border-gray-400"
          )}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            Drop files here or click to browse
          </p>
          <p className="text-sm text-gray-500">
            {accept !== "*/*" && \`Accepted: \${accept} • \`}
            Max size: {formatFileSize(maxSize)}
            {multiple && \` • Max files: \${maxFiles}\`}
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-gray-500">
                    {getFileIcon(file)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <button
        onClick={openFileDialog}
        disabled={disabled}
        className={cn(
          variants[variant],
          sizes[size],
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <Upload className="h-4 w-4 mr-2" />
        {variant === "button" ? "Upload File" : "Choose File"}
      </button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
}`;

      case "table-of-contents":
        return `import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ChevronRight, Hash } from "lucide-react";

export function LibraryTableOfContents({ 
  items = [], 
  sticky = true, 
  collapsible = true, 
  showNumbers = false, 
  maxDepth = 6, 
  activeId, 
  onItemClick, 
  className,
  ...props 
}) {
  const [activeSection, setActiveSection] = useState(activeId || "");
  const [collapsedSections, setCollapsedSections] = useState(new Set());

  useEffect(() => {
    if (!activeId) {
      // Auto-detect active section based on scroll position
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { threshold: 0.5 }
      );

      // Observe all headings
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.observe(element);
      });

      return () => observer.disconnect();
    }
  }, [items, activeId]);

  const toggleCollapse = (id) => {
    const newCollapsed = new Set(collapsedSections);
    if (newCollapsed.has(id)) {
      newCollapsed.delete(id);
    } else {
      newCollapsed.add(id);
    }
    setCollapsedSections(newCollapsed);
  };

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      // Default scroll behavior
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const renderItems = (items, level = 0) => {
    if (level >= maxDepth) return null;

    return items.map((item, index) => {
      const hasChildren = item.children && item.children.length > 0;
      const isCollapsed = collapsedSections.has(item.id);
      const isActive = activeSection === item.id;

      return (
        <div key={item.id || index} className="relative">
          <div
            className={cn(
              "flex items-center py-1 px-2 text-sm cursor-pointer rounded transition-colors",
              isActive 
                ? "text-blue-600 bg-blue-50 font-medium" 
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
              level > 0 && "ml-4"
            )}
            style={{ paddingLeft: \`\${level * 16 + 8}px\` }}
            onClick={() => handleItemClick(item)}
          >
            {/* Collapse toggle */}
            {hasChildren && collapsible && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCollapse(item.id);
                }}
                className="mr-1 p-0.5 hover:bg-gray-200 rounded"
              >
                <ChevronRight
                  className={cn(
                    "h-3 w-3 transition-transform",
                    !isCollapsed && "transform rotate-90"
                  )}
                />
              </button>
            )}

            {/* Number */}
            {showNumbers && (
              <span className="mr-2 text-gray-400 font-mono text-xs">
                {item.number || index + 1}
              </span>
            )}

            {/* Icon */}
            <Hash className="h-3 w-3 mr-2 text-gray-400" />

            {/* Title */}
            <span className="flex-1 truncate">{item.title}</span>

            {/* Active indicator */}
            {isActive && (
              <div className="w-1 h-1 bg-blue-600 rounded-full ml-2" />
            )}
          </div>

          {/* Children */}
          {hasChildren && !isCollapsed && (
            <div className="relative">
              {/* Connecting line */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"
                style={{ left: \`\${level * 16 + 20}px\` }}
              />
              {renderItems(item.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <nav
      className={cn(
        "space-y-1 text-sm",
        sticky && "sticky top-4",
        className
      )}
      {...props}
    >
      <h3 className="font-medium text-gray-900 mb-3">Table of Contents</h3>
      <div className="space-y-1 max-h-96 overflow-y-auto">
        {renderItems(items)}
      </div>
    </nav>
  );
}

export function useTocItems(selector = "h1, h2, h3, h4, h5, h6") {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    const tocItems = Array.from(elements).map((element, index) => {
      // Ensure element has an ID
      if (!element.id) {
        element.id = \`heading-\${index}\`;
      }

      return {
        id: element.id,
        title: element.textContent || "",
        level: parseInt(element.tagName.charAt(1)),
        element
      };
    });

    // Convert flat list to nested structure
    const nested = [];
    const stack = [];

    tocItems.forEach(item => {
      while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
        stack.pop();
      }

      const parent = stack.length > 0 ? stack[stack.length - 1] : null;

      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(item);
      } else {
        nested.push(item);
      }

      stack.push(item);
    });

    setItems(nested);
  }, [selector]);

  return items;
}`;

      case "countdown-timer":
        return `import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export function LibraryCountdownTimer({ 
  initialTime = 60, // seconds
  autoStart = false, 
  onComplete, 
  onTick, 
  format = "mm:ss", 
  size = "md", 
  variant = "default", 
  showControls = true, 
  className,
  ...props 
}) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef(null);

  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl"
  };

  const variants = {
    default: "text-gray-900",
    primary: "text-blue-600",
    warning: "text-yellow-600",
    danger: "text-red-600"
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          onTick?.(newTime);
          
          if (newTime <= 0) {
            setIsRunning(false);
            setIsCompleted(true);
            onComplete?.();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, onComplete, onTick]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const pad = (num) => num.toString().padStart(2, "0");

    switch (format) {
      case "hh:mm:ss":
        return \`\${pad(hours)}:\${pad(minutes)}:\${pad(secs)}\`;
      case "mm:ss":
        return \`\${pad(minutes)}:\${pad(secs)}\`;
      case "ss":
        return pad(secs);
      case "human":
        if (hours > 0) {
          return \`\${hours}h \${minutes}m \${secs}s\`;
        } else if (minutes > 0) {
          return \`\${minutes}m \${secs}s\`;
        } else {
          return \`\${secs}s\`;
        }
      default:
        return \`\${pad(minutes)}:\${pad(secs)}\`;
    }
  };

  const handlePlayPause = () => {
    if (isCompleted) return;
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
    setIsCompleted(false);
  };

  const getVariant = () => {
    if (isCompleted) return "danger";
    if (timeLeft <= 10) return "danger";
    if (timeLeft <= 30) return "warning";
    return variant;
  };

  return (
    <div className={cn("text-center space-y-4", className)} {...props}>
      {/* Timer Display */}
      <div
        className={cn(
          "font-mono font-bold",
          sizes[size],
          variants[getVariant()],
          isCompleted && "animate-pulse"
        )}
      >
        {formatTime(timeLeft)}
      </div>

      {/* Progress Ring */}
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={2 * Math.PI * 40}
            strokeDashoffset={2 * Math.PI * 40 * (1 - timeLeft / initialTime)}
            className={cn("transition-all duration-1000", variants[getVariant()])}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={handlePlayPause}
            disabled={isCompleted}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full transition-colors",
              isCompleted 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            )}
          >
            {isRunning ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4 ml-0.5" />
            )}
          </button>
          
          <button
            onClick={handleReset}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Status */}
      {isCompleted && (
        <div className="text-red-600 font-medium">Time's up!</div>
      )}
    </div>
  );
}`;

      case "color-picker":
        return `import { cn } from "@/lib/utils";
import { useState } from "react";
import { Check, Palette } from "lucide-react";

export function LibraryColorPicker({ 
  value = "#3B82F6", 
  onChange, 
  presetColors = [
    "#EF4444", "#F97316", "#F59E0B", "#EAB308", "#84CC16", "#22C55E",
    "#10B981", "#14B8A6", "#06B6D4", "#0EA5E9", "#3B82F6", "#6366F1",
    "#8B5CF6", "#A855F7", "#D946EF", "#EC4899", "#F43F5E"
  ], 
  showInput = true, 
  showPresets = true, 
  disabled = false, 
  size = "md", 
  className,
  ...props 
}) {
  const [selectedColor, setSelectedColor] = useState(value);
  const [inputValue, setInputValue] = useState(value);

  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const presetSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12"
  };

  const isValidHex = (color) => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setInputValue(color);
    onChange?.(color);
  };

  const handleInputChange = (e) => {
    const color = e.target.value;
    setInputValue(color);
    
    if (isValidHex(color)) {
      setSelectedColor(color);
      onChange?.(color);
    }
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const getContrastColor = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return "#000000";
    
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#FFFFFF";
  };

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {/* Selected Color Display */}
      <div className="flex items-center space-x-3">
        <div
          className={cn(
            "relative rounded-lg border-2 border-gray-200 cursor-pointer",
            sizes[size],
            disabled && "cursor-not-allowed opacity-50"
          )}
          style={{ backgroundColor: selectedColor }}
          onClick={() => !disabled && document.getElementById("color-input")?.click()}
        >
          <Palette 
            className="absolute inset-0 m-auto h-4 w-4" 
            style={{ color: getContrastColor(selectedColor) }}
          />
        </div>
        
        {showInput && (
          <div className="flex-1">
            <input
              id="color-input"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              disabled={disabled}
              placeholder="#3B82F6"
              className={cn(
                "w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                !isValidHex(inputValue) && inputValue && "border-red-300 focus:ring-red-500 focus:border-red-500",
                disabled && "bg-gray-50 cursor-not-allowed"
              )}
            />
            {inputValue && !isValidHex(inputValue) && (
              <p className="text-xs text-red-500 mt-1">Invalid hex color</p>
            )}
          </div>
        )}
      </div>

      {/* Native Color Input (Hidden) */}
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => handleColorChange(e.target.value)}
        disabled={disabled}
        className="sr-only"
        id="native-color-input"
      />

      {/* Preset Colors */}
      {showPresets && presetColors.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Preset Colors</h4>
          <div className="grid grid-cols-8 gap-2">
            {presetColors.map((color, index) => (
              <button
                key={index}
                onClick={() => !disabled && handleColorChange(color)}
                disabled={disabled}
                className={cn(
                  "relative rounded border-2 transition-all hover:scale-105",
                  presetSizes[size],
                  selectedColor === color 
                    ? "border-gray-900 ring-2 ring-gray-300" 
                    : "border-gray-200 hover:border-gray-300",
                  disabled && "cursor-not-allowed opacity-50"
                )}
                style={{ backgroundColor: color }}
                title={color}
              >
                {selectedColor === color && (
                  <Check 
                    className="absolute inset-0 m-auto h-3 w-3" 
                    style={{ color: getContrastColor(color) }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => !disabled && document.getElementById("native-color-input")?.click()}
          disabled={disabled}
          className={cn(
            "px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          Custom Color
        </button>
        
        <button
          onClick={() => !disabled && handleColorChange("#000000")}
          disabled={disabled}
          className={cn(
            "px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          Black
        </button>
        
        <button
          onClick={() => !disabled && handleColorChange("#FFFFFF")}
          disabled={disabled}
          className={cn(
            "px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          White
        </button>
      </div>

      {/* Color Info */}
      <div className="text-xs text-gray-500 space-y-1">
        <div>Hex: {selectedColor}</div>
        {(() => {
          const rgb = hexToRgb(selectedColor);
          return rgb ? (
            <div>RGB: {rgb.r}, {rgb.g}, {rgb.b}</div>
          ) : null;
        })()}
      </div>
    </div>
  );
}`;

      case "sticky-note":
        return `import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { X, Pin, PinOff } from "lucide-react";

export function LibraryStickyNote({ 
  content = "", 
  color = "yellow", 
  size = "md", 
  pinned = false, 
  editable = true, 
  onContentChange, 
  onPin, 
  onDelete, 
  position = { x: 100, y: 100 }, 
  draggable = true, 
  className,
  ...props 
}) {
  const [noteContent, setNoteContent] = useState(content);
  const [isPinned, setIsPinned] = useState(pinned);
  const [isDragging, setIsDragging] = useState(false);
  const [notePosition, setNotePosition] = useState(position);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const noteRef = useRef(null);
  const textareaRef = useRef(null);

  const colors = {
    yellow: "bg-yellow-200 border-yellow-300 text-yellow-900",
    pink: "bg-pink-200 border-pink-300 text-pink-900",
    blue: "bg-blue-200 border-blue-300 text-blue-900",
    green: "bg-green-200 border-green-300 text-green-900",
    orange: "bg-orange-200 border-orange-300 text-orange-900",
    purple: "bg-purple-200 border-purple-300 text-purple-900",
    gray: "bg-gray-200 border-gray-300 text-gray-900"
  };

  const sizes = {
    sm: "w-48 h-32 text-sm",
    md: "w-64 h-40 text-base",
    lg: "w-80 h-48 text-lg",
    xl: "w-96 h-56 text-xl"
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && draggable) {
        setNotePosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, draggable]);

  const handleMouseDown = (e) => {
    if (draggable && noteRef.current) {
      const rect = noteRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setNoteContent(newContent);
    onContentChange?.(newContent);
  };

  const handlePin = () => {
    const newPinned = !isPinned;
    setIsPinned(newPinned);
    onPin?.(newPinned);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    autoResize();
  }, [noteContent]);

  return (
    <div
      ref={noteRef}
      className={cn(
        "absolute select-none border-2 rounded-lg shadow-lg transform rotate-1 hover:rotate-0 transition-transform",
        colors[color],
        sizes[size],
        isDragging && "rotate-0 scale-105 z-50",
        isPinned && "rotate-0",
        draggable && "cursor-move",
        className
      )}
      style={{
        left: notePosition.x,
        top: notePosition.y,
        transform: \`translate(0, 0) rotate(\${isDragging || isPinned ? 0 : 1}deg)\`
      }}
      onMouseDown={handleMouseDown}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-current border-opacity-20">
        <div className="flex items-center space-x-1">
          <button
            onClick={handlePin}
            className={cn(
              "p-1 rounded hover:bg-black hover:bg-opacity-10 transition-colors",
              isPinned && "text-red-600"
            )}
            title={isPinned ? "Unpin" : "Pin"}
          >
            {isPinned ? <Pin className="h-3 w-3" /> : <PinOff className="h-3 w-3" />}
          </button>
        </div>
        
        <button
          onClick={handleDelete}
          className="p-1 rounded hover:bg-red-500 hover:text-white transition-colors"
          title="Delete"
        >
          <X className="h-3 w-3" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 h-full">
        {editable ? (
          <textarea
            ref={textareaRef}
            value={noteContent}
            onChange={handleContentChange}
            placeholder="Write your note here..."
            className={cn(
              "w-full h-full bg-transparent border-none outline-none resize-none overflow-hidden",
              "placeholder-current placeholder-opacity-50"
            )}
            onMouseDown={(e) => e.stopPropagation()}
            style={{ fontFamily: "cursive" }}
          />
        ) : (
          <div 
            className="w-full h-full overflow-auto whitespace-pre-wrap"
            style={{ fontFamily: "cursive" }}
          >
            {noteContent || "Empty note"}
          </div>
        )}
      </div>

      {/* Corner fold effect */}
      <div className="absolute top-0 right-0 w-4 h-4 bg-white bg-opacity-30 border-l border-b border-current border-opacity-20" 
           style={{ 
             clipPath: "polygon(0 0, 100% 100%, 0 100%)",
             transform: "translate(0, 0)"
           }} 
      />
    </div>
  );
}

export function StickyNotesContainer({ children, className, ...props }) {
  return (
    <div 
      className={cn("relative w-full h-full overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}`;

      case "fab":
        return `import { cn } from "@/lib/utils";
import { useState } from "react";
import { Plus, X } from "lucide-react";

export function LibraryFAB({ 
  icon = <Plus className="h-6 w-6" />, 
  actions = [], 
  position = "bottom-right", 
  size = "md", 
  color = "blue", 
  label, 
  disabled = false, 
  onClick, 
  className,
  ...props 
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const positions = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4"
  };

  const sizes = {
    sm: "w-12 h-12",
    md: "w-14 h-14",
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
    green: "bg-green-600 hover:bg-green-700 text-white",
    red: "bg-red-600 hover:bg-red-700 text-white",
    purple: "bg-purple-600 hover:bg-purple-700 text-white",
    orange: "bg-orange-600 hover:bg-orange-700 text-white",
    gray: "bg-gray-600 hover:bg-gray-700 text-white"
  };

  const actionSizes = {
    sm: "w-10 h-10",
    md: "w-12 h-12", 
    lg: "w-14 h-14",
    xl: "w-16 h-16"
  };

  const handleMainClick = () => {
    if (actions.length > 0) {
      setIsExpanded(!isExpanded);
    } else {
      onClick?.();
    }
  };

  const handleActionClick = (action) => {
    action.onClick?.();
    setIsExpanded(false);
  };

  const isBottomPosition = position.includes("bottom");
  const isRightPosition = position.includes("right");

  return (
    <div className={cn("fixed z-50", positions[position])}>
      {/* Actions */}
      {actions.length > 0 && isExpanded && (
        <div
          className={cn(
            "absolute flex flex-col space-y-3 transition-all duration-200",
            isBottomPosition ? "bottom-16 mb-2" : "top-16 mt-2",
            isRightPosition ? "right-0" : "left-0"
          )}
        >
          {actions.map((action, index) => (
            <div key={index} className="relative">
              {/* Action Label */}
              {action.label && (
                <div
                  className={cn(
                    "absolute top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded whitespace-nowrap",
                    isRightPosition 
                      ? "right-full mr-3" 
                      : "left-full ml-3"
                  )}
                >
                  {action.label}
                </div>
              )}
              
              {/* Action Button */}
              <button
                onClick={() => handleActionClick(action)}
                disabled={disabled || action.disabled}
                className={cn(
                  "flex items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-110 transform",
                  actionSizes[size],
                  action.color ? colors[action.color] : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200",
                  disabled || action.disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"
                )}
              >
                {action.icon}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <div className="relative">
        {/* Label */}
        {label && !isExpanded && (
          <div
            className={cn(
              "absolute top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded whitespace-nowrap",
              isRightPosition 
                ? "right-full mr-4" 
                : "left-full ml-4"
            )}
          >
            {label}
          </div>
        )}
        
        <button
          onClick={handleMainClick}
          disabled={disabled}
          className={cn(
            "flex items-center justify-center rounded-full shadow-lg transition-all duration-200 transform hover:scale-110",
            sizes[size],
            colors[color],
            disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl active:scale-95",
            isExpanded && actions.length > 0 && "rotate-45",
            className
          )}
          {...props}
        >
          {isExpanded && actions.length > 0 ? (
            <X className="h-6 w-6" />
          ) : (
            icon
          )}
        </button>
      </div>

      {/* Backdrop */}
      {isExpanded && actions.length > 0 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
}

export function FABAction({ icon, label, onClick, color, disabled }) {
  return {
    icon,
    label,
    onClick,
    color,
    disabled
  };
}`;

      default:
        return null;
    }
  };

  const getComponentCode = () => {
    switch (componentName) {
      case "button":
        return `import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface LibraryButtonProps {
  variant?: "primary" | "secondary" | "success" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function LibraryButton({ 
  variant = "primary", 
  size = "md", 
  loading = false, 
  disabled = false, 
  icon, 
  children, 
  className,
  onClick,
  ...props 
}: LibraryButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-gray-600", 
    success: "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600"
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm", 
    lg: "h-11 px-6 text-base"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}`;

      case "accordion":
        return `import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
  id?: string;
}

export interface LibraryAccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export function LibraryAccordion({ 
  items, 
  allowMultiple = false, 
  defaultOpen = [],
  className 
}: LibraryAccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id)
          : [...prev, id]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(id) ? [] : [id]
      );
    }
  };

  return (
    <div className={cn("divide-y divide-gray-200", className)}>
      {items.map((item, index) => {
        const id = item.id || \`accordion-item-\${index}\`;
        const isOpen = openItems.includes(id);
        
        return (
          <div key={id} className="py-2">
            <button
              className="flex w-full items-center justify-between py-4 text-left"
              onClick={() => toggleItem(id)}
            >
              <span className="text-sm font-medium">{item.title}</span>
              <ChevronDown 
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <div className="pb-4 pt-2">
                <div className="text-sm text-muted-foreground">
                  {item.content}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}`;

      case "badge":
        return `import { cn } from "@/lib/utils";

export interface LibraryBadgeProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function LibraryBadge({ 
  variant = "primary", 
  size = "md",
  dot = false,
  children, 
  className 
}: LibraryBadgeProps) {
  const baseStyles = "inline-flex items-center font-medium rounded-full";
  
  const variants = {
    primary: "bg-blue-100 text-blue-800 border border-blue-200",
    secondary: "bg-gray-100 text-gray-800 border border-gray-200",
    success: "bg-green-100 text-green-800 border border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    error: "bg-red-100 text-red-800 border border-red-200",
    info: "bg-cyan-100 text-cyan-800 border border-cyan-200"
  };

  const sizes = {
    sm: dot ? "h-2 w-2" : "px-2.5 py-0.5 text-xs",
    md: dot ? "h-3 w-3" : "px-3 py-1 text-sm",
    lg: dot ? "h-4 w-4" : "px-4 py-1.5 text-base"
  };

  if (dot) {
    return (
      <span 
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
      />
    );
  }

  return (
    <span 
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

export const SuccessBadge = (props: Omit<LibraryBadgeProps, 'variant'>) => 
  <LibraryBadge {...props} variant="success" />;

export const WarningBadge = (props: Omit<LibraryBadgeProps, 'variant'>) => 
  <LibraryBadge {...props} variant="warning" />;

export const ErrorBadge = (props: Omit<LibraryBadgeProps, 'variant'>) => 
  <LibraryBadge {...props} variant="error" />;

export const InfoBadge = (props: Omit<LibraryBadgeProps, 'variant'>) => 
  <LibraryBadge {...props} variant="info" />;`;

      case "fab":
        return `import { cn } from "@/lib/utils";
import { ArrowUp, Plus } from "lucide-react";
import { useState, useEffect } from "react";

export interface LibraryFabProps {
  variant?: "default" | "extended" | "speed-dial";
  size?: "sm" | "md" | "lg";
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function LibraryFab({ 
  variant = "default", 
  size = "md",
  position = "bottom-right",
  icon = <Plus className="w-6 h-6" />,
  children,
  onClick,
  className 
}: LibraryFabProps) {
  const baseStyles = "fixed z-50 inline-flex items-center justify-center font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300";
  
  const sizes = {
    sm: "h-12 w-12",
    md: "h-14 w-14", 
    lg: "h-16 w-16"
  };

  const positions = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6", 
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6"
  };

  const extendedStyles = variant === "extended" 
    ? "px-6 w-auto" 
    : "";

  return (
    <button
      className={cn(
        baseStyles,
        sizes[size],
        positions[position],
        extendedStyles,
        className
      )}
      onClick={onClick}
    >
      {icon}
      {variant === "extended" && children && (
        <span className="ml-3">{children}</span>
      )}
    </button>
  );
}

export function ScrollToTopFab() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <LibraryFab
      icon={<ArrowUp className="w-6 h-6" />}
      onClick={scrollToTop}
      className="animate-in fade-in-0 zoom-in-95"
    />
  );
}

export const SpeedDialFab = LibraryFab;
export const ExtendedFab = (props: LibraryFabProps) => 
  <LibraryFab {...props} variant="extended" />;
export const CreateFab = (props: LibraryFabProps) => 
  <LibraryFab {...props} icon={<Plus className="w-6 h-6" />} />;`;

      case "progress":
        return `import { cn } from "@/lib/utils";

export interface LibraryProgressProps {
  value: number;
  max?: number;
  variant?: "default" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function LibraryProgress({ 
  value, 
  max = 100,
  variant = "default",
  size = "md",
  showLabel = false,
  className 
}: LibraryProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const containerStyles = {
    sm: "h-2",
    md: "h-3", 
    lg: "h-4"
  };

  const variants = {
    default: "bg-blue-600",
    success: "bg-green-600",
    warning: "bg-yellow-600", 
    error: "bg-red-600"
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-700 mb-1">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn(
        "w-full bg-gray-200 rounded-full overflow-hidden",
        containerStyles[size]
      )}>
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-in-out",
            variants[variant]
          )}
          style={{ width: \`\${percentage}%\` }}
        />
      </div>
    </div>
  );
}

export function CircularProgress({ 
  value, 
  max = 100, 
  size = 120,
  strokeWidth = 8,
  variant = "default",
  showLabel = false,
  className 
}: LibraryProgressProps & { 
  size?: number; 
  strokeWidth?: number; 
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const variants = {
    default: "stroke-blue-600",
    success: "stroke-green-600",
    warning: "stroke-yellow-600",
    error: "stroke-red-600"
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn("transition-all duration-300 ease-in-out", variants[variant])}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-700">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}

export const StepProgress = LibraryProgress;`;

      case "breadcrumb":
        return `import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "wouter";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface LibraryBreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  showHome?: boolean;
  homeHref?: string;
  className?: string;
}

export function LibraryBreadcrumb({ 
  items, 
  separator = <ChevronRight className="w-4 h-4" />, 
  showHome = true,
  homeHref = "/",
  className 
}: LibraryBreadcrumbProps) {
  const allItems = showHome 
    ? [{ label: "Home", href: homeHref, icon: <Home className="w-4 h-4" /> }, ...items]
    : items;

  return (
    <nav className={cn("flex items-center space-x-2 text-sm", className)}>
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;
        
        return (
          <div key={index} className="flex items-center space-x-2">
            {item.href && !isLast ? (
              <Link href={item.href}>
                <span className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              </Link>
            ) : (
              <span className={cn(
                "flex items-center space-x-1",
                isLast ? "text-gray-900 font-medium" : "text-gray-600"
              )}>
                {item.icon}
                <span>{item.label}</span>
              </span>
            )}
            
            {!isLast && (
              <span className="text-gray-400">
                {separator}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export function SimpleBreadcrumb({ 
  items, 
  separator = <ChevronRight className="w-4 h-4" />, 
  className 
}: { 
  items: string[];
  separator?: React.ReactNode;
  className?: string;
}) {
  return (
    <nav className={cn("flex items-center space-x-2 text-sm text-gray-600", className)}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center space-x-2">
            <span className={isLast ? "text-gray-900 font-medium" : "text-gray-600"}>
              {item}
            </span>
            {!isLast && (
              <span className="text-gray-400">
                {separator}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}`;

      case "pagination":
        return `import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export interface LibraryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showQuickJumper?: boolean;
  pageSize?: number;
  total?: number;
  className?: string;
}

export function LibraryPagination({ 
  currentPage, 
  totalPages,
  onPageChange,
  showQuickJumper = false,
  pageSize = 10,
  total,
  className 
}: LibraryPaginationProps) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    
    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }
    
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }
    
    rangeWithDots.push(...range);
    
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }
    
    return rangeWithDots;
  };

  const visiblePages = totalPages > 1 ? getVisiblePages() : [1];

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className={cn(
            "flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50",
            currentPage <= 1 && "opacity-50 cursor-not-allowed"
          )}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>
        
        <div className="flex items-center space-x-1">
          {visiblePages.map((page, index) => {
            if (page === '...') {
              return (
                <span key={index} className="px-3 py-2 text-sm text-gray-500">
                  <MoreHorizontal className="w-4 h-4" />
                </span>
              );
            }
            
            return (
              <button
                key={index}
                onClick={() => onPageChange(page as number)}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md",
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                )}
              >
                {page}
              </button>
            );
          })}
        </div>
        
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className={cn(
            "flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50",
            currentPage >= totalPages && "opacity-50 cursor-not-allowed"
          )}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      
      {total && (
        <div className="text-sm text-gray-700">
          Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, total)} of {total} results
        </div>
      )}
    </div>
  );
}

export const SimplePagination = LibraryPagination;`;

      case "tooltip":
        return `import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

export interface LibraryTooltipProps {
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  trigger?: "hover" | "click" | "focus";
  children: React.ReactNode;
  className?: string;
  delayShow?: number;
  delayHide?: number;
}

export function LibraryTooltip({ 
  content,
  placement = "top",
  trigger = "hover",
  children,
  className,
  delayShow = 0,
  delayHide = 0
}: LibraryTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (delayShow > 0) {
      timeoutRef.current = setTimeout(() => setIsVisible(true), delayShow);
    } else {
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (delayHide > 0) {
      timeoutRef.current = setTimeout(() => setIsVisible(false), delayHide);
    } else {
      setIsVisible(false);
    }
  };

  const toggleTooltip = () => {
    if (isVisible) {
      hideTooltip();
    } else {
      showTooltip();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const placementStyles = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2"
  };

  const arrowStyles = {
    top: "top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900",
    bottom: "bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900",
    left: "left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900",
    right: "right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900"
  };

  const triggerProps = {
    ...(trigger === "hover" && {
      onMouseEnter: showTooltip,
      onMouseLeave: hideTooltip
    }),
    ...(trigger === "click" && {
      onClick: toggleTooltip
    }),
    ...(trigger === "focus" && {
      onFocus: showTooltip,
      onBlur: hideTooltip
    })
  };

  return (
    <div className="relative inline-block">
      <div {...triggerProps}>
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            "absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-lg whitespace-nowrap",
            placementStyles[placement],
            className
          )}
        >
          {content}
          <div
            className={cn(
              "absolute w-0 h-0 border-4",
              arrowStyles[placement]
            )}
          />
        </div>
      )}
    </div>
  );
}

export const HoverTooltip = (props: LibraryTooltipProps) => 
  <LibraryTooltip {...props} trigger="hover" />;

export const ClickTooltip = (props: LibraryTooltipProps) => 
  <LibraryTooltip {...props} trigger="click" />;`;

      case "avatar":
        return `import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export interface LibraryAvatarProps {
  src?: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fallback?: string;
  showBadge?: boolean;
  badgeColor?: "green" | "red" | "yellow" | "blue";
  className?: string;
}

export function LibraryAvatar({ 
  src, 
  alt,
  size = "md",
  fallback,
  showBadge = false,
  badgeColor = "green",
  className 
}: LibraryAvatarProps) {
  const sizes = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl"
  };

  const badgeStyles = {
    green: "bg-green-400",
    red: "bg-red-400", 
    yellow: "bg-yellow-400",
    blue: "bg-blue-400"
  };

  const badgeSizes = {
    xs: "w-2 h-2",
    sm: "w-2.5 h-2.5", 
    md: "w-3 h-3",
    lg: "w-3.5 h-3.5",
    xl: "w-4 h-4"
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <div className={cn(
        "relative overflow-hidden rounded-full bg-gray-100 flex items-center justify-center",
        sizes[size]
      )}>
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Hide image on error to show fallback
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : fallback ? (
          <span className="font-medium text-gray-600">
            {getInitials(fallback)}
          </span>
        ) : (
          <User className="w-1/2 h-1/2 text-gray-400" />
        )}
      </div>
      
      {showBadge && (
        <span className={cn(
          "absolute bottom-0 right-0 block rounded-full ring-2 ring-white",
          badgeStyles[badgeColor],
          badgeSizes[size]
        )} />
      )}
    </div>
  );
}

export function AvatarGroup({ 
  avatars,
  max = 5,
  size = "md",
  className
}: {
  avatars: LibraryAvatarProps[];
  max?: number;
  size?: LibraryAvatarProps['size'];
  className?: string;
}) {
  const displayAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={cn("flex -space-x-2", className)}>
      {displayAvatars.map((avatar, index) => (
        <LibraryAvatar
          key={index}
          {...avatar}
          size={size}
          className="ring-2 ring-white"
        />
      ))}
      {remainingCount > 0 && (
        <div className={cn(
          "relative overflow-hidden rounded-full bg-gray-100 flex items-center justify-center ring-2 ring-white",
          size === "xs" && "w-6 h-6 text-xs",
          size === "sm" && "w-8 h-8 text-sm", 
          size === "md" && "w-10 h-10 text-base",
          size === "lg" && "w-12 h-12 text-lg",
          size === "xl" && "w-16 h-16 text-xl"
        )}>
          <span className="font-medium text-gray-600">+{remainingCount}</span>
        </div>
      )}
    </div>
  );
}

export function UserCard({
  avatar,
  name,
  role,
  email,
  className
}: {
  avatar: LibraryAvatarProps;
  name: string;
  role?: string;
  email?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center space-x-3 p-4", className)}>
      <LibraryAvatar {...avatar} size="lg" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {name}
        </p>
        {role && (
          <p className="text-sm text-gray-500 truncate">
            {role}
          </p>
        )}
        {email && (
          <p className="text-sm text-gray-400 truncate">
            {email}
          </p>
        )}
      </div>
    </div>
  );
}`;

      case "carousel":
        return `import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export interface CarouselItem {
  type: "image" | "content";
  src?: string;
  alt?: string;
  content?: React.ReactNode;
}

export interface LibraryCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
  className?: string;
}

export function LibraryCarousel({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showIndicators = true,
  showNavigation = true,
  className
}: LibraryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg", className)}>
      <div className="relative h-64 md:h-96">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              index === currentIndex ? "opacity-100" : "opacity-0"
            )}
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {showNavigation && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === currentIndex ? "bg-white" : "bg-white/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}`;

      case "container":
        return `import { cn } from "@/lib/utils";

export interface LibraryContainerProps {
  layout?: "grid" | "flex" | "masonry";
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  responsive?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function LibraryContainer({
  layout = "flex",
  cols = 1,
  gap = "md",
  align = "start",
  justify = "start",
  responsive = true,
  children,
  className
}: LibraryContainerProps) {
  const baseStyles = "w-full";
  
  const gaps = {
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8"
  };

  const gridCols = responsive ? {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
  } : {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6"
  };

  const flexAligns = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch"
  };

  const flexJustifies = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around"
  };

  if (layout === "grid") {
    return (
      <div
        className={cn(
          baseStyles,
          "grid",
          gridCols[cols],
          gaps[gap],
          className
        )}
      >
        {children}
      </div>
    );
  }

  if (layout === "flex") {
    return (
      <div
        className={cn(
          baseStyles,
          "flex flex-wrap",
          flexAligns[align],
          flexJustifies[justify],
          gaps[gap],
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={cn(baseStyles, className)}>
      {children}
    </div>
  );
}`;

      case "navigation":
        return `import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
  onClick?: () => void;
}

export interface LibraryNavigationProps {
  items: NavItem[];
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "pills" | "underline";
  className?: string;
}

export function LibraryNavigation({
  items,
  orientation = "horizontal",
  variant = "default",
  className
}: LibraryNavigationProps) {
  const [openDropdowns, setOpenDropdowns] = useState<Set<number>>(new Set());

  const toggleDropdown = (index: number) => {
    const newOpen = new Set(openDropdowns);
    if (newOpen.has(index)) {
      newOpen.delete(index);
    } else {
      newOpen.add(index);
    }
    setOpenDropdowns(newOpen);
  };

  const baseStyles = orientation === "horizontal" 
    ? "flex space-x-1" 
    : "flex flex-col space-y-1";

  const itemStyles = {
    default: "px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors",
    pills: "px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors",
    underline: "px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300 transition-colors"
  };

  return (
    <nav className={cn(baseStyles, className)}>
      {items.map((item, index) => (
        <div key={index} className="relative">
          <button
            onClick={item.children ? () => toggleDropdown(index) : item.onClick}
            className={cn(
              itemStyles[variant],
              item.children && "flex items-center space-x-1"
            )}
          >
            <span>{item.label}</span>
            {item.children && (
              <ChevronDown 
                className={cn(
                  "w-4 h-4 transition-transform",
                  openDropdowns.has(index) && "rotate-180"
                )}
              />
            )}
          </button>
          
          {item.children && openDropdowns.has(index) && (
            <div className={cn(
              "absolute z-10 mt-1 bg-white border border-gray-200 rounded-md shadow-lg min-w-[200px]",
              orientation === "horizontal" ? "top-full left-0" : "left-full top-0"
            )}>
              <div className="py-1">
                {item.children.map((child, childIndex) => (
                  <button
                    key={childIndex}
                    onClick={child.onClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}`;

      case "card":
        return `import { cn } from "@/lib/utils";

export interface LibraryCardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  variant?: "default" | "elevated" | "outlined";
  size?: "sm" | "md" | "lg";
  hoverable?: boolean;
  className?: string;
}

export function LibraryCard({
  title,
  subtitle,
  image,
  imageAlt,
  children,
  actions,
  variant = "default",
  size = "md",
  hoverable = false,
  className
}: LibraryCardProps) {
  const baseStyles = "bg-white rounded-lg overflow-hidden transition-all duration-200";
  
  const variants = {
    default: "border border-gray-200 shadow-sm",
    elevated: "shadow-md",
    outlined: "border-2 border-gray-300"
  };

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md", 
    lg: "max-w-lg"
  };

  const hoverStyles = hoverable ? "hover:shadow-lg hover:scale-[1.02]" : "";

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        hoverStyles,
        className
      )}
    >
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={imageAlt || "Card image"}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
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
        
        {children && (
          <div className="text-gray-700">
            {children}
          </div>
        )}
      </div>
      
      {actions && (
        <div className="px-6 pb-6 pt-0">
          <div className="flex items-center justify-end space-x-3">
            {actions}
          </div>
        </div>
      )}
    </div>
  );
}

export interface ProductCardProps {
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  onAddToCart?: () => void;
  className?: string;
}

export function ProductCard({
  title,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  badge,
  onAddToCart,
  className
}: ProductCardProps) {
  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow", className)}>
      <div className="relative aspect-square overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {badge && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {badge}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{title}</h3>
        
        <div className="flex items-center mb-2">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">${originalPrice}</span>
          )}
        </div>
        
        {rating && (
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={cn("text-sm", i < rating ? "text-yellow-400" : "text-gray-300")}>
                  ★
                </span>
              ))}
            </div>
            {reviewCount && (
              <span className="text-sm text-gray-500 ml-1">({reviewCount})</span>
            )}
          </div>
        )}
        
        {onAddToCart && (
          <button
            onClick={onAddToCart}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}`;

      case "search-bar":
        return `import { cn } from "@/lib/utils";
import { Search, X, Filter } from "lucide-react";
import { useState } from "react";

export interface SearchSuggestion {
  id: string;
  label: string;
  category?: string;
}

export interface LibrarySearchBarProps {
  placeholder?: string;
  value?: string;
  onSearch?: (query: string) => void;
  onChange?: (value: string) => void;
  onClear?: () => void;
  suggestions?: SearchSuggestion[];
  showSuggestions?: boolean;
  showFilter?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LibrarySearchBar({
  placeholder = "Search...",
  value = "",
  onSearch,
  onChange,
  onClear,
  suggestions = [],
  showSuggestions = true,
  showFilter = false,
  disabled = false,
  size = "md",
  className
}: LibrarySearchBarProps) {
  const [query, setQuery] = useState(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base"
  };

  const handleInputChange = (newValue: string) => {
    setQuery(newValue);
    onChange?.(newValue);

    if (showSuggestions && suggestions.length > 0) {
      const filtered = suggestions.filter(item =>
        item.label.toLowerCase().includes(newValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowDropdown(newValue.length > 0 && filtered.length > 0);
    }
  };

  const handleSearch = () => {
    onSearch?.(query);
    setShowDropdown(false);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.label);
    onChange?.(suggestion.label);
    onSearch?.(suggestion.label);
    setShowDropdown(false);
  };

  const handleClear = () => {
    setQuery("");
    onChange?.("");
    onClear?.();
    setShowDropdown(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowDropdown(showSuggestions && filteredSuggestions.length > 0)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full pl-10 pr-20 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors",
            sizes[size],
            disabled && "bg-gray-100 cursor-not-allowed",
            className
          )}
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-3">
          {query && (
            <button
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          {showFilter && (
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <Filter className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {showDropdown && filteredSuggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredSuggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span>{suggestion.label}</span>
                {suggestion.category && (
                  <span className="text-xs text-gray-500">{suggestion.category}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}`;

      case "modal":
        return `import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect } from "react";

export interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

export function LibraryModal({
  isOpen,
  onClose,
  title,
  size = "md",
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className
}: LibraryModalProps) {
  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full m-4"
  };

  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="flex min-h-full items-center justify-center p-4 text-center"
        onClick={handleOverlayClick}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
        
        <div
          className={cn(
            "relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all",
            sizes[size],
            className
          )}
        >
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              {title && (
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
          
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModalHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

export function ModalBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mb-6", className)}>
      {children}
    </div>
  );
}

export function ModalFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-end space-x-3 pt-4 border-t border-gray-200", className)}>
      {children}
    </div>
  );
}`;

      case "form":
        return `import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, error, required, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

export interface LibraryInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export function LibraryInput({ error, icon, className, ...props }: LibraryInputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        className={cn(
          "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
          icon && "pl-10",
          error && "border-red-500 focus:ring-red-500 focus:border-red-500",
          className
        )}
        {...props}
      />
    </div>
  );
}

export interface LibraryPasswordInputProps extends Omit<LibraryInputProps, 'type'> {
  showToggle?: boolean;
}

export function LibraryPasswordInput({ showToggle = true, className, ...props }: LibraryPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <LibraryInput
        {...props}
        type={showPassword ? "text" : "password"}
        className={cn(showToggle && "pr-10", className)}
      />
      {showToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
}

export interface LibraryTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  resize?: boolean;
  className?: string;
}

export function LibraryTextarea({ error, resize = true, className, ...props }: LibraryTextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
        !resize && "resize-none",
        error && "border-red-500 focus:ring-red-500 focus:border-red-500",
        className
      )}
      {...props}
    />
  );
}

export interface LibrarySelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  placeholder?: string;
  options: { value: string; label: string }[];
  className?: string;
}

export function LibrarySelect({ error, placeholder, options, className, ...props }: LibrarySelectProps) {
  return (
    <select
      className={cn(
        "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white",
        error && "border-red-500 focus:ring-red-500 focus:border-red-500",
        className
      )}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export interface LibraryCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  className?: string;
}

export function LibraryCheckbox({ label, error, className, ...props }: LibraryCheckboxProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <input
        type="checkbox"
        className={cn(
          "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {label && (
        <label className="text-sm text-gray-700">
          {label}
        </label>
      )}
    </div>
  );
}

export interface LibraryRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  className?: string;
}

export function LibraryRadio({ label, error, className, ...props }: LibraryRadioProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <input
        type="radio"
        className={cn(
          "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {label && (
        <label className="text-sm text-gray-700">
          {label}
        </label>
      )}
    </div>
  );
}

export interface LibraryFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function LibraryForm({ title, description, children, className, ...props }: LibraryFormProps) {
  return (
    <form className={cn("space-y-6", className)} {...props}>
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}
      {children}
    </form>
  );
}`;

      case "table":
        return `import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

export interface TableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
}

export interface LibraryTableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  sortable?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  onRowClick?: (row: T) => void;
}

type SortDirection = "asc" | "desc" | null;

export function LibraryTable<T extends Record<string, any>>({
  columns,
  data,
  sortable = false,
  striped = false,
  hoverable = false,
  bordered = false,
  size = "md",
  className,
  onRowClick
}: LibraryTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    if (sortColumn === columnKey) {
      setSortDirection(
        sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc"
      );
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  const sizes = {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base"
  };

  const cellPadding = {
    sm: "px-3 py-2",
    md: "px-4 py-3",
    lg: "px-6 py-4"
  };

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "text-left font-medium text-gray-500 uppercase tracking-wider",
                  cellPadding[size],
                  sizes[size],
                  column.className,
                  (sortable && column.sortable !== false) && "cursor-pointer hover:bg-gray-100 select-none"
                )}
                onClick={() => column.sortable !== false && handleSort(column.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {sortable && column.sortable !== false && (
                    <div className="flex flex-col">
                      <ChevronUp
                        className={cn(
                          "h-3 w-3",
                          sortColumn === column.key && sortDirection === "asc"
                            ? "text-gray-900"
                            : "text-gray-400"
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          "h-3 w-3 -mt-1",
                          sortColumn === column.key && sortDirection === "desc"
                            ? "text-gray-900"
                            : "text-gray-400"
                        )}
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cn("bg-white divide-y divide-gray-200", striped && "divide-gray-100")}>
          {sortedData.map((row, index) => (
            <tr
              key={index}
              className={cn(
                striped && index % 2 === 1 && "bg-gray-50",
                hoverable && "hover:bg-gray-50",
                onRowClick && "cursor-pointer",
                bordered && "border"
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    "text-gray-900 whitespace-nowrap",
                    cellPadding[size],
                    sizes[size],
                    column.className
                  )}
                >
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`;

      case "tabs":
        return `import { cn } from "@/lib/utils";
import { useState } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface LibraryTabsProps {
  items: TabItem[];
  defaultTab?: string;
  variant?: "default" | "pills" | "underline";
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
  className?: string;
  onChange?: (tabId: string) => void;
}

export function LibraryTabs({
  items,
  defaultTab,
  variant = "default",
  size = "md",
  orientation = "horizontal",
  className,
  onChange
}: LibraryTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const sizes = {
    sm: "text-sm px-3 py-2",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3"
  };

  const variants = {
    default: {
      tab: "border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700",
      active: "border-blue-500 text-blue-600",
      container: "border-b border-gray-200"
    },
    pills: {
      tab: "rounded-md hover:bg-gray-100 hover:text-gray-700",
      active: "bg-blue-100 text-blue-700",
      container: ""
    },
    underline: {
      tab: "border-b-2 border-transparent hover:border-gray-300",
      active: "border-blue-500 text-blue-600",
      container: "border-b border-gray-200"
    }
  };

  const containerClass = orientation === "horizontal" 
    ? "flex flex-col" 
    : "flex flex-row";

  const tabListClass = orientation === "horizontal" 
    ? cn("flex space-x-1", variants[variant].container)
    : "flex flex-col space-y-1 min-w-[200px] mr-6";

  const contentClass = orientation === "horizontal" 
    ? "mt-4" 
    : "flex-1";

  return (
    <div className={cn(containerClass, className)}>
      <div className={tabListClass}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => !item.disabled && handleTabChange(item.id)}
            disabled={item.disabled}
            className={cn(
              "font-medium transition-colors focus:outline-none",
              sizes[size],
              variants[variant].tab,
              activeTab === item.id && variants[variant].active,
              item.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      
      <div className={contentClass}>
        {items.find(item => item.id === activeTab)?.content}
      </div>
    </div>
  );
}`;

      case "alert":
        return `import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

export interface LibraryAlertProps {
  variant?: "success" | "error" | "warning" | "info";
  title?: string;
  children?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function LibraryAlert({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  icon,
  className
}: LibraryAlertProps) {
  const variants = {
    success: {
      container: "bg-green-50 border-green-200 text-green-800",
      icon: <CheckCircle className="h-5 w-5 text-green-400" />,
      title: "text-green-800",
      content: "text-green-700"
    },
    error: {
      container: "bg-red-50 border-red-200 text-red-800",
      icon: <AlertCircle className="h-5 w-5 text-red-400" />,
      title: "text-red-800", 
      content: "text-red-700"
    },
    warning: {
      container: "bg-yellow-50 border-yellow-200 text-yellow-800",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
      title: "text-yellow-800",
      content: "text-yellow-700"
    },
    info: {
      container: "bg-blue-50 border-blue-200 text-blue-800",
      icon: <Info className="h-5 w-5 text-blue-400" />,
      title: "text-blue-800",
      content: "text-blue-700"
    }
  };

  const variantStyles = variants[variant];

  return (
    <div className={cn(
      "border rounded-md p-4",
      variantStyles.container,
      className
    )}>
      <div className="flex">
        <div className="flex-shrink-0">
          {icon || variantStyles.icon}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={cn("text-sm font-medium", variantStyles.title)}>
              {title}
            </h3>
          )}
          {children && (
            <div className={cn(
              "text-sm",
              title ? "mt-2" : "",
              variantStyles.content
            )}>
              {children}
            </div>
          )}
        </div>
        {dismissible && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onDismiss}
                className={cn(
                  "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  variant === "success" && "text-green-500 hover:bg-green-100 focus:ring-green-600",
                  variant === "error" && "text-red-500 hover:bg-red-100 focus:ring-red-600",
                  variant === "warning" && "text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600",
                  variant === "info" && "text-blue-500 hover:bg-blue-100 focus:ring-blue-600"
                )}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}`;

      case "slider":
        return `import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

export interface LibrarySliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  showTicks?: boolean;
  marks?: { value: number; label?: string }[];
  className?: string;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
}

export function LibrarySlider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = min,
  disabled = false,
  orientation = "horizontal",
  size = "md",
  showValue = false,
  showTicks = false,
  marks = [],
  className,
  onChange,
  onChangeEnd
}: LibrarySliderProps) {
  const [internalValue, setInternalValue] = useState(value ?? defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const currentValue = value ?? internalValue;

  const sizes = {
    sm: {
      track: orientation === "horizontal" ? "h-1" : "w-1 h-32",
      thumb: "w-3 h-3",
      container: orientation === "horizontal" ? "h-3" : "w-3"
    },
    md: {
      track: orientation === "horizontal" ? "h-2" : "w-2 h-40",
      thumb: "w-4 h-4",
      container: orientation === "horizontal" ? "h-4" : "w-4"
    },
    lg: {
      track: orientation === "horizontal" ? "h-3" : "w-3 h-48",
      thumb: "w-5 h-5",
      container: orientation === "horizontal" ? "h-5" : "w-5"
    }
  };

  const updateValue = (newValue: number) => {
    const clampedValue = Math.max(min, Math.min(max, newValue));
    const steppedValue = Math.round(clampedValue / step) * step;
    
    setInternalValue(steppedValue);
    onChange?.(steppedValue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    updateValueFromEvent(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || disabled) return;
    updateValueFromEvent(e);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onChangeEnd?.(currentValue);
    }
  };

  const updateValueFromEvent = (e: MouseEvent | React.MouseEvent) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    let percentage;

    if (orientation === "horizontal") {
      percentage = (e.clientX - rect.left) / rect.width;
    } else {
      percentage = 1 - (e.clientY - rect.top) / rect.height;
    }

    const newValue = min + percentage * (max - min);
    updateValue(newValue);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  const percentage = ((currentValue - min) / (max - min)) * 100;

  const containerClass = orientation === "horizontal"
    ? "relative flex items-center w-full"
    : "relative flex justify-center h-full";

  const trackClass = cn(
    "bg-gray-200 rounded-full relative cursor-pointer",
    sizes[size].track,
    disabled && "cursor-not-allowed opacity-50"
  );

  const fillClass = orientation === "horizontal"
    ? "absolute left-0 top-0 h-full bg-blue-500 rounded-full"
    : "absolute bottom-0 left-0 w-full bg-blue-500 rounded-full";

  const thumbClass = cn(
    "absolute bg-white border-2 border-blue-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 shadow-sm",
    sizes[size].thumb,
    disabled && "cursor-not-allowed",
    isDragging && "scale-110"
  );

  const thumbStyle = orientation === "horizontal"
    ? { left: \`\${percentage}%\`, top: "50%" }
    : { left: "50%", bottom: \`\${percentage}%\` };

  return (
    <div className={cn("slider-container", className)}>
      <div className={containerClass}>
        <div
          ref={sliderRef}
          className={trackClass}
          onMouseDown={handleMouseDown}
        >
          <div
            className={fillClass}
            style={
              orientation === "horizontal"
                ? { width: \`\${percentage}%\` }
                : { height: \`\${percentage}%\` }
            }
          />
          <div
            className={thumbClass}
            style={thumbStyle}
          />
          
          {showTicks && (
            <div className="absolute inset-0">
              {Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => {
                const tickValue = min + i * step;
                const tickPercentage = ((tickValue - min) / (max - min)) * 100;
                
                return (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-gray-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    style={
                      orientation === "horizontal"
                        ? { left: \`\${tickPercentage}%\`, top: "50%" }
                        : { left: "50%", bottom: \`\${tickPercentage}%\` }
                    }
                  />
                );
              })}
            </div>
          )}
        </div>

        {showValue && (
          <div className={cn(
            "ml-3 text-sm font-medium text-gray-700 min-w-[3ch]",
            orientation === "vertical" && "ml-0 mt-3"
          )}>
            {currentValue.toFixed(step < 1 ? 1 : 0)}
          </div>
        )}
      </div>

      {marks.length > 0 && (
        <div className="relative mt-2">
          {marks.map((mark, index) => {
            const markPercentage = ((mark.value - min) / (max - min)) * 100;
            
            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2"
                style={{ left: \`\${markPercentage}%\` }}
              >
                <div className="w-0.5 h-2 bg-gray-400 mx-auto" />
                {mark.label && (
                  <span className="block text-xs text-gray-500 mt-1 text-center">
                    {mark.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  defaultValue?: [number, number];
  disabled?: boolean;
  className?: string;
  onChange?: (value: [number, number]) => void;
}

export function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = [min, max],
  disabled = false,
  className,
  onChange
}: RangeSliderProps) {
  const [internalValue, setInternalValue] = useState<[number, number]>(value ?? defaultValue);
  const currentValue = value ?? internalValue;

  const handleChange = (newValue: [number, number]) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const [minValue, maxValue] = currentValue;
  const minPercentage = ((minValue - min) / (max - min)) * 100;
  const maxPercentage = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className={cn("relative w-full h-4 flex items-center", className)}>
      <div className="w-full h-2 bg-gray-200 rounded-full relative">
        <div
          className="absolute h-full bg-blue-500 rounded-full"
          style={{
            left: \`\${minPercentage}%\`,
            width: \`\${maxPercentage - minPercentage}%\`
          }}
        />
        
        <div
          className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 shadow-sm"
          style={{ left: \`\${minPercentage}%\`, top: "50%" }}
        />
        <div
          className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 shadow-sm"
          style={{ left: \`\${maxPercentage}%\`, top: "50%" }}
        />
      </div>
      
      <div className="ml-3 text-sm font-medium text-gray-700">
        {minValue} - {maxValue}
      </div>
    </div>
  );
}`;

      case "sticky-note":
        return `import { cn } from "@/lib/utils";
import { X, Pin } from "lucide-react";
import { useState } from "react";

export interface LibraryStickyNoteProps {
  title?: string;
  content: string;
  color?: "yellow" | "blue" | "green" | "pink" | "purple" | "orange";
  size?: "sm" | "md" | "lg";
  pinned?: boolean;
  editable?: boolean;
  onEdit?: (content: string) => void;
  onDelete?: () => void;
  onPin?: (pinned: boolean) => void;
  className?: string;
}

export function LibraryStickyNote({
  title,
  content,
  color = "yellow",
  size = "md",
  pinned = false,
  editable = false,
  onEdit,
  onDelete,
  onPin,
  className
}: LibraryStickyNoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const colors = {
    yellow: "bg-yellow-200 border-yellow-300 text-yellow-900",
    blue: "bg-blue-200 border-blue-300 text-blue-900",
    green: "bg-green-200 border-green-300 text-green-900",
    pink: "bg-pink-200 border-pink-300 text-pink-900",
    purple: "bg-purple-200 border-purple-300 text-purple-900",
    orange: "bg-orange-200 border-orange-300 text-orange-900"
  };

  const sizes = {
    sm: "w-32 h-32 text-xs p-2",
    md: "w-48 h-48 text-sm p-3",
    lg: "w-64 h-64 text-base p-4"
  };

  const handleSave = () => {
    onEdit?.(editContent);
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        "relative border-2 shadow-md transform rotate-1 hover:rotate-0 transition-transform",
        colors[color],
        sizes[size],
        className
      )}
    >
      <div className="absolute top-1 right-1 flex space-x-1">
        {onPin && (
          <button
            onClick={() => onPin(!pinned)}
            className={cn(
              "w-4 h-4 rounded-full flex items-center justify-center hover:bg-black/10",
              pinned && "text-red-500"
            )}
          >
            <Pin className="w-3 h-3" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-black/10"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="h-full flex flex-col">
        {title && (
          <h3 className="font-semibold mb-2 text-sm truncate">{title}</h3>
        )}
        
        {isEditing ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                handleSave();
              }
            }}
            className="flex-1 bg-transparent border-none outline-none resize-none text-inherit"
            autoFocus
          />
        ) : (
          <div
            className="flex-1 overflow-hidden"
            onClick={() => editable && setIsEditing(true)}
          >
            <p className="text-sm whitespace-pre-wrap break-words">
              {content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}`;

      case "color-picker":
        return `import { cn } from "@/lib/utils";
import { useState } from "react";

export interface LibraryColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  presetColors?: string[];
  showInput?: boolean;
  showPresets?: boolean;
  disabled?: boolean;
  className?: string;
}

export function LibraryColorPicker({
  value = "#000000",
  onChange,
  presetColors = [
    "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff",
    "#000000", "#ffffff", "#808080", "#800000", "#008000", "#000080"
  ],
  showInput = true,
  showPresets = true,
  disabled = false,
  className
}: LibraryColorPickerProps) {
  const [currentColor, setCurrentColor] = useState(value);

  const handleColorChange = (newColor: string) => {
    setCurrentColor(newColor);
    onChange?.(newColor);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center space-x-3">
        <div
          className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer relative overflow-hidden"
          style={{ backgroundColor: currentColor }}
        >
          <input
            type="color"
            value={currentColor}
            onChange={(e) => handleColorChange(e.target.value)}
            disabled={disabled}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        
        {showInput && (
          <input
            type="text"
            value={currentColor}
            onChange={(e) => handleColorChange(e.target.value)}
            disabled={disabled}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            placeholder="#000000"
          />
        )}
      </div>

      {showPresets && (
        <div className="grid grid-cols-6 gap-2">
          {presetColors.map((color, index) => (
            <button
              key={index}
              onClick={() => handleColorChange(color)}
              disabled={disabled}
              className={cn(
                "w-8 h-8 rounded border-2 border-gray-300 hover:scale-110 transition-transform",
                currentColor === color && "border-blue-500 border-4"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  );
}`;

      case "countdown-timer":
        return `import { cn } from "@/lib/utils";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export interface LibraryCountdownTimerProps {
  initialTime?: number; // in seconds
  onComplete?: () => void;
  onTick?: (timeLeft: number) => void;
  autoStart?: boolean;
  showControls?: boolean;
  format?: "mm:ss" | "hh:mm:ss" | "compact";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LibraryCountdownTimer({
  initialTime = 60,
  onComplete,
  onTick,
  autoStart = false,
  showControls = true,
  format = "mm:ss",
  size = "md",
  className
}: LibraryCountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          onTick?.(newTime);
          
          if (newTime <= 0) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, onTick, onComplete]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    switch (format) {
      case "hh:mm:ss":
        return \`\${hrs.toString().padStart(2, '0')}:\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
      case "compact":
        if (hrs > 0) return \`\${hrs}h \${mins}m \${secs}s\`;
        if (mins > 0) return \`\${mins}m \${secs}s\`;
        return \`\${secs}s\`;
      default:
        return \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
    }
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl"
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      <div className={cn("font-mono font-bold", sizes[size], timeLeft <= 10 && "text-red-500")}>
        {formatTime(timeLeft)}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
          style={{ width: \`\${progress}%\` }}
        />
      </div>

      {showControls && (
        <div className="flex space-x-2">
          <button
            onClick={toggleTimer}
            className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          
          <button
            onClick={resetTimer}
            className="flex items-center justify-center w-10 h-10 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}`;

      case "table-of-contents":
        return `import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export interface TOCItem {
  id: string;
  title: string;
  level: number;
  children?: TOCItem[];
}

export interface LibraryTableOfContentsProps {
  items: TOCItem[];
  activeId?: string;
  onItemClick?: (id: string) => void;
  collapsible?: boolean;
  className?: string;
}

export function LibraryTableOfContents({
  items,
  activeId,
  onItemClick,
  collapsible = true,
  className
}: LibraryTableOfContentsProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const renderItem = (item: TOCItem, depth = 0) => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = activeId === item.id;

    return (
      <div key={item.id}>
        <div
          className={cn(
            "flex items-center py-1 px-2 rounded cursor-pointer hover:bg-gray-100 transition-colors",
            isActive && "bg-blue-100 text-blue-700 font-medium"
          )}
          style={{ paddingLeft: \`\${depth * 16 + 8}px\` }}
          onClick={() => onItemClick?.(item.id)}
        >
          {hasChildren && collapsible && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(item.id);
              }}
              className="mr-1 p-0.5 hover:bg-gray-200 rounded"
            >
              <ChevronRight
                className={cn(
                  "w-3 h-3 transition-transform",
                  isExpanded && "transform rotate-90"
                )}
              />
            </button>
          )}
          
          <span className={cn(
            "text-sm truncate",
            item.level === 1 && "font-semibold",
            item.level === 2 && "font-medium",
            item.level >= 3 && "text-gray-600"
          )}>
            {item.title}
          </span>
        </div>

        {hasChildren && (isExpanded || !collapsible) && (
          <div>
            {item.children!.map((child) => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={cn("space-y-1", className)}>
      <div className="text-sm font-semibold text-gray-900 mb-2">
        Table of Contents
      </div>
      {items.map((item) => renderItem(item))}
    </nav>
  );
}`;

      case "file-upload":
        return `import { cn } from "@/lib/utils";
import { Upload, X, File, Image, FileText } from "lucide-react";
import { useState, useRef } from "react";

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  progress?: number;
  error?: string;
}

export interface LibraryFileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  onUpload?: (files: File[]) => void;
  onRemove?: (fileId: string) => void;
  uploadedFiles?: UploadedFile[];
  disabled?: boolean;
  dragAndDrop?: boolean;
  showPreview?: boolean;
  className?: string;
}

export function LibraryFileUpload({
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 5,
  onUpload,
  onRemove,
  uploadedFiles = [],
  disabled = false,
  dragAndDrop = true,
  showPreview = true,
  className
}: LibraryFileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || disabled) return;

    const validFiles = Array.from(files).filter(file => {
      if (maxSize && file.size > maxSize) return false;
      if (uploadedFiles.length >= maxFiles) return false;
      return true;
    });

    if (validFiles.length > 0) {
      onUpload?.(validFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && dragAndDrop) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (!disabled && dragAndDrop) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (type.includes('text') || type.includes('document')) return <FileText className="w-4 h-4" />;
    return <File className="w-4 h-4" />;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          isDragOver && "border-blue-500 bg-blue-50",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "border-gray-300 hover:border-gray-400 cursor-pointer"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={disabled}
        />
        
        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-600 mb-1">
          {dragAndDrop ? "Drop files here or click to upload" : "Click to upload files"}
        </p>
        <p className="text-xs text-gray-500">
          Max {maxFiles} files, {formatFileSize(maxSize)} each
        </p>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {getFileIcon(file.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>

              {file.progress !== undefined && file.progress < 100 && (
                <div className="w-20">
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-blue-500 h-1 rounded-full transition-all"
                      style={{ width: \`\${file.progress}%\` }}
                    />
                  </div>
                </div>
              )}

              {file.error && (
                <span className="text-xs text-red-500">{file.error}</span>
              )}

              {onRemove && (
                <button
                  onClick={() => onRemove(file.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`;

      case "drawer":
        return `import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect } from "react";

export interface LibraryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right" | "top" | "bottom";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

export function LibraryDrawer({
  isOpen,
  onClose,
  position = "right",
  size = "md",
  title,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className
}: LibraryDrawerProps) {
  const sizes = {
    sm: position === "left" || position === "right" ? "w-80" : "h-80",
    md: position === "left" || position === "right" ? "w-96" : "h-96",
    lg: position === "left" || position === "right" ? "w-[28rem]" : "h-[28rem]",
    xl: position === "left" || position === "right" ? "w-[32rem]" : "h-[32rem]",
    full: position === "left" || position === "right" ? "w-full" : "h-full"
  };

  const positions = {
    left: "left-0 top-0 h-full",
    right: "right-0 top-0 h-full",
    top: "top-0 left-0 w-full",
    bottom: "bottom-0 left-0 w-full"
  };

  const transforms = {
    left: isOpen ? "translate-x-0" : "-translate-x-full",
    right: isOpen ? "translate-x-0" : "translate-x-full",
    top: isOpen ? "translate-y-0" : "-translate-y-full",
    bottom: isOpen ? "translate-y-0" : "translate-y-full"
  };

  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-25 transition-opacity"
        onClick={handleOverlayClick}
      />
      
      <div
        className={cn(
          "fixed bg-white shadow-xl transition-transform duration-300 ease-out",
          positions[position],
          sizes[size],
          transforms[position],
          className
        )}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {title && (
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
        
        <div className="flex-1 p-4 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}`;

      case "switch":
        return `import { cn } from "@/lib/utils";

export interface LibrarySwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "red" | "purple";
  label?: string;
  description?: string;
  className?: string;
}

export function LibrarySwitch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  size = "md",
  color = "blue",
  label,
  description,
  className
}: LibrarySwitchProps) {
  const isChecked = checked ?? defaultChecked;

  const handleToggle = () => {
    if (!disabled) {
      onChange?.(!isChecked);
    }
  };

  const sizes = {
    sm: {
      container: "w-8 h-4",
      thumb: "w-3 h-3",
      translate: "translate-x-4"
    },
    md: {
      container: "w-11 h-6",
      thumb: "w-5 h-5",
      translate: "translate-x-5"
    },
    lg: {
      container: "w-14 h-7",
      thumb: "w-6 h-6",
      translate: "translate-x-7"
    }
  };

  const colors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    purple: "bg-purple-500"
  };

  return (
    <div className={cn("flex items-center", className)}>
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          sizes[size].container,
          isChecked ? colors[color] : "bg-gray-200",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out",
            sizes[size].thumb,
            isChecked ? sizes[size].translate : "translate-x-0"
          )}
        />
      </button>

      {(label || description) && (
        <div className="ml-3">
          {label && (
            <span className="text-sm font-medium text-gray-900">{label}</span>
          )}
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      )}
    </div>
  );
}`;

      case "snackbar":
        return `import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useEffect, useState } from "react";

export interface LibrarySnackbarProps {
  isVisible: boolean;
  message: string;
  variant?: "success" | "error" | "warning" | "info";
  duration?: number;
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
  showCloseButton?: boolean;
  onClose?: () => void;
  action?: React.ReactNode;
  className?: string;
}

export function LibrarySnackbar({
  isVisible,
  message,
  variant = "info",
  duration = 4000,
  position = "bottom-center",
  showCloseButton = true,
  onClose,
  action,
  className
}: LibrarySnackbarProps) {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
    
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const variants = {
    success: {
      bg: "bg-green-600",
      icon: <CheckCircle className="w-4 h-4" />
    },
    error: {
      bg: "bg-red-600",
      icon: <AlertCircle className="w-4 h-4" />
    },
    warning: {
      bg: "bg-yellow-600",
      icon: <AlertTriangle className="w-4 h-4" />
    },
    info: {
      bg: "bg-blue-600",
      icon: <Info className="w-4 h-4" />
    }
  };

  const positions = {
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
    "bottom-right": "bottom-4 right-4"
  };

  if (!show) return null;

  return (
    <div
      className={cn(
        "fixed z-50 flex items-center max-w-sm p-4 text-white rounded-lg shadow-lg",
        variants[variant].bg,
        positions[position],
        className
      )}
    >
      <div className="flex items-center space-x-3">
        {variants[variant].icon}
        <span className="text-sm font-medium">{message}</span>
      </div>
      
      {action && (
        <div className="ml-3">
          {action}
        </div>
      )}
      
      {showCloseButton && (
        <button
          onClick={() => {
            setShow(false);
            onClose?.();
          }}
          className="ml-3 text-white hover:text-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}`;

      case "list":
        return `import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export interface ListItem {
  id: string;
  content: React.ReactNode;
  secondary?: React.ReactNode;
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface LibraryListProps {
  items: ListItem[];
  variant?: "default" | "card" | "bordered";
  size?: "sm" | "md" | "lg";
  showDividers?: boolean;
  hoverable?: boolean;
  className?: string;
}

export function LibraryList({
  items,
  variant = "default",
  size = "md",
  showDividers = true,
  hoverable = true,
  className
}: LibraryListProps) {
  const sizes = {
    sm: "py-2 px-3",
    md: "py-3 px-4",
    lg: "py-4 px-6"
  };

  const variants = {
    default: "bg-white",
    card: "bg-white rounded-lg shadow-sm border border-gray-200",
    bordered: "bg-white border border-gray-200 rounded-md"
  };

  return (
    <div className={cn(variants[variant], className)}>
      {items.map((item, index) => (
        <div key={item.id}>
          <div
            className={cn(
              "flex items-center justify-between transition-colors",
              sizes[size],
              item.onClick && "cursor-pointer",
              hoverable && !item.disabled && "hover:bg-gray-50",
              item.disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={!item.disabled ? item.onClick : undefined}
          >
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              {item.avatar && (
                <div className="flex-shrink-0">
                  {item.avatar}
                </div>
              )}
              
              {item.icon && !item.avatar && (
                <div className="flex-shrink-0 text-gray-400">
                  {item.icon}
                </div>
              )}
              
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-gray-900">
                  {item.content}
                </div>
                {item.secondary && (
                  <div className="text-sm text-gray-500 mt-1">
                    {item.secondary}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {item.action}
              {item.onClick && !item.disabled && (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </div>
          </div>
          
          {showDividers && index < items.length - 1 && (
            <div className="border-b border-gray-200" />
          )}
        </div>
      ))}
    </div>
  );
}`;

      case "divider":
        return `import { cn } from "@/lib/utils";

export interface LibraryDividerProps {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted";
  thickness?: "thin" | "medium" | "thick";
  color?: "gray" | "blue" | "red" | "green";
  spacing?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  className?: string;
}

export function LibraryDivider({
  orientation = "horizontal",
  variant = "solid",
  thickness = "thin",
  color = "gray",
  spacing = "md",
  children,
  className
}: LibraryDividerProps) {
  const baseStyles = orientation === "horizontal" ? "w-full" : "h-full";
  
  const thicknesses = {
    thin: orientation === "horizontal" ? "border-t" : "border-l",
    medium: orientation === "horizontal" ? "border-t-2" : "border-l-2",
    thick: orientation === "horizontal" ? "border-t-4" : "border-l-4"
  };

  const variants = {
    solid: "border-solid",
    dashed: "border-dashed",
    dotted: "border-dotted"
  };

  const colors = {
    gray: "border-gray-300",
    blue: "border-blue-300",
    red: "border-red-300",
    green: "border-green-300"
  };

  const spacings = {
    sm: orientation === "horizontal" ? "my-2" : "mx-2",
    md: orientation === "horizontal" ? "my-4" : "mx-4",
    lg: orientation === "horizontal" ? "my-6" : "mx-6"
  };

  if (children) {
    return (
      <div className={cn("relative flex items-center", spacings[spacing], className)}>
        <div className={cn(
          "flex-1",
          thicknesses[thickness],
          variants[variant],
          colors[color]
        )} />
        <div className="px-3 text-sm text-gray-500 bg-white">
          {children}
        </div>
        <div className={cn(
          "flex-1",
          thicknesses[thickness],
          variants[variant],
          colors[color]
        )} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        baseStyles,
        thicknesses[thickness],
        variants[variant],
        colors[color],
        spacings[spacing],
        className
      )}
    />
  );
}`;

      case "collapse":
        return `import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface LibraryCollapseProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  variant?: "default" | "bordered" | "ghost";
  size?: "sm" | "md" | "lg";
  onChange?: (expanded: boolean) => void;
  className?: string;
}

export function LibraryCollapse({
  title,
  children,
  defaultExpanded = false,
  disabled = false,
  icon,
  variant = "default",
  size = "md",
  onChange,
  className
}: LibraryCollapseProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    if (!disabled) {
      const newExpanded = !isExpanded;
      setIsExpanded(newExpanded);
      onChange?.(newExpanded);
    }
  };

  const sizes = {
    sm: "p-3 text-sm",
    md: "p-4 text-base",
    lg: "p-6 text-lg"
  };

  const variants = {
    default: "bg-white border border-gray-200 rounded-md",
    bordered: "border-2 border-gray-300 rounded-lg",
    ghost: "bg-transparent"
  };

  return (
    <div className={cn(variants[variant], className)}>
      <button
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          "w-full flex items-center justify-between transition-colors",
          sizes[size],
          !disabled && "hover:bg-gray-50",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <div className="flex items-center space-x-3">
          {icon && (
            <div className="text-gray-500">
              {icon}
            </div>
          )}
          <div className="font-medium text-left">
            {title}
          </div>
        </div>
        
        <ChevronDown
          className={cn(
            "w-4 h-4 text-gray-500 transition-transform duration-200",
            isExpanded && "transform rotate-180"
          )}
        />
      </button>
      
      {isExpanded && (
        <div className={cn(
          "border-t border-gray-200",
          variant === "ghost" && "border-t border-gray-200 mt-2 pt-2"
        )}>
          <div className={cn(
            size === "sm" && "p-3",
            size === "md" && "p-4",
            size === "lg" && "p-6"
          )}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}`;

      case "toast":
        return `import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useEffect, useState } from "react";

export interface LibraryToastProps {
  id?: string;
  title?: string;
  description?: string;
  variant?: "success" | "error" | "warning" | "info";
  duration?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  showCloseButton?: boolean;
  onClose?: (id?: string) => void;
  action?: React.ReactNode;
  className?: string;
}

export function LibraryToast({
  id,
  title,
  description,
  variant = "info",
  duration = 5000,
  position = "top-right",
  showCloseButton = true,
  onClose,
  action,
  className
}: LibraryToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose?.(id), 300); // Wait for animation
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose, id]);

  const variants = {
    success: {
      bg: "bg-green-50 border-green-200",
      text: "text-green-800",
      icon: <CheckCircle className="w-5 h-5 text-green-400" />
    },
    error: {
      bg: "bg-red-50 border-red-200",
      text: "text-red-800",
      icon: <AlertCircle className="w-5 h-5 text-red-400" />
    },
    warning: {
      bg: "bg-yellow-50 border-yellow-200",
      text: "text-yellow-800",
      icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />
    },
    info: {
      bg: "bg-blue-50 border-blue-200",
      text: "text-blue-800",
      icon: <Info className="w-5 h-5 text-blue-400" />
    }
  };

  const positions = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4"
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(id), 300);
  };

  return (
    <div
      className={cn(
        "fixed z-50 max-w-sm w-full border rounded-lg shadow-lg p-4 transition-all duration-300",
        variants[variant].bg,
        positions[position],
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        className
      )}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {variants[variant].icon}
        </div>
        
        <div className="ml-3 w-0 flex-1">
          {title && (
            <p className={cn("text-sm font-medium", variants[variant].text)}>
              {title}
            </p>
          )}
          {description && (
            <p className={cn("text-sm mt-1", variants[variant].text, !title && "font-medium")}>
              {description}
            </p>
          )}
          
          {action && (
            <div className="mt-3">
              {action}
            </div>
          )}
        </div>
        
        {showCloseButton && (
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={handleClose}
              className={cn(
                "inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
                variants[variant].text,
                "hover:opacity-75"
              )}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}`;

      case "rating":
        return `import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";

export interface LibraryRatingProps {
  value?: number;
  defaultValue?: number;
  max?: number;
  precision?: number;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
  disabled?: boolean;
  showValue?: boolean;
  allowClear?: boolean;
  icon?: React.ReactNode;
  emptyIcon?: React.ReactNode;
  onChange?: (value: number) => void;
  className?: string;
}

export function LibraryRating({
  value,
  defaultValue = 0,
  max = 5,
  precision = 1,
  size = "md",
  readOnly = false,
  disabled = false,
  showValue = false,
  allowClear = false,
  icon = <Star className="w-full h-full" />,
  emptyIcon = <Star className="w-full h-full" />,
  onChange,
  className
}: LibraryRatingProps) {
  const [rating, setRating] = useState(value ?? defaultValue);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const currentRating = value ?? rating;
  const displayRating = hoverRating ?? currentRating;

  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const handleClick = (newRating: number) => {
    if (readOnly || disabled) return;
    
    const finalRating = allowClear && newRating === currentRating ? 0 : newRating;
    setRating(finalRating);
    onChange?.(finalRating);
  };

  const handleMouseEnter = (newRating: number) => {
    if (!readOnly && !disabled) {
      setHoverRating(newRating);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly && !disabled) {
      setHoverRating(null);
    }
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const isFilled = displayRating >= starValue;
    const isPartiallyFilled = displayRating > index && displayRating < starValue;
    
    return (
      <button
        key={index}
        type="button"
        onClick={() => handleClick(starValue)}
        onMouseEnter={() => handleMouseEnter(starValue)}
        onMouseLeave={handleMouseLeave}
        disabled={disabled}
        className={cn(
          "relative transition-colors duration-150",
          sizes[size],
          !readOnly && !disabled && "hover:scale-110 cursor-pointer",
          disabled && "cursor-not-allowed opacity-50",
          readOnly && "cursor-default"
        )}
      >
        <div className="absolute inset-0 text-gray-300">
          {emptyIcon}
        </div>
        
        <div
          className={cn(
            "absolute inset-0 overflow-hidden transition-colors duration-150",
            isFilled || isPartiallyFilled ? "text-yellow-400" : "text-transparent"
          )}
          style={{
            width: isPartiallyFilled 
              ? \`\${((displayRating - index) * 100)}%\`
              : isFilled ? "100%" : "0%"
          }}
        >
          {icon}
        </div>
      </button>
    );
  };

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <div className="flex items-center space-x-1">
        {Array.from({ length: max }, (_, index) => renderStar(index))}
      </div>
      
      {showValue && (
        <span className="ml-2 text-sm text-gray-600">
          {currentRating.toFixed(precision === 0.5 ? 1 : 0)} / {max}
        </span>
      )}
    </div>
  );
}`;

      case "calendar":
        return `import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export interface LibraryCalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  highlightedDates?: Date[];
  showWeekNumbers?: boolean;
  firstDayOfWeek?: 0 | 1; // 0 = Sunday, 1 = Monday
  className?: string;
}

export function LibraryCalendar({
  value,
  defaultValue = new Date(),
  onChange,
  minDate,
  maxDate,
  disabledDates = [],
  highlightedDates = [],
  showWeekNumbers = false,
  firstDayOfWeek = 0,
  className
}: LibraryCalendarProps) {
  const [currentDate, setCurrentDate] = useState(value ?? defaultValue);
  const [viewDate, setViewDate] = useState(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));

  const selectedDate = value ?? currentDate;

  const daysOfWeek = firstDayOfWeek === 0 
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return disabledDates.some(disabledDate => isSameDay(date, disabledDate));
  };

  const isDateHighlighted = (date: Date) => {
    return highlightedDates.some(highlightedDate => isSameDay(date, highlightedDate));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    let startDate = new Date(firstDay);
    const dayOfWeek = firstDay.getDay();
    const daysToSubtract = firstDayOfWeek === 0 ? dayOfWeek : (dayOfWeek + 6) % 7;
    startDate.setDate(startDate.getDate() - daysToSubtract);

    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const handleDateClick = (date: Date) => {
    if (!isDateDisabled(date)) {
      setCurrentDate(date);
      onChange?.(date);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(viewDate);
    newDate.setMonth(viewDate.getMonth() + (direction === 'next' ? 1 : -1));
    setViewDate(newDate);
  };

  const days = getDaysInMonth(viewDate);

  return (
    <div className={cn("bg-white border border-gray-200 rounded-lg p-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <h2 className="text-lg font-semibold">
          {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
        </h2>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {showWeekNumbers && <div className="text-xs text-gray-500 text-center p-2">W</div>}
        {daysOfWeek.map((day) => (
          <div key={day} className="text-xs text-gray-500 text-center p-2 font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isCurrentMonth = day.getMonth() === viewDate.getMonth();
          const isSelected = isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());
          const disabled = isDateDisabled(day);
          const highlighted = isDateHighlighted(day);

          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              disabled={disabled}
              className={cn(
                "w-8 h-8 text-sm rounded-md transition-colors",
                isCurrentMonth ? "text-gray-900" : "text-gray-400",
                isSelected && "bg-blue-500 text-white",
                isToday && !isSelected && "bg-blue-100 text-blue-600",
                highlighted && !isSelected && "bg-yellow-100",
                !disabled && !isSelected && "hover:bg-gray-100",
                disabled && "cursor-not-allowed opacity-50"
              )}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}`;

      case "spinner":
        return `import { cn } from "@/lib/utils";

export interface LibrarySpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "border" | "dots" | "pulse" | "bars";
  color?: "blue" | "gray" | "green" | "red" | "yellow";
  speed?: "slow" | "normal" | "fast";
  label?: string;
  className?: string;
}

export function LibrarySpinner({
  size = "md",
  variant = "border",
  color = "blue",
  speed = "normal",
  label,
  className
}: LibrarySpinnerProps) {
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  const colors = {
    blue: "border-blue-500 text-blue-500",
    gray: "border-gray-500 text-gray-500",
    green: "border-green-500 text-green-500",
    red: "border-red-500 text-red-500",
    yellow: "border-yellow-500 text-yellow-500"
  };

  const speeds = {
    slow: "animate-spin duration-2000",
    normal: "animate-spin",
    fast: "animate-spin duration-500"
  };

  const renderSpinner = () => {
    switch (variant) {
      case "border":
        return (
          <div
            className={cn(
              "border-2 border-gray-200 rounded-full",
              "border-t-2",
              colors[color],
              sizes[size],
              speeds[speed],
              className
            )}
          />
        );
      
      case "dots":
        return (
          <div className={cn("flex space-x-1", className)}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "rounded-full",
                  colors[color].split(' ')[1],
                  size === "xs" && "w-1 h-1",
                  size === "sm" && "w-1.5 h-1.5",
                  size === "md" && "w-2 h-2",
                  size === "lg" && "w-3 h-3",
                  size === "xl" && "w-4 h-4"
                )}
                style={{
                  animation: \`bounce 1.4s ease-in-out \${i * 0.16}s infinite both\`
                }}
              />
            ))}
          </div>
        );
      
      case "pulse":
        return (
          <div
            className={cn(
              "rounded-full animate-pulse",
              colors[color].split(' ')[1],
              sizes[size],
              className
            )}
          />
        );
      
      case "bars":
        return (
          <div className={cn("flex space-x-1", className)}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  colors[color].split(' ')[1],
                  size === "xs" && "w-0.5 h-3",
                  size === "sm" && "w-0.5 h-4",
                  size === "md" && "w-1 h-6",
                  size === "lg" && "w-1 h-8",
                  size === "xl" && "w-1.5 h-12"
                )}
                style={{
                  animation: \`stretchdelay 1.2s infinite ease-in-out \${i * 0.1}s\`
                }}
              />
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={cn("flex flex-col items-center space-y-2", className)}>
      {renderSpinner()}
      {label && (
        <span className="text-sm text-gray-600">{label}</span>
      )}
    </div>
  );
}`;

      case "timeline":
        return `import { cn } from "@/lib/utils";
import { Check, Clock, AlertCircle } from "lucide-react";

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  status?: "completed" | "current" | "pending" | "error";
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

export interface LibraryTimelineProps {
  items: TimelineItem[];
  orientation?: "vertical" | "horizontal";
  variant?: "default" | "compact" | "detailed";
  showConnectors?: boolean;
  className?: string;
}

export function LibraryTimeline({
  items,
  orientation = "vertical",
  variant = "default",
  showConnectors = true,
  className
}: LibraryTimelineProps) {
  const getStatusIcon = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="w-4 h-4" />;
      case "current":
        return <Clock className="w-4 h-4" />;
      case "error":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <div className="w-2 h-2 bg-gray-300 rounded-full" />;
    }
  };

  const getStatusColors = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white";
      case "current":
        return "bg-blue-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300 text-gray-600";
    }
  };

  if (orientation === "horizontal") {
    return (
      <div className={cn("flex items-center space-x-4 overflow-x-auto", className)}>
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center space-x-4 flex-shrink-0">
            <div className="flex flex-col items-center space-y-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                getStatusColors(item.status)
              )}>
                {item.icon || getStatusIcon(item.status)}
              </div>
              
              <div className="text-center">
                <div className="text-sm font-medium">{item.title}</div>
                {item.timestamp && (
                  <div className="text-xs text-gray-500">{item.timestamp}</div>
                )}
              </div>
            </div>
            
            {showConnectors && index < items.length - 1 && (
              <div className="w-8 h-0.5 bg-gray-300" />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <div key={item.id} className="relative">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                getStatusColors(item.status)
              )}>
                {item.icon || getStatusIcon(item.status)}
              </div>
              
              {showConnectors && index < items.length - 1 && (
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gray-300" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                {item.timestamp && (
                  <span className="text-xs text-gray-500">{item.timestamp}</span>
                )}
              </div>
              
              {item.description && (
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              )}
              
              {item.content && (
                <div className="mt-2">{item.content}</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}`;

      case "chip":
        return `import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface LibraryChipProps {
  label: string;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  color?: "blue" | "green" | "red" | "yellow" | "purple" | "gray";
  avatar?: React.ReactNode;
  icon?: React.ReactNode;
  deletable?: boolean;
  clickable?: boolean;
  disabled?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
  className?: string;
}

export function LibraryChip({
  label,
  variant = "filled",
  size = "md",
  color = "blue",
  avatar,
  icon,
  deletable = false,
  clickable = false,
  disabled = false,
  onDelete,
  onClick,
  className
}: LibraryChipProps) {
  const sizes = {
    sm: "h-6 px-2 text-xs",
    md: "h-8 px-3 text-sm",
    lg: "h-10 px-4 text-base"
  };

  const avatarSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  const variants = {
    filled: {
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      green: "bg-green-100 text-green-800 border-green-200",
      red: "bg-red-100 text-red-800 border-red-200",
      yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
      purple: "bg-purple-100 text-purple-800 border-purple-200",
      gray: "bg-gray-100 text-gray-800 border-gray-200"
    },
    outlined: {
      blue: "bg-transparent text-blue-700 border-blue-300",
      green: "bg-transparent text-green-700 border-green-300",
      red: "bg-transparent text-red-700 border-red-300",
      yellow: "bg-transparent text-yellow-700 border-yellow-300",
      purple: "bg-transparent text-purple-700 border-purple-300",
      gray: "bg-transparent text-gray-700 border-gray-300"
    },
    ghost: {
      blue: "bg-transparent text-blue-700 border-transparent hover:bg-blue-50",
      green: "bg-transparent text-green-700 border-transparent hover:bg-green-50",
      red: "bg-transparent text-red-700 border-transparent hover:bg-red-50",
      yellow: "bg-transparent text-yellow-700 border-transparent hover:bg-yellow-50",
      purple: "bg-transparent text-purple-700 border-transparent hover:bg-purple-50",
      gray: "bg-transparent text-gray-700 border-transparent hover:bg-gray-50"
    }
  };

  const handleClick = () => {
    if (!disabled && clickable && onClick) {
      onClick();
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onDelete) {
      onDelete();
    }
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full border font-medium transition-colors",
        sizes[size],
        variants[variant][color],
        clickable && !disabled && "cursor-pointer hover:opacity-80",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleClick}
    >
      {avatar && (
        <div className={cn("rounded-full overflow-hidden mr-2", avatarSizes[size])}>
          {avatar}
        </div>
      )}
      
      {icon && !avatar && (
        <div className="mr-2">
          {icon}
        </div>
      )}
      
      <span className="truncate">{label}</span>
      
      {deletable && (
        <button
          onClick={handleDelete}
          disabled={disabled}
          className="ml-2 p-0.5 rounded-full hover:bg-black/10 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}`;

      case "stepper":
        return `import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

export interface StepperStep {
  id: string;
  title: string;
  description?: string;
  status?: "completed" | "current" | "pending" | "error";
  optional?: boolean;
  icon?: React.ReactNode;
}

export interface LibraryStepperProps {
  steps: StepperStep[];
  currentStep?: number;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "numbered" | "dots";
  showLabels?: boolean;
  clickable?: boolean;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export function LibraryStepper({
  steps,
  currentStep = 0,
  orientation = "horizontal",
  variant = "default",
  showLabels = true,
  clickable = false,
  onStepClick,
  className
}: LibraryStepperProps) {
  const getStepIcon = (step: StepperStep, index: number) => {
    if (step.icon) return step.icon;
    
    switch (step.status || (index < currentStep ? "completed" : index === currentStep ? "current" : "pending")) {
      case "completed":
        return <Check className="w-4 h-4" />;
      case "error":
        return <X className="w-4 h-4" />;
      default:
        return variant === "numbered" ? (index + 1).toString() : null;
    }
  };

  const getStepColors = (step: StepperStep, index: number) => {
    const status = step.status || (index < currentStep ? "completed" : index === currentStep ? "current" : "pending");
    
    switch (status) {
      case "completed":
        return "bg-green-500 text-white border-green-500";
      case "current":
        return "bg-blue-500 text-white border-blue-500";
      case "error":
        return "bg-red-500 text-white border-red-500";
      default:
        return "bg-gray-200 text-gray-600 border-gray-300";
    }
  };

  const getConnectorColor = (index: number) => {
    return index < currentStep ? "bg-green-500" : "bg-gray-300";
  };

  if (orientation === "vertical") {
    return (
      <div className={cn("space-y-4", className)}>
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <div className="flex items-start space-x-3">
              <div className="relative">
                <button
                  className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors",
                    getStepColors(step, index),
                    clickable && !step.status && "hover:opacity-80 cursor-pointer",
                    !clickable && "cursor-default"
                  )}
                  onClick={() => clickable && onStepClick?.(index)}
                  disabled={!clickable}
                >
                  {variant === "dots" ? null : getStepIcon(step, index)}
                </button>
                
                {index < steps.length - 1 && (
                  <div className={cn(
                    "absolute top-8 left-1/2 transform -translate-x-1/2 w-0.5 h-6",
                    getConnectorColor(index)
                  )} />
                )}
              </div>
              
              {showLabels && (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-medium text-gray-900">{step.title}</h3>
                    {step.optional && (
                      <span className="text-xs text-gray-500">(Optional)</span>
                    )}
                  </div>
                  
                  {step.description && (
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center space-y-2">
            <button
              className={cn(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors",
                getStepColors(step, index),
                clickable && "hover:opacity-80 cursor-pointer",
                !clickable && "cursor-default"
              )}
              onClick={() => clickable && onStepClick?.(index)}
              disabled={!clickable}
            >
              {variant === "dots" ? null : getStepIcon(step, index)}
            </button>
            
            {showLabels && (
              <div className="text-center">
                <div className="text-xs font-medium text-gray-900 whitespace-nowrap">
                  {step.title}
                </div>
                {step.optional && (
                  <div className="text-xs text-gray-500">(Optional)</div>
                )}
              </div>
            )}
          </div>
          
          {index < steps.length - 1 && (
            <div className={cn(
              "w-12 h-0.5 mx-2",
              getConnectorColor(index)
            )} />
          )}
        </div>
      ))}
    </div>
  );
}`;

      case "dropdown":
        return `import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

export interface LibraryDropdownProps {
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  size?: "sm" | "md" | "lg";
  position?: "bottom" | "top";
  onChange?: (value: string | string[]) => void;
  className?: string;
}

export function LibraryDropdown({
  options,
  value,
  defaultValue,
  placeholder = "Select an option",
  multiple = false,
  searchable = false,
  disabled = false,
  clearable = false,
  size = "md",
  position = "bottom",
  onChange,
  className
}: LibraryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    multiple 
      ? (value as string[]) ?? []
      : value ? [value] : defaultValue ? [defaultValue] : []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValues = multiple ? (value as string[]) ?? selectedValues : value ? [value] : selectedValues;

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2.5 text-base"
  };

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const selectedOption = options.find(option => option.value === currentValues[0]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      
      setSelectedValues(newValues);
      onChange?.(newValues);
    } else {
      setSelectedValues([optionValue]);
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValues([]);
    onChange?.(multiple ? [] : "");
  };

  const getDisplayText = () => {
    if (currentValues.length === 0) return placeholder;
    
    if (multiple) {
      if (currentValues.length === 1) {
        const option = options.find(opt => opt.value === currentValues[0]);
        return option?.label || currentValues[0];
      }
      return \`\${currentValues.length} selected\`;
    }
    
    return selectedOption?.label || placeholder;
  };

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full flex items-center justify-between border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
          sizes[size],
          disabled && "bg-gray-100 cursor-not-allowed",
          isOpen && "ring-2 ring-blue-500 border-blue-500"
        )}
      >
        <span className={cn(
          "truncate",
          currentValues.length === 0 && "text-gray-500"
        )}>
          {getDisplayText()}
        </span>
        
        <div className="flex items-center space-x-1">
          {clearable && currentValues.length > 0 && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
          <ChevronDown className={cn(
            "w-4 h-4 text-gray-400 transition-transform",
            isOpen && "transform rotate-180"
          )} />
        </div>
      </button>

      {isOpen && (
        <div className={cn(
          "absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto",
          position === "top" && "bottom-full mb-1 mt-0"
        )}>
          {searchable && (
            <div className="p-2 border-b border-gray-200">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                autoFocus
              />
            </div>
          )}
          
          <div className="py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No options found</div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = currentValues.includes(option.value);
                
                return (
                  <button
                    key={option.value}
                    onClick={() => !option.disabled && handleOptionClick(option.value)}
                    disabled={option.disabled}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center justify-between transition-colors",
                      isSelected && "bg-blue-50 text-blue-700",
                      option.disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      {option.icon && (
                        <span className="text-gray-400">{option.icon}</span>
                      )}
                      <div>
                        <div>{option.label}</div>
                        {option.description && (
                          <div className="text-xs text-gray-500">{option.description}</div>
                        )}
                      </div>
                    </div>
                    
                    {isSelected && (
                      <Check className="w-4 h-4" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}`;
      
      default:
        return `// Component source code for ${componentTitle} will be displayed here
// This would contain the complete TypeScript React component implementation
// including interfaces, props, styling, and functionality.

export interface Library${componentTitle}Props {
  // Component props would be defined here
}

export function Library${componentTitle}(props: Library${componentTitle}Props) {
  // Component implementation would be here
  return <div>{/* Component JSX */}</div>;
}`;
    }
  };

  const renderComponentExamples = () => {
    switch (componentName) {
      case "button":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Variants</h3>
              <div className="flex flex-wrap gap-4">
                <LibraryButton variant="primary">Primary Button</LibraryButton>
                <LibraryButton variant="secondary">Secondary Button</LibraryButton>
                <LibraryButton variant="success">Success Button</LibraryButton>
                <LibraryButton variant="danger">Danger Button</LibraryButton>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <LibraryButton size="sm">Small</LibraryButton>
                <LibraryButton size="md">Medium</LibraryButton>
                <LibraryButton size="lg">Large</LibraryButton>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">With Icons</h3>
              <div className="flex flex-wrap gap-4">
                <LibraryButton variant="success" icon={<Save className="w-4 h-4" />}>Save</LibraryButton>
                <LibraryButton variant="danger" icon={<Trash2 className="w-4 h-4" />}>Delete</LibraryButton>
                <LibraryButton variant="secondary" icon={<Download className="w-4 h-4" />}>Download</LibraryButton>
                <LibraryButton variant="primary" icon={<Copy className="w-4 h-4" />}>Copy</LibraryButton>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">States</h3>
              <div className="flex flex-wrap gap-4">
                <LibraryButton loading>Loading</LibraryButton>
                <LibraryButton disabled>Disabled</LibraryButton>
              </div>
            </div>
          </div>
        );

      case "accordion":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Accordion</h3>
              <LibraryAccordion
                items={[
                  {
                    title: "What is this component library?",
                    content: "This is a professional React component library built with TypeScript and Tailwind CSS. It provides reusable, accessible components for enterprise applications."
                  },
                  {
                    title: "How do I customize the components?",
                    content: "All components accept standard HTML props and additional custom props. You can override styles using Tailwind classes or CSS custom properties."
                  },
                  {
                    title: "Are the components accessible?",
                    content: "Yes, all components follow WCAG 2.1 accessibility guidelines. They include proper ARIA attributes, keyboard navigation, and screen reader support."
                  }
                ]}
              />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Multiple Open Panels</h3>
              <LibraryAccordion
                allowMultiple={true}
                items={[
                  {
                    title: "Panel 1",
                    content: "This accordion allows multiple panels to be open simultaneously."
                  },
                  {
                    title: "Panel 2",
                    content: "You can expand multiple sections at once to compare content."
                  },
                  {
                    title: "Disabled Panel",
                    content: "This panel is disabled.",
                    disabled: true
                  }
                ]}
              />
            </div>
          </div>
        );

      case "carousel":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Image Carousel</h3>
              <LibraryCarousel
                className="h-64"
                items={[
                  {
                    type: "image",
                    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
                    alt: "Modern office workspace"
                  },
                  {
                    type: "image",
                    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
                    alt: "Team collaboration"
                  },
                  {
                    type: "image",
                    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
                    alt: "Digital interface"
                  }
                ]}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Auto-play Carousel</h3>
              <LibraryCarousel
                className="h-48"
                autoPlay={true}
                autoPlayInterval={3000}
                items={[
                  {
                    type: "content",
                    content: <div className="text-center p-8"><h4 className="text-xl font-bold mb-2">Slide 1</h4><p>Auto-play enabled with 3-second intervals</p></div>
                  },
                  {
                    type: "content", 
                    content: <div className="text-center p-8"><h4 className="text-xl font-bold mb-2">Slide 2</h4><p>Smooth transitions between slides</p></div>
                  },
                  {
                    type: "content",
                    content: <div className="text-center p-8"><h4 className="text-xl font-bold mb-2">Slide 3</h4><p>Touch and swipe support included</p></div>
                  }
                ]}
              />
            </div>
          </div>
        );

      case "container":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Grid Layouts</h3>
              <div className="space-y-4">
                <LibraryContainer layout="grid" cols={2} gap="md" className="border border-gray-200 rounded-lg p-4">
                  <div className="bg-blue-100 p-4 rounded text-center">Grid Item 1</div>
                  <div className="bg-blue-100 p-4 rounded text-center">Grid Item 2</div>
                </LibraryContainer>
                
                <LibraryContainer layout="grid" cols={3} gap="sm" className="border border-gray-200 rounded-lg p-4">
                  <div className="bg-green-100 p-4 rounded text-center">Item 1</div>
                  <div className="bg-green-100 p-4 rounded text-center">Item 2</div>
                  <div className="bg-green-100 p-4 rounded text-center">Item 3</div>
                </LibraryContainer>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Flex Layouts</h3>
              <div className="space-y-4">
                <LibraryContainer layout="flex" justify="between" gap="md" className="border border-gray-200 rounded-lg p-4">
                  <div className="bg-purple-100 p-4 rounded">Left</div>
                  <div className="bg-purple-100 p-4 rounded">Right</div>
                </LibraryContainer>
                
                <LibraryContainer layout="flex" justify="center" gap="lg" className="border border-gray-200 rounded-lg p-4">
                  <div className="bg-yellow-100 p-4 rounded">Centered</div>
                  <div className="bg-yellow-100 p-4 rounded">Content</div>
                </LibraryContainer>
              </div>
            </div>
          </div>
        );

      case "navigation":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Navigation</h3>
              <div className="border border-gray-200 rounded-lg">
                <LibraryNavigation
                  logo="MyApp"
                  items={[
                    { label: "Home", href: "/" },
                    { label: "Products", href: "/products" },
                    { label: "Services", href: "/services" },
                    { label: "Contact", href: "/contact" }
                  ]}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">With Breadcrumbs</h3>
              <div className="border border-gray-200 rounded-lg">
                <LibraryNavigation
                  logo={<Box className="w-5 h-5" />}
                  items={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Analytics", href: "/analytics" },
                    { label: "Settings", href: "/settings" }
                  ]}
                  breadcrumbs={["Home", "Components", "Navigation", "Examples"]}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Dropdown Menu</h3>
              <div className="border border-gray-200 rounded-lg">
                <LibraryNavigation
                  logo="Enterprise"
                  items={[
                    { label: "Home", href: "/" },
                    { 
                      label: "Products", 
                      href: "/products",
                      children: [
                        { label: "Web Apps", href: "/products/web" },
                        { label: "Mobile Apps", href: "/products/mobile" },
                        { label: "Desktop Apps", href: "/products/desktop" }
                      ]
                    },
                    { label: "About", href: "/about" }
                  ]}
                />
              </div>
            </div>
          </div>
        );

      case "card":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LibraryCard title="Default Card" subtitle="Basic card example">
                  <p className="text-gray-600">This is a default card with title and subtitle.</p>
                </LibraryCard>
                
                <LibraryCard variant="elevated" title="Elevated Card">
                  <p className="text-gray-600">This card has elevated styling with shadow.</p>
                </LibraryCard>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Interactive Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LibraryCard 
                  variant="outlined" 
                  interactive 
                  title="Click Me" 
                  onClick={() => alert("Card clicked!")}
                >
                  <p className="text-gray-600">This card is interactive and clickable.</p>
                </LibraryCard>
                
                <LibraryCard 
                  variant="filled" 
                  title="Card with Actions"
                  actions={
                    <div className="flex gap-2">
                      <LibraryButton size="sm" variant="primary">Edit</LibraryButton>
                      <LibraryButton size="sm" variant="secondary">Delete</LibraryButton>
                    </div>
                  }
                >
                  <p className="text-gray-600">This card includes action buttons in the footer.</p>
                </LibraryCard>
              </div>
            </div>
          </div>
        );

      case "search-bar":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Search</h3>
              <div className="space-y-4 max-w-md">
                <LibrarySearchBar placeholder="Search..." />
                <LibrarySearchBar variant="filled" placeholder="Filled variant" />
                <LibrarySearchBar variant="outlined" placeholder="Outlined variant" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">With Suggestions</h3>
              <div className="max-w-md">
                <LibrarySearchBar
                  placeholder="Search components..."
                  value={searchValue}
                  onChange={setSearchValue}
                  autoComplete={true}
                  suggestions={["Button", "Card", "Modal", "Table", "Form", "Alert"]}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">With Filter</h3>
              <div className="max-w-md">
                <LibrarySearchBar
                  placeholder="Search with filter..."
                  showFilter={true}
                  onFilterClick={() => alert("Filter clicked!")}
                />
              </div>
            </div>
          </div>
        );

      case "modal":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Modal</h3>
              <div className="space-y-4">
                <LibraryButton onClick={() => setIsModalOpen(true)}>
                  Open Modal
                </LibraryButton>
                <LibraryModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  title="Sample Modal"
                  description="This is a modal dialog example"
                >
                  <p className="text-gray-600 mb-4">
                    Modal content goes here. You can add any content including forms, images, or other components.
                  </p>
                  <ModalFooter>
                    <LibraryButton variant="secondary" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </LibraryButton>
                    <LibraryButton onClick={() => setIsModalOpen(false)}>
                      Confirm
                    </LibraryButton>
                  </ModalFooter>
                </LibraryModal>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Different Sizes</h3>
              <div className="flex flex-wrap gap-4">
                <LibraryButton size="sm" onClick={() => alert("Small modal would open here")}>
                  Small Modal
                </LibraryButton>
                <LibraryButton onClick={() => alert("Medium modal would open here")}>
                  Medium Modal
                </LibraryButton>
                <LibraryButton size="lg" onClick={() => alert("Large modal would open here")}>
                  Large Modal
                </LibraryButton>
              </div>
            </div>
          </div>
        );

      case "form":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Complete Form</h3>
              <div className="max-w-lg">
                <LibraryForm onSubmit={(e) => { e.preventDefault(); alert("Form submitted!"); }}>
                  <FormField>
                    <FormLabel htmlFor="name" required>Full Name</FormLabel>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="email" required>Email Address</FormLabel>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter password"
                      showPasswordToggle
                    />
                  </FormField>

                  <FormField>
                    <FormLabel htmlFor="message">Message</FormLabel>
                    <Textarea 
                      id="message" 
                      placeholder="Your message here..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </FormField>

                  <FormField>
                    <FormLabel>Preferred Contact Method</FormLabel>
                    <RadioGroup
                      name="contact"
                      options={[
                        { value: "email", label: "Email" },
                        { value: "phone", label: "Phone" },
                        { value: "text", label: "Text Message" }
                      ]}
                      value={selectedRadio}
                      onChange={setSelectedRadio}
                    />
                  </FormField>

                  <FormField>
                    <Checkbox label="Subscribe to newsletter" />
                  </FormField>

                  <div className="flex gap-4 pt-4">
                    <LibraryButton type="submit" variant="primary">Submit</LibraryButton>
                    <LibraryButton type="button" variant="secondary">Cancel</LibraryButton>
                  </div>
                </LibraryForm>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Form States</h3>
              <div className="max-w-lg space-y-4">
                <FormField>
                  <FormLabel>Success State</FormLabel>
                  <Input variant="success" value="Valid input" readOnly />
                </FormField>
                <FormField>
                  <FormLabel>Error State</FormLabel>
                  <Input variant="error" value="Invalid input" readOnly />
                </FormField>
                <FormField>
                  <FormLabel>Warning State</FormLabel>
                  <Input variant="warning" value="Warning input" readOnly />
                </FormField>
              </div>
            </div>
          </div>
        );

      case "table":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Table</h3>
              <LibraryTable
                columns={[
                  { key: "id", title: "ID", dataIndex: "id", sortable: true },
                  { key: "name", title: "Name", dataIndex: "name", sortable: true },
                  { key: "email", title: "Email", dataIndex: "email" },
                  { key: "role", title: "Role", dataIndex: "role" },
                  { 
                    key: "actions", 
                    title: "Actions", 
                    render: (_, record) => (
                      <div className="flex gap-2">
                        <LibraryButton size="sm" variant="primary">Edit</LibraryButton>
                        <LibraryButton size="sm" variant="danger">Delete</LibraryButton>
                      </div>
                    )
                  }
                ]}
                data={[
                  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
                  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
                  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
                  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User" }
                ]}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">With Row Selection</h3>
              <LibraryTable
                columns={[
                  { key: "product", title: "Product", dataIndex: "product" },
                  { key: "price", title: "Price", dataIndex: "price" },
                  { key: "status", title: "Status", dataIndex: "status" }
                ]}
                data={[
                  { id: 1, product: "Laptop", price: "$999", status: "In Stock" },
                  { id: 2, product: "Mouse", price: "$29", status: "Out of Stock" },
                  { id: 3, product: "Keyboard", price: "$79", status: "In Stock" }
                ]}
                rowSelection={{
                  selectedRowKeys: [],
                  onChange: (keys, rows) => console.log("Selected:", keys, rows)
                }}
                variant="striped"
              />
            </div>
          </div>
        );

      case "tabs":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Tabs</h3>
              <SimpleTabs
                items={[
                  { 
                    label: "Overview", 
                    value: "overview", 
                    content: <div className="p-4">Overview content with project details and statistics.</div> 
                  },
                  { 
                    label: "Settings", 
                    value: "settings", 
                    content: <div className="p-4">Settings panel for configuration options.</div> 
                  },
                  { 
                    label: "History", 
                    value: "history", 
                    content: <div className="p-4">History of all recent activities and changes.</div> 
                  }
                ]}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Pills Variant</h3>
              <SimpleTabs
                variant="pills"
                items={[
                  { label: "Design", value: "design", content: <div className="p-4">Design specifications and guidelines.</div> },
                  { label: "Code", value: "code", content: <div className="p-4">Code examples and implementation.</div> },
                  { label: "Documentation", value: "docs", content: <div className="p-4">Complete documentation and API reference.</div> }
                ]}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Advanced Tabs</h3>
              <LibraryTabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger value="tab1" icon={<Box className="w-4 h-4" />}>Components</TabsTrigger>
                  <TabsTrigger value="tab2" icon={<Search className="w-4 h-4" />}>Search</TabsTrigger>
                  <TabsTrigger value="tab3" disabled>Disabled</TabsTrigger>
                </TabsList>
                <TabsContent value="tab1">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold mb-2">Component Library</h4>
                    <p>Browse our extensive collection of reusable UI components.</p>
                  </div>
                </TabsContent>
                <TabsContent value="tab2">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold mb-2">Search Components</h4>
                    <p>Find the perfect component for your needs.</p>
                  </div>
                </TabsContent>
              </LibraryTabs>
            </div>
          </div>
        );

      case "alert":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Alert Types</h3>
              <div className="space-y-4">
                <SuccessAlert title="Success!">
                  Your changes have been saved successfully.
                </SuccessAlert>
                <InfoAlert title="Information">
                  This is some important information you should know.
                </InfoAlert>
                <WarningAlert title="Warning">
                  Please review your input before continuing.
                </WarningAlert>
                <ErrorAlert title="Error">
                  An error occurred while processing your request.
                </ErrorAlert>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Dismissible Alerts</h3>
              <div className="space-y-4">
                <LibraryAlert 
                  variant="success" 
                  title="Dismissible Alert"
                  dismissible
                  onDismiss={() => alert("Alert dismissed!")}
                >
                  This alert can be dismissed by clicking the X button.
                </LibraryAlert>
                
                <LibraryAlert 
                  variant="info" 
                  title="Alert with Actions"
                  actions={
                    <div className="flex gap-2">
                      <LibraryButton size="sm" variant="primary">Action</LibraryButton>
                      <LibraryButton size="sm" variant="secondary">Cancel</LibraryButton>
                    </div>
                  }
                >
                  This alert includes custom action buttons.
                </LibraryAlert>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Different Sizes</h3>
              <div className="space-y-4">
                <LibraryAlert variant="info" size="sm" title="Small Alert">
                  This is a small alert message.
                </LibraryAlert>
                <LibraryAlert variant="warning" size="md" title="Medium Alert">
                  This is a medium-sized alert message.
                </LibraryAlert>
                <LibraryAlert variant="error" size="lg" title="Large Alert">
                  This is a large alert message with more content space.
                </LibraryAlert>
              </div>
            </div>
          </div>
        );

      case "badge":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Badges</h3>
              <div className="flex flex-wrap gap-3">
                <LibraryBadge>Default</LibraryBadge>
                <LibraryBadge variant="secondary">Secondary</LibraryBadge>
                <LibraryBadge variant="outline">Outline</LibraryBadge>
                <LibraryBadge variant="destructive">Error</LibraryBadge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Status Badges</h3>
              <div className="flex flex-wrap gap-3">
                <SuccessBadge>Success</SuccessBadge>
                <WarningBadge>Warning</WarningBadge>
                <ErrorBadge>Error</ErrorBadge>
                <InfoBadge>Info</InfoBadge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Badge with Count</h3>
              <div className="flex flex-wrap gap-6">
                <LibraryBadge count={5}>
                  <Bell className="w-6 h-6" />
                </LibraryBadge>
                <LibraryBadge count={99}>
                  <Star className="w-6 h-6" />
                </LibraryBadge>
                <LibraryBadge count={100}>
                  <Settings className="w-6 h-6" />
                </LibraryBadge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Dot Badge</h3>
              <div className="flex flex-wrap gap-6">
                <LibraryBadge dot>
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Bell className="w-4 h-4" />
                  </div>
                </LibraryBadge>
                <LibraryBadge dot variant="destructive">
                  <span className="text-sm">Notifications</span>
                </LibraryBadge>
              </div>
            </div>
          </div>
        );

      case "breadcrumb":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Breadcrumb</h3>
              <LibraryBreadcrumb
                items={[
                  { label: "Components", href: "/components" },
                  { label: "UI Elements", href: "/components/ui" },
                  { label: "Breadcrumb" }
                ]}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Simple Breadcrumb</h3>
              <SimpleBreadcrumb
                items={["Dashboard", "Projects", "Web App", "Components"]}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Custom Separator</h3>
              <LibraryBreadcrumb
                items={[
                  { label: "Home", href: "/" },
                  { label: "Library", href: "/library" },
                  { label: "Components" }
                ]}
                separator={<span>•</span>}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Without Home</h3>
              <LibraryBreadcrumb
                showHome={false}
                items={[
                  { label: "Products", href: "/products" },
                  { label: "Categories", href: "/products/categories" },
                  { label: "Electronics" }
                ]}
              />
            </div>
          </div>
        );

      case "pagination":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Full Pagination</h3>
              <LibraryPagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Simple Pagination</h3>
              <SimplePagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Small Size</h3>
              <LibraryPagination
                currentPage={currentPage}
                totalPages={15}
                onPageChange={setCurrentPage}
                size="sm"
                showFirstLast={false}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Ghost Variant</h3>
              <LibraryPagination
                currentPage={currentPage}
                totalPages={8}
                onPageChange={setCurrentPage}
                variant="ghost"
                siblingCount={2}
              />
            </div>
          </div>
        );

      case "progress":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Linear Progress</h3>
              <div className="space-y-4 max-w-md">
                <LibraryProgress value={progressValue} showLabel label="Loading..." />
                <LibraryProgress value={75} variant="success" />
                <LibraryProgress value={45} variant="warning" size="lg" />
                <LibraryProgress value={20} variant="error" size="sm" />
              </div>
              <div className="mt-4">
                <LibraryButton onClick={() => setProgressValue(Math.min(100, progressValue + 10))}>
                  Increase Progress
                </LibraryButton>
                <LibraryButton 
                  variant="secondary" 
                  onClick={() => setProgressValue(Math.max(0, progressValue - 10))}
                  className="ml-2"
                >
                  Decrease Progress
                </LibraryButton>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Circular Progress</h3>
              <div className="flex gap-6 items-center">
                <CircularProgress value={progressValue} />
                <CircularProgress value={80} variant="success" size={80} />
                <CircularProgress value={30} variant="warning" size={60} />
                <CircularProgress value={90} variant="error" size={100} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Step Progress</h3>
              <StepProgress
                steps={[
                  { label: "Account Setup", completed: true },
                  { label: "Profile Info", active: true },
                  { label: "Preferences", completed: false },
                  { label: "Confirmation", completed: false }
                ]}
              />
            </div>
          </div>
        );

      case "slider":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Slider</h3>
              <div className="max-w-md space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value: {sliderValue}
                  </label>
                  <LibrarySlider
                    value={sliderValue}
                    onChange={(value) => setSliderValue(Array.isArray(value) ? value[0] : value)}
                    min={0}
                    max={100}
                    step={1}
                    showLabels
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Range Slider</h3>
              <div className="max-w-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Range: {Array.isArray(rangeValue) ? `${rangeValue[0]} - ${rangeValue[1]}` : rangeValue}
                </label>
                <RangeSlider
                  value={rangeValue}
                  onChange={setRangeValue}
                  min={0}
                  max={100}
                  showLabels
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">With Marks</h3>
              <div className="max-w-md">
                <LibrarySlider
                  value={50}
                  min={0}
                  max={100}
                  step={25}
                  marks={[
                    { value: 0, label: "0%" },
                    { value: 25, label: "25%" },
                    { value: 50, label: "50%" },
                    { value: 75, label: "75%" },
                    { value: 100, label: "100%" }
                  ]}
                  showLabels
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Vertical Slider</h3>
              <div className="flex gap-8">
                <LibrarySlider
                  value={30}
                  orientation="vertical"
                  min={0}
                  max={100}
                />
                <LibrarySlider
                  value={70}
                  orientation="vertical"
                  min={0}
                  max={100}
                  disabled
                />
              </div>
            </div>
          </div>
        );

      case "tooltip":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Tooltips</h3>
              <div className="flex gap-4">
                <HoverTooltip content="This is a tooltip on top" placement="top">
                  <LibraryButton>Hover me (Top)</LibraryButton>
                </HoverTooltip>
                <HoverTooltip content="This is a tooltip on the right" placement="right">
                  <LibraryButton>Hover me (Right)</LibraryButton>
                </HoverTooltip>
                <HoverTooltip content="This is a tooltip on the bottom" placement="bottom">
                  <LibraryButton>Hover me (Bottom)</LibraryButton>
                </HoverTooltip>
                <HoverTooltip content="This is a tooltip on the left" placement="left">
                  <LibraryButton>Hover me (Left)</LibraryButton>
                </HoverTooltip>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Click Tooltip</h3>
              <div className="flex gap-4">
                <ClickTooltip content="Click tooltip content - click outside to close">
                  <LibraryButton variant="secondary">Click me</LibraryButton>
                </ClickTooltip>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Complex Content</h3>
              <div className="flex gap-4">
                <HoverTooltip 
                  content={
                    <div className="text-center">
                      <div className="font-semibold">User Profile</div>
                      <div className="text-sm">Click to view details</div>
                    </div>
                  }
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full cursor-pointer flex items-center justify-center text-white">
                    JD
                  </div>
                </HoverTooltip>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">With Icons</h3>
              <div className="flex gap-4">
                <HoverTooltip content="Save your work">
                  <LibraryButton size="sm">
                    <Save className="w-4 h-4" />
                  </LibraryButton>
                </HoverTooltip>
                <HoverTooltip content="Delete permanently">
                  <LibraryButton size="sm" variant="danger">
                    <Trash2 className="w-4 h-4" />
                  </LibraryButton>
                </HoverTooltip>
                <HoverTooltip content="Download file">
                  <LibraryButton size="sm" variant="secondary">
                    <Download className="w-4 h-4" />
                  </LibraryButton>
                </HoverTooltip>
              </div>
            </div>
          </div>
        );

      case "avatar":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Different Sizes</h3>
              <div className="flex items-center gap-4">
                <LibraryAvatar size="xs" fallback="XS" />
                <LibraryAvatar size="sm" fallback="SM" />
                <LibraryAvatar size="md" fallback="MD" />
                <LibraryAvatar size="lg" fallback="LG" />
                <LibraryAvatar size="xl" fallback="XL" />
                <LibraryAvatar size="2xl" fallback="2XL" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">With Images</h3>
              <div className="flex items-center gap-4">
                <LibraryAvatar 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  alt="User 1"
                />
                <LibraryAvatar 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b637?w=150&h=150&fit=crop&crop=face"
                  alt="User 2"
                />
                <LibraryAvatar 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                  alt="User 3"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">With Status Badge</h3>
              <div className="flex items-center gap-4">
                <LibraryAvatar fallback="JD" showBadge badgeColor="green" />
                <LibraryAvatar fallback="AS" showBadge badgeColor="red" badgePosition="top-right" />
                <LibraryAvatar fallback="MK" showBadge badgeColor="yellow" size="lg" />
                <LibraryAvatar fallback="RB" showBadge badgeColor="blue" size="xl" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Avatar Group</h3>
              <AvatarGroup
                avatars={[
                  { fallback: "John Doe" },
                  { fallback: "Jane Smith" },
                  { fallback: "Bob Wilson" },
                  { fallback: "Alice Brown" },
                  { fallback: "Charlie Davis" },
                  { fallback: "Eva White" },
                  { fallback: "Frank Green" }
                ]}
                max={4}
                size="md"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">User Cards</h3>
              <div className="space-y-4 max-w-sm">
                <UserCard
                  name="John Doe"
                  email="john.doe@example.com"
                  role="Senior Developer"
                  showBadge
                  badgeColor="green"
                />
                <UserCard
                  name="Jane Smith"
                  email="jane.smith@example.com"
                  role="Product Manager"
                  orientation="vertical"
                  size="lg"
                />
              </div>
            </div>
          </div>
        );

      case "dropdown":
        const dropdownOptions = [
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
          { value: "orange", label: "Orange" },
          { value: "grape", label: "Grape" }
        ];
        
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Dropdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LibraryDropdown 
                  options={dropdownOptions}
                  placeholder="Select a fruit..."
                  className="max-w-sm"
                />
                <SearchableDropdown 
                  options={dropdownOptions}
                  placeholder="Search fruits..."
                  className="max-w-sm"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Multi-select Dropdown</h3>
              <MultiSelectDropdown
                options={dropdownOptions}
                placeholder="Select multiple fruits..."
                className="max-w-sm"
              />
            </div>
          </div>
        );

      case "stepper":
        const stepperSteps = [
          { title: "Account Setup", description: "Create your account", status: "completed" as const },
          { title: "Profile", description: "Add profile information", status: "current" as const },
          { title: "Verification", description: "Verify your email", status: "pending" as const },
          { title: "Complete", description: "Setup complete", status: "pending" as const }
        ];
        
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Horizontal Stepper</h3>
              <LibraryStepper
                steps={stepperSteps}
                currentStep={1}
                orientation="horizontal"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Vertical Stepper</h3>
              <LibraryStepper
                steps={stepperSteps}
                currentStep={1}
                orientation="vertical"
                variant="numbered"
                className="max-w-md"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Progress Stepper</h3>
              <ProgressStepper
                steps={["Start", "Progress", "Review", "Complete"]}
                currentStep={1}
                className="max-w-lg"
              />
            </div>
          </div>
        );

      case "chip":
        const chipData = [
          { id: "1", label: "React", variant: "primary" as const },
          { id: "2", label: "TypeScript", variant: "success" as const },
          { id: "3", label: "Tailwind", variant: "warning" as const },
          { id: "4", label: "Vite", variant: "error" as const, deletable: true }
        ];
        
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Chips</h3>
              <div className="flex flex-wrap gap-2">
                <LibraryChip label="Default Chip" />
                <LibraryChip label="Primary" variant="primary" />
                <LibraryChip label="Success" variant="success" />
                <LibraryChip label="Warning" variant="warning" />
                <LibraryChip label="Error" variant="error" />
                <LibraryChip label="Deletable" deletable onDelete={() => {}} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Chip Sizes</h3>
              <div className="flex items-center gap-3">
                <LibraryChip label="Small" size="sm" variant="primary" />
                <LibraryChip label="Medium" size="md" variant="primary" />
                <LibraryChip label="Large" size="lg" variant="primary" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Chip Group</h3>
              <ChipGroup 
                chips={chipData}
                onChipDelete={(id) => console.log("Delete:", id)}
              />
            </div>
          </div>
        );

      case "timeline":
        const timelineItems = [
          {
            id: "1",
            title: "Project Started",
            description: "Initial project setup and requirements gathering",
            timestamp: "2024-01-15",
            status: "completed" as const,
            icon: <Box className="w-3 h-3 text-white" />
          },
          {
            id: "2", 
            title: "Development Phase",
            description: "Core features implementation in progress",
            timestamp: "2024-01-20",
            status: "current" as const,
            icon: <Settings className="w-3 h-3 text-white" />
          },
          {
            id: "3",
            title: "Testing & QA",
            description: "Quality assurance and bug fixes",
            timestamp: "2024-02-01",
            status: "upcoming" as const,
            icon: <Search className="w-3 h-3 text-white" />
          }
        ];

        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Vertical Timeline</h3>
              <LibraryTimeline items={timelineItems} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Compact Timeline</h3>
              <LibraryTimeline
                items={timelineItems}
                variant="compact"
                className="max-w-md"
              />
            </div>
          </div>
        );

      case "spinner":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Spinner Variants</h3>
              <div className="flex items-center gap-6">
                <LibrarySpinner size="sm" />
                <LibrarySpinner size="md" />
                <LibrarySpinner size="lg" />
                <LibrarySpinner size="xl" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Spinner Colors</h3>
              <div className="flex items-center gap-6">
                <LibrarySpinner variant="primary" />
                <LibrarySpinner variant="success" />
                <LibrarySpinner variant="warning" />
                <LibrarySpinner variant="error" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Other Spinner Types</h3>
              <div className="flex items-center gap-8">
                <DotsSpinner />
                <PulseSpinner />
                <LoadingButton loading>Loading Button</LoadingButton>
              </div>
            </div>
          </div>
        );

      case "calendar":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Calendar</h3>
              <LibraryCalendar className="max-w-md" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Date Picker</h3>
              <DatePicker
                placeholder="Select a date..."
                className="max-w-xs"
              />
            </div>
          </div>
        );

      case "rating":
        const ratingsData = [
          { stars: 5, count: 150, percentage: 70 },
          { stars: 4, count: 50, percentage: 20 },
          { stars: 3, count: 15, percentage: 7 },
          { stars: 2, count: 5, percentage: 2 },
          { stars: 1, count: 2, percentage: 1 }
        ];
        
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Star Rating</h3>
              <div className="space-y-4">
                <LibraryRating defaultValue={4} />
                <LibraryRating value={3.5} precision={0.5} showValue readonly />
                <ReviewRating rating={4.2} reviews={1247} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Different Rating Types</h3>
              <div className="space-y-4">
                <LibraryRating variant="heart" defaultValue={3} max={5} />
                <LibraryRating variant="thumb" defaultValue={2} max={3} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Rating Summary</h3>
              <div className="max-w-sm">
                <RatingSummary
                  ratings={ratingsData}
                  totalRating={4.2}
                  totalReviews={222}
                />
              </div>
            </div>
          </div>
        );

      case "toast":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Toast Variants</h3>
              <div className="space-y-4">
                <SimpleToast
                  title="Success!"
                  description="Your changes have been saved."
                  variant="success"
                  visible={true}
                />
                <SimpleToast
                  title="Warning"
                  description="Please review your input."
                  variant="warning"
                  visible={true}
                />
              </div>
            </div>
          </div>
        );

      case "collapse":
        const collapseItems = [
          {
            key: "1",
            title: "Getting Started",
            content: <div className="text-gray-600">Learn how to set up and configure the component library for your project.</div>
          },
          {
            key: "2", 
            title: "Advanced Usage",
            content: <div className="text-gray-600">Explore advanced features and customization options available.</div>
          }
        ];
        
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Collapse</h3>
              <LibraryCollapse
                title="Click to expand"
                showArrow={true}
              >
                <p className="text-gray-600">
                  This is the collapsible content area. You can put any content here including text, images, or other components.
                </p>
              </LibraryCollapse>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Collapse Group</h3>
              <CollapseGroup
                items={collapseItems}
                variant="bordered"
                className="max-w-lg"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Text Collapse</h3>
              <TextCollapse
                text="This is a very long text that will be truncated after a certain number of lines. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                maxLines={2}
                className="max-w-lg"
              />
            </div>
          </div>
        );

      case "divider":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Dividers</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-gray-600 mb-2">Solid divider</p>
                  <LibraryDivider />
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Dashed divider</p>
                  <LibraryDivider variant="dashed" />
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Dotted divider</p>
                  <LibraryDivider variant="dotted" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Dividers with Text</h3>
              <div className="space-y-6">
                <LibraryDivider textPosition="center">OR</LibraryDivider>
                <LibraryDivider textPosition="left" color="primary">Section Start</LibraryDivider>
                <LibraryDivider textPosition="right" color="success">Section End</LibraryDivider>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Section Dividers</h3>
              <div className="space-y-8">
                <SectionDivider 
                  title="Documentation"
                  subtitle="Component usage and examples"
                  icon={<Box className="w-5 h-5" />}
                />
                <SectionDivider
                  title="Advanced Features"
                  variant="gradient"
                  icon={<Star className="w-5 h-5" />}
                />
              </div>
            </div>
          </div>
        );

      case "list":
        const listItems = [
          { id: "1", title: "Dashboard", description: "View your main dashboard", icon: <Settings className="w-5 h-5" /> },
          { id: "2", title: "Messages", description: "Check your messages", icon: <MessageCircle className="w-5 h-5" /> },
          { id: "3", title: "Calendar", description: "View upcoming events", icon: <Calendar className="w-5 h-5" /> }
        ];

        const taskItems = [
          { id: "1", title: "Complete project proposal", completed: false, priority: "high" as const },
          { id: "2", title: "Review design mockups", completed: true, priority: "medium" as const },
          { id: "3", title: "Update documentation", completed: false, priority: "low" as const }
        ];

        const contacts = [
          { id: "1", name: "John Smith", email: "john@example.com", online: true },
          { id: "2", name: "Sarah Johnson", email: "sarah@example.com", online: false },
          { id: "3", name: "Mike Davis", email: "mike@example.com", online: true }
        ];

        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic List</h3>
              <LibraryList items={listItems} interactive />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Task List</h3>
              <TaskList tasks={taskItems} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact List</h3>
              <ContactList contacts={contacts} />
            </div>
          </div>
        );

      case "snackbar":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Snackbar Variants</h3>
              <div className="space-y-4">
                <SuccessSnackbar message="Operation completed successfully!" visible={true} />
                <ErrorSnackbar message="Something went wrong. Please try again." visible={true} />
                <LibrarySnackbar 
                  message="Info notification" 
                  description="This is additional information" 
                  variant="info" 
                  visible={true} 
                />
              </div>
            </div>
          </div>
        );

      case "switch":
        const switchItems = [
          { id: "1", label: "Email notifications", description: "Receive email updates", checked: true },
          { id: "2", label: "Push notifications", description: "Get mobile alerts", checked: false },
          { id: "3", label: "SMS alerts", description: "Text message notifications", checked: true }
        ];

        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Switches</h3>
              <div className="space-y-4">
                <LibrarySwitch label="Enable feature" />
                <LibrarySwitch label="Dark mode" defaultChecked />
                <LibrarySwitch label="Disabled option" disabled />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Switch Variants</h3>
              <div className="space-y-4">
                <StatusSwitch status="active" onStatusChange={() => {}} />
                <ToggleSwitch checked={true} onToggle={() => {}} leftLabel="Off" rightLabel="On" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Switch Group</h3>
              <SwitchGroup switches={switchItems} onChange={() => {}} />
            </div>
          </div>
        );

      case "drawer":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Drawer Examples</h3>
              <div className="space-y-4">
                <p className="text-gray-600">Drawers are overlay components that slide in from screen edges. They're perfect for navigation menus, filters, and detailed content views.</p>
                <div className="grid grid-cols-2 gap-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Open Left Drawer
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Open Right Drawer
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "file-upload":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic File Upload</h3>
              <LibraryFileUpload />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Image Upload</h3>
              <ImageUpload onImageSelect={() => {}} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Document Upload</h3>
              <DocumentUpload onDocumentSelect={() => {}} />
            </div>
          </div>
        );

      case "table-of-contents":
        const tocItems = [
          { id: "1", title: "Introduction", level: 1, href: "#intro" },
          { id: "2", title: "Getting Started", level: 1, href: "#getting-started" },
          { id: "3", title: "Installation", level: 2, href: "#installation" },
          { id: "4", title: "Configuration", level: 2, href: "#configuration" },
          { id: "5", title: "Advanced Usage", level: 1, href: "#advanced" }
        ];

        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Default Table of Contents</h3>
              <div className="max-w-md">
                <LibraryTableOfContents items={tocItems} />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Compact Variant</h3>
              <div className="max-w-md">
                <LibraryTableOfContents items={tocItems} variant="compact" />
              </div>
            </div>
          </div>
        );

      case "countdown-timer":
        const futureDate = new Date();
        futureDate.setMinutes(futureDate.getMinutes() + 30);

        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Timer</h3>
              <LibraryCountdownTimer duration={300} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Circular Timer</h3>
              <LibraryCountdownTimer duration={120} variant="circular" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Event Countdown</h3>
              <EventCountdown eventDate={futureDate} eventName="Launch Day" />
            </div>
          </div>
        );

      case "color-picker":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Color Picker</h3>
              <LibraryColorPicker />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Compact Color Picker</h3>
              <LibraryColorPicker variant="compact" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Color Swatches</h3>
              <LibraryColorPicker variant="swatch" />
            </div>
          </div>
        );

      case "sticky-note":
        const sampleNotes = [
          { id: "1", content: "Remember to review the project proposal", title: "Meeting Notes", color: "yellow" as const, position: { x: 20, y: 20 }, pinned: false, minimized: false },
          { id: "2", content: "Call client about requirements", title: "TODO", color: "pink" as const, position: { x: 280, y: 50 }, pinned: true, minimized: false }
        ];

        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sticky Notes</h3>
              <div className="relative">
                <LibraryStickyNote 
                  content="This is a sample sticky note with some content to demonstrate the component features."
                  title="Sample Note"
                  color="yellow"
                  position={{ x: 0, y: 0 }}
                  draggable={false}
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Sticky Notes Board</h3>
              <StickyNotesBoard notes={sampleNotes} onNotesChange={() => {}} />
            </div>
          </div>
        );

      case "fab":
        const fabActions = [
          { id: "1", icon: <FileText className="w-4 h-4" />, label: "Create Document", onClick: () => {} },
          { id: "2", icon: <Upload className="w-4 h-4" />, label: "Upload File", onClick: () => {} },
          { id: "3", icon: <User className="w-4 h-4" />, label: "Add Contact", onClick: () => {} }
        ];

        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Floating Action Button</h3>
              <p className="text-gray-600 mb-4">FABs provide primary actions that float above the content. Check the bottom right corner to see them in action.</p>
              <div className="relative h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <p>FAB Demo Area - Check bottom right for FAB examples</p>
                </div>
                <LibraryFab 
                  position="bottom-right" 
                  actions={fabActions}
                />
                <ExtendedFab
                  icon={<Play className="w-5 h-5" />}
                  label="Start Process"
                  onClick={() => {}}
                  position="bottom-left"
                />
              </div>
            </div>
          </div>
        );

      default:
        return <div>Component examples not found</div>;
    }
  };

  const getComponentDescription = () => {
    switch (componentName) {
      case "button":
        return "Versatile button component with multiple variants, sizes, and states. Supports icons, loading states, and accessibility features.";
      case "accordion":
        return "Collapsible content panels with smooth animations. Supports single or multiple panel expansion with customizable styling.";
      case "carousel":
        return "Image and content carousel with navigation controls, auto-play functionality, and touch/swipe support for mobile devices.";
      case "container":
        return "Flexible layout container with responsive grid and flexbox systems. Supports various spacing options and alignment controls.";
      case "navigation":
        return "Responsive navigation component with dropdown menus, mobile hamburger menu, and breadcrumb support.";
      default:
        return "Component description not available.";
    }
  };

  return (
    <div className="min-h-screen bg-dxp-light">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Components
            </Link>
          </div>

          {/* Component Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{componentTitle} Component</h1>
            <p className="text-gray-600 text-lg max-w-3xl">
              {getComponentDescription()}
            </p>
          </div>

          {/* Component Examples */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Examples & Usage</h2>
            {renderComponentExamples()}
          </div>

          {/* Generated Code Section */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Generated Code</h2>
            </div>
            
            {(componentName === "button" || componentName === "accordion" || componentName === "carousel" || 
              componentName === "container" || componentName === "navigation" || componentName === "card" ||
              componentName === "search-bar" || componentName === "modal" || componentName === "form" ||
              componentName === "table" || componentName === "tabs" || componentName === "alert" || componentName === "badge" ||
              componentName === "breadcrumb" || componentName === "pagination" || componentName === "progress" ||
              componentName === "slider" || componentName === "tooltip" || componentName === "avatar" ||
              componentName === "dropdown" || componentName === "stepper" || componentName === "chip" || componentName === "timeline" ||
              componentName === "spinner" || componentName === "calendar" || componentName === "rating" ||
              componentName === "toast" || componentName === "collapse" || componentName === "divider" ||
              componentName === "list" || componentName === "snackbar" || componentName === "switch" || componentName === "drawer" ||
              componentName === "file-upload" || componentName === "table-of-contents" || componentName === "countdown-timer" ||
              componentName === "color-picker" || componentName === "sticky-note" || componentName === "fab") ? (
              // Components with TSX/JSX tabs
              <SimpleTabs
                items={[
                  {
                    label: "TypeScript (.tsx)",
                    value: "tsx",
                    content: (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm text-gray-600">Complete TypeScript React component with interface definitions</p>
                          <LibraryButton
                            variant="secondary"
                            size="sm"
                            icon={<Copy className="w-4 h-4" />}
                            onClick={() => {
                              navigator.clipboard.writeText(getComponentCode() || "");
                            }}
                          >
                            Copy TSX
                          </LibraryButton>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                          <pre className="text-sm text-green-400 whitespace-pre-wrap font-mono">
                            <code>{getComponentCode()}</code>
                          </pre>
                        </div>
                      </div>
                    )
                  },
                  {
                    label: "JavaScript (.jsx)",
                    value: "jsx",
                    content: (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm text-gray-600">JavaScript React component without TypeScript types (compatible with most React projects)</p>
                          <LibraryButton
                            variant="secondary"
                            size="sm"
                            icon={<Copy className="w-4 h-4" />}
                            onClick={() => {
                              navigator.clipboard.writeText(getComponentJSXCode() || "");
                            }}
                          >
                            Copy JSX
                          </LibraryButton>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                          <pre className="text-sm text-green-400 whitespace-pre-wrap font-mono">
                            <code>{getComponentJSXCode()}</code>
                          </pre>
                        </div>
                      </div>
                    )
                  }
                ]}
              />
            ) : (
              // Other components with single TSX code display
              <div>
                <div className="flex items-center justify-between mb-6">
                  <LibraryButton
                    variant="secondary"
                    size="sm"
                    icon={<Copy className="w-4 h-4" />}
                    onClick={() => {
                      navigator.clipboard.writeText(getComponentCode());
                    }}
                  >
                    Copy Code
                  </LibraryButton>
                </div>
                <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-sm text-green-400 whitespace-pre-wrap font-mono">
                    <code>{getComponentCode()}</code>
                  </pre>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Complete TypeScript React component source code for {componentTitle}. Copy and paste this code into your project to use the component.</p>
                </div>
              </div>
            )}
          </div>

          {/* Props Documentation */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Properties</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Prop</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Default</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {componentName === "button" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">variant</td>
                        <td className="border border-gray-300 px-4 py-2">"primary" | "secondary" | "success" | "danger"</td>
                        <td className="border border-gray-300 px-4 py-2">"primary"</td>
                        <td className="border border-gray-300 px-4 py-2">Visual style variant</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">size</td>
                        <td className="border border-gray-300 px-4 py-2">"sm" | "md" | "lg"</td>
                        <td className="border border-gray-300 px-4 py-2">"md"</td>
                        <td className="border border-gray-300 px-4 py-2">Button size</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">loading</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Show loading spinner</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">icon</td>
                        <td className="border border-gray-300 px-4 py-2">ReactNode</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Icon to display</td>
                      </tr>
                    </>
                  )}
                  {componentName === "accordion" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">items</td>
                        <td className="border border-gray-300 px-4 py-2">AccordionItem[]</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Array of accordion items</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">allowMultiple</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Allow multiple panels open</td>
                      </tr>
                    </>
                  )}
                  {componentName === "carousel" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">items</td>
                        <td className="border border-gray-300 px-4 py-2">CarouselItem[]</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Array of carousel items</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">autoPlay</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Enable auto-play functionality</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">interval</td>
                        <td className="border border-gray-300 px-4 py-2">number</td>
                        <td className="border border-gray-300 px-4 py-2">5000</td>
                        <td className="border border-gray-300 px-4 py-2">Auto-play interval in milliseconds</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">showIndicators</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">true</td>
                        <td className="border border-gray-300 px-4 py-2">Show navigation indicators</td>
                      </tr>
                    </>
                  )}
                  {componentName === "container" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">maxWidth</td>
                        <td className="border border-gray-300 px-4 py-2">"sm" | "md" | "lg" | "xl" | "full"</td>
                        <td className="border border-gray-300 px-4 py-2">"lg"</td>
                        <td className="border border-gray-300 px-4 py-2">Maximum width constraint</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">padding</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">true</td>
                        <td className="border border-gray-300 px-4 py-2">Apply default padding</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">centered</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">true</td>
                        <td className="border border-gray-300 px-4 py-2">Center the container horizontally</td>
                      </tr>
                    </>
                  )}
                  {componentName === "navigation" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">items</td>
                        <td className="border border-gray-300 px-4 py-2">NavigationItem[]</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Array of navigation items</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">variant</td>
                        <td className="border border-gray-300 px-4 py-2">"horizontal" | "vertical"</td>
                        <td className="border border-gray-300 px-4 py-2">"horizontal"</td>
                        <td className="border border-gray-300 px-4 py-2">Navigation layout orientation</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">collapsible</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Enable mobile collapsible menu</td>
                      </tr>
                    </>
                  )}
                  {componentName === "card" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">title</td>
                        <td className="border border-gray-300 px-4 py-2">string</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Card title</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">variant</td>
                        <td className="border border-gray-300 px-4 py-2">"default" | "outlined" | "elevated"</td>
                        <td className="border border-gray-300 px-4 py-2">"default"</td>
                        <td className="border border-gray-300 px-4 py-2">Card visual style</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">hoverable</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Enable hover effects</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">actions</td>
                        <td className="border border-gray-300 px-4 py-2">ReactNode</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Card action buttons</td>
                      </tr>
                    </>
                  )}
                  {(componentName === "search-bar" || componentName === "searchbar") && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">placeholder</td>
                        <td className="border border-gray-300 px-4 py-2">string</td>
                        <td className="border border-gray-300 px-4 py-2">"Search..."</td>
                        <td className="border border-gray-300 px-4 py-2">Input placeholder text</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">onSearch</td>
                        <td className="border border-gray-300 px-4 py-2">(value: string) =&gt; void</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Search callback function</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">showClearButton</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">true</td>
                        <td className="border border-gray-300 px-4 py-2">Show clear input button</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">suggestions</td>
                        <td className="border border-gray-300 px-4 py-2">string[]</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Search suggestions</td>
                      </tr>
                    </>
                  )}
                  {componentName === "modal" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">isOpen</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Modal visibility state</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">onClose</td>
                        <td className="border border-gray-300 px-4 py-2">() =&gt; void</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Close callback function</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">title</td>
                        <td className="border border-gray-300 px-4 py-2">string</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Modal title</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">size</td>
                        <td className="border border-gray-300 px-4 py-2">"sm" | "md" | "lg" | "xl"</td>
                        <td className="border border-gray-300 px-4 py-2">"md"</td>
                        <td className="border border-gray-300 px-4 py-2">Modal size</td>
                      </tr>
                    </>
                  )}
                  {componentName === "form" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">onSubmit</td>
                        <td className="border border-gray-300 px-4 py-2">(data: any) =&gt; void</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Form submission callback</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">validation</td>
                        <td className="border border-gray-300 px-4 py-2">ValidationSchema</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Form validation rules</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">loading</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Show loading state</td>
                      </tr>
                    </>
                  )}
                  {componentName === "table" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">columns</td>
                        <td className="border border-gray-300 px-4 py-2">Column[]</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Table column definitions</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">data</td>
                        <td className="border border-gray-300 px-4 py-2">any[]</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Table data rows</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">sortable</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Enable column sorting</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">pagination</td>
                        <td className="border border-gray-300 px-4 py-2">PaginationConfig</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Pagination configuration</td>
                      </tr>
                    </>
                  )}
                  {componentName === "tabs" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">items</td>
                        <td className="border border-gray-300 px-4 py-2">TabItem[]</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Array of tab items</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">defaultTab</td>
                        <td className="border border-gray-300 px-4 py-2">string</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Default active tab</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">variant</td>
                        <td className="border border-gray-300 px-4 py-2">"default" | "pills" | "underlined"</td>
                        <td className="border border-gray-300 px-4 py-2">"default"</td>
                        <td className="border border-gray-300 px-4 py-2">Tab visual style</td>
                      </tr>
                    </>
                  )}
                  {componentName === "alert" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">variant</td>
                        <td className="border border-gray-300 px-4 py-2">"default" | "success" | "warning" | "error" | "info"</td>
                        <td className="border border-gray-300 px-4 py-2">"default"</td>
                        <td className="border border-gray-300 px-4 py-2">Alert type and styling</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">title</td>
                        <td className="border border-gray-300 px-4 py-2">string</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Alert title</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">dismissible</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Show dismiss button</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">onDismiss</td>
                        <td className="border border-gray-300 px-4 py-2">() =&gt; void</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Dismiss callback function</td>
                      </tr>
                    </>
                  )}
                  {componentName === "badge" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">variant</td>
                        <td className="border border-gray-300 px-4 py-2">"primary" | "secondary" | "success" | "warning" | "error" | "info"</td>
                        <td className="border border-gray-300 px-4 py-2">"primary"</td>
                        <td className="border border-gray-300 px-4 py-2">Badge color variant</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">size</td>
                        <td className="border border-gray-300 px-4 py-2">"sm" | "md" | "lg"</td>
                        <td className="border border-gray-300 px-4 py-2">"md"</td>
                        <td className="border border-gray-300 px-4 py-2">Badge size</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">dot</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Show as dot indicator</td>
                      </tr>
                    </>
                  )}
                  {componentName === "breadcrumb" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">items</td>
                        <td className="border border-gray-300 px-4 py-2">BreadcrumbItem[]</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Breadcrumb navigation items</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">separator</td>
                        <td className="border border-gray-300 px-4 py-2">ReactNode</td>
                        <td className="border border-gray-300 px-4 py-2">ChevronRight</td>
                        <td className="border border-gray-300 px-4 py-2">Custom separator icon</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">showHome</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">true</td>
                        <td className="border border-gray-300 px-4 py-2">Show home link</td>
                      </tr>
                    </>
                  )}
                  {componentName === "pagination" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">currentPage</td>
                        <td className="border border-gray-300 px-4 py-2">number</td>
                        <td className="border border-gray-300 px-4 py-2">1</td>
                        <td className="border border-gray-300 px-4 py-2">Current active page</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">totalPages</td>
                        <td className="border border-gray-300 px-4 py-2">number</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Total number of pages</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">onPageChange</td>
                        <td className="border border-gray-300 px-4 py-2">(page: number) =&gt; void</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Page change callback</td>
                      </tr>
                    </>
                  )}
                  {componentName === "progress" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">value</td>
                        <td className="border border-gray-300 px-4 py-2">number</td>
                        <td className="border border-gray-300 px-4 py-2">0</td>
                        <td className="border border-gray-300 px-4 py-2">Progress value (0-100)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">variant</td>
                        <td className="border border-gray-300 px-4 py-2">"default" | "success" | "warning" | "error"</td>
                        <td className="border border-gray-300 px-4 py-2">"default"</td>
                        <td className="border border-gray-300 px-4 py-2">Progress bar color</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">showLabel</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Show percentage label</td>
                      </tr>
                    </>
                  )}
                  {componentName === "slider" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">defaultValue</td>
                        <td className="border border-gray-300 px-4 py-2">number | number[]</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Default slider value(s)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">min</td>
                        <td className="border border-gray-300 px-4 py-2">number</td>
                        <td className="border border-gray-300 px-4 py-2">0</td>
                        <td className="border border-gray-300 px-4 py-2">Minimum value</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">max</td>
                        <td className="border border-gray-300 px-4 py-2">number</td>
                        <td className="border border-gray-300 px-4 py-2">100</td>
                        <td className="border border-gray-300 px-4 py-2">Maximum value</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">step</td>
                        <td className="border border-gray-300 px-4 py-2">number</td>
                        <td className="border border-gray-300 px-4 py-2">1</td>
                        <td className="border border-gray-300 px-4 py-2">Step increment</td>
                      </tr>
                    </>
                  )}
                  {componentName === "tooltip" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">content</td>
                        <td className="border border-gray-300 px-4 py-2">ReactNode</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Tooltip content</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">placement</td>
                        <td className="border border-gray-300 px-4 py-2">"top" | "bottom" | "left" | "right"</td>
                        <td className="border border-gray-300 px-4 py-2">"top"</td>
                        <td className="border border-gray-300 px-4 py-2">Tooltip position</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">trigger</td>
                        <td className="border border-gray-300 px-4 py-2">"hover" | "click" | "focus"</td>
                        <td className="border border-gray-300 px-4 py-2">"hover"</td>
                        <td className="border border-gray-300 px-4 py-2">Tooltip trigger event</td>
                      </tr>
                    </>
                  )}
                  {componentName === "avatar" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">size</td>
                        <td className="border border-gray-300 px-4 py-2">"xs" | "sm" | "md" | "lg" | "xl"</td>
                        <td className="border border-gray-300 px-4 py-2">"md"</td>
                        <td className="border border-gray-300 px-4 py-2">Avatar size</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">src</td>
                        <td className="border border-gray-300 px-4 py-2">string</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Avatar image URL</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">fallback</td>
                        <td className="border border-gray-300 px-4 py-2">string</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Fallback initials</td>
                      </tr>
                    </>
                  )}
                  {componentName === "dropdown" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">options</td>
                        <td className="border border-gray-300 px-4 py-2">DropdownOption[]</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Dropdown options array</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">placeholder</td>
                        <td className="border border-gray-300 px-4 py-2">string</td>
                        <td className="border border-gray-300 px-4 py-2">"Select..."</td>
                        <td className="border border-gray-300 px-4 py-2">Placeholder text</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">searchable</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Enable search functionality</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">multiple</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Allow multiple selections</td>
                      </tr>
                    </>
                  )}
                  {componentName === "stepper" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">steps</td>
                        <td className="border border-gray-300 px-4 py-2">StepItem[]</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Array of step items</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">currentStep</td>
                        <td className="border border-gray-300 px-4 py-2">number</td>
                        <td className="border border-gray-300 px-4 py-2">0</td>
                        <td className="border border-gray-300 px-4 py-2">Current active step index</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">orientation</td>
                        <td className="border border-gray-300 px-4 py-2">"horizontal" | "vertical"</td>
                        <td className="border border-gray-300 px-4 py-2">"horizontal"</td>
                        <td className="border border-gray-300 px-4 py-2">Stepper layout orientation</td>
                      </tr>
                    </>
                  )}
                  {componentName === "chip" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">variant</td>
                        <td className="border border-gray-300 px-4 py-2">"default" | "primary" | "secondary"</td>
                        <td className="border border-gray-300 px-4 py-2">"default"</td>
                        <td className="border border-gray-300 px-4 py-2">Chip visual style</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">size</td>
                        <td className="border border-gray-300 px-4 py-2">"sm" | "md" | "lg"</td>
                        <td className="border border-gray-300 px-4 py-2">"md"</td>
                        <td className="border border-gray-300 px-4 py-2">Chip size</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">deletable</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Show delete button</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">icon</td>
                        <td className="border border-gray-300 px-4 py-2">ReactNode</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Optional icon element</td>
                      </tr>
                    </>
                  )}
                  {componentName === "timeline" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">items</td>
                        <td className="border border-gray-300 px-4 py-2">TimelineItem[]</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Timeline events array</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">variant</td>
                        <td className="border border-gray-300 px-4 py-2">"default" | "alternate"</td>
                        <td className="border border-gray-300 px-4 py-2">"default"</td>
                        <td className="border border-gray-300 px-4 py-2">Timeline layout style</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">showConnector</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">true</td>
                        <td className="border border-gray-300 px-4 py-2">Show connecting lines</td>
                      </tr>
                    </>
                  )}
                  {componentName === "spinner" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">size</td>
                        <td className="border border-gray-300 px-4 py-2">"xs" | "sm" | "md" | "lg" | "xl"</td>
                        <td className="border border-gray-300 px-4 py-2">"md"</td>
                        <td className="border border-gray-300 px-4 py-2">Spinner size</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">variant</td>
                        <td className="border border-gray-300 px-4 py-2">"default" | "dots" | "pulse"</td>
                        <td className="border border-gray-300 px-4 py-2">"default"</td>
                        <td className="border border-gray-300 px-4 py-2">Spinner animation style</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">color</td>
                        <td className="border border-gray-300 px-4 py-2">"primary" | "secondary"</td>
                        <td className="border border-gray-300 px-4 py-2">"primary"</td>
                        <td className="border border-gray-300 px-4 py-2">Spinner color theme</td>
                      </tr>
                    </>
                  )}
                  {componentName === "calendar" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">defaultValue</td>
                        <td className="border border-gray-300 px-4 py-2">Date</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Default selected date</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">onChange</td>
                        <td className="border border-gray-300 px-4 py-2">(date: Date) =&gt; void</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Date change callback</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">disabledDates</td>
                        <td className="border border-gray-300 px-4 py-2">Date[]</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Array of disabled dates</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">showWeekNumbers</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Display week numbers</td>
                      </tr>
                    </>
                  )}
                  {componentName === "rating" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">value</td>
                        <td className="border border-gray-300 px-4 py-2">number</td>
                        <td className="border border-gray-300 px-4 py-2">0</td>
                        <td className="border border-gray-300 px-4 py-2">Current rating value</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">maxRating</td>
                        <td className="border border-gray-300 px-4 py-2">number</td>
                        <td className="border border-gray-300 px-4 py-2">5</td>
                        <td className="border border-gray-300 px-4 py-2">Maximum rating value</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">readonly</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Read-only mode</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">size</td>
                        <td className="border border-gray-300 px-4 py-2">"sm" | "md" | "lg"</td>
                        <td className="border border-gray-300 px-4 py-2">"md"</td>
                        <td className="border border-gray-300 px-4 py-2">Star icon size</td>
                      </tr>
                    </>
                  )}
                  {componentName === "toast" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">variant</td>
                        <td className="border border-gray-300 px-4 py-2">"default" | "success" | "error" | "warning" | "info"</td>
                        <td className="border border-gray-300 px-4 py-2">"default"</td>
                        <td className="border border-gray-300 px-4 py-2">Toast type and styling</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">duration</td>
                        <td className="border border-gray-300 px-4 py-2">number</td>
                        <td className="border border-gray-300 px-4 py-2">5000</td>
                        <td className="border border-gray-300 px-4 py-2">Auto-dismiss duration (ms)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">position</td>
                        <td className="border border-gray-300 px-4 py-2">"top-right" | "top-left" | "bottom-right" | "bottom-left"</td>
                        <td className="border border-gray-300 px-4 py-2">"top-right"</td>
                        <td className="border border-gray-300 px-4 py-2">Toast position on screen</td>
                      </tr>
                    </>
                  )}
                  {componentName === "collapse" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">isOpen</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Collapse visibility state</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">trigger</td>
                        <td className="border border-gray-300 px-4 py-2">ReactNode</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Trigger element</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">animationDuration</td>
                        <td className="border border-gray-300 px-4 py-2">number</td>
                        <td className="border border-gray-300 px-4 py-2">300</td>
                        <td className="border border-gray-300 px-4 py-2">Animation duration (ms)</td>
                      </tr>
                    </>
                  )}
                  {componentName === "divider" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">orientation</td>
                        <td className="border border-gray-300 px-4 py-2">"horizontal" | "vertical"</td>
                        <td className="border border-gray-300 px-4 py-2">"horizontal"</td>
                        <td className="border border-gray-300 px-4 py-2">Divider orientation</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">variant</td>
                        <td className="border border-gray-300 px-4 py-2">"solid" | "dashed" | "dotted"</td>
                        <td className="border border-gray-300 px-4 py-2">"solid"</td>
                        <td className="border border-gray-300 px-4 py-2">Line style</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">spacing</td>
                        <td className="border border-gray-300 px-4 py-2">"sm" | "md" | "lg"</td>
                        <td className="border border-gray-300 px-4 py-2">"md"</td>
                        <td className="border border-gray-300 px-4 py-2">Spacing around divider</td>
                      </tr>
                    </>
                  )}
                  {componentName === "list" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">items</td>
                        <td className="border border-gray-300 px-4 py-2">ListItem[]</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">List items array</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">variant</td>
                        <td className="border border-gray-300 px-4 py-2">"default" | "ordered" | "task"</td>
                        <td className="border border-gray-300 px-4 py-2">"default"</td>
                        <td className="border border-gray-300 px-4 py-2">List type</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">selectable</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Enable item selection</td>
                      </tr>
                    </>
                  )}
                  {componentName === "snackbar" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">message</td>
                        <td className="border border-gray-300 px-4 py-2">string</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Snackbar message text</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">variant</td>
                        <td className="border border-gray-300 px-4 py-2">"default" | "success" | "error"</td>
                        <td className="border border-gray-300 px-4 py-2">"default"</td>
                        <td className="border border-gray-300 px-4 py-2">Snackbar type</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">autoHideDuration</td>
                        <td className="border border-gray-300 px-4 py-2">number</td>
                        <td className="border border-gray-300 px-4 py-2">6000</td>
                        <td className="border border-gray-300 px-4 py-2">Auto-hide duration (ms)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">action</td>
                        <td className="border border-gray-300 px-4 py-2">ReactNode</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Action button element</td>
                      </tr>
                    </>
                  )}
                  {componentName === "switch" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">checked</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Switch state</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">onChange</td>
                        <td className="border border-gray-300 px-4 py-2">(checked: boolean) =&gt; void</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">State change callback</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">size</td>
                        <td className="border border-gray-300 px-4 py-2">"sm" | "md" | "lg"</td>
                        <td className="border border-gray-300 px-4 py-2">"md"</td>
                        <td className="border border-gray-300 px-4 py-2">Switch size</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">disabled</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Disabled state</td>
                      </tr>
                    </>
                  )}
                  {componentName === "drawer" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">isOpen</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Drawer visibility state</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">placement</td>
                        <td className="border border-gray-300 px-4 py-2">"left" | "right" | "top" | "bottom"</td>
                        <td className="border border-gray-300 px-4 py-2">"right"</td>
                        <td className="border border-gray-300 px-4 py-2">Drawer position</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">onClose</td>
                        <td className="border border-gray-300 px-4 py-2">() =&gt; void</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Close callback function</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">size</td>
                        <td className="border border-gray-300 px-4 py-2">"sm" | "md" | "lg" | "xl"</td>
                        <td className="border border-gray-300 px-4 py-2">"md"</td>
                        <td className="border border-gray-300 px-4 py-2">Drawer size</td>
                      </tr>
                    </>
                  )}
                  {(componentName === "file-upload" || componentName === "fileupload") && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">accept</td>
                        <td className="border border-gray-300 px-4 py-2">string</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Accepted file types</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">multiple</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">false</td>
                        <td className="border border-gray-300 px-4 py-2">Allow multiple files</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">maxSize</td>
                        <td className="border border-gray-300 px-4 py-2">number</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Maximum file size (bytes)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">onUpload</td>
                        <td className="border border-gray-300 px-4 py-2">(files: File[]) =&gt; void</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Upload callback function</td>
                      </tr>
                    </>
                  )}
                  {(componentName === "table-of-contents" || componentName === "tableofcontents") && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">headings</td>
                        <td className="border border-gray-300 px-4 py-2">HeadingItem[]</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Document headings array</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">activeId</td>
                        <td className="border border-gray-300 px-4 py-2">string</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Currently active heading ID</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">maxDepth</td>
                        <td className="border border-gray-300 px-4 py-2">number</td>
                        <td className="border border-gray-300 px-4 py-2">3</td>
                        <td className="border border-gray-300 px-4 py-2">Maximum heading depth</td>
                      </tr>
                    </>
                  )}
                  {(componentName === "countdown-timer" || componentName === "countdowntimer") && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">targetDate</td>
                        <td className="border border-gray-300 px-4 py-2">Date</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Target countdown date</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">format</td>
                        <td className="border border-gray-300 px-4 py-2">"dhms" | "hms" | "ms"</td>
                        <td className="border border-gray-300 px-4 py-2">"dhms"</td>
                        <td className="border border-gray-300 px-4 py-2">Time display format</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">onComplete</td>
                        <td className="border border-gray-300 px-4 py-2">() =&gt; void</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Completion callback</td>
                      </tr>
                    </>
                  )}
                  {(componentName === "color-picker" || componentName === "colorpicker") && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">value</td>
                        <td className="border border-gray-300 px-4 py-2">string</td>
                        <td className="border border-gray-300 px-4 py-2">"#000000"</td>
                        <td className="border border-gray-300 px-4 py-2">Current color value</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">onChange</td>
                        <td className="border border-gray-300 px-4 py-2">(color: string) =&gt; void</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Color change callback</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">format</td>
                        <td className="border border-gray-300 px-4 py-2">"hex" | "rgb" | "hsl"</td>
                        <td className="border border-gray-300 px-4 py-2">"hex"</td>
                        <td className="border border-gray-300 px-4 py-2">Color format</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">showPresets</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">true</td>
                        <td className="border border-gray-300 px-4 py-2">Show preset colors</td>
                      </tr>
                    </>
                  )}
                  {(componentName === "sticky-note" || componentName === "stickynote") && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">title</td>
                        <td className="border border-gray-300 px-4 py-2">string</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Note title</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">content</td>
                        <td className="border border-gray-300 px-4 py-2">string</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">Note content</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">color</td>
                        <td className="border border-gray-300 px-4 py-2">"yellow" | "blue" | "green" | "pink"</td>
                        <td className="border border-gray-300 px-4 py-2">"yellow"</td>
                        <td className="border border-gray-300 px-4 py-2">Note background color</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">editable</td>
                        <td className="border border-gray-300 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 px-4 py-2">true</td>
                        <td className="border border-gray-300 px-4 py-2">Enable editing mode</td>
                      </tr>
                    </>
                  )}
                  {componentName === "fab" && (
                    <>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">variant</td>
                        <td className="border border-gray-300 px-4 py-2">"default" | "extended" | "speed-dial"</td>
                        <td className="border border-gray-300 px-4 py-2">"default"</td>
                        <td className="border border-gray-300 px-4 py-2">FAB style variant</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">size</td>
                        <td className="border border-gray-300 px-4 py-2">"sm" | "md" | "lg"</td>
                        <td className="border border-gray-300 px-4 py-2">"md"</td>
                        <td className="border border-gray-300 px-4 py-2">FAB size</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">position</td>
                        <td className="border border-gray-300 px-4 py-2">"bottom-right" | "bottom-left" | "top-right" | "top-left"</td>
                        <td className="border border-gray-300 px-4 py-2">"bottom-right"</td>
                        <td className="border border-gray-300 px-4 py-2">Screen position</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-mono">icon</td>
                        <td className="border border-gray-300 px-4 py-2">ReactNode</td>
                        <td className="border border-gray-300 px-4 py-2">-</td>
                        <td className="border border-gray-300 px-4 py-2">FAB icon element</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}