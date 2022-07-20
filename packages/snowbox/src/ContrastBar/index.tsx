import React, { FC, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Box from '../Box';
import { getSize } from '../Utils';
import { colorStrings } from '../Utils/props';

/**
 * right 都是负值
 * left 都是正
 * middle 都有
 */
type RateType = 'right' | 'left' | 'middle';

type Props = {
  /**
   * 取data里的哪些字段
   */
  fields: string[];
  /**
   * 元数据
   */
  data: any[];
  /**
   * 每个对比条的正负颜色，先正，后负，与fields对应
   * eg：colors: [['Red010', 'Grn010']]
   *    fields: ['this_prod'] 代表this_pord字段的正负条分别用red010和grn010表示
   */
  colors?: (undefined | colorStrings[])[];
  /**
   * 宽度 默认140
   */
  width?: number;
  /**
   * 每组对比区域高度 默认所有bar高度+间隔
   */
  itemHeight?: number;
  /**
   * 每组对比区域间隔 默认12
   */
  itemInterval?: number;
  /**
   * 每个长度小条高度 默认4
   */
  itemBarHeight?: number;
  /**
   * 每个长度小条间隔 默认2
   */
  itemBarInterval?: number;
};

const defaultColors = [
  ['Red010', 'Grn010'],
  ['L010', 'L010'],
];

/**
 * 对比条组件
 */
const WinRate: FC<Props> = (props): any => {
  const {
    fields = [],
    data = [],
    colors = [],
    width = 140,
    itemHeight,
    itemInterval = 12,
    itemBarHeight = 4,
    itemBarInterval = 2,
  } = props;

  const real_itemHeight = itemHeight || fields.length * itemBarHeight + itemBarInterval * (fields.length - 1);

  const [maxLength, setMaxLength] = useState<number>(1);
  const [rateType, setRateType] = useState<RateType>('left');

  useEffect(() => {
    let _rateType: RateType = 'left';
    let left: number = 0;
    let right: number = 0;
    const all_rate: number[] = [];

    data.forEach((item) => {
      fields.forEach((field_item) => {
        const value = parseFloat(String(item[field_item])) || 0;
        all_rate.push(value);
        if (value > 0) right += 1;
        if (value < 0) left += 1;
      });
    });

    if (left !== 0 && right !== 0) _rateType = 'middle';
    else if (left === 0 && right > 0) _rateType = 'left';
    else if (left > 0 && right === 0) _rateType = 'right';

    const maxlength = Math.max(...all_rate.map((e) => Math.abs(e))) || 1;
    setMaxLength(maxlength);
    setRateType(_rateType);
  }, [data, fields]);

  const line_position = rateType === 'middle' ? { l: '50%' } : rateType === 'right' ? { r: 0 } : { l: 0 };

  const computedRatio = (value) => Math.abs((value / maxLength) * (rateType === 'middle' ? width / 2 : width));

  return (
    <Box col c w={width}>
      <Box
        ab
        w={0.5}
        h={real_itemHeight * data.length + itemInterval * (data.length - 1)}
        bg="L010"
        {...line_position}
      />
      {data.map((item, index) => (
        <Box col c mt={index !== 0 ? itemInterval : 0} h={real_itemHeight}>
          {fields.map((field_item, field_index) => {
            const value = item[field_item] || '';
            const _color = colors[field_index] || defaultColors[field_index] || defaultColors[defaultColors.length - 1];
            const left_color = _color[1] || 'L010';
            const right_color = _color[0] || 'L010';
            return (
              <Box w={width} mt={field_index !== 0 ? itemBarInterval : 0}>
                {value && value < 0 ? (
                  <>
                    <Box flex={1} />
                    <Box w={computedRatio(value)} bg={left_color} h={itemBarHeight} style={styles.borderRadiusLeft} />
                  </>
                ) : (
                  <Box w={rateType === 'middle' ? width / 2 : 0} h={itemBarHeight} />
                )}
                {value && value > 0 ? (
                  <>
                    <Box w={computedRatio(value)} bg={right_color} h={itemBarHeight} style={styles.borderRadiusRight} />
                    <Box flex={1} />
                  </>
                ) : (
                  <Box w={rateType === 'middle' ? width / 2 : 0} h={itemBarHeight} />
                )}
              </Box>
            );
          })}
        </Box>
      ))}
    </Box>
  );
};

export default WinRate;

const styles = StyleSheet.create({
  borderRadiusLeft: {
    borderTopLeftRadius: getSize(4),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: getSize(4),
  },
  borderRadiusRight: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: getSize(4),
    borderBottomRightRadius: getSize(4),
    borderBottomLeftRadius: 0,
  },
});
