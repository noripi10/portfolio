import { StyleSheet, View } from 'react-native';

export const Backgound = () => <View style={styles.background} />;

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#111',
    zIndex: -1,
  },
});
