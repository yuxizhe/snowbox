import React, { useEffect, useState } from 'react';
import { SVG } from '../../index';

const { Line, Circle, G } = SVG;

const lineStyle = {
  day: '#E5E8EE',
  night: '#21242B',
};

const Cross = ({ data, color, theme, dataMatrixArray, chartMatrixArray, touchInfo, layoutInfo, onMoveHandler, constants }) => {
  if (dataMatrixArray.length === 0 || chartMatrixArray.length === 0) {
    return null;
  }

  const [touchLine, setTouchLine] = useState<any>({ row: [], col: [], points: [] });
  const { defalutColorValue } = constants;
  useEffect(() => {
    const { textXHeight, textXPadding } = constants;
    const matrixIndex = 0;
    const invertMatrixIndex = 1;

    const dataXIndex = 0;
    const useDataMatrix = dataMatrixArray[matrixIndex];
    const useDataMatrixInvert = dataMatrixArray[invertMatrixIndex];
    const useChartMatrix = chartMatrixArray[matrixIndex];
    const useChartMatrixInvert = chartMatrixArray[invertMatrixIndex];

    const firstData = useChartMatrix.mutiVertexReturnArray(useDataMatrix.mutiVertexReturnArray([0, 0]));

    if (touchInfo.x !== undefined && touchInfo.y !== undefined) {
      const row = [firstData[dataXIndex], touchInfo.y, layoutInfo.viewWidth, touchInfo.y];
      const result = useDataMatrixInvert.mutiVertexReturnArray(useChartMatrixInvert.mutiVertexReturnArray([touchInfo.x, touchInfo.y]));
      const [x, y] = result;
      const [colX] = useChartMatrix.mutiVertexReturnArray(useDataMatrix.mutiVertexReturnArray([x, 0]));
      if (onMoveHandler) {
        onMoveHandler({ x, y });
      }
      const points = data.map((item) => {
        const hoverPointValue = (item[x] && item[x].rate) || undefined;
        if (hoverPointValue) {
          const pos = useChartMatrix.mutiVertexReturnArray(useDataMatrix.mutiVertexReturnArray([x, hoverPointValue]));
          return [...pos];
        } else {
          return [undefined, undefined];
        }
      });
      const col = [colX, 0, colX, layoutInfo.viewHeigh - textXHeight - textXPadding];

      setTouchLine({ row: row, col, points });
    } else {
      setTouchLine({ row: [], col: [], points: [] });
      if (onMoveHandler) {
        onMoveHandler({ x: Infinity, y: Infinity });
      }
    }
  }, [touchInfo]);

  if (!touchInfo.x || !touchInfo.y) return null;

  const { row, col, points } = touchLine;
  const firstX = 0,
    firstY = 1,
    secondX = 2,
    secondY = 3;

  const line2 = (
    <Line x1={col[firstX]} x2={col[secondX]} y1={col[firstY]} y2={col[secondY]} strokeDasharray={[1, 1]} stroke={lineStyle[theme]} strokeWidth={0.5} />
  );
  const $points = points.map((item, index) => {
    return item[0] && item[1] ? (
      <G key={index}>
        <Circle
          r={4}
          cx={item[0]}
          cy={item[1]}
          fill={'white'}
          stroke={color[index] || color[index % color.length] || defalutColorValue}
          // strokeWidth={0.8}
        />
        <Circle r={1.4} cx={item[0]} cy={item[1]} fill={color[index] || color[index % color.length] || defalutColorValue} />
      </G>
    ) : null;
  });
  return (
    <>
      {/* {line1} */}
      {line2}
      {$points}
    </>
  );
};

export default React.memo(Cross);
