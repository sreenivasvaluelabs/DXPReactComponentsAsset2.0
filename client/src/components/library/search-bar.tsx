import { useState, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Search, X, Filter } from "lucide-react";

const searchBarVariants = cva(
  "relative flex items-center border rounded-lg bg-white transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100",
        filled: "border-gray-200 bg-gray-50 focus-within:bg-white focus-within:border-blue-500",
        outlined: "border-2 border-blue-200 focus-within:border-blue-500",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface SearchBarProps extends VariantProps<typeof searchBarVariants> {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  className?: string;
  disabled?: boolean;
  showFilter?: boolean;
  onFilterClick?: () => void;
  suggestions?: string[];
  autoComplete?: boolean;
  icon?: ReactNode;
}

export function LibrarySearchBar({
  placeholder = "Search...",
  value = "",
  onChange,
  onSearch,
  onClear,
  className,
  variant,
  size,
  disabled = false,
  showFilter = false,
  onFilterClick,
  suggestions = [],
  autoComplete = false,
  icon,
  ...props
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const currentValue = onChange ? value : internalValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
    setShowSuggestions(autoComplete && newValue.length > 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(currentValue);
      setShowSuggestions(false);
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    const newValue = "";
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
    onClear?.();
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (onChange) {
      onChange(suggestion);
    } else {
      setInternalValue(suggestion);
    }
    onSearch?.(suggestion);
    setShowSuggestions(false);
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(currentValue.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <div className={cn(searchBarVariants({ variant, size }), className)} {...props}>
        {/* Search Icon */}
        <div className="flex-shrink-0 mr-2 text-gray-400">
          {icon || <Search className="w-4 h-4" />}
        </div>

        {/* Input */}
        <input
          type="text"
          value={currentValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(autoComplete && currentValue.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent outline-none placeholder-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
        />

        {/* Clear Button */}
        {currentValue && (
          <button
            onClick={handleClear}
            className="flex-shrink-0 ml-2 p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Filter Button */}
        {showFilter && (
          <button
            onClick={onFilterClick}
            className="flex-shrink-0 ml-2 p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
            type="button"
          >
            <Filter className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
            >
              <span className="text-gray-900">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}