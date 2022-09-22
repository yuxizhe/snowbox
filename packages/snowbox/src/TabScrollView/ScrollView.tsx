import React, { useEffect, useRef, useState, FC, ReactNode } from 'react';
import { LayoutChangeEvent, View, ScrollView } from 'react-native';
import { Box, errorBoundary } from '..';

import TabsAnchor from './tabsAnchor';

interface Props {
  titles?: string[] | ReactNode[];
  //  初始化滚动到第几个tab
  initTab?: number;
}

const ScrollViewWithTab: FC<Props> = ({ titles = [], children, initTab = 0 }) => {
  // scrollView ref
  const scrollViewRef = useRef<ScrollView>(null);
  // 每个模块distance
  const moduleDistance = useRef(new Array(titles.length).fill(0));
  // 用户选择哪一个tab，作为中间变量使用，防止滚动的时候跳到别的tab
  const userSelectRef = useRef(-1);
  // 是否已经自动滚动
  const isAutoScroll = useRef(false);
  // 用户滚动目标距离
  const targetScrollY = useRef(0);
  // 当前滚动距离
  const currentScrollY = useRef(0);
  // 最大滚动距离
  const maxScrollDistanceRef = useRef(0);
  // 当前选中的tab
  const [currentTab, setCurrentTab] = useState(0);
  // 所有模块是否onLayout绘制完毕，因为onLayout是宏任务，因此用state配合effect来达到订阅效果
  const [isLayoutSuccess, setIsLayoutSuccess] = useState(false);

  // 用户点击tab，滚动位置
  const scrollTo = (index) => {
    // 减去50（上方tab的高度）
    const currentModuleDistance = moduleDistance.current[index] - 50;
    const toDistance = index === 0 ? 0 : currentModuleDistance;
    targetScrollY.current = toDistance;

    // scrollTo是宏任务，先执行下面的逻辑
    scrollViewRef.current?.scrollTo({
      y: toDistance,
      animated: true,
    });

    setCurrentTab(index);

    if (Math.abs(targetScrollY.current - currentScrollY.current) < 1) return;

    if (
      maxScrollDistanceRef.current &&
      targetScrollY.current > maxScrollDistanceRef.current &&
      Math.abs(currentScrollY.current - maxScrollDistanceRef.current) < 1
    ) {
      return;
    }

    // 记录用户选择的tab 在onScroll中用到
    userSelectRef.current = index;
  };

  // 滚动回调
  const onScrollView = (e) => {
    // scroll 卷去的高度
    const scrollTop = e.nativeEvent.contentOffset.y;
    currentScrollY.current = scrollTop;
    // 设备高度
    const deviceHeight = e.nativeEvent.layoutMeasurement.height;
    // scrollView内容高度
    const contentHeight = e.nativeEvent.contentSize.height;

    // 滚动到目标距离，userSelectRef初始化
    if (Math.abs(targetScrollY.current - scrollTop) < 1) {
      userSelectRef.current = -1;
      return;
    }

    const maxScrollDistance = contentHeight - deviceHeight;
    if (!maxScrollDistanceRef.current) {
      maxScrollDistanceRef.current = maxScrollDistance;
    }
    // 目标滚动距离大于最大滚动距离，userSelectRef初始化
    if (targetScrollY.current > maxScrollDistance && Math.abs(scrollTop - maxScrollDistance) < 1) {
      userSelectRef.current = -1;
      return;
    }

    const inEyeList: number[] = [];
    for (let index = 0; index < moduleDistance.current.length; index += 1) {
      const element = moduleDistance.current[index];
      // 将在视图内的加入数组
      if (element - scrollTop >= 0 && element < scrollTop + deviceHeight) {
        inEyeList.push(index);
        // setCurrentTab(index);
        // return;
      }
    }
    if (!inEyeList.length) return;

    // 如果是用户点击的，不进行判断
    if (userSelectRef.current > -1) return;
    // 处理当两个模块同时出现在屏幕内且滚动到最底部时
    if (Math.abs(scrollTop + deviceHeight - contentHeight) < 100) {
      setCurrentTab(inEyeList[inEyeList.length - 1]);
      return;
    }
    setCurrentTab(inEyeList[0]);
  };
  // 确定模块位置
  const setAnchorHeight = (e: LayoutChangeEvent, index: number) => {
    const distance = e.nativeEvent.layout.y;
    moduleDistance.current[index] = distance;

    if (moduleDistance.current.filter((item) => item > 0).length >= titles.length - 1) {
      setIsLayoutSuccess(true);
    }
  };

  useEffect(() => {
    if (!isLayoutSuccess) return;
    if (initTab <= 0) return;
    if (isAutoScroll.current) return;
    setTimeout(() => {
      isAutoScroll.current = true;
      const currentModuleDistance = moduleDistance.current[initTab];

      scrollViewRef.current?.scrollTo({
        y: initTab === 0 ? 0 : currentModuleDistance - 50,
        animated: true,
      });
    }, 30);
  }, [isLayoutSuccess]);

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        scrollEventThrottle={1}
        onScroll={onScrollView}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={() => {
          userSelectRef.current = -1;
        }}
      >
        <Box col bg="B010" pb={60} pt={44}>
          {React.Children.map(children, (child, index) => (
            <View
              onLayout={(e) => {
                setAnchorHeight(e, index);
              }}
            >
              {child}
            </View>
          ))}
        </Box>
      </ScrollView>
      <Box ab t={0} w="100%" style={{ zIndex: 100 }} bg="B020">
        <TabsAnchor current={currentTab} titles={titles} onChange={scrollTo} />
      </Box>
    </>
  );
};

export default errorBoundary(ScrollViewWithTab);
