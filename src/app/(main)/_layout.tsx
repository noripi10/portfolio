import { Slot } from 'expo-router';
import { Header } from '../../components/Header';
import { SideBar } from '../../components/SideBar';
import { StyleSheet, View } from 'react-native';

export default function MainLayout() {
  return (
    <>
      <Header />

      <View style={styles.mainContainer}>
        <SideBar />
        <Slot />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
