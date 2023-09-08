import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { NavLinks } from './NavLinks';
import { Link } from 'expo-router';

export const Header = () => {
  const { width } = useWindowDimensions();

  if (width > 640) {
    return null;
  }

  return (
    <View style={styles.header}>
      <View style={styles.title}>
        <Link href='/'>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>H.S.</Text>
        </Link>
      </View>

      <View style={styles.rowHeaderLinks}>
        <NavLinks />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 100,
  },
  title: {
    flexGrow: 1,
  },
  rowHeaderLinks: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
});
