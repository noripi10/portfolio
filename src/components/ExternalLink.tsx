import { Link } from 'expo-router';
import { Platform } from 'react-native';

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
