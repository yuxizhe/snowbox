import React from 'react';
import { SVG } from '../../index';
const { Circle } = SVG;

const COLORDICT = {
  buy: '#FFA200',
  sell: '#287DFF',
};

const Point = ({ pointData }) => {
  const $dom = pointData.map((item) => {
    return item.map((tag, index) => {
      let { type, data } = tag;
      const [x, y] = data;

      return [
        // 扩展触摸区域
        <Circle key={`${index}_1_circle_${x}${y}`} r={3} cx={x} cy={y} fill="#ffffff" />,
        <Circle key={`${index}_2_circle_${x}${y}`} r={2} cx={x} cy={y} fill={COLORDICT[type]} />,
      ];
    });
  });
  return $dom;
};

export default React.memo(Point);
