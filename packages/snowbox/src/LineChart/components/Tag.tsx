import React from 'react';
import { SVG } from '../../index';
import { getRnSize } from '../../Utils';

const { Circle, Path } = SVG;

const TagTriangleLength = getRnSize(10);
const TagTriangleHeight = TagTriangleLength * Math.sin((60 * Math.PI) / 180);
const TagTriangleWidth = TagTriangleLength / 2;

const Tag = ({ tagData, clickCallBack, theme }) => {
  const clickHandler = (index) => {
    clickCallBack && clickCallBack(index);
  };

  const $dom = tagData.map((item) => {
    return item.map((tag, index) => {
      let [x, y] = tag;
      y = y - 1;
      const path = `M${x} ${y} l ${TagTriangleWidth} ${TagTriangleHeight} h ${-TagTriangleLength} Z`;
      return [
        // 扩展触摸区域
        <Circle
          key={`${index}_circle_${x}${y}`}
          r={20}
          cx={x}
          cy={y + 5}
          fill="transparent"
          onPress={() => clickHandler(index)}
        />,
        <Path
          key={`${index}_path_${x}${y}`}
          d={path}
          stroke={theme === 'day' ? '#FFFFFF' : '#13161E'}
          strokeLinejoin="round"
          strokeWidth={1}
          fill="#F04848"
          onPress={() => clickHandler(index)}
        />,
      ];
    });
  });
  return $dom;
};

export default React.memo(Tag);
