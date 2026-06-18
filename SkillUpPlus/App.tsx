import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/hooks/useAuth';
import { ProgressoProvider } from './src/hooks/useProgresso';
import AppNavigator from './src/navigation/AppNavigator';
export default function App() {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <SafeAreaProvider>
        <AuthProvider>
          <ProgressoProvider>
            <StatusBar style="light" />
            <AppNavigator />
          </ProgressoProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
