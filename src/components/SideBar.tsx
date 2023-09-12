import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { NavLinks } from './NavLinks';
import { NativeText } from './Text';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MAX_WIDTH = 300;
const MIN_WIDTH = 92;

export const SideBar = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const isXS = width < 640;
  const isMd = width >= 640;
  const isLG = width >= 1024;

  const responsibleWidth = isLG ? MAX_WIDTH : MIN_WIDTH;

  if (isXS) {
    return <></>;
  }

  return (
    <View style={[styles.sidebar, { width: responsibleWidth }]}>
      <TouchableOpacity
        onPress={() => {
          console.info('go to home');
          router.push('/');
        }}
      >
        <NativeText style={[styles.appName, !isLG && { fontSize: 32, fontWeight: '600' }]}>H.S.</NativeText>
      </TouchableOpacity>

      <View style={[styles.colHeaderLinks, { alignSelf: !isMd ? 'center' : 'flex-start' }]}>
        <NavLinks dispIcon={isMd} dispText={isLG} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: '#000',
    padding: 8,
  },
  appName: {
    fontSize: 40,
    fontWeight: '800',
    padding: 8,
    paddingTop: 24,
  },
  colHeaderLinks: {
    rowGap: 20,
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
});
