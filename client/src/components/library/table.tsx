import { ReactNode, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, ArrowUpDown, MoreHorizontal } from "lucide-react";

const tableVariants = cva(
  "w-full border-collapse",
  {
    variants: {
      variant: {
        default: "border border-gray-200",
        bordered: "border-2 border-gray-300",
        striped: "border border-gray-200",
        minimal: "",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface Column<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => ReactNode;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  fixed?: "left" | "right";
}

interface TableProps<T = any> extends VariantProps<typeof tableVariants> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  rowSelection?: {
    selectedRowKeys: (string | number)[];
    onChange: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void;
    getCheckboxProps?: (record: T) => { disabled?: boolean };
  };
  onRow?: (record: T, index: number) => {
    onClick?: () => void;
    onDoubleClick?: () => void;
    className?: string;
  };
  scroll?: { x?: number; y?: number };
  className?: string;
  rowKey?: string | ((record: T) => string | number);
  showHeader?: boolean;
  sticky?: boolean;
}

export function LibraryTable<T = any>({
  columns,
  data,
  loading = false,
  pagination,
  rowSelection,
  onRow,
  scroll,
  className,
  variant,
  size,
  rowKey = "id",
  showHeader = true,
  sticky = false,
  ...props
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({ key: "", direction: null });

  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === "function") {
      return rowKey(record);
    }
    return (record as any)[rowKey] ?? index;
  };

  const handleSort = (columnKey: string) => {
    let direction: "asc" | "desc" | null = "asc";
    
    if (sortConfig.key === columnKey) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }
    
    setSortConfig({ key: columnKey, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.direction || !sortConfig.key) return 0;
    
    const aVal = (a as any)[sortConfig.key];
    const bVal = (b as any)[sortConfig.key];
    
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSelectAll = (checked: boolean) => {
    if (!rowSelection) return;
    
    const allRowKeys = sortedData.map((record, index) => getRowKey(record, index));
    rowSelection.onChange(checked ? allRowKeys : [], checked ? sortedData : []);
  };

  const handleSelectRow = (record: T, index: number, checked: boolean) => {
    if (!rowSelection) return;
    
    const recordKey = getRowKey(record, index);
    const newSelectedKeys = checked
      ? [...rowSelection.selectedRowKeys, recordKey]
      : rowSelection.selectedRowKeys.filter(key => key !== recordKey);
    
    const selectedRecords = sortedData.filter((r, i) => 
      newSelectedKeys.includes(getRowKey(r, i))
    );
    
    rowSelection.onChange(newSelectedKeys, selectedRecords);
  };

  const renderSortIcon = (columnKey: string) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    }
    
    if (sortConfig.direction === "asc") {
      return <ChevronUp className="w-4 h-4" />;
    } else if (sortConfig.direction === "desc") {
      return <ChevronDown className="w-4 h-4" />;
    }
    
    return <ArrowUpDown className="w-4 h-4 opacity-50" />;
  };

  const tableContainerClass = cn(
    "overflow-auto",
    scroll?.x && "overflow-x-auto",
    scroll?.y && "max-h-96 overflow-y-auto"
  );

  const tableClass = cn(tableVariants({ variant, size }), className);

  if (loading) {
    return (
      <div className="w-full p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className={tableContainerClass} style={{ maxWidth: scroll?.x }}>
        <table className={tableClass} {...props}>
          {showHeader && (
            <thead className={cn("bg-gray-50", sticky && "sticky top-0 z-10")}>
              <tr>
                {rowSelection && (
                  <th className="px-4 py-3 text-left border-b border-gray-200">
                    <input
                      type="checkbox"
                      checked={rowSelection.selectedRowKeys.length === sortedData.length && sortedData.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      "px-4 py-3 font-medium text-gray-900 border-b border-gray-200",
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right",
                      column.sortable && "cursor-pointer hover:bg-gray-100 select-none"
                    )}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(column.dataIndex as string || column.key)}
                  >
                    <div className="flex items-center gap-2">
                      <span>{column.title}</span>
                      {column.sortable && renderSortIcon(column.dataIndex as string || column.key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className={variant === "striped" ? "divide-y divide-gray-200" : ""}>
            {sortedData.map((record, index) => {
              const rowProps = onRow?.(record, index) || {};
              const recordKey = getRowKey(record, index);
              
              return (
                <tr
                  key={recordKey}
                  className={cn(
                    "border-b border-gray-200 hover:bg-gray-50 transition-colors",
                    variant === "striped" && index % 2 === 1 && "bg-gray-50",
                    rowProps.className
                  )}
                  onClick={rowProps.onClick}
                  onDoubleClick={rowProps.onDoubleClick}
                >
                  {rowSelection && (
                    <td className="px-4 py-3 border-b border-gray-200">
                      <input
                        type="checkbox"
                        checked={rowSelection.selectedRowKeys.includes(recordKey)}
                        onChange={(e) => handleSelectRow(record, index, e.target.checked)}
                        disabled={rowSelection.getCheckboxProps?.(record)?.disabled}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                  )}
                  {columns.map((column) => {
                    const value = column.dataIndex ? (record as any)[column.dataIndex] : null;
                    const content = column.render ? column.render(value, record, index) : value;
                    
                    return (
                      <td
                        key={column.key}
                        className={cn(
                          "px-4 py-3 border-b border-gray-200",
                          column.align === "center" && "text-center",
                          column.align === "right" && "text-right"
                        )}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing {Math.min((pagination.current - 1) * pagination.pageSize + 1, pagination.total)} to{' '}
            {Math.min(pagination.current * pagination.pageSize, pagination.total)} of{' '}
            {pagination.total} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => pagination.onChange(pagination.current - 1, pagination.pageSize)}
              disabled={pagination.current === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
              {pagination.current}
            </span>
            <button
              onClick={() => pagination.onChange(pagination.current + 1, pagination.pageSize)}
              disabled={pagination.current * pagination.pageSize >= pagination.total}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}