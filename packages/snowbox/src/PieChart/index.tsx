import React, { useEffect, useState } from 'react';
import { PieChartProps } from '@/snowbox/PieChart/interfaces';
import { getRnSize, ThemeColor } from '..';
import { Svg, Circle, Path } from '../Svg';

const PieChart = ({
  data,
  width,
  height,
  innerCircleRadius = 0,
  innerCircleColor = ThemeColor.T060.day,
  defaultPieColor = ThemeColor.T030.day,
  defaultInnerCircleRadius = 0,
  defaultInnerCircleColor = ThemeColor.T060.day,
  renderCenterChildComponent,
  onPress,
}: PieChartProps) => {
  const [radius, setRadius] = useState(0);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  const computeLayout = () => {
    const min = Math.min(getRnSize(width), getRnSize(height));
    const pieRadius = Math.floor(min / 2);
    setRadius(pieRadius);
    setCenter({ x: getRnSize(width) / 2, y: getRnSize(height) / 2 });
  };
  useEffect(() => {
    computeLayout();
  }, [width, height]);

  /**
   * 依据百分比计算坐标
   */
  const computeCoordinatesByPercent = (percent: number): { x: number; y: number } => {
    const radian = percent * Math.PI * 2 - Math.PI * 0.5;
    const x = Math.cos(radian) * radius + center.x;
    const y = Math.sin(radian) * radius + center.y;
    return { x, y };
  };

  /**
   * 绘制扇形
   */
  const drawSectors = () => {
    let accumulatedPercent = 0;
    const totalPercent = data.reduce((prev, curr) => prev + curr.percent, 0);
    return data.map(({ percent, color }, index) => {
      const start = computeCoordinatesByPercent(accumulatedPercent / totalPercent);
      accumulatedPercent += percent;
      const end = computeCoordinatesByPercent(accumulatedPercent / totalPercent);
      const xAxisRotation = 0;
      const largeArcFlag = percent > totalPercent / 2 ? 1 : 0; // 大弧还是小弧
      const sweepFlag = 1;
      const pathData = [
        `M ${start.x} ${start.y}`, // 定义圆弧起始坐标
        `A ${radius} ${radius} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`, // 定义圆弧
        `L ${center.x} ${center.y}`, // 定义一条到圆心的直线
        `Z`, // 闭合图形
      ].join(' ');
      return (
        <Path key={pathData + percent} d={pathData} fill={color} onPress={() => onPress?.({ percent, color }, index)} />
      );
    });
  };

  /**
   * 绘制圆形
   */
  const drawCircle = (r: number, color: string) => {
    if (!r) return null;
    return <Circle cx={center.x} cy={center.y} r={r} fill={color} />;
  };

  /**
   * 传入一个SVG组件, 在圆心处绘制, 比如传入一个SVG的<Text>标签
   */
  const drawCenterChildComponent = () => renderCenterChildComponent?.(center.x, center.y) || null;

  const drawDefaultView = () => (
    <Svg width={getRnSize(width)} height={getRnSize(height)}>
      <Circle cx={center.x} cy={center.y} r={radius} fill={defaultPieColor} />
      {drawCircle(getRnSize(defaultInnerCircleRadius), defaultInnerCircleColor)}
      {drawCenterChildComponent()}
    </Svg>
  );

  /**
   * 绘制饼图
   */
  const drawPieChart = () => (
    <Svg width={getRnSize(width)} height={getRnSize(height)}>
      {/* 只有一条数据时直接作为圆形绘制 */}
      {data.length === 1 ? drawCircle(radius, data[0].color) : drawSectors()}
      {/* 绘制内圆 */}
      {drawCircle(getRnSize(innerCircleRadius), innerCircleColor)}
      {drawCenterChildComponent()}
    </Svg>
  );

  return data && data.length !== 0 ? drawPieChart() : drawDefaultView();
};

export default PieChart;
