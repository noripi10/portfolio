import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { Footer } from '../../components/Footer';
import { NativeText } from '../../components/Text';
import { Image } from 'expo-image';

export default function IndexPage() {
  const { width } = useWindowDimensions();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, justifyContent: 'center', rowGap: 8 }}>
        <View style={{ marginHorizontal: 'auto' }}>
          <NativeText style={{ fontSize: 44, paddingVertical: 20 }}>I'm Hironori Sugiyama</NativeText>
        </View>

        <View style={styles.imageContainer}>
          <Image
            style={[styles.image, { width: width * 0.8, maxWidth: 540 }]}
            source={require('../../../assets/me2.webp')}
            contentFit='cover'
            transition={1000}
          />
          <Image
            style={[styles.image, { width: width * 0.8, maxWidth: 540 }]}
            source={require('../../../assets/me.webp')}
            contentFit='cover'
            transition={1000}
          />
        </View>

        <View style={{ flex: 1, alignItems: 'center', rowGap: 32, padding: 32 }}>
          <NativeText style={{ fontSize: 20 }}>Japan (Gifu)</NativeText>

          <View>
            <NativeText style={{ fontSize: 20 }}>.NET and React are the primary languages I use in my work.</NativeText>
            <NativeText style={{ fontSize: 20 }}>
              For personal development, I develop apps using React Native (Expo).
            </NativeText>
          </View>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  imageContainer: {
    alignItems: 'center',
    gap: 8,
  },
  image: {
    borderRadius: 8,
    aspectRatio: 16 / 9,
  },
});
