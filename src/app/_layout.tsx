import Head from 'expo-router/head';
import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <>
      <Head>
        <title>H.S.</title>
      </Head>

      <Backgound />

      <Slot />

      <StatusBar style='light' />
    </>
  );
}

const Backgound = () => <View style={styles.background} />;

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#111',
    zIndex: -1,
  },
});
