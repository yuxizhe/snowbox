import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, Animated, StyleSheet, Easing } from 'react-native';
import { Box, PButton, LayoutView, Press, Txt } from '..';
import { getSize, getRnSize } from '../Utils';

type Props = {
  children?: any;
  /**
   * tab标题
   */
  title: string[];
  /**
   * 初始index
   */
  startIndex?: number;
  /**
   * 点击 回调，返回当前点击的index
   */
  onChange?: (changeParams: any) => void;
  /**
   * 是否禁用tabs滑动手势
   */
  locked?: boolean;
  /**
   * 顶部导航栏是否滚动，左排列
   */
  tabBarScroll?: boolean;
  /**
   * tab背景色
   */
  bg?: string;
  /**
   * 内容背景色
   */
  contentBg?: string;
};

/**
 * Tabs组件
 */
export default function Tabs({
  children,
  title,
  onChange,
  startIndex = 0,
  contentBg,
  tabBarScroll = false,
  ...props
}: Props) {
  const [active, setActive] = useState(startIndex);
  const [fontSize, setFontSize] = useState(0);

  const distanceList = useRef(new Array(title.length).fill(0));
  // 每个元素宽度
  const widthList = useRef(new Array(title.length).fill(0));
  const scrollRef = useRef<ScrollView>(null);
  const scrollAnim = useRef(new Animated.Value(0)).current;

  const setDistance = (e, index) => {
    const { width, x } = e.nativeEvent.layout;
    distanceList.current[index] = x;
    widthList.current[index] = width;
  };

  const change = (index) => {
    setActive(index);
    const changeParams = { from: active, i: index, ref: children[index] };
    onChange && onChange(changeParams);
  };

  const onTabsLayout = ({ nativeEvent: { layout } }) => {
    const { width } = layout;
    const tabSize = title.length || 1;
    const fonts = Math.floor(width / tabSize / getTitleMaxLength());
    setFontSize(fonts > 16 ? 16 : fonts);
  };

  const getTitleMaxLength = () => {
    let maxlength = 0;
    title.forEach((t) => {
      if (t.length > maxlength) {
        maxlength = t.length;
      }
    });
    return maxlength;
  };

  const renderTitleTabs = () => {
    if (tabBarScroll) {
      return (
        <Box w="100%" px={16} pt={11}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={scrollRef}>
            {title.map((item, index) => {
              const iscur = index === active;
              return (
                <LayoutView onLayout={(e) => setDistance(e, index)} key={item}>
                  <Box c flex={1} key={index} ml={index ? 26 : 0} pb={11}>
                    <Press onPress={() => change(index)}>
                      <Txt f={16} {...(iscur ? { fw: '500', cl: 'T010' } : { cl: 'T020' })}>
                        {item}
                      </Txt>
                    </Press>
                  </Box>
                </LayoutView>
              );
            })}
            <Animated.View style={[styles.animation, { left: scrollAnim }]}>
              <Box w={8} h={3} bg="T010" br={3} />
            </Animated.View>
          </ScrollView>
        </Box>
      );
    }
    return (
      <Box w="100%" py={7}>
        <LayoutView onLayout={onTabsLayout} style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
          {title.map((item, index) => (
            <LayoutView onLayout={(e) => setDistance(e, index)} key={item} style={{ flex: 1 }}>
              <Box c flex={1}>
                <PButton py={0} onPress={() => change(index)}>
                  <Box py={8} f={fontSize || 0} {...(index === active ? { fw: '500', cl: 'T010' } : { cl: 'T020' })}>
                    {item}
                  </Box>
                </PButton>
              </Box>
            </LayoutView>
          ))}
          <Animated.View style={[styles.animation, { left: scrollAnim }]}>
            <Box w={8} h={3} bg="T010" br={3} />
          </Animated.View>
        </LayoutView>
      </Box>
    );
  };

  useEffect(() => {
    const distance = distanceList.current[active];
    const width = widthList.current[active];
    if (width === 0) return;

    let toValue = distance + width / 2 - getRnSize(4);
    if (tabBarScroll) toValue += active === 0 ? 0 : getRnSize(26) / 2;

    // 滑块移动到指定位置
    Animated.timing(scrollAnim, {
      duration: 100,
      useNativeDriver: false,
      easing: Easing.linear,
      toValue,
    }).start();

    // 滚动模式，滚动到指定位置
    if (!tabBarScroll) return;
    scrollRef.current?.scrollTo({
      x: active === 0 ? 0 : distance + getRnSize(26),
      animated: true,
    });
  }, [active]);

  return (
    <Box col w="100%" {...props}>
      {renderTitleTabs()}
      <Box flex={1} col bg={contentBg}>
        {children.map((item, index) => (index === active ? item : null))}
      </Box>
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
