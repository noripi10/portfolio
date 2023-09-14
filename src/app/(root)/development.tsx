import { StyleSheet, View } from 'react-native';

import { NativeText } from '../../components/Text';
import { DevelopmentList } from '../../components/DevelopmentList';

export default function DevelopmentPage() {
  return (
    <View style={styles.container}>
      <NativeText style={styles.heading}>Development</NativeText>

      <DevelopmentList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  heading: {
    fontSize: 44,
    alignSelf: 'center',
  },
});
