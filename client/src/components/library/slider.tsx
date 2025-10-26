import { cn } from "@/lib/utils";
import { useState, useCallback, useRef, useEffect } from "react";

export interface SliderProps {
  value?: number | number[];
  defaultValue?: number | number[];
  min?: number;
  max?: number;
  step?: number;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  className?: string;
  onChange?: (value: number | number[]) => void;
  onValueCommit?: (value: number | number[]) => void;
  showLabels?: boolean;
  showTooltip?: boolean;
  marks?: { value: number; label?: string }[];
  range?: boolean;
}

function LibrarySlider({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  orientation = "horizontal",
  disabled = false,
  className,
  onChange,
  onValueCommit,
  showLabels = false,
  showTooltip = false,
  marks = [],
  range = false,
  ...props
}: SliderProps) {
  const [internalValue, setInternalValue] = useState<number | number[]>(() => {
    if (value !== undefined) return value;
    if (defaultValue !== undefined) return defaultValue;
    return range ? [min, max] : min;
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const currentValue = value !== undefined ? value : internalValue;
  const isVertical = orientation === "vertical";
  const isRange = range || Array.isArray(currentValue);

  const normalizeValue = (val: number) => {
    return Math.round((Math.max(min, Math.min(max, val)) - min) / step) * step + min;
  };

  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  const getValueFromPosition = useCallback((clientX: number, clientY: number) => {
    if (!sliderRef.current) return min;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = isVertical 
      ? (rect.bottom - clientY) / rect.height
      : (clientX - rect.left) / rect.width;
    
    const rawValue = min + percentage * (max - min);
    return normalizeValue(rawValue);
  }, [min, max, step, isVertical]);

  const handleChange = useCallback((newValue: number | number[]) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  }, [onChange]);

  const handleMouseDown = (event: React.MouseEvent, thumbIndex?: number) => {
    if (disabled) return;
    
    event.preventDefault();
    setIsDragging(true);
    setActiveThumb(thumbIndex ?? 0);

    const newValue = getValueFromPosition(event.clientX, event.clientY);
    
    if (isRange && Array.isArray(currentValue)) {
      const values = [...currentValue];
      if (thumbIndex !== undefined) {
        values[thumbIndex] = newValue;
        // Ensure proper ordering
        if (thumbIndex === 0 && newValue > values[1]) values[1] = newValue;
        if (thumbIndex === 1 && newValue < values[0]) values[0] = newValue;
        handleChange(values);
      }
    } else {
      handleChange(newValue);
    }
  };

  const handleTrackClick = (event: React.MouseEvent) => {
    if (disabled || isDragging) return;
    
    const newValue = getValueFromPosition(event.clientX, event.clientY);
    
    if (isRange && Array.isArray(currentValue)) {
      const [val1, val2] = currentValue;
      const mid = (val1 + val2) / 2;
      const values = newValue <= mid ? [newValue, val2] : [val1, newValue];
      handleChange(values);
    } else {
      handleChange(newValue);
    }
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || disabled) return;

      const newValue = getValueFromPosition(event.clientX, event.clientY);
      
      if (isRange && Array.isArray(currentValue)) {
        const values = [...currentValue];
        if (activeThumb !== null) {
          values[activeThumb] = newValue;
          // Ensure proper ordering
          if (activeThumb === 0 && newValue > values[1]) values[1] = newValue;
          if (activeThumb === 1 && newValue < values[0]) values[0] = newValue;
          handleChange(values);
        }
      } else {
        handleChange(newValue);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setActiveThumb(null);
        onValueCommit?.(currentValue);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, disabled, currentValue, activeThumb, getValueFromPosition, handleChange, onValueCommit]);

  const renderThumb = (val: number, index: number = 0) => {
    const percentage = getPercentage(val);
    
    return (
      <div
        key={index}
        className={cn(
          "absolute w-5 h-5 bg-white border-2 border-blue-600 rounded-full cursor-pointer transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          {
            "top-1/2 -translate-y-1/2 -translate-x-1/2": !isVertical,
            "left-1/2 -translate-x-1/2 -translate-y-1/2": isVertical,
            "border-gray-400": disabled,
            "shadow-lg": isDragging && activeThumb === index,
          }
        )}
        style={{
          [isVertical ? 'bottom' : 'left']: `${percentage}%`,
        }}
        onMouseDown={(e) => handleMouseDown(e, index)}
        tabIndex={disabled ? -1 : 0}
      />
    );
  };

  const renderRange = () => {
    if (!isRange || !Array.isArray(currentValue)) return null;
    
    const [val1, val2] = currentValue;
    const start = getPercentage(Math.min(val1, val2));
    const end = getPercentage(Math.max(val1, val2));
    
    return (
      <div
        className="absolute bg-blue-600 rounded"
        style={{
          [isVertical ? 'bottom' : 'left']: `${start}%`,
          [isVertical ? 'height' : 'width']: `${end - start}%`,
          [isVertical ? 'width' : 'height']: '100%',
        }}
      />
    );
  };

  return (
    <div className={cn("relative", className)}>
      {showLabels && (
        <div className={cn(
          "flex justify-between text-sm text-gray-500 mb-2",
          isVertical && "flex-col h-full absolute -left-8 top-0"
        )}>
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
      
      <div
        ref={sliderRef}
        className={cn(
          "relative bg-gray-200 rounded-full cursor-pointer",
          {
            "h-2 w-full": !isVertical,
            "w-2 h-32": isVertical,
            "cursor-not-allowed opacity-50": disabled,
          }
        )}
        onClick={handleTrackClick}
        {...props}
      >
        {/* Track fill */}
        {!isRange && (
          <div
            className="absolute bg-blue-600 rounded-full h-full transition-all"
            style={{
              [isVertical ? 'height' : 'width']: `${getPercentage(Array.isArray(currentValue) ? currentValue[0] : currentValue)}%`,
            }}
          />
        )}
        
        {/* Range fill */}
        {renderRange()}
        
        {/* Marks */}
        {marks.map((mark) => (
          <div
            key={mark.value}
            className="absolute w-1 h-1 bg-gray-400 rounded-full"
            style={{
              [isVertical ? 'bottom' : 'left']: `${getPercentage(mark.value)}%`,
              [isVertical ? 'left' : 'top']: '50%',
              transform: isVertical ? 'translateX(-50%)' : 'translateY(-50%)',
            }}
          />
        ))}
        
        {/* Thumbs */}
        {Array.isArray(currentValue) 
          ? currentValue.map((val, index) => renderThumb(val, index))
          : renderThumb(currentValue)
        }
      </div>
      
      {/* Mark labels */}
      {marks.length > 0 && (
        <div className={cn(
          "flex justify-between text-xs text-gray-500 mt-1",
          isVertical && "flex-col h-full absolute left-6 top-0"
        )}>
          {marks.map((mark) => (
            <span key={mark.value} style={{
              [isVertical ? 'bottom' : 'left']: `${getPercentage(mark.value)}%`,
            }}>
              {mark.label || mark.value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Range Slider convenience component
function RangeSlider(props: Omit<SliderProps, 'range'>) {
  return <LibrarySlider {...props} range />;
}

export { LibrarySlider, RangeSlider };