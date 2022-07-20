import React, { FC, useState, useEffect } from 'react';
import { Svg, Polyline, Line, SvgProps } from '../Svg';

import { SparkLinesProps, AxisProps } from './props';
import { DataToPoints, getDefaultPLProps } from './common';

/**
 * SparkLine组件
 */
const SparkLine: FC<SparkLinesProps & SvgProps> = (p): any => {
  const { config = [], data = [], height = 50, width = 62.5, max, min, ...otherProps } = p;

  const [polyLineList, setPolyLineList] = useState<any>([]);
  const [baselineList, setBaseLineList] = useState<any>([]);

  useEffect(() => {
    // config 传入的
    const temp_poly_arr: any = config.filter((e) => e.type === 'polyline');
    const temp_base_arr: any = config.filter((e) => e.type === 'baseline');

    // data 属性传入的
    const data_poly = data.map((e) => ({ type: 'polyline', sourcedata: e, props: {} }));

    const all_poly_arr: any = temp_poly_arr.concat(...data_poly);
    const all_base_arr = temp_base_arr;

    // 所有polyline数据数组
    const all_poly_data = all_poly_arr.reduce((pre: any[], cur) => {
      pre.push(...(cur.sourcedata || []));
      return pre;
    }, []);

    const polylineData: DataToPoints = new DataToPoints({ all_data: all_poly_data, width, height, max, min });

    const polylineTemp: any = [];
    const baselineTemp: any = [];

    all_poly_arr.forEach((item, index) => {
      const { sourcedata = [], props } = item;
      const temp = {
        points: polylineData.toPoints(sourcedata),
        ...getDefaultPLProps(index),
        ...props,
      };
      polylineTemp.push(temp);
    });

    all_base_arr.forEach((item) => {
      const x = polylineData.getYPoint(item.benchmarkpoint);
      const temp = {
        y2: x,
        y1: x,
        ...item.props,
      };
      baselineTemp.push(temp);
    });

    setPolyLineList(polylineTemp);
    setBaseLineList(baselineTemp);
  }, [p]);

  const Chartview = (
    <Svg height={height} width={width} fill="transparent" {...otherProps}>
      {polyLineList.map((e) => (
        <Polyline {...e} />
      ))}
      {baselineList.map((e) => (
        <Line x1={0} x2={width} y1={e.y1} y2={e.y2} stroke="#666666" strokeWidth={1} strokeDasharray={[1, 1]} {...e} />
      ))}
    </Svg>
  );

  return Chartview;
};

export default SparkLine;
