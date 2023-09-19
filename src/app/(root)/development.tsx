import { StyleSheet, ScrollView } from 'react-native';

import { NativeText } from '../../components/Text';
import { DevelopmentList } from '../../components/DevelopmentList';

export default function DevelopmentPage() {
  return (
    <ScrollView style={styles.container}>
      <NativeText style={styles.heading}>Development</NativeText>

      <DevelopmentList />
    </ScrollView>
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
