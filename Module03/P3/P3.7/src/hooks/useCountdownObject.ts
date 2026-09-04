import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseCountdownObjectOptions {
  initialSeconds: number;
  onExpire?: () => void;
  autoStart?: boolean;
}

export interface UseCountdownObjectReturn {
  timeLeft: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: (newSeconds?: number) => void;
  formattedTime: string;
}

/**
 * GIẢI PHÁP 1: TRẢ VỀ DẠNG OBJECT
 * Ưu điểm:
 * - Dễ dàng mở rộng thuộc tính mới mà không làm vỡ thứ tự destructuring.
 * - Tên thuộc tính rõ ràng, self-documenting.
 * - Consumer có thể chỉ lấy thuộc tính cần thiết: const { timeLeft, start } = useCountdownObject(...)
 */
export const useCountdownObject = ({
  initialSeconds,
  onExpire,
  autoStart = false,
}: UseCountdownObjectOptions): UseCountdownObjectReturn => {
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);

  // Dùng ref để lưu callback mới nhất mà không kích hoạt re-render effect
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const intervalRef = useRef<number | null>(null);

  // Bắt đầu đếm
  const start = useCallback(() => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  }, [timeLeft]);

  // Tạm dừng
  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Reset về ban đầu hoặc giá trị mới
  const reset = useCallback(
    (newSeconds?: number) => {
      setIsRunning(false);
      setTimeLeft(newSeconds !== undefined ? newSeconds : initialSeconds);
    },
    [initialSeconds]
  );

  // BẪY DỮ LIỆU: Cleanup interval khi unmount và tự động dừng khi chạm 0
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

    // CLEANUP KHI UNMOUNT HOẶC KHI EFFECT CHẠY LẠI
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  // Định dạng mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    formattedTime,
  };
};
