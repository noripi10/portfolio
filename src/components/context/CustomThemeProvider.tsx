import React, { Dispatch, useContext } from 'react';
import { Theme, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useLocalStorage } from 'react-use';

const customDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#111',
  },
  fonts: DarkTheme.fonts,
};

export const CustomThemeContext = React.createContext<{
  theme: Theme;
  setColorMode: Dispatch<React.SetStateAction<'light' | 'dark'>> | undefined;
}>({
  theme: customDarkTheme,
  setColorMode: () => undefined,
});

export const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, setColorMode] = useLocalStorage<'light' | 'dark'>('color-mode', 'dark');

  return (
    <CustomThemeContext.Provider value={{ theme: colorMode === 'dark' ? customDarkTheme : DefaultTheme, setColorMode }}>
      {children}
    </CustomThemeContext.Provider>
  );
};

export const useCustomTheme = () => useContext(CustomThemeContext);
