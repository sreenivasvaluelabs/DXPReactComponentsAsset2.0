import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  highlightToday?: boolean;
  showWeekNumbers?: boolean;
  multiple?: boolean;
  range?: boolean;
}

function LibraryCalendar({
  value,
  defaultValue = new Date(),
  onChange,
  disabled = false,
  minDate,
  maxDate,
  className,
  highlightToday = true,
  showWeekNumbers = false,
  multiple = false,
  range = false,
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(value || defaultValue);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [viewDate, setViewDate] = useState<Date>(value || defaultValue);

  const currentDate = value || selectedDate;
  const today = new Date();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const isDateDisabled = (date: Date) => {
    if (disabled) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateSelected = (date: Date) => {
    if (multiple) {
      return selectedDates.some(d => 
        d.getDate() === date.getDate() && 
        d.getMonth() === date.getMonth() && 
        d.getFullYear() === date.getFullYear()
      );
    }
    
    if (range && rangeStart && rangeEnd) {
      return date >= rangeStart && date <= rangeEnd;
    }
    
    return currentDate.getDate() === date.getDate() && 
           currentDate.getMonth() === date.getMonth() && 
           currentDate.getFullYear() === date.getFullYear();
  };

  const isDateInRange = (date: Date) => {
    if (!range || !rangeStart) return false;
    if (!rangeEnd) return false;
    return date >= rangeStart && date <= rangeEnd;
  };

  const isDateToday = (date: Date) => {
    return highlightToday && 
           date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (multiple) {
      const newSelectedDates = isDateSelected(date)
        ? selectedDates.filter(d => !isDateSelected(date))
        : [...selectedDates, date];
      setSelectedDates(newSelectedDates);
    } else if (range) {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(date);
        setRangeEnd(null);
      } else {
        if (date < rangeStart) {
          setRangeStart(date);
        } else {
          setRangeEnd(date);
        }
      }
    } else {
      setSelectedDate(date);
      onChange?.(date);
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(viewDate);
    newDate.setMonth(viewDate.getMonth() + (direction === "next" ? 1 : -1));
    setViewDate(newDate);
  };

  const navigateYear = (direction: "prev" | "next") => {
    const newDate = new Date(viewDate);
    newDate.setFullYear(viewDate.getFullYear() + (direction === "next" ? 1 : -1));
    setViewDate(newDate);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(viewDate);
    const firstDay = getFirstDayOfMonth(viewDate);
    const days = [];

    // Previous month's trailing days
    const prevMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, prevMonthDays - i);
      days.push(
        <button
          key={`prev-${prevMonthDays - i}`}
          onClick={() => handleDateClick(date)}
          disabled={isDateDisabled(date)}
          className="w-8 h-8 text-sm text-gray-400 hover:bg-gray-100 rounded disabled:cursor-not-allowed"
        >
          {prevMonthDays - i}
        </button>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      const isSelected = isDateSelected(date);
      const isToday = isDateToday(date);
      const isInRange = isDateInRange(date);
      const isDisabled = isDateDisabled(date);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          disabled={isDisabled}
          className={cn(
            "w-8 h-8 text-sm rounded transition-colors",
            {
              "bg-blue-600 text-white": isSelected,
              "bg-blue-100 text-blue-600": isInRange && !isSelected,
              "bg-red-100 text-red-600 font-semibold": isToday && !isSelected,
              "hover:bg-gray-100": !isSelected && !isDisabled,
              "text-gray-400 cursor-not-allowed": isDisabled,
              "text-gray-900": !isSelected && !isDisabled && !isToday,
            }
          )}
        >
          {day}
        </button>
      );
    }

    // Next month's leading days
    const remainingSlots = 42 - days.length; // 6 weeks * 7 days
    for (let day = 1; day <= remainingSlots; day++) {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, day);
      days.push(
        <button
          key={`next-${day}`}
          onClick={() => handleDateClick(date)}
          disabled={isDateDisabled(date)}
          className="w-8 h-8 text-sm text-gray-400 hover:bg-gray-100 rounded disabled:cursor-not-allowed"
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={cn("bg-white border border-gray-200 rounded-lg p-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigateYear("prev")}
            className="px-2 py-1 text-sm hover:bg-gray-100 rounded"
          >
            {viewDate.getFullYear()}
          </button>
        </div>
        
        <h2 className="text-lg font-semibold">
          {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
        </h2>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateYear("next")}
            className="px-2 py-1 text-sm hover:bg-gray-100 rounded"
          >
            {viewDate.getFullYear() + 1}
          </button>
          <button
            onClick={() => navigateMonth("next")}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Day names */}
      <div className={cn(
        "grid grid-cols-7 gap-1 mb-2",
        showWeekNumbers && "grid-cols-8"
      )}>
        {showWeekNumbers && <div className="w-8 h-8" />}
        {dayNames.map(day => (
          <div key={day} className="w-8 h-8 text-xs font-medium text-gray-500 flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className={cn(
        "grid grid-cols-7 gap-1",
        showWeekNumbers && "grid-cols-8"
      )}>
        {renderCalendarDays()}
      </div>

      {/* Footer */}
      {(multiple || range) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            {multiple && `Selected: ${selectedDates.length} dates`}
            {range && rangeStart && rangeEnd && (
              `Range: ${rangeStart.toLocaleDateString()} - ${rangeEnd.toLocaleDateString()}`
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Date Picker Component
export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function DatePicker({
  value,
  onChange,
  placeholder = "Select date...",
  disabled,
  className,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onChange?.(date);
    setIsOpen(false);
  };

  const formatDate = (date: Date | null) => {
    return date ? date.toLocaleDateString() : placeholder;
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
          !selectedDate && "text-gray-500"
        )}
      >
        {formatDate(selectedDate)}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          <LibraryCalendar
            value={selectedDate || undefined}
            onChange={handleDateSelect}
          />
        </div>
      )}
    </div>
  );
}

export { LibraryCalendar, DatePicker };