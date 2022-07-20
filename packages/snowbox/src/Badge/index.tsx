import React from 'react';

import { Box } from '..';
import { colorStrings } from '../Utils/props';

import { Styles } from './style';

type Props = {
  /**
   * background 背景颜色 默认为'Org010'
   * 填写雪球统一设计规范的颜色代码
   */
  bg?: colorStrings | (string & {});
  /**
   * color 颜色 默认为'T060'
   * 填写雪球统一设计规范的颜色代码
   */
  cl?: colorStrings | (string & {});
  /**
   * 数字(number)/中文(string)角标内容
   */
  count: number | string;
  /**
   * 展示封顶的数字值，默认为 99。
   */
  overflowCount?: number;
  /**
   * 当数值为 0 时，是否展示 Badge。
   */
  showZero?: boolean;
  /**
   * 偏移量
   * 徽标默认right为徽标-1/2宽度，top为-1/2高度(6px)。
   * 位置偏移格式为 [right, top]，表示状态点距默认位置往右(正值)、往上(正值)的偏移量。
   */
  offset?: [number | string, number | string];
  children?: React.ReactNode;
};

/**
 * Badge组件
 */

function Badge({
  children,
  bg = 'Org010',
  cl = 'T060',
  count,
  overflowCount = 99,
  offset = [0, 0],
  showZero = false,
}: Props) {
  const isNumber = typeof count === 'number';
  const numberedDisplayedCount = ((count as number) > (overflowCount as number) ? `${overflowCount}+` : count) as
    | number
    | string;
  const { length } = `${numberedDisplayedCount}`;
  const type = length === 1 ? 'single' : 'multiple';
  const BadgeContent = isNumber ? (
    <Box {...{ ...Styles[type], bg, cl }} DIN>
      {numberedDisplayedCount}
    </Box>
  ) : (
    <Box {...{ ...Styles[type], bg, cl }}>{numberedDisplayedCount}</Box>
  );
  return children ? (
    <Box>
      {children}
      <Box t={-6} r={isNumber ? -(5 * length + 8) / 2 : -(9 * length + 8) / 2} ab mt={-offset[1]} mr={-offset[0]}>
        {(count || showZero) && BadgeContent}
      </Box>
    </Box>
  ) : (
    <Box>{(count || showZero) && BadgeContent}</Box>
  );
}

export default Badge;
