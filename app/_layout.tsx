import { Slot } from 'expo-router';
import { SessionProvider } from '../ctx';
import Toast from 'react-native-toast-message';
import { View, StyleSheet } from 'react-native';

export default function RootLayout() {
  const styles = StyleSheet.create({
    toastWrapper: {
      zIndex: 9999,
      elevation: 9999, // For Android
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
  });

  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <View style={styles.toastWrapper}>
        <Toast />
      </View>
      <Slot />
    </SessionProvider>
  );
}
