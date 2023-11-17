import { StyleSheet, ScrollView, View, useWindowDimensions, Platform } from 'react-native';
import { Image } from 'expo-image';

import { Footer } from '@/components/Footer';
import { NativeText } from '@/components/Text';
import { AnimatedText } from '@/components/AnimatedText';

const CustomView = Platform.OS === 'web' ? View : ScrollView;

export default function IndexPage() {
  const { width } = useWindowDimensions();

  return (
    <CustomView style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', rowGap: 8 }}>
        <View style={{ marginHorizontal: 'auto' }}>
          {/* <NativeText style={{ fontSize: 44, paddingVertical: 20 }}>I'm Hironori Sugiyama</NativeText> */}
          <AnimatedText>I'm Hironori Sugiyama</AnimatedText>
        </View>

        <View style={styles.imageContainer}>
          <View>
            <Image
              style={[styles.image, { width: width * 0.8, maxWidth: 540 }]}
              source={require('@assets/me.webp')}
              contentFit='cover'
              transition={1000}
            />
            <Image
              style={[styles.avatar]}
              source={require('@assets/avatar.png')}
              contentFit='contain'
              transition={1000}
            />
          </View>
        </View>

        <View style={{ flex: 1, alignItems: 'center', rowGap: 32, padding: 32 }}>
          <NativeText style={{ fontSize: 20 }}>Japan (Gifu)</NativeText>

          <View style={{ rowGap: 20 }}>
            <NativeText style={{ fontSize: 20 }}>Frontend Developer</NativeText>

            <NativeText style={{ fontSize: 16 }}>.NET and React are the primary languages I use in my work.</NativeText>
            <NativeText style={{ fontSize: 16 }}>
              For personal development, I develop apps using React Native (Expo).
            </NativeText>
          </View>
        </View>
      </View>

      <Footer />
    </CustomView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    position: 'relative',
  },
  image: {
    borderRadius: 8,
    aspectRatio: 16 / 9,
  },
  avatar: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 64,
    height: 64,
    borderRadius: 100,
  },
});
