import { useState, useRef, DragEvent, ChangeEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Upload, File, Image, X, Check, AlertCircle } from "lucide-react";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  disabled?: boolean;
  variant?: "default" | "compact" | "minimal";
  showPreview?: boolean;
  onFileSelect?: (files: File[]) => void;
  onFileRemove?: (index: number) => void;
  className?: string;
}

export function LibraryFileUpload({
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 5,
  disabled = false,
  variant = "default",
  showPreview = true,
  onFileSelect,
  onFileRemove,
  className
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File ${file.name} is too large. Maximum size is ${formatFileSize(maxSize)}.`;
    }
    return null;
  };

  const handleFileSelection = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const fileArray = Array.from(newFiles);
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    // Check file limits
    if (!multiple && fileArray.length > 1) {
      newErrors.push("Only one file is allowed.");
      setErrors(newErrors);
      return;
    }

    const totalFiles = files.length + fileArray.length;
    if (totalFiles > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed.`);
    }

    // Validate each file
    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
    setFiles(updatedFiles);
    setErrors([]);
    onFileSelect?.(updatedFiles);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!disabled) {
      handleFileSelection(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileSelection(e.target.files);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFileRemove?.(index);
    onFileSelect?.(updatedFiles);
    setErrors([]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-8 h-8 text-blue-500" />;
    }
    return <File className="w-8 h-8 text-gray-500" />;
  };

  const variantClasses = {
    default: "p-8",
    compact: "p-4",
    minimal: "p-2"
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Upload Area */}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg transition-colors cursor-pointer",
          variantClasses[variant],
          isDragOver && !disabled 
            ? "border-blue-400 bg-blue-50" 
            : "border-gray-300 hover:border-gray-400",
          disabled && "opacity-50 cursor-not-allowed bg-gray-50",
          errors.length > 0 && "border-red-300 bg-red-50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <div className="text-center">
          <Upload className={cn(
            "mx-auto mb-4",
            variant === "minimal" ? "w-6 h-6" : "w-12 h-12",
            "text-gray-400"
          )} />
          
          {variant !== "minimal" && (
            <>
              <p className="text-sm font-medium text-gray-900 mb-2">
                {isDragOver ? "Drop files here" : "Choose files or drag and drop"}
              </p>
              <p className="text-xs text-gray-500">
                {accept && `Accepted formats: ${accept}`}
                {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
                {multiple && ` • Max files: ${maxFiles}`}
              </p>
            </>
          )}
          
          {variant === "minimal" && (
            <p className="text-xs text-gray-500">
              {multiple ? "Choose files" : "Choose file"}
            </p>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mt-3 space-y-1">
          {errors.map((error, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          ))}
        </div>
      )}

      {/* File List */}
      {files.length > 0 && showPreview && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              {getFileIcon(file)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Specialized file upload components
export function ImageUpload({ 
  onImageSelect, 
  maxSize, 
  className 
}: {
  onImageSelect: (files: File[]) => void;
  maxSize?: number;
  className?: string;
}) {
  return (
    <LibraryFileUpload
      accept="image/*"
      maxSize={maxSize}
      onFileSelect={onImageSelect}
      className={className}
    />
  );
}

export function DocumentUpload({ 
  onDocumentSelect, 
  multiple = true, 
  className 
}: {
  onDocumentSelect: (files: File[]) => void;
  multiple?: boolean;
  className?: string;
}) {
  return (
    <LibraryFileUpload
      accept=".pdf,.doc,.docx,.txt"
      multiple={multiple}
      onFileSelect={onDocumentSelect}
      className={className}
    />
  );
}

export function AvatarUpload({ 
  onAvatarSelect, 
  currentAvatar, 
  className 
}: {
  onAvatarSelect: (file: File) => void;
  currentAvatar?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
        {currentAvatar ? (
          <img src={currentAvatar} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Upload className="w-6 h-6" />
          </div>
        )}
      </div>
      <LibraryFileUpload
        accept="image/*"
        variant="minimal"
        showPreview={false}
        onFileSelect={(files) => files[0] && onAvatarSelect(files[0])}
      />
    </div>
  );
}

export function FileUploadProgress({ 
  files, 
  progress 
}: {
  files: Array<{name: string; progress: number; status: "uploading" | "completed" | "error"}>;
  progress?: number;
}) {
  return (
    <div className="space-y-3">
      {files.map((file, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {file.status === "completed" && <Check className="w-5 h-5 text-green-500" />}
            {file.status === "error" && <AlertCircle className="w-5 h-5 text-red-500" />}
            {file.status === "uploading" && <Upload className="w-5 h-5 text-blue-500 animate-pulse" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{file.name}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div 
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  file.status === "completed" ? "bg-green-500" : "bg-blue-500"
                )}
                style={{ width: `${file.progress}%` }}
              />
            </div>
          </div>
          <span className="text-xs text-gray-500">
            {file.progress}%
          </span>
        </div>
      ))}
    </div>
  );
}