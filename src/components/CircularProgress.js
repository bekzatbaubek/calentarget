import React, { useCallback, useEffect } from 'react';
import { Button, Dimensions, View } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const {width} = Dimensions.get("window");
const size = width - 32;
const strokeWidth = 50;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function CircularProgress() {

  const progress = useSharedValue(0);

  const startAnimation = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 1 * 60 * 1000 });
  })

  const animatedProps = useAnimatedProps(() => {
    return {strokeDashoffset: circumference * progress.value}
  });

  return <View>
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
    <Button onPress={startAnimation} title="Start animation"/>
  </View>
}