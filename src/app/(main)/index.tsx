import { StyleSheet, Text, View } from 'react-native';
import { Footer } from '../../components/Footer';

export default function IndexPage() {
  return (
    <View style={styles.container}>
      <View style={{ margin: 'auto', flex: 1, justifyContent: 'center' }}>
        <Text style={{ color: 'white', fontSize: 48, paddingVertical: 40 }}>I'm Hironori Sugiyama</Text>
        <View style={{ rowGap: 32 }}>
          <View>
            <Text style={{ color: 'white' }}>Japan (Gifu)</Text>
            <Text style={{ color: 'white' }}>I'm the father of two children.</Text>
          </View>

          <View>
            <Text style={{ color: 'white' }}>.NET and React are the primary languages I use in my work.</Text>
            <Text style={{ color: 'white' }}>For personal development, I develop apps using React Native (Expo).</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 16,
    maxWidth: 1024,
  },
});
