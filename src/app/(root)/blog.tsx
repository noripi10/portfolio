import { ScrollView, StyleSheet } from 'react-native';

import { BlogList } from '@/components/BlogList';
import { NativeText } from '@/components/Text';

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
    paddingTop: 12,
    fontSize: 32,
    margin: 'auto',
  },
});
