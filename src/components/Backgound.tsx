import { useTheme } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

export const Backgound = () => {
  const theme = useTheme();

  return <View style={[styles.background, { backgroundColor: theme.colors.background }]} />;
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});
