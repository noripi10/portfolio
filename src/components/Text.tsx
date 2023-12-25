import { useTheme } from '@react-navigation/native';
import { Text, TextProps } from 'react-native';

export const NativeText = ({ style, ...props }: TextProps) => {
  const theme = useTheme();

  return <Text style={[{ color: theme.colors.text }, style]} {...props} />;
};
