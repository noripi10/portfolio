import '@/style/global.css';

import { StatusBar } from 'expo-status-bar';
import { Slot, useGlobalSearchParams, usePathname } from 'expo-router';
import Head from 'expo-router/head';
import { ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomThemeProvider, useCustomTheme } from '@/components/context/CustomThemeProvider';
import { useEffect } from 'react';
import { pageview } from '@/lib/ga';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

export const unstable_settings = {
  initialRouteName: '(root)',
};

function CustomThemeLayout() {
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

export default function RootLayout() {
  const [fontLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  const pathname = usePathname();
  const params = useGlobalSearchParams();

  // Googl Analytics
  useEffect(() => {
    pageview(pathname);
  }, [pathname, params]);

  if (!fontLoaded || fontError) {
    return null;
  }

  return (
    <CustomThemeProvider>
      <CustomThemeLayout />
    </CustomThemeProvider>
  );
}
