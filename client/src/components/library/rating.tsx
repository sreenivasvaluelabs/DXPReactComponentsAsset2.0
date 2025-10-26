import { cn } from "@/lib/utils";
import { useState } from "react";
import { Star, Heart, ThumbsUp } from "lucide-react";

export interface RatingProps {
  value?: number;
  defaultValue?: number;
  max?: number;
  precision?: number;
  size?: "sm" | "md" | "lg";
  variant?: "star" | "heart" | "thumb";
  readonly?: boolean;
  disabled?: boolean;
  allowClear?: boolean;
  showValue?: boolean;
  className?: string;
  onChange?: (value: number) => void;
  onHover?: (value: number) => void;
  labels?: string[];
}

function LibraryRating({
  value,
  defaultValue = 0,
  max = 5,
  precision = 1,
  size = "md",
  variant = "star",
  readonly = false,
  disabled = false,
  allowClear = true,
  showValue = false,
  className,
  onChange,
  onHover,
  labels = [],
}: RatingProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const currentValue = value !== undefined ? value : internalValue;
  const displayValue = hoverValue !== null ? hoverValue : currentValue;

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const getIcon = () => {
    switch (variant) {
      case "heart":
        return Heart;
      case "thumb":
        return ThumbsUp;
      default:
        return Star;
    }
  };

  const Icon = getIcon();

  const handleClick = (rating: number) => {
    if (readonly || disabled) return;

    const newValue = allowClear && currentValue === rating ? 0 : rating;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleMouseEnter = (rating: number) => {
    if (readonly || disabled) return;
    setHoverValue(rating);
    onHover?.(rating);
  };

  const handleMouseLeave = () => {
    if (readonly || disabled) return;
    setHoverValue(null);
  };

  const getItemClass = (index: number) => {
    const rating = index + 1;
    const isActive = rating <= displayValue;
    const isHovered = hoverValue !== null && rating <= hoverValue;

    return cn(
      sizeClasses[size],
      "transition-colors cursor-pointer",
      {
        "text-yellow-400 fill-current": isActive && variant === "star",
        "text-red-500 fill-current": isActive && variant === "heart",
        "text-blue-500 fill-current": isActive && variant === "thumb",
        "text-gray-300": !isActive,
        "hover:scale-110 transform": !readonly && !disabled && isHovered,
        "cursor-not-allowed opacity-50": disabled,
        "cursor-default": readonly,
      }
    );
  };

  const renderItems = () => {
    const items = [];
    const totalItems = precision < 1 ? max * (1 / precision) : max;

    for (let i = 0; i < totalItems; i++) {
      const rating = precision < 1 ? (i + 1) * precision : i + 1;
      const isPartiallyFilled = precision < 1 && displayValue > i * precision && displayValue < (i + 1) * precision;

      items.push(
        <button
          key={i}
          type="button"
          className={getItemClass(i)}
          onClick={() => handleClick(rating)}
          onMouseEnter={() => handleMouseEnter(rating)}
          onMouseLeave={handleMouseLeave}
          disabled={disabled}
          aria-label={`Rate ${rating} out of ${max}`}
        >
          {isPartiallyFilled ? (
            <div className="relative">
              <Icon className="text-gray-300" />
              <div 
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: `${((displayValue - i * precision) / precision) * 100}%` }}
              >
                <Icon className={cn(
                  variant === "star" && "text-yellow-400 fill-current",
                  variant === "heart" && "text-red-500 fill-current",
                  variant === "thumb" && "text-blue-500 fill-current"
                )} />
              </div>
            </div>
          ) : (
            <Icon />
          )}
        </button>
      );
    }

    return items;
  };

  const getCurrentLabel = () => {
    if (labels.length === 0) return null;
    const index = Math.ceil(displayValue) - 1;
    return labels[index] || labels[labels.length - 1];
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-1">
        {renderItems()}
      </div>
      
      {showValue && (
        <span className="text-sm text-gray-600 font-medium">
          {displayValue.toFixed(precision < 1 ? 1 : 0)}/{max}
        </span>
      )}
      
      {getCurrentLabel() && (
        <span className="text-sm text-gray-600 ml-2">
          {getCurrentLabel()}
        </span>
      )}
    </div>
  );
}

// Star Rating - convenience component
function StarRating(props: Omit<RatingProps, 'variant'>) {
  return <LibraryRating {...props} variant="star" />;
}

// Heart Rating - convenience component  
function HeartRating(props: Omit<RatingProps, 'variant'>) {
  return <LibraryRating {...props} variant="heart" />;
}

// Review Rating - specialized for reviews
export interface ReviewRatingProps {
  rating: number;
  reviews?: number;
  size?: RatingProps['size'];
  showReviews?: boolean;
  className?: string;
}

function ReviewRating({ 
  rating, 
  reviews, 
  size = "md", 
  showReviews = true, 
  className 
}: ReviewRatingProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LibraryRating
        value={rating}
        readonly
        size={size}
        variant="star"
      />
      <span className="text-sm font-medium text-gray-900">
        {rating.toFixed(1)}
      </span>
      {showReviews && reviews && (
        <span className="text-sm text-gray-500">
          ({reviews.toLocaleString()} {reviews === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
}

// Rating Summary - for displaying rating distribution
export interface RatingSummaryProps {
  ratings: { stars: number; count: number; percentage: number }[];
  totalRating: number;
  totalReviews: number;
  className?: string;
}

function RatingSummary({ 
  ratings, 
  totalRating, 
  totalReviews, 
  className 
}: RatingSummaryProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Overall Rating */}
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {totalRating.toFixed(1)}
        </div>
        <LibraryRating value={totalRating} readonly size="lg" />
        <div className="text-sm text-gray-600 mt-2">
          Based on {totalReviews.toLocaleString()} reviews
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="space-y-2">
        {ratings
          .sort((a, b) => b.stars - a.stars)
          .map((rating) => (
            <div key={rating.stars} className="flex items-center gap-3">
              <span className="text-sm font-medium w-8">
                {rating.stars}★
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all"
                  style={{ width: `${rating.percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">
                {rating.count}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export { 
  LibraryRating, 
  StarRating, 
  HeartRating, 
  ReviewRating, 
  RatingSummary 
};