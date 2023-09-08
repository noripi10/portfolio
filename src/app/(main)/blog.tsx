import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function BlogPage() {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white' }}>BlogPage</Text>
      {/* <img src={'/hero.jpg'} /> */}
      <Link href={'/'}>
        <Text style={{ color: 'white' }}>home</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
