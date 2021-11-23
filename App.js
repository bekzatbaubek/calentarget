import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Tabs from './src/components/Tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <Tabs />
      </NavigationContainer>
      <StatusBar/>
    </SafeAreaProvider>
  );
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    primary: 'rgb(0, 0, 0)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(254, 114, 76)',
    text: '#fff',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};