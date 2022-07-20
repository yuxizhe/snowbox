import React from 'react';

import { Box, Press } from '..';
import { colorStrings } from '../Utils/props';

import { Styles } from './style';

type Props = {
  children?: React.ReactNode;
  /**
   * 尺寸 l: 大号(默认) s: 小号
   */
  size?: 'l' | 's' | undefined;
  /**
   * 点击事件
   */
  onPress?: (e: any) => any | undefined;
  /**
   * background 背景颜色 默认为'Blu011'
   * 填写雪球统一设计规范的颜色代码
   */
  bg?: colorStrings | (string & {});
  /**
   * color 颜色 默认为'Blu010'
   * 填写雪球统一设计规范的颜色代码
   */
  cl?: colorStrings | (string & {});
};
/**
 * Tag组件
 */

function Tag({ children, size = 'l', onPress, bg = 'Blu011', cl = 'Blu010' }: Props) {
  if (Array.isArray(children)) {
    const isText = (childType: React.ReactChild) =>
      childType === 'boolean' || childType === 'string' || childType === 'number';
    const TextIconTag = (
      <Box {...{ ...Styles[size].boxStyle, bg }}>
        {children.map((item, index) =>
          isText(typeof item) ? (
            <Box {...{ ...Styles[size].fontStyle, cl }} key={index}>
              {item}
            </Box>
          ) : (
            item
          ),
        )}
      </Box>
    );
    return onPress ? <Press onPress={onPress}>{TextIconTag}</Press> : TextIconTag;
  }
  const TextTag = <Box {...{ ...Styles[size].boxStyle, ...Styles[size].fontStyle, bg, cl }}>{children}</Box>;
  return onPress ? <Press onPress={onPress}>{TextTag}</Press> : TextTag;
}

export default Tag;
