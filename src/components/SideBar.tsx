import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useWidth } from '@/hooks/useWidth';
import { NavLinks } from './NavLinks';
import { NativeText } from './Text';
import { useTheme } from '@react-navigation/native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

const MAX_WIDTH = 300;
const MIN_WIDTH = 92;

export const SideBar = () => {
  const router = useRouter();

  const { isXS, isMD, isLG } = useWidth();
  const theme = useTheme();
  const width = useSharedValue(0);
  const lg = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      backgroundColor: theme.dark ? '#000' : '#ddd',
      opacity: width.value < MIN_WIDTH ? 0 : 1,
    };
  }, [width, theme.dark]);

  const animatedAlign = useAnimatedStyle(() => {
    return {
      alignItems: 'flex-start',
      paddingLeft: interpolate(lg.value, [0, 1], [24, 16]),
    };
  });

  useEffect(() => {
    if (isLG) {
      width.value = withSpring(MAX_WIDTH, { mass: 0.5, damping: 12 });
      lg.value = 1;
    } else {
      width.value = withSpring(MIN_WIDTH, { mass: 0.5, damping: 18, stiffness: 80 });
      lg.value = withDelay(200, withTiming(0));
    }
  }, [isLG, width, lg]);

  if (isXS) {
    return <></>;
  }

  return (
    <Animated.View style={[styles.sidebar, animatedStyle]}>
      <TouchableOpacity
        onPress={() => {
          router.push('/');
        }}
      >
        <NativeText style={[styles.appName, !isLG && { fontSize: 30, fontWeight: '600' }]}>H.S.</NativeText>
      </TouchableOpacity>

      <Animated.View style={[styles.colHeaderLinks, animatedAlign]}>
        <NavLinks dispIcon={isMD} dispText={isLG} />
      </Animated.View>
    </Animated.View>
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
    fontFamily: 'Inter_700Bold',
  },
  colHeaderLinks: {
    flex: 1,
    rowGap: 20,
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
});
