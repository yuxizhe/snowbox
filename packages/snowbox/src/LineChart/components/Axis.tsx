import React from 'react';
import { SVG } from '../../index';

const { Text } = SVG;

const Axis = ({ axisLabel, constants }) => {
  const { fontSize } = constants;

  const result = axisLabel;
  return (
    <>
      {result.map((item, index) => (
        <Text
          key={index}
          fontSize={fontSize}
          textAnchor={index === 0 ? 'start' : 'end'}
          x={item.x || 0}
          y={item.y || 0}
          fill="#797D8D"
          fontFamily="DIN-Medium"
          fontWeight={'500'}
        >
          {item.label}
        </Text>
      ))}
    </>
  );
};
export default React.memo(Axis);
