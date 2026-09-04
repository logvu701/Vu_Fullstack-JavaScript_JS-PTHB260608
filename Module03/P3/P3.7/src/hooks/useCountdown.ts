import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export interface UseCountdownOptions {
  initialSeconds: number;
  onExpire?: () => void;
  onTick?: (remaining: number) => void;
  autoStart?: boolean;
}

export interface UseCountdownReturn {
  timeLeft: number;
  isRunning: boolean;
  isExpired: boolean;
  progressPercent: number;
  formattedTime: string;
  hours: number;
  minutes: number;
  seconds: number;
  start: () => void;
  pause: () => void;
  toggle: () => void;
  reset: (newSeconds?: number) => void;
  addSeconds: (extra: number) => void;
}

/**
 * Hook `useCountdown` chuẩn chỉnh:
 * - Trừu tượng hóa hoàn toàn logic đếm ngược
 * - Tự động dọn dẹp interval (cleanup) khi unmount
 * - Ngăn chặn rò rỉ bộ nhớ (Memory Leak)
 * - Tự động ngắt khi chạm 0 và kích hoạt callback an toàn qua useRef
 */
export const useCountdown = ({
  initialSeconds,
  onExpire,
  onTick,
  autoStart = false,
}: UseCountdownOptions): UseCountdownReturn => {
  const [timeLeft, setTimeLeft] = useState<number>(Math.max(0, initialSeconds));
  const [isRunning, setIsRunning] = useState<boolean>(autoStart && initialSeconds > 0);
  const [totalInitial, setTotalInitial] = useState<number>(Math.max(1, initialSeconds));

  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const onTickRef = useRef(onTick);
  onTickRef.current = onTick;

  const intervalRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  }, [timeLeft]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const toggle = useCallback(() => {
    setIsRunning((prev) => {
      if (!prev && timeLeft <= 0) return false;
      return !prev;
    });
  }, [timeLeft]);

  const reset = useCallback(
    (newSeconds?: number) => {
      setIsRunning(false);
      const target = newSeconds !== undefined ? Math.max(0, newSeconds) : initialSeconds;
      setTimeLeft(target);
      setTotalInitial(Math.max(1, target));
    },
    [initialSeconds]
  );

  const addSeconds = useCallback((extra: number) => {
    setTimeLeft((prev) => {
      const next = Math.max(0, prev + extra);
      setTotalInitial((old) => Math.max(old, next));
      return next;
    });
  }, []);

  // Cleanup & Timer loop
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsRunning(false);
          if (onExpireRef.current) {
            onExpireRef.current();
          }
          return 0;
        }

        const nextVal = prev - 1;
        if (onTickRef.current) {
          onTickRef.current(nextVal);
        }
        return nextVal;
      });
    }, 1000);

    // CLEANUP KHI UNMOUNT HOẶC KHI EFFECT BỊ HỦY
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formattedTime = useMemo(() => {
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, [hours, minutes, seconds]);

  const progressPercent = useMemo(() => {
    return Math.min(100, Math.max(0, ((totalInitial - timeLeft) / totalInitial) * 100));
  }, [timeLeft, totalInitial]);

  return {
    timeLeft,
    isRunning,
    isExpired: timeLeft === 0,
    progressPercent,
    formattedTime,
    hours,
    minutes,
    seconds,
    start,
    pause,
    toggle,
    reset,
    addSeconds,
  };
};
