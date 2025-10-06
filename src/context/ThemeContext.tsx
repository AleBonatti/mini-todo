import { createContext, useContext } from 'react';
import type { ThemeCtx } from './ThemeTypes';

export const ThemeContext = createContext<ThemeCtx | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
