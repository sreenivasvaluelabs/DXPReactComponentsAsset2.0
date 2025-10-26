import { cn } from "@/lib/utils";
import { useState, useRef, useEffect, ReactNode } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  className?: string;
  onChange?: (value: string | number | (string | number)[]) => void;
  onSearch?: (query: string) => void;
}

function LibraryDropdown({
  options,
  value,
  defaultValue,
  placeholder = "Select option...",
  disabled = false,
  multiple = false,
  searchable = false,
  clearable = false,
  className,
  onChange,
  onSearch,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | (string | number)[]>(
    value ?? defaultValue ?? (multiple ? [] : "")
  );
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const currentValue = value !== undefined ? value : selectedValue;

  const filteredOptions = searchable && searchQuery
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      if (searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, searchable]);

  const handleOptionClick = (optionValue: string | number) => {
    if (multiple) {
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      const newValue = currentArray.includes(optionValue)
        ? currentArray.filter(v => v !== optionValue)
        : [...currentArray, optionValue];
      setSelectedValue(newValue);
      onChange?.(newValue);
    } else {
      setSelectedValue(optionValue);
      onChange?.(optionValue);
      setIsOpen(false);
    }
    setSearchQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = multiple ? [] : "";
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  const getDisplayText = () => {
    if (multiple && Array.isArray(currentValue)) {
      if (currentValue.length === 0) return placeholder;
      if (currentValue.length === 1) {
        const option = options.find(opt => opt.value === currentValue[0]);
        return option?.label || currentValue[0];
      }
      return `${currentValue.length} selected`;
    } else {
      const option = options.find(opt => opt.value === currentValue);
      return option?.label || placeholder;
    }
  };

  const isSelected = (optionValue: string | number) => {
    if (multiple && Array.isArray(currentValue)) {
      return currentValue.includes(optionValue);
    }
    return currentValue === optionValue;
  };

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 text-left bg-white border border-gray-300 rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
          {
            "border-blue-500 ring-2 ring-blue-500": isOpen && !disabled,
          }
        )}
      >
        <span className={cn(
          "truncate",
          (!currentValue || (Array.isArray(currentValue) && currentValue.length === 0)) && "text-gray-500"
        )}>
          {getDisplayText()}
        </span>
        <div className="flex items-center gap-1">
          {clearable && currentValue && (Array.isArray(currentValue) ? currentValue.length > 0 : currentValue) && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 rounded"
            >
              ×
            </button>
          )}
          <ChevronDown className={cn(
            "w-4 h-4 transition-transform",
            isOpen && "rotate-180"
          )} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {searchable && (
            <div className="p-2 border-b border-gray-200">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearch?.(e.target.value);
                }}
                placeholder="Search..."
                className="w-full px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          )}
          
          <div className="py-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No options found</div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => !option.disabled && handleOptionClick(option.value)}
                  disabled={option.disabled}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-50",
                    "disabled:text-gray-400 disabled:cursor-not-allowed",
                    {
                      "bg-blue-50 text-blue-700": isSelected(option.value),
                    }
                  )}
                >
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                  {isSelected(option.value) && <Check className="w-4 h-4" />}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Multi-select dropdown
function MultiSelectDropdown(props: Omit<DropdownProps, 'multiple'>) {
  return <LibraryDropdown {...props} multiple />;
}

// Searchable dropdown
function SearchableDropdown(props: Omit<DropdownProps, 'searchable'>) {
  return <LibraryDropdown {...props} searchable />;
}

export { LibraryDropdown, MultiSelectDropdown, SearchableDropdown };