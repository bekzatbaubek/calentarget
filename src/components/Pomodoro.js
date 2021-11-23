import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export default function Pomodoro() {
  return (
    <SafeAreaView  style={ styles.position } >
      <Text style={ styles.banner }>Pomodoro Screen</Text>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  banner: {
    color: 'red'
    
  },

  position: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  }
  
})