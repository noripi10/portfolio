import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import Animated, { FadeIn } from 'react-native-reanimated';

import { NativeText } from '../../components/Text';
import { ExternalLink } from '../../components/ExternalLink';
import Rss from '../../constants/rss/rss.json';

console.info({ Rss });

export default function BlogPage() {
  return (
    <View style={styles.container}>
      <NativeText style={styles.heading}>Blog</NativeText>

      <View style={styles.list}>
        {Rss.map((item) => (
          <ExternalLink key={item.id} href={item.link} asChild>
            <Animated.View style={styles.card} entering={FadeIn}>
              <View style={styles.cardImage}>
                <Image style={styles.cardImage} source={{ uri: item.og }} contentFit='contain' />
              </View>
              <View style={styles.cardDetail}>
                <NativeText style={styles.cardTitle}>{item.title}</NativeText>
                <NativeText style={styles.cardContent}>{item.contentSnippet.substring(0, 100)}...</NativeText>
                <NativeText style={styles.cardDate}>{item.isoData}</NativeText>
              </View>
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
    flexDirection: 'row',
    width: '100%',
    height: 160,
    maxWidth: 768,
    backgroundColor: '#000',
    padding: 8,
    paddingVertical: 12,
    paddingBottom: 16,
    borderRadius: 8,
    margin: 8,
    shadowColor: '#ddd',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  cardContent: {
    flex: 1,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDate: {
    alignSelf: 'flex-end',
    paddingHorizontal: 8,
  },
  cardImage: {
    flex: 1,
    maxWidth: 160,
    margin: 2,
    marginRight: 4,
  },
  cardDetail: {
    flex: 1,
  },
});
