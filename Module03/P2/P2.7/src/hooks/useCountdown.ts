import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseCountdownOptions {
  onComplete?: () => void;
}

export interface UseCountdownReturn {
  time: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  isActive: boolean;
}

export const useCountdown = (
  initialSeconds: number,
  options?: UseCountdownOptions
): UseCountdownReturn => {
  const [time, setTime] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Save options in ref to avoid re-triggering effect on callback change
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const start = useCallback(() => {
    if (time > 0) {
      setIsActive(true);
    }
  }, [time]);

  const pause = useCallback(() => {
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    setIsActive(false);
    setTime(initialSeconds);
  }, [initialSeconds]);

  // Handle countdown logic
  useEffect(() => {
    if (isActive && time > 0) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
            // Fire callback if exist
            if (optionsRef.current?.onComplete) {
              optionsRef.current.onComplete();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Cleanup function - guarantees memory safety on unmount OR active/time dependencies change
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, time]);

  return {
    time,
    start,
    pause,
    reset,
    isActive
  };
};

export default useCountdown;
