import { useMemo } from 'react';
import { flatten, getNumberLength, keepRadix } from '../utils';
import Matrix from '../matrix/matrix';
import { ShadowDirectionType } from '../constant';

const useChartMatrix = ({ data, layoutInfo, shadowDirection, constants }) => {
  const result = useMemo(() =>
    // 原先main Chart 的filter data
    {
      // 创建矩阵
      if (layoutInfo.viewHeigh <= 0 || layoutInfo.viewWidth <= 0) {
        return [[], []];
      }

      const { keepRadixNumber, minDataDistance, perTextWidth, textXPadding, textXHeight, textYPadding } = constants;
      const flatData = flatten(data)
        .filter((item) => typeof item !== 'undefined')
        .map((item) => item.rate);

      let maxY = Math.max.apply(null, flatData);
      let minY = Math.min.apply(null, flatData);
      const originMaxY = maxY; // 保存原始数据的最大值和最小值，用作数轴的展示
      const originMinY = minY;
      const offset = Math.max(maxY * 0.1, minDataDistance);
      if (shadowDirection !== ShadowDirectionType.up) {
        maxY = maxY + offset;
      }
      minY = minY - offset;

      if (maxY <= minY) {
        maxY = 150;
        minY = -50;
      }

      const textMaxLength = keepRadix(
        (Math.max(getNumberLength(maxY, keepRadixNumber), getNumberLength(minY, keepRadixNumber)) + 1) * perTextWidth,
        keepRadixNumber,
      );

      const drawViewHeight = layoutInfo.viewHeigh - textXHeight - 2 * textXPadding;
      const drawViewWidth = layoutInfo.viewWidth - textMaxLength - 2 * textYPadding;
      const dataWidth = data[0]?.length - 1 || drawViewWidth;
      let chartMatrix = new Matrix({});
      chartMatrix = new Matrix({
        matrix: chartMatrix.getMatrix().rotate(180, 0, 0).translate(0, -layoutInfo.viewHeigh),
      });

      let dataMatrix = new Matrix({ otherProps: { /*maxDistance,*/ maxY, minY } });
      dataMatrix = new Matrix({
        matrix: dataMatrix
          .getMatrix()
          // 上右移出间距
          .translate(textMaxLength + textYPadding, textXHeight + textXPadding)
          .scale(drawViewWidth / dataWidth, drawViewHeight / (maxY - minY))
          .translate(0, -minY),
        otherProps: { /*maxDistance,*/ maxY, minY, originMaxY, originMinY, textYWidth: textMaxLength },
      }); // todo: 这里是控制是否平均分配地方 // todo: 这里有问题

      return [
        [chartMatrix, chartMatrix.invertMatrix()],
        [dataMatrix, dataMatrix.invertMatrix()],
      ];
    }, [data, layoutInfo, shadowDirection, constants]);
  return result;
};

export default useChartMatrix;
