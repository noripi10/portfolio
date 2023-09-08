import { Platform } from 'react-native';
import { Link } from 'expo-router';

export const ExternalLink = (props: Omit<React.ComponentProps<typeof Link>, 'href'> & { href: string }) => {
  return (
    <Link
      hrefAttrs={{
        target: '_blank',
      }}
      {...props}
      // @ts-expect-error
      href={props.href}
      onPress={(e) => {
        if (Platform.OS !== 'web') {
          e.preventDefault();
        }
      }}
    />
  );
};
