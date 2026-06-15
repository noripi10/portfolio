import { Platform } from 'react-native';

import { Link } from 'expo-router';

export const ExternalLink = (props: Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string }) => {
  return (
    <Link
      {...props}
      href={props.href}
      target='_blank'
      rel='noopener noreferrer'
      onPress={(e) => {
        if (Platform.OS !== 'web') {
          e.preventDefault();
        }
      }}
    />
  );
};
