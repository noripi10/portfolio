import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NavLinks } from './NavLinks';
import { Link } from 'expo-router';

export const SideBar = () => {
  const { width } = useWindowDimensions();

  if (width < 640) {
    return null;
  }

  const responsibleWidth = width >= 1024 ? 300 : 88;
  const isDispIcon = width >= 640;
  const isDispText = width >= 1024;

  return (
    <View style={[styles.sidebar, { width: responsibleWidth }]}>
      <Link href='/'>
        <Text style={[{ color: 'white', fontSize: 32 }]}>H.S.</Text>
      </Link>

      <View style={[styles.colHeaderLinks, { alignSelf: !isDispText ? 'center' : 'flex-start' }]}>
        <NavLinks dispIcon={isDispIcon} dispText={isDispText} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: '#000',
    padding: 8,
    paddingHorizontal: 16,
    height: '100%',
  },
  colHeaderLinks: {
    rowGap: 20,
    paddingVertical: 30,
  },
});
