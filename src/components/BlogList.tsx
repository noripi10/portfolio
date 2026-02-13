import { View } from 'react-native';
import { Image } from 'expo-image';

import { NativeText } from '@/components/Text';
import { ExternalLink } from '@/components/ExternalLink';
import Rss from '@/constants/rss/rss.json';

// @ts-expect-error
import { unstable_styles } from './BlogList.module.css';

type RssItemProp = (typeof Rss)[0];

export const BlogItem = ({ item }: { item: RssItemProp; index: number }) => {
  return (
    <ExternalLink key={item.id} href={item.link} asChild>
      <View style={unstable_styles.card}>
        <View style={unstable_styles.card_image_container}>
          <Image style={unstable_styles.card_image} source={{ uri: item.og }} contentFit='contain' />
        </View>
        <View style={unstable_styles.card_detail}>
          <NativeText style={unstable_styles.card_title}>{item.title}</NativeText>
          <NativeText style={unstable_styles.card_content}>{item.contentSnippet.substring(0, 100)}...</NativeText>
          <NativeText style={unstable_styles.card_date}>{item.isoData}</NativeText>
        </View>
      </View>
    </ExternalLink>
  );
};

export const BlogList = () => {
  return (
    <View style={unstable_styles.blog_list}>
      {Rss.map((item, index) => (
        <BlogItem key={item.id} {...{ item, index }} />
      ))}
    </View>
  );
};
