import { Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { MobileHeader } from '../../components/Header';
import { SideBar } from '../../components/SideBar';
import { Backgound } from '../../components/Backgound';

export default function MainLayout() {
  return (
    <>
      <MobileHeader />

      <View style={styles.mainContainer}>
        <SideBar />

        <Backgound />

        <View style={styles.slotContainer}>
          <Slot />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  slotContainer: {
    flex: 1,
  },
});
