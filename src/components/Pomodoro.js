import React, { useState, useCallback, useRef, useContext } from 'react';
import { Text, Button, Dimensions, View, Alert, StyleSheet, S, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { cancelAnimation, useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import { Easing } from 'react-native-reanimated';
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
      stroke="#EDECEF"
      fill="#FFFFFF"
      cx={size / 2}
      cy={size / 2}
      r={radius}
      strokeWidth={20}
    />
    <AnimatedCircle
      stroke="#FDC0AF"
      fill="none"
      cx={size / 2}
      cy={size / 2}
      r={radius - 17}
      strokeWidth={15}
      strokeDasharray={circumference}
      animatedProps={animatedProps}
    />
  </Svg>
</View>
}

const PomodoroControls = ({pmBtnText, toggle, reset}) => {
  return <View style={{display:"flex", flexDirection: "row", justifyContent:"space-evenly", width:400, marginTop: 50}}>
    <TouchableOpacity style={styles.button} onPress={() => toggle()}>
      <Text style={{fontFamily:"SofiaProMedium", color: "white", fontSize: 16,}}>{pmBtnText}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => reset()}>
      <Text style={{fontFamily:"SofiaProMedium", color: "white", fontSize: 16,}}>Reset</Text>
    </TouchableOpacity>
  </View>
}

const SelectedTargetOverview = (props) => {
  if (props.targetForPM === null || props.targetForPM === undefined) {
    return <Text>Select target</Text>
  }
  else {
    return <View style={styles.pomodoroControl}>
      <View style={styles.targetTitle}>
        <Text style={styles.pomodoIcons}>{"🎓".repeat(props.targetForPM.pending)}</Text>
        <Text style={{fontSize: 20, fontFamily: "SofiaProRegular", color:"#A6A6A8"}}>Work on:</Text>
        <Text style={{fontSize: 20, fontFamily: "SofiaProRegular", color:"#A6A6A8"}}>{props.targetForPM.title}</Text>
      </View>
      <PomodoroControls
        pmBtnText={props.pmBtnText}
        toggle={props.toggle}
        reset={props.reset}/>
    </View>
  }
}

const formatTime = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  let minuteString = minutes >= 10 ? minutes : '0' + minutes;
  let secondsString = remainingSeconds >= 10 ? remainingSeconds : '0' + remainingSeconds;
  return minuteString + ':' + secondsString;
}

export default function Pomodoro() {

  const { targetForPomodoro, updateTarget } = useContext(TargetsContext);
  const pomodoroPeriodInSeconds = 25 * 60;
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
        finishedPomodoroPeriod();
        updateTarget(targetForPomodoro.id, targetForPomodoro.pending - 1);
        cleanUpAfterPeriod();
      }
    }, 1000);
    setTimer(newTimer);
  };

  const finishedPomodoroPeriod = () => {
    Alert.alert(
      "Congratulations! 🎉",
      `${targetForPomodoro.title} Target achieved`,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ])
  }

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

  const resetPomodoroTimer = () => {
    stopPomodoroTimer();
    setIsRunning(false);
    cleanUpAfterPeriod();
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
    <ScrollView style={{ backgroundColor: 'white'}}>
    <View style= {styles.pomodoroContainer}>
      <CircularProgress animatedProps={animatedProps} />
      <Text style={styles.timeStamp}>{formatTime(secondsLeftRef.current)}</Text>
      <SelectedTargetOverview 
        toggle={togglePomodoroTimer}
        reset={resetPomodoroTimer}
        pmBtnText={pomodoroButtonText}
        targetForPM={targetForPomodoro}/>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pomodoroContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  timeStamp: {
    fontFamily: 'SofiaProSemiBold',
    fontSize: 44,
    position: "relative",
    zIndex: 100,
    top: -1 * (radius + strokeWidth + 10),
    color: "#646B82"
    
  },
  targetTitle: {
    display: "flex",
    alignItems: "center"
  },
  pomodoIcons: {
    fontSize: 44
  },
  button: {
    fontFamily: "SofiaProSemiBold",
    backgroundColor: "#FE724C",
    paddingVertical: 15,
    paddingHorizontal: 45,
    marginBottom: 50,
    borderRadius: 28,
    shadowColor: '#989799',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    
  }

})