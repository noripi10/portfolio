import { StyleSheet, View } from 'react-native';
import { NativeText } from '../../components/Text';
import Rss from '../../../assets/rss/rss.json';
import { ExternalLink } from '../../components/ExternalLink';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function BlogPage() {
  return (
    <View style={styles.container}>
      <NativeText style={styles.heading}>Blog</NativeText>

      <View style={styles.list}>
        {Rss.map((item) => (
          <ExternalLink key={item.id} href={item.link} asChild>
            <Animated.View style={styles.card} entering={FadeIn}>
              <NativeText style={{ fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }}>
                ● {item.title}
              </NativeText>
              <NativeText style={{ flex: 1, padding: 4, justifyContent: 'center', alignItems: 'center' }}>
                {item.contentSnippet.substring(0, 100)}...
              </NativeText>
              <NativeText style={{ alignSelf: 'flex-end' }}>{item.isoData}</NativeText>
            </Animated.View>
          </ExternalLink>
        ))}
      </View>
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
  list: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 32,
  },
  card: {
    width: '100%',
    height: 140,
    maxWidth: 600,
    backgroundColor: '#000',
    padding: 8,
    paddingTop: 12,
    paddingBottom: 16,
    borderRadius: 8,
    margin: 8,
  },
});
