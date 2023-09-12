import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { MobileHeader } from '../../components/Header';
import { SideBar } from '../../components/SideBar';

export default function MainLayout() {
  return (
    <>
      <MobileHeader />

      <View style={styles.mainContainer}>
        <SideBar />

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='index' />
          <Stack.Screen name='blog' />
          <Stack.Screen name='project' />
        </Stack>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
