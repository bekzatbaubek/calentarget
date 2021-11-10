import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets  } from 'react-native-safe-area-context';

import AboutScreen from './AboutScreen'
import HomeScreen from './HomeScreen'

const Tab = createMaterialTopTabNavigator();

export default function Tabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: { fontSize: 12 },
      tabBarStyle: { marginTop: insets.top },
    }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}