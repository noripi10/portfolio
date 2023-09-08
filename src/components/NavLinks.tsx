import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { Icon, IconName } from './Icon';

export const NavLinks = ({ dispIcon = true, dispText = true }: { dispIcon?: boolean; dispText?: boolean }) => {
  return (
    <>
      <NavLink to={'/blog'} description='BLOG' name={'blog'} dispIcon={dispIcon} dispText={dispText} />
      <NavLink to={'/project'} description='PROJECT' name={'project'} dispIcon={dispIcon} dispText={dispText} />
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
      <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', columnGap: 4 }}>
        {dispIcon && <Icon name={name} width={32} height={32} fill={'#fff'} />}
        {dispText && <Text style={{ color: 'white', fontSize: 16 }}>{description}</Text>}
      </View>
    </Link>
  );
};
