import React, { useState, useCallback, useEffect } from 'react';
import { Text, Button, Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const {width} = Dimensions.get("window");
const size = width - 32;
const strokeWidth = 50;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

export default function Pomodoro() {

  const pomodoroPeriodInSeconds = 25 * 60;
  const [secondsLeft, setSecondsLeft] = useState(pomodoroPeriodInSeconds);
  const [timer, setTimer] = useState();
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    const newTimer = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
      if (secondsLeft === 0) {
        clearInterval(newTimer);
      }
    }, 1000);
    setTimer(newTimer);
  };

  const stopTimer = () => {
    clearInterval(timer);
  }

  const togglePomodoroTimer = () => {
    setIsRunning(!isRunning);
    if (!isRunning) startTimer();
    else stopTimer();
    console.log("Clicked on pomodoro start: is the timer running: " + isRunning);
  };

  const formatTime = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let minuteString = minutes >= 10 ? minutes : '0' + minutes;
    let secondsString = remainingSeconds >= 10 ? remainingSeconds : '0' + remainingSeconds;
    return minuteString + ':' + secondsString;
  }

  const progress = useSharedValue(0);

  const startAnimation = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, 
      { duration: pomodoroPeriodInSeconds * 1000 }
    );
  })

  const animatedProps = useAnimatedProps(() => {
    return {strokeDashoffset: circumference * progress.value}
  });

  return (
    <SafeAreaView  style={ styles.position } >
      <View>
        <Svg width={size} height={size}>
          <Circle
            stroke="#413245"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            {...{ strokeWidth }}
          />
          <AnimatedCircle
            stroke="#598741"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={15}
            strokeDasharray={circumference}
            animatedProps={animatedProps}
          />
        </Svg>
      </View>
      <Text style={ styles.banner }>Pomodoro Screen</Text>
      <Text>{formatTime(secondsLeft)}</Text>
      <Button onPress={togglePomodoroTimer} title="Start"/>
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