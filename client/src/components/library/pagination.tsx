import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { LibraryButton } from "./button";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  siblingCount?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
}

function LibraryPagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  siblingCount = 1,
  className,
  size = "md",
  variant = "outline"
}: PaginationProps) {
  const generatePageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    
    if (totalPages <= 7) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate range around current page
      const leftSibling = Math.max(currentPage - siblingCount, 1);
      const rightSibling = Math.min(currentPage + siblingCount, totalPages);
      
      // Add left ellipsis if needed
      if (leftSibling > 2) {
        pages.push("ellipsis");
      }
      
      // Add pages around current
      for (let i = leftSibling; i <= rightSibling; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }
      
      // Add right ellipsis if needed
      if (rightSibling < totalPages - 1) {
        pages.push("ellipsis");
      }
      
      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <nav className={cn("flex items-center space-x-1", className)}>
      {showFirstLast && (
        <LibraryButton
          variant={variant}
          size={size}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-2"
        >
          First
        </LibraryButton>
      )}
      
      {showPrevNext && (
        <LibraryButton
          variant={variant}
          size={size}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2"
        >
          <ChevronLeft className="w-4 h-4" />
        </LibraryButton>
      )}
      
      {pages.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <span key={`ellipsis-${index}`} className="px-2 py-1">
              <MoreHorizontal className="w-4 h-4" />
            </span>
          );
        }
        
        return (
          <LibraryButton
            key={page}
            variant={currentPage === page ? "primary" : variant}
            size={size}
            onClick={() => onPageChange(page)}
            className="min-w-[2rem]"
          >
            {page}
          </LibraryButton>
        );
      })}
      
      {showPrevNext && (
        <LibraryButton
          variant={variant}
          size={size}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2"
        >
          <ChevronRight className="w-4 h-4" />
        </LibraryButton>
      )}
      
      {showFirstLast && (
        <LibraryButton
          variant={variant}
          size={size}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2"
        >
          Last
        </LibraryButton>
      )}
    </nav>
  );
}

// Simple pagination with just prev/next
export interface SimplePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showPageInfo?: boolean;
}

function SimplePagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  showPageInfo = true
}: SimplePaginationProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <LibraryButton
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </LibraryButton>
      
      {showPageInfo && (
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
      )}
      
      <LibraryButton
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </LibraryButton>
    </div>
  );
}

export { LibraryPagination, SimplePagination };