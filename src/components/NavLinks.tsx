import { Link } from 'expo-router';
import { Text } from 'react-native';

export const NavLinks = () => (
  <>
    <NavLink to={'/blog'} description='BLOG' />
    <NavLink to={'/project'} description='PROJECT' />
  </>
);

const NavLink = ({ to, description }: { to: string; description: string }) => {
  return (
    // @ts-ignore
    <Link href={to}>
      <Text style={{ color: 'white', fontSize: 16 }}>{description}</Text>
    </Link>
  );
};
