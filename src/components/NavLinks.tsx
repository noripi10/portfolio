import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';

import { Icon, IconName } from './Icon';
import { NativeText } from './Text';
import { useTheme } from '@react-navigation/native';

export const NavLinks = ({ dispIcon = true, dispText = true }: { dispIcon?: boolean; dispText?: boolean }) => {
  return (
    <>
      <NavLink to={'/development'} description='Development' name={'project'} dispIcon={dispIcon} dispText={dispText} />
      <NavLink to={'/blog'} description='Blog' name={'blog'} dispIcon={dispIcon} dispText={dispText} />
    </>
  );
};

const NavLink = ({
  to,
  description,
  name,
  dispIcon,
  dispText,
}: {
  to: string;
  description: string;
  name: IconName | undefined;
  dispIcon: boolean;
  dispText: boolean;
}) => {
  const theme = useTheme();

  return (
    // @ts-expect-error
    <Link href={to}>
      <View style={styles.linkContainer}>
        {dispIcon && <Icon name={name} width={28} height={28} fill={theme.colors.text} />}
        {dispText && <NativeText style={styles.linkText}>{description}</NativeText>}
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 6,
  },
  linkText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
