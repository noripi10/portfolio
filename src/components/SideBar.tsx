import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NavLinks } from './NavLinks';
import { Link } from 'expo-router';

export const SideBar = () => {
  const { width } = useWindowDimensions();

  if (width < 640) {
    return null;
  }

  const responsibleWidth = width > 1024 ? 300 : 80;

  return (
    <View style={[styles.sidebar, { width: responsibleWidth }]}>
      <Link href='/'>
        <Text style={[{ color: 'white', fontSize: 32 }]}>H.S.</Text>
      </Link>

      <View style={styles.colHeaderLinks}>
        <NavLinks />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: '#000',
    padding: 8,
    height: '100%',
  },
  colHeaderLinks: {
    gap: 8,
    paddingVertical: 8,
  },
});
