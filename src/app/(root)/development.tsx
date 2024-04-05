import { StyleSheet, ScrollView } from 'react-native';

import { NativeText } from '@/components/Text';
import { DevelopmentList } from '@/components/developmentList';

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
    paddingTop: 12,
    fontSize: 32,
    margin: 'auto',
  },
});
