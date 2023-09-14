import { StyleSheet, View } from 'react-native';
import { NativeText } from '../../components/Text';
import Rss from '../../constants/rss/rss.json';
import { ExternalLink } from '../../components/ExternalLink';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function DevelopmentPage() {
  return (
    <View style={styles.container}>
      <NativeText style={styles.heading}>Development</NativeText>

      <View style={styles.list}>
        {Rss.map((item) => (
          <ExternalLink key={item.id} href={item.link} asChild>
            <Animated.View style={styles.card} entering={FadeIn}>
              <NativeText>{item.id}</NativeText>
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
