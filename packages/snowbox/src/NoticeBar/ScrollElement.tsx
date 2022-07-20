import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import Box from '../Box';

const ScrollElement = (props) => {
  const { data, speed, conWidth, width, endX } = props;
  const { translateX } = data;
  const scrollAnim = useRef(new Animated.Value(translateX)).current;

  useEffect(() => {
    resetPosition(translateX);
  }, []);

  const resetPosition = useCallback((val) => {
    scrollAnim.setValue(val);
    startAnimation(val);
  }, []);

  const startAnimation = (val) => {
    const scrollSpeed = (speed * (width + val)) / conWidth;
    const toValue = -width;
    Animated.timing(scrollAnim, {
      duration: scrollSpeed,
      useNativeDriver: false,
      easing: Easing.linear,
      toValue,
    }).start(({ finished }) => {
      if (finished) {
        resetPosition(endX);
      }
    });
  };

  return (
    <Animated.View style={[styles.animation, { transform: [{ translateX: scrollAnim }], width }]}>
      <Box h={40} lh={40} cl="T020">
        {props.children}
      </Box>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  animation: {
    height: 40,
    position: 'absolute',
    left: 0,
    top: 0,
    flexShrink: 0,
  },
});

export default ScrollElement;
