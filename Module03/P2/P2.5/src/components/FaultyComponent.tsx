import type { FC } from 'react';
import { useTheme } from '../context/ThemeContext';

export const FaultyComponent: FC = () => {
  // Consumes ThemeContext directly
  // If rendered outside <ThemeProvider>, it will immediately throw our custom error message
  const { theme } = useTheme();

  return (
    <div style={{ padding: '1rem', backgroundColor: '#ef4444', color: 'white', borderRadius: '8px' }}>
      Theme is {theme}. Component rendered outside Provider!
    </div>
  );
};
