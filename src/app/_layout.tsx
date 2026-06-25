import '@/style/global.css';
import { Inter_400Regular, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { Slot, usePathname } from 'expo-router';
import Head from 'expo-router/head';
import { ThemeProvider } from 'expo-router/react-navigation';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CustomThemeProvider, useCustomTheme } from '@/components/context/CustomThemeProvider';
import { pageview } from '@/libs/ga';

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
  // const params = useGlobalSearchParams();

  // Googl Analytics
  useEffect(() => {
    pageview(pathname);
  }, [pathname]);

  if (!fontLoaded || fontError) {
    return null;
  }

  return (
    <CustomThemeProvider>
      <CustomThemeLayout />
    </CustomThemeProvider>
  );
}
