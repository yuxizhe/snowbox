import React from 'react';
import { SVG } from '../../index';
import { keepRadix } from '../utils';

const { G, Text, Line } = SVG;

const lineStyle = {
  day: '#E5E8EE',
  night: '#21242B',
};

const YAxis = ({ noData = false, chartMatrixArray, dataMatrixArray, theme, constants, layoutInfo, hasLabelPercent }) => {
  if (chartMatrixArray?.length <= 0 || dataMatrixArray?.length <= 0) {
    return null;
  }
  const x1Index = 0;
  const y1Index = 1;
  const x2Index = 2;
  const y2Index = 3;

  const { textYPadding, keepRadixNumber, fontSize } = constants;

  const useIndex = 0;
  const useChartMatrix = chartMatrixArray[useIndex];
  const useDataMatrix = dataMatrixArray[useIndex];

  const {
    otherProps: { minY, textYWidth, maxY },
  } = useDataMatrix;
  const yAxisLength = 6;
  const everyLength = (maxY - minY) / (yAxisLength - 1);
  const yAxisValues = new Array(yAxisLength).fill(undefined).map((_, index) => {
    const item = Math.min(keepRadix(everyLength * index + minY, keepRadixNumber), keepRadix(maxY, keepRadixNumber));
    const [xValue, yValue] = useChartMatrix.mutiVertexReturnArray(useDataMatrix.mutiVertexReturnArray([0, item]));
    return {
      pos: [textYWidth + textYPadding, yValue, layoutInfo.viewWidth, yValue],
      label: item?.toFixed(2),
    };
  });
  const result = yAxisValues;

  const suffix = hasLabelPercent ? '%' : '';
  return (
    <>
      {result.map((item, index) => (
        <G key={index}>
          {!noData && (
            <Text
              // textLength={textYWidth}
              lengthAdjust="spacingAndGlyphs"
              fontSize={fontSize}
              textAnchor="end"
              x={item.pos[x1Index] - textYPadding || 0}
              y={item.pos[y1Index] + fontSize / 2 || 0}
              fill="#797D8D"
              fontWeight={'500'}
              fontFamily="DIN-Medium">
              {`${item.label}${suffix}`}
            </Text>
          )}

          <Line
            x1={noData ? 12 : item.pos[x1Index] || 0}
            x2={item.pos[x2Index] || 0}
            y1={item.pos[y1Index] || 0}
            y2={item.pos[y2Index] || 0}
            stroke={lineStyle[theme]}
            strokeWidth={0.5}
          />
        </G>
      ))}
    </>
  );
};
export default React.memo(YAxis);
