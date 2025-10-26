import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  title: string;
  content: ReactNode;
  disabled?: boolean;
}

interface LibraryAccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export function LibraryAccordion({ items, allowMultiple = false, className }: LibraryAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    
    if (allowMultiple) {
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
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => !item.disabled && toggleItem(index)}
            className={cn(
              "w-full text-left p-3 flex items-center justify-between transition-colors",
              item.disabled 
                ? "cursor-not-allowed opacity-50" 
                : "hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
            )}
            disabled={item.disabled}
            aria-expanded={openItems.has(index)}
          >
            <span className="font-medium text-gray-900">{item.title}</span>
            <ChevronDown 
              className={cn(
                "w-4 h-4 text-gray-500 transition-transform duration-200",
                openItems.has(index) && "rotate-180"
              )} 
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-200 ease-out",
              openItems.has(index) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="p-3 bg-gray-50 text-sm text-gray-600 border-t border-gray-200">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
