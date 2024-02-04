import { StyleSheet, ScrollView, View, Platform } from 'react-native';

import { Footer } from '@/components/Footer';
import { NativeText } from '@/components/Text';
import { AnimatedText } from '@/components/AnimatedText';
import { MainVisual } from '@/components/MainVisual';

const CustomView = Platform.OS === 'web' ? View : ScrollView;

export default function IndexPage() {
  return (
    <CustomView style={styles.container}>
      <View style={styles.mainView}>
        <View style={{ marginHorizontal: 'auto' }}>
          <AnimatedText>I'm Hironori Sugiyama</AnimatedText>
        </View>

        <MainVisual />

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
  mainView: {
    flex: 1,
    justifyContent: 'center',
    rowGap: 8,
  },
});
