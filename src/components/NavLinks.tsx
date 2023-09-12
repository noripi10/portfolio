import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Icon, IconName } from './Icon';
import { NativeText } from './Text';

export const NavLinks = ({ dispIcon = true, dispText = true }: { dispIcon?: boolean; dispText?: boolean }) => {
  return (
    <>
      <NavLink to={'/project'} description='PROJECT' name={'project'} dispIcon={dispIcon} dispText={dispText} />
      <NavLink to={'/blog/'} description='BLOG' name={'blog'} dispIcon={dispIcon} dispText={dispText} />
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
  return (
    // @ts-expect-error
    <Link href={to}>
      <View style={styles.linkContainer}>
        {dispIcon && <Icon name={name} width={32} height={32} fill={'#fff'} />}
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
    columnGap: 16,
  },
  linkText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
