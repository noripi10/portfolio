import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { NativeText } from '../../components/Text';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ProjectPage() {
  return (
    <View style={styles.container}>
      <NativeText style={styles.heading}>ProjectPage</NativeText>

      <Link href={'/'}>
        <TouchableOpacity style={{ padding: 8, backgroundColor: '#d92', borderRadius: 4, margin: 8 }}>
          <NativeText>from Propject to Home</NativeText>
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
