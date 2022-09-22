import { View, ScrollView, Animated, StyleSheet, Easing } from 'react-native';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Box, Press, errorBoundary } from '..';
import { getSize, getRnSize } from '../Utils';

type Props = {
  titles: string[] | ReactNode[];
  current?: number;
  onChange: (index: number) => void;
};

const ItemMargin = 26;
const BarWidth = 8;

function TabsAnchor({ titles, onChange, current = 0 }: Props) {
  // 所有模块是否onLayout绘制完毕，因为onLayout是宏任务，因此用state配合effect来达到订阅效果
  const [isLayoutSuccess, setIsLayoutSuccess] = useState(false);
  const distanceList = useRef(new Array(titles.length).fill(0));
  // 每个元素宽度
  const widthList = useRef(new Array(titles.length).fill(0));
  const scrollRef = useRef<ScrollView>(null);
  const scrollAnim = useRef(new Animated.Value(0)).current;

  const change = (index: number, item) => {
    onChange(index);
  };

  const setDistance = (e, index) => {
    const { width, x } = e.nativeEvent.layout;
    distanceList.current[index] = x;
    widthList.current[index] = width;
    if (widthList.current.every((item) => item > 0)) {
      setIsLayoutSuccess(true);
    }
  };

  useEffect(() => {
    const distance = distanceList.current[current];
    const width = widthList.current[current];
    scrollRef.current?.scrollTo({
      x: current === 0 ? 0 : distance + getRnSize(ItemMargin),
      animated: true,
    });
    if (width === 0) return;
    const toValue = distance + width / 2 + (current === 0 ? 0 : getRnSize(ItemMargin) / 2) - getRnSize(4);
    Animated.timing(scrollAnim, {
      duration: 100,
      useNativeDriver: false,
      easing: Easing.linear,
      toValue,
    }).start();
  }, [current]);

  useEffect(() => {
    if (!isLayoutSuccess) return;
    const distance = distanceList.current[0];
    const width = widthList.current[0];
    const toValue = distance + width / 2 - getRnSize(4);
    scrollAnim.setValue(toValue);
  }, [isLayoutSuccess]);

  return (
    <Box w="100%" px={16} pt={11}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={scrollRef}>
        {titles.map((item, index) => {
          const iscur = index === current;
          return (
            <View onLayout={(e) => setDistance(e, index)} key={item}>
              <Box c flex={1} key={index} ml={index ? ItemMargin : 0} pb={11}>
                <Press onPress={() => change(index, item)}>
                  <Box f={16} fw={iscur ? '500' : 'normal'} cl={iscur ? 'T010' : 'T020'}>
                    {item}
                  </Box>
                </Press>
              </Box>
            </View>
          );
        })}
        <Animated.View style={[styles.animation, { left: scrollAnim }]}>
          <Box w={BarWidth} h={3} bg="T010" br={3} />
        </Animated.View>
      </ScrollView>
    </Box>
  );
}
const styles = StyleSheet.create({
  animation: {
    position: 'absolute',
    left: 0,
    bottom: getSize(5),
    flexShrink: 0,
  },
});
export default errorBoundary(TabsAnchor);
