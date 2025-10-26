import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Palette, Pipette, Check } from "lucide-react";

interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  variant?: "default" | "compact" | "swatch" | "advanced";
  showPresets?: boolean;
  showAlpha?: boolean;
  showInput?: boolean;
  disabled?: boolean;
  presetColors?: string[];
  className?: string;
}

export function LibraryColorPicker({
  value,
  defaultValue = "#3B82F6",
  onChange,
  variant = "default",
  showPresets = true,
  showAlpha = false,
  showInput = true,
  disabled = false,
  presetColors,
  className
}: ColorPickerProps) {
  const [currentColor, setCurrentColor] = useState(value || defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultPresets = [
    "#EF4444", "#F97316", "#F59E0B", "#EAB308",
    "#84CC16", "#22C55E", "#10B981", "#14B8A6",
    "#06B6D4", "#0EA5E9", "#3B82F6", "#6366F1",
    "#8B5CF6", "#A855F7", "#D946EF", "#EC4899",
    "#F43F5E", "#64748B", "#374151", "#000000"
  ];

  const colors = presetColors || defaultPresets;

  useEffect(() => {
    const color = value !== undefined ? value : currentColor;
    setCurrentColor(color);
    setInputValue(color);
  }, [value, currentColor]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleColorChange = (newColor: string) => {
    setCurrentColor(newColor);
    setInputValue(newColor);
    onChange?.(newColor);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Validate hex color
    if (/^#[0-9A-F]{6}$/i.test(newValue) || /^#[0-9A-F]{3}$/i.test(newValue)) {
      handleColorChange(newValue);
    }
  };

  const isValidColor = (color: string): boolean => {
    return /^#[0-9A-F]{6}$/i.test(color) || /^#[0-9A-F]{3}$/i.test(color);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  if (variant === "compact") {
    return (
      <div className={cn("relative", className)} ref={containerRef}>
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "w-8 h-8 rounded border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          style={{ backgroundColor: currentColor }}
        />
        
        {isOpen && (
          <div className="absolute top-10 left-0 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
            <div className="grid grid-cols-5 gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform relative"
                  style={{ backgroundColor: color }}
                >
                  {currentColor === color && (
                    <Check className="w-3 h-3 text-white absolute inset-0 m-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === "swatch") {
    return (
      <div className={cn("grid grid-cols-8 gap-2", className)}>
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => !disabled && handleColorChange(color)}
            disabled={disabled}
            className={cn(
              "w-10 h-10 rounded-lg border-2 transition-all hover:scale-105",
              currentColor === color ? "border-gray-900 shadow-md" : "border-gray-200",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            style={{ backgroundColor: color }}
          >
            {currentColor === color && (
              <Check className="w-5 h-5 text-white mx-auto" />
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)} ref={containerRef}>
      {/* Color Preview */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "w-16 h-16 rounded-lg border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          style={{ backgroundColor: currentColor }}
        >
          <Palette className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
        </button>
        
        <div className="flex-1">
          {showInput && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hex Color
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                disabled={disabled}
                className={cn(
                  "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                  !isValidColor(inputValue) && "border-red-300",
                  disabled && "bg-gray-50 cursor-not-allowed"
                )}
                placeholder="#3B82F6"
              />
            </div>
          )}
          
          {variant === "advanced" && isValidColor(currentColor) && (
            <div className="mt-2 text-xs text-gray-500 space-y-1">
              {(() => {
                const rgb = hexToRgb(currentColor);
                if (!rgb) return null;
                const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                return (
                  <>
                    <div>RGB: {rgb.r}, {rgb.g}, {rgb.b}</div>
                    <div>HSL: {Math.round(hsl.h)}°, {Math.round(hsl.s)}%, {Math.round(hsl.l)}%</div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      {/* Preset Colors */}
      {showPresets && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preset Colors
          </label>
          <div className="grid grid-cols-10 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => !disabled && handleColorChange(color)}
                disabled={disabled}
                className={cn(
                  "w-8 h-8 rounded border-2 transition-all hover:scale-105",
                  currentColor === color ? "border-gray-900 shadow-md" : "border-gray-200",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
                style={{ backgroundColor: color }}
                title={color}
              >
                {currentColor === color && (
                  <Check className="w-4 h-4 text-white mx-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Color Picker */}
      {isOpen && variant === "advanced" && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="space-y-4">
            {/* Hue Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hue
              </label>
              <input
                type="range"
                min="0"
                max="360"
                className="w-full"
                style={{
                  background: "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)"
                }}
              />
            </div>
            
            {/* Saturation Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Saturation
              </label>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full"
              />
            </div>
            
            {/* Lightness Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lightness
              </label>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Specialized color picker components
export function GradientPicker({ 
  onChange, 
  className 
}: {
  onChange: (gradient: string) => void;
  className?: string;
}) {
  const [startColor, setStartColor] = useState("#3B82F6");
  const [endColor, setEndColor] = useState("#8B5CF6");
  const [direction, setDirection] = useState("to right");

  useEffect(() => {
    const gradient = `linear-gradient(${direction}, ${startColor}, ${endColor})`;
    onChange(gradient);
  }, [startColor, endColor, direction, onChange]);

  return (
    <div className={cn("space-y-4", className)}>
      <div 
        className="w-full h-20 rounded-lg border-2 border-gray-300"
        style={{ background: `linear-gradient(${direction}, ${startColor}, ${endColor})` }}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Color
          </label>
          <LibraryColorPicker
            value={startColor}
            onChange={setStartColor}
            variant="compact"
            showPresets={false}
            showInput={false}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Color
          </label>
          <LibraryColorPicker
            value={endColor}
            onChange={setEndColor}
            variant="compact"
            showPresets={false}
            showInput={false}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Direction
        </label>
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="to right">Left to Right</option>
          <option value="to left">Right to Left</option>
          <option value="to bottom">Top to Bottom</option>
          <option value="to top">Bottom to Top</option>
          <option value="45deg">Diagonal (45°)</option>
          <option value="-45deg">Diagonal (-45°)</option>
        </select>
      </div>
    </div>
  );
}

export function ThemePicker({ 
  themes, 
  currentTheme, 
  onThemeChange, 
  className 
}: {
  themes: Array<{id: string; name: string; primary: string; secondary: string; accent: string}>;
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onThemeChange(theme.id)}
          className={cn(
            "p-4 border-2 rounded-lg transition-all hover:shadow-md",
            currentTheme === theme.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
          )}
        >
          <div className="flex gap-2 mb-2">
            <div 
              className="w-6 h-6 rounded"
              style={{ backgroundColor: theme.primary }}
            />
            <div 
              className="w-6 h-6 rounded"
              style={{ backgroundColor: theme.secondary }}
            />
            <div 
              className="w-6 h-6 rounded"
              style={{ backgroundColor: theme.accent }}
            />
          </div>
          <p className="text-sm font-medium text-left">{theme.name}</p>
        </button>
      ))}
    </div>
  );
}