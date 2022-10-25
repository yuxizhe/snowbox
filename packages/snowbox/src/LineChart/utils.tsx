import React from 'react';
import { getRnSize, Box } from '../index';
import { View, Dimensions } from 'react-native';

// 展平数组
export function flatten(input: any[]) {
  const stack = [...input];
  const res: any = [];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // 反转恢复原数组的顺序
  return res.reverse();
}

/**
 * @param {number | string} number 数
 * @param {number} digitNumber 保留几位小数
 */
export function keepRadix(number, digitNumber) {
  const radix = Math.pow(10, digitNumber);
  return Math.round(number * radix) / radix;
}

export function getNumberLength(number, keepRadixNumber) {
  number = Number(number);
  if (Number.isNaN(number)) {
    return 0;
  } else {
    number = keepRadix(number, keepRadixNumber); // 保留两位小数
    let resultLength = 0;
    if (number < 0) {
      resultLength = resultLength + 0.5; // 如果是负数，-号占0.5宽度
      number = Math.abs(number);
    }
    if (number !== Math.floor(number)) {
      // 证明是小数
      resultLength = resultLength + 0.5; // 小数点占用0.5宽度
      resultLength = resultLength + `${number}`.split('.').reduce((pv, cv) => pv + cv.length, 0);
    } else {
      resultLength = resultLength + `${number}`.length;
    }
    return resultLength;
  }
}
// 转换横屏模式
export function transformComponents({ width, height, ChildrenComponent, padding = 36 }) {
  let ContentHeightDesign = height;
  if (!height) {
    const DeviceHeight = Dimensions.get('window').height;
    ContentHeightDesign = DeviceHeight - 2 * getRnSize(padding);
  }

  let ContentWidthDesign = width;
  if (!width) {
    ContentWidthDesign = Dimensions.get('window').width;
  }
  const translateX = (ContentHeightDesign - getRnSize(ContentWidthDesign)) / 2;
  return (
    <View style={{ width: getRnSize(ContentWidthDesign), height: getRnSize(ContentHeightDesign) }}>
      <Box w={ContentHeightDesign} h={ContentWidthDesign} flex={1} style={{ transform: [{ translateX: -translateX }, { rotate: '90deg' }] }}>
        {ChildrenComponent}
      </Box>
    </View>
  );
}
