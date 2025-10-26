import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const inputVariants = cva(
  "w-full px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2",
  {
    variants: {
      variant: {
        default: "border-gray-300 focus:border-blue-500 focus:ring-blue-100",
        success: "border-green-300 focus:border-green-500 focus:ring-green-100",
        error: "border-red-300 focus:border-red-500 focus:ring-red-100",
        warning: "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-100",
      },
      size: {
        sm: "text-sm px-2 py-1",
        md: "text-base px-3 py-2",
        lg: "text-lg px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Form Container
interface FormProps {
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

export function LibraryForm({ children, onSubmit, className }: FormProps) {
  return (
    <form onSubmit={onSubmit} className={cn("space-y-6", className)}>
      {children}
    </form>
  );
}

// Form Field Container
interface FormFieldProps {
  children: ReactNode;
  className?: string;
}

export function FormField({ children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
    </div>
  );
}

// Form Label
interface FormLabelProps {
  children: ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
}

export function FormLabel({ children, htmlFor, required, className }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("block text-sm font-medium text-gray-700", className)}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

// Input Component
interface InputProps extends VariantProps<typeof inputVariants> {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
  name?: string;
  autoComplete?: string;
  showPasswordToggle?: boolean;
}

export function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  disabled,
  required,
  variant,
  size,
  className,
  showPasswordToggle,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative">
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={cn(inputVariants({ variant, size }), className)}
        {...props}
      />
      {type === "password" && showPasswordToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}

// Textarea Component
interface TextareaProps extends VariantProps<typeof inputVariants> {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  className?: string;
  id?: string;
  name?: string;
}

export function Textarea({
  placeholder,
  value,
  onChange,
  disabled,
  required,
  rows = 4,
  variant,
  size,
  className,
  ...props
}: TextareaProps) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      rows={rows}
      className={cn(inputVariants({ variant, size }), "resize-vertical", className)}
      {...props}
    />
  );
}

// Select Component
interface SelectProps extends VariantProps<typeof inputVariants> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  required?: boolean;
  children: ReactNode;
  className?: string;
  id?: string;
  name?: string;
  placeholder?: string;
}

export function Select({
  value,
  onChange,
  disabled,
  required,
  children,
  variant,
  size,
  className,
  placeholder,
  ...props
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={cn(inputVariants({ variant, size }), "bg-white", className)}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {children}
    </select>
  );
}

// Checkbox Component
interface CheckboxProps {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
  id?: string;
  name?: string;
}

export function Checkbox({
  checked,
  onChange,
  disabled,
  label,
  className,
  id,
  ...props
}: CheckboxProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        id={id}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        {...props}
      />
      {label && (
        <label htmlFor={id} className="ml-2 text-sm text-gray-700">
          {label}
        </label>
      )}
    </div>
  );
}

// Radio Group Component
interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  className?: string;
  direction?: "horizontal" | "vertical";
}

export function RadioGroup({
  options,
  value,
  onChange,
  name,
  className,
  direction = "vertical",
}: RadioGroupProps) {
  return (
    <div
      className={cn(
        "space-y-2",
        direction === "horizontal" && "flex flex-wrap gap-4 space-y-0",
        className
      )}
    >
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={option.disabled}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
          <label
            htmlFor={`${name}-${option.value}`}
            className="ml-2 text-sm text-gray-700"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
}

// Form Error Message
interface FormErrorProps {
  children: ReactNode;
  className?: string;
}

export function FormError({ children, className }: FormErrorProps) {
  return (
    <div className={cn("flex items-center gap-1 text-sm text-red-600", className)}>
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      {children}
    </div>
  );
}

// Form Help Text
interface FormHelpProps {
  children: ReactNode;
  className?: string;
}

export function FormHelp({ children, className }: FormHelpProps) {
  return (
    <p className={cn("text-sm text-gray-500", className)}>
      {children}
    </p>
  );
}