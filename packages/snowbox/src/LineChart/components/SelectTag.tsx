import React from 'react';
import { SVG } from '../../index';
import { getRnSize } from '../../Utils';
const { G, Line, Rect, Text } = SVG;

const SelectTag = ({ tagFlag, layoutInfo, selectCurve = 2, constants }) => {
  if (!layoutInfo.viewHeigh) {
    return null;
  }

  if (tagFlag.length < 2) return null;
  const { fontSize, textYPadding } = constants;
  const lineLength = getRnSize(14);
  const [x, y] = tagFlag;
  const { viewHeigh, viewWidth } = layoutInfo;
  const text = selectCurve === 2 ? '业绩归因' : '回撤归因';
  const selectTagDistance = getRnSize(24);

  const linePosInfo = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
  };

  const rectPosInfo = {
    x: x - 1,
    y: y,
    width: getRnSize(48),
    height: getRnSize(16),
  };

  linePosInfo.x1 = linePosInfo.x2 = x;
  linePosInfo.y1 = y;
  if (y - lineLength - textYPadding * 2 < 0) {
    // y太高了，整个线往下
    linePosInfo.y2 = y + selectTagDistance;
  } else {
    // y太低了，整个线往上
    linePosInfo.y2 = y - selectTagDistance;
  }

  if (rectPosInfo.x + rectPosInfo.width > viewWidth) {
    // x太靠右了，整个线往左
    rectPosInfo.x = x - rectPosInfo.width + 1;
  }
  rectPosInfo.y = linePosInfo.y2;

  const textPosInfo = {
    x: rectPosInfo.x + getRnSize(4),
    y: rectPosInfo.y + getRnSize(11),
  };
  const $line = <Line {...linePosInfo} stroke="#F04848" strokeWidth={0.5} />;
  const $text = (
    <>
      <Rect
        rx={2}
        // ry={3}
        {...rectPosInfo}
        fill="#F04848"
      ></Rect>
      <Text fontSize={fontSize} {...textPosInfo} fill="white">
        {text}
      </Text>
    </>
  );
  const $dashLine = (
    <Line x1={x} x2={x} y1={y} y2={viewHeigh} stroke="#F04848" strokeWidth={0.5} strokeDasharray={[1.5, 1]} />
  );
  return (
    <G>
      {$line}
      {$text}
      {$dashLine}
    </G>
  );
};

export default React.memo(SelectTag);
