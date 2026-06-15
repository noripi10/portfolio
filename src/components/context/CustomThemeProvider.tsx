import React, { Dispatch, useContext } from 'react';
import { Theme } from "expo-router/react-navigation";
import { DarkTheme, DefaultTheme } from "expo-router";
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
  setColorMode: Dispatch<React.SetStateAction<'light' | 'dark' | undefined>> | undefined;
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
