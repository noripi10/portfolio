import { StyleSheet, Text, TextProps } from 'react-native';

export const NativeText = ({ style, ...props }: TextProps) => {
  return <Text style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
});
