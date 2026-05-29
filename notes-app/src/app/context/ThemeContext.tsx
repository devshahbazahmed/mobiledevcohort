import { createContext, useContext, useState } from 'react';
import type { ColorSchemeName } from 'react-native';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme, Theme } from '../types/themeTypes';

type ThemeContextType = {
  theme: Theme;
  manualDark: boolean | null;
  setManualDark: React.Dispatch<React.SetStateAction<boolean | null>>;
  isDark: boolean;
  systemScheme: ColorSchemeName;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme();
  const [manualDark, setManualDark] = useState<boolean | null>(null);

  const isDark = manualDark !== null ? manualDark : systemScheme === 'dark';

  const theme = isDark ? darkTheme : lightTheme;
  console.log(systemScheme);

  return (
    <ThemeContext.Provider
      value={{ theme, manualDark, setManualDark, systemScheme, isDark }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
}
