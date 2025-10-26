import { useState, ReactNode } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

interface LibraryNavigationProps {
  logo?: string | ReactNode;
  items: NavigationItem[];
  breadcrumbs?: string[];
  className?: string;
}

export function LibraryNavigation({ logo, items, breadcrumbs, className }: LibraryNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const handleItemClick = (href: string) => {
    console.log(`Navigate to: ${href}`);
    setMobileMenuOpen(false);
  };

  return (
    <div className={cn("bg-gray-50", className)}>
      {/* Main Navigation */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-4">
          <div className="font-medium text-gray-900 text-sm">{logo}</div>
          <div className="hidden sm:flex space-x-3 text-xs">
            {items.map((item, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => handleItemClick(item.href)}
                  onMouseEnter={() => item.children && setDropdownOpen(item.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </button>
                
                {/* Dropdown Menu */}
                {item.children && dropdownOpen === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-2">
                      {item.children.map((child, childIndex) => (
                        <button
                          key={childIndex}
                          onClick={() => handleItemClick(child.href)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-1"
        >
          {mobileMenuOpen ? (
            <X className="w-4 h-4 text-gray-600" />
          ) : (
            <Menu className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white">
          <div className="py-2">
            {items.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => handleItemClick(item.href)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {item.label}
                </button>
                {item.children && (
                  <div className="pl-4">
                    {item.children.map((child, childIndex) => (
                      <button
                        key={childIndex}
                        onClick={() => handleItemClick(child.href)}
                        className="block w-full text-left px-4 py-1 text-xs text-gray-600 hover:bg-gray-50"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="px-3 py-2 text-xs text-gray-500 border-t border-gray-200 flex items-center space-x-1">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="w-3 h-3 mx-1" />}
              <span className={index === breadcrumbs.length - 1 ? "text-gray-700" : "text-gray-500"}>
                {crumb}
              </span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
