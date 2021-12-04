import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Tabs from './src/components/Tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import useDatabase from './src/hooks/useDatabase';
import { TargetsContextProvider } from './src/contexts/TargetsContext';

export default function App() {

  const isDBLoadingComplete = useDatabase();

  const [loaded] = useFonts({
    SofiaProRegular: require('./assets/fonts/SofiaProRegular.ttf'),
    SofiaProMedium: require('./assets/fonts/SofiaProMedium.ttf'),
    SofiaProSemiBold: require('./assets/fonts/SofiaProSemiBold.ttf'),
  });

  if (!loaded || !isDBLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <TargetsContextProvider>
        <NavigationContainer theme={MyTheme}>
          <Tabs />
        </NavigationContainer>
        <StatusBar/>
      </TargetsContextProvider>
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