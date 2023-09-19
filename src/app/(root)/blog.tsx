import { StyleSheet, ScrollView } from 'react-native';

import { NativeText } from '../../components/Text';
import { BlogList } from '../../components/BlogList';

export default function BlogPage() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <NativeText style={styles.heading}>Blog</NativeText>

      <BlogList />
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
