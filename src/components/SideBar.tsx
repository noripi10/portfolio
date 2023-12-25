import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useWidth } from '@/hooks/useWidth';
import { NavLinks } from './NavLinks';
import { NativeText } from './Text';
import { useTheme } from '@react-navigation/native';

const MAX_WIDTH = 300;
const MIN_WIDTH = 92;

export const SideBar = () => {
  const router = useRouter();
  const { isXS, isMD, isLG } = useWidth();
  const theme = useTheme();

  const responsibleWidth = isLG ? MAX_WIDTH : MIN_WIDTH;

  if (isXS) {
    return <></>;
  }

  return (
    <View style={[styles.sidebar, { width: responsibleWidth, backgroundColor: theme.dark ? '#000' : '#ddd' }]}>
      <TouchableOpacity
        onPress={() => {
          router.push('/');
        }}
      >
        <NativeText style={[styles.appName, !isLG && { fontSize: 32, fontWeight: '600' }]}>H.S.</NativeText>
      </TouchableOpacity>

      <View style={[styles.colHeaderLinks, { alignItems: isXS ? 'center' : 'flex-start' }]}>
        <NavLinks dispIcon={isMD} dispText={isLG} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    padding: 8,
  },
  appName: {
    fontSize: 40,
    fontWeight: '800',
    padding: 8,
    paddingTop: 24,
  },
  colHeaderLinks: {
    flex: 1,
    rowGap: 20,
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
});
