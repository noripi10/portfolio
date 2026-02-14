import { Text, TextProps } from 'react-native';

import { useTheme } from '@react-navigation/native';

export const NativeText = ({ style, ...props }: TextProps) => {
  const theme = useTheme();

  return <Text style={[{ color: theme.colors.text, fontFamily: 'Inter_400Regular' }, style]} {...props} />;
};
