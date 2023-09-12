import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Footer } from '../../components/Footer';
import { NativeText } from '../../components/Text';
import { Image } from 'expo-image';

export default function IndexPage() {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', rowGap: 8 }}>
        <View style={{ marginHorizontal: 'auto' }}>
          <NativeText style={{ fontSize: 48, paddingVertical: 20 }}>I'm Hironori Sugiyama</NativeText>
        </View>

        <View style={styles.imageContainer}>
          <Image
            style={[styles.image, { width: width / 2, maxWidth: 480 }]}
            source={require('../../../assets/me2.webp')}
            contentFit='cover'
            transition={1000}
          />
          <Image
            style={[styles.image, { width: width / 2, maxWidth: 480 }]}
            source={require('../../../assets/me.webp')}
            contentFit='cover'
            transition={1000}
          />
        </View>

        <View style={{ marginHorizontal: 'auto', rowGap: 32, padding: 32 }}>
          <View>
            <NativeText style={{ fontSize: 20 }}>Japan (Gifu)</NativeText>
            <NativeText style={{ fontSize: 20 }}>I'm the father of two children.</NativeText>
          </View>

          <View>
            <NativeText style={{ fontSize: 20 }}>.NET and React are the primary languages I use in my work.</NativeText>
            <NativeText style={{ fontSize: 20 }}>
              For personal development, I develop apps using React Native (Expo).
            </NativeText>
          </View>
        </View>
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  image: {
    borderRadius: 8,
    aspectRatio: 16 / 9,
  },
});
