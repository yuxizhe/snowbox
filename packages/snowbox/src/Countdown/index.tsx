import React, { useRef, useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Box, Txt } from 'snowbox';

interface CountdownProps {
  initSeconds?: number; // 初始值单位秒
  desc?: string; // 默认文字
  onEnd: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ initSeconds = 10, desc = ' 转账结果查询中，请稍候...', onEnd }) => {
  // 剩余时间
  const [seconds, setSeconds] = useState(initSeconds);
  // 旋转角度
  const spinValue = useRef(new Animated.Value(0)).current;
  // CompositeAnimation 引用
  const animationRef = useRef<Animated.CompositeAnimation>();
  const timerId = useRef<any>(null);

  // 旋转动画插值函数
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // 输出值
  });

  useEffect(() => {
    const timingAnimationConfig = {
      toValue: 1,
      duration: 500,
    };

    animationRef.current = Animated.loop(
      Animated.timing(spinValue, timingAnimationConfig as Animated.TimingAnimationConfig),
    );

    animationRef.current.start();

    timerId.current = setInterval(() => {
      setSeconds((second) => second - 1);
    }, 1000);

    return () => {
      timerId.current && clearInterval(timerId.current);
    };
  }, []);

  const stop = () => {
    timerId.current && clearInterval(timerId.current);
    animationRef.current?.stop();
  };

  if (seconds === 0) {
    stop();
    onEnd();
  }

  return (
    <Box>
      <Box col style={{ alignItems: 'center' }}>
        <Box c w={72} h={72}>
          <Animated.Image
            source={{ uri: 'https://xqimg.imedao.com/182ee7338d07cc23fbc49194.png' }}
            style={[
              styles.imageContainer,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          />
          <Box>
            <Txt f={24} cl="Blu010" DIN fw="500">
              {seconds}
              <Txt f={18} cl="Blu010">
                s
              </Txt>
            </Txt>
          </Box>
        </Box>
        <Box cl="T010" f={14} my={20}>
          {desc}
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 72,
    height: 72,
    position: 'absolute',
  },
});

export default Countdown;
