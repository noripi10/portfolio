import Github from '@assets/svg/github.svg';
import Email from '@assets/svg/mail.svg';
import X from '@assets/svg/x.svg';
import { useTheme } from 'expo-router/react-navigation';
import { StyleSheet, View } from 'react-native';

import { Cube } from './cube/Cube';
import { ExternalLink } from './ExternalLink';
import { NativeText } from './Text';

export const Footer = () => {
  const color = useTheme().colors.text;

  return (
    <View style={styles.footer}>
      <View style={styles.iconContainer}>
        <ExternalLink href='https://twitter.com/noripi_10'>
          <X width={32} height={32} fill={color} />
        </ExternalLink>

        <ExternalLink href='https://github.com/noripi10'>
          <Github width={32} height={32} fill={color} />
        </ExternalLink>

        <ExternalLink href='mailto:sgym.snk@gmai.com'>
          <Email width={32} height={32} fill={color} />
        </ExternalLink>
      </View>

      <NativeText style={{ color }}>Powered by Expo</NativeText>

      <ExternalLink href='https://expo.dev/'>
        <Cube />
      </ExternalLink>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    columnGap: 36,
    paddingBottom: 12,
  },
});
