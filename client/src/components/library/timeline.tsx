import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface TimelineItem {
  id: string | number;
  title: string;
  description?: string;
  timestamp?: string | Date;
  status?: "completed" | "current" | "upcoming" | "cancelled";
  icon?: ReactNode;
  content?: ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  variant?: "default" | "compact" | "alternate";
  orientation?: "vertical" | "horizontal";
  className?: string;
}

function LibraryTimeline({
  items,
  variant = "default",
  orientation = "vertical",
  className,
}: TimelineProps) {
  const isVertical = orientation === "vertical";

  const getStatusStyles = (status?: string) => {
    switch (status) {
      case "completed":
        return {
          dot: "bg-green-500 border-green-200",
          line: "bg-green-200",
        };
      case "current":
        return {
          dot: "bg-blue-500 border-blue-200 ring-4 ring-blue-100",
          line: "bg-gray-200",
        };
      case "cancelled":
        return {
          dot: "bg-red-500 border-red-200",
          line: "bg-gray-200",
        };
      default:
        return {
          dot: "bg-gray-300 border-gray-200",
          line: "bg-gray-200",
        };
    }
  };

  const formatTimestamp = (timestamp?: string | Date) => {
    if (!timestamp) return "";
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleString();
  };

  if (variant === "alternate" && isVertical) {
    return (
      <div className={cn("relative", className)}>
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2" />
        
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          const styles = getStatusStyles(item.status);
          
          return (
            <div key={item.id} className="relative flex items-center mb-8 last:mb-0">
              {/* Timeline dot */}
              <div className={cn(
                "absolute left-1/2 w-4 h-4 rounded-full border-4 transform -translate-x-1/2 z-10",
                styles.dot
              )}>
                {item.icon && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {item.icon}
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className={cn(
                "w-5/12",
                isEven ? "pr-8 text-right" : "ml-auto pl-8"
              )}>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  )}
                  {item.timestamp && (
                    <time className="text-xs text-gray-500 mt-2 block">
                      {formatTimestamp(item.timestamp)}
                    </time>
                  )}
                  {item.content && (
                    <div className="mt-3">{item.content}</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn(
      "relative",
      isVertical ? "space-y-4" : "flex items-center space-x-4",
      className
    )}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const styles = getStatusStyles(item.status);

        return (
          <div
            key={item.id}
            className={cn(
              "relative flex",
              isVertical ? "items-start" : "flex-col items-center"
            )}
          >
            {/* Timeline line */}
            {!isLast && (
              <div className={cn(
                "absolute",
                isVertical
                  ? `top-4 left-2 w-0.5 ${variant === "compact" ? "h-6" : "h-12"}`
                  : "top-2 left-4 h-0.5 w-12",
                styles.line
              )} />
            )}
            
            {/* Timeline dot */}
            <div className={cn(
              "relative flex-shrink-0 rounded-full border-4",
              variant === "compact" ? "w-3 h-3" : "w-4 h-4",
              styles.dot
            )}>
              {item.icon && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {item.icon}
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className={cn(
              variant === "compact" ? "ml-3" : "ml-4",
              !isVertical && "mt-4 text-center"
            )}>
              <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              )}
              {item.timestamp && (
                <time className="text-xs text-gray-500 block mt-1">
                  {formatTimestamp(item.timestamp)}
                </time>
              )}
              {item.content && (
                <div className="mt-2">{item.content}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Activity Timeline - specialized for activity feeds
export interface ActivityItem {
  id: string | number;
  user: string;
  action: string;
  target?: string;
  timestamp: string | Date;
  avatar?: ReactNode;
  type?: "created" | "updated" | "deleted" | "commented";
}

export interface ActivityTimelineProps {
  activities: ActivityItem[];
  className?: string;
}

function ActivityTimeline({ activities, className }: ActivityTimelineProps) {
  const getActionColor = (type?: string) => {
    switch (type) {
      case "created":
        return "text-green-600";
      case "updated":
        return "text-blue-600";
      case "deleted":
        return "text-red-600";
      case "commented":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {activities.map((activity, index) => (
        <div key={activity.id} className="flex items-start space-x-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {activity.avatar || (
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {activity.user.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <p className="text-sm">
              <span className="font-medium text-gray-900">{activity.user}</span>
              <span className={cn("ml-1", getActionColor(activity.type))}>
                {activity.action}
              </span>
              {activity.target && (
                <span className="ml-1 text-gray-600">{activity.target}</span>
              )}
            </p>
            <time className="text-xs text-gray-500">
              {formatTimestamp(activity.timestamp)}
            </time>
          </div>
        </div>
      ))}
    </div>
  );
}

const formatTimestamp = (timestamp?: string | Date) => {
  if (!timestamp) return "";
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  return date.toLocaleString();
};

export { LibraryTimeline, ActivityTimeline };