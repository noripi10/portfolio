import { Slot, usePathname } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';

import { Backgound } from '@/components/Backgound';
import { MobileHeader } from '@/components/Header';
import { SideBar } from '@/components/SideBar';

export default function MainLayout() {
  const pathname = usePathname();

  // ホーム(particle portfolio)は専用のヘッダー/ナビを持つため、共通の Sidebar/Header は表示しない
  if (Platform.OS === 'web' && pathname === '/') {
    return <Slot />;
  }

  return (
    <>
      <Backgound />

      <MobileHeader />

      <View style={styles.mainContainer}>
        <SideBar />
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
