export interface PieChartData {
  percent: number;
  color: string;
}
export interface PieChartProps {
  /**
   * PieChartData
   * { percent: number;
   *   color: string;
   * }
   */
  data: PieChartData[];

  /**
   * 宽度, 必传
   */
  width: number;

  /**
   * 高度, 必传
   */
  height: number;

  /**
   * 内圆半径
   */
  innerCircleRadius?: number;

  /**
   * 内圆颜色
   */
  innerCircleColor?: string;

  /**
   * 无数据时的饼图颜色
   */
  defaultPieColor?: string;

  /**
   * 无数据时的内圆半径
   */
  defaultInnerCircleRadius?: number;

  /**
   * 无数据时的内圆颜色
   */
  defaultInnerCircleColor?: string;

  /**
   * 传入一个SVG组件, 在圆心处绘制
   * 比如想在圆心处绘制文本, 传入一个SVG的<Text>标签
   * renderCenterChildComponent={(centerX, centerY) =>
   *  <SVGText
   *    x={centerX}
   *    y={centerY}
   *    fill="#333333"
   *    fontSize={12}
   *    textAnchor="middle"
   *    alignmentBaseline="central"
   *  >行业分布</SVGText>
   * }
   */
  renderCenterChildComponent?: (centerX: number, centerY: number) => JSX.Element;

  onPress?: (data: PieChartData, index: number) => any;
}
