import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets  } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import PomodoroScreen from './Pomodoro'
import CalendarScreen from './Calendar'
import TargetScreen from './Target'

const Tab = createMaterialTopTabNavigator();

export default function Tabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: { fontSize: 12 },
      tabBarStyle: { marginTop: insets.top },
    }} >
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Pomodoro" component={PomodoroScreen} />
      <Tab.Screen name="Target" component={TargetScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  
  
})
