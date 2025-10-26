import { useState, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown, Hash, FileText } from "lucide-react";

interface TocItem {
  id: string;
  title: string;
  level: number;
  href?: string;
  children?: TocItem[];
}

interface TableOfContentsProps {
  items: TocItem[];
  variant?: "default" | "compact" | "sidebar";
  showIcons?: boolean;
  collapsible?: boolean;
  activeId?: string;
  onItemClick?: (item: TocItem) => void;
  className?: string;
}

export function LibraryTableOfContents({
  items,
  variant = "default",
  showIcons = true,
  collapsible = true,
  activeId,
  onItemClick,
  className
}: TableOfContentsProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [activeItem, setActiveItem] = useState<string | undefined>(activeId);

  useEffect(() => {
    setActiveItem(activeId);
  }, [activeId]);

  const toggleExpanded = (id: string) => {
    if (!collapsible) return;
    
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: TocItem) => {
    setActiveItem(item.id);
    onItemClick?.(item);
    
    if (item.href) {
      const element = document.getElementById(item.href.replace('#', ''));
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderTocItem = (item: TocItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = activeItem === item.id;

    const variantClasses = {
      default: {
        item: "py-2 px-3 rounded-lg hover:bg-gray-100",
        active: "bg-blue-50 text-blue-700 border-l-2 border-blue-500"
      },
      compact: {
        item: "py-1 px-2 text-sm rounded hover:bg-gray-50",
        active: "bg-blue-50 text-blue-600"
      },
      sidebar: {
        item: "py-2 px-4 border-l-2 border-transparent hover:border-gray-300 hover:bg-gray-50",
        active: "border-blue-500 bg-blue-50 text-blue-700"
      }
    };

    return (
      <div key={item.id} className="w-full">
        <div
          className={cn(
            "flex items-center gap-2 cursor-pointer transition-colors",
            variantClasses[variant].item,
            isActive && variantClasses[variant].active,
            depth > 0 && "ml-" + (depth * 4)
          )}
          style={{ paddingLeft: variant === "sidebar" ? `${16 + depth * 16}px` : undefined }}
          onClick={() => handleItemClick(item)}
        >
          {/* Expand/Collapse Toggle */}
          {hasChildren && collapsible && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(item.id);
              }}
              className="p-1 hover:bg-gray-200 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3 text-gray-500" />
              ) : (
                <ChevronRight className="w-3 h-3 text-gray-500" />
              )}
            </button>
          )}

          {/* Icon */}
          {showIcons && (
            <div className="flex-shrink-0">
              {item.level === 1 ? (
                <FileText className="w-4 h-4 text-gray-500" />
              ) : (
                <Hash className="w-3 h-3 text-gray-400" />
              )}
            </div>
          )}

          {/* Title */}
          <span className={cn(
            "flex-1 truncate",
            variant === "compact" && "text-sm",
            isActive ? "font-semibold" : "font-medium"
          )}>
            {item.title}
          </span>

          {/* Level indicator for compact variant */}
          {variant === "compact" && (
            <span className="text-xs text-gray-400">
              H{item.level}
            </span>
          )}
        </div>

        {/* Children */}
        {hasChildren && (!collapsible || isExpanded) && (
          <div className="mt-1">
            {item.children!.map(child => renderTocItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={cn(
      "w-full",
      variant === "sidebar" && "border-r border-gray-200 bg-gray-50",
      className
    )}>
      {variant === "sidebar" && (
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Table of Contents</h3>
        </div>
      )}
      
      <div className={cn(
        "space-y-1",
        variant === "sidebar" ? "p-4" : "p-2"
      )}>
        {items.map(item => renderTocItem(item))}
      </div>
    </nav>
  );
}

// Auto-generated TOC from DOM headings
export function AutoTableOfContents({ 
  containerSelector = "main", 
  headingSelector = "h1, h2, h3, h4, h5, h6",
  ...props 
}: Omit<TableOfContentsProps, 'items'> & {
  containerSelector?: string;
  headingSelector?: string;
}) {
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    const generateTocItems = () => {
      const container = document.querySelector(containerSelector);
      if (!container) return [];

      const headings = container.querySelectorAll(headingSelector);
      const tocItems: TocItem[] = [];

      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        const title = heading.textContent || `Heading ${index + 1}`;
        const id = heading.id || `heading-${index}`;
        
        // Ensure heading has an ID for navigation
        if (!heading.id) {
          heading.id = id;
        }

        tocItems.push({
          id,
          title,
          level,
          href: `#${id}`
        });
      });

      return tocItems;
    };

    const tocItems = generateTocItems();
    setItems(tocItems);

    // Re-generate on content changes
    const observer = new MutationObserver(() => {
      const newItems = generateTocItems();
      setItems(newItems);
    });

    const container = document.querySelector(containerSelector);
    if (container) {
      observer.observe(container, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, [containerSelector, headingSelector]);

  return <LibraryTableOfContents items={items} {...props} />;
}

// Nested TOC builder
export function NestedTableOfContents({ 
  items,
  ...props 
}: TableOfContentsProps) {
  const buildNestedItems = (flatItems: TocItem[]): TocItem[] => {
    const nested: TocItem[] = [];
    const stack: TocItem[] = [];

    flatItems.forEach(item => {
      // Find the correct parent level
      while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
        stack.pop();
      }

      if (stack.length === 0) {
        nested.push(item);
      } else {
        const parent = stack[stack.length - 1];
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(item);
      }

      stack.push(item);
    });

    return nested;
  };

  const nestedItems = buildNestedItems(items);

  return <LibraryTableOfContents items={nestedItems} {...props} />;
}

// Scrollspy TOC that highlights current section
export function ScrollspyTableOfContents({
  items,
  offset = 100,
  ...props
}: TableOfContentsProps & { offset?: number }) {
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const handleScroll = () => {
      const headings = items
        .filter(item => item.href)
        .map(item => ({
          id: item.id,
          element: document.getElementById(item.href!.replace('#', ''))
        }))
        .filter(item => item.element);

      let currentActiveId = '';
      let closestDistance = Infinity;

      headings.forEach(({ id, element }) => {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - offset);

        if (rect.top <= offset && distance < closestDistance) {
          closestDistance = distance;
          currentActiveId = id;
        }
      });

      if (currentActiveId && currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, offset, activeId]);

  return <LibraryTableOfContents items={items} activeId={activeId} {...props} />;
}

// Floating TOC widget
export function FloatingTableOfContents({
  items,
  position = "bottom-right",
  collapsible = true,
  ...props
}: TableOfContentsProps & {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4", 
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4"
  };

  return (
    <div className={cn(
      "fixed z-50 max-w-xs",
      positionClasses[position]
    )}>
      <div className={cn(
        "bg-white rounded-lg shadow-lg border border-gray-200",
        !isExpanded && "w-12 h-12"
      )}>
        {collapsible && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-gray-50"
          >
            <FileText className="w-5 h-5 text-gray-600" />
          </button>
        )}
        
        {(isExpanded || !collapsible) && (
          <div className={cn(
            collapsible && "mt-2 border-t border-gray-200"
          )}>
            <LibraryTableOfContents 
              items={items}
              variant="compact"
              {...props}
              className="max-h-96 overflow-y-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}