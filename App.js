import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/components/Tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tabs/>
      </NavigationContainer>
      <StatusBar/>
    </SafeAreaProvider>
  );
}
