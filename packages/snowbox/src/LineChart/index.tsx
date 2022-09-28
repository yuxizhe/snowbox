import React, { FC, useState, useContext, useMemo, createContext } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Box, getRnSize, SVG, OS } from '../index';
import { colorJson } from '../Utils/props';

import useChartMatrix from './hooks/useChartMatrix';
import useChartData from './hooks/useChartData';
import useTouchGesture from './hooks/useTouchGesture';

import { ChartProps } from './types';
import getConstant, { ShadowDirectionType } from './constant';
import { transformComponents } from './utils';

import Yaxis from './components/Yaxis';
import PolyLine from './components/PolyLine';
import Axis from './components/Axis';
import Cross from './components/Cross';
import Tag from './components/Tag';
import SelectTag from './components/SelectTag';
import TradePoint from './components/TradePoint';

const { Svg, Text } = SVG;

export const ThemeContext = createContext('day');

const Chart: FC<ChartProps> = ({
  data = [],
  shadowDirection = ShadowDirectionType.down,
  color = [],
  onMoveHandler = () => {},
  selectTag = [],
  width = '100%',
  height = 198,
  fill = [],
  tagClick = (index: number) => {},
  noDataCallBack = () => {},
  hasLabelPercent = true,
  isLandscape = false,
  landScapeWidth = 0,
  landScapeHeight = 0,
  landScapePadding = 36,
  isUserTouch = () => {},
  // TODO
  // selectCurve,
  // // 是否隐藏业绩归因的tag
  // isHideperformance = false,
}) => {
  const theme = useContext(ThemeContext);
  const colorArray = color.length
    ? color
    : [colorJson['Org010'], colorJson['T020'], colorJson['Red010']].map((item: { [x: string]: any }) => item[theme]);
  const [layoutInfo, setLayoutInfo] = useState({
    x: 0,
    y: 0,
    viewWidth: 0,
    viewHeigh: 0,
  });
  // 触摸信息
  const [touchInfo, setTouchInfo] = useState<{ x: undefined | number; y: undefined | number }>({
    x: undefined,
    y: undefined,
  });
  // 常量 字体大小等
  const constants = useMemo(() => {
    return getConstant();
  }, []);
  // 获取chart区域宽高
  const layoutHandler = (event) => {
    const {
      nativeEvent: {
        layout: { x, y, width: w, height: h },
      },
    } = event;
    setLayoutInfo({
      x,
      y,
      viewWidth: w,
      viewHeigh: h,
    });
  };
  // 获取图表和数据的matrix
  const [chartMatrixArray, dataMatrixArray] = useChartMatrix({ data, shadowDirection, layoutInfo, constants });
  // 获取曲线，阴影，业绩归因tag，横坐标轴label等数据
  const { polyData, shadowData, tagData, tagFlag, axisLabel, pointData } = useChartData({
    data,
    chartMatrixArray,
    dataMatrixArray,
    shadowDirection,
    layoutInfo,
    fill,
    selectTag,
    constants,
  });
  // console.log('-->', tagData);
  // 获取手势处理的函数
  const { panResponder } = useTouchGesture({
    updateTouchInfoCallback: (event) => {
      setTouchInfo(event);
    },
    isUserTouch,
  });
  // 是否展示暂无数据
  const noData =
    chartMatrixArray?.length <= 0 ||
    dataMatrixArray?.length <= 0 ||
    polyData.filter((item) => item.length > 0).length === 0;
  if (noDataCallBack) noDataCallBack(noData);
  const { fontSize } = constants;
  const chartView = (
    <Svg height={height} width={width} fill={'transparent'} onLayout={layoutHandler}>
      <Yaxis
        noData={noData}
        chartMatrixArray={chartMatrixArray}
        dataMatrixArray={dataMatrixArray}
        theme={theme}
        layoutInfo={layoutInfo}
        constants={constants}
        hasLabelPercent={hasLabelPercent}
      ></Yaxis>
      <PolyLine
        polyData={polyData}
        shadowData={shadowData}
        color={colorArray}
        constants={constants}
        fill={fill.length ? fill : [colorArray[0]]}
      ></PolyLine>
      <Axis axisLabel={axisLabel} constants={constants}></Axis>
      <Tag tagData={tagData} theme={theme} clickCallBack={tagClick}></Tag>
      <SelectTag tagFlag={tagFlag} layoutInfo={layoutInfo} constants={constants}></SelectTag>
      <TradePoint pointData={pointData}></TradePoint>
      <Cross
        data={data}
        color={colorArray}
        theme={theme}
        dataMatrixArray={dataMatrixArray}
        chartMatrixArray={chartMatrixArray}
        touchInfo={touchInfo}
        layoutInfo={layoutInfo}
        onMoveHandler={onMoveHandler}
        constants={constants}
      ></Cross>
      {noData ? (
        <Text
          fontSize={getRnSize(14)}
          x={layoutInfo.viewWidth / 2 - 2 * fontSize}
          y={layoutInfo.viewHeigh / 2}
          fill={theme === 'day' ? '#ACAFBD' : '#5A5C61'}
        >
          暂无数据
        </Text>
      ) : null}
    </Svg>
  );

  const result = (
    <Box bg={'B020'} w={'100%'} style={{ ...(OS === 'web' ? { userSelect: 'none' } : {}) }}>
      <View {...panResponder.panHandlers} style={{ marginLeft: getRnSize(-12), flex: 1 }}>
        {chartView}
      </View>
    </Box>
  );
  if (OS !== 'web' && isLandscape)
    return transformComponents({
      width: landScapeWidth,
      height: landScapeHeight,
      ChildrenComponent: result,
      padding: landScapePadding,
    });
  return result;
};

export default Chart;
export { transformComponents };
