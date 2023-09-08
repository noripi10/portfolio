import { StyleSheet, Text, View } from 'react-native';

import X from '../../assets/svg/x.svg';
import Github from '../../assets/svg/github.svg';
import Expo from '../../assets/svg/expo.svg';
import Email from '../../assets/svg/mail.svg';
import { ExternalLink } from './ExternalLink';

export const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={{ flexDirection: 'row', columnGap: 16, paddingBottom: 12 }}>
        <ExternalLink href='https://twitter.com/noripi_10'>
          <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 12 }}>
            <X width={32} height={32} fill='#fff' />
          </View>
        </ExternalLink>

        <ExternalLink href='https://github.com/noripi10'>
          <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 12 }}>
            <Github width={32} height={32} fill='#fff' />
          </View>
        </ExternalLink>

        <ExternalLink href='mailto:sgym.snk@gmai.com'>
          <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 12 }}>
            <Email width={32} height={32} fill='#fff' />
          </View>
        </ExternalLink>
      </View>

      <Text style={{ color: 'white', paddingBottom: 4 }}>Powered by Expo</Text>
      <ExternalLink href='https://expo.dev/'>
        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 12 }}>
          <Expo width={32} height={32} fill='#fff' />
        </View>
      </ExternalLink>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'column',

    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
