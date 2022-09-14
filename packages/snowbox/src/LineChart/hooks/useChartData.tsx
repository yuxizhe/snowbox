import { useMemo } from 'react';
import { getRnSize } from '../../index';
import { ShadowDirectionType } from '../constant';

const useChartMatrix = ({
  chartMatrixArray,
  dataMatrixArray,
  data,
  fill,
  shadowDirection,
  constants,
  layoutInfo,
  selectTag,
}) => {
  const _ = useMemo(() => {
    const result: any = { polyData: [], shadowData: [], tagData: [], tagFlag: [], axisLabel: [], pointData: [] };
    if (chartMatrixArray?.length <= 0 || dataMatrixArray?.length <= 0) {
      return result;
    }
    if (layoutInfo.viewHeigh <= 0 || layoutInfo.viewWidth <= 0) {
      return result;
    }
    const { textXPadding, textYPadding, textXHeight } = constants;

    const useIndex = 0;
    const useChartMatrix = chartMatrixArray[useIndex];
    const useDataMatrix = dataMatrixArray[useIndex];

    const {
      otherProps: { minY, textYWidth, maxY },
    } = useDataMatrix;

    const xAxis = [];
    data.forEach((element, itemIndex) => {
      const element_poins: any = [];
      const tag_arr: any = [];
      const point: any = [];
      element.forEach((item, index) => {
        if (typeof item !== 'undefined') {
          const temp = useChartMatrix.mutiVertexReturnArray(useDataMatrix.mutiVertexReturnArray([index, item.rate]));
          element_poins.push(...temp);
          // 判断是否有业绩归因
          if (item.performance_attribution) {
            tag_arr.push(temp);
            // 判断选中哪个业绩归因
            if (index === selectTag[itemIndex]) {
              result.tagFlag = temp;
            }
          }
          // 买入卖出点
          if (item.buy || item.sell) {
            point.push({
              type: item.buy ? 'buy' : item.sell ? 'sell' : null,
              data: temp,
            });
          }
        }
        // 记录x轴开始坐标
        if (index === 0) {
          xAxis[0] = xAxis[0] || item?.date;
        }
        // 记录x轴结束坐标
        if (index === element.length - 1) {
          xAxis[1] = xAxis[1] || item?.date;
        }
      });
      result.polyData.push(element_poins);
      result.tagData.push(tag_arr);
      result.pointData.push(point);
    });
    // 横坐标轴label
    result.axisLabel = xAxis.map((item, index) => {
      const [xValue] = useChartMatrix.mutiVertexReturnArray(
        useDataMatrix.mutiVertexReturnArray([index * (data[0].length - 1), minY]),
      );
      return {
        x: xValue,
        y: layoutInfo.viewHeigh - getRnSize(17),
        label: item,
      };
    });

    // 阴影相关
    if (fill.length > 0 && result.polyData.length > 0) {
      const fill_result: any[] = [];
      const viewZeroY = useChartMatrix.mutiVertex({
        x: 0,
        y:
          shadowDirection === ShadowDirectionType.down
            ? textXHeight + textXPadding
            : layoutInfo.viewHeigh - textYPadding, // 向下阴影
        // y: layoutInfo.viewHeigh, // 向上阴影
      }).y;
      for (let i = 0; i < fill.length; i++) {
        const shadowResultData: any = [...result.polyData[i]];
        if(shadowResultData && shadowResultData.length) {
          const firstDataX = shadowResultData[0];
          const lastDataX = shadowResultData[shadowResultData.length - 2];
          shadowResultData.push(lastDataX, viewZeroY, firstDataX, viewZeroY);
          fill_result.push(shadowResultData);
        }
      }
      result.shadowData.push(...fill_result);
    }

    return result;
  }, [chartMatrixArray, dataMatrixArray, data, fill, shadowDirection, constants, layoutInfo, selectTag]);
  return _;
};

export default useChartMatrix;
