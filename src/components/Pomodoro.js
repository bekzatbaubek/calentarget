import React, { useState, useCallback, useRef, useContext } from 'react';
import { Text, Button, Dimensions, View } from 'react-native';
import Animated, { cancelAnimation, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { TargetsContext } from '../contexts/TargetsContext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const {width} = Dimensions.get("window");
const size = width - 32;
const strokeWidth = 50;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

const CircularProgress = ({animatedProps}) => {
  return <View>
  <Svg width={size} height={size}>
    <Circle
      stroke="#413245"
      fill="none"
      cx={size / 2}
      cy={size / 2}
      r={radius}
      strokeWidth={20}
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
}

const formatTime = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  let minuteString = minutes >= 10 ? minutes : '0' + minutes;
  let secondsString = remainingSeconds >= 10 ? remainingSeconds : '0' + remainingSeconds;
  return minuteString + ':' + secondsString;
}

export default function Pomodoro() {

  const { targets } = useContext(TargetsContext);
  const pomodoroPeriodInSeconds = 10;
  const [secondsLeft, setSecondsLeft] = useState(pomodoroPeriodInSeconds);
  const [timer, setTimer] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroButtonText, setPMButtonText] = useState("Start");

  const secondsLeftRef = useRef(secondsLeft);

  const startTimer = () => {
    const newTimer = setInterval(() => {
      secondsLeftRef.current--;
      console.log(`Timer tick: ${secondsLeftRef.current}`);
      setSecondsLeft(secondsLeftRef.current);
      if (secondsLeftRef.current === 0) {
        clearInterval(newTimer);
        cleanUpAfterPeriod();
      }
    }, 1000);
    setTimer(newTimer);
  };

  const stopTimer = () => {
    clearInterval(timer);
  }

  const cleanUpAfterPeriod = () => {
    setSecondsLeft(pomodoroPeriodInSeconds);
    secondsLeftRef.current = pomodoroPeriodInSeconds;
    setPMButtonText("Start");
    setIsRunning(false);
    progress.value = 0;
  }

  const startPomodoroTimer = () => {
    startTimer();
    startAnimation();
    setPMButtonText("Pause");
  }

  const stopPomodoroTimer = () => {
    stopTimer();
    cancelAnimation(progress);
    setPMButtonText("Start");
  }

  const togglePomodoroTimer = () => {
    setIsRunning(!isRunning);
    if (isRunning) {
      stopPomodoroTimer();
    }
    else {
      startPomodoroTimer();
    }
  };

  const progress = useSharedValue(0);

  const startAnimation = useCallback(() => {
    progress.value = withTiming(1, 
      { duration: secondsLeft * 1000 }
    );
  })

  const animatedProps = useAnimatedProps(() => {
    return {strokeDashoffset: circumference * progress.value}
  });

  return (
    <View>
      <CircularProgress animatedProps={animatedProps}/>
      <Text>{formatTime(secondsLeftRef.current)}</Text>
      <Button onPress={() => togglePomodoroTimer()} title={pomodoroButtonText}/>
    </View>
  );
}