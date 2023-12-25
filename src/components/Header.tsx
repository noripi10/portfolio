import { StyleSheet, Platform, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import { NavLinks } from './NavLinks';
import { NativeText } from './Text';
import { useTheme } from '@react-navigation/native';

export const MobileHeader = () => {
  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const theme = useTheme();
  const backgroundColor = theme.dark ? 'rgba(0,0,0,0.8)' : 'rgba(224,224,224,0.9)';

  if (width > 640) {
    return null;
  }

  return (
    <View style={[styles.header, { backgroundColor, paddingTop: top, height: 60 + top }]}>
      <View style={styles.title}>
        <Link href='/'>
          <NativeText style={{ color: theme.colors.text, fontSize: 24, fontWeight: 'bold' }}>H.S.</NativeText>
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
