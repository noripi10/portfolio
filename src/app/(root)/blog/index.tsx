import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { NativeText } from '../../../components/Text';

export default function BlogPage() {
  //   // useEffect(() => {
  //   //   fetch('https://zenn.dev/noripi10/feed')
  //   //     .then((res) => res.text())
  //   //     .then((data) => rssParser.parse(data))
  //   //     .then((rss) => console.info(rss));
  //   }, []);

  return (
    <View style={styles.container}>
      <NativeText style={styles.heading}>Blog/index.tsx</NativeText>

      <Link href={'/'}>
        <TouchableOpacity style={{ padding: 8, backgroundColor: '#ff0', borderRadius: 4, margin: 8 }}>
          <NativeText>from Blog/Index to Home</NativeText>
        </TouchableOpacity>
      </Link>

      <Link href={'/(root)/blog/1'}>
        <TouchableOpacity style={{ padding: 8, backgroundColor: '#f0f', borderRadius: 4, margin: 8 }}>
          <NativeText>Go To Blog/1</NativeText>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  heading: {
    fontSize: 48,
  },
});
