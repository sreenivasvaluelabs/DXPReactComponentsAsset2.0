import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

interface CountdownTimerProps {
  targetDate?: Date;
  duration?: number; // in seconds
  autoStart?: boolean;
  showControls?: boolean;
  variant?: "default" | "compact" | "circular" | "minimal";
  size?: "sm" | "md" | "lg";
  format?: "full" | "simple" | "minimal";
  onComplete?: () => void;
  onTick?: (timeLeft: number) => void;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export function LibraryCountdownTimer({
  targetDate,
  duration,
  autoStart = true,
  showControls = true,
  variant = "default",
  size = "md",
  format = "full",
  onComplete,
  onTick,
  className
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
  const [isActive, setIsActive] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);
  const [initialDuration, setInitialDuration] = useState(duration || 0);

  useEffect(() => {
    if (targetDate) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const target = targetDate.getTime();
        const difference = target - now;

        if (difference > 0) {
          const newTimeLeft = calculateTimeLeft(difference);
          setTimeLeft(newTimeLeft);
          onTick?.(newTimeLeft.total);
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
          setIsActive(false);
          onComplete?.();
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [targetDate, onComplete, onTick]);

  useEffect(() => {
    if (duration && !targetDate) {
      setInitialDuration(duration);
      const newTimeLeft = calculateTimeLeft(duration * 1000);
      setTimeLeft(newTimeLeft);
    }
  }, [duration, targetDate]);

  useEffect(() => {
    if (duration && !targetDate && isActive && !isPaused) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          const newTotal = Math.max(0, prev.total - 1000);
          const newTimeLeft = calculateTimeLeft(newTotal);
          
          onTick?.(newTotal);
          
          if (newTotal <= 0) {
            setIsActive(false);
            onComplete?.();
            clearInterval(interval);
          }
          
          return newTimeLeft;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isActive, isPaused, duration, targetDate, onComplete, onTick]);

  const calculateTimeLeft = (time: number): TimeLeft => {
    const total = Math.max(0, time);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((total % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, total };
  };

  const formatTime = (value: number): string => {
    return value.toString().padStart(2, '0');
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    if (duration) {
      const newTimeLeft = calculateTimeLeft(initialDuration * 1000);
      setTimeLeft(newTimeLeft);
    }
    setIsActive(false);
    setIsPaused(false);
  };

  const sizeClasses = {
    sm: {
      container: "text-sm",
      number: "text-lg",
      label: "text-xs"
    },
    md: {
      container: "text-base",
      number: "text-2xl",
      label: "text-sm"
    },
    lg: {
      container: "text-lg", 
      number: "text-4xl",
      label: "text-base"
    }
  };

  const progress = duration && initialDuration > 0 
    ? ((initialDuration * 1000 - timeLeft.total) / (initialDuration * 1000)) * 100 
    : 0;

  if (variant === "circular") {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <div className="relative">
          <svg className="transform -rotate-90" width="120" height="120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={314.16}
              strokeDashoffset={314.16 - (progress / 100) * 314.16}
              className="text-blue-600 transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className={cn("font-bold text-gray-900", sizeClasses[size].number)}>
              {format === "simple" ? `${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}` : 
               format === "minimal" ? `${timeLeft.seconds}s` :
               `${formatTime(timeLeft.hours)}:${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`}
            </span>
            {format === "full" && timeLeft.days > 0 && (
              <span className={cn("text-gray-500", sizeClasses[size].label)}>
                {timeLeft.days}d
              </span>
            )}
          </div>
        </div>
        
        {showControls && (
          <div className="flex gap-2 mt-4">
            {!isActive || isPaused ? (
              <button
                onClick={handleStart}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              >
                <Play className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="p-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700"
              >
                <Pause className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={handleReset}
              className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-2", sizeClasses[size].container, className)}>
        <Clock className="w-4 h-4 text-gray-500" />
        <span className="font-mono font-semibold">
          {format === "simple" ? `${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}` : 
           format === "minimal" ? `${timeLeft.total > 0 ? Math.floor(timeLeft.total / 1000) : 0}s` :
           `${formatTime(timeLeft.hours)}:${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`}
        </span>
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: 'Days', show: format === "full" && timeLeft.days > 0 },
    { value: timeLeft.hours, label: 'Hours', show: format === "full" || timeLeft.hours > 0 },
    { value: timeLeft.minutes, label: 'Minutes', show: true },
    { value: timeLeft.seconds, label: 'Seconds', show: true }
  ].filter(unit => unit.show);

  return (
    <div className={cn(
      "flex flex-col items-center space-y-4",
      variant === "compact" && "space-y-2",
      className
    )}>
      <div className={cn(
        "flex items-center gap-4",
        variant === "compact" && "gap-2",
        sizeClasses[size].container
      )}>
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="text-center">
            <div className={cn(
              "font-mono font-bold text-gray-900",
              sizeClasses[size].number,
              variant === "compact" && "bg-gray-100 px-2 py-1 rounded"
            )}>
              {formatTime(unit.value)}
            </div>
            <div className={cn(
              "text-gray-500 font-medium",
              sizeClasses[size].label
            )}>
              {unit.label}
            </div>
            {index < timeUnits.length - 1 && variant !== "compact" && (
              <span className="mx-2 text-gray-400">:</span>
            )}
          </div>
        ))}
      </div>

      {duration && variant === "default" && (
        <div className="w-full max-w-md">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {showControls && duration && (
        <div className="flex gap-2">
          {!isActive || isPaused ? (
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center gap-2"
            >
              <Pause className="w-4 h-4" />
              Pause
            </button>
          )}
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

// Specialized timer components
export function EventCountdown({ 
  eventDate, 
  eventName, 
  className 
}: {
  eventDate: Date;
  eventName: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Time until {eventName}
      </h3>
      <LibraryCountdownTimer
        targetDate={eventDate}
        variant="default"
        size="lg"
        format="full"
      />
    </div>
  );
}

export function PomodoroTimer({ 
  workMinutes = 25, 
  breakMinutes = 5, 
  onSessionComplete,
  className 
}: {
  workMinutes?: number;
  breakMinutes?: number;
  onSessionComplete?: (isWorkSession: boolean) => void;
  className?: string;
}) {
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [sessionCount, setSessionCount] = useState(0);

  const handleComplete = () => {
    onSessionComplete?.(isWorkSession);
    setIsWorkSession(!isWorkSession);
    setSessionCount(prev => prev + 1);
  };

  return (
    <div className={cn("text-center space-y-4", className)}>
      <div className={cn(
        "px-4 py-2 rounded-lg font-medium text-sm",
        isWorkSession ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
      )}>
        {isWorkSession ? "Work Session" : "Break Time"}
      </div>
      
      <LibraryCountdownTimer
        duration={isWorkSession ? workMinutes * 60 : breakMinutes * 60}
        variant="circular"
        size="lg"
        format="simple"
        onComplete={handleComplete}
        key={`${isWorkSession}-${sessionCount}`}
      />
      
      <p className="text-sm text-gray-500">
        Session #{Math.floor(sessionCount / 2) + 1}
      </p>
    </div>
  );
}

export function SimpleTimer({ 
  minutes, 
  label, 
  onComplete,
  className 
}: {
  minutes: number;
  label?: string;
  onComplete?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {label && (
        <span className="text-sm font-medium text-gray-700">
          {label}
        </span>
      )}
      <LibraryCountdownTimer
        duration={minutes * 60}
        variant="minimal"
        format="simple"
        showControls={false}
        onComplete={onComplete}
      />
    </div>
  );
}