import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { NativeText } from '../../../components/Text';

export async function generateStaticParams() {
  await new Promise((resolve) => setTimeout(() => resolve(true), 1000));

  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default function BlogPage() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <NativeText style={styles.heading}>{`Blog/[${id}].tsx`}</NativeText>

      <Link href={'/'}>
        <TouchableOpacity style={{ padding: 8, backgroundColor: '#f00', borderRadius: 4, margin: 8 }}>
          <NativeText>from Blog/Index to Home</NativeText>
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
