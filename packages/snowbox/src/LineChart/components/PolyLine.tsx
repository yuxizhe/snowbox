import React from 'react';
import { SVG } from '../../index';

const { Polyline } = SVG;

const PolyLine = ({ color, constants, fill, polyData, shadowData }) => {
  const { defalutColorValue } = constants;

  return (
    <>
      {polyData.map((item, index) => (
        <Polyline
          key={index}
          points={item.join(',')}
          stroke={color[index] || color[index % color.length] || defalutColorValue}
          strokeWidth={index === 0 ? 1.5 : 1}
          strokeLinejoin={'round'}
        />
      ))}
      {shadowData.map((item, index) => (
        <Polyline points={item.join(',')} key={index} fill={fill[index]} fillOpacity={fill[index] ? '0.05' : '1'} />
      ))}
    </>
  );
};
export default React.memo(PolyLine);
