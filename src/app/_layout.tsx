import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';
import Head from 'expo-router/head';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#111',
  },
};

export const unstable_settings = {
  initialRouteName: '(root)',
};

export default function RootLayout() {
  return (
    <>
      <Head>
        <title>H.S</title>
      </Head>

      <StatusBar style='light' />

      <ThemeProvider value={customDarkTheme}>
        <Slot />
      </ThemeProvider>
    </>
  );
}
