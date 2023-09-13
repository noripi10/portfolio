import { StyleSheet, Platform, View, useWindowDimensions } from 'react-native';

import { NavLinks } from './NavLinks';
import { Link } from 'expo-router';
import { NativeText } from './Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const MobileHeader = () => {
  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  if (width > 640) {
    return null;
  }

  return (
    <View style={[styles.header, { paddingTop: top, height: 60 + top }]}>
      <View style={styles.title}>
        <Link href='/'>
          <NativeText style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>H.S.</NativeText>
        </Link>
      </View>

      <View style={styles.rowHeaderLinks}>
        <NavLinks dispText={Platform.OS === 'web'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.9)',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 100,
  },
  title: {
    flexGrow: 1,
  },
  rowHeaderLinks: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});
