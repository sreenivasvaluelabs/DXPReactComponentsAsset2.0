import { cn } from "@/lib/utils";
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

function LibraryBreadcrumb({ 
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
                <a className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                  {item.icon}
                  <span>{item.label}</span>
                </a>
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

// Simple breadcrumb without links
export interface SimpleBreadcrumbProps {
  items: string[];
  separator?: React.ReactNode;
  className?: string;
}

function SimpleBreadcrumb({ 
  items, 
  separator = <ChevronRight className="w-4 h-4" />, 
  className 
}: SimpleBreadcrumbProps) {
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
}

export { LibraryBreadcrumb, SimpleBreadcrumb };