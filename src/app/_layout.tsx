import '@/style/global.css';

import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';
import Head from 'expo-router/head';
import { ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomThemeProvider, useCustomTheme } from '@/components/context/CustomThemeProvider';

export const unstable_settings = {
  initialRouteName: '(root)',
};

function RootLayout() {
  const { theme } = useCustomTheme();

  return (
    <SafeAreaProvider>
      <Head>
        <title>H.S</title>
      </Head>

      <StatusBar style='light' />

      <ThemeProvider value={theme}>
        <Slot />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default function CustomThemeLayout() {
  return (
    <CustomThemeProvider>
      <RootLayout />
    </CustomThemeProvider>
  );
}
