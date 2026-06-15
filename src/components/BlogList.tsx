import { View } from 'react-native';

import { Image } from 'expo-image';

import { ExternalLink } from '@/components/ExternalLink';
import { NativeText } from '@/components/Text';
import Rss from '@/constants/rss/rss.json';

import { unstable_styles as styles } from './BlogList.module.css';

type RssItemProp = (typeof Rss)[0];

export const BlogItem = ({ item }: { item: RssItemProp; index: number }) => {
  return (
    <ExternalLink key={item.id} href={item.link} asChild>
      <View style={styles.card}>
        <View style={styles.card_image_container}>
          <Image style={styles.card_image} source={{ uri: item.og }} contentFit='contain' />
        </View>
        <View style={styles.card_detail}>
          <NativeText style={styles.card_title}>{item.title}</NativeText>
          <NativeText style={styles.card_content}>{item.contentSnippet.substring(0, 100)}...</NativeText>
          <NativeText style={styles.card_date}>{item.isoData}</NativeText>
        </View>
      </View>
    </ExternalLink>
  );
};

export const BlogList = () => {
  return (
    <View style={styles.blog_list}>
      {Rss.map((item, index) => (
        <BlogItem key={item.id} {...{ item, index }} />
      ))}
    </View>
  );
};
