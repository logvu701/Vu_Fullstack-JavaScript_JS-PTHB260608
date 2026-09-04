import { useState, useEffect, useRef, useCallback } from 'react';

export interface CountdownActions {
  start: () => void;
  pause: () => void;
  reset: (newSeconds?: number) => void;
  isRunning: boolean;
  formattedTime: string;
}

export type UseCountdownTupleReturn = readonly [number, CountdownActions];

/**
 * GIẢI PHÁP 2: TRẢ VỀ DẠNG TUPLE CONST ASSERTION
 * Cú pháp: [timeLeft, { start, pause, reset, isRunning, formattedTime }] as const
 * Ưu điểm:
 * - Dễ dàng đổi tên biến chính khi destructure mà không cần alias phức tạp:
 *   const [quizTime, quizControls] = useCountdownTuple(60);
 *   const [saleTime, saleControls] = useCountdownTuple(300);
 * - Nhược điểm: Phải tuân thủ đúng thứ tự index của mảng khi destructure.
 */
export const useCountdownTuple = (
  initialSeconds: number,
  onExpire?: () => void,
  autoStart: boolean = false
): UseCountdownTupleReturn => {
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);

  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const intervalRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (timeLeft > 0) setIsRunning(true);
  }, [timeLeft]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(
    (newSeconds?: number) => {
      setIsRunning(false);
      setTimeLeft(newSeconds !== undefined ? newSeconds : initialSeconds);
    },
    [initialSeconds]
  );

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
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const actions: CountdownActions = {
    start,
    pause,
    reset,
    isRunning,
    formattedTime,
  };

  // 'as const' giúp TypeScript infer kiểu Tuple readonly [number, CountdownActions]
  return [timeLeft, actions] as const;
};
