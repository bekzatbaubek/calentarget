import React, { useState, useEffect } from 'react';
import { Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import CircularProgress from './CircularProgress';

export default function Pomodoro() {

  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [timer, setTimer] = useState();

  const startTimer = () => {
    const timer = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
      if (secondsLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);
    setTimer(timer);
  };

  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(timer);
    }
  }, [secondsLeft, timer]);

  const formatTime = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let minuteString = minutes > 10 ? minutes : '0' + minutes;
    let secondsString = remainingSeconds > 10 ? remainingSeconds : '0' + remainingSeconds;
    return minuteString + ':' + secondsString;
  }

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  return (
    <SafeAreaView  style={ styles.position } >
      <CircularProgress/>
      <Text style={ styles.banner }>Pomodoro Screen</Text>
      <Text>{formatTime(secondsLeft)}</Text>
      <Button onPress={startTimer} title="Start"/>
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