import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Theme, ThemeContextType } from '../types/theme';

/**
 * 1. Khởi tạo Context với giá trị khởi tạo là `undefined`.
 * Việc đặt giá trị mặc định là `undefined` thay vì null hoặc object giả lập (mock object)
 * giúp chúng ta phân biệt rõ ràng giữa "Context có giá trị hợp lệ" và "Component đang gọi ngoài Provider".
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

/**
 * 2. ThemeProvider component đóng vai trò cung cấp dữ liệu Theme toàn cục cho toàn bộ cây component con.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
  storageKey = 'rikkei_app_theme',
}) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Khôi phục theme đã lưu trong localStorage hoặc theo cài đặt mặc định
    try {
      const savedTheme = localStorage.getItem(storageKey);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch {
      // Fallback nếu localStorage bị chặn
    }
    return defaultTheme;
  });

  // Đồng bộ theme vào class của thẻ <html> và lưu vào localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // Fallback
    }
  }, [theme, storageKey]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/**
 * 3. Custom Hook `useTheme` với cơ chế Defensive Programming (Bắt bẫy dữ liệu):
 * - Đảm bảo Type-Safety tuyệt đối cho consumer: trả về `ThemeContextType` (không bao giờ null / undefined).
 * - Nếu component gọi `useTheme` nhưng KHÔNG nằm trong <ThemeProvider>, hook lập tức throw Exception
 *   có thông báo rõ ràng, giúp Developer phát hiện lỗi cấu trúc cây Component ngay lập tức thay vì
 *   gặp lỗi runtime mơ hồ như "Cannot read properties of undefined (reading 'theme')".
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      '❌ [ThemeContext Exception]: useTheme must be used within a <ThemeProvider>! ' +
      'Hãy đảm bảo Component của bạn được bao bọc bởi <ThemeProvider> ở cấp độ cha.'
    );
  }

  return context;
};
